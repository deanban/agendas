CREATE TABLE task (
  id                              SERIAL PRIMARY KEY,
  title                           TEXT NOT NULL,
  body                            TEXT,
  done                            BOOLEAN NOT NULL DEFAULT 'f',
  "inProgress"                    BOOLEAN NOT NULL DEFAULT 't',
  "accountId"                     INTEGER NOT NULL,
  "projectId"                     INTEGER,
  "personalId"                    INTEGER,
  "createdAt"                     TIMESTAMPTZ DEFAULT Now(),
  "doneAt"                        TIME with time zone,
  FOREIGN KEY ("accountId")       REFERENCES account(id),
  FOREIGN KEY ("projectId")       REFERENCES project(id),
  FOREIGN KEY ("personalId")      REFERENCES personal(id)
);
