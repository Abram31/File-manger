import { resolve } from 'node:path';
import { createReadStream } from 'fs';
import { failed } from "../common/constants.js"
import { createHash } from 'node:crypto'
import { cwd } from 'process';



export const hash = async (pathToFile) => {
    try {
        let srcPath = resolve(pathToFile);
        const hash = createHash('sha256');
        const input = createReadStream(srcPath);
        input.on('readable', () => {
            const data = input.read();
            if (data)
                hash.update(data);
            else {
                console.log(`Hash ==> ${hash.digest('hex')}`);
            }
        });
        input.on('error', () => failed())
        console.info(`You are currently in ${cwd()}`);
    } catch (err) {
        failed()
    }
}