let fs = require("fs");
let path = require("path");

let types = {
    media: ["mp4", "mkv"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: ["docx", "doc", "pdf", "xlsx", "xls", "odt", "ods", "odp", "odg", "odf" , "txt", "ps", "tex"],
    app: ["exe", "pkg", "deb"],
    image: ["png", "jpg", "img"],
}

function organizeFn(dirPath){
//console.log("Organize command implemented for ", dirPath);
// 1. inpout => directory path given
let destPath;
if (dirPath == undefined) {
    console.log("Kindly enter the correct path...🙏🏾");
    return;
}
else{
    let doesExist = fs.existsSync(dirPath);
    if(doesExist){
        // 2. create => OrganisedFiles => directory
        destPath = path.join(dirPath, "Organized_Files");
        if (fs.existsSync(destPath) == false){
           fs.mkdirSync(destPath);
        }
    }
    else{
        console.log("Kindly enter the correct path...🙏🏾");
        return;
    }
}
organizeHelper(dirPath, destPath);
}
function organizeHelper(source, dest) {
    // 3. Identify categroies of all the files present in that input directory
    let childName = fs.readdirSync(source);
    //console.log(childName);
    for(let i = 0; i < childName.length; i++){
        let childAddress = path.join(source, childName[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if(isFile){
            //console.log(childName[i]);
            let category = getCategory(childName[i]);
            console.log(childName[i], " belongs to : ",category);
            //Copy/Cut filesto the organized directory inside of any category folder
           // sendFiles(childAddress, dest, category);
        }
    }
}

function sendFiles(sourceFilePath, dest, category) {
    let categoryPath = path.join(dest, category);
    if(fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(sourceFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(sourceFilePath, destFilePath);
    /*
    To cut (copy to dest directory and delete from source directory) use:
    fs.unlinkSync(sourceFilePath);
    */
    
    console.log(fileName, "copied to ", category);

}

function getCategory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1);
    for(let type in types){
    
        let cTypeArr = types[type];
        for(let i = 0; i < cTypeArr.length; i++){
            if(ext == cTypeArr[i]){
                return type;
            }
        }
    }
    return "others";
}
module.exports = {
    fxnO : organizeFn
}