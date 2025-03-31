import CreateTopicForm from '@/app/ui/topic/create-topic-form';

export default function CreateTopicPage() {
  return (
    <div className="flex flex-col gap-6">
      <h3>Create a New Topic </h3>
      <p>
        Notes : Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde
        incidunt ratione error sit animi! Dignissimos voluptatum cupiditate,
        accusamus cum animi aliquam repellat amet beatae est explicabo. Ea,
        aliquam! Deleniti, dolores.
      </p>
      <CreateTopicForm />
    </div>
  );
}
