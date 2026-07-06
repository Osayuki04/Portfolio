// Renders structured data as a JSON-LD <script>. Server component — the markup
// is emitted in the HTML so crawlers read it without executing JS.

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe inside a script tag for our own data.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
