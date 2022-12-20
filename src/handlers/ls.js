import { readdir } from 'fs/promises';
import { cwd } from 'process';
import { failed } from '../common/constants.js';
import { dirContent } from '../common/dirContent.js';

export const ls = async () => {
    try {
        const dataDir = await readdir(cwd())
        const table = await dirContent(dataDir)
        console.table(table);
    } catch (err) {
        failed()
    }
}