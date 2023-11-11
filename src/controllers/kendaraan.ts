import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import validator from "validator";

const client = new PrismaClient();

export async function getAllKendaraan(req, res, next) {
  let allKendaraan;
  try {
    allKendaraan = await client.kendaraan.findMany({
      include: {
        Mobil: true,
        Motor: true,
        Truck: true,
      },
    });
  } catch (err) {
    console.log(err);
  }
  res.status(200).json({
    message: "Sucessfully fetched all Kendaraan",
    data: allKendaraan,
  });

  await client.$disconnect;
}

export async function postKendaraan(req, res, next) {
  let kendaraan, error;

  switch (req.body.tipe_kendaraan) {
    case "MOBIL":
      try {
        kendaraan = await client.kendaraan.create({
          data: {
            model: req.body.model,
            tahun: req.body.tahun,
            jumlah_penumpang: req.body.jumlah_penumpang,
            manufaktur: req.body.manufaktur,
            harga: req.body.harga,
            tipe_kendaraan: req.body.tipe_kendaraan,
            Mobil: {
              create: {
                tipe_bahan_bakar: req.body.tipe_bahan_bakar,
                luas_bagasi: req.body.luas_bagasi,
              },
            },
          },
        });
      } catch (err) {
        error = err;
        console.log(err);
      }
      break;
    case "MOTOR":
      try {
        kendaraan = await client.kendaraan.create({
          data: {
            model: req.body.model,
            tahun: req.body.tahun,
            jumlah_penumpang: req.body.jumlah_penumpang,
            manufaktur: req.body.manufaktur,
            harga: req.body.harga,
            tipe_kendaraan: req.body.tipe_kendaraan,
            Motor: {
              create: {
                ukuran_bagasi: req.body.ukuran_bagasi,
                kapasitas_bensin: req.body.kapasitas_bensin,
              },
            },
          },
        });
      } catch (err) {
        error = err;
      }
      break;
    case "TRUCK":
      try {
        kendaraan = await client.kendaraan.create({
          data: {
            model: req.body.model,
            tahun: req.body.tahun,
            jumlah_penumpang: req.body.jumlah_penumpang,
            manufaktur: req.body.manufaktur,
            harga: req.body.harga,
            tipe_kendaraan: req.body.tipe_kendaraan,
            Truck: {
              create: {
                jumlah_roda_ban: req.body.jumlah_roda_ban,
                luas_area_kargo: req.body.luas_area_kargo,
              },
            },
          },
        });
      } catch (err) {
        error = err;
      }
      break;
  }

  await client.$disconnect;

  if (kendaraan) {
    return res.status(201).json({
      message: "Successfully added Kendaraan",
      data: kendaraan,
    });
  }

  return res.status(422).json({
    message: "Failed to add Kendaraan",
    error: error,
  });
}
