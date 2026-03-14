"use client";

import { useEffect, useState } from "react";

type MermaidDiagramProps = {
  chart: string;
};

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let active = true;

    async function renderMermaid() {
      try {
        setError("");
        setSvg("");

        const moduleName = "mermaid";
        const mermaidModule = await import(moduleName);
        const mermaid = mermaidModule.default;

        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          theme: isDark ? "dark" : "default"
        });

        const id = `mermaid-${Math.random().toString(36).slice(2, 10)}`;
        const result = await mermaid.render(id, chart);

        if (active) {
          setSvg(result.svg);
        }
      } catch (err) {
        if (active) {
          setError("Unable to render Mermaid diagram.");
        }
      }
    }

    renderMermaid();

    return () => {
      active = false;
    };
  }, [chart]);

  if (error) {
    return (
      <pre>
        <code>{chart}</code>
      </pre>
    );
  }

  if (!svg) {
    return (
      <pre>
        <code>{chart}</code>
      </pre>
    );
  }

  return <div className="my-6 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--card)] p-4" dangerouslySetInnerHTML={{ __html: svg }} />;
}
