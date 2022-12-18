import { resolve, parse } from 'node:path'
import { failed } from '../common/constants.js';
import { rename } from 'fs/promises';


export const rn = ([pathToFile, newNameFile]) => {
    try {
        rename(resolve(pathToFile), newNameFile)
        console.log(`File ${pathToFile.split('\\').slice(-1)[0]} renamed to  ==> ${newNameFile}`);
    } catch (err) {
        failed()
    }
}