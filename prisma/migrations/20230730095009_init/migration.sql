-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Job` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('http') NOT NULL,
    `jobSourceId` VARCHAR(191) NOT NULL,
    `jobConsumeId` VARCHAR(191) NOT NULL,
    `jobReportId` VARCHAR(191) NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Job_jobSourceId_key`(`jobSourceId`),
    UNIQUE INDEX `Job_jobConsumeId_key`(`jobConsumeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobSource` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('html', 'json') NOT NULL,
    `location` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobConsume` (
    `id` VARCHAR(191) NOT NULL,
    `lookupId` VARCHAR(191) NULL,
    `partsId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `JobConsume_lookupId_key`(`lookupId`),
    UNIQUE INDEX `JobConsume_partsId_key`(`partsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobReport` (
    `id` VARCHAR(191) NOT NULL,
    `titleReportId` VARCHAR(191) NULL,
    `imageReportId` VARCHAR(191) NULL,
    `descriptionReportId` VARCHAR(191) NULL,
    `urlReportId` VARCHAR(191) NULL,

    UNIQUE INDEX `JobReport_titleReportId_key`(`titleReportId`),
    UNIQUE INDEX `JobReport_imageReportId_key`(`imageReportId`),
    UNIQUE INDEX `JobReport_descriptionReportId_key`(`descriptionReportId`),
    UNIQUE INDEX `JobReport_urlReportId_key`(`urlReportId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReportOptions` (
    `id` VARCHAR(191) NOT NULL,
    `match` VARCHAR(191) NULL,
    `template` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobConsumeParts` (
    `id` VARCHAR(191) NOT NULL,
    `titleLookupId` VARCHAR(191) NULL,
    `imageLookupId` VARCHAR(191) NULL,
    `descriptionLookupId` VARCHAR(191) NULL,
    `urlLookupId` VARCHAR(191) NULL,

    UNIQUE INDEX `JobConsumeParts_titleLookupId_key`(`titleLookupId`),
    UNIQUE INDEX `JobConsumeParts_imageLookupId_key`(`imageLookupId`),
    UNIQUE INDEX `JobConsumeParts_descriptionLookupId_key`(`descriptionLookupId`),
    UNIQUE INDEX `JobConsumeParts_urlLookupId_key`(`urlLookupId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lookup` (
    `id` VARCHAR(191) NOT NULL,
    `mode` ENUM('all', 'css', 'xpath', 'regex', 'jsonpath') NOT NULL,
    `value` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Work` (
    `id` VARCHAR(191) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `jobId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_jobSourceId_fkey` FOREIGN KEY (`jobSourceId`) REFERENCES `JobSource`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_jobConsumeId_fkey` FOREIGN KEY (`jobConsumeId`) REFERENCES `JobConsume`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_jobReportId_fkey` FOREIGN KEY (`jobReportId`) REFERENCES `JobReport`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobConsume` ADD CONSTRAINT `JobConsume_lookupId_fkey` FOREIGN KEY (`lookupId`) REFERENCES `Lookup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobConsume` ADD CONSTRAINT `JobConsume_partsId_fkey` FOREIGN KEY (`partsId`) REFERENCES `JobConsumeParts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobReport` ADD CONSTRAINT `JobReport_titleReportId_fkey` FOREIGN KEY (`titleReportId`) REFERENCES `ReportOptions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobReport` ADD CONSTRAINT `JobReport_imageReportId_fkey` FOREIGN KEY (`imageReportId`) REFERENCES `ReportOptions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobReport` ADD CONSTRAINT `JobReport_descriptionReportId_fkey` FOREIGN KEY (`descriptionReportId`) REFERENCES `ReportOptions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobReport` ADD CONSTRAINT `JobReport_urlReportId_fkey` FOREIGN KEY (`urlReportId`) REFERENCES `ReportOptions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobConsumeParts` ADD CONSTRAINT `JobConsumeParts_titleLookupId_fkey` FOREIGN KEY (`titleLookupId`) REFERENCES `Lookup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobConsumeParts` ADD CONSTRAINT `JobConsumeParts_imageLookupId_fkey` FOREIGN KEY (`imageLookupId`) REFERENCES `Lookup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobConsumeParts` ADD CONSTRAINT `JobConsumeParts_descriptionLookupId_fkey` FOREIGN KEY (`descriptionLookupId`) REFERENCES `Lookup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobConsumeParts` ADD CONSTRAINT `JobConsumeParts_urlLookupId_fkey` FOREIGN KEY (`urlLookupId`) REFERENCES `Lookup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Work` ADD CONSTRAINT `Work_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Job`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
