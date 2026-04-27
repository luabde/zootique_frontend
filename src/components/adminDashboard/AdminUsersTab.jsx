import AdminSectionCard from "./AdminSectionCard";

export default function AdminUsersTab({ loading, users, onToggleRole, onToggleBan, onDeleteUser }) {
  return (
    <AdminSectionCard title="CRUD de usuarios" description="Consulta, actualiza rol/estado y elimina usuarios.">
      {loading ? (
        <p className="text-sm text-gray-500">Cargando usuarios...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase tracking-widest text-gray-400">
                <th className="pb-3 pr-4">Nombre</th>
                <th className="pb-3 pr-4">Email</th>
                <th className="pb-3 pr-4">Rol</th>
                <th className="pb-3 pr-4">Estado</th>
                <th className="pb-3 pr-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-50">
                  <td className="py-3 pr-4 font-semibold text-gray-900">{user.nombre}</td>
                  <td className="py-3 pr-4 text-gray-600">{user.email}</td>
                  <td className="py-3 pr-4">{user.rol}</td>
                  <td className="py-3 pr-4">{user.bann ? "Baneado" : "Activo"}</td>
                  <td className="py-3 pr-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => onToggleRole(user)}
                        className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold"
                      >
                        Cambiar rol
                      </button>
                      <button
                        onClick={() => onToggleBan(user)}
                        className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700"
                      >
                        {user.bann ? "Activar" : "Banear"}
                      </button>
                      <button
                        onClick={() => onDeleteUser(user)}
                        className="rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminSectionCard>
  );
}
