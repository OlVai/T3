--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0 (Debian 16.0-1.pgdg120+1)
-- Dumped by pg_dump version 16.0 (Debian 16.0-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Kytkimet; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Kytkimet" (
    id integer NOT NULL,
    ip text,
    device text,
    address text
);


ALTER TABLE public."Kytkimet" OWNER TO admin;

--
-- Name: Kytkimet_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Kytkimet_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Kytkimet_id_seq" OWNER TO admin;

--
-- Name: Kytkimet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Kytkimet_id_seq" OWNED BY public."Kytkimet".id;


--
-- Name: NAS; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."NAS" (
    id integer NOT NULL,
    ip text,
    device text,
    address text
);


ALTER TABLE public."NAS" OWNER TO admin;

--
-- Name: NAS_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."NAS_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."NAS_id_seq" OWNER TO admin;

--
-- Name: NAS_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."NAS_id_seq" OWNED BY public."NAS".id;


--
-- Name: Proxmox; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Proxmox" (
    id integer NOT NULL,
    ip text,
    volume_group text
);


ALTER TABLE public."Proxmox" OWNER TO admin;

--
-- Name: Proxmox_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Proxmox_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Proxmox_id_seq" OWNER TO admin;

--
-- Name: Proxmox_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Proxmox_id_seq" OWNED BY public."Proxmox".id;


--
-- Name: Reitittimet; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Reitittimet" (
    id integer NOT NULL,
    ip text,
    device text,
    address text
);


ALTER TABLE public."Reitittimet" OWNER TO admin;

--
-- Name: Reitittimet_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Reitittimet_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Reitittimet_id_seq" OWNER TO admin;

--
-- Name: Reitittimet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Reitittimet_id_seq" OWNED BY public."Reitittimet".id;


--
-- Name: Seurantapalvelut; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Seurantapalvelut" (
    id integer NOT NULL,
    name text,
    address text,
    info text
);


ALTER TABLE public."Seurantapalvelut" OWNER TO admin;

--
-- Name: Seurantapalvelut_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Seurantapalvelut_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Seurantapalvelut_id_seq" OWNER TO admin;

--
-- Name: Seurantapalvelut_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Seurantapalvelut_id_seq" OWNED BY public."Seurantapalvelut".id;


--
-- Name: WLAN; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."WLAN" (
    id integer NOT NULL,
    ip text,
    device text,
    address text,
    ssid1 text,
    ssid2 text,
    ssid3 text
);


ALTER TABLE public."WLAN" OWNER TO admin;

--
-- Name: WLAN_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."WLAN_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."WLAN_id_seq" OWNER TO admin;

--
-- Name: WLAN_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."WLAN_id_seq" OWNED BY public."WLAN".id;


--
-- Name: ePDU; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."ePDU" (
    id integer NOT NULL,
    ip text,
    device text,
    address text
);


ALTER TABLE public."ePDU" OWNER TO admin;

--
-- Name: ePDU(s)_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."ePDU(s)_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ePDU(s)_id_seq" OWNER TO admin;

--
-- Name: ePDU(s)_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."ePDU(s)_id_seq" OWNED BY public."ePDU".id;


--
-- Name: Kytkimet id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Kytkimet" ALTER COLUMN id SET DEFAULT nextval('public."Kytkimet_id_seq"'::regclass);


--
-- Name: NAS id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."NAS" ALTER COLUMN id SET DEFAULT nextval('public."NAS_id_seq"'::regclass);


--
-- Name: Proxmox id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Proxmox" ALTER COLUMN id SET DEFAULT nextval('public."Proxmox_id_seq"'::regclass);


--
-- Name: Reitittimet id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Reitittimet" ALTER COLUMN id SET DEFAULT nextval('public."Reitittimet_id_seq"'::regclass);


--
-- Name: Seurantapalvelut id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Seurantapalvelut" ALTER COLUMN id SET DEFAULT nextval('public."Seurantapalvelut_id_seq"'::regclass);


--
-- Name: WLAN id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."WLAN" ALTER COLUMN id SET DEFAULT nextval('public."WLAN_id_seq"'::regclass);


--
-- Name: ePDU id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."ePDU" ALTER COLUMN id SET DEFAULT nextval('public."ePDU(s)_id_seq"'::regclass);


--
-- Data for Name: Kytkimet; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Kytkimet" (ip, device, address) FROM stdin (DELIMITER '|');
10.0.0.2|Aruba Aruba-2930F-48G-PoEP-4SFPP|http://10.0.0.2/
10.0.0.3|ubiguiti EdgeSwitch|https://10.0.0.3
10.0.0.4|D-Link DXS-1210-10|http://10.0.0.4/
10.0.0.5|D-Link DGS-1510-28X|http://10.0.0.5/
10.0.0.6|HP Officeconnect 1820 j9982A|http://10.0.0.6/
10.0.0.7|HP 2530-24G Switch (J9776A)|http://10.0.0.7
10.0.0.8|fs.com S5860-20SQ|https://10.0.0.8/main.htm
10.0.0.10|fs S3910-24TS|https://10.0.0.10/main.htm
10.0.0.11||
10.0.0.14|fs.com S3910-24TS|https://10.0.0.14/main.htm
\.


--
-- Data for Name: NAS; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."NAS" (ip, device, address) FROM stdin (DELIMITER '|');
10.0.0.100|QNAP|https://10.0.0.100
\.


--
-- Data for Name: Proxmox; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Proxmox" (ip, volume_group) FROM stdin (DELIMITER '|');
10.0.1.10|proxmox
10.0.1.11|pve2
10.0.1.12|pve3
10.0.1.13|pve4
10.0.1.14|pve5
10.0.1.15|pve6
10.0.1.16|pve7
10.0.1.17|pve8
10.0.1.18|pvedellR710
10.0.1.22|pvedellR720
10.0.1.24|dell3
\.


--
-- Data for Name: Reitittimet; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Reitittimet" (ip, device, address) FROM stdin (DELIMITER '|');
10.0.0.1|fs.com SF-5105|https://10.0.0.1
\.


--
-- Data for Name: Seurantapalvelut; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Seurantapalvelut" (name, address, info) FROM stdin (DELIMITER '|');
Observium|http://10.0.1.50:8668|(observium:observium)
\.


--
-- Data for Name: WLAN; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."WLAN" (ip, device, address, ssid1) FROM stdin (DELIMITER '|');
10.0.0.150|Aruba IAP 103|https://10.0.0.150:4343/#home|lanlabra
\.


--
-- Data for Name: ePDU; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."ePDU" (ip, device, address) FROM stdin (DELIMITER '|');
10.0.0.129|ePDU|http://labrapdu.labra.local
\.


--
-- Name: Kytkimet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Kytkimet_id_seq"', 1, true);


--
-- Name: NAS_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."NAS_id_seq"', 1, true);


--
-- Name: Proxmox_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Proxmox_id_seq"', 1, true);


--
-- Name: Reitittimet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Reitittimet_id_seq"', 1, true);


--
-- Name: Seurantapalvelut_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Seurantapalvelut_id_seq"', 1, true);


--
-- Name: WLAN_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."WLAN_id_seq"', 1, true);


--
-- Name: ePDU(s)_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."ePDU(s)_id_seq"', 1, true);


--
-- Name: Kytkimet Kytkimet_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Kytkimet"
    ADD CONSTRAINT "Kytkimet_pkey" PRIMARY KEY (id);


--
-- Name: NAS NAS_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."NAS"
    ADD CONSTRAINT "NAS_pkey" PRIMARY KEY (id);


--
-- Name: Proxmox Proxmox_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Proxmox"
    ADD CONSTRAINT "Proxmox_pkey" PRIMARY KEY (id);


--
-- Name: Reitittimet Reitittimet_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Reitittimet"
    ADD CONSTRAINT "Reitittimet_pkey" PRIMARY KEY (id);


--
-- Name: Seurantapalvelut Seurantapalvelut_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Seurantapalvelut"
    ADD CONSTRAINT "Seurantapalvelut_pkey" PRIMARY KEY (id);


--
-- Name: WLAN WLAN_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."WLAN"
    ADD CONSTRAINT "WLAN_pkey" PRIMARY KEY (id);


--
-- Name: ePDU ePDU(s)_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."ePDU"
    ADD CONSTRAINT "ePDU(s)_pkey" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

