import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/$groupSlug/(app)/locations/$locationId/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Summary Page for this Location</div>;
}
