/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50624
Source Host           : 127.0.0.1:3306
Source Database       : islc

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2016-12-29 14:38:32
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `seq_no` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `account_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sex` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `class` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `part` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `year` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
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
INSERT INTO `account` VALUES ('10000', 'p10000', '管理员', '男', '', '10000', null, '', '123456', 'admin', '1', null, '2016-10-27 14:01:11', null, null, null, null, null, null, null);
INSERT INTO `account` VALUES ('10001', 'p10001', '教师', '女', '10000;10001;10002;10003', '10001', null, '', '123456', 'teacher', '1', null, '2016-10-27 14:02:14', null, null, null, null, null, null, null);
INSERT INTO `account` VALUES ('10002', 'p10002', '学二', '男', '10000', '10002', '', '10000', '123456', 'student2', '1', null, '2016-10-27 14:03:09', null, null, null, null, null, null, null);
INSERT INTO `account` VALUES ('10003', 'p10003', '学三', '女', '10000', '10002', null, '10000', '123456', 'student3', '1', null, '2016-11-18 14:44:18', null, null, null, null, null, null, null);
INSERT INTO `account` VALUES ('10004', 'p10004', '学四', '男', '10000', '10002', null, '10000', '123456', 'student4', '1', null, '2016-11-18 14:44:21', null, null, null, null, null, null, null);
INSERT INTO `account` VALUES ('10005', 'p10005', '学五', '女', '10000', '10002', null, '10000', '123456', 'student5', '1', null, '2016-11-18 14:44:23', null, null, null, null, null, null, null);
INSERT INTO `account` VALUES ('10006', 'p10006', '学六', '男', '10000', '10002', null, '10000', '123456', 'student6', '1', null, '2016-11-18 14:44:26', null, null, null, null, null, null, null);
INSERT INTO `account` VALUES ('10007', 'p10007', '学七', '女', '10000', '10002', null, '10000', '123456', 'student7', '1', null, '2016-11-18 14:44:28', null, null, null, null, null, null, null);
INSERT INTO `account` VALUES ('10008', 'p10008', '学八', '男', '10000', '10002', null, '10000', '123456', 'student8', '1', null, '2016-11-18 14:44:30', null, null, null, null, null, null, null);
INSERT INTO `account` VALUES ('10009', 'p10009', '学九', '女', '10000', '10002', null, '', '123456', 'student9', '1', null, '2016-11-18 14:44:32', null, null, null, null, null, null, null);
INSERT INTO `account` VALUES ('10010', 'p10010', '学十', '男', '10000', '10002', null, '', '123456', 'student10', '1', null, '2016-11-18 14:44:34', null, null, null, null, null, null, null);
INSERT INTO `account` VALUES ('10011', 'p10011', '学十一', '女', '10000', '10002', null, '10007', '123456', 'student11', '1', null, '2016-11-18 14:44:36', null, null, null, null, null, null, null);
INSERT INTO `account` VALUES ('10012', 'p10012', '学十二', '男', '10000', '10002', null, '10007', '123456', 'student12', '1', null, '2016-11-18 14:44:39', null, null, null, null, null, null, null);
INSERT INTO `account` VALUES ('10013', 'p10013', '学十三', '女', '10000', '10002', null, '10007', '123456', 'student13', '1', null, '2016-11-18 14:44:41', null, null, null, null, null, null, null);
INSERT INTO `account` VALUES ('10014', 'p10014', '学十四', '男', '10000', '10002', null, '10007', '123456', 'student14', '1', null, '2016-11-18 14:44:44', null, null, null, null, null, null, null);
INSERT INTO `account` VALUES ('10015', 'p10015', '学十五', '女', '10001', '10002', null, '', '123456', 'student15', '1', null, '2016-11-18 14:44:45', null, null, null, null, null, null, null);
INSERT INTO `account` VALUES ('10016', 'p10016', '学十六', '男', '10001', '10002', null, '', '123456', 'student16', '1', null, '2016-11-18 14:44:48', null, null, null, null, null, null, null);
INSERT INTO `account` VALUES ('10017', 'p10017', '学十七', '女', '10001', '10002', null, '', '123456', 'student17', '1', null, '2016-11-18 14:44:50', null, null, null, null, null, null, null);
INSERT INTO `account` VALUES ('10018', 'p10018', '学十八', '男', '10001', '10002', null, '', '123456', 'student18', '1', null, '2016-11-18 14:44:52', null, null, null, null, null, null, null);
INSERT INTO `account` VALUES ('10019', 'p10019', '学十九', '女', '10001', '10002', null, '', '123456', 'student19', '1', null, '2016-11-18 14:44:54', null, null, null, null, null, null, null);
INSERT INTO `account` VALUES ('10020', 'p10020', '学二十', '男', '10001', '10002', null, '', '123456', 'student20', '1', null, '2016-11-18 14:44:56', null, null, null, null, null, null, null);

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
  `class_audio` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `account_id` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
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
INSERT INTO `course_info` VALUES ('10000', '语法应用', 'A10000', '2016-11-02 15:41:32', '1', '2016-11-02 15:11:00', '10000;10001;10002', '10001;10002;10004;10006;10005', '10001;10002', '06c92b40-c5ad-11e6-949f-5da4c588896e.mp3', 'p10001', '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `course_info` VALUES ('10001', '场景对话', 'A10001', '2016-11-01 15:43:17', '1', '2016-11-02 15:11:00', '10001;10002;10003', '', '10000', '06c92b40-c5ad-11e6-949f-5da4c588896e.mp3', 'p10001', '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `course_info` VALUES ('10002', '口语练习', 'A10002', '2016-10-31 15:43:26', '2', '2016-11-02 15:11:00', '10000;10001;10002', '', '', null, 'p10001', '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `course_info` VALUES ('10003', '标点运用', 'A10003', '2016-12-12 14:39:12', '1', '2016-12-11 14:12:00', '10000', '10001;10002;10006;10004;10005;10007;10000;10003', '10002', '06c92b40-c5ad-11e6-949f-5da4c588896e.mp3', 'p10001', '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `course_info` VALUES ('10004', '阅读理解', 'A10004', '2016-12-11 14:39:26', '2', '2016-12-10 14:12:00', '10001;10000', '10002;10006;10004;10005;10001;10007;10000;10003', '10003', null, 'p10001', '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `course_info` VALUES ('10005', '看美剧', 'A10005', '2016-12-09 14:39:29', '1', '2016-12-05 14:12:00', '10002', '10004;10005;10000', '10004', '06c92b40-c5ad-11e6-949f-5da4c588896e.mp3', 'p10001', '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for data_info
-- ----------------------------
DROP TABLE IF EXISTS `data_info`;
CREATE TABLE `data_info` (
  `seq_no` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `data_type` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `public` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `data_url` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `number` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `up_time` datetime DEFAULT NULL,
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
-- Records of data_info
-- ----------------------------
INSERT INTO `data_info` VALUES ('10000', '1', 'ISLC-接口文档', '1', '5e668650-c5a2-11e6-949f-5da4c588896e.xlsx', 'A10000', '2016-12-19 12:19:58', 'p10001', '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `data_info` VALUES ('10001', '2', 'kodo-鼓童', '1', '06c92b40-c5ad-11e6-949f-5da4c588896e.mp3', 'A10001', '2016-12-19 13:36:17', 'p10001', '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `data_info` VALUES ('10002', '3', '陈光诚', '1', '31450600-c5ad-11e6-949f-5da4c588896e.mp4', 'A10002', '2016-12-19 13:37:41', 'p10001', '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `data_info` VALUES ('10003', '1', 'bmpr', '1', '697de050-c5ad-11e6-949f-5da4c588896e.bmpr', 'A10003', '2016-12-19 13:39:00', 'p10001', '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `data_info` VALUES ('10004', '1', '学习中心方案', '2', '616209b0-c5bb-11e6-8b71-fde66f4bbcba.docx', 'A10004', '2016-12-19 15:19:01', 'p10001', '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `data_info` VALUES ('10005', '2', '再度重相逢', '2', '7786d4a0-c5bb-11e6-8b71-fde66f4bbcba.mp3', 'A10005', '2016-12-19 15:19:34', 'p10001', '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `data_info` VALUES ('10006', '3', '志愿军战俘营', '2', '90a5f3d0-c5bb-11e6-8b71-fde66f4bbcba.mp4', 'A10006', '2016-12-19 15:20:17', 'p10001', '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `data_info` VALUES ('10007', '1', 'islc.sql', '2', 'b30711c0-c5bb-11e6-8b71-fde66f4bbcba.sql', 'A10007', '2016-12-19 15:21:13', 'p10001', '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for grouping_info
-- ----------------------------
DROP TABLE IF EXISTS `grouping_info`;
CREATE TABLE `grouping_info` (
  `seq_no` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `class` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `group` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `audio` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `student` varchar(1024) COLLATE utf8_unicode_ci NOT NULL,
  `status` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `remarks` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
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
INSERT INTO `grouping_info` VALUES ('10000', '10000', '第一组', '06c92b40-c5ad-11e6-949f-5da4c588896e.mp3', '', '1', '123412351235', null, null, null, null, null, '2016-11-17 11:14:00', null, null, null, null, null, null, null, null);
INSERT INTO `grouping_info` VALUES ('10001', '10000', '第二组', '06c92b40-c5ad-11e6-949f-5da4c588896e.mp3', '', '1', '啊搜到客服煎熬is京东方', null, null, null, null, null, '2016-11-16 11:15:38', null, null, null, null, null, null, null, null);
INSERT INTO `grouping_info` VALUES ('10002', '10000', '第三组', '06c92b40-c5ad-11e6-949f-5da4c588896e.mp3', '', '1', '', null, null, null, null, null, '2016-11-18 14:57:36', null, null, null, null, null, null, null, null);
INSERT INTO `grouping_info` VALUES ('10003', '10001', '第四组', '06c92b40-c5ad-11e6-949f-5da4c588896e.mp3', '', '1', '', null, null, null, null, null, '2016-11-18 14:57:37', null, null, null, null, null, null, null, null);
INSERT INTO `grouping_info` VALUES ('10004', '', '第五组', '06c92b40-c5ad-11e6-949f-5da4c588896e.mp3', '', '1', '', null, null, null, null, null, '2016-11-18 14:57:39', null, null, null, null, null, null, null, null);
INSERT INTO `grouping_info` VALUES ('10005', '10002', '第六组', '06c92b40-c5ad-11e6-949f-5da4c588896e.mp3', '', '1', '安慰客观地看手机噶破地方hi', null, null, null, null, null, '2016-11-18 14:57:41', null, null, null, null, null, null, null, null);
INSERT INTO `grouping_info` VALUES ('10006', '', '', '06c92b40-c5ad-11e6-949f-5da4c588896e.mp3', '', '1', null, null, null, null, null, null, '2016-11-24 17:31:02', null, null, null, null, null, null, null, null);
INSERT INTO `grouping_info` VALUES ('10007', '10000', '第四组', null, '', '1', '', null, null, null, null, null, '2016-12-26 11:32:33', null, null, null, null, null, null, null, null);

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
  `account_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
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
  `seq_no` int(32) NOT NULL AUTO_INCREMENT,
  `question_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `audio_url` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `public` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `account_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `related_questions` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `remarks` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `source` int(11) DEFAULT NULL,
  `domain_no` int(11) DEFAULT NULL,
  `operator_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `operator_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `operat_time` datetime DEFAULT NULL,
  `modifier_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `modifi_time` datetime DEFAULT NULL,
  `modifier_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `num1` int(11) DEFAULT NULL,
  `num2` int(11) DEFAULT NULL,
  `str1` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `str2` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date1` datetime DEFAULT NULL,
  `date2` datetime DEFAULT NULL,
  `type` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`seq_no`)
) ENGINE=InnoDB AUTO_INCREMENT=10023 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of questions_bank
-- ----------------------------
INSERT INTO `questions_bank` VALUES ('10000', '题库一', '70ebbc50-c5a2-11e6-949f-5da4c588896e.mp3', '1', 'P10001', '', '1', '说明1', null, null, null, null, null, null, null, null, null, null, null, null, '2016-12-09 17:02:22', null, '听说题');
INSERT INTO `questions_bank` VALUES ('10001', '题库二', '70ebbc50-c5a2-11e6-949f-5da4c588896e.mp3', '1', 'P10000', '', '2', '说明2', null, null, null, null, null, null, null, null, null, null, null, null, '2016-12-08 17:02:25', null, '听说题');
INSERT INTO `questions_bank` VALUES ('10002', '题库三', '70ebbc50-c5a2-11e6-949f-5da4c588896e.mp3', '1', 'P10001', null, '1', '说明3', null, null, null, null, null, null, null, null, null, null, null, null, '2016-12-07 17:02:30', null, '听说题');
INSERT INTO `questions_bank` VALUES ('10003', '题库四', '70ebbc50-c5a2-11e6-949f-5da4c588896e.mp3', '2', 'P10001', '', '1', '说明4', null, null, null, null, null, null, null, null, null, null, null, null, '2016-12-05 17:02:32', null, '听说题');
INSERT INTO `questions_bank` VALUES ('10004', '题库五', '70ebbc50-c5a2-11e6-949f-5da4c588896e.mp3', '1', 'P10001', null, '1', '说明5', null, null, null, null, null, null, null, null, null, null, null, null, '2016-12-04 17:02:35', null, '听说题');
INSERT INTO `questions_bank` VALUES ('10005', '题库六', '70ebbc50-c5a2-11e6-949f-5da4c588896e.mp3', '2', 'P10030', '', '1', '说明6', null, null, null, null, null, null, null, null, null, null, null, null, '2016-12-03 17:02:38', null, '听说题');
INSERT INTO `questions_bank` VALUES ('10006', '题库七', '70ebbc50-c5a2-11e6-949f-5da4c588896e.mp3', '1', 'P10000', null, '1', '说明7', null, null, null, null, null, null, null, null, null, null, null, null, '2016-12-01 17:27:05', null, '听说题');
INSERT INTO `questions_bank` VALUES ('10007', '题库八', '70ebbc50-c5a2-11e6-949f-5da4c588896e.mp3', '1', 'P10000', '', '1', '说明8', null, null, null, null, null, null, null, null, null, null, null, null, '2016-12-09 17:27:13', null, '听力题');
INSERT INTO `questions_bank` VALUES ('10008', '题库九', '70ebbc50-c5a2-11e6-949f-5da4c588896e.mp3', '1', 'P10000', '', '1', '说明9', null, null, null, null, null, null, null, null, null, null, null, null, '2016-12-02 17:27:16', null, '听力题');
INSERT INTO `questions_bank` VALUES ('10009', '题库十', '70ebbc50-c5a2-11e6-949f-5da4c588896e.mp3', '1', 'P10000', '', '1', '说明10', null, null, null, null, null, null, null, null, null, null, null, null, '2016-12-03 17:27:18', null, '听力题');
INSERT INTO `questions_bank` VALUES ('10010', '题十一', '70ebbc50-c5a2-11e6-949f-5da4c588896e.mp3', '1', 'P10001', '', '1', '说明11', null, null, null, null, null, null, null, null, null, null, null, null, '2016-12-04 17:27:21', null, '听力题');
INSERT INTO `questions_bank` VALUES ('10011', '题十二', '70ebbc50-c5a2-11e6-949f-5da4c588896e.mp3', '1', 'P10001', '', '1', '说明12', null, null, null, null, null, null, null, null, null, null, null, null, '2016-12-05 17:27:23', null, '听力题');
INSERT INTO `questions_bank` VALUES ('10012', '题十三', '70ebbc50-c5a2-11e6-949f-5da4c588896e.mp3', '1', 'P10001', '', '1', '说明12', null, null, null, null, null, null, null, null, null, null, null, null, '2016-12-06 17:27:26', null, '听力题');
INSERT INTO `questions_bank` VALUES ('10022', '试题名称', '70ebbc50-c5a2-11e6-949f-5da4c588896e.mp3', '1', 'p10001', '', '1', '试题说明', null, null, null, null, null, null, null, null, null, null, null, null, '2016-12-19 11:18:24', null, '听力题');

-- ----------------------------
-- Table structure for questions_info
-- ----------------------------
DROP TABLE IF EXISTS `questions_info`;
CREATE TABLE `questions_info` (
  `seq_no` int(32) NOT NULL AUTO_INCREMENT,
  `question` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `option1` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `option2` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `option3` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `option4` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `answer` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `score` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `related_bank` int(32) DEFAULT NULL,
  `public` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `account_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `source` int(11) DEFAULT NULL,
  `release_time` datetime DEFAULT NULL,
  `modifier_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `modifi_time` datetime DEFAULT NULL,
  `domain_no` int(11) DEFAULT NULL,
  `operator_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `operator_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `operat_time` datetime DEFAULT NULL,
  `modifier_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `data_status` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `num1` int(11) DEFAULT NULL,
  `num2` int(11) DEFAULT NULL,
  `str1` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `str2` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date2` datetime DEFAULT NULL,
  PRIMARY KEY (`seq_no`)
) ENGINE=InnoDB AUTO_INCREMENT=10004 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of questions_info
-- ----------------------------
INSERT INTO `questions_info` VALUES ('10000', '题一', '选项1', '选项2', '选项3', '选项4', 'A', '2', '10000', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `questions_info` VALUES ('10001', '题二', '选项1', '选项2', '选项3', '选项4', 'B', '4', '10000', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `questions_info` VALUES ('10002', '题三', '选项1', '选项2', '选项3', '选项4', 'C', '6', '10000', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `questions_info` VALUES ('10003', '题四', '选项1', '选项2', '选项3', '选项4', 'D', '8', '10000', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for role_info
-- ----------------------------
DROP TABLE IF EXISTS `role_info`;
CREATE TABLE `role_info` (
  `seq_no` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `role_name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
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
INSERT INTO `role_info` VALUES ('10000', '管理员', '', '1;2;3;4;', '1', null, null, null, null, null, null, '2016-12-28 15:44:52', '2016-12-28 15:46:55', null, null, null, null, null, null, null);
INSERT INTO `role_info` VALUES ('10001', '教师', null, ';5;', '1', null, null, null, null, null, null, '2016-12-28 15:46:13', '2016-12-28 15:46:13', null, null, null, null, null, null, null);
INSERT INTO `role_info` VALUES ('10002', '学生', null, ';6;', '1', null, null, null, null, null, null, '2016-12-28 15:46:21', '2016-12-28 15:46:21', null, null, null, null, null, null, null);
INSERT INTO `role_info` VALUES ('10003', '班级管理员', null, ';3;', '1', null, null, null, null, null, null, '2016-12-28 15:46:40', '2016-12-28 15:46:40', null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for value_mapping
-- ----------------------------
DROP TABLE IF EXISTS `value_mapping`;
CREATE TABLE `value_mapping` (
  `type` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `tab_name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `field_name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `descrip` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `key_id` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `key_val_cn` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `key_val_en` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `remarks` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `source` int(11) DEFAULT NULL,
  `num1` int(11) NOT NULL,
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
  `data_status` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`num1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of value_mapping
-- ----------------------------
INSERT INTO `value_mapping` VALUES ('班级', null, null, null, '10000', '2016级一班', null, null, null, '10000', null, null, null, '2016-11-01 11:45:03', null, null, null, null, null, null, null, null, '1');
INSERT INTO `value_mapping` VALUES ('班级', null, null, null, '10001', '2016级二班', null, null, null, '10001', null, null, null, '2016-10-31 11:45:08', null, null, null, null, null, null, null, null, '1');
INSERT INTO `value_mapping` VALUES ('班级', null, null, null, '10002', '2016级三班', null, null, null, '10002', null, null, null, '2016-10-31 11:45:14', null, null, null, null, null, null, null, null, '1');
INSERT INTO `value_mapping` VALUES ('班级', null, null, null, '10003', '2016级四班', null, null, null, '10003', null, null, null, '2016-11-01 17:42:48', null, null, null, null, null, null, null, null, '1');
INSERT INTO `value_mapping` VALUES ('', null, null, null, '1234', '提高班', null, null, null, '10004', null, null, null, '2016-11-01 17:45:53', null, null, null, null, null, null, null, null, '2');
INSERT INTO `value_mapping` VALUES ('', null, null, null, 'sdf', 'sdfa', null, null, null, '10005', null, null, null, '2016-11-02 11:33:50', null, null, null, null, null, null, null, null, '2');
