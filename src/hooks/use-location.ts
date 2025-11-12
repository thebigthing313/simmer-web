import { useSuspenseQuery } from '@tanstack/react-query';

export function useLocation() {
	const { data } = useSuspenseQuery({
		queryKey: ['location'],
		queryFn: () =>
			new Promise<{ latitude: number; longitude: number }>(
				(resolve, reject) => {
					navigator.geolocation.getCurrentPosition(
						(position) =>
							resolve({
								latitude: position.coords.latitude,
								longitude: position.coords.longitude,
							}),
						(error) =>
							reject(
								new Error(`Location access denied or error: ${error.message}`),
							),
					);
				},
			),
	});

	return data;
}
