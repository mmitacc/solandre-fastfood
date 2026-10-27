import React from "react";

interface PedidoCocina {
  id: number;
  hora: string;
  items: string[];
  notas: string;
  estado: "Pendiente" | "Preparando";
}

export default function KitchenOrders(): React.JSX.Element {
  const pedidos: PedidoCocina[] = [
    {
      id: 104,
      hora: "11:15 AM",
      items: ["2x Arroz con queso y chorizo", "1x Bowl Verde Crujiente"],
      notas: "Sin tomate en el bowl verde, por favor.",
      estado: "Preparando",
    },
    {
      id: 105,
      hora: "11:21 AM",
      items: ["1x Burger Solandre Premium", "1x Papas fritas grandes"],
      notas: "Extra salsa de naranja.",
      estado: "Pendiente",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-solandre-oscuro">
          Monitor de Cocina 🧑‍🍳
        </h1>
        <p className="text-gray-500 text-sm">
          Órdenes en cola para preparación inmediata
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pedidos.map((pedido) => (
          <div
            key={pedido.id}
            className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <span className="text-lg font-black text-solandre-oscuro">
                  Orden #{pedido.id}
                </span>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    pedido.estado === "Preparando"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {pedido.estado}
                </span>
              </div>

              <ul className="space-y-2 mb-4">
                {pedido.items.map((item, idx) => (
                  <li key={idx} className="text-sm font-semibold text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>

              {pedido.notas && (
                <div className="bg-orange-50/60 p-3 rounded-xl border border-orange-100 text-xs text-solandre-naranja font-medium">
                  ⚠️ NOTA: {pedido.notas}
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-50">
              <span className="text-xs text-gray-400">
                Recibido: {pedido.hora}
              </span>
              <button className="bg-solandre-verde hover:bg-solandre-verdeHover text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors">
                Listo para Despacho ✓
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
