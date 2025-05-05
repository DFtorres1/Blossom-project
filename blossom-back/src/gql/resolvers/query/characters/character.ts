import DB from '../../../../database';

const character = async ({ id }: { id: number }) => {
  return await DB.character.findByPk(id);
};

export default character
