/**
 * Shared SVG filter for the sketch material: a low-frequency noise displaces strokes by a couple of
 * pixels, so a geometric line reads as drawn by hand. Use it through the `.wobble` class, and only
 * on static artwork: filtering something that animates repaints it every frame.
 */
export function SketchDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <filter id="sketch-wobble" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  )
}
