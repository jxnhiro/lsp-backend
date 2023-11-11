-- DropForeignKey
ALTER TABLE `Mobil` DROP FOREIGN KEY `Mobil_kendaraan_id_fkey`;

-- DropForeignKey
ALTER TABLE `Motor` DROP FOREIGN KEY `Motor_kendaraan_id_fkey`;

-- DropForeignKey
ALTER TABLE `Truck` DROP FOREIGN KEY `Truck_kendaraan_id_fkey`;

-- AddForeignKey
ALTER TABLE `Mobil` ADD CONSTRAINT `Mobil_kendaraan_id_fkey` FOREIGN KEY (`kendaraan_id`) REFERENCES `Kendaraan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Motor` ADD CONSTRAINT `Motor_kendaraan_id_fkey` FOREIGN KEY (`kendaraan_id`) REFERENCES `Kendaraan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Truck` ADD CONSTRAINT `Truck_kendaraan_id_fkey` FOREIGN KEY (`kendaraan_id`) REFERENCES `Kendaraan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
