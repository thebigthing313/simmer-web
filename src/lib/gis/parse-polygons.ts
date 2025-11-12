import { createClientOnlyFn } from '@tanstack/react-start';
import { gpx, kml } from '@tmcw/togeojson';
import { DOMParser } from '@xmldom/xmldom';
import JSZip from 'jszip';
import z from 'zod';
import {
	GeoJSONFeatureCollectionSchema,
	GeoJSONMultiPolygonSchema,
	GeoJSONPolygonSchema,
} from 'zod-geojson';

// 1. Define the correct geometry types for Polygons
export type PolygonGeom = z.infer<
	typeof GeoJSONPolygonSchema | typeof GeoJSONMultiPolygonSchema
>;

// 2. Define the exact return structure
export type ParsePolygonsReturn = {
	name: string;
	geom: PolygonGeom;
};

// Custom Zod schema for Features that ONLY contain Polygon or MultiPolygon geometry
const PolygonFeatureSchema = z.object({
	type: z.literal('Feature'),
	// Geometry must be either a Polygon or MultiPolygon
	geometry: z.union([GeoJSONPolygonSchema, GeoJSONMultiPolygonSchema]),
	// GeoJSON properties field is typically a record, but we only need the 'name'
	properties: z
		.object({
			name: z.string().optional().nullable(),
			// Add other properties you might need from KML here
		})
		.catchall(z.unknown()),
});

export const parsePolygons = createClientOnlyFn(
	(file: File): Promise<Array<ParsePolygonsReturn>> => {
		// Return a Promise to handle the async FileReader
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onload = async (e) => {
				try {
					const fileContent = e.target?.result;
					if (!fileContent) {
						return reject(new Error('File content is empty.'));
					}

					// Determine file type based on extension
					const extension = file.name.split('.').pop()?.toLowerCase();
					let content: string;
					let effectiveExtension = extension;

					if (extension === 'kmz') {
						const zip = await JSZip.loadAsync(fileContent as ArrayBuffer);
						const kmlFiles = zip.file(/\.kml$/i);
						if (kmlFiles.length === 0) {
							return reject(new Error('No KML file found in KMZ archive.'));
						}
						const kmlFile = kmlFiles[0];
						content = await kmlFile.async('text');
						effectiveExtension = 'kml';
					} else {
						content = fileContent as string;
					}

					let geojson: unknown;

					if (effectiveExtension === 'kml') {
						// Parse KML
						const parser = new DOMParser();
						const doc = parser.parseFromString(content, 'text/xml');
						geojson = kml(doc);
					} else if (effectiveExtension === 'gpx') {
						// Parse GPX
						const parser = new DOMParser();
						const doc = parser.parseFromString(content, 'text/xml');
						geojson = gpx(doc);
					} else if (
						effectiveExtension === 'geojson' ||
						effectiveExtension === 'json'
					) {
						// Parse GeoJSON
						geojson = JSON.parse(content);
					} else {
						return reject(
							new Error(
								'Unsupported file type. Only KML, KMZ, GPX, and GeoJSON are supported.',
							),
						);
					}

					// c. Validate the GeoJSON structure first (good practice)
					const parsedCollection =
						GeoJSONFeatureCollectionSchema.parse(geojson);

					// d. Filter and map to your desired return type
					const polygonFeatures: Array<ParsePolygonsReturn> =
						parsedCollection.features
							.filter((feature) => {
								// Only keep Features where the geometry type is Polygon or MultiPolygon
								const type = feature.geometry?.type;
								return type === 'Polygon' || type === 'MultiPolygon';
							})
							.map((feature) => {
								// Use Zod to ensure the filtered feature matches our strict schema
								const validatedFeature = PolygonFeatureSchema.parse(feature);

								return {
									name: validatedFeature.properties?.name || 'Untitled Polygon',
									geom: validatedFeature.geometry,
								};
							});

					// e. Resolve the promise with the filtered results
					resolve(polygonFeatures);
				} catch (error) {
					reject(error); // Reject the promise on any error (parsing, Zod validation, etc.)
				}
			};

			reader.onerror = () => {
				reject(new Error('Error reading file.'));
			};

			// Start reading the file
			if (file.name.split('.').pop()?.toLowerCase() === 'kmz') {
				reader.readAsArrayBuffer(file);
			} else {
				reader.readAsText(file);
			}
		});
	},
);
