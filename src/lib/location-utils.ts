/**
 * Calculates the great-circle distance between two geographic coordinates using the Haversine formula.
 *
 * @param from - The starting point with latitude (`lat`) and longitude (`lng`) in decimal degrees.
 * @param to - The destination point with latitude (`lat`) and longitude (`lng`) in decimal degrees.
 * @returns The distance between the two points in meters.
 *
 * @remarks
 * This function assumes the Earth is a perfect sphere with a radius of 6,371,000 meters.
 * The result is an approximation and may not account for ellipsoidal effects or altitude differences.
 */
export function haversine(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
): number {
  const R = 6371000; // Earth radius in meters
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(to.lat - from.lat);
  const dLon = toRad(to.lng - from.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(from.lat)) *
      Math.cos(toRad(to.lat)) *
      Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}
