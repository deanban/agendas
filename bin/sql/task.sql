CREATE TABLE project (
  id                              SERIAL PRIMARY KEY,
  body                            TEXT,
  description                     TEXT,
  done                            BOOLEAN NOT NULL DEFAULT 'f',
  "accountId"                     INTEGER,
  "createdAt"                     TIMESTAMPTZ DEFAULT Now(),
  "doneAt"                        TIME with time zone,
  FOREIGN KEY ("accountId")       REFERENCES account(id),
);
