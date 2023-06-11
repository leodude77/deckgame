#! usr/bin/bash
while getopts u:c: flag
do
    case "${flag}" in
        u) userid=${OPTARG};;
        c) custompath=${OPTARG};;
    esac
done
if [ -z "$userid" ]; then echo "Usage: bash git-auto.sh -u steamuserid -c steampath"; exit 1; fi
node index.js $userid $custompath
timestamp=$(date +%s)
git add .
git commit -m "$timestamp"
git push origin dev

# bash git-auto.sh -u 168556687 -c ""