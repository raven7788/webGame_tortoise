<?php
/**
 * Created by PhpStorm.
 * User: caiyilei
 * Date: 14-8-19
 * Time: 上午2:37
 */
use TedPlay\TedPlayGameRoot;
use TedPlay\TedplayUtil;

/**
 * auto load function for root ,
 * all game will come this page first
 * @param $classname
 */
function __autoload($classname) {
	$classname = str_replace('\\', '/', $classname);

	if (strstr($classname, 'lib/')) {

		$filename = "../" . $classname . ".php";
		include_once($filename);
		return;
	}

	$filename = "../class/" . $classname . ".php";
	include_once($filename);
}


/**
 * if is not mobile, direct goto the tedplay home page
 */

//if (!TedplayUtil::detectMobile()) {
//	header("Location: http://www.tedplay.com");
//}

/**
 * if the app_id is not set, show the App_id error
 */
if (!isset($_GET['app_id'])) {
	print 'LOST APP_ID';
	return;
}


$app_id = $_GET['app_id'];

$tedgameRoot = new TedPlayGameRoot();
$tedgameRoot->setAppId($app_id);
$tedgameRoot->display();