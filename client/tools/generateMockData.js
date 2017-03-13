/*eslint-disable no-console*/
import jsf from 'json-schema-faker';
import { schema } from './mockDataSchema';
import fs from 'fs';

const json = JSON.stringify(jsf(schema));

fs.writeFile("./client/src/api/db.json", json, function(err) {
  if(err) {
    return console.log(err);
  } else {
    console.log("Mock data generated");
  }
});
