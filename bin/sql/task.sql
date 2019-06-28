CREATE TABLE task (
  id                              SERIAL PRIMARY KEY,
  body                            TEXT,
  about                           TEXT,
  done                            BOOLEAN NOT NULL DEFAULT 'f',
  "accountId"                     INTEGER,
  "projectId"                     INTEGER,
  "personalId"                    INTEGER,
  "createdAt"                     TIMESTAMPTZ DEFAULT Now(),
  "doneAt"                        TIME with time zone,
  FOREIGN KEY ("accountId")       REFERENCES account(id),
  FOREIGN KEY ("projectId")       REFERENCES project(id),
  FOREIGN KEY ("personalId")      REFERENCES personal(id),
);
