import { parse, resolve } from 'node:path'
import { failed } from '../common/constants.js'
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'node:zlib'
import { cwd } from 'node:process';

export const compress = (pathsFile) => {
    try {
        const filePath = resolve(pathsFile[0]);

        const { base } = parse(pathsFile[0])
        const nameNewFile = `${base}.br` 
        const dstPath = resolve(pathsFile[1], nameNewFile);

        const input = createReadStream(resolve(filePath), 'utf-8');
        const output = createWriteStream(resolve(dstPath));
        const brotli = createBrotliCompress();

        input.pipe(brotli).pipe(output);
        console.info(`You are currently in ${cwd()}`);

        console.info(`Created new compressed file - ${nameNewFile} `)
    } catch {
        failed()
    }
}