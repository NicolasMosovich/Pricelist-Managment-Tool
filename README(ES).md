# Herramienta de Gestor de Proveedores

Una aplicación web para gestionar listas de precios de proveedores con análisis impulsado por inteligencia artificial.

Descripción:

- Esta herramienta permite a las empresas gestionar y revisar listas de precios de proveedores de manera eficiente. Los usuarios pueden ver proveedores, comparar versiones de listas de precios, aprobar o rechazar listas entrantes, y realizar consultas en lenguaje natural sobre los datos de precios mediante IA.

Funcionalidades

- Ver y gestionar proveedores
- Revisar listas de precios nuevas e históricas
- Aprobar, rechazar o denegar parcialmente ítems de una lista de precios
- Asistente de IA (Gemini) para consultas en lenguaje natural sobre precios
- Descargar archivos Excel originales enviados por los proveedores

Tecnologías:

Backend:

- Java 21
- Spring Boot
- Spring Data JPA
- MySQL

Frontend:

- React
- Vite

Cloud: Google Cloud Platform

- Cloud Run (hosting del backend)
- Cloud SQL (base de datos MySQL)
- Cloud Storage (archivos Excel de listas de precios)
- Firebase Hosting (hosting del frontend)

Inteligencia Artificial: Google Gemini API

Demo en Vivo:

- Frontend: https://enlightedcrm.web.app
- Backend: https://supplier-price-manager-1011808030987.us-central1.run.app
