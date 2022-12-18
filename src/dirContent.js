import { stat } from 'fs/promises';
import { normalize } from 'path';
import { state } from './state.js';

export function FileDescription(name, type) {
    this.Name = name;
    this.Type = type;
}

export const dirContent = async (dataDir) => {
    
    const respDirContent = dataDir.map(async (file) => {
        const descFile = await stat(normalize(`${state.currentPath()}${/\./}${file}`));
        if (descFile.isFile()) {
            return [file, 'file']
        } else {
            return [file, 'directory']
        }
    })
    state.dirContent = await Promise.allSettled(respDirContent);
    const table = state.dirContent.map((description) => new FileDescription(description.value[0], description.value[1])
    )
    return table;
}