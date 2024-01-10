import { DataTypes } from "sequelize";

const Pembayaran = {
  bayar: DataTypes.STRING,
  keterangan: DataTypes.STRING,
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
};

export default Pembayaran;
