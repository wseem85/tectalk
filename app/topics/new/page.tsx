import CreateTopicForm from '@/app/ui/topic/create-topic-form';

export default function CreateTopicPage() {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-2xl text-secondary">Create a New Topic </h3>
      <div className="flex flex-col gap-2">
        <h4 className="text-2xl text-gray-700">Notes</h4>
        <p>Try to choose a generic Topic Title .</p>
        <p>Users can add Posts under this Topic.</p>
        <p>Choose a short Topic Description describes the Topic .</p>
      </div>
      <CreateTopicForm />
    </div>
  );
}
