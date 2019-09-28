ALTER TABLE `civichq`.`Apps` ADD COLUMN `IsArchived` TINYINT(1) NULL DEFAULT 0 AFTER `IsMaster`;

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
IN ngologo varchar(150),
IN appisactive tinyint(1),
IN appisarchived tinyint(1))
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
		`Logo`,
		`Tags`,
		`IsMaster`,
		`IsActive`,
		`IsArchived`)
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
		applogo,
		apptags,
		0,
		appisactive,
		0);

        CALL InsertTags(apptags);

SET message = 'success';
SELECT message as 'result';

COMMIT;

END$$

DELIMITER ;
