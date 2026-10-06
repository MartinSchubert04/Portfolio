# Auditoría de diseño

Resultado de correr las dos skills de control sobre la versión 0.1.0, el 2026-10-06.
Se revisó en Edge headless (WebGL por software, SwiftShader) a 1366x768 y 390x844. No se probó en
Firefox, Safari, en un teléfono real ni con GPU real.

## 1. Pre-flight de `design-taste-frontend` (sección 14)

Solo las filas que aplican a esta página; las de pricing, testimonios, logo wall, GSAP, marquee,
itálicas y formularios no tienen contraparte acá.

| Chequeo | Estado | Nota |
|---|---|---|
| Lectura del brief y diales declarados | Pasa | `reference-analysis.md` |
| Sistema de diseño elegido o estética nombrada | Pasa | Estética propia (control de misión, tres materiales), sin librería de componentes. `DESIGN.md` |
| Cero em-dash y en-dash en texto visible | Pasa | Verificado por búsqueda en `src/` e `index.html` |
| Un solo tema en toda la página | Pasa | Oscuro |
| Un solo color de acento | Pasa con nota | Ámbar. La menta es la tinta de líneas y lecturas, no un segundo acento; ver desvíos |
| Un solo sistema de esquinas | **Desvío** | Un radio por material, regla escrita en `DESIGN.md`. Acordado |
| Contraste de botones y texto (WCAG AA) | Pasa | `hull` sobre ámbar 10:1; `frost` sobre `hull` 15:1; `haze` sobre `hull` 7.6:1 y sobre `clay` 5.4:1; ámbar sobre `well` 10:1 |
| Ningún CTA parte en dos líneas | Pasa | `white-space: nowrap` en los dos tipos de botón |
| Sin CTAs duplicados por intención | Pasa | "Download Resume" usa la misma etiqueta en hero y contacto |
| Hero entra en el viewport, CTA visible sin scroll | Pasa | 1366x768 y 390x844 |
| Hero: título en 2 líneas, subtexto de 20 palabras o menos | Pasa | 2 líneas, 19 palabras |
| Padding superior del hero | Pasa | 96px en escritorio, de los cuales 68 son la barra fija |
| Hero: máximo 4 elementos de texto | Pasa | Título, subtexto y dos botones |
| Conteo de eyebrows | Pasa | 0 sobre títulos de sección. `.label` solo rotula instrumentos dentro de consolas |
| Sin split-header | Pasa | Cada sección es `h2` y contenido debajo |
| Zigzag imagen/texto | Pasa | Hero y contacto, no consecutivos |
| Familias de layout sin repetir | Pasa | 6 secciones, 6 familias. `DESIGN.md`, sección 5 |
| Bento con ritmo y celdas exactas | Pasa | 6 proyectos, 6 tarjetas, anchos 7+5, 5+7, 7+5; todas con imagen real |
| Listas largas con el componente correcto | Pasa | Skills en 7 tabs con chips; el log tiene 6 filas sin divisores |
| Imágenes reales | Pasa | Capturas reales de los proyectos y modelos 3D |
| SVG decorativos hechos a mano | **Desvío** | Mapa de órbitas y trayectoria: son los diagramas del estilo "sketch" pedido. Acordado |
| Sin pills ni etiquetas sobre imágenes | Pasa | |
| Epígrafes de crédito | Pasa | El único crédito es el de los modelos 3D, real y exigido por la licencia |
| Sin tiras de hora o lugar | **Desvío** | Hora UTC en la barra de estado, como en la referencia. Acordado |
| Sin footer de versión, scroll cues ni numeración de secciones | Pasa con nota | "Section 2/6" en la barra de estado es posición real y navegable, no un eyebrow |
| Sin puntos de estado decorativos | Pasa | El punto del waypoint indica un trabajo o estudio vigente; el texto ya dice "Today" |
| Sin barras de progreso con track | Pasa | Las cifras son números |
| Números inventados | Pasa | Todos salen de la API de GitHub. Los puntos de "satélites" del globo son decoración y no llevan cifra |
| Autoauditoría de textos | Pasa | Releídos. Etiquetas literales; carrera, skills y proyectos salen del CV |
| Movimiento motivado | Pasa | Escena (es el pedido del brief), cambio de pose (despeja el contenido), reveal de sección (jerarquía), botón de clay que se hunde (feedback), cuerpos en órbita (el período muestra la distancia) |
| Movimiento declarado = movimiento mostrado | Pasa | Dial 7: la escena anima de forma continua |
| Nav en una línea, menos de 80px | Pasa | 56px, a 1366 y a 390 |
| Sin `window.addEventListener("scroll")` | Pasa | `IntersectionObserver`. El único listener de ventana es `pointermove`, pasivo, y no toca estado de React |
| Sin `requestAnimationFrame` que toque estado | Pasa | `useFrame` muta objetos de three por ref |
| Reduced motion | Pasa | CSS dentro de `prefers-reduced-motion: no-preference`; la escena pasa a `frameloop="demand"` y las órbitas quedan fijas |
| Modo claro y oscuro | **Desvío** | Solo oscuro. Acordado |
| Colapso mobile explícito | Pasa | Cada grilla declara su versión de una columna; la escena tiene poses para vertical |
| `min-h-[100dvh]`, nunca `h-screen` | Pasa | |
| Limpieza de efectos | Pasa | Observers, timers, fetch y listener se cancelan; geometrías y materiales de three se liberan |
| Estados vacío, cargando y error | Pasa | Skeleton con la misma huella, error con reintento, log vacío con link a GitHub si falla solo la búsqueda |
| Tarjetas solo donde hay jerarquía real | Pasa | Clay para proyectos, consola para instrumentos; la carrera es texto sobre la página |
| Íconos de librería permitida | Pasa | Phosphor, una sola familia |
| Fuentes | Pasa | Autoalojadas con `@fontsource`. Sin Inter, sin serif |
| Sin tells de la sección 9 | Pasa | Sin violeta, sin glow, sin texto con gradiente, sin cursor propio |
| Grano y ruido solo en capas fijas sin eventos (6.E) | Pasa | La capa CRT es `position: fixed` y `pointer-events: none`; el ruido anima solo `transform` |
| Z-index | Pasa | Cuatro valores, definidos como tokens |
| Core Web Vitals | **Sin medir** | No se corrió Lighthouse. JS inicial 84 kB gzip, CSS 10 kB; la escena (281 kB gzip más un modelo de 3 MB) llega después y no bloquea el texto |

## 2. `web-design-guidelines`

Reglas vigentes de [vercel-labs/web-interface-guidelines](https://github.com/vercel-labs/web-interface-guidelines) al 2026-10-06.

| Grupo | Estado | Nota |
|---|---|---|
| Accesibilidad | Pasa | Skip link, un `h1`, jerarquía `h2`/`h3`, `alt` en capturas, íconos y escena con `aria-hidden`, tabs con roles y flechas, `role="alert"` en el error, `aria-busy` mientras carga. El mapa de órbitas es un atajo de mouse oculto a lectores de pantalla; los tabs hacen lo mismo |
| Foco | Pasa | `:focus-visible` global en ámbar, sin `outline: none`. `scroll-padding` evita que las barras tapen el foco |
| Formularios | No aplica | No hay campos |
| Animación | Pasa | Solo `transform` y `opacity`, sin `transition: all`. **Hallazgo corregido:** la escena y las órbitas son movimiento automático de más de 5 segundos sin control; se agregó el botón Pause Motion en la barra de estado |
| Tipografía | Pasa | `…`, comillas curvas, `tabular-nums`, `text-wrap: balance` en títulos |
| Contenido | Pasa | `truncate` y `minmax(0, 1fr)` en mensajes de commit; estados vacíos resueltos |
| Imágenes | Pasa | `width` y `height` explícitos y `loading="lazy"` en las capturas. No hay imagen sobre el fold: el visual del hero es el canvas |
| Rendimiento | Parcial | `preconnect` a las dos APIs. Falta `preload` de Geist. 371 LEDs sin virtualizar: son `span` sin hijos, no se justifica |
| Navegación y estado | Parcial | Secciones por hash y todos los links son `<a>`. El grupo de skills elegido no va a la URL (pendiente) |
| Touch | Pasa | `touch-action: manipulation`, tap highlight definido, objetivos de 40px o más. La lectura de un día funciona con tap |
| Safe areas | Pasa | Barras y contenedor con `env(safe-area-inset-*)`, `viewport-fit=cover`; scroll horizontal medido en 0 px a 1366 y a 390 |
| Tema | Pasa | `color-scheme: dark`, `theme-color` igual al fondo |
| i18n | Pasa | Fechas, números y plurales con `Intl`; marcas y nombres con `translate="no"` |
| Hover | Pasa | Links y botones cambian de color; el clay se eleva |
| Copy | Pasa con nota | Title Case en títulos y botones, etiquetas específicas, el error dice qué hacer. Primera persona en el pitch: es un portfolio |
| Anti-patrones | Pasa | El único clic sobre algo que no es botón son los cuerpos del mapa de órbitas, duplicado de los tabs |

## 3. `dataviz` (calendario de contribuciones)

| Chequeo | Estado | Nota |
|---|---|---|
| Forma | Pasa | Grilla semana por día: la lectura conocida de este dato. Se descartó un radial |
| Color por función | Pasa | Secuencial, un solo tono (menta) de oscuro a brillante. No hay paleta categórica que validar |
| Texto con tokens de texto | Pasa | Etiquetas y valores en `haze` y `frost`, nunca en el color de la serie |
| Hover | Pasa | Apuntar a un día lo lee debajo de la matriz |
| Leyenda | Pasa | "Less … More" con los cinco niveles |
| Alternativa no visual | Parcial | La matriz tiene `aria-label` con el total y las cuatro cifras están como `dl`. No hay vista de tabla día por día |

## 4. Pendientes conocidos

- Medir con Lighthouse, en un teléfono real y con GPU real. En headless la escena corre por software
  y no sirve para medir rendimiento.
- `spaceman.glb` pesa 3 MB sin comprimir.
- La capa CRT se agregó después de la auditoría y se revisó solo por capturas. Las scanlines y la
  viñeta bajan algo el contraste del texto; no se volvió a medir.
- Rendimiento: la primera versión del CRT deformaba el canvas con un filtro SVG y el usuario reportó
  que andaba muy mal. Se reemplazó por un shader dentro de la escena y se bajó el tope de
  resolución a 1.25x. **No está medido con GPU real**: el headless renderiza por software y no
  sirve de referencia. Si sigue lento, lo siguiente a probar es bajar `samples` en `TubeWarp.tsx`,
  el tope de `dpr` en `SpaceScene.tsx` y quitar la estela del cohete.
- El cohete pasa por detrás del texto en algunos tramos de su vuelta; es chico y pasa rápido, pero en
  pantallas verticales cruza la columna de texto (ahí se achica al 60%).
- La nota del mapa de órbitas se oculta en teléfonos: escalada con el SVG quedaba de 9px.
- Falta imagen Open Graph.
- La búsqueda de commits anónima admite 10 pedidos por minuto por IP; el sitio guarda el resultado
  30 minutos en `localStorage` y degrada a calendario sin log si falla.
- drei avisa por consola que el modelo del cohete usa una extensión glTF sin soporte
  (`KHR_materials_pbrSpecularGlossiness`); por eso su textura se aplica a mano en `Rocket.tsx`.
