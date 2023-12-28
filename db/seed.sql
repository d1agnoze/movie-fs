CREATE TABLE my_table (
   column1 datatype,
   column2 datatype,
   ...
);

LOAD DATA INFILE '/path/to/your/csv/file.csv'
INTO TABLE my_table
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\\n'
IGNORE 1 ROWS;
