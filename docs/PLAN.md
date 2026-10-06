# Plan

Plan de construcción del portfolio. Cada fase tiene un objetivo, qué skill la guía, qué entrega y
cómo se verifica. Mismo formato que `portfolio-athanor/docs/PLAN.md`.

## Objetivo

Un portfolio con estética espacial, con el astronauta flotando y el cohete volando de fondo (la idea
de la rama `rework` de [MartinSchubert04/Portfolio](https://github.com/MartinSchubert04/Portfolio)),
el estilo de [space-station](https://martinschubert04.github.io/space-station/) como referencia y
tres estilizaciones pedidas: neumorfismo, conceptual sketch y claymorphism. Mismo contenido que
`portfolio-athanor` (carrera, skills, proyectos, actividad de GitHub).

**Hecho significa:** el sitio corre con `npm run dev`, `lint`, `test` y `build` pasan, se ve bien a
1366x768 y a 390x844, y las dos auditorías de `docs/design/preflight.md` están corridas.

## Insumos

| Insumo | De dónde sale |
|---|---|
| Metodología (estructura de docs, skills, flujo) | `portfolio-athanor` |
| Contenido | `portfolio-athanor/src/data` (sale del CV, `src/assets/MartinSchubert.pdf`) y sus capturas de proyectos a color |
| Escena 3D, modelos del astronauta y el cohete | Rama `rework` de `Portfolio`, `src/components/SpaceScene` y `src/assets/3d` |
| Paleta, fuente mono, costas del globo | Repo `space-station`: `src/index.css` y `src/data/continents.json` |
| Dirección visual | Dos capturas de space-station, en `docs/design/refs/` |
| Reglas de diseño | Skills en `.claude/skills/` |

## Fases

| # | Fase | Skill o guía | Entrega | Verificación | Estado |
|---|---|---|---|---|---|
| 0 | Relevamiento | - | Metodología de athanor, escena de `rework`, tokens de space-station, licencias de los modelos | Los `.glb` declaran autor y CC BY 4.0 en sus metadatos | Hecho |
| 1 | Lectura del brief y diales | `design-taste-frontend` §0-1 | Lectura en una línea, diales 8 / 7 / 4 | Escrita en `docs/design/reference-analysis.md` | Hecho |
| 2 | Análisis de referencias | `image-to-code` §8-9, 21-25 | Tabla "qué se ve / dónde quedó" por referencia y el rol de cada estilo | Cada rasgo tiene destino o está en "Lo que se dejó afuera" | Hecho |
| 3 | Sistema de diseño | awesome-design-md | `DESIGN.md`, nueve secciones | Los tokens de `src/index.css` y `src/scene/palette.ts` coinciden con la tabla de colores | Hecho |
| 4 | Lógica | - | `src/lib` (contributions, github, orbits) y `src/scene/choreography.ts` | 15 tests de vitest | Hecho |
| 5 | Escena 3D | `DESIGN.md` §4 y §6 | `src/scene`: estrellas, globo, cohete con plan de vuelo, astronauta, poses por sección | Capturas en Edge headless con WebGL por software; sin errores en consola | Hecho |
| 6 | Estructura y barras | `DESIGN.md` §4-5 | `TopBar`, `StatusBar`, `Section`, tokens y clases de los tres materiales | `tsc -b` y `eslint` limpios | Hecho |
| 7 | Secciones | `DESIGN.md` §5 | Hero, Career, Skills, Projects, Activity, Contact | Capturas a 1366x768 y 390x844, sin scroll horizontal | Hecho |
| 8 | Estados e interacción | `design-taste-frontend` §4.5, `dataviz` | Skeleton, error con reintento, tabs con teclado, lectura de un día al apuntar, Pause Motion | Probado en headless: clic en un tab, clic en Pause (la escena queda quieta y salta a la pose) | Hecho |
| 9 | Auditoría | `design-taste-frontend` §14, `web-design-guidelines` | `docs/design/preflight.md` | Cada fila tiene estado; los desvíos están en `CLAUDE.md` | Hecho |
| 10 | Deploy | - | `.github/workflows/deploy.yml` | `npm run build` genera `dist/` con rutas relativas | Workflow escrito, sin ejecutar |

## Decisiones

| Decisión | Alternativa descartada | Motivo |
|---|---|---|
| Un rol por estilo (sketch = diagramas, neumorfismo = controles, clay = cuerpos) | Mezclar los tres en cada componente | Tres estilos de superficie en un mismo botón se anulan; con roles, cada uno se reconoce |
| Capa CRT fija (scanlines, ruido, viñeta, bisel curvo) y deformación de tubo solo en la escena 3D | Deformar toda la página con un filtro; sumar flicker y glitches | Un filtro mueve los píxeles pero no los clics, así que el texto y los botones no se deforman. Lo que parpadea queda afuera por accesibilidad. Pedida por el usuario después de la primera versión, que no la tenía |
| Vite + React 19 + TypeScript + Tailwind v4 | Next.js | Mismo stack que athanor; una sola página estática para GitHub Pages |
| react-three-fiber + drei | three.js a mano | Es lo que usan `rework` y space-station; drei resuelve la carga de glTF y la estela |
| Escena con `lazy()` y `SceneBoundary` | Importarla en el bundle principal | three pesa 281 kB gzip; la página se lee antes de que llegue y funciona sin WebGL |
| Poses por sección con `IntersectionObserver` | Posición atada al scroll con `window.scrollY` | El astronauta se aparta del contenido sin un listener de scroll; el easing va en `useFrame` |
| `LineSegments` con una geometría por capa | `drei/Line` por cada costa y meridiano | Un draw call por capa (grilla, costas) en vez de uno por línea, que eran más de 100 |
| Costas reales (`continents.json` de space-station) | Continentes inventados de `rework` | El globo se reconoce, y es un dato del propio proyecto de referencia |
| Curvatura CRT como shader propio (`TubeWarp`: escena a textura, textura a un quad con distorsión de barril) | Filtro SVG `feDisplacementMap` sobre el canvas (receta de `rework`); librería `postprocessing` | El filtro SVG fue la primera implementación y el usuario reportó que andaba muy mal: el navegador lo rasteriza en CPU en cada frame. El shader es un draw call más y no suma dependencias |
| Sin bloom | Bloom de `rework` | El clay tiene que verse mate |
| Órbitas en SVG con `animateMotion` | Canvas o `requestAnimationFrame` con estado | Cero JavaScript por frame; pausar es dejar de renderizar el elemento |
| Calendario como matriz de LEDs en grilla | Gráfico radial alrededor del globo | La grilla semana por día se lee de un vistazo; un radial de 365 barras no (skill `dataviz`: la forma primero) |
| Geist y Geist Mono | Unbounded, Share Tech Mono y una manuscrita (primera versión); VT323 (referencia) | El usuario descartó las de la primera versión. Una familia en dos cortes: sans para leer, mono para datos |
| Phosphor para íconos | Glifos de texto | Hay botones con marca (GitHub, LinkedIn); es la primera librería permitida por la skill |
| Solo modo oscuro | Tema claro | Ver desvíos en `CLAUDE.md` |

## Ideas propias sumadas al contenido original

- **La escena acompaña la lectura.** El astronauta y el globo tienen una pose por sección: llenan la
  mitad libre en el hero, se corren a un rincón y se atenúan mientras hay contenido denso, y en
  contacto el globo vuelve como horizonte.
- **Plan de vuelo a la vista.** La curva que recorre el cohete está dibujada punteada, como un sketch
  sobre la escena.
- **Skills como sistema solar.** Una órbita por grupo, con períodos según la tercera ley de Kepler;
  la órbita elegida se marca en ámbar con una nota.
- **Carrera como trayectoria.** Una línea trazada a mano con waypoints; los vigentes, encendidos.
- **Calendario de LEDs.** Las contribuciones del año como tablero de luces en la consola, con lectura por día.
- **Vidrio de tubo.** Toda la página se ve a través de un CRT curvo con scanlines y ruido; la escena 3D se deforma de verdad.
- **Barra de estado viva.** Sección, contribuciones, racha y hora UTC, más el control para pausar el movimiento.

## Próximos pasos

1. Crear el repo remoto, hacer el primer commit y push, y activar GitHub Pages sobre la rama `build`.
2. Comprimir `spaceman.glb` (3 MB) con meshopt o Draco y texturas WebP; es casi todo el peso de la página.
3. Correr Lighthouse y probar en un teléfono real y con GPU real; anotar el resultado en `preflight.md`.
4. Imagen Open Graph (una captura del hero) y `preload` de Geist.
5. Guardar el grupo de skills elegido en el query string (`?skills=`).
