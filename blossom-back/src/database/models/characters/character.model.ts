import { DataTypes, Sequelize } from 'sequelize';
import BaseModel from '../base.model';

class Character extends BaseModel {}

export default function (sequelize: Sequelize): typeof Character {
  // Initialize base attributes like id, createdAt, updatedAt, deletedAt
  Character.initBaseAttributes(sequelize);

  // Define model-specific attributes and configuration
  Character.init(
    {
      status: {
        type: DataTypes.ENUM,
        values: ['Alive', 'Dead', 'unknown'],
      },
      species: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.ENUM,
        values: ['Female', 'Male', 'Genderless', 'unknown'],
      },
      name: {
        type: DataTypes.STRING,
      },
      image_path: {
        type: DataTypes.STRING,
      },
      is_starred: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      origin: {
        type: DataTypes.JSON,
      },
    },
    {
      sequelize: sequelize,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
  );

  return Character;
}
