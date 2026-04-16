import { checkboxTreeDocs } from '../features/checkbox-tree/docs/checkboxTreeDocs';

export default function CheckboxTreeDocsPage() {
  return (
    <section style={{ padding: '24px' }}>
      <h2>Checkbox Tree Documentation</h2>
      <ul>
        {checkboxTreeDocs.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}