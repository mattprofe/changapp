<?php
	$tpl = new Kiwi("landing");

	$usuario = new User();

	//$usuario->getCantUsers();

	$vars=["CANT_USERS"=> 10];

	$tpl->load();

	$tpl->print();

?>