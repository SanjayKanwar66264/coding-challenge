import { expect } from "chai";
import {BetCalculator} from "./bet-calculator";

describe("Get Money for Win", () => {
    const betCalcObj = new BetCalculator();
    const list = [
        { product: "W", selection: "1", stake: 10 },
        { product: "W", selection: "2", stake: 20 },
        { product: "P", selection: "1", stake: 220 },
        { product: "P", selection: "2", stake: 40 },
        { product: "E", selection: "2,1", stake: 20 },
        { product: "E", selection: "2,3", stake: 30 },
    ];

    const filteringList = [{type: "W", poolfieldName: "winPoolMoney", rate: 15, stakeByTypeFieldName:  "winningStakeByType", uniqueStakeBySelection: "uniqueWinningStakeBySelection" },
                        {type: "P", poolfieldName: "placePoolMoney", rate: 12, stakeByTypeFieldName:  "placeStakeByType", uniqueStakeBySelection: "uniquePlaceStakeBySelection" },
                        {type: "E", poolfieldName: "exactaPoolMoney", rate: 18, stakeByTypeFieldName:  "exactaStakeByType", uniqueStakeBySelection: "uniqueExactaStakeBySelection" },
                        ];

    it("calculate win pool money", () => {
        expect(betCalcObj.calcPoolMoney(list, filteringList[0])).to.equal(25.5);
    });

    it("calculate place pool money", () => {
        expect(betCalcObj.calcPoolMoney(list, filteringList[1])).to.equal(76.26666666666667);
    });

    it("calculate exacta pool money", () => {
        expect(betCalcObj.calcPoolMoney(list, filteringList[2])).to.equal(41);
    });

    it("calculate win stake by selection type", () => {
        const expectedResult = [[{product: "W", selection: "1", stake: 10}], [{product: "W", selection: "2", stake: 20}]];
        expect(betCalcObj.getStakeBySelectionType(list, filteringList[0])).to.deep.equal(expectedResult);
    });

    it("calculate place stake by selection type", () => {
        const expectedResult = [[{product: "P", selection: "1", stake: 220}], [{product: "P", selection: "2", stake: 40}]];
        expect(betCalcObj.getStakeBySelectionType(list, filteringList[1])).to.deep.equal(expectedResult);
    });

    it("calculate exacta stake by selection type", () => {
        const expectedResult = [[{product: "E", selection: "2,1", stake: 20}], [{product: "E", selection: "2,3", stake: 30}]];
        expect(betCalcObj.getStakeBySelectionType(list, filteringList[2])).to.deep.equal(expectedResult);
    });
});
