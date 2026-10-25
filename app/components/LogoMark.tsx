// Ball positions pre-computed as fixed-precision strings to prevent SSR/client hydration mismatch
const LOGO_BALLS = [0, 60, 120, 180, 240, 300].map((deg, i) => {
  const rad = (deg * Math.PI) / 180;
  return {
    cx: (20 + 12 * Math.cos(rad)).toFixed(3),
    cy: (20 + 12 * Math.sin(rad)).toFixed(3),
    accent: i === 0,
  };
});

export default function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="18" stroke="#3D5C45" strokeWidth="2.5" />
      <circle cx="20" cy="20" r="12" stroke="#3D5C45" strokeWidth="6" strokeOpacity="0.18" />
      <circle cx="20" cy="20" r="5.5" stroke="#3D5C45" strokeWidth="2" />
      {LOGO_BALLS.map((b, i) => (
        <circle key={i} cx={b.cx} cy={b.cy} r="2.4" fill={b.accent ? "#B84A2C" : "#3D5C45"} />
      ))}
    </svg>
  );
}
