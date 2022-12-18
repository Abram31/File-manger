import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import { stdin, argv, exit, cwd, chdir } from 'process';
import { normalize, sep } from 'path';
import { readdir, stat, appendFile, rename } from 'fs/promises';

import { state } from './state.js';
import { dirContent, FileDescription } from './dirContent.js';
import { createReadStream, createWriteStream } from 'fs';

import { EOL, cpus, homedir, userInfo, arch } from 'os';
import { dirname, resolve, parse } from 'node:path';
import { up } from './handlers/up.js';
import { cd } from './handlers/cd.js';
import { cat } from './handlers/cat.js';
import { failed } from './common/constants.js';
import { ls } from './handlers/ls.js';
import { add } from './handlers/add.js';
import { rn } from './handlers/rn.js';


const rl = readline.createInterface({ input, output });
chdir(homedir())

const main = async () => {
    const args = argv.slice(2)[0];
    const keyItem = '--username=';
    state.fullPath = homedir();

    if (args.startsWith(keyItem)) {
        state.name = args.split('=').slice(-1)
        console.log(`Welcome to the File Manager, ${state.name}!`);
        console.log(`You are currently in ${state.fullPath}`);
    }

    rl.on('line', async (data) => {

        const args = argv.slice(2)[0];
        const command = data.toString().trim();
        if (command === '.exit') {
            console.log(`Thank you for using File Manager, ${state.name}, goodbye!`);
            console.log(`You are currently in ${state.fullPath}`);
            exit()
        }
        if (command === 'up') {
            up()
        }
        if (command.startsWith('cd')) {
            const dirPath = command.trim().slice(2).trim();
            cd(dirPath)
        }
        if (command.startsWith('cat')) {
            const newFileName = command.trim().slice(3).trim();
            cat(newFileName)
        }
        if (command.startsWith('add')) {
            const newFileName = command.trim().slice(3).trim();
            add(newFileName)
        }
        if (command.startsWith('rn')) {
            const nameFiles = command.trim().slice(3).trim().split(' ')
            rn(nameFiles)
        }
        if (command.startsWith('cp')) {
            // const curPath = cwd();
            // const curPath = state.currentPath();
            try {
                const filesPath = command.trim().slice(2).trim().split(' ')
                console.log(resolve(filesPath[0]), resolve(filesPath[1]));
                const { base } = parse(filesPath[0])
                console.log(base);

                const readableStream = createReadStream(resolve(filesPath[0]));
                const writeableStream = createWriteStream(resolve(filesPath[1], base));

                readableStream.pipe(writeableStream)
            } catch {
                failed()
            }
            // const filesName = command.trim().split(' ');



        }
        if (command === 'ls') {   /// есть баги
            ls()
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
            if (secondCommand === '--homedir') {
                console.log(homedir());
            }
            if (secondCommand === '--username') {
                console.log(`Username - ${userInfo().username}`);
            }
            if (secondCommand === '--architecture') {
                console.log(`CPU architecture - ${arch()}`);
            }
        }
    })
    process.on('SIGINT', () => {
        console.log(`You are currently in ${state.fullPath}`);
        console.log(`Thank you for using File Manager, ${state.name}, goodbye!`)
        exit()
    })
}
await main()
