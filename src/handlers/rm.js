import { unlink } from 'node:fs/promises';
import { normalize, resolve } from 'node:path';
import { sep } from 'path';
import { failed } from '../common/constants.js';


export const rm = async (pathToFile) => {
    try {
        await unlink(resolve(pathToFile));
        console.info(`File ${pathToFile.split(sep).slice(-1)[0]} removed`);
    } catch (err) {
        failed()
    }
}