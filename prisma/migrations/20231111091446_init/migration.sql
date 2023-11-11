/*
  Warnings:

  - You are about to drop the column `mobil_id` on the `Kendaraan` table. All the data in the column will be lost.
  - You are about to drop the column `motor_id` on the `Kendaraan` table. All the data in the column will be lost.
  - You are about to drop the column `truck_id` on the `Kendaraan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[kendaraan_id]` on the table `Mobil` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kendaraan_id]` on the table `Motor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kendaraan_id]` on the table `Truck` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `kendaraan_id` to the `Mobil` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kendaraan_id` to the `Motor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kendaraan_id` to the `Truck` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Kendaraan` DROP FOREIGN KEY `Kendaraan_mobil_id_fkey`;

-- DropForeignKey
ALTER TABLE `Kendaraan` DROP FOREIGN KEY `Kendaraan_motor_id_fkey`;

-- DropForeignKey
ALTER TABLE `Kendaraan` DROP FOREIGN KEY `Kendaraan_truck_id_fkey`;

-- AlterTable
ALTER TABLE `Kendaraan` DROP COLUMN `mobil_id`,
    DROP COLUMN `motor_id`,
    DROP COLUMN `truck_id`;

-- AlterTable
ALTER TABLE `Mobil` ADD COLUMN `kendaraan_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Motor` ADD COLUMN `kendaraan_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Truck` ADD COLUMN `kendaraan_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Mobil_kendaraan_id_key` ON `Mobil`(`kendaraan_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Motor_kendaraan_id_key` ON `Motor`(`kendaraan_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Truck_kendaraan_id_key` ON `Truck`(`kendaraan_id`);

-- AddForeignKey
ALTER TABLE `Mobil` ADD CONSTRAINT `Mobil_kendaraan_id_fkey` FOREIGN KEY (`kendaraan_id`) REFERENCES `Kendaraan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Motor` ADD CONSTRAINT `Motor_kendaraan_id_fkey` FOREIGN KEY (`kendaraan_id`) REFERENCES `Kendaraan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Truck` ADD CONSTRAINT `Truck_kendaraan_id_fkey` FOREIGN KEY (`kendaraan_id`) REFERENCES `Kendaraan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
