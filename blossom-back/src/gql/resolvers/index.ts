import mutationResolvers from './mutation';
import queryResolver from './query';

// Combine query and mutation resolvers into a single root object
const root = {
  ...queryResolver,
  ...mutationResolvers,
};

export default root;
