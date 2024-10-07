<?php


	$tpl = new Kiwi("landing");

	$usuario = new User();
	
	$publics = new Publicacion();

	$vars = ["PROJECT_SECTION" => "Bienvenido"];

	$tpl->setVars($vars);

	$tpl->print();

?>