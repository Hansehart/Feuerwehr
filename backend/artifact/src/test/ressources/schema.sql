
--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 223 (class 1259 OID 16434)
-- Name: material; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.material (
    id integer NOT NULL,
    name character varying(30),
    decription character varying(512)
);


--
-- TOC entry 222 (class 1259 OID 16433)
-- Name: Material_ID_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.material ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Material_ID_seq"
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 215 (class 1259 OID 16389)
-- Name: radiocallsign; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.radiocallsign (
    id integer NOT NULL,
    organisation character varying(20) NOT NULL,
    area character varying(20) NOT NULL,
    location smallint NOT NULL
);


--
-- TOC entry 216 (class 1259 OID 16401)
-- Name: RadioCallSign_ID_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.radiocallsign ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."RadioCallSign_ID_seq"
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 16418)
-- Name: storagelocation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.storagelocation (
    id integer NOT NULL,
    fk_vehicle integer NOT NULL,
    name character varying(30)
);


--
-- TOC entry 219 (class 1259 OID 16417)
-- Name: StorageLocation_ID_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.storagelocation ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."StorageLocation_ID_seq"
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 218 (class 1259 OID 16407)
-- Name: vehicle; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vehicle (
    id integer NOT NULL,
    fk_radio_call_sign integer NOT NULL,
    radio_vehicle_type smallint NOT NULL,
    radio_vehicle_number smallint NOT NULL,
    name character varying(20),
    type character varying(30)
);


--
-- TOC entry 217 (class 1259 OID 16406)
-- Name: Vehicle_ID_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.vehicle ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Vehicle_ID_seq"
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 225 (class 1259 OID 16460)
-- Name: contentpage; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.contentpage (
    id integer NOT NULL,
    title character varying(50) NOT NULL,
    content text NOT NULL
);


--
-- TOC entry 224 (class 1259 OID 16459)
-- Name: contentpage_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.contentpage ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.contentpage_id_seq
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 226 (class 1259 OID 16467)
-- Name: contentpages_for_materials; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.contentpages_for_materials (
    fk_material integer NOT NULL,
    fk_contentpage integer NOT NULL
);


--
-- TOC entry 228 (class 1259 OID 16483)
-- Name: image; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.image (
    id integer NOT NULL,
    path character varying(100) NOT NULL,
    width smallint,
    height smallint
);


--
-- TOC entry 227 (class 1259 OID 16482)
-- Name: image_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.image ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.image_id_seq
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 230 (class 1259 OID 16503)
-- Name: images_for_contentpages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.images_for_contentpages (
    fk_image integer NOT NULL,
    fk_contentpage integer NOT NULL
);


--
-- TOC entry 231 (class 1259 OID 16518)
-- Name: images_for_materials; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.images_for_materials (
    fk_image integer NOT NULL,
    fk_material integer NOT NULL
);


--
-- TOC entry 229 (class 1259 OID 16488)
-- Name: images_for_vehicles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.images_for_vehicles (
    fk_image integer NOT NULL,
    fk_vehicle integer NOT NULL
);


--
-- TOC entry 221 (class 1259 OID 16428)
-- Name: storagelocations_contains_materials; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.storagelocations_contains_materials (
    fk_storagelocation integer NOT NULL,
    fk_material integer NOT NULL
);


--
-- TOC entry 3259 (class 2606 OID 16466)
-- Name: contentpage contentpage_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contentpage
    ADD CONSTRAINT contentpage_pkey PRIMARY KEY (id);


--
-- TOC entry 3261 (class 2606 OID 16471)
-- Name: contentpages_for_materials contentpages_for_materials_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contentpages_for_materials
    ADD CONSTRAINT contentpages_for_materials_pkey PRIMARY KEY (fk_material, fk_contentpage);


--
-- TOC entry 3267 (class 2606 OID 16507)
-- Name: images_for_contentpages image_for_content_pages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.images_for_contentpages
    ADD CONSTRAINT image_for_content_pages_pkey PRIMARY KEY (fk_image, fk_contentpage);


--
-- TOC entry 3263 (class 2606 OID 16487)
-- Name: image image_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.image
    ADD CONSTRAINT image_pkey PRIMARY KEY (id);


--
-- TOC entry 3269 (class 2606 OID 16522)
-- Name: images_for_materials images_for_materials_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.images_for_materials
    ADD CONSTRAINT images_for_materials_pkey PRIMARY KEY (fk_image, fk_material);


--
-- TOC entry 3265 (class 2606 OID 16492)
-- Name: images_for_vehicles images_for_vehicles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.images_for_vehicles
    ADD CONSTRAINT images_for_vehicles_pkey PRIMARY KEY (fk_image, fk_vehicle);


--
-- TOC entry 3257 (class 2606 OID 16440)
-- Name: material material_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.material
    ADD CONSTRAINT material_pkey PRIMARY KEY (id);


--
-- TOC entry 3249 (class 2606 OID 16396)
-- Name: radiocallsign radiocallsign_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.radiocallsign
    ADD CONSTRAINT radiocallsign_pkey PRIMARY KEY (id);


--
-- TOC entry 3255 (class 2606 OID 16432)
-- Name: storagelocations_contains_materials slcm_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.storagelocations_contains_materials
    ADD CONSTRAINT slcm_pkey PRIMARY KEY (fk_storagelocation, fk_material);


--
-- TOC entry 3253 (class 2606 OID 16422)
-- Name: storagelocation storagelocation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.storagelocation
    ADD CONSTRAINT storagelocation_pkey PRIMARY KEY (id);


--
-- TOC entry 3251 (class 2606 OID 16411)
-- Name: vehicle vehicle_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vehicle
    ADD CONSTRAINT vehicle_pkey PRIMARY KEY (id);


--
-- TOC entry 3274 (class 2606 OID 16477)
-- Name: contentpages_for_materials cpm_fk_contentpage; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contentpages_for_materials
    ADD CONSTRAINT cpm_fk_contentpage FOREIGN KEY (fk_contentpage) REFERENCES public.contentpage(id);


--
-- TOC entry 3275 (class 2606 OID 16472)
-- Name: contentpages_for_materials cpm_fk_material; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contentpages_for_materials
    ADD CONSTRAINT cpm_fk_material FOREIGN KEY (fk_material) REFERENCES public.material(id);


--
-- TOC entry 3278 (class 2606 OID 16513)
-- Name: images_for_contentpages icp_fk_contentpage; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.images_for_contentpages
    ADD CONSTRAINT icp_fk_contentpage FOREIGN KEY (fk_contentpage) REFERENCES public.contentpage(id);


--
-- TOC entry 3279 (class 2606 OID 16508)
-- Name: images_for_contentpages icp_fk_image; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.images_for_contentpages
    ADD CONSTRAINT icp_fk_image FOREIGN KEY (fk_image) REFERENCES public.image(id);


--
-- TOC entry 3280 (class 2606 OID 16523)
-- Name: images_for_materials ifm_fk_image; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.images_for_materials
    ADD CONSTRAINT ifm_fk_image FOREIGN KEY (fk_image) REFERENCES public.image(id);


--
-- TOC entry 3276 (class 2606 OID 16493)
-- Name: images_for_vehicles ifv_fk_image; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.images_for_vehicles
    ADD CONSTRAINT ifv_fk_image FOREIGN KEY (fk_image) REFERENCES public.image(id);


--
-- TOC entry 3277 (class 2606 OID 16498)
-- Name: images_for_vehicles ifv_fk_vehicle; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.images_for_vehicles
    ADD CONSTRAINT ifv_fk_vehicle FOREIGN KEY (fk_vehicle) REFERENCES public.vehicle(id);


--
-- TOC entry 3281 (class 2606 OID 16528)
-- Name: images_for_materials imf_fk_material; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.images_for_materials
    ADD CONSTRAINT imf_fk_material FOREIGN KEY (fk_material) REFERENCES public.material(id);


--
-- TOC entry 3272 (class 2606 OID 16446)
-- Name: storagelocations_contains_materials slcm_fk_material; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.storagelocations_contains_materials
    ADD CONSTRAINT slcm_fk_material FOREIGN KEY (fk_material) REFERENCES public.material(id) NOT VALID;


--
-- TOC entry 3273 (class 2606 OID 16441)
-- Name: storagelocations_contains_materials slcm_fk_storagelocation; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.storagelocations_contains_materials
    ADD CONSTRAINT slcm_fk_storagelocation FOREIGN KEY (fk_storagelocation) REFERENCES public.storagelocation(id) NOT VALID;


--
-- TOC entry 3271 (class 2606 OID 16423)
-- Name: storagelocation storagelocation_fkey_vehicle; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.storagelocation
    ADD CONSTRAINT storagelocation_fkey_vehicle FOREIGN KEY (fk_vehicle) REFERENCES public.vehicle(id) NOT VALID;


--
-- TOC entry 3270 (class 2606 OID 16412)
-- Name: vehicle vehicle_fkey_radiocallsign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vehicle
    ADD CONSTRAINT vehicle_fkey_radiocallsign FOREIGN KEY (fk_radio_call_sign) REFERENCES public.radiocallsign(id) NOT VALID;


-- Completed on 2024-02-05 16:17:51 UTC

--
-- PostgreSQL database dump complete
--
