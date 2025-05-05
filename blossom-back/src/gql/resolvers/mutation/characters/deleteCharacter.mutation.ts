import DB from '../../../../database';

const deleteCharacter = async ({ id }: { id: number }) => {
  const character = await DB.character.findByPk(id);
  if (!character) throw new Error('Character not found');

  await character.destroy();

  return { result: `Character with id ${id} deleted successfully.` };
};
export default deleteCharacter;
