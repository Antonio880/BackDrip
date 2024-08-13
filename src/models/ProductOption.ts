import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Product from "./Product";

class ProductOption extends Model {
  public id!: number;
  public productId!: number;
  public optionName!: string;
  public optionValue!: string;
}

ProductOption.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    optionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    optionValue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "product_options",
  }
);

ProductOption.belongsTo(Product, { foreignKey: "productId" });

export default ProductOption;
