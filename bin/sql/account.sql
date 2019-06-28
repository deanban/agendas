CREATE TABLE account (
  id            SERIAL PRIMARY KEY,
  "firstName"   TEXT NOT NULL,
  "lastName"    TEXT,
  email         TEXT NOT NULL,
  password      CHARACTER(72) NOT NULL,
  "createdAt"   TIMESTAMPTZ DEFAULT Now()
);
