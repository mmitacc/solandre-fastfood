import React from "react";
import { Navigate, useLocation, Outlet } from "react-router";
import { useAuthStore } from "../stores/useAuthStore";

interface Props {
  children?: React.ReactNode;
  rolesPermitidos?: number[]; // ◄ Agregamos el arreglo de números del diccionario
}

export default function RutaProtegida({ children, rolesPermitidos }: Props) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  // Selector directo para obtener el código del rol guardado
  const userRoleCode = useAuthStore((state) => state.user?.role); 
  const location = useLocation();

  // 1. Si NO está autenticado, lo mandamos al Login guardando la ubicación de origen
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Si está autenticado pero se especificaron roles restrictivos
  if (rolesPermitidos) {
    const roleId = userRoleCode ? Number(userRoleCode) : null;

    // Si el código numérico de su rol no está en la lista permitida, lo denegamos a la raíz
    if (roleId === null || !rolesPermitidos.includes(roleId)) {
      return <Navigate to="/" replace />;
    }
  }

  // 3. Permite el acceso. Si se usa como componente envoltorio usa 'children', si se usa como Layout usa '<Outlet />'
  return children ? <>{children}</> : <Outlet />;
}
