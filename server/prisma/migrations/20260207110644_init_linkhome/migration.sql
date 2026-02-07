-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Listing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ownerId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `isPureVeg` BOOLEAN NOT NULL DEFAULT true,
    `genderPref` VARCHAR(191) NOT NULL,
    `lifestyle` VARCHAR(191) NOT NULL,
    `availableFrom` VARCHAR(191) NOT NULL,
    `hasWifi` BOOLEAN NOT NULL DEFAULT false,
    `isFurnished` BOOLEAN NOT NULL DEFAULT false,
    `hasParking` BOOLEAN NOT NULL DEFAULT false,
    `hasGym` BOOLEAN NOT NULL DEFAULT false,
    `hasPool` BOOLEAN NOT NULL DEFAULT false,
    `hasAC` BOOLEAN NOT NULL DEFAULT false,
    `hasLaundry` BOOLEAN NOT NULL DEFAULT false,
    `hasBalcony` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
