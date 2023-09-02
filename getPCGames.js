import { readdirSync, createWriteStream, readFileSync } from "fs";

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

function UpdateMDFile(dir) {
  let gameListPC = getDirectories(dir);

  var logger2 = createWriteStream("README.md");
  logger2.write("# Games on PC\n");

  //Write games currently present
  let listitem;
  for (listitem of gameListPC) {
    logger2.write(`\n${listitem}  `);
  }

  //Get list of games from readme repo
  var gameListRepo = [];
  readFileSync("./README.md")
    .toString()
    .split("\n")
    .forEach(function (line) {
      gameListRepo.push(line.trim().replace(/~/g, ""));
    });

  //Strike out games which don't currently exist
  for (listitem of gameListRepo) {
    if (
      gameListPC.includes(listitem) ||
      listitem == "# Games on PC" ||
      listitem == ""
    )
      continue;
    logger2.write(`\n~~${listitem}~~  `);
  }
}

// let dir = "E:\\Games\\PS3\\Rpcs3\\roms";
let dir = "E:\\Games";
UpdateMDFile(dir);
