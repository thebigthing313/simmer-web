import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$groupSlug/(app)/')({
  component: Index
});

function Index() {
  return <h3>Dashboard</h3>;
}
