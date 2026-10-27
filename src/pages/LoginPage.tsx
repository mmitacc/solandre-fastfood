import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate } from "react-router";
import type { LoginFormData } from "../schemas/loginSchema";
import { toast } from "sonner";
import { extraerMensajeError } from "../lib/errorHandle";
import { loginAuthService } from "../services/authService";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function PaginaLogin() {
  const { login: setAuth } = useAuthStore();
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (datos: LoginFormData) => {
    setCargando(true);
    try {
      const respuesta = await loginAuthService(datos);
      // 1. Acceso directo al token (ya no se usa respuesta.data.token)
      const token = respuesta.access_token;

      // 2. Extraemos los datos del usuario directamente del JSON de respuesta o del JWT
      const usuario = {
        id: respuesta.usuario_id,
        username: respuesta.nombre_completo,
        email: respuesta.email,
        role: String(respuesta.rol_id),
      };

      setAuth(token, usuario);
      toast.success(`¡Bienvenido: ${usuario.username}!`);
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(extraerMensajeError(err));
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-solandre-fondo flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto w-full sm:max-w-md">
        <div className="flex justify-center mb-4">
          <div className="p-3.5 bg-solandre-naranja rounded-2xl text-white shadow-md shadow-orange-200 flex items-center justify-center animate-bounce">
            {/* Icono nativo de Comida / Hamburguesa */}
            <svg
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 15.562A2 2 0 0120 17H4a2 2 0 01-1-1.438V15h18v.562zm0-3.562H3v1h18v-1zm-1-3.292A5.002 5.002 0 0012 3a5.002 5.002 0 00-8 5.708l.124.292h15.752l.124-.292zM3 19h18v1H3v-1z"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-center text-4xl font-black text-solandre-oscuro tracking-tight">
          SOLA<span className="text-solandre-verde">NDRE</span>
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500 font-medium">
          Inicia sesión para pedir tu comida rápida y fresca favorita
        </p>
      </div>

      <div className="mt-8 sm:mx-auto w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100 mx-4 sm:mx-0">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Campo: Email / Usuario */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-solandre-oscuro"
              >
                Correo Electrónico
              </label>
              <div className="mt-1">
                <input
                  {...register("email", {
                    required: "El correo es obligatorio",
                  })}
                  id="email"
                  type="text"
                  autoComplete="email"
                  className={`appearance-none block w-full px-3 py-2.5 border ${
                    errors.email
                      ? "border-red-300 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-200 placeholder-gray-400 focus:ring-solandre-naranja focus:border-solandre-naranja"
                  } rounded-xl shadow-sm focus:outline-none focus:ring-2 sm:text-sm transition-all`}
                  placeholder="tu-correo@solandre.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-600 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Campo: Contraseña */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-solandre-oscuro"
              >
                Contraseña
              </label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <input
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                  })}
                  id="password"
                  type={mostrarPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className={`appearance-none block w-full pl-3 pr-10 py-2.5 border ${
                    errors.password
                      ? "border-red-300 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-200 placeholder-gray-400 focus:ring-solandre-naranja focus:border-solandre-naranja"
                  } rounded-xl focus:outline-none focus:ring-2 sm:text-sm transition-all`}
                  placeholder="••••••••"
                />

                {/* Botón del Ojo */}
                <button
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-solandre-oscuro transition-colors"
                >
                  {mostrarPassword ? (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Opciones extras */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-solandre-verde focus:ring-solandre-verde border-gray-300 rounded-md"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-xs text-gray-600 font-medium"
                >
                  Recordarme en este equipo
                </label>
              </div>

              <div className="text-xs">
                <a
                  href="#"
                  className="font-bold text-solandre-naranja hover:text-solandre-naranjaHover transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            {/* Botón Submit */}
            <div>
              <button
                type="submit"
                disabled={cargando}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-solandre-naranja hover:bg-solandre-naranjaHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-solandre-naranja disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-98"
              >
                {cargando ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Autenticando...
                  </span>
                ) : (
                  "¡Ingresar a Solandre! 🍔"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
