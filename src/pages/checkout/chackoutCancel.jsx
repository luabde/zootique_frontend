import { useNavigate } from "react-router-dom";

export function ChackoutCancel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl border border-red-100 p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 6l12 12M18 6L6 18" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Pedido cancelado</h1>
        <p className="text-gray-500 mb-6">
          El pago no se completó y tu pedido fue cancelado. No te preocupes, no se ha realizado ningún cargo.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-red-100"
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    </div>
  );
}
