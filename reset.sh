#!/bin/sh

rm *.zip
mv "Exercise 8/node_modules" .
zip -r "Exercise 8" "Exercise 8"
mv node_modules "Exercise 8"
