import db from "../models/index.js";
import PDFDocument from "pdfkit-table";
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
        "nomer_invoice",
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
          attributes: [
            "id",
            "bayar",
            "keterangan",
            "tanggal_bayar",
            "invoice_id",
          ],
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
        "nomer_invoice",
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
          attributes: [
            "id",
            "bayar",
            "keterangan",
            "tanggal_bayar",
            "invoice_id",
          ],
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
  const { name, number, address, day, check_in, check_out, total } = req.body;
  const nomerInvoice = Math.round(Math.random() * 999999999);

  try {
    await Invoice.create({
      name: name,
      number: number,
      address: address,
      day: day,
      check_in: check_in,
      check_out: check_out,
      total: total,
      sisa_bayar: total,
      nomer_invoice: nomerInvoice,
    });

    res.status(201).json({ message: "Tagihan Berhasil Ditambahkan" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cant Add Invoice, Internal Server Error",
    });
  }
};

export const updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: "No Data Found" });
    }

    const { name, number, address, day, check_in, check_out, total } = req.body;

    const totalPembayaran = await Pembayaran.sum("bayar", {
      where: {
        invoice_id: req.params.id,
        isDeleted: false,
      },
    });

    const sisaBayar = total - totalPembayaran;

    await invoice.update({
      name: name,
      number: number,
      address: address,
      day: day,
      check_in: check_in,
      check_out: check_out,
      total: total,
      sisa_bayar: sisaBayar,
    });

    res.status(200).json({ message: "Data Invoice/Tagihan Telah diupdate" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
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

export const cetakInvoice = async (req, res) => {
  const { id } = req.params;
  try {
    const invoice = await Invoice.findByPk(id);

    if (!invoice) {
      return res.status(404).json({ error: "invoice/tagihan not found" });
    }

    const pdfPath = path.join(
      __dirname,
      "..",
      "public",
      `${invoice.nomer_invoice}${invoice.id}invoice_0024.pdf`
    );

    const doc = new PDFDocument({
      margin: 50,
    });
    const stream = fs.createWriteStream(pdfPath);

    doc.pipe(stream);

    const judul = "Invoice";
    const fontBold = "Helvetica-Bold";
    const fontItalic = "Helvetica-Oblique";

    doc.font(fontBold).fontSize(20).text(judul, { align: "center" });
    doc.moveDown();

    const invoiceCreatedAt = String(invoice.createdAt).substring(0, 15);
    doc.fontSize(9).text(`Kepada: ${invoice.name}`);
    doc.text(`Perihal: Tagihan`);
    doc.text(
      `Nomer Invoice: ${invoice.nomer_invoice}${invoice.id}invoice_0024`
    );
    doc.text(`Tanggal Tagihan: ${invoiceCreatedAt}`);
    doc.moveDown(8);

    const invoiceCheck_in = String(invoice.check_in).substring(0, 15);
    const invoiceCheck_out = String(invoice.check_out).substring(0, 15);
    const invoiceTotal = `Rp${invoice.total.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      "."
    )}`;

    const table = {
      headers: [
        { label: "Check In", property: "check_in", width: 150 },
        { label: "Check Out", property: "check_out", width: 150 },
        {
          label: "Jumlah hari",
          property: "jumlah_hari",
          width: 80,
          align: "right",
        },
        { label: "Total", property: "total", width: 135, align: "right" },
      ],
      datas: [
        {
          // options: { {{styling disini}} },
          check_in: invoiceCheck_in,
          check_out: invoiceCheck_out,
          jumlah_hari: {
            label: invoice.day,
            options: { align: "right" },
          },
          total: invoiceTotal,
        },
      ],
    };

    await doc.table(table, {
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(12),
      prepareRow: () => {
        doc.font("Helvetica").fontSize(10);
      },
    });

    // done!

    const tTerbilang = terbilang(parseInt(invoice.total), terbilangOptions);

    const totalTerbilang = tTerbilang.replace(/\w+/g, (word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    doc
      .font(fontBold)
      .text(`Terbilang: \n${totalTerbilang} Rupiah`, { align: "right" });

    doc.end();
    stream.on("finish", () => {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${invoice.nomer_invoice}${invoice.id}invoice_0024.pdf`
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
