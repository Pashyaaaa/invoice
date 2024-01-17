import db from "../models/index.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import terbilang from "terbilang";
const Invoice = db.models.invoice;
const Pembayaran = db.models.pembayaran;

const terbilangOptions = {
  output: { style: "text" },
  input: "number",
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getPembayaran = async (req, res) => {
  try {
    const response = await Pembayaran.findAll({
      attributes: [
        "id",
        "bayar",
        "keterangan",
        "tanggal_bayar",
        "nomer_pembayaran",
        "invoice_id",
      ],
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
            "nomer_invoice",
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
    const nomerPembayaran = Math.round(Math.random() * 999999999);

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
      nomer_pembayaran: nomerPembayaran,
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
    const invoice = await Invoice.findByPk(pembayaran.invoice_id);
    const nomerInvoice = invoice.nomer_invoice;

    if (!pembayaran) {
      return res
        .status(404)
        .json({ error: "Riwayat Pembayaran Tidak Ditemukan" });
    }

    const angkaRandom = Math.round(Math.random() * 9999);

    const pdfPath = path.join(
      __dirname,
      "..",
      "public",
      `${pembayaran.nomer_pembayaran}${pembayaran.id}pembayaran_0024.pdf`
    );

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(pdfPath);

    doc.pipe(stream);

    const judul = "Tanda Terima Pembayaran";
    const sub_judul = `Nomor: ${pembayaran.nomer_pembayaran}${pembayaran.id}pembayaran_0024`;
    const fontBold = "Helvetica-Bold";
    const fontBiasa = "Helvetica";
    const fontItalic = "Helvetica-Oblique";

    doc.font(fontBold).fontSize(25).text(judul, {
      align: "center",
    });
    doc
      .font(fontItalic)
      .fontSize(14)
      .text(sub_judul, {
        align: "center",
      })
      .moveDown(8);

    const bTerbilang = terbilang(parseInt(pembayaran.bayar), terbilangOptions);
    const bayarTerbilang = bTerbilang.replace(/\w+/g, (word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    const pembayaranTanggalBayar = String(pembayaran.tanggal_bayar).substring(
      0,
      15
    );

    doc
      .font(fontBiasa)
      .fontSize(16)
      .text(
        `Telah diterima sejumlah uang sebesar Rp${pembayaran.bayar.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          "."
        )} (${bayarTerbilang} Rupiah) Sebagai Dp/Lunas Terhadap Nomer Invoice:`,
        {
          width: 500,
          lineGap: 6,
        }
      )
      .font(fontBold)
      .text(`${nomerInvoice}Invoice_0024`, {
        align: "center",
      })

      .moveDown(15);

    doc.font(fontItalic).text(pembayaranTanggalBayar, {
      align: "right",
    });
    doc
      .text("Penerima,", {
        align: "right",
      })
      .moveDown(5);
    doc.text("(                                      )", {
      align: "right",
    });

    doc.end();
    stream.on("finish", () => {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${pembayaran.nomer_pembayaran}${pembayaran.id}pembayaran_0024.pdf`
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
