CREATE TABLE note (
  id                              SERIAL PRIMARY KEY,
  title                           TEXT NOT NULL,
  body                            TEXT,
  "accountId"                     INTEGER NOT NULL,
  "projectId"                     INTEGER,
  "personalId"                    INTEGER,
  "taskId"                        INTEGER,
  "createdAt"                     TIMESTAMPTZ DEFAULT Now(),
  "doneAt"                        TIME with time zone,
  FOREIGN KEY ("accountId")       REFERENCES account(id),
  FOREIGN KEY ("projectId")       REFERENCES project(id),
  FOREIGN KEY ("personalId")      REFERENCES personal(id),
  FOREIGN KEY ("taskId")          REFERENCES task(id)
);
