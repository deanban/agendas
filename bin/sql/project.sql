CREATE TABLE project (
  id                              SERIAL PRIMARY KEY,
  title                           TEXT NOT NULL,
  body                            TEXT,
  done                            BOOLEAN NOT NULL DEFAULT 'f',
  "inProgress"                    BOOLEAN NOT NULL DEFAULT 't',
  "accountId"                     INTEGER NOT NULL,
  "createdAt"                     TIMESTAMPTZ DEFAULT Now(),
  "doneAt"                        TIME with time zone,
  FOREIGN KEY ("accountId")       REFERENCES account(id)
);
