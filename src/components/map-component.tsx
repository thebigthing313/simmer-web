import { ClientOnly } from '@tanstack/react-router';
import type { MapRef } from 'react-map-gl/mapbox';
import { Layer, Map as Mapbox, Source } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { GeoJSON, Geometry } from 'geojson';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useLocation } from '@/hooks/use-location';
import { useMapStore } from '@/lib/map-store';

export function MapComponent() {
	const location = useLocation();
	const { geoJsonIds, geoJsonMap, setMapRef } = useMapStore();
	const mapRef = useRef<MapRef>(null);
	const hasInitialized = useRef(false);

	// Register map ref with store and handle cleanup
	useEffect(() => {
		return () => setMapRef(null);
	}, [setMapRef]);

	const onMapLoad = useCallback(() => {
		if (mapRef.current) {
			setMapRef(mapRef.current);
			if (!hasInitialized.current) {
				hasInitialized.current = true;
				// Move to user location immediately on first load
				mapRef.current.flyTo({
					center: [location.longitude, location.latitude],
					zoom: 12,
					duration: 0,
				});
			}
		}
	}, [location, setMapRef]);

	// Handle location updates after initialization
	useEffect(() => {
		if (hasInitialized.current && mapRef.current) {
			mapRef.current.flyTo({
				center: [location.longitude, location.latitude],
				duration: 1000,
			});
		}
	}, [location]);

	const combinedGeoJson = useMemo(() => {
		const geoJsons = geoJsonIds
			.map((id) => geoJsonMap.get(id))
			.filter((g): g is GeoJSON => g !== undefined);
		return {
			type: 'FeatureCollection' as const,
			features: geoJsons.flatMap((geoJson) => {
				if (geoJson.type === 'FeatureCollection') return geoJson.features;
				if (geoJson.type === 'Feature') return [geoJson];
				return [
					{
						type: 'Feature' as const,
						geometry: geoJson as Geometry,
						properties: {},
					},
				];
			}),
		};
	}, [geoJsonIds, geoJsonMap]);

	return (
		<ClientOnly>
			<Mapbox
				ref={mapRef}
				initialViewState={{
					longitude: location.longitude,
					latitude: location.latitude,
					zoom: 12,
					bearing: 0,
					pitch: 0,
				}}
				onLoad={onMapLoad}
				mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
				mapStyle="mapbox://styles/mapbox/streets-v9"
				style={{ width: '100%', height: '100%' }}
			>
				{combinedGeoJson.features.length > 0 && (
					<Source id="combined-geojson" type="geojson" data={combinedGeoJson}>
						<Layer
							id="combined-layer"
							type="fill"
							paint={{ 'fill-color': '#088', 'fill-opacity': 0.8 }}
						/>
					</Source>
				)}
			</Mapbox>
		</ClientOnly>
	);
}
