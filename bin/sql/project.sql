CREATE TABLE project (
  id                              SERIAL PRIMARY KEY,
  body                            TEXT,
  "accountId"                     INTEGER,
  done                            BOOLEAN NOT NULL DEFAULT 'f',
  "createdAt"                     TIME with time zone,
  "doneAt"                        TIME with time zone,
  FOREIGN KEY ("accountId")       REFERENCES account(id),
);
