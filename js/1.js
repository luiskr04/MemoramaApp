$(function(){

	//Declaracion de variables 
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

		//Asignacion de imagenes a la tabla
		for(i=1;i < 33 ; i++){
			$("#"+i+"a").attr("src","img/"+vectorImagen[i]);
		}

		//Reinicio de turnos y aciertos al cargar las imagenes
		aciertos = 0;
		turnos = 0;

		//asignacion de turnos y aciertos a las eyiquetas HTML
		document.getElementById("lbl_aciertos").innerHTML = 'Aciertos: '+aciertos;
		document.getElementById("lbl_turnos").innerHTML = 'Intentos: '+turnos;

		//Mensaje de proceso terminado
		alert('Imagenes Cargadas...');
	}

	/*Funcion ocultar imagenes*/
	function ocultar(){
		for(i=1;i<33;i++){
			$("#"+i+"a").attr("src","img/0.jpg");
		}
	}

	//mensaje de acierto al usuario
	function msgacierto(){
		alert('Has acertado');
	}
	//mensaje de fallo al usuario
	function msgfallo(){
		alert('Fallaste, intentalo de nuevo.');
	}
	//mensaje de memorama completo al usuario
	function memocompleto()
	{
		alert('¡Felicidades, has completado el Memorama!');
	}
	//voltea imagenes 
	function voltearimagenes() {
		$("#"+valor1+"a").attr("src","img/0.jpg");
		$("#"+valor2+"a").attr("src","img/0.jpg");
	}

	/* Llamamos a la Funcion ocultar*/
	$("#ocultar").on("click",function(){
		ocultar();
		
	})
	//Llamado a la funcion cargar
	$("#cargar").on("click",function(){
		CargarAleatorio();
	})

	

	/*Funcion evento*/
	function evento(identificador){

		//si se clickea sobre la primer imagen, entonces...
		if(turno == 0)
		{

			valor1 = identificador;

			//mostramos la imagen que se encuentra en esa posicion 
			$("#"+valor1+"a").attr("src","img/"+vectorImagen[valor1]);

			//cambiamos el valor del turno
			turno = 1;
			
		}
		else//si se clickea sobre la segunda imagen, entonces...
		{
			valor2 = identificador;

			//Cambiamos el valor del turno
			turno = 0;

			//mostramos la segunda imagen que se encuentra en esa posicion
			$("#"+valor2+"a").attr("src","img/"+vectorImagen[valor2]);

			//Comprobamos si las imagenes son iguales
			if(vectorImagen[valor2] == vectorImagen[valor1])
			{
				//incrementamos el nuumero de aciertos y lo desplegamos en la etiqueta HTML
				aciertos++;
				document.getElementById("lbl_aciertos").innerHTML = 'Aciertos: '+aciertos;
				
				//Definimos un tiempo de espera para llamar a la funcion del mensaje
				//Permite que el usuario visualice la segunda imagen.
				setTimeout(function(){msgacierto()},1500);

				//Si los aciertos son 16, se manda mensaje de feclicitacion
				if(aciertos == 16){
					setTimeout(function(){memocompleto()},1500;
				}

			}
			else
			{
				//Definimos un tiempo de espera para llamar a la funcion del mensaje
				//Permite que el usuario visualice la segunda imagen.
				setTimeout(function(){msgfallo()},1700);
				setTimeout(function(){voltearimagenes()},1700);
				
			}
			//Se incrementa el numero de turnos y se despliega en etiqueta HTML
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
