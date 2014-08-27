<?php
/**
 * Created by PhpStorm.
 * User: caiyilei
 * Date: 14-8-19
 * Time: 上午2:54
 */

namespace TedPlay;


use lib\Mobile_Detect\Mobile_Detect;

class TedplayUtil {


	static public function detectMobile() {
		$detectMobile = new Mobile_Detect();
		if($detectMobile->isMobile() || $detectMobile->isTablet()){
			return TRUE;
		}else{
			return FALSE;
		}
	}
} 