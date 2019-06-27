#!/bin/bash
echo "Dropping QUOVERFLOW"
dropdb -U node_user quoverflow
echo "Creating QUOVERFLOW"
createdb -U node_user agendas

echo "Assigning People: Running account.sql"
psql -U node_user quoverflow < ./bin/sql/account.sql
echo "Creating Projects: Running project.sql"
psql -U node_user quoverflow < ./bin/sql/project.sql
echo "Creating Personals: Running personal.sql"
psql -U node_user quoverflow < ./bin/sql/personal.sql
echo "Creating Tasks: Running task.sql"
psql -U node_user quoverflow < ./bin/sql/task.sql
echo "Creating Notes: Running note.sql"
psql -U node_user quoverflow < ./bin/sql/note.sql

# echo "Seeding QUOVERFLOW With Some Data"
# node ./bin/seed.js
# node ./bin/seed2.js
# node ./bin/seed3.js
# node ./bin/seed4.js

echo "AGENDAS Database Created. Good Luck!"
