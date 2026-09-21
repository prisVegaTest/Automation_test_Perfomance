import http from "k6/http";
import { check, sleep } from "k6";
import { SharedArray } from "k6/data";

function parseCsv(csvText) {
  const lines = csvText.trim().split(/\r?\n/).filter((line) => line.trim() !== "");
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((header) => header.trim());

  return lines.slice(1).map((line) => {
    const values = line.split(",").map((value) => value.trim());
    const record = {};

    headers.forEach((header, index) => {
      record[header] = values[index] || "";
    });

    return record;
  });
}

// Cargar y parametrizar los datos del CSV usando SharedArray para optimizar memoria
const usersData = new SharedArray("users", function () {
  return parseCsv(open("./users.csv"));
});

export const options = {
  // Configuración de escenario para garantizar al menos 20 TPS de throughput sostenido
  scenarios: {
    login_load_test: {
      executor: "ramping-arrival-rate",
      startRate: 5,
      timeUnit: "1s",
      preAllocatedVUs: 20,
      maxVUs: 50,
      stages: [
        { duration: "30s", target: 20 }, // Ramp-up hasta 20 TPS
        { duration: "3m", target: 20 }, // Mantenimiento a 20 TPS sostenidos
        { duration: "30s", target: 0 }, // Ramp-down
      ],
    },
  },
  // Definición de Criterios de Aceptación (SLA)
  thresholds: {
    // 1. Tiempo de respuesta máximo de 1.5s (p95 o p99 según rigurosidad)
    http_req_duration: ["p(95)<1500", "max<2000"],
    // 2. Tasa de error aceptable menor al 3% del total de peticiones
    http_req_failed: ["rate<0.03"],
    // 3. Chequeo funcional de respuestas exitosas
    checks: ["rate>0.97"],
  },
};

export default function () {
  // Selección aleatoria o secuencial de credenciales
  const user = usersData[Math.floor(Math.random() * usersData.length)];

  const url = "https://fakestoreapi.com/auth/login";
  const payload = JSON.stringify({
    username: user.user,
    password: user.passwd,
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
    timeout: "60s",
  };

  const res = http.post(url, payload, params);

  // Validaciones del SLA y código de respuesta
  check(res, {
    "status is 200": (r) => r.status === 200,
    "response time < 1.5s": (r) => r.timings.duration <= 1500,
    "has token": (r) => {
      try {
        const body = r.json();
        return !!body && typeof body.token === "string" && body.token.length > 0;
      } catch (error) {
        return false;
      }
    },
  });

  sleep(1);
}
