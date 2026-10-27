/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        solandre: {
          naranja: "#FF6B00", // Color principal de acción / apetito
          naranjaHover: "#E05E00",
          verde: "#2E7D32", // Color de frescura / salud
          verdeHover: "#1B5E20",
          fondo: "#F9F9F9", // Fondo gris claro y limpio
          oscuro: "#1A1A1A", // Texto principal
        },
      },
    },
  },
  plugins: [],
};
