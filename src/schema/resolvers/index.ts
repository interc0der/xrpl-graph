import controller from '../../controller/xrpl.controller';

const resolvers = {
  Query: {
    getPing: () => {
      return controller.ping();
    },
  },
  Mutation: {
    test: () => {},
  },
};

export default resolvers;
