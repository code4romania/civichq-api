-- -----------------------------------------------------
-- procedure EditApp
-- ------------------------------------------------------
DELIMITER //
CREATE PROCEDURE EditApp
(
	IN `appid` int,
    IN `apname` varchar(100) CHARSET utf8 ,
	IN `categoryid` int,
	IN `appwebsite` varchar(1000),
	IN `appfacebook` varchar(1000),
	IN `appgithub` varchar(1000),
	IN `appdescription` varchar(1000)  CHARSET utf8 ,
	IN `appcreationdate` date,
	IN `applogo` VARCHAR(150),
	IN `apptags` varchar(1000),
	IN `ngname` varchar(100) CHARSET utf8  ,
	IN `ngophone` varchar(500),
	IN `ngoemail` varchar(500),
	IN `ngofacebook` varchar(1000),
	IN `ngogoogleplus` varchar(1000),
	IN `ngolinkedin` varchar(1000),
	IN `ngotwitter` varchar(1000),
	IN `ngoinstagram` varchar(1000),
	IN `ngodescription` varchar(500)  CHARSET utf8 ,
	IN `ngologo` VARCHAR(150),
    IN `ngoid` int,
	IN `appisactive` TINYINT(1)
)
BEGIN
DECLARE message VARCHAR(1999) DEFAULT '';
DECLARE existingAppId int default 0;
DECLARE existingNgoId int default 0;

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

 -- first check if new name existis on an app with a different id
 SELECT Id into existingAppId from Apps WHERE Id <> appid AND AppName = apname;

 IF existingAppId > 0 then

        SIGNAL SQLSTATE 'ERROR'
		SET MESSAGE_TEXT = 'Exista deja o aplicatie cu acest nume!';

 END IF;

 -- check if new ngo name exists on an ngo with a different id
SELECT n.Id into existingNgoId from Ngos n WHERE n.Id <> ngoid AND n.NgoName = ngname;
IF existingNgoId > 0 THEN

		SIGNAL SQLSTATE 'ERROR'
		SET MESSAGE_TEXT = 'Exista deja un NGO cu acest nume!';

END IF;


 -- update app
 Update Apps set
			AppName = apname,
            CategoryId = categoryid,
            Website = appwebsite,
            Facebook = appfacebook,
            GitHub = appgithub,
            Description = appdescription,
            CreationDate = appcreationdate,
            Logo = applogo,
            Tags = apptags,
			IsActive = appisactive

 where Id = appid;

 CALL InsertTags(apptags);


 -- update ngo
 update Ngos set
		NgoName = ngname,
        Phone = ngophone,
        Email = ngoemail,
        Facebook = ngofacebook,
        GooglePlus = ngogoogleplus,
        LinkedIn = ngolinkedin,
        Twitter = ngotwitter,
        Instagram = ngoinstagram,
        Description = ngodescription,
        Logo = ngologo

 where Id = ngoid;


SET message = 'success';
SELECT message as 'result';

COMMIT;

END; //
