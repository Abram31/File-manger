import { unlink } from 'node:fs/promises';
import { normalize, resolve } from 'node:path';
import { sep } from 'path';
import { failed } from '../common/constants.js';
import { cwd } from 'process';


export const rm = async (pathToFile) => {
    try {
        await unlink(resolve(pathToFile));
        console.info(`You are currently in ${cwd()}`);
        console.info(`File ${pathToFile.split(sep).slice(-1)[0]} removed`);
    } catch (err) {
        failed()
    }
}