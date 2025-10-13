import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$groupSlug/(app)/profiles/$profileId/')({
  component: ProfilePage
});

function ProfilePage() {
  return (
    <div>
      <div>Recent History</div>
    </div>
  );
}
