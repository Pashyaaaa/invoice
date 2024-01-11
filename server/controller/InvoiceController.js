import db from "../models/index.js";
const Invoice = db.models.invoice;
const Pembayaran = db.models.pembayaran;

export const getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findAll({
      attributes: [
        "id",
        "name",
        "number",
        "address",
        "day",
        "check_in",
        "check_out",
        "total",
        "sisa_bayar",
        "createdAt",
      ],
      include: [
        {
          model: Pembayaran,
          as: "pembayaran",
          required: false,
          where: {
            isDeleted: false,
          },
          attributes: ["id", "bayar", "keterangan", "invoice_id"],
        },
      ],
      where: {
        isDeleted: false,
      },
    });
    res.json(invoice);
  } catch (error) {
    console.log(error);
  }
};

export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      attributes: [
        "id",
        "name",
        "number",
        "address",
        "day",
        "check_in",
        "check_out",
        "total",
        "sisa_bayar",
        "createdAt",
      ],
      include: [
        {
          model: Pembayaran,
          as: "pembayaran",
          required: false,
          where: {
            isDeleted: false,
          },
          attributes: ["id", "bayar", "keterangan", "invoice_id"],
        },
      ],
      where: {
        isDeleted: false,
        id: req.params.id,
      },
    });
    res.json(invoice);
  } catch (error) {
    console.log(error);
  }
};

export const addInvoice = async (req, res) => {
  const { name, number, address, day, check_in, check_out } = req.body;

  try {
    const harga = 1000000;

    const total = day * harga;

    await Invoice.create({
      name: name,
      number: number,
      address: address,
      day: day,
      check_in: check_in,
      check_out: check_out,
      total: total,
      sisa_bayar: total,
    });

    res.status(201).json({ message: "Tagihan Berhasil Ditambahkan" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cant Add Invoice, Internal Server Error",
    });
  }
};

export const deleteInvoice = async (req, res) => {
  const invoice = await Invoice.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!invoice) {
    return res.status(404).json({ message: "No Data Found" });
  }
  try {
    await invoice.update(
      {
        isDeleted: true,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(201).json({ message: "Tagihan Berhasil dihapus" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cant Delete Invoice, Internal Server Error",
    });
  }
};
