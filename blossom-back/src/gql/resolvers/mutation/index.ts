import deleteCharacter from './characters/deleteCharacter.mutation';
import updateIsStarred from './characters/updateIsStarred.mutation';

// Map mutation names to their resolver functions
const mutationResolvers = {
  updateIsStarred,
  deleteCharacter,
};

export default mutationResolvers;
