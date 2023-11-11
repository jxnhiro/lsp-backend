-- CreateTable
CREATE TABLE `Kendaraan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `model` VARCHAR(191) NOT NULL,
    `tahun` INTEGER NOT NULL,
    `jumlah_penumpang` INTEGER NOT NULL,
    `manufaktur` VARCHAR(191) NOT NULL,
    `harga` DOUBLE NOT NULL,
    `tipe_kendaraan` ENUM('MOBIL', 'MOTOR', 'TRUCK') NOT NULL,
    `mobil_id` INTEGER NULL,
    `motor_id` INTEGER NULL,
    `truck_id` INTEGER NULL,

    UNIQUE INDEX `Kendaraan_mobil_id_key`(`mobil_id`),
    UNIQUE INDEX `Kendaraan_motor_id_key`(`motor_id`),
    UNIQUE INDEX `Kendaraan_truck_id_key`(`truck_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mobil` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipe_bahan_bakar` VARCHAR(191) NOT NULL,
    `luas_bagasi` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Motor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ukuran_bagasi` DOUBLE NOT NULL,
    `kapasitas_bensin` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Truck` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jumlah_roda_ban` INTEGER NOT NULL,
    `luas_area_kargo` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `nomor_ponsel` VARCHAR(191) NOT NULL,
    `id_card` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pesan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kendaraan_id` INTEGER NOT NULL,
    `customer_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Kendaraan` ADD CONSTRAINT `Kendaraan_mobil_id_fkey` FOREIGN KEY (`mobil_id`) REFERENCES `Mobil`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kendaraan` ADD CONSTRAINT `Kendaraan_motor_id_fkey` FOREIGN KEY (`motor_id`) REFERENCES `Motor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kendaraan` ADD CONSTRAINT `Kendaraan_truck_id_fkey` FOREIGN KEY (`truck_id`) REFERENCES `Truck`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pesan` ADD CONSTRAINT `Pesan_kendaraan_id_fkey` FOREIGN KEY (`kendaraan_id`) REFERENCES `Kendaraan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pesan` ADD CONSTRAINT `Pesan_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
