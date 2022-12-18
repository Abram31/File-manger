import { stdin, argv, exit, cwd } from 'process';
import { normalize, sep } from 'path';
import { readdir, stat, appendFile } from 'fs/promises';

import { state } from './state.js';
import { dirContent, FileDescription } from './dirContent.js';
import { createReadStream, createWriteStream, rename } from 'fs';

import { EOL, cpus } from 'os';




const welcome = async () => {
    const args = argv.slice(2)[0];
    const keyItem = '--username=';

    if (args.startsWith(keyItem)) {
        state.name = args.split('=').slice(-1)
        console.log(`Welcome to the File Manager, ${state.name}!`);
        console.log(`You are currently in ${state.fullPath}`);
    }

    stdin.on('data', async (data) => {
        const args = argv.slice(2)[0];
        const command = data.toString().trim();
        if (command === 'exit') {
            console.log(`Thank you for using File Manager, ${state.name}, goodbye!`);
            console.log(`You are currently in ${state.fullPath}`);
            exit()
        }
        if (command === 'up') {
            const indexCurrentElement = state.indexCurrentElement();
            if (indexCurrentElement > 1) {
                state.currentNumberPath--;
            }
            console.log(`You are currently in ${state.currentPath()}`);
        }
        if (command.startsWith('cd')) {
            const newDirName = command.trim().slice(2).trim();
            const indexCurrentElement = state.indexCurrentElement();
            const nextDirName = state.fullPath.split(sep)[indexCurrentElement]
            if (nextDirName === newDirName) {
                state.currentNumberPath++;
                console.log(`You are currently in ${state.currentPath()}`);
            } else {
                console.error(`Directory not found`);
            }
        }
        if (command.startsWith('cat')) {
            const newFileName = command.trim().slice(3).trim();
            const curPath = state.currentPath();
            const readableStream = createReadStream(normalize(`${curPath}\\${newFileName}`));
            readableStream.on('data', (chunk) => {
                console.log(chunk.toString());
            })
        }
        if (command.startsWith('add')) {
            const newFileName = command.trim().slice(3).trim();
            const curPath = state.currentPath();
            try {
                appendFile(normalize(`${curPath}\\ ${newFileName}`), '')
                console.log(`New file- ${newFileName} created`);
            } catch (err) {
                throw new Error(err)
            }
            console.log(curPath);
        }
        if (command.startsWith('rn')) {             /// не работает!!!
            const curPath = state.currentPath();
            const filesName = command.trim().slice(2).trim().split(' ');
            console.log(filesName);
            console.log(normalize(`${curPath}\\${filesName[0]}`), normalize(`${curPath}\\${filesName[1]}`));
            rename(normalize(`${curPath}\\${filesName[0]}`), `${filesName[1]}`,
                (err) => {
                    if (err) {
                        console.error(err);
                    }
                })
        }
        if (command.startsWith('cp')) {
            const curPath = state.currentPath();
            const filesName = filesName.length <= 2
                ? command.trim().slice(2).trim().split(' ')
                : command.trim().slice(2).trim();
            // const filesName = command.trim().split(' ');
            console.log(filesName);
            const readableStream = createReadStream(normalize(filesName[0]));
            const writeableStream = createWriteStream(normalize(filesName[1]));

            readableStream.pipe(writeableStream)



        }
        if (command === 'ls') {
            const dataDir = await readdir(state.currentPath())
            const table = await dirContent(dataDir)
            console.table(table);
        }
        if (command === 'check') {
            console.log(state);
        }
        if (command.startsWith('os')) {
            const secondCommand = command.trim().slice(2).trim();
            if (secondCommand === '--EOL') {
                console.log(JSON.stringify(EOL));
            }
            if (secondCommand === '--cpus') {
                function CPDescription(model, speed) {
                    this.Model = model;
                    this.Speed = speed;
                }
                function AmountCPUS(amountCPUS) {
                    this.Amount_CPUS = amountCPUS;
                }
                const CP = cpus();
                const table = CP.map((processorDesc) =>
                    new CPDescription(processorDesc.model,
                        `${(processorDesc.speed / 1000).toFixed(2)}GHz`)
                )
                console.table(new AmountCPUS(CP.length));
                console.table(table);
            }
        }
    })
    process.on('SIGINT', () => {
        console.log(`You are currently in ${state.fullPath}`);
        console.log(`Thank you for using File Manager, ${state.name}, goodbye!`)
        exit()
    })
}
await welcome()
