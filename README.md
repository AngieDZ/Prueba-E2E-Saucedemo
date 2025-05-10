# Proyecto de Automatización con Playwright

Este proyecto contiene pruebas automatizadas End-to-End (E2E) utilizando [Playwright] para validar distintos flujos del sistema **SauceDemo**.

# Estructura del proyecto

├── fixtures/ # Datos estáticos para pruebas (usuarios, pagos)
├── pages/ # Clases de Page Object Model
├── tests/ # Archivos de pruebas E2E
├── playwright.config.js # Configuración de Playwright
├── package.json
└── README.md

# Ejecutar todas las pruebas
npx playwright test

# Ejecutar prueba especifica
npx playwright test tests/e2e_1FlujoCompra_Alternos.spec.js

# Ver reporte
npx playwright show-report





