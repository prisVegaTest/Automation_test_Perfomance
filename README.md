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
- summary.json: evidencia exportada por K6 en una ejecución de prueba

## Objetivo

Validar el servicio de login de Fake Store usando carga sostenida, con un escenario que alcance al menos 20 TPS y cumpla con los criterios de SLA:

- tiempo de respuesta máximo: 1.5 s
- tasa de error: menor al 3%
- validación funcional: status 200 y token presente

## Instalación de K6

### Opción 1: con winget (Windows)

```powershell
winget install --id Grafana.k6 -e
```

Si la instalación no queda disponible en el PATH, ejecuta K6 directamente desde la ruta de instalación:

```powershell
& "C:\Program Files\k6\k6.exe" version
```

### Opción 2: verificar que quede disponible

```powershell
k6 version
```

Si el comando no es reconocido, usa la ruta directa anterior.

## Clonar y ejecutar el proyecto

1. Clonar el repositorio:

```powershell
git clone https://github.com/prisVegaTest/Automation_test_Perfomance.git
cd .\Automation_test_Perfomance
```

2. Verificar la versión de K6:

```powershell
k6 version
```

Si K6 no está en PATH:

```powershell
& "C:\Program Files\k6\k6.exe" version
```

3. Ejecutar la prueba completa:

```powershell
k6 run script.js
```

O bien, si K6 no está en PATH:

```powershell
& "C:\Program Files\k6\k6.exe" run script.js
```

4. Ejecutar una prueba corta de smoke:

```powershell
k6 run script.js --vus 5 --duration 20s
```

O:

```powershell
& "C:\Program Files\k6\k6.exe" run script.js --vus 5 --duration 20s
```

5. Generar evidencia para revisión de resultados:

```powershell
k6 run script.js --summary-export=summary.json
```

O:

```powershell
& "C:\Program Files\k6\k6.exe" run script.js --summary-export=summary.json
```

## Resultado esperado

La prueba debe alcanzar al menos 20 TPS y cumplir los siguientes umbrales:

- p(95) < 1500 ms
- max < 2000 ms
- http_req_failed < 0.03
- checks > 0.97

## Nota de validación

La ejecución se realiza contra la API pública Fake Store y debe usar usuarios válidos para evitar respuestas 401 que se desvían del objetivo del escenario de carga.

## Evidencia

El archivo summary.json se genera con la opción `--summary-export` y sirve como evidencia objetiva para el evaluador; se puede revisar directamente desde el repositorio.
