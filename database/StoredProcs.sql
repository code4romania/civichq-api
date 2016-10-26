DELIMITER //
CREATE PROCEDURE `InsertTags`(
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

   END;//

   DELIMITER //
   CREATE PROCEDURE `AddApp`(
IN apname varchar(100) CHARSET utf8 ,
IN categoryid int,
IN appwebsite varchar(1000),
IN appfacebook varchar(1000),
IN appgithub varchar(1000),
IN appdescription varchar(1000)  CHARSET utf8 ,
IN appcreationdate date,
IN applogo varchar(50),
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
IN ngologo varchar(50))
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
		applogo,
		apptags,
		0);
        
        CALL InsertTags(apptags);

SET message = 'success';
SELECT message as 'result';

COMMIT;
	
END;//
 