import { resolve, parse } from 'node:path';
import { failed } from '../common/constants.js';
import { createReadStream, createWriteStream } from 'fs';


export const cp = (filesPath) => {
    try {
        const { base } = parse(filesPath[0])

        const readableStream = createReadStream(resolve(filesPath[0]));
        readableStream.on('error', () => failed())

        const writeableStream = createWriteStream(resolve(filesPath[1], base));
        readableStream.pipe(writeableStream)

        console.log(`File copied from ${resolve(filesPath[0])} to ${resolve(filesPath[1])}`);
    } catch (err) {
        failed()
    }
}