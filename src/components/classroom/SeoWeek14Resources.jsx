import { useState } from "react";

const initialContent = {
  name: "Laboratorio Digital",
  headline: "Una propuesta creada para aprender",
  description:
    "Este es un proyecto académico ficticio para practicar SEO y analítica web.",
  benefits: ["Información clara", "Diseño adaptable", "Experiencia digital"],
  faq: [
    {
      question: "¿Qué ofrece este proyecto?",
      answer: "Ofrece una experiencia académica de demostración.",
    },
    {
      question: "¿A quién está dirigido?",
      answer: "A personas interesadas en conocer el proyecto.",
    },
    {
      question: "¿Cómo funciona?",
      answer: "Mediante una página informativa con contenido de ejemplo.",
    },
  ],
  cta: "Conocer más",
};

const styles = {
  root: {
    background: "#f8fafc",
    color: "#111b35",
    padding: 22,
    borderRadius: 16,
  },
  card: {
    background: "#fff",
    border: "1px solid #dbe3ee",
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
  },
  field: {
    display: "block",
    marginBottom: 12,
    fontWeight: 600,
    fontSize: 13,
  },
  input: {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    marginTop: 6,
    padding: 10,
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    background: "#fff",
    color: "#111b35",
    font: "inherit",
  },
  button: {
    display: "inline-block",
    padding: "12px 18px",
    background: "#ee7544",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 700,
    textDecoration: "none",
  },
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function createHtml(content) {
  const name = escapeHtml(content.name);
  const headline = escapeHtml(content.headline);
  const description = escapeHtml(content.description);
  const cta = escapeHtml(content.cta);

  const benefits = content.benefits
    .map(
      (item, index) => `
      <article class="card">
        <h3>Beneficio ${index + 1}</h3>
        <p>${escapeHtml(item)}</p>
      </article>`,
    )
    .join("\n");

  const faq = content.faq
    .map(
      (item) => `
      <details>
        <summary>${escapeHtml(item.question)}</summary>
        <p>${escapeHtml(item.answer)}</p>
      </details>`,
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <meta name="description" content="${description}">
  <title>${name} | Proyecto académico</title>
  <style>
    :root {
      --navy: #173746;
      --teal: #27596b;
      --orange: #ee7544;
      --light: #f5f7fa;
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      color: #243746;
      line-height: 1.6;
    }
    header, footer {
      background: var(--navy);
      color: white;
      padding: 20px 8%;
    }
    nav {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 18px;
    }
    nav a {
      color: white;
      text-decoration: none;
      margin-left: 14px;
    }
    .hero {
      background: linear-gradient(135deg, var(--navy), var(--teal));
      color: white;
      padding: 80px 8%;
    }
    .hero h1 {
      max-width: 780px;
      font-size: clamp(2rem, 5vw, 3.4rem);
      line-height: 1.15;
    }
    .hero p { max-width: 650px; }
    section { padding: 55px 8%; }
    .cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    .card {
      background: var(--light);
      padding: 24px;
      border-radius: 12px;
    }
    .btn {
      display: inline-block;
      padding: 13px 23px;
      border-radius: 8px;
      background: var(--orange);
      color: white;
      text-decoration: none;
      font-weight: bold;
    }
    details {
      padding: 16px;
      margin: 12px 0;
      background: var(--light);
      border-radius: 8px;
    }
    summary {
      cursor: pointer;
      font-weight: bold;
    }
    footer { text-align: center; }
    @media (max-width: 700px) {
      .cards { grid-template-columns: 1fr; }
      nav a { margin-left: 0; margin-right: 12px; }
      .hero { padding: 55px 8%; }
    }
  </style>
</head>
<body>
  <header>
    <nav>
      <strong>${name}</strong>
      <div>
        <a href="#beneficios">Beneficios</a>
        <a href="#preguntas">Preguntas</a>
        <a href="#contacto">Contacto</a>
      </div>
    </nav>
  </header>

  <main>
    <section class="hero">
      <h1>${headline}</h1>
      <p>${description}</p>
      <a href="#contacto" class="btn" id="cta-principal">
        ${cta}
      </a>
    </section>

    <section id="beneficios">
      <h2>Beneficios</h2>
      <div class="cards">
        ${benefits}
      </div>
    </section>

    <section id="preguntas">
      <h2>Preguntas frecuentes</h2>
      ${faq}
    </section>

    <section id="contacto">
      <h2>Conoce nuestro proyecto</h2>
      <p>
        Esta página es una demostración académica.
        No representa a una empresa comercial real.
      </p>
      <a href="#preguntas" class="btn" id="cta-secundario">
        Explorar preguntas
      </a>
    </section>
  </main>

  <footer>
    <p>Proyecto académico de demostración.</p>
    <p>No representa a una empresa comercial real.</p>
  </footer>
</body>
</html>`;
}

function downloadHtml(content) {
  const html = createHtml(content);
  const blob = new Blob([html], {
    type: "text/html;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "index.html";

  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function TextField({ label, value, onChange, multiline = false }) {
  return (
    <label style={styles.field}>
      {label}
      {multiline ? (
        <textarea
          rows={3}
          style={styles.input}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          style={styles.input}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

export default function SeoWeek14Resources({ kind }) {
  const [content, setContent] = useState(initialContent);

  const setField = (field, value) =>
    setContent((current) => ({
      ...current,
      [field]: value,
    }));

  const setBenefit = (index, value) =>
    setContent((current) => ({
      ...current,
      benefits: current.benefits.map((item, i) => (i === index ? value : item)),
    }));

  const setFaq = (index, field, value) =>
    setContent((current) => ({
      ...current,
      faq: current.faq.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));

  if (kind === "seo-geo-template") {
    return (
      <section style={styles.root}>
        <h2>Recurso 1: crea tu página web académica</h2>

        <p>
          Completa los campos y descarga tu archivo
          <strong> index.html</strong>. No necesitas programar desde cero.
        </p>

        <div style={styles.card}>
          <h3>Identidad del proyecto</h3>

          <TextField
            label="Nombre ficticio"
            value={content.name}
            onChange={(value) => setField("name", value)}
          />

          <TextField
            label="Título principal"
            value={content.headline}
            onChange={(value) => setField("headline", value)}
          />

          <TextField
            label="Descripción"
            value={content.description}
            multiline
            onChange={(value) => setField("description", value)}
          />

          <TextField
            label="Texto del botón principal"
            value={content.cta}
            onChange={(value) => setField("cta", value)}
          />
        </div>

        <div style={styles.card}>
          <h3>Tres beneficios</h3>

          {content.benefits.map((value, index) => (
            <TextField
              key={index}
              label={`Beneficio ${index + 1}`}
              value={value}
              onChange={(next) => setBenefit(index, next)}
            />
          ))}
        </div>

        <div style={styles.card}>
          <h3>Tres preguntas frecuentes</h3>

          {content.faq.map((item, index) => (
            <div key={index}>
              <TextField
                label={`Pregunta ${index + 1}`}
                value={item.question}
                onChange={(value) => setFaq(index, "question", value)}
              />

              <TextField
                label={`Respuesta ${index + 1}`}
                value={item.answer}
                multiline
                onChange={(value) => setFaq(index, "answer", value)}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          style={styles.button}
          onClick={() => downloadHtml(content)}
        >
          Descargar index.html
        </button>

        <p>
          Una vez descargado, abre el archivo en tu navegador para comprobarlo.
          Después continúa a la diapositiva 9.
        </p>

        <p>
          <strong>Importante:</strong> utiliza un nombre ficticio. No copies el
          logotipo ni la identidad de la empresa real.
        </p>
      </section>
    );
  }

  if (kind === "seo-geo-publish-guide") {
    return (
      <section style={styles.root}>
        <h2>Recurso 2: publicar con GitHub Pages</h2>

        <p>
          Sigue estas instrucciones en orden. Necesitarás el archivo index.html
          descargado en la diapositiva anterior.
        </p>

        <div style={styles.card}>
          <h3>Paso 1. Crear el repositorio</h3>
          <ol>
            <li>Ingresa a GitHub con tu cuenta.</li>
            <li>Selecciona New repository.</li>
            <li>Escribe laboratorio-digital.</li>
            <li>Selecciona Public.</li>
            <li>Haz clic en Create repository.</li>
          </ol>

          <a
            href="https://github.com/new"
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir GitHub para crear repositorio
          </a>
        </div>

        <div style={styles.card}>
          <h3>Paso 2. Subir index.html</h3>
          <ol>
            <li>Abre el repositorio creado.</li>
            <li>Selecciona Add file → Upload files.</li>
            <li>Sube el archivo index.html.</li>
            <li>Confirma con Commit changes.</li>
          </ol>
        </div>

        <div style={styles.card}>
          <h3>Paso 3. Activar GitHub Pages</h3>
          <ol>
            <li>Entra a Settings.</li>
            <li>Selecciona Pages.</li>
            <li>En Build and deployment, selecciona Deploy from a branch.</li>
            <li>Selecciona la rama main.</li>
            <li>Selecciona la carpeta / (root).</li>
            <li>Haz clic en Save.</li>
          </ol>

          <a
            href="https://docs.github.com/en/pages/quickstart"
            target="_blank"
            rel="noopener noreferrer"
          >
            Consultar documentación oficial de GitHub Pages
          </a>
        </div>

        <div style={styles.card}>
          <h3>Paso 4. Comprobar la publicación</h3>
          <ol>
            <li>Espera a que GitHub termine el despliegue.</li>
            <li>Regresa a Settings → Pages.</li>
            <li>Abre la URL que GitHub indique.</li>
            <li>Comprueba el contenido y los botones.</li>
            <li>Revisa la página desde un teléfono.</li>
            <li>Copia la URL para el laboratorio de la diapositiva 10.</li>
          </ol>

          <p>
            Ejemplo de formato:
            <code> https://usuario.github.io/laboratorio-digital/</code>
          </p>

          <p>
            Si GitHub Pages no está disponible, puedes explorar{" "}
            <a
              href="https://vercel.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vercel
            </a>
            .
          </p>
        </div>

        <p>
          <strong>Recuerda:</strong> la web debe ser independiente de la empresa
          real. La utilizaremos en las Semanas 15 y 16 para practicar
          herramientas de medición.
        </p>
      </section>
    );
  }

  return null;
}
