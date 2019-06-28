CREATE TABLE account (
  id            SERIAL PRIMARY KEY,
  email         TEXT NOT NULL,
  password      CHARACTER(72) NOT NULL,
  "createdAt"   TIMESTAMPTZ DEFAULT Now()
);
