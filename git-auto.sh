#! usr/bin/bash
while getopts u: flag
do
    case "${flag}" in
        u) userid=${OPTARG};;
    esac
done
if [ -z "$userid" ]; then echo "Usage: bash git-auto.sh -u steamuserid "; exit 1; fi
node jstest.js $userid
timestamp=$(date +%s)
git add .
git commit -m "$timestamp"
git push origin dev

# bash git-auto.sh -u 168556687