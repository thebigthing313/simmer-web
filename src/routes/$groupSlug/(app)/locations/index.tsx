import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$groupSlug/(app)/locations/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/locations/"!</div>;
}
