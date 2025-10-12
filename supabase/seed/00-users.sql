SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', 'd6b83b55-2408-4a89-8487-cbb4ac388a80', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"rigoberto.langosh@co.monmouth.nj.us","user_id":"784f3e19-0699-4ce0-af30-2bf8d284d3c4","user_phone":""}}', '2025-09-13 13:15:52.703053+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cee88753-4ff4-4a3c-8721-9fefd133b519', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"jerald.hammes@co.monmouth.nj.us","user_id":"dc5cb9c5-54bd-4109-991f-1cd81b63409a","user_phone":""}}', '2025-09-13 13:15:52.787158+00', ''),
	('00000000-0000-0000-0000-000000000000', '6470823a-ec3b-429b-93f7-ce677de10307', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"gerardo.rowe@co.monmouth.nj.us","user_id":"95da2efe-8d75-4fa8-9294-be1ca560f222","user_phone":""}}', '2025-09-13 13:15:52.855959+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c954c221-ac11-4ae1-97e1-74ab249a9107', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"ewald.smitham@co.monmouth.nj.us","user_id":"297f3c69-a248-46c3-9989-5b7e628846ad","user_phone":""}}', '2025-09-13 13:15:52.918503+00', ''),
	('00000000-0000-0000-0000-000000000000', '15f0b92c-64e6-48ca-a7f6-c459e5abced4', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"jacinthe.rice@co.monmouth.nj.us","user_id":"19bfac50-22b1-4a3a-a8e9-5103aba2ef99","user_phone":""}}', '2025-09-13 13:15:52.981073+00', ''),
	('00000000-0000-0000-0000-000000000000', '2bc9bb21-8bdc-4c65-a1a8-c840d116b7e5', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"lavonne.breitenberg@co.monmouth.nj.us","user_id":"24f9bffb-32f7-4d03-b8ab-f757ae4b0353","user_phone":""}}', '2025-09-13 13:15:53.043347+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e9a23bfc-1281-4a11-88c6-2004b9cadfcb', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"adelia.gislason@co.monmouth.nj.us","user_id":"87616246-7dc5-4d67-a258-4a70e9aea203","user_phone":""}}', '2025-09-13 13:15:53.106521+00', ''),
	('00000000-0000-0000-0000-000000000000', '70424aa5-1f71-4f33-9072-1438b508b426', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"jaylan.zulauf@co.monmouth.nj.us","user_id":"bbdb11a6-68ba-451c-b478-d28cbb714097","user_phone":""}}', '2025-09-13 13:15:53.169165+00', ''),
	('00000000-0000-0000-0000-000000000000', '7ebd31ca-f0cf-475a-b770-eac9a17339ba', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"tristian.boyer@co.monmouth.nj.us","user_id":"bbfd3ec2-1739-44cc-ad80-63910c6324a9","user_phone":""}}', '2025-09-13 13:15:53.231637+00', ''),
	('00000000-0000-0000-0000-000000000000', '51051d5f-c001-4859-88a0-432b52409137', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"jeramie.ruecker@co.monmouth.nj.us","user_id":"e3f98269-f641-46e6-a5e1-aa1b740c9ac0","user_phone":""}}', '2025-09-13 13:15:53.294248+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ecb340f4-f186-47d5-a9d7-9754eae3da5b', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"gveum@middlesexmosquito.org","user_id":"ff3f3c50-92bc-421d-a0c3-2435d356f0c4","user_phone":""}}', '2025-09-13 13:15:53.35634+00', ''),
	('00000000-0000-0000-0000-000000000000', '6315dea9-56e0-4a5b-a816-ccd03f40524d', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"mwaters@middlesexmosquito.org","user_id":"a3c2d111-2c28-4466-8469-5ccbf54297b5","user_phone":""}}', '2025-09-13 13:15:53.4177+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e1f8e739-1e26-4494-baf3-389e2e743ace', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"lgrady@middlesexmosquito.org","user_id":"5334c85d-698f-43f8-b8e9-15d1dd75f24d","user_phone":""}}', '2025-09-13 13:15:53.478384+00', ''),
	('00000000-0000-0000-0000-000000000000', '001f9bc4-6553-4c2a-aa79-7d6d18a0292e', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"zschmitt@middlesexmosquito.org","user_id":"ceac0fd6-ff52-48df-9353-5a75072c127b","user_phone":""}}', '2025-09-13 13:15:53.539431+00', ''),
	('00000000-0000-0000-0000-000000000000', '270f847a-f8d4-43ef-ab93-2404140573d4', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"sbergnaum@middlesexmosquito.org","user_id":"228afb83-da96-411f-816c-e3a2770e898d","user_phone":""}}', '2025-09-13 13:15:53.599777+00', ''),
	('00000000-0000-0000-0000-000000000000', '3de7021f-718a-4da6-a067-5a206463a9c7', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"vbradtke@middlesexmosquito.org","user_id":"a2e1bf6e-2f18-43a1-a90b-9bc0b5170a19","user_phone":""}}', '2025-09-13 13:15:53.660352+00', ''),
	('00000000-0000-0000-0000-000000000000', '15ff64dd-b1cf-42dd-89e4-cf92c81dbb60', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"cheller@middlesexmosquito.org","user_id":"a9792695-607d-4e78-97d8-52d293588642","user_phone":""}}', '2025-09-13 13:15:53.72012+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fc813614-cbb9-4325-9163-065eba09ea7f', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"dhahn@middlesexmosquito.org","user_id":"c5b9dcde-14a7-4326-94f3-d97321e8dc83","user_phone":""}}', '2025-09-13 13:15:53.780013+00', ''),
	('00000000-0000-0000-0000-000000000000', '652dcc09-0128-4721-b4f3-2bd135781949', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"rtremblay@middlesexmosquito.org","user_id":"e698c5d4-f4ae-471f-bcb4-09e4713ac34a","user_phone":""}}', '2025-09-13 13:15:53.839852+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e7f3dd78-7783-4d2d-84fc-656d65a21df4', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"nmertz@middlesexmosquito.org","user_id":"38903786-34b1-46f2-8919-529c8090f04d","user_phone":""}}', '2025-09-13 13:15:53.901553+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '784f3e19-0699-4ce0-af30-2bf8d284d3c4', 'authenticated', 'authenticated', 'rigoberto.langosh@co.monmouth.nj.us', '$2a$10$.j43/Q.2xOBu6AaGT/IRjuFcEzr3QHZkQLZJkcfwAkYjjLPxjZno2', '2025-09-13 13:15:52.70727+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-09-13 13:15:52.693389+00', '2025-09-13 13:15:52.709447+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'ff3f3c50-92bc-421d-a0c3-2435d356f0c4', 'authenticated', 'authenticated', 'gveum@middlesexmosquito.org', '$2a$10$XQo/dB/U2YRLIYnYJWBWWub5M4U/a17lHNSB6nI1u1r/bEClx8t2W', '2025-09-13 13:15:53.357308+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-09-13 13:15:53.354461+00', '2025-09-13 13:15:53.357806+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '87616246-7dc5-4d67-a258-4a70e9aea203', 'authenticated', 'authenticated', 'adelia.gislason@co.monmouth.nj.us', '$2a$10$nKgmoacWU1sqaHEsI/OKYuUOCEDukOipzkDZjGkXbWLNct5R.VS6y', '2025-09-13 13:15:53.107594+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-09-13 13:15:53.104721+00', '2025-09-13 13:15:53.108091+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'dc5cb9c5-54bd-4109-991f-1cd81b63409a', 'authenticated', 'authenticated', 'jerald.hammes@co.monmouth.nj.us', '$2a$10$SJzWSUh2m3eGST9pQrWSK.izJpEpxrhVZmFqQwKEnr6BmTpcHGm7O', '2025-09-13 13:15:52.788518+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-09-13 13:15:52.784855+00', '2025-09-13 13:15:52.789168+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '95da2efe-8d75-4fa8-9294-be1ca560f222', 'authenticated', 'authenticated', 'gerardo.rowe@co.monmouth.nj.us', '$2a$10$DAuSnw7S6DLHsggacHRB7uzQmGVsq6IlG6XBM502.D4XsqwLzt0Mu', '2025-09-13 13:15:52.857108+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-09-13 13:15:52.852818+00', '2025-09-13 13:15:52.85774+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'ceac0fd6-ff52-48df-9353-5a75072c127b', 'authenticated', 'authenticated', 'zschmitt@middlesexmosquito.org', '$2a$10$Asm.f2oNjNcZmyeurcy5ke10WZV9GYx6CoCn3SuAAWdzajm6C5ouW', '2025-09-13 13:15:53.540395+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-09-13 13:15:53.537724+00', '2025-09-13 13:15:53.540905+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'bbdb11a6-68ba-451c-b478-d28cbb714097', 'authenticated', 'authenticated', 'jaylan.zulauf@co.monmouth.nj.us', '$2a$10$TChKs525coPJvFEkD9hLCuDXojNRt9zD2RPMh8/gllYYnp4ceEtYq', '2025-09-13 13:15:53.170154+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-09-13 13:15:53.166898+00', '2025-09-13 13:15:53.170853+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '297f3c69-a248-46c3-9989-5b7e628846ad', 'authenticated', 'authenticated', 'ewald.smitham@co.monmouth.nj.us', '$2a$10$1Vw8otTKoip.C67zPu3GseHBUb/g6yiFP.s0ePVPQwwDYJ4skb05e', '2025-09-13 13:15:52.919559+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-09-13 13:15:52.916546+00', '2025-09-13 13:15:52.920053+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '19bfac50-22b1-4a3a-a8e9-5103aba2ef99', 'authenticated', 'authenticated', 'jacinthe.rice@co.monmouth.nj.us', '$2a$10$pF3PQW490Yht8qGg2lZHfutsHtrNXKIS9BOIUIl0HBbX4C3fQWSbe', '2025-09-13 13:15:52.982254+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-09-13 13:15:52.978886+00', '2025-09-13 13:15:52.982896+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'a3c2d111-2c28-4466-8469-5ccbf54297b5', 'authenticated', 'authenticated', 'mwaters@middlesexmosquito.org', '$2a$10$ySYtD3MsVD.MOQN1t7ETcebFhebqCTqHftg47BODbPdtdes3sCVdK', '2025-09-13 13:15:53.418773+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-09-13 13:15:53.415595+00', '2025-09-13 13:15:53.419222+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'bbfd3ec2-1739-44cc-ad80-63910c6324a9', 'authenticated', 'authenticated', 'tristian.boyer@co.monmouth.nj.us', '$2a$10$.WGe74E0nBTj0TPQjPFxNO.lI.u87FupVlVLTHTiN.VLojzIBj8JS', '2025-09-13 13:15:53.232617+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-09-13 13:15:53.229482+00', '2025-09-13 13:15:53.233121+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '24f9bffb-32f7-4d03-b8ab-f757ae4b0353', 'authenticated', 'authenticated', 'lavonne.breitenberg@co.monmouth.nj.us', '$2a$10$VM1765gsEdQmS7T9V4AzSebu6tv8oNvcqkr7O.6sHPCdaxQiMPTJm', '2025-09-13 13:15:53.044474+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-09-13 13:15:53.041212+00', '2025-09-13 13:15:53.045164+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'a2e1bf6e-2f18-43a1-a90b-9bc0b5170a19', 'authenticated', 'authenticated', 'vbradtke@middlesexmosquito.org', '$2a$10$GkQDcDYYdYtvX7YqVJ2ENejeDSd1FzyXcdPdXoxKZ.fLY3JvjaG26', '2025-09-13 13:15:53.661365+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-09-13 13:15:53.658579+00', '2025-09-13 13:15:53.661853+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'e3f98269-f641-46e6-a5e1-aa1b740c9ac0', 'authenticated', 'authenticated', 'jeramie.ruecker@co.monmouth.nj.us', '$2a$10$V/M.Kl8..PZRwCOspp4wNeQ/MoGk/sPkDga/lyyg6bpae6TygjWj6', '2025-09-13 13:15:53.295278+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-09-13 13:15:53.292484+00', '2025-09-13 13:15:53.295785+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '228afb83-da96-411f-816c-e3a2770e898d', 'authenticated', 'authenticated', 'sbergnaum@middlesexmosquito.org', '$2a$10$IrhLCwehvC6C2XLIf17qwuflHUoYDenNZRwxk77U7TeUIym2vToRi', '2025-09-13 13:15:53.60076+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-09-13 13:15:53.59816+00', '2025-09-13 13:15:53.60121+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '5334c85d-698f-43f8-b8e9-15d1dd75f24d', 'authenticated', 'authenticated', 'lgrady@middlesexmosquito.org', '$2a$10$2tLd66JItvuoHxdhaXHcSObsylRmPE6M92I.8xPt4vL3WQRpWJ8fa', '2025-09-13 13:15:53.479428+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-09-13 13:15:53.47656+00', '2025-09-13 13:15:53.480784+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'e698c5d4-f4ae-471f-bcb4-09e4713ac34a', 'authenticated', 'authenticated', 'rtremblay@middlesexmosquito.org', '$2a$10$503oEThnX3StW3bzuBk5/ukAWH5Ba5jvhOzBMvS7XLdDCYZlsd7U6', '2025-09-13 13:15:53.841014+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-09-13 13:15:53.838112+00', '2025-09-13 13:15:53.841963+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'c5b9dcde-14a7-4326-94f3-d97321e8dc83', 'authenticated', 'authenticated', 'dhahn@middlesexmosquito.org', '$2a$10$0W9gvrpAaAgLTXCKYoneouNFj2Tr1JiHdvbw99vgKsKjRnpbWAkFK', '2025-09-13 13:15:53.781034+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-09-13 13:15:53.778168+00', '2025-09-13 13:15:53.781488+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'a9792695-607d-4e78-97d8-52d293588642', 'authenticated', 'authenticated', 'cheller@middlesexmosquito.org', '$2a$10$WSN1dMSlcCOOG8mAOrVZk.cGzlqmifloAR9QMM1eOUAVOfw3tbmly', '2025-09-13 13:15:53.72112+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-09-13 13:15:53.718524+00', '2025-09-13 13:15:53.721606+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '38903786-34b1-46f2-8919-529c8090f04d', 'authenticated', 'authenticated', 'nmertz@middlesexmosquito.org', '$2a$10$yRACqO0kl7fBcL3z8T2/2uVEFY.rf7iS16gCk45tV3aPXJ0809.CS', '2025-09-13 13:15:53.902629+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-09-13 13:15:53.899748+00', '2025-09-13 13:15:53.903139+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('784f3e19-0699-4ce0-af30-2bf8d284d3c4', '784f3e19-0699-4ce0-af30-2bf8d284d3c4', '{"sub": "784f3e19-0699-4ce0-af30-2bf8d284d3c4", "email": "rigoberto.langosh@co.monmouth.nj.us", "email_verified": false, "phone_verified": false}', 'email', '2025-09-13 13:15:52.700588+00', '2025-09-13 13:15:52.700669+00', '2025-09-13 13:15:52.700669+00', 'bfefa03e-0517-4b63-839a-3be16bf4031e'),
	('dc5cb9c5-54bd-4109-991f-1cd81b63409a', 'dc5cb9c5-54bd-4109-991f-1cd81b63409a', '{"sub": "dc5cb9c5-54bd-4109-991f-1cd81b63409a", "email": "jerald.hammes@co.monmouth.nj.us", "email_verified": false, "phone_verified": false}', 'email', '2025-09-13 13:15:52.786119+00', '2025-09-13 13:15:52.786165+00', '2025-09-13 13:15:52.786165+00', '19fcdf2c-592e-4121-b378-68e233413f75'),
	('95da2efe-8d75-4fa8-9294-be1ca560f222', '95da2efe-8d75-4fa8-9294-be1ca560f222', '{"sub": "95da2efe-8d75-4fa8-9294-be1ca560f222", "email": "gerardo.rowe@co.monmouth.nj.us", "email_verified": false, "phone_verified": false}', 'email', '2025-09-13 13:15:52.855079+00', '2025-09-13 13:15:52.855116+00', '2025-09-13 13:15:52.855116+00', 'c5f4c7b6-daf4-4a21-94b3-ff495d098322'),
	('297f3c69-a248-46c3-9989-5b7e628846ad', '297f3c69-a248-46c3-9989-5b7e628846ad', '{"sub": "297f3c69-a248-46c3-9989-5b7e628846ad", "email": "ewald.smitham@co.monmouth.nj.us", "email_verified": false, "phone_verified": false}', 'email', '2025-09-13 13:15:52.917638+00', '2025-09-13 13:15:52.917684+00', '2025-09-13 13:15:52.917684+00', '567299a4-0b88-410e-9a2b-91c59fbc985d'),
	('19bfac50-22b1-4a3a-a8e9-5103aba2ef99', '19bfac50-22b1-4a3a-a8e9-5103aba2ef99', '{"sub": "19bfac50-22b1-4a3a-a8e9-5103aba2ef99", "email": "jacinthe.rice@co.monmouth.nj.us", "email_verified": false, "phone_verified": false}', 'email', '2025-09-13 13:15:52.98028+00', '2025-09-13 13:15:52.980306+00', '2025-09-13 13:15:52.980306+00', '75f2ae65-d7ed-4d9b-8a04-945a60f83c41'),
	('24f9bffb-32f7-4d03-b8ab-f757ae4b0353', '24f9bffb-32f7-4d03-b8ab-f757ae4b0353', '{"sub": "24f9bffb-32f7-4d03-b8ab-f757ae4b0353", "email": "lavonne.breitenberg@co.monmouth.nj.us", "email_verified": false, "phone_verified": false}', 'email', '2025-09-13 13:15:53.042393+00', '2025-09-13 13:15:53.042457+00', '2025-09-13 13:15:53.042457+00', 'bea302d1-5f5c-4c94-be76-9f3e64e3a4e5'),
	('87616246-7dc5-4d67-a258-4a70e9aea203', '87616246-7dc5-4d67-a258-4a70e9aea203', '{"sub": "87616246-7dc5-4d67-a258-4a70e9aea203", "email": "adelia.gislason@co.monmouth.nj.us", "email_verified": false, "phone_verified": false}', 'email', '2025-09-13 13:15:53.105745+00', '2025-09-13 13:15:53.105777+00', '2025-09-13 13:15:53.105777+00', '2ead2c73-e5f6-447d-92d5-126da86a69c4'),
	('bbdb11a6-68ba-451c-b478-d28cbb714097', 'bbdb11a6-68ba-451c-b478-d28cbb714097', '{"sub": "bbdb11a6-68ba-451c-b478-d28cbb714097", "email": "jaylan.zulauf@co.monmouth.nj.us", "email_verified": false, "phone_verified": false}', 'email', '2025-09-13 13:15:53.168381+00', '2025-09-13 13:15:53.168433+00', '2025-09-13 13:15:53.168433+00', 'f77b6f3e-7d9d-483a-b79f-c97a4ab85b82'),
	('bbfd3ec2-1739-44cc-ad80-63910c6324a9', 'bbfd3ec2-1739-44cc-ad80-63910c6324a9', '{"sub": "bbfd3ec2-1739-44cc-ad80-63910c6324a9", "email": "tristian.boyer@co.monmouth.nj.us", "email_verified": false, "phone_verified": false}', 'email', '2025-09-13 13:15:53.230549+00', '2025-09-13 13:15:53.230628+00', '2025-09-13 13:15:53.230628+00', 'b26a4351-433e-493a-aced-6b75cc3e7e92'),
	('e3f98269-f641-46e6-a5e1-aa1b740c9ac0', 'e3f98269-f641-46e6-a5e1-aa1b740c9ac0', '{"sub": "e3f98269-f641-46e6-a5e1-aa1b740c9ac0", "email": "jeramie.ruecker@co.monmouth.nj.us", "email_verified": false, "phone_verified": false}', 'email', '2025-09-13 13:15:53.293486+00', '2025-09-13 13:15:53.293513+00', '2025-09-13 13:15:53.293513+00', '770d7c24-0791-4a15-a26b-c11fe50b13b2'),
	('ff3f3c50-92bc-421d-a0c3-2435d356f0c4', 'ff3f3c50-92bc-421d-a0c3-2435d356f0c4', '{"sub": "ff3f3c50-92bc-421d-a0c3-2435d356f0c4", "email": "gveum@middlesexmosquito.org", "email_verified": false, "phone_verified": false}', 'email', '2025-09-13 13:15:53.355482+00', '2025-09-13 13:15:53.355511+00', '2025-09-13 13:15:53.355511+00', '4ccf2ffe-4e43-4adb-a5ca-f7caa42f3891'),
	('a3c2d111-2c28-4466-8469-5ccbf54297b5', 'a3c2d111-2c28-4466-8469-5ccbf54297b5', '{"sub": "a3c2d111-2c28-4466-8469-5ccbf54297b5", "email": "mwaters@middlesexmosquito.org", "email_verified": false, "phone_verified": false}', 'email', '2025-09-13 13:15:53.41678+00', '2025-09-13 13:15:53.416809+00', '2025-09-13 13:15:53.416809+00', '81864b7f-f6e8-4571-b437-efc10ef49b3f'),
	('5334c85d-698f-43f8-b8e9-15d1dd75f24d', '5334c85d-698f-43f8-b8e9-15d1dd75f24d', '{"sub": "5334c85d-698f-43f8-b8e9-15d1dd75f24d", "email": "lgrady@middlesexmosquito.org", "email_verified": false, "phone_verified": false}', 'email', '2025-09-13 13:15:53.477535+00', '2025-09-13 13:15:53.477563+00', '2025-09-13 13:15:53.477563+00', 'af7f921a-2b87-494e-a9ab-08e0386a2a89'),
	('ceac0fd6-ff52-48df-9353-5a75072c127b', 'ceac0fd6-ff52-48df-9353-5a75072c127b', '{"sub": "ceac0fd6-ff52-48df-9353-5a75072c127b", "email": "zschmitt@middlesexmosquito.org", "email_verified": false, "phone_verified": false}', 'email', '2025-09-13 13:15:53.538695+00', '2025-09-13 13:15:53.538732+00', '2025-09-13 13:15:53.538732+00', 'e79b2efa-9b3f-4b46-87f4-28b3a660a035'),
	('228afb83-da96-411f-816c-e3a2770e898d', '228afb83-da96-411f-816c-e3a2770e898d', '{"sub": "228afb83-da96-411f-816c-e3a2770e898d", "email": "sbergnaum@middlesexmosquito.org", "email_verified": false, "phone_verified": false}', 'email', '2025-09-13 13:15:53.599078+00', '2025-09-13 13:15:53.599104+00', '2025-09-13 13:15:53.599104+00', '6bd84ddc-35b0-4cf1-8499-213c47bf062b'),
	('a2e1bf6e-2f18-43a1-a90b-9bc0b5170a19', 'a2e1bf6e-2f18-43a1-a90b-9bc0b5170a19', '{"sub": "a2e1bf6e-2f18-43a1-a90b-9bc0b5170a19", "email": "vbradtke@middlesexmosquito.org", "email_verified": false, "phone_verified": false}', 'email', '2025-09-13 13:15:53.6596+00', '2025-09-13 13:15:53.659626+00', '2025-09-13 13:15:53.659626+00', 'c870e555-0b26-4aa8-bdc1-db83e28731d8'),
	('a9792695-607d-4e78-97d8-52d293588642', 'a9792695-607d-4e78-97d8-52d293588642', '{"sub": "a9792695-607d-4e78-97d8-52d293588642", "email": "cheller@middlesexmosquito.org", "email_verified": false, "phone_verified": false}', 'email', '2025-09-13 13:15:53.719411+00', '2025-09-13 13:15:53.719439+00', '2025-09-13 13:15:53.719439+00', '8b6e6578-45fa-47f3-ad95-ed3785f3c906'),
	('c5b9dcde-14a7-4326-94f3-d97321e8dc83', 'c5b9dcde-14a7-4326-94f3-d97321e8dc83', '{"sub": "c5b9dcde-14a7-4326-94f3-d97321e8dc83", "email": "dhahn@middlesexmosquito.org", "email_verified": false, "phone_verified": false}', 'email', '2025-09-13 13:15:53.779244+00', '2025-09-13 13:15:53.779272+00', '2025-09-13 13:15:53.779272+00', 'c8db1fa3-8a4d-42c7-872f-16dca9df50e6'),
	('e698c5d4-f4ae-471f-bcb4-09e4713ac34a', 'e698c5d4-f4ae-471f-bcb4-09e4713ac34a', '{"sub": "e698c5d4-f4ae-471f-bcb4-09e4713ac34a", "email": "rtremblay@middlesexmosquito.org", "email_verified": false, "phone_verified": false}', 'email', '2025-09-13 13:15:53.839096+00', '2025-09-13 13:15:53.839124+00', '2025-09-13 13:15:53.839124+00', '161d9a69-cf94-4697-9693-a2abc3480bb5'),
	('38903786-34b1-46f2-8919-529c8090f04d', '38903786-34b1-46f2-8919-529c8090f04d', '{"sub": "38903786-34b1-46f2-8919-529c8090f04d", "email": "nmertz@middlesexmosquito.org", "email_verified": false, "phone_verified": false}', 'email', '2025-09-13 13:15:53.900781+00', '2025-09-13 13:15:53.900812+00', '2025-09-13 13:15:53.900812+00', 'fa4daa8e-c405-45ec-84ed-e342611e6d11');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: group_users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: profile_licenses; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
