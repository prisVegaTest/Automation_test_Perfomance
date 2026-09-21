# Conclusiones del ejercicio

## Objetivo

Realizar una prueba de carga para el servicio de login de Fake Store, parametrizando credenciales desde un archivo CSV y verificando el cumplimiento de los criterios definidos por el escenario.

## Hallazgos

- El escenario de carga se modeló con un patrón de ramping arrival rate para alcanzar un throughput sostenido de 20 TPS.
- La prueba valida que la respuesta del login tenga status 200, tiempo inferior a 1.5 s y presencia de token.
- La validación de rendimiento se centra en percentiles, tiempo máximo y tasa de errores para asegurar que la API soporte la carga esperada.
- La API pública Fake Store responde bien con usuarios válidos; no se recomienda mezclar casos inválidos dentro del mismo escenario de carga cuando el objetivo es cumplir un SLA de éxito.

## Conclusión

La solución implementada sigue la lógica pedida para el ejercicio: parametrización desde CSV, ejecución reproducible con K6 y cumplimiento de SLA de rendimiento y estabilidad. La migración a escenarios separados para validos e inválidos puede ser útil para pruebas adicionales, pero no es necesario para el ejercicio base si el objetivo es validar la tasa de éxito del login con usuarios correctos.
