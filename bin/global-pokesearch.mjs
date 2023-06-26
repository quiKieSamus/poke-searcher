#!/usr/bin/env node
import process from 'process';
import * as fs from 'fs/promises';
import path from 'path';
import { getPokeObject, getPokeJSON } from "../lib/pokesearch.mjs";

async function handler(processVariables = process.argv) {
    let pokemonJSON;
    let pokemonObject;
    const option = processVariables[2];
    const pokeName = processVariables[3];
    const properties = processVariables[4];
    
    function printHelp() {
        let helpText = `Syntax: pokesearch <flag> [pokemon name]\n\t-o: Output data to console\n
        -w: Write data to a file\n
        -chdir: Change directory or set directory to output files when working with -w\n
        -h: Print help message`;
        return helpText;
    }

    if (option !== '-h') {
        if (pokeName) {
            pokemonJSON = await getPokeJSON(pokeName);
            pokemonObject = await getPokeObject(pokemonJSON);
        }
    }

    switch (option) {
        case '-o':
            if (pokeName) return console.log(pokemonObject);
        case '-w':
            try {
                let pathToOutput = path.resolve("./");
                await fs.writeFile(`${pathToOutput}\\outputData\\${pokeName}.json`, pokemonJSON);
            } catch (e) {
                console.log(e);
                return;
            }
        case '-h':
            console.log(printHelp());
            return;
        default:
            if (!pokeName) console.log("No pokemon name or ID defined.");
            console.log(`Wrong syntax. ${option} is not a flag for pokesearch`);
            console.log(printHelp());
    }
}

handler();