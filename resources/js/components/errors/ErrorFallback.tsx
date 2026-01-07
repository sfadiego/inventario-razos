export default function ErrorFallback({ error }: { error?: Error }) {
  console.error('ErrorFallback', error);
  return <div className="p-4 text-center text-red-600">Something went wrong. Please try again later.</div>;
}
