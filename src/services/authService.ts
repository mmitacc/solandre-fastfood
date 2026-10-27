import { api } from "../lib/axios";
import type { LoginFormData } from "../schemas/loginSchema";

// ◄ Definimos la estructura exacta que retorna tu backend JSON
export interface LoginResponse {
  access_token: string;
  token_type: string;
  usuario_id: number;
  rol_id: number;
  nombre_completo: string;
  email: string;
}

export interface CambiarPasswordInput {
  password: string;
}

/**
 * Autentica un usuario en el sistema
 * Envía las credenciales y retorna los datos del token y perfil del backend
 */
export async function loginAuthService(
  datos: LoginFormData,
): Promise<LoginResponse> {
  // Axios devuelve una estructura AxiosResponse donde la respuesta real está en .data
  const { data } = await api.post<LoginResponse>("/auth/login", datos);
  return data; // Retorna directamente el objeto LoginResponse
}

/**
 * Cambia la contraseña de un usuario actualmente logeado
 */
export async function cambiarPasswordAutenticadoService(
  datos: CambiarPasswordInput,
): Promise<void> {
  await api.patch("/auth/new-password", datos);
}
