import { resolve, parse } from 'node:path'
import { failed } from '../common/constants.js';
import { rename } from 'fs/promises';
import { cwd } from 'process';


export const rn = ([pathToFile, newNameFile]) => {
    try {
        rename(resolve(pathToFile), newNameFile)
        console.info(`You are currently in ${cwd()}`);
        console.log(`File ${pathToFile.split('\\').slice(-1)[0]} renamed to  ==> ${newNameFile}`);
    } catch (err) {
        failed()
    }
}