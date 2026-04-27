import AdminSectionCard from "./AdminSectionCard";
import AdminStatCard from "./AdminStatCard";
import { Bar } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  BarElement,
} from "chart.js";

// Registramos los módulos de Chart.js que usa el gráfico de barras.
// Sin este registro, Chart.js no puede renderizar escalas/ejes en React.
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Pagina general del dashboard de admin
export default function AdminGeneralTab({ loading, stats, monthlySales }) {
  // Configuramos los datos del gráfico de barras:
  // - labels: meses
  // - data: número de ventas realizadas en cada mes
  const salesChartData = {
    labels: monthlySales.labels,
    datasets: [
      {
        label: "Ventas por mes",
        data: monthlySales.values,
        // Paleta coherente con la web (verdes de la UI actual).
        backgroundColor: "rgba(16, 185, 129, 0.22)",
        borderColor: "rgba(5, 150, 105, 1)",
        borderWidth: 2,
        borderRadius: 10,
      },
    ],
  };

  // Configuración general del gráfico:
  // - responsive para adaptarse al ancho del contenedor
  const salesChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <AdminStatCard title="Usuarios" value={loading ? "--" : String(stats.totalUsers)} helper="Cuentas registradas" />
        <AdminStatCard title="Pedidos" value={loading ? "--" : String(stats.totalOrders)} helper="Pedidos totales" />
        <AdminStatCard title="Pendientes" value={loading ? "--" : String(stats.pendingOrders)} helper="Pendientes de gestionar" />
        <AdminStatCard title="Facturacion" value={loading ? "--" : stats.totalRevenueFormatted} helper="Total acumulado" />
        <AdminStatCard title="Stock bajo" value={loading ? "--" : String(stats.lowStockProducts)} helper="Productos <= 5 unidades" />
      </section>

      <AdminSectionCard
        title="Ventas mensuales"
        description="Número de ventas realizadas por mes (últimos 12 meses)."
      >
        {loading ? (
          <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-8 text-sm font-medium text-gray-500">
            Cargando gráfico de ventas...
          </div>
        ) : (
          <div className="h-[320px] rounded-2xl border border-gray-100 bg-white p-4 sm:p-6">
            {/* Componente Bar de react-chartjs-2 que renderiza el gráfico de Chart.js */}
            <Bar data={salesChartData} options={salesChartOptions} />
          </div>
        )}
      </AdminSectionCard>
    </div>
  );
}
