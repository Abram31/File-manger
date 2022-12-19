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
import { commands, failed, invalidInput } from './common/constants.js';
import { ls } from './handlers/ls.js';
import { add } from './handlers/add.js';
import { rn } from './handlers/rn.js';
import { cp } from './handlers/cp.js';
import { os } from './handlers/os.js';
import { mv } from './handlers/mv.js';
import { rm } from './handlers/rm.js';
import { hash } from './handlers/hash.js';
import { compress } from './handlers/compress.js';
import { decompress } from './handlers/decompress.js';


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
        const curCommand = data.toString().trim().split(' ')[0];
        if (Object.keys(commands).includes(curCommand)) {

            switch (curCommand) {
                case (commands.up):
                    up()
                    break;
                case (commands.cd):
                    const dirPath = data.trim().slice(2).trim();
                    cd(dirPath)
                    break;
                case (commands.cat):
                    const newFileName = data.trim().slice(3).trim();
                    cat(newFileName)
                    break;
                case (commands.add):
                    const newFileNameAdd = data.trim().slice(3).trim();
                    add(newFileNameAdd)
                    break;

                case (commands.rn):
                    const nameFiles = data.trim().slice(3).trim().split(' ')
                    rn(nameFiles)
                    break;
                case (commands.cp):
                    const filesPath = data.trim().slice(2).trim().split(' ')
                    cp(filesPath)
                    break;

                case (commands.mv):
                    const filesPathMV = data.trim().slice(2).trim().split(' ')
                    mv(filesPathMV)
                    break;
                case (commands.rm):
                    const filePathRM = data.trim().slice(2).trim()
                    rm(filePathRM)
                    break;
                case (commands.ls):
                    ls()
                    break;
                case (commands.os):
                    const secondCommand = data.trim().slice(2).trim();
                    os(secondCommand)
                    break;
                case (commands.hash):
                    const pathToFileHash = data.trim().slice(4).trim();
                    hash(pathToFileHash)
                    break;
                case (commands.compress):
                    const pathToFiles = data.trim().slice(8).trim().split(' ');
                    compress(pathToFiles)
                    break;
                case (commands.decompress):
                    const pathToFilesDecompress = data.trim().slice(10).trim().split(' ');
                    decompress(pathToFilesDecompress)
                    break;
                case (commands.exit):
                    console.log(`Thank you for using File Manager, ${state.name}, goodbye!`);
                    console.log(`You are currently in ${cwd()}`);
                    exit();

                default: invalidInput()


            }
        } else {
            invalidInput()
        }
        // if (curCommand === 'up') {
        //     up()
        // }
        // if (curCommand.startsWith('cd')) {
        //     const dirPath = curCommand.trim().slice(2).trim();
        //     cd(dirPath)
        // }
        // if (curCommand.startsWith('cat')) {
        //     const newFileName = curCommand.trim().slice(3).trim();
        //     cat(newFileName)
        // }
        // if (curCommand.startsWith('add')) {
        //     const newFileName = curCommand.trim().slice(3).trim();
        //     add(newFileName)
        // }
        // if (curCommand.startsWith('rn')) {
        //     const nameFiles = curCommand.trim().slice(3).trim().split(' ')
        //     rn(nameFiles)
        // }
        // if (curCommand.startsWith('cp')) {
        //     const filesPath = curCommand.trim().slice(2).trim().split(' ')
        //     cp(filesPath)
        // }
        // if (curCommand.startsWith('mv')) {
        //     const filesPath = curCommand.trim().slice(2).trim().split(' ')
        //     mv(filesPath)
        // }
        // if (curCommand === 'ls') {   /// есть баги
        //     ls()
        // }
        // if (curCommand.startsWith('os')) {
        //     const secondCommand = curCommand.trim().slice(2).trim();
        //     os(secondCommand)
        // }

        // if (curCommand === '.exit') {
        //     console.log(`Thank you for using File Manager, ${state.name}, goodbye!`);
        //     console.log(`You are currently in ${cwd()}`);
        //     exit()
        // }
    })
    rl.on('SIGINT', () => {
        console.log(`You are currently in ${cwd()}`);
        console.log(`Thank you for using File Manager, ${state.name}, goodbye!`)
        exit()
    })

}
await main()
