import controller from "../../controller/index"; 

const rootValue = {
        weightedAvg: (args:any) => {
            console.log(args)
            console.log(args.weightedAvg)
            controller.getWeightedAverage(args)
        },
        createMessage: (args:any) => {
            console.log(args) 
    }
};

export default rootValue