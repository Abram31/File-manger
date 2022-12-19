import { resolve } from 'node:path';
import { createReadStream } from 'fs';
import { failed } from "../common/constants.js"
import { createHash } from 'node:crypto'


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

    } catch (err) {
        failed()
        console.log(err);
    }
}