import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/$groupSlug/(app)/locations/$locationId/larval-surveillance'
)({
  component: RouteComponent
});

function RouteComponent() {
  return <div>Larval Surveillance Data for this Location</div>;
}
