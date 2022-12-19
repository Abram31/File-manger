import { EOL, cpus, homedir, userInfo, arch } from 'os';
import { failed } from '../common/constants.js';
import { cwd } from 'process';


export const os = (secondCommand) => {
    switch (secondCommand) {
        case ('--EOL'):
            console.info(`You are currently in ${cwd()}`);
            console.log(JSON.stringify(EOL));
            break;
        case ('--cpus'):
            function CPDescription(model, speed) {
                this.Model = model;
                this.Speed = speed;
            }
            function AmountCPUS(amountCPUS) {
                this.Amount_CPUS = amountCPUS;
            }
            const CP = cpus();
            const table = CP.map((processorDesc) =>
                new CPDescription(processorDesc.model.trim(),
                    `${(processorDesc.speed / 1000).toFixed(2)}GHz`)
            )
            console.info(`You are currently in ${cwd()}`);
            console.table(new AmountCPUS(CP.length));
            console.table(table);
            break;
        case ('--homedir'):
            console.info(`You are currently in ${cwd()}`);
            console.log(homedir());
            break;
        case ('--username'):
            console.info(`You are currently in ${cwd()}`);
            console.log(`Username - ${userInfo().username}`);
            break;
        case ('--architecture'):
            console.info(`You are currently in ${cwd()}`);
            console.log(`CPU architecture - ${arch()}`);
            break;
        default: failed()
    }
}