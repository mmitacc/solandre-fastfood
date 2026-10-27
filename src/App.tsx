import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Menu from "./pages/Menu";
import PaginaLogin from "./pages/LoginPage";

// Importación de tus 3 nuevas páginas simples
import AdminDashboard from "./pages/AdminDashboard";
import KitchenOrders from "./pages/KitchenOrders";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import RutaProtegida from "./components/RutaProtegida";

function Inicio() {
  return (
    <div className="text-center py-16 bg-gradient-to-br from-orange-50 to-green-50 rounded-3xl p-8">
      <h2 className="text-5xl font-black text-solandre-oscuro mb-4">
        ¡Bienvenidos a Solandre!
      </h2>
      <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
        La velocidad del fast-food combinada con la frescura que tu cuerpo
        necesita.
      </p>
      <Link
        to="/menu"
        className="bg-solandre-naranja hover:bg-solandre-naranjaHover text-white px-8 py-4 rounded-full font-bold shadow-md inline-block transition-transform hover:scale-105"
      >
        Explorar Menú 🍔
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/solandre-fastfood">
      <Toaster richColors position="top-right" />
      <Routes>
        {/* RUTA INDEPENDIENTE: El login se muestra sin el Navbar ni el Footer de la app */}
        <Route path="/login" element={<PaginaLogin />} />

        {/* RUTAS GENERALES CON LAYOUT */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Inicio />} />
          <Route path="menu" element={<Menu />} />

          {/* 🔐 RUTAS PROTEGIDAS CON FILTRADO NUMÉRICO DIRECTO */}

          {/* Solo Administradores (rol_id: 1) */}
          <Route element={<RutaProtegida rolesPermitidos={[1]} />}>
            <Route path="admin" element={<AdminDashboard />} />
          </Route>

          {/* Solo Personal de Cocina (rol_id: 2) */}
          <Route element={<RutaProtegida rolesPermitidos={[2]} />}>
            <Route path="cocina" element={<KitchenOrders />} />
          </Route>

          {/* Solo Personal de Delivery (rol_id: 3) */}
          <Route element={<RutaProtegida rolesPermitidos={[3]} />}>
            <Route path="delivery" element={<DeliveryDashboard />} />
          </Route>

          {/* Controlador global para rutas no existentes */}
          <Route
            path="*"
            element={
              <div className="text-center py-20 font-semibold text-gray-500">
                Página no encontrada 404
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
