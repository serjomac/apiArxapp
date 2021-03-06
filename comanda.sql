PGDMP     4    %                w            ecomanda #   10.9 (Ubuntu 10.9-0ubuntu0.18.04.1) #   10.9 (Ubuntu 10.9-0ubuntu0.18.04.1) 9    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            �           1262    32846    ecomanda    DATABASE     z   CREATE DATABASE ecomanda WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'es_EC.UTF-8' LC_CTYPE = 'es_EC.UTF-8';
    DROP DATABASE ecomanda;
             postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                        3079    13081    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false            �           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            �            1259    32888    plu_x_comanda    TABLE     �   CREATE TABLE public.plu_x_comanda (
    id integer NOT NULL,
    comanda_id integer,
    cantidad_plu integer,
    plu_id integer,
    detalle_plu character varying,
    px_estado "char"
);
 !   DROP TABLE public.plu_x_comanda;
       public         postgres    false    3            �            1259    32891    cantidad_x_comanda_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cantidad_x_comanda_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.cantidad_x_comanda_id_seq;
       public       postgres    false    204    3            �           0    0    cantidad_x_comanda_id_seq    SEQUENCE OWNED BY     R   ALTER SEQUENCE public.cantidad_x_comanda_id_seq OWNED BY public.plu_x_comanda.id;
            public       postgres    false    205            �            1259    32899    clientes    TABLE     �   CREATE TABLE public.clientes (
    id integer NOT NULL,
    nombre character varying,
    direccion character varying,
    telefono character varying,
    correo character varying,
    cedula character varying
);
    DROP TABLE public.clientes;
       public         postgres    false    3            �            1259    32897    clientes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.clientes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.clientes_id_seq;
       public       postgres    false    3    207            �           0    0    clientes_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.clientes_id_seq OWNED BY public.clientes.id;
            public       postgres    false    206            �            1259    32871    comanda    TABLE     f   CREATE TABLE public.comanda (
    id integer NOT NULL,
    mesa_id_mesa integer,
    estado "char"
);
    DROP TABLE public.comanda;
       public         postgres    false    3            �            1259    32869    comanda_id_seq    SEQUENCE     �   CREATE SEQUENCE public.comanda_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.comanda_id_seq;
       public       postgres    false    3    201            �           0    0    comanda_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.comanda_id_seq OWNED BY public.comanda.id;
            public       postgres    false    200            �            1259    32860    mesa    TABLE     �   CREATE TABLE public.mesa (
    id integer NOT NULL,
    mesero integer,
    ocupantes character varying,
    numero_mesa integer,
    estado "char"
);
    DROP TABLE public.mesa;
       public         postgres    false    3            �            1259    32858    mesa_id_seq    SEQUENCE     �   CREATE SEQUENCE public.mesa_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.mesa_id_seq;
       public       postgres    false    3    199            �           0    0    mesa_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.mesa_id_seq OWNED BY public.mesa.id;
            public       postgres    false    198            �            1259    32910    pedido    TABLE     �   CREATE TABLE public.pedido (
    id integer NOT NULL,
    plu_id integer,
    cliente_id integer,
    "estadoPedido" "char",
    comanda_id_comanda integer
);
    DROP TABLE public.pedido;
       public         postgres    false    3            �            1259    32908    pedido_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pedido_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.pedido_id_seq;
       public       postgres    false    3    209            �           0    0    pedido_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.pedido_id_seq OWNED BY public.pedido.id;
            public       postgres    false    208            �            1259    32879    plu    TABLE     �   CREATE TABLE public.plu (
    id integer NOT NULL,
    descripcion character varying,
    estado "char",
    nombre character varying,
    foto character varying,
    precio double precision
);
    DROP TABLE public.plu;
       public         postgres    false    3            �            1259    32877 
   plu_id_seq    SEQUENCE     �   CREATE SEQUENCE public.plu_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE public.plu_id_seq;
       public       postgres    false    203    3            �           0    0 
   plu_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE public.plu_id_seq OWNED BY public.plu.id;
            public       postgres    false    202            �            1259    32849    user    TABLE     x   CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying,
    password character varying
);
    DROP TABLE public."user";
       public         postgres    false    3            �            1259    32847    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public       postgres    false    3    197            �           0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
            public       postgres    false    196            8           2604    32902    clientes id    DEFAULT     j   ALTER TABLE ONLY public.clientes ALTER COLUMN id SET DEFAULT nextval('public.clientes_id_seq'::regclass);
 :   ALTER TABLE public.clientes ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    206    207    207            5           2604    32874 
   comanda id    DEFAULT     h   ALTER TABLE ONLY public.comanda ALTER COLUMN id SET DEFAULT nextval('public.comanda_id_seq'::regclass);
 9   ALTER TABLE public.comanda ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    200    201    201            4           2604    32863    mesa id    DEFAULT     b   ALTER TABLE ONLY public.mesa ALTER COLUMN id SET DEFAULT nextval('public.mesa_id_seq'::regclass);
 6   ALTER TABLE public.mesa ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    199    198    199            9           2604    32913 	   pedido id    DEFAULT     f   ALTER TABLE ONLY public.pedido ALTER COLUMN id SET DEFAULT nextval('public.pedido_id_seq'::regclass);
 8   ALTER TABLE public.pedido ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    209    208    209            6           2604    32882    plu id    DEFAULT     `   ALTER TABLE ONLY public.plu ALTER COLUMN id SET DEFAULT nextval('public.plu_id_seq'::regclass);
 5   ALTER TABLE public.plu ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    203    202    203            7           2604    32893    plu_x_comanda id    DEFAULT     y   ALTER TABLE ONLY public.plu_x_comanda ALTER COLUMN id SET DEFAULT nextval('public.cantidad_x_comanda_id_seq'::regclass);
 ?   ALTER TABLE public.plu_x_comanda ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    205    204            3           2604    32852    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    197    196    197            �          0    32899    clientes 
   TABLE DATA               S   COPY public.clientes (id, nombre, direccion, telefono, correo, cedula) FROM stdin;
    public       postgres    false    207   �8       �          0    32871    comanda 
   TABLE DATA               ;   COPY public.comanda (id, mesa_id_mesa, estado) FROM stdin;
    public       postgres    false    201   v:       �          0    32860    mesa 
   TABLE DATA               J   COPY public.mesa (id, mesero, ocupantes, numero_mesa, estado) FROM stdin;
    public       postgres    false    199   �:       �          0    32910    pedido 
   TABLE DATA               \   COPY public.pedido (id, plu_id, cliente_id, "estadoPedido", comanda_id_comanda) FROM stdin;
    public       postgres    false    209   �:       �          0    32879    plu 
   TABLE DATA               L   COPY public.plu (id, descripcion, estado, nombre, foto, precio) FROM stdin;
    public       postgres    false    203   �<       �          0    32888    plu_x_comanda 
   TABLE DATA               e   COPY public.plu_x_comanda (id, comanda_id, cantidad_plu, plu_id, detalle_plu, px_estado) FROM stdin;
    public       postgres    false    204   C=       �          0    32849    user 
   TABLE DATA               8   COPY public."user" (id, username, password) FROM stdin;
    public       postgres    false    197   `=       �           0    0    cantidad_x_comanda_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.cantidad_x_comanda_id_seq', 224, true);
            public       postgres    false    205            �           0    0    clientes_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.clientes_id_seq', 21, true);
            public       postgres    false    206            �           0    0    comanda_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.comanda_id_seq', 139, true);
            public       postgres    false    200            �           0    0    mesa_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.mesa_id_seq', 3, true);
            public       postgres    false    198            �           0    0    pedido_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.pedido_id_seq', 180, true);
            public       postgres    false    208            �           0    0 
   plu_id_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('public.plu_id_seq', 5, true);
            public       postgres    false    202            �           0    0    user_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.user_id_seq', 1, true);
            public       postgres    false    196            E           2606    32904    clientes cliente_pk 
   CONSTRAINT     Q   ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT cliente_pk PRIMARY KEY (id);
 =   ALTER TABLE ONLY public.clientes DROP CONSTRAINT cliente_pk;
       public         postgres    false    207            ?           2606    32876    comanda comanda_pk 
   CONSTRAINT     P   ALTER TABLE ONLY public.comanda
    ADD CONSTRAINT comanda_pk PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.comanda DROP CONSTRAINT comanda_pk;
       public         postgres    false    201            =           2606    32865    mesa masa_pk 
   CONSTRAINT     J   ALTER TABLE ONLY public.mesa
    ADD CONSTRAINT masa_pk PRIMARY KEY (id);
 6   ALTER TABLE ONLY public.mesa DROP CONSTRAINT masa_pk;
       public         postgres    false    199            G           2606    32915    pedido pedido_pk 
   CONSTRAINT     N   ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT pedido_pk PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.pedido DROP CONSTRAINT pedido_pk;
       public         postgres    false    209            C           2606    32923    plu_x_comanda pk_plu_comanda 
   CONSTRAINT     Z   ALTER TABLE ONLY public.plu_x_comanda
    ADD CONSTRAINT pk_plu_comanda PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.plu_x_comanda DROP CONSTRAINT pk_plu_comanda;
       public         postgres    false    204            A           2606    32884 
   plu plu_pk 
   CONSTRAINT     H   ALTER TABLE ONLY public.plu
    ADD CONSTRAINT plu_pk PRIMARY KEY (id);
 4   ALTER TABLE ONLY public.plu DROP CONSTRAINT plu_pk;
       public         postgres    false    203            ;           2606    32854    user user_pk 
   CONSTRAINT     L   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pk PRIMARY KEY (id);
 8   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pk;
       public         postgres    false    197            �   �  x�}��n�0����D�8���mՂ�R{��zlW�6��NJ�o�g�Řdh�@�g�����O�%���4��s�񘪛�Ø��F��j���h������up ;�Zkۢ�������at���v]T|!�'a�R\��K�O�oR�5�������ܠ�ݶ�� ���4��Dk�(�a�Wn:�L�f���0l��rN�Ec�R�E�-�)U��CR��)���b#رh��YU��?0��t�P
�p�N����_oi�j..m3Q�B�?��vi�F�һΰ?��_6�ٶ�-� ~KRC�#�P��ܭ����!��H�נ��p)gW��9��R
l�,Gx�A�%��s�mnly�6�p�9urj]+%j!�o���      �      x������ � �      �   '   x�3�4�4�42�4�bNcN��4�4R\1z\\\ ]�      �   �  x�U�A�� D��b� *�&z=����GM��x ��������.;�r�s��{����U�y��
�B��(�֊�v�-���I$5�S����nX��s� :�`
��`
��`*p�c۽�6PB`�Ppl|`㣂�hx���̳�k���Ȉ
�U��l9قl�n!-C�s��AZi5��h�#'
��̮"x��bFc��Ε�#~�*�+&��*�R��Q�V�A�r ��M�%�ή��&�"(*�yN�q=�6T�aJ�Q5j��×B�`�?�пK�%�����.���VŇ������z�6UA*�>�~ɞo㥷a/U�F�DA4�ڔ��xȟq�RK��&�Is~�`�'8v�Y\F��Y���&�yM�hu�%�݇�\�c$��M-vhj�Cӳ)S�ˇ���*�e'�T;��}��R�S�A&��-9�D���eH�q�Oc���[��njGY~�O���[��r�Ya�Oܸ�~�����g�      �   n   x�3����ļ���|��T�����Ĕ|��T�k^rjR~NPS�1TQ@bAb�B�BN�BrbUijN"T�	ܔ�"�!�%�yP�P>��E�
�9
e��EP�=... M1�      �      x������ � �      �      x�3�,I-.�4426����� %��     