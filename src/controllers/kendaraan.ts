import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import validator from 'validator';
import path from 'path';

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
    message: 'Sucessfully fetched all Kendaraan',
    data: allKendaraan,
  });

  await client.$disconnect;
}

export async function putKendaraan(req, res, next) {
  console.log(req.body);
  req.body.tahun = Number(req.body.tahun);
  req.body.jumlah_penumpang = Number(req.body.jumlah_penumpang);
  req.body.harga = Number(req.body.harga);
  req.body.luas_bagasi = Number(req.body.luas_bagasi);
  req.body.ukuran_bagasi = Number(req.body.ukuran_bagasi);
  req.body.kapasitas_bensin = Number(req.body.kapasitas_bensin);
  req.body.jumlah_roda_ban = Number(req.body.jumlah_roda_ban);
  req.body.luas_area_kargo = Number(req.body.luas_area_kargo);

  let kendaraan, error;
  if (req.files) {
    const { gambar } = req.files;
    const pictureName = `${Date.now()}.jpg`;
    const picturePath = path.join(__dirname, '..', 'public', pictureName);
    gambar.mv(picturePath);

    switch (req.body.tipe_kendaraan) {
      case 'MOBIL':
        try {
          kendaraan = await client.kendaraan.update({
            where: {
              id: Number(req.params.kendaraanId),
            },
            data: {
              model: req.body.model,
              tahun: req.body.tahun,
              jumlah_penumpang: req.body.jumlah_penumpang,
              manufaktur: req.body.manufaktur,
              harga: req.body.harga,
              gambar: pictureName,
              tipe_kendaraan: req.body.tipe_kendaraan,
              Mobil: {
                update: {
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
      case 'MOTOR':
        try {
          kendaraan = await client.kendaraan.update({
            where: {
              id: req.params.kendaraanId,
            },
            data: {
              model: req.body.model,
              tahun: req.body.tahun,
              jumlah_penumpang: req.body.jumlah_penumpang,
              manufaktur: req.body.manufaktur,
              harga: req.body.harga,
              gambar: pictureName,
              tipe_kendaraan: req.body.tipe_kendaraan,
              Motor: {
                update: {
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
      case 'TRUCK':
        try {
          kendaraan = await client.kendaraan.update({
            where: {
              id: req.params.kendaraanId,
            },
            data: {
              model: req.body.model,
              tahun: req.body.tahun,
              jumlah_penumpang: req.body.jumlah_penumpang,
              manufaktur: req.body.manufaktur,
              harga: req.body.harga,
              gambar: pictureName,
              tipe_kendaraan: req.body.tipe_kendaraan,
              Truck: {
                update: {
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
  } else {
    switch (req.body.tipe_kendaraan) {
      case 'MOBIL':
        try {
          kendaraan = await client.kendaraan.update({
            where: {
              id: Number(req.params.kendaraanId),
            },
            data: {
              model: req.body.model,
              tahun: req.body.tahun,
              jumlah_penumpang: req.body.jumlah_penumpang,
              manufaktur: req.body.manufaktur,
              harga: req.body.harga,
              tipe_kendaraan: req.body.tipe_kendaraan,
              Mobil: {
                update: {
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
      case 'MOTOR':
        try {
          kendaraan = await client.kendaraan.update({
            where: {
              id: req.params.kendaraanId,
            },
            data: {
              model: req.body.model,
              tahun: req.body.tahun,
              jumlah_penumpang: req.body.jumlah_penumpang,
              manufaktur: req.body.manufaktur,
              harga: req.body.harga,
              tipe_kendaraan: req.body.tipe_kendaraan,
              Motor: {
                update: {
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
      case 'TRUCK':
        try {
          kendaraan = await client.kendaraan.update({
            where: {
              id: req.params.kendaraanId,
            },
            data: {
              model: req.body.model,
              tahun: req.body.tahun,
              jumlah_penumpang: req.body.jumlah_penumpang,
              manufaktur: req.body.manufaktur,
              harga: req.body.harga,
              tipe_kendaraan: req.body.tipe_kendaraan,
              Truck: {
                update: {
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
  }

  await client.$disconnect;

  if (kendaraan) {
    return res.status(201).json({
      message: `Successfully modified Kendaraan ${req.params.kendaraanId}`,
      data: kendaraan,
    });
  }

  return res.status(422).json({
    message: 'Failed to modify Kendaraan',
    error: error,
  });
}

export async function deleteKendaraan(req, res, next) {
  let kendaraanId = req.params.kendaraanId;
  let kendaraan, error;
  try {
    kendaraan = await client.kendaraan.delete({
      where: { id: Number(kendaraanId) },
    });
  } catch (err) {
    error = err;
  }

  if (kendaraan) {
    return res.status(200).json({
      message: `Successfully deleted Kendaraan ${req.params.kendaraanId}`,
      data: kendaraan,
    });
  }
  console.log(error);
  return res.status(422).json({
    message: 'Failed to delete Kendaraan',
    error: error,
  });
}

export async function postKendaraan(req, res, next) {
  let kendaraan, error;
  const { gambar } = req.files;
  const pictureName = `${Date.now()}.jpg`;
  const picturePath = path.join(__dirname, '..', 'public', pictureName);
  gambar.mv(picturePath);
  switch (req.body.tipe_kendaraan) {
    case 'MOBIL':
      try {
        kendaraan = await client.kendaraan.create({
          data: {
            model: req.body.model,
            tahun: Number(req.body.tahun),
            jumlah_penumpang: Number(req.body.jumlah_penumpang),
            manufaktur: req.body.manufaktur,
            harga: Number(req.body.harga),
            gambar: pictureName,
            tipe_kendaraan: req.body.tipe_kendaraan,
            Mobil: {
              create: {
                tipe_bahan_bakar: req.body.tipe_bahan_bakar,
                luas_bagasi: Number(req.body.luas_bagasi),
              },
            },
          },
        });
      } catch (err) {
        error = err;
        console.log(err);
      }
      break;
    case 'MOTOR':
      try {
        kendaraan = await client.kendaraan.create({
          data: {
            model: req.body.model,
            tahun: Number(req.body.tahun),
            jumlah_penumpang: Number(req.body.jumlah_penumpang),
            manufaktur: req.body.manufaktur,
            harga: Number(req.body.harga),
            gambar: pictureName,
            tipe_kendaraan: req.body.tipe_kendaraan,
            Motor: {
              create: {
                ukuran_bagasi: Number(req.body.ukuran_bagasi),
                kapasitas_bensin: Number(req.body.kapasitas_bensin),
              },
            },
          },
        });
      } catch (err) {
        error = err;
      }
      break;
    case 'TRUCK':
      try {
        kendaraan = await client.kendaraan.create({
          data: {
            model: req.body.model,
            tahun: Number(req.body.tahun),
            jumlah_penumpang: Number(req.body.jumlah_penumpang),
            manufaktur: req.body.manufaktur,
            harga: Number(req.body.harga),
            gambar: pictureName,
            tipe_kendaraan: req.body.tipe_kendaraan,
            Truck: {
              create: {
                jumlah_roda_ban: Number(req.body.jumlah_roda_ban),
                luas_area_kargo: Number(req.body.luas_area_kargo),
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
      message: 'Successfully added Kendaraan',
      data: kendaraan,
    });
  }

  return res.status(422).json({
    message: 'Failed to add Kendaraan',
    error: error,
  });
}
