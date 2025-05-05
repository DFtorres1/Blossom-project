import DB from '../../../../database';
import logger from '../../../../utils/logger';

// Resolver to update a character's is_starred attribute
const updateIsStarred = async ({
  id,
  is_starred,
}: {
  id: number;
  is_starred: boolean;
}) => {
  // Check if character exists
  const character = await DB.character.findByPk(id);
  if (!character) throw new Error('Character not found');

  // Log character before updating
  logger.debug(character)

  // Update is_starred property
  character.set("is_starred", is_starred)
  await character.save();

  // Return updated character
  return character;
};

export default updateIsStarred;
