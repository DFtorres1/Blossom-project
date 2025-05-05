import { DataTypes, Model, Sequelize } from 'sequelize';

// Base model class to include default attributes and options
class BaseModel extends Model {
  // Common timestamp attributes
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  // Initialize base model attributes and configuration
  static initBaseAttributes(sequelize: Sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
      },
      {
        sequelize: sequelize,
        timestamps: true,         // Enable createdAt and updatedAt
        paranoid: true,           // Enable soft deletes via deletedAt
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
      },
    );
  }
}

export default BaseModel;
