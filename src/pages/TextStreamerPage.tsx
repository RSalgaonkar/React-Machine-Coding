import TextStreamer from '../components/text-streamer/TextStreamer';
import Card from '../components/ui/Card';
import PageHeader from '../components/ui/PageHeader';

export default function TextStreamerPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Text Streamer"
        description="Typewriter effect with playback controls and variable speed."
      />
      <Card>
        <TextStreamer />
      </Card>
    </div>
  );
}