var shortcut = require('steam-shortcut-editor');
var fs = require('fs');

var filePath = `/home/deck/.steam/steam/userdata/${process.argv[2]}/config/shortcuts.vdf`;

function UpdateMDFile() {
    shortcut.parseFile(filePath,
        { autoConvertArrays: true, autoConvertBooleans: true, dateProperties: ['LastPlayTime'] },
        function (err, obj, inputBuffer) {

            if (err) {
                console.log('failed to read ' + filePath);
                return;
            }

            var gameListPC = []
            var myobj
            for (myobj of obj['shortcuts']) {
                console.log(myobj)
                mydate = new Date(myobj['LastPlayTime'])
                tempObject = {
                    gameName: myobj.appname,
                    lastPlayed: mydate.toDateString()
                }

                gameListPC.push(tempObject)
            }

            gameListPC.sort(function (a, b) {
                return (a.gameName > b.gameName) - (a.gameName < b.gameName)
            }
            );

            var gameListRepo = []
            fs.readFileSync('./README.md').toString().split('\n').forEach(function (line) {
                let split = line.trim().split(' | ')
                if (split[0] != undefined) {
                    tempObject = {
                        gameName: split[0].replace(/~/g, ""),
                        lastPlayed: split[1]
                    }
                    gameListRepo.push(tempObject)
                }
            });


            var gameNameListPC = [];
            for (item of gameListPC) {
                gameNameListPC.push(item['gameName'])
            }

            // var gameNameListRepo =[];
            // for (item of gameListRepo){
            //     gameNameListRepo.push(item['gameName'])
            // }

            var logger2 = fs.createWriteStream('README.md')
            logger2.write("# Games on deck")
            for (listitem of gameListPC) {
                logger2.write(`\n${listitem.gameName} | ${listitem.lastPlayed}  `)
            }
            for (listitem of gameListRepo) {
                if (gameNameListPC.includes(listitem.gameName) || listitem.gameName == "# Games on deck")
                    continue
                logger2.write(`\n~~${listitem.gameName}~~ | ${listitem.lastPlayed}  `)
            }
        });
}

function displayEntries() {
    shortcut.parseFile(filePath,
        { autoConvertArrays: true, autoConvertBooleans: true, dateProperties: ['LastPlayTime'] },
        function (err, obj, inputBuffer) {

            if (err) {
                console.log('failed to read ' + filePath);
                return;
            }

            var gameListPC = []
            var myobj
            for (myobj of obj['shortcuts']) {
                console.log(myobj)
                mydate = new Date(myobj['LastPlayTime'])
                tempObject = {
                    gameName: myobj.appname,
                    lastPlayed: mydate.toDateString()
                }

                gameListPC.push(tempObject)
            }

            gameListPC.sort(function (a, b) {
                return (a.gameName > b.gameName) - (a.gameName < b.gameName)
            }
            );

            console.log(gameListPC)
        });
}

// displayEntries()
UpdateMDFile()