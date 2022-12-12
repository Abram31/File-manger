import { createReadStream, ReadStream } from 'fs';
import { stdin, stdout, argv, env, exit, cwd } from 'process';
import { normalize, sep } from 'path';
import { readdir } from 'fs/promises';


const welcome = async () => {
    const args = argv.slice(2)[0];
    const keyItem = '--username=';
    let name;
    let fullPath = cwd();
    let currentNumberPath = 0;
    if (args.startsWith(keyItem)) {
        name = args.split('=').slice(-1)
        console.log(`Welcome to the File Manager, ${name}!`);
        console.log(`You are currently in ${fullPath}`);
    }

    stdin.on('data', (data) => {
        const command = data.toString().trim();
        if (command === 'exit') {
            console.log(`Thank you for using File Manager, ${name}, goodbye!`);
            console.log(`You are currently in ${fullPath}`);
            exit()
        }
        if (command === 'up') {
            currentNumberPath --;
            const currentPath = normalize(fullPath.split(sep).slice(0, currentNumberPath).join(/\./));
            console.log(`You are currently in ${currentPath}`);
        }
        if (command === 'ls') {
            readdir(fullPath, (err, files) => {
                // console.table(fil);
            })
        }
        console.error('Invalid input')
    })
    process.on('SIGINT', () => {
        console.log(`You are currently in ${fullPath}`);
        console.log(`Thank you for using File Manager, ${name}, goodbye!`)
        exit()
    })
}
await welcome()
