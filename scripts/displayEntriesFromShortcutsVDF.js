function displayEntriesFromShortcutsVDF(shortcut, filePath) {
  shortcut.parseFile(
    filePath,
    {
      autoConvertArrays: true,
      autoConvertBooleans: true,
      dateProperties: ["LastPlayTime"],
    },
    function (err, obj, inputBuffer) {
      if (err) {
        console.log("failed to read " + filePath);
        return;
      }

      var gameListPC = [];
      var myobj;
      for (myobj of obj["shortcuts"]) {
        console.log(myobj);
        mydate = new Date(myobj["LastPlayTime"]);
        tempObject = {
          gameName: myobj.AppName ? myobj.AppName : myobj.appname,
          lastPlayed: mydate.toDateString(),
        };

        gameListPC.push(tempObject);
      }

      gameListPC.sort(function (a, b) {
        return (a.gameName > b.gameName) - (a.gameName < b.gameName);
      });

      console.log(gameListPC);
    }
  );
}

module.exports = {
  displayEntriesFromShortcutsVDF,
};
