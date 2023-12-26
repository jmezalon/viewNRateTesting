\echo 'Delete and recreate rate_my_setup_advance db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE rate_my_setup_advance;
CREATE DATABASE rate_my_setup_advance;
\connect rate_my_setup_advance

\i rate-my-setup-advance-schema.sql
\i rate-my-setup-advance-seed.sql

\echo 'Delete and recreate rate_my_setup_advance_test db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE rate_my_setup_advance_test;
CREATE DATABASE rate_my_setup_advance_test;
\connect rate_my_setup_advance_test

\i rate-my-setup-advance-schema.sql
\i rate-my-setup-advance-seed.sql