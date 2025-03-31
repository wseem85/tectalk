'use server';
import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth, signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
export type StateTopic = {
  errors?: {
    title?: string[];
    description?: string[];
  };
  message?: string | null;
};
export type StatePost = {
  errors?: {
    title?: string[];
    text?: string[];
  };
  message?: string | null;
};
export type StateSignup = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};
const CreateTopicFormSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(10, { message: 'Must be 10 or fewer characters long' })
    .regex(/^\S+$/, { message: 'No spaces allowed' }),
  description: z
    .string()
    .min(10, { message: 'Must be 3 or more characters long' }),
  user_id: z.string(),
  created_at: z.string(),
});
const CreateTopic = CreateTopicFormSchema.omit({
  id: true,
  user_id: true,
  created_at: true,
});
const CreatePostFormSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(30, { message: 'Must be 30 or fewer characters long' }),
  text: z.string().min(255, { message: 'Must be 255 or more characters long' }),
  user_id: z.string(),
  created_at: z.string(),
  topic_id: z.string(),
});
const CreatePost = CreatePostFormSchema.omit({
  id: true,
  user_id: true,
  created_at: true,
  topic_id: true,
});

const SignupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  name: z.string().min(4, { message: 'Name must be at least 4 characters' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(100),
  avatar_url: z.string().optional(),
});
export async function createPost(
  slug: string,
  prevSate: StatePost,
  formData: FormData
) {
  // creting a new Date as a string in the form 'YYYY-MM-DD'
  const date = new Date().toISOString().split('T')[0];
  let topicId: string;

  const session = await auth();
  try {
    const res = await sql`
  SELECT id FROM topics WHERE LOWER(TRIM(title)) = ${slug.trim().toLowerCase()}
  `;
    topicId = res[0].id;
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error : Failed To Get the Topic Id .',
    };
  }
  // Check if user is authenticated

  if (!session?.user?.id || !session?.user?.email) {
    return {
      message: 'Unauthorized: You must be logged in to create a Post',
    };
  }

  let userId: string = session.user.id;

  const topicResult = await sql`
  SELECT title FROM topics WHERE id = ${topicId}
  `;

  const topicTitle = topicResult[0].title;
  const validatedFields = CreatePost.safeParse({
    title: formData.get('title'),
    text: formData.get('text'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to create Topic',
    };
  }
  const { title, text } = validatedFields.data;
  let postId: string;
  //insert data
  try {
    const result = await sql`
      INSERT INTO posts (title, text, created_at, user_id, topic_id)
      VALUES (${title}, ${text}, ${date}, ${userId}, ${topicId})
      RETURNING id
    `;
    postId = result[0].id;
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error : Failed To Create Post .',
    };
  }
  //revalidate path to clear cache and trigger a new request to get the updated data
  revalidatePath('/topics');
  // redirect
  redirect(`/topics/${topicTitle}/posts/${postId}`);
}
export async function createTopic(prevSate: StateTopic, formData: FormData) {
  // creting a new Date as a string in the form 'YYYY-MM-DD'
  const date = new Date().toISOString().split('T')[0];
  // set a user id manually , after authentication this will change
  // const user_id = '410544b2-4001-4271-9855-fec4b6a6442a';
  // Get current session
  const session = await auth();

  // Check if user is authenticated
  if (!session?.user?.email || !session?.user?.id) {
    return {
      message: 'Unauthorized: You must be logged in to create a topic',
    };
  }
  // Use the authenticated user's ID

  const validatedFields = CreateTopic.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to create Topic',
    };
  }
  const { title, description } = validatedFields.data;
  //insert data
  try {
    const userId: string = session.user.id;
    await sql`
    INSERT INTO topics (title,description,created_at,user_id)
    VALUES (${title},${description},${date},${userId})
    `;
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error : Failed To Create Topic .',
    };
  }

  //revalidate path to clear cache and trigger a new request to get the updated data
  revalidatePath('/topics');
  // redirect
  redirect(`/topics/${title}`);
}
export async function authenticate(
  prevSate: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invaled Credentials';
        default:
          return 'Something Went Wrong';
      }
    }
    throw error;
  }
}

export async function register(prevState: StateSignup, formData: FormData) {
  const rawFormData = {
    email: formData.get('email'),
    name: formData.get('name'),
    password: formData.get('password'),
    avatar_url: formData.get('avatar_url'),
  };

  // Validate form fields
  const validatedFields = SignupSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Sign Up.',
    };
  }

  const { email, name, password, avatar_url } = validatedFields.data;

  try {
    // Check if user exists
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return {
        message: 'User already exists',
        errors: { email: ['This email is already registered'] },
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await sql`
      INSERT INTO users (email,name, password,avatar_url)
      VALUES (${email},${name}, ${hashedPassword},${avatar_url || null})
    `;
  } catch (error) {
    console.error('Signup Error:', error);
    return {
      message: 'Database Error: Failed to sign up',
      errors: {},
    };
  }

  redirect('/login');
}
const createCommentSchema = z.object({
  text: z.string().min(3),
});

export type CreateCommentFormState = {
  errors: {
    text?: string[];
    _form?: string[];
  };
  success?: boolean;
};
export async function createComment(
  {
    postId,
    parentId,
    slug,
  }: { postId: string; parentId?: string; slug: string },
  prevState: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> {
  const result = createCommentSchema.safeParse({
    text: formData.get('text'),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user?.id) {
    return {
      errors: {
        _form: ['You must sign in to do this.'],
      },
    };
  }

  const userId = session.user.id;
  const text = result.data.text;

  // return { errors: {} };
  try {
    await sql`
    INSERT INTO comments ( text, user_id, post_id,parent_id)
    VALUES (${text},${userId},${postId},${parentId || null})
    `;
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Something went wrong...'],
        },
      };
    }
  }

  //getting the topic slug

  if (!slug) {
    return {
      errors: {
        _form: ['Failed to revalidate topic'],
      },
    };
  }

  revalidatePath(`/topics/${slug}/posts/${postId}`);
  return {
    errors: {},
    success: true,
  };
}
