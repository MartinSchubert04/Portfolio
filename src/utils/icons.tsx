interface iconProps {
  fillColor: string
}

export const Github = ({ fillColor }: iconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke={fillColor}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-github size-3"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
)

export const Speaker = ({ fillColor }: iconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke={fillColor}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-volume-off"
    aria-hidden="true"
  >
    <path d="M16 9a5 5 0 0 1 .95 2.293"></path>
    <path d="M19.364 5.636a9 9 0 0 1 1.889 9.96"></path>
    <path d="m2 2 20 20"></path>
    <path d="m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11"></path>
    <path d="M9.828 4.172A.686.686 0 0 1 11 4.657v.686"></path>
  </svg>
)

export const SpeakerSlash = ({ fillColor }: iconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke={fillColor}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-volume2 lucide-volume-2"
    aria-hidden="true"
  >
    <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"></path>
    <path d="M16 9a5 5 0 0 1 0 6"></path>
    <path d="M19.364 18.364a9 9 0 0 0 0-12.728"></path>
  </svg>
)

export const Mail = ({ fillColor }: iconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 14 14" fill="none" stroke={fillColor}>
    <path
      d="M2.19175 11.5252C1.96548 11.5252 1.7675 11.4404 1.59781 11.2707C1.42811 11.101 1.34326 10.903 1.34326 10.6768V3.32322C1.34326 3.09695 1.42811 2.89897 1.59781 2.72928C1.7675 2.55958 1.96548 2.47473 2.19175 2.47473H11.8079C12.0342 2.47473 12.2322 2.55958 12.4018 2.72928C12.5715 2.89897 12.6564 3.09695 12.6564 3.32322V10.6768C12.6564 10.903 12.5715 11.101 12.4018 11.2707C12.2322 11.4404 12.0342 11.5252 11.8079 11.5252H2.19175ZM6.99983 7.25453L2.19175 4.10099V10.6768H11.8079V4.10099L6.99983 7.25453ZM6.99983 6.40604L11.7513 3.32322H2.26245L6.99983 6.40604ZM2.19175 4.10099V3.32322V10.6768V4.10099Z"
      fill="#0E100F"
    ></path>
  </svg>
)
