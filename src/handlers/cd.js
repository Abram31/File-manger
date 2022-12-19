import { join, normalize } from 'path';
import { cwd, chdir } from 'process';
import { failed } from '../common/constants.js';

export const cd = (path) => {
    try {
        if (/\D:/.test(path)) {
            chdir(normalize(path))
            console.info(`You are currently in ${cwd()}`);
        } else {
            path === '..' ? chdir(path) : chdir(normalize(cwd() + '\\' + path))
            console.info(`You are currently in ${cwd()}`);
        }
    }
    catch {
        failed()
    }
}