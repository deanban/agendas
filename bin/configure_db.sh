#!/bin/bash
echo "Dropping AGENDAS"
dropdb -U node_user agendas
echo "Creating AGENDAS"
createdb -U node_user agendas

echo "Assigning People: Running account.sql"
psql -U node_user agendas < ./bin/sql/account.sql
echo "Creating Projects: Running project.sql"
psql -U node_user agendas < ./bin/sql/project.sql
echo "Creating Categories: Running category.sql"
psql -U node_user agendas < ./bin/sql/category.sql
echo "Creating Personals: Running personal.sql"
psql -U node_user agendas < ./bin/sql/personal.sql
echo "Creating Tasks: Running task.sql"
psql -U node_user agendas < ./bin/sql/task.sql
echo "Creating Notes: Running note.sql"
psql -U node_user agendas < ./bin/sql/note.sql

# echo "Seeding AGENDAS With Some Data"
# node ./bin/seed.js
# node ./bin/seed2.js
# node ./bin/seed3.js
# node ./bin/seed4.js

echo "AGENDAS Database Created. Good Luck!"
