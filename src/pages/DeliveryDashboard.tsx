import React from "react";

interface PedidoDelivery {
  id: number;
  cliente: string;
  direccion: string;
  telefono: string;
  metodoPago: string;
  total: number;
}

export default function DeliveryDashboard(): React.JSX.Element {
  const rutas: PedidoDelivery[] = [
    {
      id: 102,
      cliente: "Carlos Mendoza",
      direccion: "Av. Bolognesi #450 (Frente al parque)",
      telefono: "+51 984 123 456",
      metodoPago: "Efectivo (Paga con $20.00)",
      total: 14.5,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-solandre-oscuro">
          Repartos Pendientes 🛵
        </h1>
        <p className="text-gray-500 text-sm">
          Rutas asignadas para distribución
        </p>
      </div>

      <div className="max-w-2xl space-y-4">
        {rutas.map((ruta) => (
          <div
            key={ruta.id}
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-black text-solandre-naranja">
                Entrega # {ruta.id}
              </span>
              <span className="text-lg font-black text-solandre-oscuro">
                ${ruta.total.toFixed(2)}
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-600 mb-6">
              <p>
                👤 <strong className="text-solandre-oscuro">Cliente:</strong>{" "}
                {ruta.cliente}
              </p>
              <p>
                📍 <strong className="text-solandre-oscuro">Dirección:</strong>{" "}
                {ruta.direccion}
              </p>
              <p>
                📞 <strong className="text-solandre-oscuro">Teléfono:</strong>{" "}
                {ruta.telefono}
              </p>
              <p>
                💳 <strong className="text-solandre-oscuro">Pago:</strong>{" "}
                {ruta.metodoPago}
              </p>
            </div>

            <button className="w-full bg-solandre-naranja hover:bg-solandre-naranjaHover text-white py-3 rounded-xl font-bold text-sm transition-colors shadow-sm">
              Marcar como Entregado 👍
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
