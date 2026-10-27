import React from "react";
import type { Producto } from "../types";

interface ProductCardProps {
  producto: Producto;
  onAgregar: (producto: Producto) => void;
}

export default function ProductCard({
  producto,
  onAgregar,
}: ProductCardProps): React.JSX.Element {
  const { nombre, descripcion, imagen_url, tipo, ingredientes } = producto;

  // Si tu API no devuelve precio directo, le asignamos uno por defecto temporal
  const precioSimulado = producto.precio ?? 12.5;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      {/* IMAGEN Y ETIQUETA DE TIPO */}
      <div className="relative h-52 bg-gray-100">
        <img
          src={imagen_url || "https://placeholder.com"}
          alt={nombre}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3 right-3 bg-solandre-verde text-white text-xs px-2.5 py-1 rounded-full font-bold shadow-sm">
          🏷️ {tipo}
        </span>
      </div>

      {/* CUERPO DE LA TARJETA */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-solandre-oscuro line-clamp-1">
          {nombre}
        </h3>

        {/* DESCRIPCIÓN CON SALTOS DE LÍNEA COMPATIBLES (\n) */}
        <p className="text-gray-500 text-sm mt-2 whitespace-pre-line line-clamp-3 flex-grow">
          {descripcion}
        </p>

        {/* MINI CARACTERÍSTICAS / INGREDIENTES */}
        <div className="mt-4 flex flex-wrap gap-1">
          {ingredientes.slice(0, 3).map((ing) => (
            <span
              key={ing.ingrediente_id}
              className="text-[11px] bg-orange-50 text-solandre-naranja px-2 py-0.5 rounded-md font-medium"
            >
              {ing.nombre}
            </span>
          ))}
          {ingredientes.length > 3 && (
            <span className="text-[11px] text-gray-400 self-center pl-1">
              +{ingredientes.length - 3} más
            </span>
          )}
        </div>

        {/* PRECIO Y ACCIÓN */}
        <div className="mt-5 flex items-center justify-between border-t border-gray-50 pt-4">
          <span className="text-xl font-black text-solandre-oscuro">
            ${precioSimulado.toFixed(2)}
          </span>
          <button
            onClick={() => onAgregar(producto)}
            className="bg-solandre-naranja hover:bg-solandre-naranjaHover text-white px-4 py-2 rounded-xl text-sm font-bold transition-all transform active:scale-95 shadow-sm"
          >
            Agregar +
          </button>
        </div>
      </div>
    </div>
  );
}
