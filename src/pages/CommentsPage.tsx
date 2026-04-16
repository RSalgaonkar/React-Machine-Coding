import NestedComments from '../components/comments/NestedComments';
import Card from '../components/ui/Card';
import PageHeader from '../components/ui/PageHeader';
import { commentsData } from '../data/commentsData';

export default function CommentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Nested Comments"
        description="Recursive comments feed with immutable reply insertion."
      />
      <Card>
        <NestedComments initialComments={commentsData} />
      </Card>
    </div>
  );
}