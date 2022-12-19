import { resolve, parse } from 'node:path';
import { failed } from '../common/constants.js';
import { createReadStream, createWriteStream } from 'fs';
import { unlink } from 'node:fs';
import { pipeline } from 'node:stream/promises'

export const mv = async (filesPath) => {
    try {
        const { base } = parse(filesPath[0])

        const readableStream = createReadStream(resolve(filesPath[0]));
        readableStream.on('error', () => failed())
        const writeableStream = createWriteStream(resolve(filesPath[1], base));
        await pipeline(readableStream, writeableStream)
        unlink(resolve(filesPath[0]), () => { })

        console.log(`File moved from ${resolve(filesPath[0])} to ${resolve(filesPath[1])}`);
    } catch (err) {
        failed()
    }
}