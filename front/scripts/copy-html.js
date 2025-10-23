import { mkdirSync, copyFileSync } from "fs";
mkdirSync("./dist/assets", { recursive: true });
copyFileSync("./src/index.html", "./dist/index.html");
console.log("HTML copiado para dist/");
