
import express, { Express, Request, Response } from 'express'
import { Interoracle } from '../helpers/ws'
import constants from '../helpers/constants'
import process from '../helpers/process'
import { request } from '../../index'

import { tempFilterExchange } from 'src/interface'

const getAllExchanges  = () => {
    let clean:any =  process.organizeByExchange(request)
    let array = clean.map((exchange: string[][]) => {
        return exchange[1][0]
    })

    let flaged = constants.trackedExchanges.map((exchange: string) => {
        let index:tempFilterExchange={}
        if (array.indexOf(exchange) > -1) {
            index[exchange] = true
        }

        if (array.indexOf(exchange) == -1) {
            index[exchange] = false
        }

        return index
    })

    let pairs = constants.trackedExchanges.map((exchange: string, i:number) => {
        let index:tempFilterExchange={}
        if (array.indexOf(exchange) > -1) {
            index.exchange = exchange;
            index.active = true;
            index.pairs = clean[i].map((tracked: string[], j:number)=>{
                if (j==0) return
                return tracked[2]+"_"+tracked[3]
            }).filter(Boolean);
        }

        if (array.indexOf(exchange) == -1) {
            index.exchange = exchange;
            index.active = false;
            index.pairs = [];
        }

        return index
    })

    return ({
        activeExchanges: array, 
        exchanges: flaged,
        activeExchangePairs: pairs
    })
}

const getAllPrices = async () => {

    let array:any[] = []

    await Promise.all(
        constants.trackedCurrencies.map((token:string):void => {
    
            let data = Interoracle.prototype[token]
            let binanceWeight = constants.binanceWeights[token]
        
            let priceWeightSumAvgMean = 0;
            
            let weightsArray = []
            weightsArray.push(binanceWeight);
            
            let remainingWeight = 100 - binanceWeight;
            let zeroPriceElements = 0;
        
            for (let i = 0; i < data[0].length; i++) {
                if (data[0][i] != undefined ) zeroPriceElements++;
            }
        
            for (let i = 0; i < data[0].length; i++) {
        
                if (data[0][i] != undefined) {
                    weightsArray[i] = (remainingWeight / zeroPriceElements);
                }
        
                //PURE MEAN AVERAGE PRICE
                if (data[0][i] != undefined) {
                    priceWeightSumAvgMean += data[0][i];
                }
            }
        
            array.push({ 
                asset: token, 
                base: 'USD',
                ticker: `${token}_USD`,
                timestamp: Date.now(),
                price: (priceWeightSumAvgMean / (zeroPriceElements+1)).toFixed(6)
            })
        }))

    return array
}

const getAllVolumes = async () => {

    let array:any[] = []

    await Promise.all(
        constants.trackedCurrencies.map((token:string):void => {

        let priceWeightSum = 0;
        let weightSum = 0;
        let priceWeightSumAvg = 0;
        let priceWeightSumAvgMean = 0;
        let weightSumAvg = 0;

        let data = Interoracle.prototype[token]
        let binanceWeight = constants.binanceWeights[token]

        let weightsArray = []
        weightsArray.push(binanceWeight);

        let remainingWeight = 100 - binanceWeight;
        let zeroPriceElements = 0;

        for (let i = 1; i < data[0].length; i++) {
            if (data[0][i] != undefined ) zeroPriceElements++;
        }

        for (let i = 0; i < data[0].length; i++) {

            if (data[0][i] != undefined) {
                weightsArray[i] = (remainingWeight / zeroPriceElements);
            }

            //PURE MEAN AVERAGE PRICE
            if (data[0][i] != undefined) {
            priceWeightSumAvgMean += data[0][i];
            }

            //FIXED MEAN AVERAGE PRICE
            if (data[0][i] != undefined) {
            priceWeightSumAvg += (data[0][i] * data[2][i]);
            weightSumAvg += data[2][i];
            }

            //VOL WEIGHT AVERAGE PRICE
            if (data[0][i] != undefined && data[1][i] != undefined) {
                priceWeightSum += (data[0][i] * data[1][i]);
                weightSum += data[1][i];
            }
        }

        array.push({ 
            asset: token, 
            base: 'USD',
            ticker: `${token}_USD`,
            timestamp: Date.now(),
            price: (priceWeightSumAvgMean / (zeroPriceElements+1)).toFixed(6),
            volume: weightSum
        })
    }))

return array
}

const getPrice = (token: string) => {

    let prices = Interoracle.prototype[token]
    let binanceWeight = constants.binanceWeights[token]

    let priceWeightSumAvgMean = 0;
    
    let weightsArray = []
    weightsArray.push(binanceWeight);
    
    let remainingWeight = 100 - binanceWeight;
    let zeroPriceElements = 0;

    for (let i = 0; i < prices[0].length; i++) {
        if (prices[0][i] != undefined ) zeroPriceElements++;
    }

    for (let i = 0; i < prices[0].length; i++) {

        if (prices[0][i] != undefined) {
            weightsArray[i] = (remainingWeight / zeroPriceElements);
        }

        //PURE MEAN AVERAGE PRICE
        if (prices[0][i] != undefined) {
            priceWeightSumAvgMean += prices[0][i];
        }
    }

    return ({ 
        asset: token, 
        base: 'USD',
        ticker: `${token}_USD`,
        timestamp: Date.now(),
        price: (priceWeightSumAvgMean / (zeroPriceElements+1)).toFixed(6)
    })
} 

export default {
    getAllExchanges,
    getAllPrices,
    getAllVolumes,
    getPrice
}