import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$groupSlug/(app)/traps/$trapId/edit')({
  component: RouteComponent
});

function RouteComponent() {
  return <div>Hello "/_app/traps/$trapId/edit"!</div>;
}
