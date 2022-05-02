
import express, { Express, Request, Response } from 'express'
import { Interoracle } from '../helpers/ws'
import constants from '../helpers/constants'
import process from '../helpers/process'

const getWeightedAverage = (token: string) => {

    return Interoracle.prototype[token]

/*     let priceWeightSum = 0;
    let weightSum = 0;
    let priceWeightSumAvg = 0;
    let priceWeightSumAvgMean = 0;
    let weightSumAvg = 0;

    let weightsArray = []
    weightsArray.push(binanceWeight);

    let remainingWeight = 100 - binanceWeight;
    let zeroPriceElements = 0;

    for (let i = 0; i < data.length; i++) {
        if (data[i] != undefined ) zeroPriceElements++;
    }

    for (let i = 0; i < data.length; i++) {

        if (data[i] != undefined) {
            weightsArray[i] = (remainingWeight / zeroPriceElements);
        }

        //PURE MEAN AVERAGE PRICE
        if (data[i] != undefined) {
          priceWeightSumAvgMean += data[i];
        }
        }

        var mean = priceWeightSumAvgMean / (zeroPriceElements+1) */


/*     res.send({
            price: mean,
            array: data
        });
 */
    //return asset //PMAP Pure Mean Average Price */
}

/* const getWeightedAverage = async (req: Request, res: Response) => {

    let asset = req.params.token

    let data = Interoracle.prototype[asset]
    let binanceWeight = constants.binanceWeights[asset]

    let priceWeightSum = 0;
    let weightSum = 0;
    let priceWeightSumAvg = 0;
    let priceWeightSumAvgMean = 0;
    let weightSumAvg = 0;

    let weightsArray = []
    weightsArray.push(binanceWeight);

    let remainingWeight = 100 - binanceWeight;
    let zeroPriceElements = 0;

    for (let i = 0; i < data.length; i++) {
        if (data[i] != undefined ) zeroPriceElements++;
    }

    for (let i = 0; i < data.length; i++) {

        if (data[i] != undefined) {
            weightsArray[i] = (remainingWeight / zeroPriceElements);
        }

        //PURE MEAN AVERAGE PRICE
        if (data[i] != undefined) {
          priceWeightSumAvgMean += data[i];
        }

        //FIXED MEAN AVERAGE PRICE
        if (data[i] != undefined) {
          priceWeightSumAvg += (data[i] * weightsArray[i]);
          weightSumAvg += weightsArray[i];
        }

        //VOL WEIGHT AVERAGE PRICE
        if (data[i] != undefined && data[1][i] != undefined) {
            priceWeightSum += (data[i] * volumeArray[i]);
            weightSum += volumeArray[i];
          }
        }

        var mean = priceWeightSumAvgMean / (zeroPriceElements+1)
        var deviationSum = 0

        //Standard Deviation Calculation
        for (let i = 0; i < data.length; i++) {
          if (data[0][i] != undefined && volumeArray[i] != undefined) {
                stdArray[i] = (data[i] - mean);
          }
          if (stdArray[i] != undefined) {
                deviationSum += stdArray[i] ** 2
            }
          }
        
        var standardDeviation = Math.sqrt(deviationSum/(zeroPriceElements+1));
        var priceDeviationCount = 0;
        var priceDeviationSum = 0;

        //Standard Deviation Mean
        for (let i = 0; i < data.length; i++) {
          if (data[i] != undefined && Math.abs(stdArray[i]) < standardDeviation) {
                priceDeviationSum += data[0][i]
                priceDeviationCount++;
            }
          }

          //Price Reordering and then 50% median
          let priceSort = data.filter((index) => index != undefined).sort(function(a, b) {
                return a - b;
          });

          //Middle Median Mean Average Price
          let medianArray = priceSort.slice(Math.floor(priceSort.length/4),-Math.floor(priceSort.length/4))
          var medianSum = 0
          for (let i = 0; i < medianArray.length; i++) {
                  medianSum += medianArray[i]
              }

    return ([
            priceWeightSum / weightSum, //WVAP Weighted Volumn Average Price
            priceWeightSumAvg / weightSumAvg, //FMAP Fixed Mean Average Price
            priceWeightSumAvgMean / (zeroPriceElements+1), //PMAP Pure Mean Average Price
            priceDeviationSum / priceDeviationCount, //SDAP Pure Mean Average Price
            medianSum / medianArray.length, //Middle Median Mean Average Price
            volumeArray[0]*100/weightSum, ////Weight Determined Binance Weight
            binanceWeight, //Fixed Binance Weight
            standardDeviation, //Standard Deviation
            stdArray //Standard Deviation Meta
          ]) //* 100000;
} */


const resetTimeSeries = () => {

}


const controller = {
    getWeightedAverage,
    resetTimeSeries
}

export default controller