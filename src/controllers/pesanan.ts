import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export async function getAllPesananForUser(req, res, next) {
  let customerId = req.params.customerId;

  let allPesanan;
  try {
    allPesanan = await client.pesanKendaraan.findMany({
      where: {
        Pesan: {
          customer_id: customerId,
        },
      },
      include: {
        Pesan: true,
        Kendaraan: true,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed Fetching Orders',
    });
  }

  res.status(200).json({
    message: `Successfully fetched orders for customer ${customerId}`,
    data: allPesanan,
  });
}
export async function addPesan(req, res, next) {
  const vehicleIdKeys = Object.keys(req.body).filter((key) =>
    key.includes('kendaraan_')
  );

  if (!vehicleIdKeys) {
    return res.status(500).json({
      message: 'Did not buy any vehicle',
    });
  }

  let sum = 0;
  for (let i = 0; i < vehicleIdKeys.length; i++) {
    sum += Number(req.body[vehicleIdKeys[i]]);
  }

  if (sum === 0) {
    return res.status(500).json({
      message: 'Did not buy any vehicle',
    });
  }

  let customer;
  customer = await client.customer.findFirst({
    where: {
      id_card: req.body.id_card,
    },
  });

  if (!customer) {
    try {
      customer = await client.customer.create({
        data: {
          id_card: req.body.id_card as string,
          nama: req.body.nama,
          nomor_ponsel: req.body.nomor_ponsel,
          alamat: req.body.alamat,
        },
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Failed Creating Customer: Internal server error',
      });
    }
  }

  let newOrder;

  if (customer) {
    try {
      newOrder = await client.pesan.create({
        data: {
          customer_id: customer.id_card as string,
        },
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  const vehicleIds = [];

  vehicleIdKeys.forEach((key) => {
    key = key.split('_')[1];
    vehicleIds.push(key);
  });

  console.log(vehicleIds);

  let orderVehicle;
  for (let i = 0; i < vehicleIds.length; i++) {
    try {
      orderVehicle = await client.pesanKendaraan.create({
        data: {
          pesan_id: newOrder.id,
          kendaraan_id: Number(vehicleIds[i]),
          jumlah_kendaraan: Number(req.body[vehicleIdKeys[i]]),
        },
      });
    } catch (err) {
      res.status(500).json({
        message: 'Failed Creating OrderVehicle',
      });
    }
  }

  res.status(200).json({
    message: 'Successfully created order',
    data: orderVehicle,
  });
}
