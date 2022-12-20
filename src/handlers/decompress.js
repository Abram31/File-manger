import { parse, resolve } from 'node:path'
import { failed } from '../common/constants.js'
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliDecompress } from 'node:zlib'
import { cwd } from 'process';


export const decompress = (pathsFile) => {
    try {
        const filePath = resolve(pathsFile[0]);

        const { name } = parse(pathsFile[0])
        const dstPath = resolve(pathsFile[1], name);

        const input = createReadStream(resolve(filePath));
        const output = createWriteStream(resolve(dstPath), 'utf-8');
        const brotli = createBrotliDecompress();

        input.pipe(brotli).pipe(output);
        console.info(`You are currently in ${cwd()}`);
        console.info(`File - ${name} decompress `)
    } catch (err) {
        failed()
    }
}