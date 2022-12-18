import { chdir, cwd } from 'process';
import { normalize, sep } from 'path';

export const state = {
    name: '',
    fullPath: '',
    currentNumberPath: 0,
    indexCurrentElement: () => state.fullPath.split(sep).length - Math.abs(state.currentNumberPath),
    currentPath: () =>
        state.currentNumberPath
            ? normalize(state.fullPath.split(sep).slice(0, state.currentNumberPath).join(/\./))
            : state.fullPath,
    dirContent: '',
}