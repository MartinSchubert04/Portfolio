/**
 * The page seen through a curved CRT tube. Three fixed, non-interactive layers above everything:
 * the glass (scanlines, highlight and vignette in one element), static noise, and a bezel whose
 * inner edge bows outward.
 *
 * The real curvature is a shader inside the 3D scene (`src/scene/TubeWarp.tsx`). Text and controls
 * are not warped: a warp moves what is drawn but not where clicks land. For the content, the
 * curve is carried by the bezel shape and the vignette.
 */
export function CrtOverlay({ still }: { still: boolean }) {
  return (
    <div className="crt" aria-hidden="true" data-still={still}>
      <div className="crt-glass" />
      <div className="crt-noise" />
      {/* The hole in the bezel is the screen: straight in the middle of each side, pulled in at the corners */}
      <svg className="crt-bezel" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          fillRule="evenodd"
          d="M-5 -5 H105 V105 H-5 Z M3.2 0.5 Q50 -0.9 96.8 0.5 Q99.7 0.6 99.75 5 Q100.5 50 99.75 95 Q99.7 99.4 96.8 99.5 Q50 100.9 3.2 99.5 Q0.3 99.4 0.25 95 Q-0.5 50 0.25 5 Q0.3 0.6 3.2 0.5 Z"
        />
      </svg>
    </div>
  )
}
