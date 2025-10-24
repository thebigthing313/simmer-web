import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$groupSlug/(app)/inspections/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/inspections/edit"!</div>;
}
