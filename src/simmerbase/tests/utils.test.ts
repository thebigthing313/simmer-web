import { describe, expect, it } from 'vitest';
import {
	getCanonicalKey,
	serializeKey,
	transformDates,
	transformDatesToStrings,
} from '../utils';

describe('serializeKey', () => {
	it('should serialize primitive values correctly', () => {
		expect(serializeKey('hello', 123, true)).toBe('hello::123::true');
	});

	it('should handle null and undefined', () => {
		expect(serializeKey(null, undefined)).toBe('null::undefined');
	});

	it('should handle empty args', () => {
		expect(serializeKey()).toBe('');
	});

	it('should handle single arg', () => {
		expect(serializeKey('test')).toBe('test');
	});
});

describe('getCanonicalKey', () => {
	it('should return the same object for same args', () => {
		const key1 = getCanonicalKey('a', 1);
		const key2 = getCanonicalKey('a', 1);
		expect(key1).toBe(key2);
	});

	it('should return different objects for different args', () => {
		const key1 = getCanonicalKey('a', 1);
		const key2 = getCanonicalKey('b', 1);
		expect(key1).not.toBe(key2);
	});

	it('should return an object', () => {
		const key = getCanonicalKey('test');
		expect(typeof key).toBe('object');
		expect(key).not.toBe(null);
	});
});

describe('transformDates', () => {
	it('should transform _date fields to Date objects', () => {
		const input = { created_date: '2023-10-01', name: 'test' };
		const result = transformDates(input);
		expect(result.created_date).toBeInstanceOf(Date);
		expect((result.created_date as unknown as Date).toISOString()).toBe(
			'2023-10-01T00:00:00.000Z',
		);
		expect(result.name).toBe('test');
	});

	it('should transform _at fields to Date objects', () => {
		const input = { updated_at: '2023-10-01T12:00:00Z', name: 'test' };
		const result = transformDates(input);
		expect(result.updated_at).toBeInstanceOf(Date);
		expect((result.updated_at as unknown as Date).toISOString()).toBe(
			'2023-10-01T12:00:00.000Z',
		);
		expect(result.name).toBe('test');
	});

	it('should not transform non-matching fields', () => {
		const input = { id: 123, description: 'test' };
		const result = transformDates(input);
		expect(result.id).toBe(123);
		expect(result.description).toBe('test');
	});

	it('should handle invalid dates gracefully', () => {
		const input = { bad_date: 'invalid', name: 'test' };
		const result = transformDates(input);
		expect(result.bad_date).toBe('invalid'); // Should remain string if invalid
		expect(result.name).toBe('test');
	});

	it('should return non-objects unchanged', () => {
		expect(transformDates(null)).toBe(null);
		expect(transformDates('string')).toBe('string');
		expect(transformDates(123)).toBe(123);
	});
});

describe('transformDatesToStrings', () => {
	it('should transform Date objects to ISO strings', () => {
		const date = new Date('2023-10-01T12:00:00Z');
		const input = { updated_at: date, name: 'test' };
		const result = transformDatesToStrings(input);
		expect(result.updated_at).toBe('2023-10-01T12:00:00.000Z');
		expect(result.name).toBe('test');
	});

	it('should not transform non-Date fields', () => {
		const input = { id: 123, description: 'test' };
		const result = transformDatesToStrings(input);
		expect(result.id).toBe(123);
		expect(result.description).toBe('test');
	});

	it('should return non-objects unchanged', () => {
		expect(transformDatesToStrings(null)).toBe(null);
		expect(transformDatesToStrings('string')).toBe('string');
		expect(transformDatesToStrings(123)).toBe(123);
	});
});
