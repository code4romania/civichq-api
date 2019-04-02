DROP TABLE IF EXISTS `civichq`.`Technologies` ;

CREATE TABLE IF NOT EXISTS `civichq`.`Technologies` (
  `Id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `TechName` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id` (`Id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;

INSERT INTO `Technologies` (`TechName`) VALUES ('Amazon Web Services');
INSERT INTO `Technologies` (`TechName`) VALUES ('Android');
INSERT INTO `Technologies` (`TechName`) VALUES ('Angular');
INSERT INTO `Technologies` (`TechName`) VALUES ('AngularJS');
INSERT INTO `Technologies` (`TechName`) VALUES ('Asp.Net');
INSERT INTO `Technologies` (`TechName`) VALUES ('Azure');
INSERT INTO `Technologies` (`TechName`) VALUES ('C');
INSERT INTO `Technologies` (`TechName`) VALUES ('C#');
INSERT INTO `Technologies` (`TechName`) VALUES ('C++');
INSERT INTO `Technologies` (`TechName`) VALUES ('CodeIgniter');
INSERT INTO `Technologies` (`TechName`) VALUES ('CSS');
INSERT INTO `Technologies` (`TechName`) VALUES ('Django');
INSERT INTO `Technologies` (`TechName`) VALUES ('HTML');
INSERT INTO `Technologies` (`TechName`) VALUES ('iOS');
INSERT INTO `Technologies` (`TechName`) VALUES ('Java');
INSERT INTO `Technologies` (`TechName`) VALUES ('JavaScript');
INSERT INTO `Technologies` (`TechName`) VALUES ('jQuery');
INSERT INTO `Technologies` (`TechName`) VALUES ('Laravel');
INSERT INTO `Technologies` (`TechName`) VALUES ('LinQ');
INSERT INTO `Technologies` (`TechName`) VALUES ('Linux');
INSERT INTO `Technologies` (`TechName`) VALUES ('Maven');
INSERT INTO `Technologies` (`TechName`) VALUES ('MongoDB');
INSERT INTO `Technologies` (`TechName`) VALUES ('Mysql');
INSERT INTO `Technologies` (`TechName`) VALUES ('Node.JS');
INSERT INTO `Technologies` (`TechName`) VALUES ('Objective-C');
INSERT INTO `Technologies` (`TechName`) VALUES ('Oracle');
INSERT INTO `Technologies` (`TechName`) VALUES ('Perl');
INSERT INTO `Technologies` (`TechName`) VALUES ('Php');
INSERT INTO `Technologies` (`TechName`) VALUES ('PostgreSQL');
INSERT INTO `Technologies` (`TechName`) VALUES ('Python-2.7');
INSERT INTO `Technologies` (`TechName`) VALUES ('Python-3.x');
INSERT INTO `Technologies` (`TechName`) VALUES ('Qt');
INSERT INTO `Technologies` (`TechName`) VALUES ('R');
INSERT INTO `Technologies` (`TechName`) VALUES ('ReactJS');
INSERT INTO `Technologies` (`TechName`) VALUES ('Ruby');
INSERT INTO `Technologies` (`TechName`) VALUES ('Ruby-On-Rails');
INSERT INTO `Technologies` (`TechName`) VALUES ('Scala');
INSERT INTO `Technologies` (`TechName`) VALUES ('Selenium');
INSERT INTO `Technologies` (`TechName`) VALUES ('Spring');
INSERT INTO `Technologies` (`TechName`) VALUES ('Sql-Server');
INSERT INTO `Technologies` (`TechName`) VALUES ('Sqlite');
INSERT INTO `Technologies` (`TechName`) VALUES ('Swift');
INSERT INTO `Technologies` (`TechName`) VALUES ('Swing');
INSERT INTO `Technologies` (`TechName`) VALUES ('Symfony');
INSERT INTO `Technologies` (`TechName`) VALUES ('Twitter-Bootstrap');
INSERT INTO `Technologies` (`TechName`) VALUES ('Typescript');
INSERT INTO `Technologies` (`TechName`) VALUES ('Vb.Net');
INSERT INTO `Technologies` (`TechName`) VALUES ('Vba');
INSERT INTO `Technologies` (`TechName`) VALUES ('Wordpress');
INSERT INTO `Technologies` (`TechName`) VALUES ('Wpf');
INSERT INTO `Technologies` (`TechName`) VALUES ('Xcode');