import { createFileRoute, Outlet } from "@tanstack/react-router";
import Logo from "@/assets/simmer-logo.svg?url";
import { getAuth } from "@/db/auth/get-auth";

export const Route = createFileRoute("/(auth)")({
  beforeLoad: async () => {
    const auth = await getAuth();
    return { auth };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-4 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-4 items-center">
        <img className="max-w-[200px]" src={Logo} alt="SIMMER Logo" />
        <Outlet />
      </div>
    </div>
  );
}
