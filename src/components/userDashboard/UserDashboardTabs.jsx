import { dashboardTabs } from "./dashboardTabsConfig";

// Sidebar de navegación del dashboard de usuario.
// Renderiza las pestañas disponibles y notifica al padre cuando cambia la pestaña activa.
export default function UserDashboardTabs({ activeTab, onTabChange }) {
  return (
    <aside className="w-full lg:w-64 shrink-0">
      <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
        {dashboardTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-3 px-4 py-3.5 text-sm font-semibold rounded-2xl transition-all duration-200 whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-emerald-600 text-white lg:translate-x-1"
                : "bg-white text-gray-500 hover:bg-emerald-50 hover:text-emerald-700 border border-transparent hover:border-emerald-100"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
