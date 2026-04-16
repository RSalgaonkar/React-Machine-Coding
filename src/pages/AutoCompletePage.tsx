import AutoComplete from '../components/autocomplete/AutoComplete';
import Card from '../components/ui/Card';
import PageHeader from '../components/ui/PageHeader';

export default function AutoCompletePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Auto Complete"
        description="Accessible combobox autocomplete with debounced API fetch, keyboard navigation, and request cancellation."
      />
      <Card>
        <AutoComplete />
      </Card>
    </div>
  );
}