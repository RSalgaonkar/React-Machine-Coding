export default function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h2>
      <p className="mt-2 max-w-3xl text-slate-600">{description}</p>
    </div>
  );
}