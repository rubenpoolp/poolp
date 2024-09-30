const fs = require("fs");

const directories = ["fonts", "logo"];

const imageFileNames = (dir) => {
  const array = [];
  fs.readdirSync(dir).map((file) => {
    if (
      file.endsWith(".ttf") ||
      file.endsWith(".pdf") ||
      file.endsWith(".svg") ||
      file.endsWith(".mp3") ||
      file.endsWith(".png")
    ) {
      file = file
        .replace(".ttf", "")
        .replace(".pdf", "")
        .replace(".svg", "")
        .replace(".mp3", "")
        .replace(".png", "");
      array.push(file);
    }
  });
  return Array.from(new Set(array));
};

const generate = () => {
  let properties = "";
  directories.forEach((directory) => {
    properties += "// " + directory + "\n  ";
    properties += imageFileNames(directory)
      .map((name) => {
        const extension = fs.existsSync(`./${directory}/${name}.svg`)
          ? ".svg"
          : fs.existsSync(`./${directory}/${name}.png`)
            ? ".png"
            : fs.existsSync(`./${directory}/${name}.mp3`)
              ? ".mp3"
              : ".ttf";
        return `"${name}": require("./${directory}/${name}${extension}")`;
      })
      .join(",\n  ");
    properties += ",\n\n  ";
  });

  const string = `const assets = {
  ${properties.substring(0, properties.length - 4)}
};

export default assets;
`;

  fs.writeFileSync("index.js", string, "utf8");
};

generate();
