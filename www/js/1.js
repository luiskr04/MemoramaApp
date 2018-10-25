$(function(){

	vectorImagen = new Array(33);
	var valor1 = 0;
	var valor2 = 0;
	var turno = 0;
	var aciertos;
	var turnos;
	

	/*Funcion aleatorio*/
	function CargarAleatorio(){

		//Carga de imagenes 1-16 posiciones.
		for( i=1; i < 17 ; i++){
			vectorImagen[i] = i+".jpg";
		}

		//Carga de imagenes 16-32 posiciones.
		var k=1;
		for(i=17; i < 33 ; i++){
			vectorImagen[i] = k+".jpg";
			k++;
		}

		//Intercambio de imagenes;
		var aux = "";
		for(i=1; i < 32 ; i++){
			var aleatorio = Math.floor((Math.random()*31)+1);
			aux = vectorImagen[i];
			vectorImagen[i] = vectorImagen[aleatorio];
			vectorImagen[aleatorio] = aux;
		}

		for(i=1;i < 33 ; i++){
			$("#"+i+"a").attr("src","img/"+vectorImagen[i]);
		}
		aciertos = 0;
		turnos = 0;
		document.getElementById("lbl_aciertos").innerHTML = 'Aciertos: '+aciertos;
		document.getElementById("lbl_turnos").innerHTML = 'Intentos: '+turnos;
		alert('Imagenes Cargadas...');
	}

	/*Funcion ocultar*/
	function ocultar(){
		for(i=1;i<33;i++){
			$("#"+i+"a").attr("src","img/0.jpg");
		}
	}

	function msgacierto(){
		alert('Has acertado');
	}
	function msgfallo(){
		alert('Fallaste, intentalo de nuevo.');
	}
	function voltearimagenes() {
		$("#"+valor1+"a").attr("src","img/0.jpg");
		$("#"+valor2+"a").attr("src","img/0.jpg");
	}

	/* Llamamos a la Funcion ocultar*/
	$("#ocultar").on("click",function(){
		ocultar();
		
	})

	$("#cargar").on("click",function(){
		CargarAleatorio();
	})

	

	/*Funcion evento*/
	function evento(identificador){

		//alert(turno);

		if(turno == 0)
		{
			valor1 = identificador;
			$("#"+valor1+"a").attr("src","img/"+vectorImagen[valor1]);
			turno = 1;
			//alert('valor uno asignado '+turno);
		}
		else
		{
			valor2 = identificador;

			turno = 0;
			//alert('se asigno valor 0 a turno');

			$("#"+valor2+"a").attr("src","img/"+vectorImagen[valor2]);

			//alert('valor dos asignado'+vectorImagen[valor2]);

			if(vectorImagen[valor2] == vectorImagen[valor1])
			{
				aciertos++;
				document.getElementById("lbl_aciertos").innerHTML = 'Aciertos: '+aciertos;
				//alert('Has acertado');
				setTimeout(function(){msgacierto()},1500);
			}
			else
			{
				//alert('Fallaste, intentalo de nuevo.');
				setTimeout(function(){msgfallo()},1700);
				setTimeout(function(){voltearimagenes()},1700);
				
			}
			turnos++;
			document.getElementById("lbl_turnos").innerHTML = 'Intentos: '+turnos;
		}


	}
	/*Llamar a la funcion evento*/
	$(".boton").on("click", function(){
		var identificador = $(this).data('id');
		evento(identificador);
	})

	
})
