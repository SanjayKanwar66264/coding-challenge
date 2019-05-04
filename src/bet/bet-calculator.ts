import * as _ from "lodash";

export class BetCalculator {

    /**
     *
     * @param bettingList [Read the full betting list provided]
     * @param item [each betting Type (win, place and exacta)]
     */
    public calcPoolMoney(bettingList, item) {
        const sumOfBets = _.sumBy(_.filter(bettingList, ["product", item.type]), "stake");
        if (item.type === "P") {
            return (sumOfBets - (item.rate * sumOfBets / 100)) / 3;
        }
        return (sumOfBets - (item.rate * sumOfBets / 100));
    }

    /**
     *
     * @param bettingList [Read the full betting list provided]
     * @param item [each betting Type (win, place and exacta)]
     */
    public getStakeBySelectionType(bettingList, item) {
        const totalStake = _.groupBy(_.filter(bettingList, ["product", item.type]), "selection");
        const stakeType = [];
        for (const key in totalStake) {
            stakeType.push(totalStake[key]);
        }
        return stakeType;
    }

    /**
     *
     * @param resultObj [object containing the calculated values]
     * @param item [each betting Type (win, place and exacta)]
     */
    public sumofAllStakeBySelectionType(resultObj, item) {
        const winningStakeArray = [];
        const stakeByType = resultObj[item.stakeByTypeFieldName];
        for (let i = 0; i < stakeByType.length; i++) {
            for (let j = 0; j < stakeByType[i].length; j++) {
                winningStakeArray.push({amountWon: 0, product: stakeByType[i][j].product, rate: 0,
                selection: stakeByType[i][j].selection, stake: _.sumBy(stakeByType[i], "stake")});
            }
        }
        return (_.uniqBy(winningStakeArray, "selection"));
    }
    /**
     *
     * @param resultObj [object containing the calculated values]
     * @param item [each betting Type (win, place and exacta)]
     */
    public getRateAndWinningAmount(resultObj, item) {
        const uniqueStake = resultObj[item.uniqueStakeBySelection];
        const winPoolMoney = resultObj[item.poolfieldName];
        for (let k = 0; k < uniqueStake.length; k++) {
            if (item.type === "P") {
                uniqueStake[k].rate = (resultObj.placePoolMoney / resultObj.uniquePlaceStakeBySelection[k].stake).toFixed(2);
            } else {
                uniqueStake[k].rate = ((winPoolMoney - uniqueStake[k].stake) / uniqueStake[k].stake + 1).toFixed(2);
            }
            uniqueStake[k].amountWon = (uniqueStake[k].stake * uniqueStake[k].rate).toFixed(2);
        }
        return resultObj;
    }
}
