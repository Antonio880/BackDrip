import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Product from "./Product";

class ProductImage extends Model {
  public id!: number;
  public productId!: number;
  public path!: string;
  public enabled!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    }
  },
  {
    sequelize,
    tableName: "product_images",
    timestamps: true,
  }
);

ProductImage.belongsTo(Product, { foreignKey: "productId" });

export default ProductImage;
