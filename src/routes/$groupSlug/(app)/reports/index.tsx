import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$groupSlug/(app)/reports/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/reports/"!</div>;
}
