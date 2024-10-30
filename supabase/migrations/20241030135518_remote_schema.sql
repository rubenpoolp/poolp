create table "public"."profilePics" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null default auth.uid(),
    "urls" text[]
);


alter table "public"."profilePics" enable row level security;

CREATE UNIQUE INDEX "profilePics_pkey" ON public."profilePics" USING btree (id);

CREATE UNIQUE INDEX "profilePics_user_id_key" ON public."profilePics" USING btree (user_id);

alter table "public"."profilePics" add constraint "profilePics_pkey" PRIMARY KEY using index "profilePics_pkey";

alter table "public"."profilePics" add constraint "profilePics_user_id_fkey" FOREIGN KEY (user_id) REFERENCES account(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."profilePics" validate constraint "profilePics_user_id_fkey";

alter table "public"."profilePics" add constraint "profilePics_user_id_key" UNIQUE using index "profilePics_user_id_key";

grant delete on table "public"."profilePics" to "anon";

grant insert on table "public"."profilePics" to "anon";

grant references on table "public"."profilePics" to "anon";

grant select on table "public"."profilePics" to "anon";

grant trigger on table "public"."profilePics" to "anon";

grant truncate on table "public"."profilePics" to "anon";

grant update on table "public"."profilePics" to "anon";

grant delete on table "public"."profilePics" to "authenticated";

grant insert on table "public"."profilePics" to "authenticated";

grant references on table "public"."profilePics" to "authenticated";

grant select on table "public"."profilePics" to "authenticated";

grant trigger on table "public"."profilePics" to "authenticated";

grant truncate on table "public"."profilePics" to "authenticated";

grant update on table "public"."profilePics" to "authenticated";

grant delete on table "public"."profilePics" to "service_role";

grant insert on table "public"."profilePics" to "service_role";

grant references on table "public"."profilePics" to "service_role";

grant select on table "public"."profilePics" to "service_role";

grant trigger on table "public"."profilePics" to "service_role";

grant truncate on table "public"."profilePics" to "service_role";

grant update on table "public"."profilePics" to "service_role";


