import { DataTypes } from "sequelize";

const Pembayaran = {
  bayar: DataTypes.STRING,
  keterangan: DataTypes.STRING,
  tanggal_bayar: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  nomer_pembayaran: DataTypes.STRING,
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
};

export default Pembayaran;
