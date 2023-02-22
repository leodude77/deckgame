#! usr/bin/bash

LISTPREFIXES=$(flatpak run com.github.Matoking.protontricks -l | grep -i " (" | sed 's/.*(\([0-9]\+\))$/\1/')
readarray -t <<<$LISTPREFIXES

# echo "$LISTPREFIXES"

# Deletes unused prefixes
search_dir=/run/media/mmcblk0p1/compatdata
for entry in "$search_dir"/*
do
    steamPrefixId=$(echo "$entry" | grep -o '[^/]*$')
    echo "$entry"
    if [[ ! " ${MAPFILE[*]} " =~ " ${steamPrefixId} " ]]; then
        rm -rf $entry
        echo "Removed prefix ${steamPrefixId}"
    fi
done

search_dir=/home/deck/.steam/steam/steamapps/shadercache
for entry in "$search_dir"/*
do
    steamPrefixId=$(echo "$entry" | grep -o '[^/]*$')
    if [[ ! " ${MAPFILE[*]} " =~ " ${steamPrefixId} " ]]; then
        rm -r $entry
        echo "Removed shadercache ${steamPrefixId}"
    fi
done

#Copies save file
find /home/deck/.steam/steam/steamapps/compatdata -maxdepth 1 -type l -delete
cp -u -r /home/deck/.steam/steam/steamapps/compatdata /run/media/mmcblk0p1
rm -rf /home/deck/.steam/steam/steamapps/compatdata/*

certainDir=/home/deck/.steam/steam/steamapps/compatdata
find /run/media/mmcblk0p1/compatdata/ -maxdepth 1 -exec ln -s {} "$certainDir" \;
rm /home/deck/.steam/steam/steamapps/compatdata/compatdata

search_dir=/run/media/mmcblk0p1/compatdata
for entry in "$search_dir"/*
do
    steamPrefixId=$(echo "$entry" | grep -o '[^/]*$')
    docSavefilepath="${entry}/pfx/drive_c/users/steamuser/Documents"
    appSavefilepath="${entry}/pfx/drive_c/users/steamuser/AppData"
    pDocSavefilepath="${entry}/pfx/drive_c/users/Public/Documents"
    sharedSaveFile=/run/media/mmcblk0p1/shared_prefix/pfx/drive_c/users/steamuser
    sharedSaveFilePubluc=/run/media/mmcblk0p1/shared_prefix/pfx/drive_c/users/Public
    cp -r -u $docSavefilepath $sharedSaveFile
    cp -r -u $appSavefilepath $sharedSaveFile
    cp -r -u $pDocSavefilepath $sharedSaveFilePubluc
    echo "Copied save from $steamPrefixId"
done
