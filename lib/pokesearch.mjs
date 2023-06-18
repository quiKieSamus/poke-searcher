import process from 'process';
import https from 'https';
import stripBom from 'strip-bom';
import fs from 'fs';
console.clear();


export async function getPokeObject() {
    const processVariables = process.argv;
    const pokeName = !processVariables[2] ? "" : processVariables[2].toLowerCase(); 
    const pokeProperty = !processVariables[3] ? "" : processVariables[3];  
    async function getPokeChunk(name = pokeName) {
        return new Promise((resolved, reject) => {
            https.get(`https://pokeapi.co/api/v2/pokemon/${name}/`, (response) => {
                let data = "";
                if (response.statusCode === 404)  {
                    console.log("Not found");
                    return false;
                }
                response.on("data", (chunk) => {
                    data += chunk;
                });
                response.on("end", () => resolved(data));
                response.on("error", (err) => {
                    reject(err);
                });
            });
        });
    }

    if (!pokeName) return "You must enter a valid pokemon name or ID"

    const pokemonJSON = stripBom(await getPokeChunk());
    if (!pokemonJSON) return "Not found";
    const pokemon = JSON.parse(pokemonJSON);
    if (!pokeProperty) {
        return pokemon;
    }
    if (!pokemon[pokeProperty]) {
        return {
            status: false,
            reason: "propiedad no existe"
        };
    }
    return pokemon[pokeProperty];
}

console.log(await getPokeObject());