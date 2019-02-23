SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema civichq
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `civichq` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `civichq` ;

-- -----------------------------------------------------
-- Table `civichq`.`Apps`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `civichq`.`Apps` ;

CREATE TABLE IF NOT EXISTS `civichq`.`Apps` (
  `Id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `AppName` VARCHAR(100) NULL DEFAULT NULL,
  `IsApproved` INT(11) NULL DEFAULT NULL,
  `AddedDate` DATE NULL DEFAULT NULL,
  `NgoId` INT(11) NULL DEFAULT NULL,
  `CategoryId` INT(11) NULL DEFAULT NULL,
  `Website` VARCHAR(1000) NULL DEFAULT NULL,
  `Facebook` VARCHAR(1000) NULL DEFAULT NULL,
  `GitHub` VARCHAR(1000) NULL DEFAULT NULL,
  `Description` VARCHAR(1000) NULL DEFAULT NULL,
  `CreationDate` DATE NULL DEFAULT NULL,
  `Logo` VARCHAR(150) NULL DEFAULT NULL,
  `Tags` VARCHAR(150) NULL DEFAULT NULL,
  `Technologies` VARCHAR(150) NULL DEFAULT NULL,
  `IsMaster` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id` (`Id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `civichq`.`Categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `civichq`.`Categories` ;

CREATE TABLE IF NOT EXISTS `civichq`.`Categories` (
  `Id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `CatName` VARCHAR(100) NULL DEFAULT NULL,
  `IsActive` INT(11) NULL DEFAULT NULL,
  `Ordinal` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id` (`Id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `civichq`.`Ngos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `civichq`.`Ngos` ;

CREATE TABLE IF NOT EXISTS `civichq`.`Ngos` (
  `Id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `NgoName` VARCHAR(100) NULL DEFAULT NULL,
  `Phone` VARCHAR(500) NULL DEFAULT NULL,
  `Email` VARCHAR(500) NULL DEFAULT NULL,
  `Facebook` VARCHAR(1000) NULL DEFAULT NULL,
  `GooglePlus` VARCHAR(1000) NULL DEFAULT NULL,
  `LinkedIn` VARCHAR(1000) NULL DEFAULT NULL,
  `Twitter` VARCHAR(1000) NULL DEFAULT NULL,
  `Instagram` VARCHAR(1000) NULL DEFAULT NULL,
  `Description` VARCHAR(1000) NULL DEFAULT NULL,
  `Logo` VARCHAR(150) NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id` (`Id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `civichq`.`Tags`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `civichq`.`Tags` ;

CREATE TABLE IF NOT EXISTS `civichq`.`Tags` (
  `Id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `Tag` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id` (`Id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `civichq`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `civichq`.`Users` ;

CREATE TABLE IF NOT EXISTS `civichq`.`Users` (
  `Id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `UserName` VARCHAR(100) NULL DEFAULT NULL,
  `Password` VARCHAR(200) NULL DEFAULT NULL,
  `isActive` INT(11) NULL DEFAULT NULL,
  `isAdmin` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id` (`Id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

USE `civichq` ;

-- -----------------------------------------------------
-- procedure AddApp
-- -----------------------------------------------------

USE `civichq`;
DROP procedure IF EXISTS `civichq`.`AddApp`;

DELIMITER $$
USE `civichq`$$
CREATE PROCEDURE `AddApp`(
IN apname varchar(100) CHARSET utf8 ,
IN categoryid int,
IN appwebsite varchar(1000),
IN appfacebook varchar(1000),
IN appgithub varchar(1000),
IN appdescription varchar(1000)  CHARSET utf8 ,
IN appcreationdate date,
IN apptechnologies varchar(1000),
IN applogo varchar(150),
IN apptags varchar(1000),
IN ngname varchar(100) CHARSET utf8  ,
IN ngophone varchar(500),
IN ngoemail varchar(500),
IN ngofacebook varchar(1000),
IN ngogoogleplus varchar(1000),
IN ngolinkedin varchar(1000),
IN ngotwitter varchar(1000),
IN ngoinstagram varchar(1000),
IN ngodescription varchar(500)  CHARSET utf8 ,
IN ngologo varchar(150))
BEGIN
DECLARE ngoId INT DEFAULT 0;
DECLARE appId INT DEFAULT 0;
DECLARE message VARCHAR(1999) DEFAULT '';

DECLARE exit handler for sqlexception
	BEGIN
    -- ERROR


        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE,
		@errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
		SET message = CONCAT("ERROR ", @errno, " (", @sqlstate, "): ", @text);
		SELECT message as 'result';


        ROLLBACK;

	END;

START TRANSACTION;


    SELECT Id into ngoId from Ngos where NgoName = ngname;
    SET message := CONCAT(message, ' Ngo id este ',  coalesce(ngoId, 'null'));
	-- SELECT message AS msg;

	SET message := CONCAT(message, ' Getting app id ');
    SELECT Id into appId from Apps where AppName = apname;
	SET message := CONCAT(message, ' App id este ',  coalesce(appId, 'null'));
	-- SELECT message AS msg;

    IF ngoId = 0 THEN

		SET message := CONCAT(message, ' Insert Ngo ');

        INSERT Ngos(NgoName, Phone, Email, Facebook, GooglePlus, LinkedIn, Twitter, Instagram, Description, Logo)
        values (ngname, ngophone, ngoemail, ngofacebook, ngogoogleplus, ngolinkedin, ngotwitter, ngoinstagram, ngodescription, ngologo);

        SET ngoId := last_insert_id();
        SET message := CONCAT(message, ' Ngo id NOU este ',  coalesce(ngoId, 'null'));
		-- SELECT message AS msg;

    END IF;


    IF appId > 0 THEN

		SIGNAL SQLSTATE 'ERROR'
		SET MESSAGE_TEXT = 'Aplicatia exista deja!';

    END IF;

       INSERT INTO `Apps`
		(
		`AppName`,
		`IsApproved`,
		`AddedDate`,
		`NgoId`,
		`CategoryId`,
		`Website`,
		`Facebook`,
		`GitHub`,
		`Description`,
		`CreationDate`,
		`Technologies`,
		`Logo`,
		`Tags`,
		`IsMaster`)
		VALUES
		(
		apname,
		0,
		NOW(),
		ngoId,
		categoryid,
		appwebsite,
		appfacebook,
		appgithub,
		appdescription,
		appcreationdate,
		apptechnologies,
		applogo,
		apptags,
		0);

        CALL InsertTags(apptags);

SET message = 'success';
SELECT message as 'result';

COMMIT;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure InsertTags
-- -----------------------------------------------------

USE `civichq`;
DROP procedure IF EXISTS `civichq`.`InsertTags`;

DELIMITER $$
USE `civichq`$$
CREATE  PROCEDURE `InsertTags`(
IN theString varchar(1000) CHARSET utf8
)
BEGIN
	DECLARE message VARCHAR(1999) DEFAULT '';


	DECLARE exit handler for sqlexception
	BEGIN
    -- ERROR
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE,
		@errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
		SET message = CONCAT(message, "ERROR ", @errno, " (", @sqlstate, "): ", @text);
		SELECT message as 'result';

	END;

		SET @delim = '#';
        SET theString := (SELECT SUBSTRING(theString, 2));
		-- SET message := CONCAT(message, ' newString2: ', theString);
        -- SELECT message as 'result';

        SET @Occurrences = LENGTH(theString) - LENGTH(REPLACE(theString, @delim, ''));
        -- SET message := CONCAT(message, ' Occurences: ', @Occurrences);
        -- SELECT message as 'result';
        myloop: WHILE (@Occurrences > 0)
        DO
            SET @myValue = TRIM(SUBSTRING_INDEX(theString, @delim, 1));
            -- SET message := CONCAT(message, ' MyValue: ', @myValue);
            -- SELECT message as 'result';

            IF (@myValue != '') THEN

                IF NOT exists (select 1 from Tags where Tag = CONCAT('#', @myValue)) THEN
					INSERT Tags(Tag) VALUES (CONCAT('#', @myValue));
                END IF;

            ELSE
                LEAVE myloop;
            END IF;
            SET @Occurrences = LENGTH(theString) - LENGTH(REPLACE(theString, @delim, ''));
            IF (@occurrences = 0) THEN
                LEAVE myloop;
            END IF;
            SET theString = SUBSTRING(theString,LENGTH(SUBSTRING_INDEX(theString, @delim, 1))+2);
        END WHILE;

   END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- Initial Users --
INSERT INTO `Users` VALUES ('3', 'code4', 'aa708ef36100823453c7d7d09f915e21281f7fe3af342d322874afd82b766a97d5dc671cbcc7368f22a21f3982f94251fc74eee92ded07a359ebe8b079448f6c', b'1', b'1'), ('4', 'sentinel', '546a7f97b8a81a1fcee3e47700393bc3972d1ef44bb8cfad9a9b18a880bbf3969327a410de2000aa92ed3a1a81984dfa92150a716f1a5ca3fdb3538da3bb3389', b'1', b'0');
SET FOREIGN_KEY_CHECKS = 1;
--------------------------

-- Standard Categories --
INSERT INTO `Categories` VALUES ('1', 'Social', b'1', '10'), ('2', 'Educație', b'1', '20'), ('3', 'Mediu', b'1', '30'), ('4', 'Transparență', b'1', '40'), ('5', 'Politic', b'1', '50'), ('6', 'Servicii', b'1', '60');
--------------------------