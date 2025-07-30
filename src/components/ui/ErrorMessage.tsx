type ErrorMessageProps = { message: string };

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  return (
    <div className="text-red-400 text-center py-4">
      {message}
    </div>
  );
} 