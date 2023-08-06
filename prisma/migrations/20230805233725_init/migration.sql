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
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('http') NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL,
    `deleted` DATETIME(3) NULL,
    `sourceType` ENUM('html', 'json') NOT NULL,
    `sourceLocation` VARCHAR(191) NOT NULL,
    `consumeMode` ENUM('all', 'css', 'xpath', 'regex', 'jsonpath') NULL,
    `consumeValue` VARCHAR(191) NULL,
    `consumeTitleMode` ENUM('all', 'css', 'xpath', 'regex', 'jsonpath') NULL,
    `consumeTitleValue` VARCHAR(191) NULL,
    `consumeDescriptionMode` ENUM('all', 'css', 'xpath', 'regex', 'jsonpath') NULL,
    `consumeDescriptionValue` VARCHAR(191) NULL,
    `consumeImageMode` ENUM('all', 'css', 'xpath', 'regex', 'jsonpath') NULL,
    `consumeImageValue` VARCHAR(191) NULL,
    `consumeUrlMode` ENUM('all', 'css', 'xpath', 'regex', 'jsonpath') NULL,
    `consumeUrlValue` VARCHAR(191) NULL,
    `reportTitleMatch` VARCHAR(191) NULL,
    `reportTitleTemplate` VARCHAR(191) NULL,
    `reportDescriptionMatch` VARCHAR(191) NULL,
    `reportDescriptionTemplate` VARCHAR(191) NULL,
    `reportImageMatch` VARCHAR(191) NULL,
    `reportImageTemplate` VARCHAR(191) NULL,
    `reportUrlMatch` VARCHAR(191) NULL,
    `reportUrlTemplate` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Work` (
    `id` VARCHAR(191) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('PENDING', 'QUEUED', 'CANCELLED_ON_RESTART', 'FAILED_TO_QUEUE', 'FINISHED', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `statusReason` VARCHAR(191) NULL,
    `jobId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobState` (
    `id` VARCHAR(191) NOT NULL,
    `jobId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `url` VARCHAR(191) NULL,
    `unitHash` VARCHAR(191) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Work` ADD CONSTRAINT `Work_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Job`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobState` ADD CONSTRAINT `JobState_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Job`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
