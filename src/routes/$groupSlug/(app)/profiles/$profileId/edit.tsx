import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/$groupSlug/(app)/profiles/$profileId/edit",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Edit Profile Form</div>;
}
