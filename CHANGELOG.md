# Changelog

Todos los cambios notables en el Framework serán documentados acá.

Formato sugerido: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
Semántica sugerida: [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2024-05-01

### Features

- Nueva estructura de proyecto
- Nueva estructura de commonActions
- Nuevas funciones para generar data aleatoria (utils)
- Nuevos comentarios y enlaces de ayuda en el file commonActions
- commonActions [v1.0]
- utils [v1.1]
- UI Testing | npx playwright test loquesea.spec.ts --ui
- `locator.or()` ahora permite crear un único localizador que coincida con dos localizadores distintos
- `locator.filter()` ahora permite localizar elementos que no estén presentes utilizando `.filter({ hasNot: 'text in column 1' })`

### Correcciones

- Mejoras en la interacción con selectores y locators
- Mejoras en el formato de los reportes
- Mejoras en el peso total de los reportes generados
- Mejoras en el peso total del artefacto generado en el Pipeline

### Cambios

- Optimizados los tiempos de espera de acciones como los `click()`
- Optimizados los tiempos de espera de los casos fallidos
- Actualizados Playwright [v1.29] hacia [v1.33]
- Actualizados los paquetes y dependencias del proyecto

### Removidos

- Antiguo commonActions
- Estructura vieja
``