import character from './characters/character';
import characters from './characters/characters';

// Map query names to their resolver functions
const queryResolver = {
  character,
  characters,
};

export default queryResolver;
