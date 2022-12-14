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
        if (command.startsWith('cd')) {
            const newDirName = command.trim().slice(2).trim();
            const indexCurrentElement = state.fullPath.split(sep).length - Math.abs(state.currentNumberPath);
            const nextDirName = state.fullPath.split(sep)[indexCurrentElement]
            if (nextDirName === newDirName) {
                state.currentNumberPath++;
                console.log(`You are currently in ${state.currentPath()}`);
                console.log(state.currentNumberPath);

                // console.log(nextDirName);
                // state.currentPath = () => normalize(state.fullPath.split(sep)
                //     .slice(0, state.currentNumberPath).join(/\./))
            }
            // let path = state.fullPath.split(sep).slice(state.currentNumberPath + 1, state.currentNumberPath).join('');
            // if (newDirName === path) {

            // state.currentNumberPath < -1 ? state.currentNumberPath++ : state.currentNumberPath = -1;
            // state.currentNumberPath === -1 ? state.currentNumberPath = false : state.currentNumberPath++; //подумать как лучше преобразовывать
            // const path = state.currentPath()

            // console.log(state.currentNumberPath);
            // console.log(`You are currently in `);
            // }
            // console.log(state.fullPath.split(sep));
            // console.log(state.fullPath.split(sep).splice(state.currentNumberPath).join(''));
            // console.log(state.fullPath.split(sep));
            // console.log(state.currentNumberPath);
            // console.log('Косяк');
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
