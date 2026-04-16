import { checkboxTreeDocs } from '../features/checkbox-tree/docs/checkboxTreeDocs';

export default function CheckboxTreeDocsPage() {
  return (
    <section className="page">
      <h2>Checkbox Tree Documentation</h2>
      <p>
        This page explains the engineering decisions and product behaviors behind
        the Checkbox Tree component.
      </p>

      <div
        style={{
          display: 'grid',
          gap: '16px',
          marginTop: '24px',
        }}
      >
        {checkboxTreeDocs.map((item) => (
          <article
            key={item.title}
            style={{
              padding: '18px',
              background: '#fff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
            }}
          >
            <h3 style={{ marginTop: 0 }}>{item.title}</h3>
            <p style={{ marginBottom: 0 }}>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}