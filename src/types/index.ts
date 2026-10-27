export interface Ingrediente {
  ingrediente_id: number;
  nombre: string;
}

export interface Producto {
  plato_id: number;
  nombre: string;
  descripcion: string;
  tipo: "Principal" | "Entrada" | "Bebida" | "Postre" | string;
  imagen_url: string;
  ingredientes: Ingrediente[];
  precio?: number;
}
