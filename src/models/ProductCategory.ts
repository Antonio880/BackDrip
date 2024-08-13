import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Product from "./Product";
import Category from "./Category";

class ProductCategory extends Model {
  public productId!: number;
  public categoryId!: number;
}

ProductCategory.init(
  {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "product_categories",
  }
);

Product.belongsToMany(Category, { through: ProductCategory });
Category.belongsToMany(Product, { through: ProductCategory });

export default ProductCategory;
