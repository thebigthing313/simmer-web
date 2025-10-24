import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$groupSlug/(app)/landing-rates/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/landing-rates/"!</div>;
}
