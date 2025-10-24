import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$groupSlug/(app)/inspections/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/inspections/"!</div>;
}
