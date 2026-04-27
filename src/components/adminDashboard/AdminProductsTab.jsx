import AdminSectionCard from "./AdminSectionCard";

export default function AdminProductsTab({
  loading,
  products,
  newProduct,
  setNewProduct,
  editingProductId,
  editingProductData,
  setEditingProductId,
  setEditingProductData,
  formatCurrency,
  onCreateProduct,
  onSaveEdit,
  onDeleteProduct,
}) {
  return (
    <div className="space-y-6">
      <AdminSectionCard title="Crear producto" description="Alta de nuevos productos del catalogo.">
        <form onSubmit={onCreateProduct} className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <input
            type="text"
            placeholder="Nombre"
            value={newProduct.nombre}
            onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Precio"
            value={newProduct.precio}
            onChange={(e) => setNewProduct({ ...newProduct, precio: e.target.value })}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
            required
          />
          <select
            value={newProduct.tipo}
            onChange={(e) => setNewProduct({ ...newProduct, tipo: e.target.value })}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
          >
            <option value="Alimento">Alimento</option>
            <option value="Accesorio">Accesorio</option>
            <option value="Higiene y cuidado">Higiene y cuidado</option>
            <option value="Salud">Salud</option>
            <option value="Juguete">Juguete</option>
            <option value="Hábitat">Hábitat</option>
            <option value="Servicios">Servicios</option>
          </select>
          <input
            type="text"
            placeholder="URL imagen"
            value={newProduct.url}
            onChange={(e) => setNewProduct({ ...newProduct, url: e.target.value })}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm md:col-span-2"
          />
          <textarea
            placeholder="Descripcion"
            value={newProduct.descripcion}
            onChange={(e) => setNewProduct({ ...newProduct, descripcion: e.target.value })}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm md:col-span-2"
            rows={3}
          />
          <button
            type="submit"
            className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 md:w-fit"
          >
            Crear producto
          </button>
        </form>
      </AdminSectionCard>

      <AdminSectionCard title="CRUD de productos" description="Editar datos principales o eliminar productos.">
        {loading ? (
          <p className="text-sm text-gray-500">Cargando productos...</p>
        ) : (
          <div className="space-y-3">
            {products.map((product) => (
              <article key={product._id} className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4">
                {editingProductId === product._id ? (
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
                    <input
                      value={editingProductData.nombre}
                      onChange={(e) => setEditingProductData({ ...editingProductData, nombre: e.target.value })}
                      className="rounded-xl border border-gray-200 px-3 py-2 text-sm"
                    />
                    <input
                      type="number"
                      value={editingProductData.precio}
                      onChange={(e) => setEditingProductData({ ...editingProductData, precio: e.target.value })}
                      className="rounded-xl border border-gray-200 px-3 py-2 text-sm"
                    />
                    <input
                      type="number"
                      value={editingProductData.stock}
                      onChange={(e) => setEditingProductData({ ...editingProductData, stock: e.target.value })}
                      className="rounded-xl border border-gray-200 px-3 py-2 text-sm"
                    />
                    <div className="flex gap-2">
                      <button onClick={onSaveEdit} className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white">
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditingProductId(null)}
                        className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-gray-900">{product.nombre}</p>
                      <p className="text-sm text-gray-500">
                        {formatCurrency(Number(product.precio || 0))} - Stock: {product.stock}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingProductId(product._id);
                          setEditingProductData({
                            nombre: product.nombre || "",
                            precio: String(product.precio || ""),
                            stock: String(product.stock || ""),
                          });
                        }}
                        className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => onDeleteProduct(product._id)}
                        className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </AdminSectionCard>
    </div>
  );
}
