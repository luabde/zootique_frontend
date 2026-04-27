// Contenedor visual reutilizable para cada bloque grande del panel admin.
export default function AdminSectionCard({ title, description, children }) {
  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm">
      <header className="mb-5">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">{title}</h2>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </header>
      {children}
    </section>
  );
}
