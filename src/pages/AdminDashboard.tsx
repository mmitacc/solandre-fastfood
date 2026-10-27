import React from "react";

export default function AdminDashboard(): React.JSX.Element {
  const estadisticas = {
    ingresosHoy: 1250.45,
    pedidosCompletados: 48,
    platoEstrella: "Arroz con queso y chorizo",
    tiempoPromedioEntrega: "22 min",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-solandre-oscuro">
          Panel de Administración
        </h1>
        <p className="text-gray-500 text-sm">
          Resumen operativo y financiero de Solandre
        </p>
      </div>

      {/* Grid de Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Ingresos de Hoy
          </p>
          <p className="text-3xl font-black text-solandre-verde mt-1">
            ${estadisticas.ingresosHoy}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Pedidos Completados
          </p>
          <p className="text-3xl font-black text-solandre-oscuro mt-1">
            {estadisticas.pedidosCompletados} 🍔
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Plato Más Vendido
          </p>
          <p className="text-lg font-black text-solandre-naranja mt-2 line-clamp-1">
            {estadisticas.platoEstrella}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Tiempo de Entrega
          </p>
          <p className="text-3xl font-black text-gray-700 mt-1">
            {estadisticas.tiempoPromedioEntrega}
          </p>
        </div>
      </div>
    </div>
  );
}
