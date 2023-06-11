var VDF = require("@node-steam/vdf");
var fs = require("fs");
var fetch = require("node-fetch");

var steamAppList,
  localAppIds = [];

function getLocalAppIds() {
  libraryfoldersPath = `E:\\Games\\steam\\steamapps\\libraryfolders.vdf`;
  var text = fs.readFileSync(libraryfoldersPath).toString("utf-8");
  let vdf_local_data = VDF.parse(text).libraryfolders[0].apps;
  for (var i in vdf_local_data) localAppIds.push(parseInt(i));
}

async function steamGetAppList() {
  steamGetAppsURL = "https://api.steampowered.com/ISteamApps/GetAppList/v2/";
  const response = await fetch(steamGetAppsURL);
  const jsonData = await response.json();
  steamAppList = jsonData.applist.apps;
}

async function initialize() {
  getLocalAppIds();
  await steamGetAppList();
}

function getSteamAppName(id) {
  let steamApp = steamAppList.find((item) => {
    return item.appid == id;
  });
  return steamApp;
}

async function main() {
  let returnResult = [];
  await initialize();
  for (var i in localAppIds)
    returnResult.push(getSteamAppName(localAppIds[i]).name);
  return returnResult;
}

module.exports = {
  main,
};
