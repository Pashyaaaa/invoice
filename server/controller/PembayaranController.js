import { where } from "sequelize";
import db from "../models/index.js";
const Invoice = db.models.invoice;
const Pembayaran = db.models.pembayaran;

export const getPembayaran = async (req, res) => {
  try {
    const response = await Pembayaran.findAll({
      attributes: ["id", "bayar", "keterangan", "invoice_id"],
      where: {
        isDeleted: false,
      },
      include: [
        {
          model: Invoice,
          as: "invoice",
          attributes: [
            "name",
            "number",
            "day",
            "check_in",
            "check_out",
            "createdAt",
          ],
        },
      ],
    });
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cant Get Pembayaran, Internal Server Error",
    });
  }
};

export const addPembayaran = async (req, res) => {
  const { bayar, keterangan, invoice_id } = req.body;
  try {
    // Mengambil data invoice berdasarkan ID
    const calInvoice = await Invoice.findOne({
      where: {
        id: invoice_id,
      },
    });

    // Memastikan invoice dengan ID yang diberikan benar-benar ada
    if (!calInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // Memeriksa apakah pembayaran lebih dari sisa tagihan
    if (bayar > calInvoice.sisa_bayar) {
      return res.status(400).json({
        message:
          "Pembayaran Tidak berhasil, Karena Membayar lebih dari yang ditagih",
      });
    }

    // Menambahkan pembayaran
    const pembayaran = await Pembayaran.create({
      bayar: bayar,
      keterangan: keterangan,
      invoice_id: invoice_id,
    });

    // Mengupdate sisa tagihan pada invoice
    const sisa_bayar = calInvoice.sisa_bayar - bayar;
    await Invoice.update(
      {
        sisa_bayar: sisa_bayar,
      },
      {
        where: {
          id: invoice_id,
        },
      }
    );
    res.status(201).json({ message: "Terbayar! Berhasil Ditambahkan" });
  } catch (error) {
    console.log(error);
    res.json({ message: error });
    res.status(500).json({
      message: "Cant Add Pembayaran, Internal Server Error",
    });
  }
};
