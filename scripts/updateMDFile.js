function UpdateMDFile(fs, shortcut, filePath, localActualSteamAppList) {
  shortcut.parseFile(
    filePath,
    {
      autoConvertArrays: true,
      autoConvertBooleans: true,
      dateProperties: ["LastPlayTime"],
    },
    function (err, obj, inputBuffer) {
      if (err) {
        console.log("failed to read " + filePath + err);
        return;
      }

      var gameListPC = [];
      var myobj;
      for (myobj of obj["shortcuts"]) {
        mydate = new Date(myobj["LastPlayTime"]);
        tempObject = {
          gameName: myobj.AppName ? myobj.AppName : myobj.appname,
          lastPlayed: mydate.toDateString()
            ? mydate.toISOString().split("T")[0]
            : "N/A",
        };

        gameListPC.push(tempObject);
      }

      gameListPC.sort(function (a, b) {
        return (a.gameName > b.gameName) - (a.gameName < b.gameName);
      });

      var gameListRepo = [];
      fs.readFileSync("./README.md")
        .toString()
        .split("\n")
        .forEach(function (line) {
          let split = line.trim().split("|");
          if (split[1] != undefined) {
            tempObject = {
              gameName: split[1].trim().replace(/~/g, ""),
              lastPlayed: split[2].trim(),
            };
            gameListRepo.push(tempObject);
          }
        });

      var gameNameListPC = [];
      for (item of gameListPC) {
        gameNameListPC.push(item["gameName"]);
      }

      // Add legit installed steam games in system to the list
      gameNameListPC = gameNameListPC.concat(localActualSteamAppList);

      var logger2 = fs.createWriteStream("README.md");
      logger2.write("# Games on deck");
      logger2.write("\n| Name | Last Played Date |");
      logger2.write("\n| :--- | :---: |");

      //Write non-steam games retrieved from shortcut vdf file
      for (listitem of gameListPC) {
        if (listitem.lastPlayed == '1970-01-01') {
          listitem.lastPlayed = new Date().toISOString().split("T")[0]
        }
        logger2.write(`\n| ${listitem.gameName} | ${listitem.lastPlayed} |`);
      }

      // Write installed steam games present in local
      for (listitem of localActualSteamAppList) {
        logger2.write(
          `\n| ${listitem} | ${new Date().toISOString().split("T")[0]} |`
        );
      }

      // Write games not installed/playing anymore but present in the list previously in dashed line
      for (listitem of gameListRepo) {
        if (
          gameNameListPC.includes(listitem.gameName) ||
          listitem.gameName == "# Games on deck" ||
          listitem.gameName == "Name" ||
          listitem.gameName == ":---"
        )
          continue;
        logger2.write(`\n| ~~${listitem.gameName}~~ | ${listitem.lastPlayed} |`);
      }
    }
  );
}

module.exports = {
  UpdateMDFile,
};
