import DB from '../../../../database';

// Resolver to fetch a single character by its primary key (id)
const character = async ({ id }: { id: number }) => {
  return await DB.character.findByPk(id);
};

export default character
