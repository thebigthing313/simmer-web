import { createFileRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/$groupSlug/(app)/locations/$locationId')({
  component: RouteComponent
});

function RouteComponent() {
  return (
    <div className='flex flex-col'>
      <div>Location Name</div>
      <div className='flex flex-row gap-2'>
        <Link from='/locations/$locationId/' to='../$locationId'>
          Summary
        </Link>
        <Link
          from='/locations/$locationId/'
          to='../$locationId/larval-surveillance'
        >
          Larval Surveillance
        </Link>
        <Link
          from='/locations/$locationId/'
          to='../$locationId/adult-surveillance'
        >
          Adult Surveillance
        </Link>
        <Link
          from='/locations/$locationId/'
          to='../$locationId/service-requests'
        >
          Service Requests
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
