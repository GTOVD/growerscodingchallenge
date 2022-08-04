// 1. Accept a file as input
// 2. Accept a string value as a "search parameter"
// 3. Accept a string value as a "replacement parameter"
// 4. Count every occurrence of the value of the "search parameter" in the file
// 5. Replace each occurance of the "search parameter" with the value of the "replacement parameter"
// 6. Save the file
// 7. Output the total number of occurrences of the "search parameter", and the total number of replacements.
import fs from "fs";

console.time("loadTime");

const getDataFromFile = (): string => {
    try {
        const response = fs.readFileSync("input.txt", "utf8");
        return response;
    } catch (err) {
        console.error(err);
    }
    return "";
};

const saveDataToFile = (data: string) => {
    fs.writeFile("input.txt", data, (err) => {
        if (err) throw err;
    });
};

const dataParameters: string[] = getDataFromFile().split("\n");
const input: string = dataParameters[0];
const searchParameter: string = dataParameters[1];
const replacementParameter: string = dataParameters[2];

const countOccurance = (data: string, search: string): number => {
    const regex: RegExp = new RegExp(`${search}`, "g");
    const occurance = <string[]>data.match(regex);
    return occurance?.length | 0;
};

const replaceOcurance = (
    data: string,
    search: string,
    replace: string
): string => {
    return data.replaceAll(search, replace);
};

const replaceOcuranceRecursively = (
    data: string,
    search: string,
    replace: string,
    newData: string = ""
): string => {
    if (data === "") return "";
    if (data.substring(0, search.length) === search) {
        newData = `${newData}${data.substring(0, search.length)}`;
        replaceOcuranceRecursively(
            data.substring(search.length),
            search,
            replace,
            newData
        );
    } else {
        newData = `${newData}${data.substring(0)}`;
        replaceOcuranceRecursively(data.substring(1), search, replace, newData);
    }

    return newData;
};

replaceOcurance(input, searchParameter, replacementParameter);
// replaceOcuranceRecursively(input, searchParameter, replacementParameter);

saveDataToFile(
    `${replaceOcurance(
        input,
        searchParameter,
        replacementParameter
    )}\n${searchParameter}\n${replacementParameter}`
);

console.log(
    `The total number of occurrences of the "search & replacement parameters" ${countOccurance(
        input,
        searchParameter
    )}`
);

console.timeEnd("loadTime");
