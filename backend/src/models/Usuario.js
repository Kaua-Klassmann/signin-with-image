import { Model, DataTypes } from "sequelize";

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },

        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        senha: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
      }
    );
  }
}

export default Usuario;
