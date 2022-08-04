"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 1. Accept a file as input
// 2. Accept a string value as a "search parameter"
// 3. Accept a string value as a "replacement parameter"
// 4. Count every occurrence of the value of the "search parameter" in the file
// 5. Replace each occurance of the "search parameter" with the value of the "replacement parameter"
// 6. Save the file
// 7. Output the total number of occurrences of the "search parameter", and the total number of replacements.
const fs_1 = __importDefault(require("fs"));
console.time("loadTime");
const getDataFromFile = () => {
    try {
        const response = fs_1.default.readFileSync("input.txt", "utf8");
        return response;
    }
    catch (err) {
        console.error(err);
    }
    return "";
};
const saveDataToFile = (data) => {
    fs_1.default.writeFile("input.txt", data, (err) => {
        if (err)
            throw err;
    });
};
const dataParameters = getDataFromFile().split("\n");
const input = dataParameters[0];
const searchParameter = dataParameters[1];
const replacementParameter = dataParameters[2];
const countOccurance = (data, search) => {
    const regex = new RegExp(`${search}`, "g");
    const occurance = data.match(regex);
    return occurance?.length | 0;
};
const replaceOcurance = (data, search, replace) => {
    return data.replaceAll(search, replace);
};
const replaceOcuranceRecursively = (data, search, replace, newData = "") => {
    if (data === "")
        return "";
    if (data.substring(0, search.length) === search) {
        newData = `${newData}${data.substring(0, search.length)}`;
        replaceOcuranceRecursively(data.substring(search.length), search, replace, newData);
    }
    else {
        newData = `${newData}${data.substring(0)}`;
        replaceOcuranceRecursively(data.substring(1), search, replace, newData);
    }
    return newData;
};
replaceOcurance(input, searchParameter, replacementParameter);
// replaceOcuranceRecursively(input, searchParameter, replacementParameter);
saveDataToFile(`${replaceOcurance(input, searchParameter, replacementParameter)}\n${searchParameter}\n${replacementParameter}`);
console.log(`The total number of occurrences of the "search & replacement parameters" ${countOccurance(input, searchParameter)}`);
console.timeEnd("loadTime");
