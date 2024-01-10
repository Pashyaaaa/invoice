import { DATE, DataTypes } from "sequelize";

const Invoice = {
  name: DataTypes.STRING,
  number: DataTypes.STRING,
  address: DataTypes.STRING,
  day: DataTypes.STRING,
  check_in: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  check_out: DataTypes.DATE,
  total: DataTypes.STRING,
  sisa_bayar: {
    type: DataTypes.STRING,
    defaultValue: 0,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
};

export default Invoice;
