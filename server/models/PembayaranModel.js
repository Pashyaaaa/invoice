import { DataTypes } from "sequelize";

const Pembayaran = {
  bayar: DataTypes.STRING,
  keterangan: DataTypes.STRING,
  tanggal_bayar: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
};

export default Pembayaran;
