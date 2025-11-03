-- AlterTable
ALTER TABLE `Issue` ADD COLUMN `assignesToUserId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assignesToUserId_fkey` FOREIGN KEY (`assignesToUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
