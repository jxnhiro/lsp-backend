-- DropForeignKey
ALTER TABLE `Pesan` DROP FOREIGN KEY `Pesan_customer_id_fkey`;

-- AddForeignKey
ALTER TABLE `Pesan` ADD CONSTRAINT `Pesan_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id_card`) ON DELETE CASCADE ON UPDATE CASCADE;
