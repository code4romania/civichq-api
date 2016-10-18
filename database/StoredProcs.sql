CREATE PROCEDURE `InsertTags`(
IN theString varchar(1000)
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

   END;
   
CREATE PROCEDURE `InsertTags`(
IN theString varchar(1000)
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

   END;
   
   