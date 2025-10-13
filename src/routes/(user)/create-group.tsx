import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { CreateGroupForm } from './-components/create-group-form';
import { Insert } from '@repo/supabase/db/data-types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const Route = createFileRoute('/(user)/create-group')({
  beforeLoad: async ({ context }) => {
    const { auth } = context;
    if (!auth.user_id) {
      throw redirect({ to: '/login' });
    }

    return { user_id: auth.user_id };
  },
  component: RouteComponent
});

type GroupInsert = Insert<'groups'>;

function RouteComponent() {
  const { supabase, auth } = Route.useRouteContext();
  const navigate = useNavigate();

  async function insertGroup(group: GroupInsert) {
    const { data, error } = await supabase.from('groups').insert(group).select().single();
    if (error) throw error;
    return data;
  }

  const insertGroupMutation = useMutation({
    mutationFn: insertGroup,
    onSuccess: async (data) => {
      await auth.refresh();
      navigate({ to: '/$groupSlug', params: { groupSlug: data.short_name } });
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return (
    <div className='max-w-lg'>
      <CreateGroupForm onCreateGroup={(data) => insertGroupMutation.mutate(data)} />
    </div>
  );
}
