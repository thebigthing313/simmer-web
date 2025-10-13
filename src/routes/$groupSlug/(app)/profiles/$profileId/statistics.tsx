import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$groupSlug/(app)/profiles/$profileId/statistics')({
  component: RouteComponent
});

function RouteComponent() {
  return <div>Hello "/_app/profiles/$profileId/statistics"!</div>;
}
