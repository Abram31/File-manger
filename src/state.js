import { cwd } from 'process';
import { normalize, sep } from 'path';

export const state = {
    name: '',
    fullPath: cwd(),
    currentNumberPath: 0,
    currentPath: () =>
        state.currentNumberPath
            ? normalize(state.fullPath.split(sep).slice(0, state.currentNumberPath).join(/\./))
            : state.fullPath,
    dirContent: '',
}