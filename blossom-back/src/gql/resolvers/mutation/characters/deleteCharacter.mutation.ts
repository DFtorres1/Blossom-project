import DB from '../../../../database';

// Resolver to delete a character by id
const deleteCharacter = async ({ id }: { id: number }) => {
  // Check if character exists
  const character = await DB.character.findByPk(id);
  if (!character) throw new Error('Character not found');

  // Soft delete the character
  await character.destroy();

  // Return deletion result message
  return { result: `Character with id ${id} deleted successfully.` };
};
export default deleteCharacter;
