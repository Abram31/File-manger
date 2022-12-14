import { stdin, argv, exit, cwd } from 'process';
import { normalize, sep } from 'path';
import { readdir, stat } from 'fs/promises';

import { state } from './state.js';
import { dirContent } from './dirContent.js';




const welcome = async () => {
    const args = argv.slice(2)[0];
    const keyItem = '--username=';

    if (args.startsWith(keyItem)) {
        state.name = args.split('=').slice(-1)
        console.log(`Welcome to the File Manager, ${state.name}!`);
        console.log(`You are currently in ${state.fullPath}`);
    }

    stdin.on('data', async (data) => {
        const command = data.toString().trim();
        if (command === 'exit') {
            console.log(`Thank you for using File Manager, ${state.name}, goodbye!`);
            console.log(`You are currently in ${state.fullPath}`);
            exit()
        }
        if (command === 'up') {
            state.currentNumberPath--;
            console.log(`You are currently in ${state.currentPath()}`);
        }
        if (command === 'ls') {
            const dataDir = await readdir(state.currentPath())
            const table = await dirContent(dataDir)
            console.table(table);
        }
    })
    process.on('SIGINT', () => {
        console.log(`You are currently in ${state.fullPath}`);
        console.log(`Thank you for using File Manager, ${state.name}, goodbye!`)
        exit()
    })
}
await welcome()
