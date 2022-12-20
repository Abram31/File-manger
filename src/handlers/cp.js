import { resolve, parse, isAbsolute, relative } from 'node:path';
import { failed } from '../common/constants.js';
import { createReadStream, createWriteStream } from 'fs';
import { cwd } from 'node:process';


export const cp = (filesPath) => {
    try {
        let readableStream;
        if (isAbsolute(filesPath[0])) {

            readableStream = createReadStream(resolve(filesPath[0]));
        } else {
            readableStream = createReadStream(resolve(cwd(), resolve(filesPath[0])));

        }
        const { base } = parse(filesPath[0])
        readableStream.on('error', () => failed())

        const writeableStream = createWriteStream(resolve(filesPath[1], base));
        readableStream.pipe(writeableStream)

        console.info(`You are currently in ${cwd()}`);
        console.log(`File copied from ${resolve(filesPath[0])} to ${resolve(filesPath[1])}`);
    } catch (err) {
        failed()
    }
}