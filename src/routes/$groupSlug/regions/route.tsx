import { createFileRoute, Outlet } from '@tanstack/react-router';
import { MapComponent } from '@/components/map-component';
import 'mapbox-gl/dist/mapbox-gl.css';

export const Route = createFileRoute('/$groupSlug/regions')({
	component: RouteComponent,
	loader: () => {
		return { crumb: 'Regions' };
	},
});

function RouteComponent() {
	return (
		<div className="grid grid-cols-3 h-full">
			<div className="col-span-1 pr-2">
				<Outlet />
			</div>
			<div className="col-span-2">
				<MapComponent />
			</div>
		</div>
	);
}
