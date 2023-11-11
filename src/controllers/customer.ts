import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export async function getAllCustomers(req, res, next) {
  let customers;
  try {
    customers = await client.customer.findMany();
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to fetch customers: Internal Server Error',
    });
  }

  return res.status(200).json({
    message: 'Successfully fetched users',
    data: customers,
  });
}

export async function getCustomer(req, res, next) {
  let customerId = req.params.customerId;

  let user;
  try {
    user = await client.customer.findFirst({
      where: {
        id_card: customerId,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to fetch user',
    });
  }

  return res.status(200).json({
    message: 'Successfully fetched user',
    data: user,
  });
}

export async function editCustomer(req, res, next) {
  let customerId = req.params.customerId;
  console.log(customerId);
  let user;
  try {
    user = await client.customer.update({
      where: {
        id_card: customerId,
      },
      data: {
        nama: req.body.nama,
        alamat: req.body.alamat,
        nomor_ponsel: req.body.nomor_ponsel,
        id_card: req.body.id_card,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Failed to update user',
    });
  }

  return res.status(200).json({
    message: 'Successfully updated user',
    data: user,
  });
}

export async function deleteCustomer(req, res, next) {
  let customerId = req.params.customerId;

  let user;
  try {
    user = await client.customer.delete({
      where: {
        id_card: String(customerId),
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Failed to delete user',
    });
  }

  return res.status(200).json({
    message: 'Successfully deleted user',
    data: user,
  });
}
