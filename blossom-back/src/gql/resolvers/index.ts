import mutationResolvers from './mutation';
import queryResolver from './query';

const root = {
  ...queryResolver,
  ...mutationResolvers,
};

export default root;
