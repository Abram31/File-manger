import { failed } from "../common/constants.js";
import { createReadStream } from 'fs';
import { normalize } from "path";
import { cwd } from 'process';


export const cat = (path) => {
    try {
        const readableStream = createReadStream(normalize(`${path}`));
        readableStream.on('data', (chunk) => {
            console.log(chunk.toString());
        })
        console.info(`You are currently in ${cwd()}`);

    } catch {
        failed()
    }
}