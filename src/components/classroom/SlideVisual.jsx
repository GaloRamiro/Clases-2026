
export default function SlideVisual({
  src,
  title = "Recurso visual",
  description = "Fotografía pendiente de incorporar",
}) {
  return (
    <figure className="slide-visual">
      {src ? (
        <img
          src={src}
          alt={description}
          loading="lazy"
        />
      ) : (
        <div className="slide-visual__placeholder">
          <div className="slide-visual__symbol" aria-hidden="true">
            <svg
              width="52"
              height="52"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m3 17 5-5 4 4 3-3 6 6" />
            </svg>
          </div>
          <strong>{title}</strong>
          <span>{description}</span>
        </div>
      )}
    </figure>
  );
}
