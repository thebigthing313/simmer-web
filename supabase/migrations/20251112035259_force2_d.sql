set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.insert_region(p_group_id uuid, p_region_name text, p_geom json, p_parent_id uuid DEFAULT NULL::uuid)
 RETURNS void
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
    BEGIN
        -- 1. Input Validation: Check for required fields
        IF p_group_id IS NULL THEN
            RAISE EXCEPTION 'Group ID (p_group_id) cannot be NULL for a new region.'
            USING HINT = 'Please ensure a valid UUID is provided for the region group.',
                  ERRCODE = '22004'; -- null_value_not_allowed
        END IF;

        IF p_geom IS NULL THEN
            RAISE EXCEPTION 'Geometry data (p_geom) cannot be NULL.'
            USING HINT = 'A GeoJSON object must be supplied to define the region''s boundary.',
                  ERRCODE = '22004';
        END IF;

        -- 2. Main Logic
        INSERT INTO public.regions (group_id, region_name, geom, parent_id)
        VALUES (
            p_group_id,
            p_region_name,
            extensions.ST_Multi(extensions.ST_Force2D(extensions.ST_GeomFromGeoJSON(p_geom))),
            p_parent_id
        );
        RETURN;
    END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_region(p_region_id uuid, p_geom json)
 RETURNS void
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
    BEGIN
        -- 1. Input Validation: Check for required fields
        IF p_region_id IS NULL OR p_geom IS NULL THEN
            RAISE EXCEPTION 'Region ID and Geometry (p_geom) cannot be NULL for an update.'
            USING HINT = 'Ensure both the region ID and new GeoJSON are provided.',
                  ERRCODE = '22004';
        END IF;

        -- 2. Main Logic
        UPDATE public.regions
        SET geom = extensions.ST_Multi(extensions.ST_Force2D(extensions.ST_GeomFromGeoJSON(p_geom)))
        WHERE id = p_region_id;

        -- 3. Validation: Check if any row was updated
        IF NOT FOUND THEN
            RAISE EXCEPTION 'Region ID % not found. Update failed.', p_region_id
            USING HINT = 'The provided region ID does not exist in the public.regions table.',
                  ERRCODE = 'P0002'; -- no_data_found
        END IF;
    END;
$function$
;


