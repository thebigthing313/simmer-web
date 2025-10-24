import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/privacy-policy"!</div>;
}
