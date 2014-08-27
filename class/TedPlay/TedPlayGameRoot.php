<?php

/**
 * Created by PhpStorm.
 * User: caiyilei
 * Date: 14-8-19
 * Time: 上午2:25
 */

namespace TedPlay;


class TedPlayGameRoot {
	private $app_id;
	private $application_path = array(
		'WEBGAME0000001' => 'tortoise.html'
	);

	function __construct() {
	}

	function setAppId($appId) {
		$this->app_id = $appId;
	}

	function getAppId() {
		return $this->app_id;
	}


	function display() {
		if (!array_key_exists($this->app_id, $this->application_path)) {
			return "WRONG APP ID";
		} else {
			$file = $this->application_path[$this->app_id];
		}


		$output = file_get_contents($file);
		print $output;

	}
} 