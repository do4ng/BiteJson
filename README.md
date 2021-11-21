# BiteJS

Javascript JSON parser

## Download

```bash
yarn add bitejs
# or
npm install bitejs
```

## Example

```json
// test.json
{
  "name": "AWESOMENAME", //// this is comment!
  "age": 30, // ...
  "woman": false,
  "hobby": ["⚽ soccer", "🎨 draw"]
  /*
  lol!
  */
}
```

```js
const fs = require("fs");
const { Bite } = require("bitejs");

const bite = new Bite(fs.readFileSync("./test.json").toString());

bite.set("name", "COOLNAME");
bite.remove("age");
bite.set("about", "Hello, World!");

console.log(bite.get());

/*
output : 
{
  name: 'COOLNAME',
  age: null,
  woman: false,
  hobby: [ '⚽ soccer', '🎨 draw' ],
  about: 50
}
*/
```
