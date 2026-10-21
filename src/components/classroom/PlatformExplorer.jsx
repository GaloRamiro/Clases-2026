
import { useState } from "react";

export default function PlatformExplorer({ platforms = [] }) {
  const [selected, setSelected] = useState(0);
  const platform = platforms[selected];

  if (!platform) return null;

  return (
    <div className="interactive-panel">
      <div className="platform-selector">
        {platforms.map((item, index) => (
          <button
            key={item.name}
            type="button"
            className={`platform-tab ${
              selected === index ? "is-selected" : ""
            }`}
            onClick={() => setSelected(index)}
            aria-pressed={selected === index}
          >
            <span className="platform-tab__icon">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      <div className="platform-detail" key={platform.name}>
        <span className="lesson-kicker">PLATAFORMA SELECCIONADA</span>
        <h3>{platform.name}</h3>
        <strong>{platform.purpose}</strong>
        <p>{platform.use}</p>

        <div className="lesson-question">
          <strong>Pregunta para la clase</strong>
          <p>{platform.question}</p>
        </div>
      </div>
    </div>
  );
}
