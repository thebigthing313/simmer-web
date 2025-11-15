import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Trash } from 'lucide-react';
import { Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { toast } from 'sonner';
import z from 'zod';
import { FormField } from '@/components/blocks/form-field';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
	FieldContent,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppForm } from '@/forms/form-context';
import { parsePolygons } from '@/lib/gis/parse-polygons';
import { useMapStore } from '@/lib/map-store';
import { regions } from '@/simmerbase/db/collections/regions';
import {
	formatRegions,
	useGroupRegions,
} from '@/simmerbase/db/hooks/use-group-regions';
import { insertRegion } from '@/simmerbase/functions/insert-region';

export const Route = createFileRoute('/$groupSlug/regions/import')({
	component: () => (
		<ErrorBoundary fallback={<div>Error loading import form.</div>}>
			<Suspense fallback={null}>
				<RouteComponent />
			</Suspense>
		</ErrorBoundary>
	),
	loader: () => {
		return { crumb: 'Import' };
	},
});

const ImportItem = z.object({
	id: z.string(),
	name: z.string('A region name is required'),
	geom: z.any(),
});

const ImportItemForm = z.object({
	id: z.string(),
	name: z.string('A region name is required'),
});

const ImportSchema = z.object({
	items: z.array(ImportItemForm),
	parent_id: z.string(),
});

const initDefaultValues: z.infer<typeof ImportSchema> = {
	items: [{ id: crypto.randomUUID(), name: '' }],
	parent_id: '',
};

function RouteComponent() {
	const navigate = useNavigate();
	const { group_id } = Route.useRouteContext();
	const { clearGeoJson, replaceGeoJson, fitToGeoJson, removeGeoJsonByIndex } =
		useMapStore();
	const [fullItems, setFullItems] = useState<z.infer<typeof ImportItem>[]>([]);
	const { data } = useGroupRegions(group_id);
	const formattedRegions = formatRegions(data);

	useEffect(() => {
		clearGeoJson();
		return () => {
			clearGeoJson();
		};
	}, [clearGeoJson]);

	const form = useAppForm({
		validators: { onSubmit: ImportSchema },
		defaultValues: initDefaultValues,
		onSubmit: async ({ value }) => {
			const itemsToImport = value.items.map((item) => {
				const full = fullItems.find((f) => f.id === item.id);
				if (!full) throw new Error('Lost link to GeoJSON Object');
				return { id: item.id, name: item.name, geom: full.geom };
			});

			try {
				const promises = itemsToImport.map((item) =>
					insertRegion({
						data: {
							group_id: group_id,
							region_name: item.name,
							geom: item.geom,
							parent_id: value.parent_id === '' ? undefined : value.parent_id,
						},
					}),
				);

				await Promise.all(promises);
				toast.success('Import successful.');
				await regions.utils.refetch();
				clearGeoJson();
				navigate({ from: '/$groupSlug/regions/import', to: '..' });
			} catch (error) {
				toast.error(`Import failed: ${(error as Error).message}`);
			}
		},
	});

	const fileHandler = async (file: File | null) => {
		if (!file) return;
		try {
			const polygons = await parsePolygons(file);
			const parsed = polygons.map((p) => ({
				id: crypto.randomUUID(),
				name: p.name,
				geom: p.geom,
			}));
			setFullItems(parsed);
			form.setFieldValue(
				'items',
				parsed.map((p) => ({ id: p.id, name: p.name })),
			);
			replaceGeoJson(polygons.map((p) => p.geom));
			fitToGeoJson();
		} catch (error) {
			toast.error(`Failed to parse file: ${(error as Error).message}`);
		}
	};

	return (
		<form.AppForm>
			<form.FormWrapper
				formLabel="Import Regions"
				formDescription="Manage the regions you want to import."
			>
				<FormField
					label="Upload File"
					description="Accepts KML, KMZ, GPX, or GeoJSON"
				>
					<Input
						type="file"
						onChange={(e) => fileHandler(e.target.files?.[0] || null)}
						accept=".kml,.kmz,.gpx,.geojson,application/vnd.google-earth.kml+xml,application/xml,application/json,application/vnd.geo+json"
					></Input>
				</FormField>
				<form.AppField name="parent_id">
					{(field) => (
						<field.AutocompleteField
							label="Parent Region"
							items={formattedRegions}
						/>
					)}
				</form.AppField>

				<FieldGroup>
					<FieldContent>
						<FieldLabel>Region Names</FieldLabel>
						<FieldDescription>
							You can modify the names and delete any regions before importing.
						</FieldDescription>
					</FieldContent>
					<div className="p-2 border-dashed border rounded-lg">
						<ScrollArea className="w-full h-[500px]">
							<form.Field name="items" mode="array">
								{(field) => {
									return (
										<div className="flex flex-col gap-2">
											{field.state.value.map((item, i) => {
												return (
													<div
														className="w-full flex flex-row gap-2 px-4"
														key={item.id}
													>
														<form.AppField
															key={item.id}
															name={`items[${i}].name`}
														>
															{(subField) => {
																return <subField.TextField />;
															}}
														</form.AppField>
														<Button
															variant="destructive"
															size="icon"
															onClick={() => {
																field.removeValue(i);
																setFullItems((prev) =>
																	prev.filter((_, idx) => idx !== i),
																);
																removeGeoJsonByIndex(i);
															}}
														>
															<Trash />
														</Button>
													</div>
												);
											})}
										</div>
									);
								}}
							</form.Field>
						</ScrollArea>
					</div>
				</FieldGroup>
				<ButtonGroup>
					<form.ResetFormButton label="Reset" />
					<form.SubmitFormButton label="Import Regions" />
				</ButtonGroup>
			</form.FormWrapper>
		</form.AppForm>
	);
}
