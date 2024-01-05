SET GLOBAL local_infile=1;
GRANT FILE ON *.* TO 'root'@'localhost';
FLUSH PRIVILEGES;

USE `MYSQL_DATABASE`;

CREATE DATABASE IF NOT EXISTS `MYSQL_DATABASE`;

CREATE TABLE
    movies (
        Id int NOT NULL AUTO_INCREMENT, 
        Release_Date VARCHAR(255),
        Title VARCHAR(255),
        Overview TEXT,
        Popularity FLOAT,
        Vote_Count INT,
        Vote_Average FLOAT,
        Original_Language VARCHAR(50),
        Genre VARCHAR(255),
        Poster_Url VARCHAR(255),
        PRIMARY KEY (Id)
    );

LOAD DATA INFILE '/dataset/dataset.csv' INTO TABLE movies FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\r\n'(
    Release_Date,
    Title,
    Overview,
    Popularity,
    Vote_Count,
    Vote_Average,
    Original_Language,
    Genre,
    Poster_Url
)