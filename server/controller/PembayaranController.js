import db from "../models/index.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
const Invoice = db.models.invoice;
const Pembayaran = db.models.pembayaran;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getPembayaran = async (req, res) => {
  try {
    const response = await Pembayaran.findAll({
      attributes: ["id", "bayar", "keterangan", "tanggal_bayar", "invoice_id"],
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
  const { bayar, keterangan, tanggal_bayar, invoice_id } = req.body;
  try {
    const calInvoice = await Invoice.findByPk(invoice_id);

    if (!calInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    if (bayar > calInvoice.sisa_bayar) {
      return res.status(400).json({
        message:
          "Pembayaran tidak berhasil, Karena mencoba membayar lebih dari yang ditagih",
      });
    }

    // Menambahkan pembayaran
    const pembayaran = await Pembayaran.create({
      bayar: bayar,
      keterangan: keterangan,
      tanggal_bayar: tanggal_bayar,
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

export const cetakPembayaran = async (req, res) => {
  const { id } = req.params;
  try {
    const pembayaran = await Pembayaran.findByPk(id);

    if (!pembayaran) {
      return res.status(404).json({ error: "pembayaran not found" });
    }

    const angkaRandom = Math.round(Math.random() * 9999);

    const pdfPath = path.join(
      __dirname,
      "..",
      "public",
      `${angkaRandom}pembayaran_${pembayaran.id}.pdf`
    );

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(pdfPath);

    doc.pipe(stream);

    const namaWebsite = "Invoice Website";
    const fontBold = "Helvetica-Bold";
    const fontItalic = "Helvetica-Oblique";

    doc.font(fontBold).fontSize(20).text(namaWebsite, {
      align: "center",
    });
    doc.moveDown();

    doc.text(`pembayaran ID: ${pembayaran.id}`);
    doc.text(`Amount: ${pembayaran.bayar}`);
    doc.text(`Tanggal Bayar: ${pembayaran.tanggal_bayar}`);
    doc.text(`Keterangan: ${pembayaran.keterangan}`);

    doc.end();
    stream.on("finish", () => {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=pembayaran_${pembayaran.id}.pdf`
      );

      const fileStream = fs.createReadStream(pdfPath);
      fileStream.pipe(res);

      fileStream.on("end", () => {
        fs.unlinkSync(pdfPath);
      });
    });

    stream.on("error", (error) => {
      console.error(error);
      res.status(500).json({ error: "Error creating PDF" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deletePembayaran = async (req, res) => {
  const pembayaran = await Pembayaran.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!pembayaran) {
    return res.status(404).json({ message: "No Data Found" });
  }
  try {
    const response = await pembayaran.update({
      isDeleted: true,
    });

    const invoice = await Invoice.findOne({
      where: {
        id: response.invoice_id,
      },
    });

    const updateSisaBayar = Number(invoice.sisa_bayar) + Number(response.bayar);

    await invoice.update({
      sisa_bayar: updateSisaBayar,
    });
    res
      .status(201)
      .json({ message: "Data Produk Telah dihapus", changed: updateSisaBayar });
  } catch (error) {
    console.log(error);
  }
};
