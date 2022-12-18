import { cwd, chdir } from 'process';
import { failed } from '../common/constants.js';

export const up = () => {
    try {
        chdir('..')
        console.info(`You are currently in ${cwd()}`);
    } catch {
        failed()
    }
} 