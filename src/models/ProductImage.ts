import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Product from "./Product";

class ProductImage extends Model {
  public id!: number;
  public productId!: number;
  public imageUrl!: string;
}

ProductImage.init(
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
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "product_images",
  }
);

ProductImage.belongsTo(Product, { foreignKey: "productId" });

export default ProductImage;
