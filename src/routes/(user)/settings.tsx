import { createFileRoute } from "@tanstack/react-router";
import { AddressInput } from "@/components/form-fields/address-input";

export const Route = createFileRoute("/(user)/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <AddressInput label="Address" description="Enter your address" />
    </div>
  );
}
