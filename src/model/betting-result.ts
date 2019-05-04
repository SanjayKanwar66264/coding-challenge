import { IPlay } from "./play.model";

export interface IBettingResult {
  winPoolMoney: number;
  winningStakeByType: IPlay[];
  uniqueWinningStakeBySelection: IPlay[];
  placePoolMoney: number;
  placeStakeByType: IPlay[];
  uniquePlaceStakeBySelection?: IPlay[];
  exactaPoolMoney: number;
  exactaStakeByType: IPlay[];
  uniqueExactaStakeBySelection: IPlay[];
  }
