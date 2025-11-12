import type { GeoJSON, Geometry } from 'geojson';
import type { MapRef } from 'react-map-gl/mapbox';
import { create } from 'zustand';

interface ViewState {
	longitude: number;
	latitude: number;
	zoom: number;
	bearing: number;
	pitch: number;
	padding: { top?: number; bottom?: number; left?: number; right?: number };
	width: number;
	height: number;
}

interface MapStore {
	initialViewState: ViewState;
	setInitialViewState: (viewState: Partial<ViewState>) => void;
	mapRef: MapRef | null;
	setMapRef: (ref: MapRef | null) => void;
	geoJsonIds: string[];
	geoJsonMap: Map<string, GeoJSON>;
	pushGeoJson: (geoJson: GeoJSON, fitBounds?: boolean) => void;
	popGeoJson: () => void;
	clearGeoJson: () => void;
	replaceGeoJson: (geoJsonArray: GeoJSON[], fitBounds?: boolean) => void;
	fitToGeoJson: () => void;
}

const defaultViewState: ViewState = {
	longitude: 0,
	latitude: 0,
	zoom: 15,
	bearing: 0,
	pitch: 0,
	padding: {},
	width: 0,
	height: 0,
};

const getAllCoordinates = (geometry: Geometry): [number, number][] => {
	const coords: [number, number][] = [];
	switch (geometry.type) {
		case 'Point':
			coords.push(geometry.coordinates as [number, number]);
			break;
		case 'LineString':
			coords.push(...(geometry.coordinates as [number, number][]));
			break;
		case 'Polygon':
			geometry.coordinates.forEach((ring: number[][]) => {
				coords.push(...(ring as [number, number][]));
			});
			break;
		case 'MultiPoint':
			coords.push(...(geometry.coordinates as [number, number][]));
			break;
		case 'MultiLineString':
			geometry.coordinates.forEach((line: number[][]) => {
				coords.push(...(line as [number, number][]));
			});
			break;
		case 'MultiPolygon':
			geometry.coordinates.forEach((poly: number[][][]) => {
				poly.forEach((ring: number[][]) => {
					coords.push(...(ring as [number, number][]));
				});
			});
			break;
		case 'GeometryCollection':
			geometry.geometries.forEach((g: Geometry) => {
				coords.push(...getAllCoordinates(g));
			});
			break;
	}
	return coords;
};

export const useMapStore = create<MapStore>((set, get) => ({
	initialViewState: defaultViewState,
	setInitialViewState: (viewState) =>
		set((state) => ({
			initialViewState: { ...state.initialViewState, ...viewState },
		})),
	mapRef: null,
	setMapRef: (ref) => set({ mapRef: ref }),
	geoJsonIds: [],
	geoJsonMap: new Map(),
	pushGeoJson: (geoJson, fitBounds = true) =>
		set((state) => {
			const id = crypto.randomUUID();
			const newMap = new Map(state.geoJsonMap);
			newMap.set(id, geoJson);
			const newState = {
				geoJsonIds: [...state.geoJsonIds, id],
				geoJsonMap: newMap,
			};

			if (fitBounds) {
				// Trigger fitToGeoJson after state update
				setTimeout(() => get().fitToGeoJson(), 0);
			}

			return newState;
		}),
	popGeoJson: () =>
		set((state) => {
			if (state.geoJsonIds.length === 0) return state;
			const newIds = state.geoJsonIds.slice(0, -1);
			const newMap = new Map(state.geoJsonMap);
			const removedId = state.geoJsonIds[state.geoJsonIds.length - 1];
			newMap.delete(removedId);
			return { geoJsonIds: newIds, geoJsonMap: newMap };
		}),
	clearGeoJson: () => set({ geoJsonIds: [], geoJsonMap: new Map() }),
	replaceGeoJson: (geoJsonArray, fitBounds = true) =>
		set(() => {
			const newIds: string[] = [];
			const newMap = new Map<string, GeoJSON>();
			geoJsonArray.forEach((geoJson) => {
				const id = crypto.randomUUID();
				newIds.push(id);
				newMap.set(id, geoJson);
			});

			const newState = { geoJsonIds: newIds, geoJsonMap: newMap };

			if (fitBounds) {
				// Trigger fitToGeoJson after state update
				setTimeout(() => get().fitToGeoJson(), 0);
			}

			return newState;
		}),
	fitToGeoJson: () => {
		const state = get();
		if (state.geoJsonIds.length === 0 || !state.mapRef) return;

		const allCoords: [number, number][] = [];

		state.geoJsonIds.forEach((id) => {
			const geoJson = state.geoJsonMap.get(id);
			if (geoJson && geoJson.type === 'Feature' && geoJson.geometry) {
				allCoords.push(...getAllCoordinates(geoJson.geometry));
			} else if (geoJson && geoJson.type !== 'Feature') {
				allCoords.push(...getAllCoordinates(geoJson as Geometry));
			}
		});

		if (allCoords.length === 0) return;

		// Calculate bounds
		const lngs = allCoords.map(([lng]) => lng);
		const lats = allCoords.map(([, lat]) => lat);
		const minLng = Math.min(...lngs);
		const maxLng = Math.max(...lngs);
		const minLat = Math.min(...lats);
		const maxLat = Math.max(...lats);

		// Fit to bounds with padding
		state.mapRef.fitBounds(
			[
				[minLng, minLat],
				[maxLng, maxLat],
			],
			{
				padding: 50,
				duration: 1000,
			},
		);
	},
}));
