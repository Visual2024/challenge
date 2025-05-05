# Documentación de Funcionalidades del Proyecto

## Índice
- [Documentación de Funcionalidades del Proyecto](#documentación-de-funcionalidades-del-proyecto)
  - [Índice](#índice)
  - [Introducción](#introducción)
  - [Componentes Principales](#componentes-principales)
    - [DataUploader](#datauploader)
    - [DealTable](#dealtable)
  - [Servicios de Transformación](#servicios-de-transformación)
    - [Transformación de CRM A (JSON)](#transformación-de-crm-a-json)
    - [Transformación de CRM B (CSV)](#transformación-de-crm-b-csv)
  - [Validaciones](#validaciones)
  - [Internacionalización](#internacionalización)
  - [Interfaz de Usuario](#interfaz-de-usuario)

## Introducción

Este proyecto es una aplicación para gestionar y visualizar comisiones de ventas desde diferentes sistemas CRM. Permite a los usuarios cargar datos en diferentes formatos (JSON y CSV), transformarlos a un formato estandarizado, validarlos y mostrarlos en una tabla unificada.

## Componentes Principales

### DataUploader

**Ubicación:** `src/components/DataUpload/DataUpload.tsx`

**Funcionalidad:**
- Permite cargar datos de ventas desde diferentes fuentes CRM
- Soporta dos formatos de entrada:
  - CRM A: Formato JSON
  - CRM B: Formato CSV
- Proporciona validación de datos y manejo de errores
- Muestra ejemplos de estructura de datos para facilitar el uso

**Características técnicas:**
- Utiliza estados de React para gestionar los datos de entrada y los estados de carga
- Implementa transformadores específicos para cada formato de CRM
- Ofrece feedback visual mediante alertas de éxito y error
- Incluye funcionalidad para cargar datos de ejemplo
- Utiliza componentes de UI como Tabs, Accordion y Cards para mejorar la experiencia de usuario

**Razones de implementación:**
- Se eligió separar los formatos en pestañas para mejorar la usabilidad
- Se implementó la carga de datos de ejemplo para facilitar las pruebas
- Se utilizan transformadores separados para mantener la modularidad y facilitar la adición de nuevos formatos CRM en el futuro

### DealTable

**Ubicación:** `src/components/DealTables/Deals_Tables.tsx`

**Funcionalidad:**
- Muestra los datos de ventas procesados en una tabla estructurada
- Calcula y muestra el total de comisiones
- Formatea valores monetarios y fechas según la localización

**Características técnicas:**
- Utiliza componentes de tabla para mostrar los datos de manera organizada
- Implementa funciones de formateo para moneda y fechas
- Muestra un resumen del total de comisiones
- Maneja casos donde no hay datos disponibles

**Razones de implementación:**
- Se utilizó un diseño de tabla para facilitar la visualización de múltiples campos
- Se agregó una tarjeta de resumen para destacar la información más relevante (total de comisiones)
- Se implementó formateo de moneda y fechas para mejorar la legibilidad

## Servicios de Transformación

### Transformación de CRM A (JSON)

**Ubicación:** `src/services/tranformsJson/transformCrmAData.ts`

**Funcionalidad:**
- Convierte datos JSON del CRM A al formato estandarizado de la aplicación
- Mapea campos específicos del CRM A a campos estandarizados
- Calcula comisiones basadas en reglas de negocio

**Razones de implementación:**
- Se separó la lógica de transformación para mantener el código modular
- Permite adaptar fácilmente a cambios en la estructura de datos del CRM A

### Transformación de CRM B (CSV)

**Ubicación:** `src/services/transformsCsv/transformCrmBData.ts`

**Funcionalidad:**
- Parsea datos CSV a objetos JavaScript
- Convierte datos del CRM B al formato estandarizado
- Calcula comisiones según reglas específicas

**Razones de implementación:**
- Se implementó un parser CSV específico para manejar este formato de datos
- Mantiene la coherencia con la transformación de JSON pero adaptada a las particularidades del CSV

## Validaciones

**Ubicación:** `src/validations/validation.ts`

**Funcionalidad:**
- Valida los datos transformados antes de mostrarlos
- Filtra entradas inválidas o incompletas
- Asegura la integridad de los datos mostrados

**Razones de implementación:**
- Garantiza que solo los datos válidos lleguen a la interfaz de usuario
- Previene errores causados por datos malformados o incompletos

## Internacionalización

**Funcionalidad:**
- Soporta múltiples idiomas en la interfaz de usuario
- Utiliza la biblioteca next-intl para gestionar traducciones
- Permite una experiencia localizada para usuarios internacionales

**Razones de implementación:**
- Se implementó para hacer la aplicación accesible a usuarios de diferentes regiones
- Facilita la expansión a nuevos mercados sin cambios significativos en el código

## Interfaz de Usuario

**Funcionalidad:**
- Diseño responsivo adaptable a diferentes dispositivos
- Componentes reutilizables para mantener consistencia visual
- Feedback visual para acciones del usuario (carga, éxito, error)

**Características técnicas:**
- Utiliza componentes UI modulares para facilitar el mantenimiento
- Implementa estados visuales para diferentes situaciones (carga, error, éxito)
- Proporciona ayudas visuales como ejemplos y descripciones

**Razones de implementación:**
- Se priorizó la usabilidad y la experiencia de usuario
- Se diseñó para ser intuitivo incluso para usuarios no técnicos
- Se implementaron ayudas contextuales para facilitar el uso correcto de la aplicación
