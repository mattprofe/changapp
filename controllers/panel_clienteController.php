<?php
	$tpl = new Kiwi("panel_cliente");

	$usuario = new User();

	//$usuario->getCantUsers();

	$vars=["CANT_USERS"=> 10];

	$tpl->setVars($vars);

	$tpl->print();

?>