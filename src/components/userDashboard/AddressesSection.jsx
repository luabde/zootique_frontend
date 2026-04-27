const emptyAddress = {
  nombre: "",
  calle: "",
  ciudad: "",
  codigo_postal: "",
  provincia: "",
  pais: "España",
};

export { emptyAddress };

export default function AddressesSection({
  addresses,
  showAddressForm,
  addressData,
  setAddressData,
  onShowForm,
  onHideForm,
  onSubmit,
  onDeleteAddress,
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Mis Direcciones</h2>
          <p className="text-gray-500 text-sm mt-1">Administra tus lugares de entrega frecuentes.</p>
        </div>
        {!showAddressForm && (
          <button
            onClick={onShowForm}
            className="bg-emerald-600 text-white px-5 py-2.5 rounded-2xl text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
            </svg>
            Anadir
          </button>
        )}
      </div>

      {showAddressForm ? (
        <div className="bg-gray-50/50 rounded-3xl p-8 border border-gray-100 mb-8 animate-in fade-in zoom-in-95 duration-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            Nueva Direccion
          </h3>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Nombre (ej: Casa, Oficina)</label>
                <input
                  type="text"
                  value={addressData.nombre}
                  onChange={(e) => setAddressData({ ...addressData, nombre: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-3 text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-medium"
                  placeholder="Mi casa"
                  required
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Calle y Numero</label>
                <input
                  type="text"
                  value={addressData.calle}
                  onChange={(e) => setAddressData({ ...addressData, calle: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-3 text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-medium"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Ciudad</label>
                <input
                  type="text"
                  value={addressData.ciudad}
                  onChange={(e) => setAddressData({ ...addressData, ciudad: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-3 text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-medium"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Codigo Postal</label>
                <input
                  type="text"
                  value={addressData.codigo_postal}
                  onChange={(e) => setAddressData({ ...addressData, codigo_postal: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-3 text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-medium"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Provincia</label>
                <input
                  type="text"
                  value={addressData.provincia}
                  onChange={(e) => setAddressData({ ...addressData, provincia: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-3 text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-medium"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Pais</label>
                <input
                  type="text"
                  value={addressData.pais}
                  onChange={(e) => setAddressData({ ...addressData, pais: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-3 text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-medium"
                  required
                />
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="bg-emerald-600 text-white px-8 py-3.5 rounded-2xl text-sm font-bold hover:bg-emerald-700 transition-all"
              >
                Anadir Direccion
              </button>
              <button
                type="button"
                onClick={onHideForm}
                className="bg-white text-gray-500 px-8 py-3.5 rounded-2xl text-sm font-bold hover:bg-gray-100 border border-gray-200 transition-all shadow-sm"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      ) : addresses?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((dir, idx) => (
            <div
              key={dir._id || idx}
              className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm hover:shadow-xl hover:shadow-emerald-50/30 hover:border-emerald-100 transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onDeleteAddress(dir._id)}
                  className="w-8 h-8 rounded-xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all shadow-sm"
                  title="Eliminar direccion"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-2">{dir.nombre || `Mi Direccion ${idx + 1}`}</h4>
              <div className="space-y-1 text-sm text-gray-500 font-medium leading-relaxed">
                <p>{dir.calle}</p>
                <p>
                  {dir.codigo_postal} {dir.ciudad}
                </p>
                <p>
                  {dir.provincia}, {dir.pais}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50/50 rounded-[40px] border-2 border-dashed border-gray-200">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100 shadow-sm">
            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="text-gray-500 font-semibold">No tienes direcciones guardadas.</p>
          <button
            onClick={onShowForm}
            className="mt-6 text-xs font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-widest px-8 py-3 bg-white border border-emerald-100 rounded-2xl shadow-sm hover:shadow-md transition-all"
          >
            Anadir mi primera direccion
          </button>
        </div>
      )}
    </div>
  );
}
