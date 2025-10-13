import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$groupSlug/(app)/collections/$collectionId')({
  component: RouteComponent
});

function RouteComponent() {
  return <div>View Collection</div>;
}
