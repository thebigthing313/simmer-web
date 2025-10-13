import { createFileRoute } from '@tanstack/react-router';
import { toast } from 'sonner';
import { ProfileForm } from './-components/profile-form';

export const Route = createFileRoute('/(user)/profile')({
  component: RouteComponent
});

function RouteComponent() {
  function handleUpdateProfile() {
    toast.info('Update Profile Triggered');
  }

  return (
    <div>
      <ProfileForm onUpdateProfile={handleUpdateProfile} />
    </div>
  );
}
