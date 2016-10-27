/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : islc

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2016-10-27 14:03:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `seq_no` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `part` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `grouping` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `username` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `acwsType` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `regTime` datetime DEFAULT NULL,
  `regIp` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `thisLoginTime` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `thisLoginIp` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lastLoginTime` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lastLoginIp` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `spare1` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `spare2` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`seq_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES ('10000', '3', null, '123456', 'admin', '1', null, '2016-10-27 14:01:11', null, null, null, null, null, null, null);
INSERT INTO `account` VALUES ('10001', '2', null, '123456', 'teacher', '1', null, '2016-10-27 14:02:14', null, null, null, null, null, null, null);
INSERT INTO `account` VALUES ('10002', '1', null, '123456', 'student', '1', null, '2016-10-27 14:03:09', null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for course_info
-- ----------------------------
DROP TABLE IF EXISTS `course_info`;
CREATE TABLE `course_info` (
  `seq_no` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `number` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `creat_time` datetime DEFAULT NULL,
  `class_status` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `class_time` datetime DEFAULT NULL,
  `class` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `related_data` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `related_question` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `accouat_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `remarks` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `source` int(11) DEFAULT NULL,
  `num1` int(11) DEFAULT NULL,
  `num2` int(11) DEFAULT NULL,
  `str1` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `str2` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date1` datetime DEFAULT NULL,
  `date2` datetime DEFAULT NULL,
  `domain_no` int(11) DEFAULT NULL,
  `operator_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `operator_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `operat_time` datetime DEFAULT NULL,
  `modifier_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `modifier_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `modifi_time` datetime DEFAULT NULL,
  PRIMARY KEY (`seq_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of course_info
-- ----------------------------

-- ----------------------------
-- Table structure for data_info
-- ----------------------------
DROP TABLE IF EXISTS `data_info`;
CREATE TABLE `data_info` (
  `seq_no` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `tata_type` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `data_url` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `number` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `up_time` datetime DEFAULT NULL,
  `accouat_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `remarks` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `source` int(11) DEFAULT NULL,
  `num1` int(11) DEFAULT NULL,
  `num2` int(11) DEFAULT NULL,
  `str1` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `str2` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date1` datetime DEFAULT NULL,
  `date2` datetime DEFAULT NULL,
  `domain_no` int(11) DEFAULT NULL,
  `operator_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `operator_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `operat_time` datetime DEFAULT NULL,
  `modifier_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `modifier_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `modifi_time` datetime DEFAULT NULL,
  PRIMARY KEY (`seq_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of data_info
-- ----------------------------

-- ----------------------------
-- Table structure for grouping_info
-- ----------------------------
DROP TABLE IF EXISTS `grouping_info`;
CREATE TABLE `grouping_info` (
  `seq_no` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `class` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `group` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `student` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `remarks` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `source` int(11) DEFAULT NULL,
  `num1` int(11) DEFAULT NULL,
  `num2` int(11) DEFAULT NULL,
  `str1` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `str2` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date1` datetime DEFAULT NULL,
  `date2` datetime DEFAULT NULL,
  `domain_no` int(11) DEFAULT NULL,
  `operator_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `operator_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `operat_time` datetime DEFAULT NULL,
  `modifier_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `modifier_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `modifi_time` datetime DEFAULT NULL,
  PRIMARY KEY (`seq_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of grouping_info
-- ----------------------------

-- ----------------------------
-- Table structure for menu_info
-- ----------------------------
DROP TABLE IF EXISTS `menu_info`;
CREATE TABLE `menu_info` (
  `seq_no` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `menu_name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `menu_link` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `menu_visible` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `parent_menu` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `remarks` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `source` int(11) DEFAULT NULL,
  `num1` int(11) DEFAULT NULL,
  `num2` int(11) DEFAULT NULL,
  `str1` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `str2` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date1` datetime DEFAULT NULL,
  `date2` datetime DEFAULT NULL,
  `domain_no` int(11) DEFAULT NULL,
  `operator_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `operator_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `operat_time` datetime DEFAULT NULL,
  `modifier_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `modifier_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `modifi_time` datetime DEFAULT NULL,
  PRIMARY KEY (`seq_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of menu_info
-- ----------------------------

-- ----------------------------
-- Table structure for operation_record
-- ----------------------------
DROP TABLE IF EXISTS `operation_record`;
CREATE TABLE `operation_record` (
  `seq_no` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `accouat_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `operation_type` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `record_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `remarks` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `source` int(11) DEFAULT NULL,
  `num1` int(11) DEFAULT NULL,
  `num2` int(11) DEFAULT NULL,
  `str1` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `str2` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date1` datetime DEFAULT NULL,
  `date2` datetime DEFAULT NULL,
  `domain_no` int(11) DEFAULT NULL,
  `operator_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `operator_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `operat_time` datetime DEFAULT NULL,
  `modifier_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `modifier_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `modifi_time` datetime DEFAULT NULL,
  PRIMARY KEY (`seq_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of operation_record
-- ----------------------------

-- ----------------------------
-- Table structure for questions_bank
-- ----------------------------
DROP TABLE IF EXISTS `questions_bank`;
CREATE TABLE `questions_bank` (
  `seq_no` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `question_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `audio_url` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `public` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `accouat_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `remarks` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `source` int(11) DEFAULT NULL,
  `num1` int(11) DEFAULT NULL,
  `num2` int(11) DEFAULT NULL,
  `str1` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `str2` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date1` datetime DEFAULT NULL,
  `date2` datetime DEFAULT NULL,
  `domain_no` int(11) DEFAULT NULL,
  `operator_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `operator_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `operat_time` datetime DEFAULT NULL,
  `modifier_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `modifier_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `modifi_time` datetime DEFAULT NULL,
  PRIMARY KEY (`seq_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of questions_bank
-- ----------------------------

-- ----------------------------
-- Table structure for questions_info
-- ----------------------------
DROP TABLE IF EXISTS `questions_info`;
CREATE TABLE `questions_info` (
  `seq_no` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `question` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `option1` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `option2` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `option3` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `option4` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `option5` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `option6` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `answer` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `score` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `related_bank` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `public` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `account_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `remarks` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `source` int(11) DEFAULT NULL,
  `num1` int(11) DEFAULT NULL,
  `num2` int(11) DEFAULT NULL,
  `str1` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `str2` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date1` datetime DEFAULT NULL,
  `date2` datetime DEFAULT NULL,
  `domain_no` int(11) DEFAULT NULL,
  `operator_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `operator_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `operat_time` datetime DEFAULT NULL,
  `modifier_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `modifier_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `modifi_time` datetime DEFAULT NULL,
  PRIMARY KEY (`seq_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of questions_info
-- ----------------------------

-- ----------------------------
-- Table structure for role_info
-- ----------------------------
DROP TABLE IF EXISTS `role_info`;
CREATE TABLE `role_info` (
  `seq_no` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `role_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `menu_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `remarks` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `source` int(11) DEFAULT NULL,
  `num1` int(11) DEFAULT NULL,
  `num2` int(11) DEFAULT NULL,
  `str1` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `str2` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date1` datetime DEFAULT NULL,
  `date2` datetime DEFAULT NULL,
  `domain_no` int(11) DEFAULT NULL,
  `operator_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `operator_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `operat_time` datetime DEFAULT NULL,
  `modifier_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `modifier_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `modifi_time` datetime DEFAULT NULL,
  PRIMARY KEY (`seq_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of role_info
-- ----------------------------

-- ----------------------------
-- Table structure for value_mapping
-- ----------------------------
DROP TABLE IF EXISTS `value_mapping`;
CREATE TABLE `value_mapping` (
  `type` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `tab_name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `field_name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `descrip` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `key_id` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `key_val_cn` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `key_val_en` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `remarks` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `source` int(11) DEFAULT NULL,
  `num1` int(11) DEFAULT NULL,
  `num2` int(11) DEFAULT NULL,
  `str1` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `str2` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date1` datetime DEFAULT NULL,
  `date2` datetime DEFAULT NULL,
  `domain_no` int(11) DEFAULT NULL,
  `operator_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `operator_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `operat_time` datetime DEFAULT NULL,
  `modifier_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `modifier_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `modifi_time` datetime DEFAULT NULL,
  `data_status` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of value_mapping
-- ----------------------------
