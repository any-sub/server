-- DropForeignKey
ALTER TABLE `Job` DROP FOREIGN KEY `Job_jobConsumeId_fkey`;

-- DropForeignKey
ALTER TABLE `Job` DROP FOREIGN KEY `Job_jobReportId_fkey`;

-- DropForeignKey
ALTER TABLE `Job` DROP FOREIGN KEY `Job_jobSourceId_fkey`;

-- DropForeignKey
ALTER TABLE `JobConsume` DROP FOREIGN KEY `JobConsume_lookupId_fkey`;

-- DropForeignKey
ALTER TABLE `JobConsume` DROP FOREIGN KEY `JobConsume_partsId_fkey`;

-- DropForeignKey
ALTER TABLE `JobConsumeParts` DROP FOREIGN KEY `JobConsumeParts_descriptionLookupId_fkey`;

-- DropForeignKey
ALTER TABLE `JobConsumeParts` DROP FOREIGN KEY `JobConsumeParts_imageLookupId_fkey`;

-- DropForeignKey
ALTER TABLE `JobConsumeParts` DROP FOREIGN KEY `JobConsumeParts_titleLookupId_fkey`;

-- DropForeignKey
ALTER TABLE `JobConsumeParts` DROP FOREIGN KEY `JobConsumeParts_urlLookupId_fkey`;

-- DropForeignKey
ALTER TABLE `JobReport` DROP FOREIGN KEY `JobReport_descriptionReportId_fkey`;

-- DropForeignKey
ALTER TABLE `JobReport` DROP FOREIGN KEY `JobReport_imageReportId_fkey`;

-- DropForeignKey
ALTER TABLE `JobReport` DROP FOREIGN KEY `JobReport_titleReportId_fkey`;

-- DropForeignKey
ALTER TABLE `JobReport` DROP FOREIGN KEY `JobReport_urlReportId_fkey`;

-- AlterTable
ALTER TABLE `Work` ADD COLUMN `statusReason` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_jobSourceId_fkey` FOREIGN KEY (`jobSourceId`) REFERENCES `JobSource`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_jobConsumeId_fkey` FOREIGN KEY (`jobConsumeId`) REFERENCES `JobConsume`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_jobReportId_fkey` FOREIGN KEY (`jobReportId`) REFERENCES `JobReport`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobConsume` ADD CONSTRAINT `JobConsume_lookupId_fkey` FOREIGN KEY (`lookupId`) REFERENCES `Lookup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobConsume` ADD CONSTRAINT `JobConsume_partsId_fkey` FOREIGN KEY (`partsId`) REFERENCES `JobConsumeParts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobReport` ADD CONSTRAINT `JobReport_titleReportId_fkey` FOREIGN KEY (`titleReportId`) REFERENCES `ReportOptions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobReport` ADD CONSTRAINT `JobReport_imageReportId_fkey` FOREIGN KEY (`imageReportId`) REFERENCES `ReportOptions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobReport` ADD CONSTRAINT `JobReport_descriptionReportId_fkey` FOREIGN KEY (`descriptionReportId`) REFERENCES `ReportOptions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobReport` ADD CONSTRAINT `JobReport_urlReportId_fkey` FOREIGN KEY (`urlReportId`) REFERENCES `ReportOptions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobConsumeParts` ADD CONSTRAINT `JobConsumeParts_titleLookupId_fkey` FOREIGN KEY (`titleLookupId`) REFERENCES `Lookup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobConsumeParts` ADD CONSTRAINT `JobConsumeParts_imageLookupId_fkey` FOREIGN KEY (`imageLookupId`) REFERENCES `Lookup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobConsumeParts` ADD CONSTRAINT `JobConsumeParts_descriptionLookupId_fkey` FOREIGN KEY (`descriptionLookupId`) REFERENCES `Lookup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobConsumeParts` ADD CONSTRAINT `JobConsumeParts_urlLookupId_fkey` FOREIGN KEY (`urlLookupId`) REFERENCES `Lookup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
