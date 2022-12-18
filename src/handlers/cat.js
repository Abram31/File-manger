import { failed } from "../common/constants.js";
import { createReadStream } from 'fs';
import { normalize } from "path";


export const cat = (path) => {
    try {
        const readableStream = createReadStream(normalize(`${path}`));
        readableStream.on('data', (chunk) => {
            console.log(chunk.toString());
        })
    } catch {
        failed()
    }
}