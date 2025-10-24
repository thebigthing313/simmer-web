import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$groupSlug/(app)/traps/$trapId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/traps/view"!</div>;
}
