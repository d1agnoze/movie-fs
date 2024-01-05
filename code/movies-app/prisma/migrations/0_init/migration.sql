-- CreateTable
CREATE TABLE `movies` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Release_Date` VARCHAR(255) NULL,
    `Title` VARCHAR(255) NULL,
    `Overview` TEXT NULL,
    `Popularity` FLOAT NULL,
    `Vote_Count` INTEGER NULL,
    `Vote_Average` FLOAT NULL,
    `Original_Language` VARCHAR(50) NULL,
    `Genre` VARCHAR(255) NULL,
    `Poster_Url` VARCHAR(255) NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

