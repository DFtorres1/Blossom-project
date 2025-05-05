import DB from '../../../..//database';
import { CharacterDTO } from '../../../../gql/dto/character.dto';
import { Op, WhereAttributeHash, Order } from 'sequelize';

const characters = async (args: CharacterDTO) => {
  const where: WhereAttributeHash = {};

  if (args.id) where.id = args.id;
  if (args.name) where.name = { [Op.like]: `%${args.name}%` };
  if (args.status) where.status = args.status;
  if (args.species) where.species = args.species;
  if (args.gender) where.gender = args.gender;
  if (args.is_starred !== undefined) where.is_starred = args.is_starred;

  const order: Order = [];
  if (args.order_by) {
    order.push([args.order_by, args.order_direction || 'ASC']);
  }

  const result = DB.character.findAll({
    where,
    order,
  });

  return result;
};

export default characters;
