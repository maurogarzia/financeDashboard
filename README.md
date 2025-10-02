# Dashboard de Finanzas

## Descripción

Dashboard de Finanzas personal hecho en React + TypeScript.
Permite registrar ingresos y gastos, mostrar balance, ver gráficos de torta y barras, y filtrar movimientos por fecha, tipo y búsqueda.

La app está diseñada como Progressive Web App (PWA):

Instalable en celular como app independiente.

Funciona offline gracias a localStorage y service worker.

Sin necesidad de backend, todos los datos se guardan localmente.

# Tecnologías

-React 

-TypeScript

-Vite

-Zustand (estado global y persistente)

-Recharts (gráficos)

-SweetAlert2 (alertas)

-Vite PWA Plugin (Progressive Web App)

## Instalación
1. Clonar repositorio
```bash
git clone https://github.com/maurogarzia/financeDashboard
cd financedashboard
```
2. Instalar dependencias
```bash
npm install
```
3.Levantar desarrollo
```bash
npm run dev
``` 
4. Generar build (PWA activa)
```bash
npm run build
```
5. Previsualizar build
```bash
npm run preview
```
⚠️ Importante: la opción de “Agregar a pantalla de inicio” solo funciona en build, no en dev.

## Uso en el teléfono
1.Abrir la URL del build (Vercel) en el navegador del teléfono.

2.Chrome Android: aparecerá el banner “Agregar a pantalla de inicio”.

3.iOS Safari: usar Compartir → Agregar a pantalla de inicio.

4.na vez instalada, la app funciona offline, usando los datos guardados en localStorage.

## Estructura del proyecto

```bash
src/
 ├─ components/         # Componentes React
 │   ├─ AddMovents
 │   ├─ BalanceCharts
 │   ├─ Header
 │   ├─ Home
 │   ├─ TableOfMovents
 │   └─ Home
 ├─ Scrrens/
 │   └─ MainScreen
 ├─ store/              # Zustand stores
 │   ├─ useStoreMovents.ts
 │   └─ useStoreModal.ts
 ├─ types/              # Interfaces TypeScript
 │   └─ IMovents.ts
 ├─ App.tsx
 ├─ App.css
 ├─ index.css
 └─ main.tsx
public/
 └─ manifest.json       # Configuración PWA
```

Vercel: https://finance-dashboard-ten-ruby.vercel.app/

