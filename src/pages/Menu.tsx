import React, { useEffect, useState } from "react";
import { api } from "../lib/axios";
import ProductCard from "../components/ProductCard";
import type { Producto } from "../types";

export default function Menu(): React.JSX.Element {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    // Usas 'api' que ya incluye automáticamente el Token y el BaseURL de tus .env
    api
      .get<Producto[]>("/catalogo/platos")
      .then((response) => {
        setProductos(response.data);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error cargando el menú:", error);
      });
  }, []);

  if (cargando) {
    return (
      <div className="text-center py-20 font-medium text-solandre-verde">
        Preparando el menú... 🧑‍🍳
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-black text-solandre-oscuro mb-2">
        Nuestro Menú
      </h1>
      <p className="text-gray-600 mb-8">
        Elige entre nuestras opciones rápidas, deliciosas y siempre frescas.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {productos.map((prod) => (
          <ProductCard
            key={prod.plato_id}
            producto={prod}
            onAgregar={(p: Producto) => alert(`Agregado: ${p.nombre}`)}
          />
        ))}
      </div>
    </div>
  );
}
