import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$groupSlug/(app)/larval-habitats/view")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/larval-habitats/view"!</div>;
}
