# poke-seacher

A cli tool for pokeapi using javascript. You could also use it for your own projects to gather pokeapi info to your js program. Still in development but already functional :D

## Requirements
1. NodeJS
2. Internet Access
3. A shell/cmd environment

## Usage
The implementation of the app is in ./lib/pokesearch.mjs. If you want to test it you could do so by typing in your terminal

``` 
    node ./lib/pokesearch.mjs [flag] [endpoint] [Name or ID]
```
Or if you've installed it globally
````
    pokesearch [flag] [endpoint] [Name or ID]
````
You can also import the functions at lib/pokesearch.mjs to make use of them in your apps. You have 2 main functions:
````
    getPokeJSON(section:string, value:string|number):json
````
This function returns the json from the pokeapi