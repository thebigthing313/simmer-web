import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { ProfileDetailSidebar } from "../../../../components/app-layout/sidebars/profiles";
import { ProfileCard } from "../../../../components/cards/profile-card";
import { useSidebarContent } from "../../../../hooks/use-sidebar-content";

export const Route = createFileRoute("/$groupSlug/(app)/profiles/$profileId")({
  errorComponent: ({ error }) => (
    <div className="text-destructive">
      Error loading profile: {error.message}
    </div>
  ),
  component: ProfileLayout,
  loader: async ({ context, params }) => {
    const profile = context.db.profiles.find(
      (profile) => profile.id === params.profileId,
    );

    const licenses = context.db.profiles_licenses.filter(
      (license) => license.profile_id === params.profileId,
    );

    if (!profile) {
      throw new Error(`Profile with ID ${params.profileId} not found`);
    }

    const groupUser = context.db.groups_users.find(
      (gu) =>
        gu.user_id === profile.user_id && gu.group_id === context.auth.group.id,
    );

    if (!groupUser) {
      throw new Error(
        `Unable to establish profile ID ${params.profileId} as member of active group.`,
      );
    }

    return { profile, licenses, groupUser };
  },
});

function ProfileLayout() {
  const { profile, licenses, groupUser } = Route.useLoaderData();
  const { setSidebarContent } = useSidebarContent();

  useEffect(() => {
    setSidebarContent(<ProfileDetailSidebar />);
    return () => setSidebarContent(null);
  }, [setSidebarContent]);

  return (
    <>
      <div className="flex flex-col items-center">
        <ProfileCard
          profile={profile}
          licenses={licenses}
          groupUser={groupUser}
        />
        <Outlet />
      </div>
    </>
  );
}
