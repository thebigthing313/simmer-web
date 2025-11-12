set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.insert_region(p_group_id uuid, p_region_name text, p_geom json, p_parent_id uuid DEFAULT NULL::uuid)
 RETURNS void
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
    begin
        insert into public.regions (group_id, region_name, geom, parent_id)
        values (p_group_id, p_region_name, ST_GeomFromGeoJSON(p_geom::text), p_parent_id);
        return;
    end;
$function$
;

CREATE OR REPLACE FUNCTION public.update_region(p_region_id uuid, p_geom json)
 RETURNS void
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
    begin
        update public.regions
        set geom = ST_GeomFromGeoJSON(p_geom)
        where id = p_region_id;
    end;
$function$
;


