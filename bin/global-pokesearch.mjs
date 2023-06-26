#!/usr/bin/env node
import process from 'process';
import * as fs from 'fs/promises';
import path from 'path';
import { getPokeObject, getPokeJSON } from "../lib/pokesearch.mjs";

async function handler(processVariables = process.argv) {
    let pokemonJSON;
    let pokemonObject;
    const option = processVariables[2];
    const pokeSection = processVariables[3] || "";
    const pokeValue = processVariables[4] || "";
    const subProperty = processVariables[5] || "";

    function printHelp() {
        let helpText = `Syntax: pokesearch <flag> [endpoint] [ID or String]\n\t-o: Output data to console\n
        -w: Write data to a file\n
        -chdir: Change directory or set directory to output files when working with -w\n
        -l: List all endpoints
        -h: Print help message`;
        return helpText;
    }

    if (option !== '-h' && option !== '-l') {
        pokemonJSON = await getPokeJSON(pokeSection, pokeValue);
        pokemonObject = await getPokeObject(pokemonJSON);
    }

    switch (option) {
        case '-o':
            if (pokeSection) return console.log(subProperty !== "" ? pokemonObject[subProperty] : pokemonObject);
        case '-l':
            return console.log(`pokemon\nberry\ncontest-type\nencounter-method\nevolution\ngame\nitem\nlocation\nmachine\nmove`);
        // case '-w':
        //     try {
        //         let pathToOutput = path.resolve("./");
        //         await fs.writeFile(`${pathToOutput}\\outputData\\${pokeSection}.json`, pokemonJSON);
        //     } catch (e) {
        //         console.log(e);
        //         return;
        //     }
        case '-h':
            console.log(printHelp());
            return;
        default:
            console.log("error");
    }
}

handler();