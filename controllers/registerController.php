<?php 

	// crea el objeto con la vista
	$tpl = new Kiwi("register");


	// crea el array con variables a reemplazar en la vista
	$vars = ["MSG_LOGIN_ERROR" => ""];

	// si se presiono el botón del formulario
	if(isset($_POST['btn_register'])){

		// crea un usuario
		$usuario = new User();

		// quitamos del array de post el boton
		unset($_POST['btn_register']);
		
		// procede a intentar el logueo del usuario
		$response = $usuario->register($_POST);

		// El usuario y contraseña son validos
		if($response["errno"]==200){

			// se pasa el objeto de usuario a Session
			$_SESSION[$_ENV['PROJECT_NAME']]['user'] = $usuario;

			// redirecciona al panel
			header("Location: login");
		}

		// Si hubo cualquier error se carga el mensaje de error de la vista
		$vars = ["MSG_LOGIN_ERROR" => $response["error"]];
	}

	// se pasan las variables a la vista
	$tpl->setVars($vars);

	// imprime en pantalla la página
	$tpl->print();



// CONTRATAR CONTROLADOR

	// if (condition) {
	// 	// code...
	// }
	// function contratar_servicio()

 ?>