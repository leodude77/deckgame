#! /bin/bash
git add .
timestamp=$(date +%s)
git commit -m "$timestamp"
git push origin dev