DROP DATABASE mlb;
CREATE DATABASE mlb;
\connect mlb

\i mlb-schema.pgsql
\i mlb-seed.pgsql
