// Tarjeta de métrica rápida para el resumen del dashboard.
export default function AdminStatCard({ title, value, helper }) {
  return (
    <article className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{title}</p>
      <p className="mt-3 text-3xl font-black tracking-tight text-gray-900">{value}</p>
      <p className="mt-2 text-sm font-medium text-gray-500">{helper}</p>
    </article>
  );
}
