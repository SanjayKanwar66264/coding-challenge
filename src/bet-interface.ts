import { IPlay } from "./model/play.model";

export interface IBet {
    calPoolMoney(list: IPlay[], betType: any, result: any): any;
    calStakeBySelectionType(list: any[], betType: any, result: any): any;
    sumofAllStakeBySelectionType(data: any[]): any;
    getRateAndWinningAmount(data: any[], item): any;
    getRateAndWinningAmountForEachPlaceBet(data: any[], item): any;
}
