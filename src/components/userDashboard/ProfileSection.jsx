export default function ProfileSection({
  user,
  userData,
  editingProfile,
  formData,
  setFormData,
  onEditStart,
  onEditCancel,
  onSubmit,
}) {
  return (
    <div className="max-w-2xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Informacion Personal</h2>
          <p className="text-gray-500 text-sm mt-1">Actualiza tus datos de contacto y nombre de usuario.</p>
        </div>
        {!editingProfile && (
          <button
            onClick={onEditStart}
            className="text-xs font-bold uppercase tracking-widest text-emerald-600 hover:text-white hover:bg-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl transition-all border border-emerald-100"
          >
            Editar
          </button>
        )}
      </div>

      {editingProfile ? (
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Nombre Completo</label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm text-gray-400 transition-all cursor-not-allowed italic"
                disabled
              />
            </div>
          </div>
          <div className="flex gap-3 pt-6 border-t border-gray-50">
            <button
              type="submit"
              className="bg-emerald-600 text-white px-8 py-3.5 rounded-2xl text-sm font-bold hover:bg-emerald-700 transition-all"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={onEditCancel}
              className="bg-gray-100 text-gray-500 px-8 py-3.5 rounded-2xl text-sm font-bold hover:bg-gray-200 transition-all"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100/50">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nombre</p>
            <p className="text-gray-900 font-semibold text-lg">{userData?.nombre || user?.nombre}</p>
          </div>
          <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100/50">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email</p>
            <p className="text-gray-900 font-semibold text-lg">{userData?.email || "Cargando..."}</p>
          </div>
        </div>
      )}
    </div>
  );
}
