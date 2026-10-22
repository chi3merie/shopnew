import "./App.css";

const SIZE_MAP = {
  small: 16,
  medium: 28,
  large: 44,
};

export default function LoadingSpinner({
  variant = "spinner",
  size = "medium",
  label = "Loading",
  fullscreen = false,
  className = "",
}) {
  const pixelSize = SIZE_MAP[size] || SIZE_MAP.medium;
  const classes = ["loader", `loader-${variant}`, `loader-${size}`];
  if (fullscreen) classes.push("loader-fullscreen");
  if (className) classes.push(className);

  return (
    <div className={classes.join(" ")} role="status" aria-live="polite">
      {variant === "spinner" && (
        <span className="loader-ring" style={{ width: pixelSize, height: pixelSize }} />
      )}

      {variant === "dots" && (
        <span className="loader-dots">
          <span />
          <span />
          <span />
        </span>
      )}

      {variant === "skeleton" && <span className="loader-skeleton" />}

      <span className="sr-only">{label}</span>
    </div>
  );
}
