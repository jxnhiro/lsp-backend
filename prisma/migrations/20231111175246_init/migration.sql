-- DropForeignKey
ALTER TABLE `PesanKendaraan` DROP FOREIGN KEY `PesanKendaraan_kendaraan_id_fkey`;

-- DropForeignKey
ALTER TABLE `PesanKendaraan` DROP FOREIGN KEY `PesanKendaraan_pesan_id_fkey`;

-- AddForeignKey
ALTER TABLE `PesanKendaraan` ADD CONSTRAINT `PesanKendaraan_pesan_id_fkey` FOREIGN KEY (`pesan_id`) REFERENCES `Pesan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PesanKendaraan` ADD CONSTRAINT `PesanKendaraan_kendaraan_id_fkey` FOREIGN KEY (`kendaraan_id`) REFERENCES `Kendaraan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
