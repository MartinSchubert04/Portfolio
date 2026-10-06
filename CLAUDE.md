# CLAUDE.md

Portfolio de Martin Schubert con estética espacial: una escena 3D fija de fondo (astronauta flotando,
cohete volando, globo con costas reales), el contenido armado como una consola de control de misión
y, encima de todo, un vidrio de TV de tubo curvo con scanlines y ruido.
Tres materiales con un rol cada uno: sketch (diagramas), consola neumórfica (controles y lecturas) y
clay (cuerpos, tarjetas de proyecto y el botón principal).

## Dónde está cada decisión

| Pregunta | Archivo |
|---|---|
| Cómo tiene que verse algo (colores, tipografía, materiales, qué no hacer) | `DESIGN.md` |
| Qué se construyó, en qué orden y cómo se verificó cada fase | `docs/PLAN.md` |
| De dónde sale el diseño (análisis de las referencias) | `docs/design/reference-analysis.md` |
| Resultado de las auditorías de las skills y los desvíos | `docs/design/preflight.md` |
| Qué skills hay, de dónde vienen y cómo se actualizan | `.claude/skills/README.md` |

`DESIGN.md` manda sobre el código: si un cambio visual contradice ese archivo, primero se cambia el archivo.

## Comandos

```powershell
npm run dev      # servidor de desarrollo en http://localhost:5173
npm run build    # typecheck (tsc -b) + build de producción en dist/
npm run lint     # eslint
npm test         # vitest: src/lib y src/scene/choreography
```

Antes de dar un cambio por terminado: `npm run lint`, `npm test` y `npm run build` tienen que pasar.

## Estructura

```
src/assets/          modelos 3D (.glb), capturas de proyectos y el CV
src/data/            contenido: career, projects, skills, site, y continents.json (costas del globo)
src/lib/             lógica pura y testeada: contributions, github, orbits
src/hooks/           useGithub (un fetch para toda la página), useActiveSection, useNow, useReducedMotion
src/scene/           la escena 3D. Se carga con lazy(); nada fuera de esta carpeta importa three
  choreography.ts    pose del astronauta y del globo por sección (ancha y angosta). Testeado
  palette.ts         copia de los tokens que usa la escena
src/components/      una sección por archivo, más OrbitMap, LedCalendar, las barras, SketchDefs y CrtOverlay
src/index.css        tokens (@theme) y las clases de los tres materiales (.sketch, .neu*, .clay*)
```

## Flujo de trabajo con skills

Para cualquier cambio de UI, en este orden:

1. **Leer `DESIGN.md`.** Define tokens, materiales y prohibiciones. No inventar colores ni radios.
2. **`design-taste-frontend`**, sección 0: declarar la lectura del brief en una línea antes de tocar código.
3. **`image-to-code`**, si el cambio parte de una imagen: analizarla (texto, tipografía, espaciado,
   color, componentes) y dejar el análisis en `docs/design/`. Este entorno no genera imágenes; las
   referencias las da el usuario.
4. Implementar.
5. Mirarlo: capturas a 1366x768 y 390x844. La escena 3D no se puede revisar leyendo código.
6. **`design-taste-frontend`**, sección 14: correr el pre-flight check completo.
7. **`web-design-guidelines`**: auditar los archivos tocados.
8. Anotar en `docs/design/preflight.md` lo que cambió en la auditoría, y en `docs/PLAN.md` la fase.

## Desvíos acordados

Reglas de las skills que este proyecto incumple a propósito. No "corregirlas" sin que el usuario lo pida.

| Regla | Qué hace el proyecto | Por qué |
|---|---|---|
| taste 6.C / 8: modo claro y oscuro | Solo oscuro | Es el espacio; la escena, el neumorfismo oscuro y la referencia son de fondo casi negro |
| taste 9.F: sin tiras de hora o lugar | Barra de estado con hora UTC | Es la barra inferior de la referencia (space-station); todos sus campos son datos reales |
| taste 4.8 / 9.E: sin SVG decorativos hechos a mano | El mapa de órbitas y la trayectoria de carrera son SVG propios | El brief pide "conceptual sketch"; son diagramas con contenido, no adornos |
| taste 3.A: Motion para animar | react-three-fiber para la escena, CSS para el resto | El movimiento vive en WebGL; sumar Motion para cuatro transiciones no se justifica |
| taste 4.2: un acento, saturación menor a 80% | Ámbar es el acento; menta es la tinta de líneas y lecturas, y es saturada | Es la paleta de la referencia, con la menta ya suavizada de `#22FFC4` a `#5CF2CB` |
| taste 4.4: un solo sistema de esquinas | Cuatro radios, uno por material | Regla documentada en `DESIGN.md`, secciones 4 y 9: consola 20, hundido 12, clay 28, controles pill |
| image-to-code 2: generar imágenes primero | Se analizan las referencias del usuario | No hay herramienta de generación de imágenes en el entorno |

## Convenciones de código

- TypeScript estricto, sin `any`. Prettier según `.prettierrc` (sin punto y coma, 120 columnas).
- Imports con el alias `@/` (apunta a `src/`).
- Los textos visibles van en inglés y son literales ("Contact", no "Transmission"); documentación, en español.
- Nada de em-dash ni en-dash en texto visible. Tres puntos como `…`. Comillas tipográficas.
- Fechas y números con `Intl.*`, nunca formateados a mano.
- En la escena: nada de `useState` para valores continuos. Se muta el objeto de three dentro de
  `useFrame`; el puntero se guarda en un objeto de módulo.
- Todo lo que se crea con `new` de three (geometrías, materiales) se libera en el cleanup del efecto.
- Solo se anima `transform` y `opacity`, siempre dentro de `@media (prefers-reduced-motion: no-preference)`.
  La escena y el mapa de órbitas además respetan el botón Pause Motion (prop `still` / `animate`).
- Nada de `filter` de CSS o SVG sobre el canvas de la escena ni sobre nada que se repinte en cada
  frame: el navegador lo rasteriza en CPU y la página se traba (pasó con la primera versión del
  CRT). Los efectos sobre la escena van en un shader, como `src/scene/TubeWarp.tsx`.
- El texto y los controles no se deforman: se movería lo que se ve pero no dónde cae el clic.
  La capa CRT no lleva flicker ni glitches.
- Los modelos 3D son CC BY 4.0: el crédito visible en `Contact.tsx` no se quita.

## Principios de trabajo

1. **Pensar antes de codear.** Explicitar supuestos; si hay dos lecturas posibles, mostrarlas en vez de elegir en silencio.
2. **Simplicidad primero.** El mínimo código que resuelve lo pedido. Sin abstracciones para un solo uso.
3. **Cambios quirúrgicos.** Tocar solo lo necesario; cada línea cambiada se explica por el pedido.
4. **Ejecución por objetivos.** Cada paso tiene una verificación concreta (ver el formato de `docs/PLAN.md`).
