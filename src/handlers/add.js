import { normalize } from 'path';
import { cwd } from 'process';
import { failed } from '../common/constants.js';
import { appendFile } from 'fs/promises';



export const add = (newFileName) => {
    const curPath = cwd();
    try {
        appendFile(normalize(`${curPath}\\${newFileName}`), '')
        console.info(`You are currently in ${cwd()}`);
        console.info(`New file - ${ newFileName } created`);
    } catch (err) {
        failed()
    }
}