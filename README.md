# Ejercicio 1 – Prueba de carga del servicio de login

## Requisitos

- K6: v2.2.0 o superior
- Windows 10/11, Linux o macOS
- Git

## Estructura del repositorio

- script.js: script de carga con parametrización desde CSV
- users.csv: usuarios válidos para la prueba
- README.md: instrucciones de ejecución
- conclusiones.md: resumen ejecutivo de hallazgos

## Objetivo

Validar el servicio de login de Fake Store usando carga sostenida, con un escenario que alcance al menos 20 TPS y cumpla con los criterios de SLA:

- tiempo de respuesta máximo: 1.5 s
- tasa de error: menor al 3%
- validación funcional: status 200 y token presente

## Ejecución

1. Clonar el repositorio:

   git clone https://github.com/prisVegaTest/Automation_test_Perfomance.git
   cd Automation_test_Perfomance

2. Verificar la versión de K6:

   k6 version

3. Ejecutar la prueba:

   k6 run script.js

4. Opcional: para una prueba corta de smoke:

   k6 run script.js --vus 5 --duration 20s

## Resultado esperado

La prueba debe alcanzar al menos 20 TPS y cumplir los siguientes umbrales:

- p(95) < 1500 ms
- max < 2000 ms
- http_req_failed < 0.03
- checks > 0.97

## Nota de validación

La ejecución se realiza contra la API pública Fake Store y debe usar usuarios válidos para evitar respuestas 401 que se desvían del objetivo del escenario de carga.
