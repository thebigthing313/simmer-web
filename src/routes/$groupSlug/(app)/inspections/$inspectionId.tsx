import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/$groupSlug/(app)/inspections/$inspectionId",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>View Inspection</div>;
}
