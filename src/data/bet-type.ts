import {RATES} from "./rate";

export const FILTERING_LIST =  [
    {type: "W", poolfieldName: "winPoolMoney", rate: RATES.win, stakeByTypeFieldName:  "winningStakeByType", uniqueStakeBySelection: "uniqueWinningStakeBySelection" },
    {type: "P", poolfieldName: "placePoolMoney", rate: RATES.place, stakeByTypeFieldName:  "placeStakeByType", uniqueStakeBySelection: "uniquePlaceStakeBySelection" },
    {type: "E", poolfieldName: "exactaPoolMoney", rate: RATES.exacta, stakeByTypeFieldName:  "exactaStakeByType", uniqueStakeBySelection: "uniqueExactaStakeBySelection" },
];
