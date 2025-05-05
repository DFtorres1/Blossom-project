import deleteCharacter from './characters/deleteCharacter.mutation';
import updateIsStarred from './characters/updateIsStarred.mutation';

const mutationResolvers = {
  updateIsStarred,
  deleteCharacter,
};

export default mutationResolvers;
