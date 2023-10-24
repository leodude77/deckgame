var shortcut = require("steam-shortcut-editor");
var fs = require("fs");
var getLibraryFolders = require("./scripts/getLibraryFolders");
var updateMDFile = require("./scripts/updateMDFile");
var displayEntriesFromShortcutsVDF = require("./scripts/displayEntriesFromShortcutsVDF");

var filePath = `/home/deck/.steam/steam/userdata/${process.argv[2]}/config/shortcuts.vdf`;
var customPath = process.argv[3];

if (process.platform === "win32")
  filePath = `C:\\Program Files (x86)\\Steam\\userdata\\${process.argv[2]}\\config\\shortcuts.vdf`;
if (customPath != undefined) {
  filePath = `${customPath}\\userdata\\${process.argv[2]}\\config\\shortcuts.vdf`;
}
else {
  customPath = `/home/deck/.steam/steam`
}

async function main() {
  let list = await getLibraryFolders.main(customPath);
  updateMDFile.UpdateMDFile(fs, shortcut, filePath, list);
  // displayEntriesFromShortcutsVDF.displayEntriesFromShortcutsVDF(
  //   shortcut,
  //   filePath
  // );
}

main();
