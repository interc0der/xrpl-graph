//see: http://dev.apollodata.com/tools/graphql-tools/resolvers.html

import controller from "../../controller/graphql";

const resolvers = {
    Query: {
        getAllExchanges: () => {
            return controller.getAllExchanges()
        },
        getAllPrices: () => {
            return controller.getAllPrices()
        },
        getAllVolumes: () => {
            return controller.getAllVolumes()
        },
        getPrice: (root:any, args:any, context:any, info:any) => {
            return controller.getPrice(args.asset)
        }
    },
    Mutation: {
        resetTimeSeries: () => {},
        forgetPassword: () => {},
        updateUser: () => {},
        deleteUser: () => {},
        register: () => {},
        login: () => {},
        createUser: () => {},
        refreshTokens: () => {}
    }
};

export default resolvers