
export const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    "https://nox-weather-frontend.vercel.app",
    process.env.CLIENT_URL,
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  credentials: true,
};
