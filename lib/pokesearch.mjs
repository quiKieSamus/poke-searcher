import https from 'https';
import stripBom from 'strip-bom';

export async function getPokeJSON(name) {
    return new Promise((resolved, reject) => {
        https.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}/`, (response) => {
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

export async function getPokeObject(pokeJSON) {
    const pokeObject = stripBom(pokeJSON);
    return JSON.parse(pokeObject);
}