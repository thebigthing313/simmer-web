import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$groupSlug/(app)/locations/view")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/locations/view"!</div>;
}
