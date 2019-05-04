import * as _ from "lodash";
import readline from "readline";
import { BetCalculator } from "./bet/bet-calculator";
import { FILTERING_LIST } from "./data/bet-type";
import { IBettingResult } from "./model/betting-result";
import { IPlay } from "./model/play.model";
import { IStanding } from "./model/standing";

export class App {
    // tslint:disable-next-line:no-empty
    constructor() {
    }

    public init() {
        const bettingList = [];
        let bettingResultObj: IStanding;

        // Read Each line
        readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false,
        }).on("line", ((line) => {
            let bettingObj: IPlay;
            if (line.split(":")[0] === "Result") {
                bettingResultObj = { firstPlace: line.split(":")[1], secondPlace: line.split(":")[2], thirdPlace: line.split(":")[3] };
            } else {
                bettingObj = { product: line.split(":")[1], selection: line.split(":")[2], stake: Number(line.split(":")[3]) };
            }
            bettingList.push(bettingObj);
        }))
            .on("close", () => {
                const resultObj = {} as IBettingResult;
                const betCalcObj = new BetCalculator();

                // Calculations for Win, Place and Exacta.
                for (let i = 0; i < FILTERING_LIST.length; i++) {
                    const betTypeObj = FILTERING_LIST[i];
                    resultObj[betTypeObj.poolfieldName] = betCalcObj.calcPoolMoney(bettingList, betTypeObj);
                    resultObj[betTypeObj.stakeByTypeFieldName] = betCalcObj.getStakeBySelectionType(bettingList, betTypeObj);
                    resultObj[betTypeObj.uniqueStakeBySelection] = betCalcObj.sumofAllStakeBySelectionType(resultObj, betTypeObj);
                    betCalcObj.getRateAndWinningAmount(resultObj, betTypeObj);

                }

                const winner = _.find(resultObj.uniqueWinningStakeBySelection, { selection: bettingResultObj.firstPlace });
                const firstPlace = _.find(resultObj.uniquePlaceStakeBySelection, { selection: bettingResultObj.firstPlace });
                const secondPlace = _.find(resultObj.uniquePlaceStakeBySelection, { selection: bettingResultObj.secondPlace });
                const thirdPlace = _.find(resultObj.uniquePlaceStakeBySelection, { selection: bettingResultObj.thirdPlace });
                const exacta = _.find(resultObj.uniqueExactaStakeBySelection, { selection: "2,3" });

                console.log(`Win:${bettingResultObj.firstPlace}:$${winner.rate}`);
                console.log(`Place:${bettingResultObj.firstPlace}:$${firstPlace.rate}`);
                console.log(`Place:${bettingResultObj.secondPlace}:$${secondPlace.rate}`);
                console.log(`Place:${bettingResultObj.thirdPlace}:$${thirdPlace.rate}`);
                console.log(`Exacta:${exacta.selection}:$${exacta.rate}`);
                process.exit(0);
            });
    }
}
