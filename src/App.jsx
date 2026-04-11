import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { Footer } from "./pages/Footer.jsx";
import { useAuth } from "./hook/useAuth";

const navLinkClass =
  "font-medium border-b-2 border-b-transparent hover:border-amber-300 transition-all duration-200 text-center text-sm sm:text-base";

export default function App() {
  const { user, getSession, logout } = useAuth();

  useEffect(() => {
    void getSession();
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <div className="flex max-w-7xl mx-auto flex-col gap-4 lg:flex-row lg:justify-between lg:items-center lg:p-4 md:p-3 p-2">
        <Link
          to="/"
          className="flex gap-3 items-center justify-center lg:justify-start shrink-0"
        >
          <img className="w-14 sm:w-16" src="/img/logo.png" alt="Logo zootique" />
          <span className="font-medium text-base sm:text-lg">Zootique</span>
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4 lg:justify-end flex-1 min-w-0">
          <Link to="/" className={navLinkClass}>
            Home
          </Link>
          <Link to="/AllProducts" className={navLinkClass}>
            Productos
          </Link>

          {!user && (
            <Link
              to="/login"
              className={`${navLinkClass} text-emerald-700 hover:text-emerald-900`}
            >
              Iniciar sesión
            </Link>
          )}

          {user && (
            <div
              className="flex max-w-full min-w-0 items-center gap-1.5 rounded-lg border border-gray-200/90 bg-white px-2 py-0.5 shadow-sm sm:gap-2 sm:px-2.5"
              title={user.nombre}
            >
              <span className="min-w-0 max-w-40 sm:max-w-xs truncate text-sm font-medium text-gray-800">
                {user.nombre}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                aria-label="Cerrar sesión"
                title="Cerrar sesión"
                className="shrink-0 rounded-md border border-transparent p-1.5 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18"
                  width="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                </svg>
              </button>
            </div>
          )}

          <div className="w-fit h-fit bg-emerald-600 rounded-full p-2 hover:scale-105 transition duration-200 shrink-0">
            <Link to="/cart" aria-label="Ver carrito">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#FFFFFF"
              >
                <path d="M263.79-96Q234-96 213-117.21t-21-51Q192-198 213.21-219t51-21Q294-240 315-218.79t21 51Q336-138 314.79-117t-51 21Zm432 0Q666-96 645-117.21t-21-51Q624-198 645.21-219t51-21Q726-240 747-218.79t21 51Q768-138 746.79-117t-51 21ZM253-696l83 192h301l82-192H253Zm-31-72h570q14 0 20.5 11t1.5 23L702.63-476.14Q694-456 676.5-444T637-432H317l-42 72h493v72H276q-43 0-63.5-36.15-20.5-36.16.5-71.85l52-90-131-306H48v-72h133l41 96Zm114 264h301-301Z" />
              </svg>
            </Link>
          </div>
        </nav>
      </div>

      <Outlet />
      <Footer />
    </>
  );
}
