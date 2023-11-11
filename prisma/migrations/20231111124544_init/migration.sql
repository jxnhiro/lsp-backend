/*
  Warnings:

  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `kendaraan_id` on the `Pesan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_card]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Pesan` DROP FOREIGN KEY `Pesan_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `Pesan` DROP FOREIGN KEY `Pesan_kendaraan_id_fkey`;

-- AlterTable
ALTER TABLE `Customer` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`id_card`);

-- AlterTable
ALTER TABLE `Pesan` DROP COLUMN `kendaraan_id`,
    MODIFY `customer_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `PesanKendaraan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pesan_id` INTEGER NOT NULL,
    `kendaraan_id` INTEGER NOT NULL,
    `jumlah_kendaraan` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Customer_id_card_key` ON `Customer`(`id_card`);

-- AddForeignKey
ALTER TABLE `Pesan` ADD CONSTRAINT `Pesan_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id_card`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PesanKendaraan` ADD CONSTRAINT `PesanKendaraan_pesan_id_fkey` FOREIGN KEY (`pesan_id`) REFERENCES `Pesan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PesanKendaraan` ADD CONSTRAINT `PesanKendaraan_kendaraan_id_fkey` FOREIGN KEY (`kendaraan_id`) REFERENCES `Kendaraan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
