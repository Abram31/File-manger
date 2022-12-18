import { stat } from 'fs/promises';
import { normalize } from 'path';
import { cwd } from 'process';
import { failed } from './common/constants.js';
import { state } from './state.js';

export function FileDescription(name, type) {
    this.Name = name;
    this.Type = type;
}

export const dirContent = async (dataDir) => {
    try {

        const respDirContent = dataDir.map(async (file) => {
            const descFile = await stat(normalize(`${cwd()}${/\./}${file}`));
            if (descFile.isFile()) {
                return [file, 'file']
            } else {
                return [file, 'directory']
            }
        })
        state.dirContent = await Promise.allSettled(respDirContent);
        console.log(state.dirContent);
        const table = state.dirContent.map((description) => new FileDescription(description.value[0], description.value[1])
        )
        return table;
    } catch {
        failed()
    }
}