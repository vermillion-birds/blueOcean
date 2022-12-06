PGDMP         4                z         
   blue_ocean #   14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)    15.0 C    I           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            J           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            K           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            L           1262    16436 
   blue_ocean    DATABASE     r   CREATE DATABASE blue_ocean WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C.UTF-8';
    DROP DATABASE blue_ocean;
                postgres    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            M           0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    4            �            1259    16437    friendships    TABLE     �   CREATE TABLE public.friendships (
    friendship_id integer NOT NULL,
    logged_in_user_id integer NOT NULL,
    friend_user_id integer NOT NULL
);
    DROP TABLE public.friendships;
       public         heap    postgres    false    4            �            1259    16440    Friendships_friendship_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Friendships_friendship_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public."Friendships_friendship_id_seq";
       public          postgres    false    4    209            N           0    0    Friendships_friendship_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public."Friendships_friendship_id_seq" OWNED BY public.friendships.friendship_id;
          public          postgres    false    210            �            1259    16441    bird_photos    TABLE     �  CREATE TABLE public.bird_photos (
    photo_id integer NOT NULL,
    photo_url text DEFAULT 'https://uxwing.com/wp-content/themes/uxwing/download/animals-and-birds/pigeon-bird-icon.png'::text NOT NULL,
    user_id integer NOT NULL,
    bird_id integer NOT NULL,
    location_lat double precision,
    location_lon double precision,
    date timestamp with time zone DEFAULT CURRENT_DATE NOT NULL
);
    DROP TABLE public.bird_photos;
       public         heap    postgres    false    4            �            1259    16446    bird_photos_photo_id_seq    SEQUENCE     �   CREATE SEQUENCE public.bird_photos_photo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.bird_photos_photo_id_seq;
       public          postgres    false    4    211            O           0    0    bird_photos_photo_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.bird_photos_photo_id_seq OWNED BY public.bird_photos.photo_id;
          public          postgres    false    212            �            1259    16447 	   bird_user    TABLE       CREATE TABLE public.bird_user (
    b_u_id integer NOT NULL,
    bird_id integer NOT NULL,
    user_id integer NOT NULL,
    note text,
    first_seen date DEFAULT CURRENT_DATE NOT NULL,
    last_seen date DEFAULT CURRENT_DATE NOT NULL,
    count integer DEFAULT 1 NOT NULL
);
    DROP TABLE public.bird_user;
       public         heap    postgres    false    4            �            1259    16452    bird_user_b_u_id_seq    SEQUENCE     �   CREATE SEQUENCE public.bird_user_b_u_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.bird_user_b_u_id_seq;
       public          postgres    false    213    4            P           0    0    bird_user_b_u_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.bird_user_b_u_id_seq OWNED BY public.bird_user.b_u_id;
          public          postgres    false    214            �            1259    16453    birds    TABLE     �   CREATE TABLE public.birds (
    bird_id integer NOT NULL,
    bird_common_name text NOT NULL,
    scentific_name text,
    summary text
);
    DROP TABLE public.birds;
       public         heap    postgres    false    4            �            1259    16458    birds_bird_id_seq    SEQUENCE     �   CREATE SEQUENCE public.birds_bird_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.birds_bird_id_seq;
       public          postgres    false    215    4            Q           0    0    birds_bird_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.birds_bird_id_seq OWNED BY public.birds.bird_id;
          public          postgres    false    216            �            1259    16459    conversations    TABLE     b   CREATE TABLE public.conversations (
    conv_id integer NOT NULL,
    users_hash text NOT NULL
);
 !   DROP TABLE public.conversations;
       public         heap    postgres    false    4            �            1259    16462    conversations_conv_id_seq    SEQUENCE     �   CREATE SEQUENCE public.conversations_conv_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.conversations_conv_id_seq;
       public          postgres    false    217    4            R           0    0    conversations_conv_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.conversations_conv_id_seq OWNED BY public.conversations.conv_id;
          public          postgres    false    218            �            1259    16463    messages    TABLE     �   CREATE TABLE public.messages (
    message_id integer NOT NULL,
    message text NOT NULL,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    sender_id integer NOT NULL,
    conversation_id integer NOT NULL
);
    DROP TABLE public.messages;
       public         heap    postgres    false    4            �            1259    16468    message_message_id_seq    SEQUENCE     �   CREATE SEQUENCE public.message_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.message_message_id_seq;
       public          postgres    false    4    219            S           0    0    message_message_id_seq    SEQUENCE OWNED BY     R   ALTER SEQUENCE public.message_message_id_seq OWNED BY public.messages.message_id;
          public          postgres    false    220            �            1259    16469    users    TABLE     R  CREATE TABLE public.users (
    user_id integer NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    profile_url text DEFAULT 'https://uxwing.com/wp-content/themes/uxwing/download/animals-and-birds/pigeon-bird-icon.png'::text NOT NULL,
    user_location integer
);
    DROP TABLE public.users;
       public         heap    postgres    false    4            �            1259    16474    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          postgres    false    4    221            T           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public          postgres    false    222            �           2604    16475    bird_photos photo_id    DEFAULT     |   ALTER TABLE ONLY public.bird_photos ALTER COLUMN photo_id SET DEFAULT nextval('public.bird_photos_photo_id_seq'::regclass);
 C   ALTER TABLE public.bird_photos ALTER COLUMN photo_id DROP DEFAULT;
       public          postgres    false    212    211            �           2604    16476    bird_user b_u_id    DEFAULT     t   ALTER TABLE ONLY public.bird_user ALTER COLUMN b_u_id SET DEFAULT nextval('public.bird_user_b_u_id_seq'::regclass);
 ?   ALTER TABLE public.bird_user ALTER COLUMN b_u_id DROP DEFAULT;
       public          postgres    false    214    213            �           2604    16477    birds bird_id    DEFAULT     n   ALTER TABLE ONLY public.birds ALTER COLUMN bird_id SET DEFAULT nextval('public.birds_bird_id_seq'::regclass);
 <   ALTER TABLE public.birds ALTER COLUMN bird_id DROP DEFAULT;
       public          postgres    false    216    215            �           2604    16478    conversations conv_id    DEFAULT     ~   ALTER TABLE ONLY public.conversations ALTER COLUMN conv_id SET DEFAULT nextval('public.conversations_conv_id_seq'::regclass);
 D   ALTER TABLE public.conversations ALTER COLUMN conv_id DROP DEFAULT;
       public          postgres    false    218    217            �           2604    16479    friendships friendship_id    DEFAULT     �   ALTER TABLE ONLY public.friendships ALTER COLUMN friendship_id SET DEFAULT nextval('public."Friendships_friendship_id_seq"'::regclass);
 H   ALTER TABLE public.friendships ALTER COLUMN friendship_id DROP DEFAULT;
       public          postgres    false    210    209            �           2604    16480    messages message_id    DEFAULT     y   ALTER TABLE ONLY public.messages ALTER COLUMN message_id SET DEFAULT nextval('public.message_message_id_seq'::regclass);
 B   ALTER TABLE public.messages ALTER COLUMN message_id DROP DEFAULT;
       public          postgres    false    220    219            �           2604    16481    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    222    221            ;          0    16441    bird_photos 
   TABLE DATA           n   COPY public.bird_photos (photo_id, photo_url, user_id, bird_id, location_lat, location_lon, date) FROM stdin;
    public          postgres    false    211    O       =          0    16447 	   bird_user 
   TABLE DATA           a   COPY public.bird_user (b_u_id, bird_id, user_id, note, first_seen, last_seen, count) FROM stdin;
    public          postgres    false    213   �P       ?          0    16453    birds 
   TABLE DATA           S   COPY public.birds (bird_id, bird_common_name, scentific_name, summary) FROM stdin;
    public          postgres    false    215   6R       A          0    16459    conversations 
   TABLE DATA           <   COPY public.conversations (conv_id, users_hash) FROM stdin;
    public          postgres    false    217   �T       9          0    16437    friendships 
   TABLE DATA           W   COPY public.friendships (friendship_id, logged_in_user_id, friend_user_id) FROM stdin;
    public          postgres    false    209   OU       C          0    16463    messages 
   TABLE DATA           `   COPY public.messages (message_id, message, "timestamp", sender_id, conversation_id) FROM stdin;
    public          postgres    false    219   �U       E          0    16469    users 
   TABLE DATA           l   COPY public.users (user_id, first_name, last_name, username, email, profile_url, user_location) FROM stdin;
    public          postgres    false    221   �Z       U           0    0    Friendships_friendship_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public."Friendships_friendship_id_seq"', 62, true);
          public          postgres    false    210            V           0    0    bird_photos_photo_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.bird_photos_photo_id_seq', 36, true);
          public          postgres    false    212            W           0    0    bird_user_b_u_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.bird_user_b_u_id_seq', 30, true);
          public          postgres    false    214            X           0    0    birds_bird_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.birds_bird_id_seq', 12, true);
          public          postgres    false    216            Y           0    0    conversations_conv_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.conversations_conv_id_seq', 332, true);
          public          postgres    false    218            Z           0    0    message_message_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.message_message_id_seq', 71, true);
          public          postgres    false    220            [           0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 77, true);
          public          postgres    false    222            �           2606    16483    friendships Friendships_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.friendships
    ADD CONSTRAINT "Friendships_pkey" PRIMARY KEY (friendship_id);
 H   ALTER TABLE ONLY public.friendships DROP CONSTRAINT "Friendships_pkey";
       public            postgres    false    209            �           2606    16554    bird_user b_u_one_to_one 
   CONSTRAINT     _   ALTER TABLE ONLY public.bird_user
    ADD CONSTRAINT b_u_one_to_one UNIQUE (bird_id, user_id);
 B   ALTER TABLE ONLY public.bird_user DROP CONSTRAINT b_u_one_to_one;
       public            postgres    false    213    213            �           2606    16485    bird_photos bird_photos_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.bird_photos
    ADD CONSTRAINT bird_photos_pkey PRIMARY KEY (photo_id);
 F   ALTER TABLE ONLY public.bird_photos DROP CONSTRAINT bird_photos_pkey;
       public            postgres    false    211            �           2606    16487    bird_user bird_user_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.bird_user
    ADD CONSTRAINT bird_user_pkey PRIMARY KEY (b_u_id);
 B   ALTER TABLE ONLY public.bird_user DROP CONSTRAINT bird_user_pkey;
       public            postgres    false    213            �           2606    16489    birds birds_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.birds
    ADD CONSTRAINT birds_pkey PRIMARY KEY (bird_id);
 :   ALTER TABLE ONLY public.birds DROP CONSTRAINT birds_pkey;
       public            postgres    false    215            �           2606    16556    birds common_name 
   CONSTRAINT     X   ALTER TABLE ONLY public.birds
    ADD CONSTRAINT common_name UNIQUE (bird_common_name);
 ;   ALTER TABLE ONLY public.birds DROP CONSTRAINT common_name;
       public            postgres    false    215            �           2606    16546    conversations conv_users_hash 
   CONSTRAINT     ^   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conv_users_hash UNIQUE (users_hash);
 G   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conv_users_hash;
       public            postgres    false    217            �           2606    16491     conversations conversations_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_pkey PRIMARY KEY (conv_id);
 J   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_pkey;
       public            postgres    false    217            �           2606    16550    users emails 
   CONSTRAINT     H   ALTER TABLE ONLY public.users
    ADD CONSTRAINT emails UNIQUE (email);
 6   ALTER TABLE ONLY public.users DROP CONSTRAINT emails;
       public            postgres    false    221            �           2606    16493    messages message_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT message_pkey PRIMARY KEY (message_id);
 ?   ALTER TABLE ONLY public.messages DROP CONSTRAINT message_pkey;
       public            postgres    false    219            �           2606    16560    friendships unique_friends 
   CONSTRAINT     r   ALTER TABLE ONLY public.friendships
    ADD CONSTRAINT unique_friends UNIQUE (logged_in_user_id, friend_user_id);
 D   ALTER TABLE ONLY public.friendships DROP CONSTRAINT unique_friends;
       public            postgres    false    209    209            �           2606    16495    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    221            �           2606    16511    bird_photos b_p_birds    FK CONSTRAINT     �   ALTER TABLE ONLY public.bird_photos
    ADD CONSTRAINT b_p_birds FOREIGN KEY (bird_id) REFERENCES public.birds(bird_id) NOT VALID;
 ?   ALTER TABLE ONLY public.bird_photos DROP CONSTRAINT b_p_birds;
       public          postgres    false    3226    211    215            �           2606    16506    bird_photos b_p_users    FK CONSTRAINT     �   ALTER TABLE ONLY public.bird_photos
    ADD CONSTRAINT b_p_users FOREIGN KEY (user_id) REFERENCES public.users(user_id) NOT VALID;
 ?   ALTER TABLE ONLY public.bird_photos DROP CONSTRAINT b_p_users;
       public          postgres    false    221    3238    211            �           2606    16501    bird_user b_u_birds    FK CONSTRAINT     �   ALTER TABLE ONLY public.bird_user
    ADD CONSTRAINT b_u_birds FOREIGN KEY (bird_id) REFERENCES public.birds(bird_id) NOT VALID;
 =   ALTER TABLE ONLY public.bird_user DROP CONSTRAINT b_u_birds;
       public          postgres    false    3226    215    213            �           2606    16496    bird_user b_u_users    FK CONSTRAINT     �   ALTER TABLE ONLY public.bird_user
    ADD CONSTRAINT b_u_users FOREIGN KEY (user_id) REFERENCES public.users(user_id) NOT VALID;
 =   ALTER TABLE ONLY public.bird_user DROP CONSTRAINT b_u_users;
       public          postgres    false    221    213    3238            �           2606    16539    messages covn_ids    FK CONSTRAINT     �   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT covn_ids FOREIGN KEY (conversation_id) REFERENCES public.conversations(conv_id) NOT VALID;
 ;   ALTER TABLE ONLY public.messages DROP CONSTRAINT covn_ids;
       public          postgres    false    219    217    3232            �           2606    16526    friendships friend_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.friendships
    ADD CONSTRAINT friend_user FOREIGN KEY (friend_user_id) REFERENCES public.users(user_id) NOT VALID;
 A   ALTER TABLE ONLY public.friendships DROP CONSTRAINT friend_user;
       public          postgres    false    221    209    3238            �           2606    16521    friendships logged_in_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.friendships
    ADD CONSTRAINT logged_in_user FOREIGN KEY (logged_in_user_id) REFERENCES public.users(user_id) NOT VALID;
 D   ALTER TABLE ONLY public.friendships DROP CONSTRAINT logged_in_user;
       public          postgres    false    221    3238    209            ;   �  x�ŗ�n�0���)v��s�ׇ�x��(�,d�����)�Ӝ,��}i�h!�C�/���{��M�jw��6�8��v�[���e���G[�e�]�ы*������k6�6oDC_]�dZg�-�H �� |�rq�^�̑;��5w���7��f>�r���|�?�Z��.h(̄�"C���{���s;;FGI���)V<�Ӻ��o�\�׽��.^5^Z�x�m=�9S�x�n������ƇW�6����!�]�k~�{�.�u;$�x�n�v����?�����2�%zC��uF9?�+"v�?MĮW7�3�vj�Qj���S�/��4�q������C��l�g[fK����
�ْ@%�`� d� �����V�e��x@H���֧:��JM ���r����S�@��A�=�p���Q��ط�a�3�93�B��D�"���"�k      =   S  x����j�0����>��%��>6�C.=z��i�D������u U
�@�1��fe�PU����Y�swf܃,�̅�eJ�I(ٰ}J��QA� jhDC9�6F(�'Z�':����� 	DP#	DR�Rr�.�T�%�p�	D1��t4�LG�\	ܠ���mBI����G��<��_�h&�V֍�;_4��;%@�պ�^�yw9xt?��t�P��$��li�o�����wX��%�-JP�$���Hͩ�Hm
Q��p�㌾߇�e^�P�R�J<�f0��p2������|�����'�AkNT���<��:N��{k��o�:w"�c�B�Rd�U�e�6��      ?   �  x�mSMo�0=+���H���>��lC�v�aڢc��dPR��׏T2�
Fl=>�=>��.T��xp���ouߔQ��yO�>�r����^�/\J �	u�n�Υf�:p�B�l�W�$�`�"ܧ���)u�/w��{���B���갋ʓB;z�.	#�R��.b&�;<�u9��E��RHy�{�I�ynþsS�Yq>���������Aüw9�>E�VMӵ��4g�*\�c��p�fLᢤ:�5�ۙd��v$���'l֎�� i�oI�	��6�L=�5�����CO��'x�MU =߂5��w�^(?컆!�xj�S,����T�]"�����ůaA�݇��ص;����i1=}��=�� ������K$uc�,*N8T���s�E�N��Z��������dV�=J
�	hf>��4O'�\�M��Ǉih��̺�޼��������''�	�7��Gd��X<� w�a@9�d/tϖ��t�"��
#z����A�76��g�(ic�i��("�d@US���#�w��*V�r�a$􏔮�p��?4�1�w��^5JM�&��J���8��i�SU-�t�0�2�Y`�9C�pQ�5IZ�oK�M1ch@�yTªO��p!-:�ƕĂ�]�ڮV��?�4      A   `   x����0c(đ�#�����l��S����P��A.}_r���@���6t�x��BK�Hs�[�+����4�{&�޹ h5$F�:g�@#�����'      9   �   x�%���0C�V1;�븗�_�
墁�Ije�h4�%����P��+kz���.2�C��%U����&S��х����*��q�	�>�	xRE�\,�*��c�Q��{F~&��SI�{+�$JN��E��5�uH�,{]��O�h%�?n�$�? �42�      C   ~  x�u�M��6��ԯ`�m��K�%H��	���K�^�k�Z]������J�DQ�����p>�d_~����~%�{���8�
�)�S�/R2��:��mw�m�)-�1 �Ӓ�iv����aUI/J��_.1�>��>tl8Be|�K�̤eCwY(��U�WJ	~�Ì�*�(-�LɆ}++ [F ڙ��=ufL�V�r�@���ܚ��L����w��JB�@�)"���>,t�	���<ۇK����VHu3
h�q
3�3\c�Rh�nؗp8�9Hr��nA�~��܅z�0NX�ˎ�%��2��J[a��@���J���?uM}�q�.[�Uǈ{��<b��4��<xt��0s��3(����y_��)�)@��)���d?�b+���Ĉ6�XM�P~�#*�����S�޷�/a賃h+�B-�D=�3��XV�/��%bT�Nxg̲�k�C�VzL�O`�c>��/�D[`��$	5�C���5s�Tf�ꑪ���d���ۮ��X9HnY��J2�v���¯��Pb�6uQ�M��Jf&�z���;��'=*�I-���g^SR�!�}4lM����X	C�����T�7*=`X{9+Rh�z#I�����^ ���r��P�#��qe��#��~':%}&�ibS"�$��PN��)�>\�&�/��I�)W���I1 �w���FOc_�JSי���*�p��ej�,�©m%�P6�mcJ�]H��b�4�Ը�k7�ut�ʕ�4��v��j#�Y3**I��p�+��QRc q�H�5���,�IH�� �� ;���污�S�9gS��~��f�FyR���}��&w &3�2�}i��6���y m2��#�#JK"��X�{���ufܿ`Ta���gFi�����n��8��gJ���������t�~R��Q7/MzԏW}<�.[I�GX9�O��g��.
��=��ﰅ���(�7�l���\,�k���ѕw �AFy3�^ŘY��Z"j���ɶ45�C�H];E�����~�	Us�:;���u���$���c�iG@W.O��C��P�}ʸ4�z�nR���+$E��E���5Nݢǵo�UW�g��#�C�~{�sD�P���~��{�-9c���(�P��_      E     x����r�0���)��ͷ�Ӧ����Sfz�E�(�J8�>}W��ZN�,c���!iW;d{��H���$�b��H[��C��M�h?o��߳T'wi;��F�I�i;ub���ճ�5o�\Ɂ�v�U�y����Q��V���x�èNlإIv��+16��.r�_��8!B���_D���!B("��b�^\CR�/E|
x%�⑐���!��6\���@0D wy�\�pB��./���i�� qvx���K�<eZ���V��fyQ&EƦY�6�����I��A(|lD#_��od/��!"����Ga��W"�8)2���a��/V�Di<�I�����-0�,��N���aa'�)(x%�(����Հg� ��8:W��Dq��p�z'D{��Z#���ެ�R�")�B������A�*U�l���Q�+Ů�fI����H�~���R��u������0y������bX�c�d����,�A�4�ؑ���&a'���*�s�Oa�{�o�eGr�2�<����Ij�A�I��ׅ�J�r��	��Szf�?v�q��_+�b_&U�䓟پϐ��Z{�냄��:�'>X���V,b��0�̗YNݬ�	p8A	�
�-���cMG��NY�)��Wn]�L^b�ȳJO7���z�4�UI���Q�.��s��uu��!��ٳ��;��bM�yR�/����	FFR�l���?�k�Ѓ`�>�wu(���twsJ�J=O]����������f_�X�?]�^����>v�џA0�M���ڿor�V6*����*�j_$?�$�1�5�     