import CheckboxTree from '../components/checkbox-tree/CheckboxTree';
import Card from '../components/ui/Card';
import PageHeader from '../components/ui/PageHeader';
import { checkboxTreeData } from '../data/checkboxTreeData';

export default function CheckboxTreePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Checkbox Tree"
        description="Recursive checkbox tree with parent-child checked, unchecked, and indeterminate state logic."
      />
      <Card>
        <CheckboxTree data={checkboxTreeData} />
      </Card>
    </div>
  );
}