import DB from '../../../../database';
import logger from '../../../../utils/logger';

const updateIsStarred = async ({
  id,
  is_starred,
}: {
  id: number;
  is_starred: boolean;
}) => {
  const character = await DB.character.findByPk(id);
  if (!character) throw new Error('Character not found');
  logger.debug(character)
  character.set("is_starred", is_starred)
  await character.save();

  return character;
};

export default updateIsStarred;
