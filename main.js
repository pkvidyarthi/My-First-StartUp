let helpObj = require("./help");
let treeObj = require("./tree");
let organizeObj  = require("./organize");

/*
let helpObj = require("fxnH");
let treeObj = require("fxnT");
let organizeObj = require("fxnO");
*/

let inputArr = process.argv.slice(2);
let command = inputArr[0];

switch (command) {
    case "tree":
        treeObj.fxnT(inputArr[1]);
        break;
    case "organize":
        organizeObj.fxnO(inputArr[1]);
        break;
    case "help":
        helpObj.fxnH();
        break;

    default:
        console.log("Please 🙏🏾 Enter Right ✔ Command.");
        break;
        
}