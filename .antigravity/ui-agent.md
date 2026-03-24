SKILL: alphavet-mi-espacio-ui-agent

OBJETIVO
Generar interfaces modernas, limpias y consistentes con el ecosistema Mi Espacio (cliente) de AlphaVet usando React, Next.js y TailwindCSS. El diseño debe sentirse ligero, confiable, rápido y enfocado en experiencia de usuario.

--------------------------------------------------

DESIGN SYSTEM

COLORES
Primary: blue-600 (#2563EB)
Primary soft: blue-50, blue-100
Text main: slate-900
Text secondary: slate-500
Text muted: slate-400

Borders: slate-200

Backgrounds:
- white (cards)
- slate-50 (inputs, fondos suaves)
- slate-100 (disabled)

States:
- hover: border-blue-400
- focus: ring-blue-500
- disabled: opacity-60, cursor-not-allowed

Regla:
Todo debe usar escala slate + azul como acento.

--------------------------------------------------

ESPACIADOS

Container:
- max-w-6xl
- max-w-5xl
- max-w-[1600px]

Padding:
- p-4 mobile
- md:p-6
- lg:p-8

Gap:
- gap-3 (tight)
- gap-4 (cards)
- gap-5 (forms)
- gap-6 (sections)

Spacing vertical:
- space-y-6
- space-y-8

--------------------------------------------------

BORDES Y SHAPES

- rounded-lg: inputs, botones pequeños
- rounded-xl: cards
- rounded-full: avatars, badges

Borders:
- border-slate-200 default
- hover:border-blue-400 interactivo

--------------------------------------------------

SOMBRAS

- shadow-sm: botones
- shadow-md: hover cards
- shadow-lg: dropdowns

--------------------------------------------------

COMPONENTES BASE

CARD
- background blanco
- padding interno consistente (p-6, p-8)
- usar CardHeader para títulos

FIELD (FORM)
Estructura:
- Label arriba
- Input
- Error abajo

BUTTON
Variants:
- primary (azul)
- secondary (gris)
- danger (rojo)

Con icono:
- icono izquierda tamaño w-4 h-4

INPUT
- bg-slate-50
- rounded-lg
- text-sm
- focus:ring-1 focus:ring-blue-500

Nunca usar:
- borders fuertes
- sombras pesadas

--------------------------------------------------

CARDS INTERACTIVAS

Patrón:
- group
- hover:border-blue-400
- hover:shadow-md

Estructura:
- icono
- contenido
- footer con meta info

--------------------------------------------------

ACTION CARDS (ADD)

Patrón:
- border-dashed
- hover:bg-blue-50
- hover:border-blue-400
- animaciones con group

--------------------------------------------------

ICONOGRAFIA

Librería:
- lucide-react

Tamaños:
- 16px texto
- 20px botones
- 24px cards
- 48px destacados

Colores:
- default: text-slate-400
- hover: text-blue-600
- active: text-blue-700

--------------------------------------------------

UX PATTERNS

STEPPER
- mostrar progreso (paso actual / total)
- barra de progreso
- permitir regresar
- transiciones suaves

DRAFT STATE
- usar useState para draft
- actualizar con patch

AUTH UI
Estados:
- loading
- unauthenticated
- authenticated

Usar skeleton con animate-pulse

--------------------------------------------------

FORMULARIOS LARGOS

Patrón:
- secciones en cards
- header con título y descripción
- inputs en grid (1 o 2 columnas)
- botón de acción sticky abajo

--------------------------------------------------

LAYOUT

HEADER
- sticky top-0
- border bottom
- altura fija (h-16)

MAIN
- max-w-6xl mx-auto
- p-4 md:p-8

GRID
- grid-cols-1 sm:grid-cols-2

--------------------------------------------------

STACK TECNOLOGICO

Core:
- Next.js (pages router)
- React
- TypeScript

UI:
- TailwindCSS
- lucide-react

Estado:
- useState
- hooks custom

Networking:
- axios

Auth:
- next-auth

Routing:
- next/router

--------------------------------------------------

MICROINTERACCIONES

Siempre usar:
- transition-all
- duration-200 o duration-300

Hover:
- cambios de color
- cambios de borde
- cambios de fondo
- scale en iconos

--------------------------------------------------

ANTI-PATTERNS

No usar:
- modo oscuro
- colores fuera de slate + blue
- borders gruesos
- sombras pesadas
- layouts sin spacing consistente
- botones sin feedback visual

--------------------------------------------------

FILOSOFIA

- Interfaces limpias y sin ruido
- UX guiada, el usuario no debe perderse
- Diseño suave con enfoque en confianza
- Flujo rápido y claro

--------------------------------------------------

PROMPT BASE PARA AGENTE

You are a frontend UI agent specialized in AlphaVet Mi Espacio.

Rules:
- Use TailwindCSS with slate and blue palette
- Use rounded-xl cards, soft borders and clean spacing
- Use lucide-react icons only
- Respect spacing system (p-4 md:p-8, gap-4, gap-6)
- Inputs must use bg-slate-50 and focus:ring-blue-500
- Cards must include hover interactions
- Layout must be centered with max-w-6xl
- Use Card and CardHeader for sections
- Use stepper for multi-step flows
- Always include micro-interactions

Design must feel:
clean, modern, lightweight, medical-tech

Avoid:
heavy UI, dark themes, inconsistent spacing, random colors