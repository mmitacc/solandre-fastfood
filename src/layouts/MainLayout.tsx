import React from "react";
import { Outlet, Link, NavLink, useNavigate } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";
import { DICCIONARIO_ROLES } from "../constants/roles"; // ◄ Importas el diccionario
import { toast } from "sonner";

export default function MainLayout(): React.JSX.Element {
  const navigate = useNavigate();

  // ◄ Selectores específicos y limpios (Evitan re-renders globales)
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  // Convertimos a número de forma segura para leer el diccionario
  const roleId = user?.role ? Number(user.role) : null;
  const rolActual = roleId ? DICCIONARIO_ROLES[roleId] : null;

  const activeStyle = ({ isActive }: { isActive: boolean }): string =>
    isActive
      ? "text-solandre-naranja font-bold border-b-2 border-solandre-naranja pb-1"
      : "text-solandre-oscuro hover:text-solandre-naranja transition-colors";

  return (
    <div className="min-h-screen flex flex-col bg-solandre-fondo text-solandre-oscuro font-sans">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl font-black tracking-wider text-solandre-naranja">
              SOLA<span className="text-solandre-verde">NDRE</span>
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8 font-medium">
            <NavLink to="/" className={activeStyle}>
              Inicio
            </NavLink>
            <NavLink to="/menu" className={activeStyle}>
              Menú
            </NavLink>

            {/* 🔄 ENLACE DINÁMICO SEGÚN TU DICCIONARIO */}
            {rolActual && roleId !== 4 && (
              <NavLink to={rolActual.ruta} className={activeStyle}>
                Panel {rolActual.nombre}
              </NavLink>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              to="/carrito"
              className="bg-solandre-verde text-white px-5 py-2.5 rounded-full font-semibold hover:bg-solandre-verdeHover transition-all shadow-sm"
            >
              Ver Carrito 🛒
            </Link>

            {token && user?.username && rolActual ? (
              <div className="flex items-center space-x-3 border-l pl-4 border-gray-200">
                <div className="text-right hidden sm:block">
                  {/* Mapea el nombre del rol traducido en lugar del código numérico bruto */}
                  <p className="text-xs text-solandre-verde font-bold tracking-wide uppercase">
                    {rolActual.nombre}
                  </p>
                  <p className="text-sm font-black text-solandre-oscuro">
                    {user.username}
                  </p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    toast.success("Vuelve pronto 👋");
                    navigate("/login");
                  }}
                  className="bg-red-50 hover:bg-red-100 text-red-600 p-2.5 rounded-xl text-sm font-semibold transition-colors"
                >
                  🚪
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="border-2 border-solandre-naranja text-solandre-naranja hover:bg-solandre-naranja hover:text-white px-5 py-2 rounded-full font-bold transition-all"
              >
                Ingresar
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
