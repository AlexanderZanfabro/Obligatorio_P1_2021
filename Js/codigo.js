let botonesMenu = document.querySelectorAll(".btnSeccion");
for (let i = 0; i < botonesMenu.length; i++) {
  const boton = botonesMenu[i];
  boton.addEventListener("click", cambiarSeccionClick);
}

function cambiarSeccionClick() {
  let idBoton = this.getAttribute("id"); //"btnSeccionAgregar"
  let idSeccionIr = idBoton.charAt(3).toLowerCase() + idBoton.substring(4); //"seccionAgregar" btnSeccionVerEstadisticasEstudiantes
  cambiarSeccion(idSeccionIr);
}

cambiarSeccion("seccionProfesor");
//cambiarSeccion("seccionIniciarSesion");

function cambiarSeccion(idSeccion) {
  let secciones = document.querySelectorAll(".seccion"); 2
  for (let i = 0; i < secciones.length; i++) {
    const seccion = secciones[i];
    seccion.style.display = "none";
  }

  document.querySelector("#" + idSeccion).style.display = "block";
}



//mostrarBotones("admin");
//mostrarBotones("invitado");
//mostrarBotones("noLogeado");


function mostrarBotones(clase) {
  let btnMenu = document.querySelectorAll(".btnSeccion");
  for (let i = 0; i < btnMenu.length; i++) {
    const btn = btnMenu[i];
    btn.style.display = "none";
  }
  let botonesMostrar = document.querySelectorAll("." + clase); //document.querySelectorAll(".invitado");
  for (let i = 0; i < botonesMostrar.length; i++) {
    const btnMostrar = botonesMostrar[i];
    btnMostrar.style.display = "block";
  }
}

function mostrarNada() {
  let seccion = document.querySelectorAll(".seccion");
  for (let i = 0; i < seccion.length; i++) {
    const secciones = seccion[i];
    secciones.style.display = "none";
  }
}
//mostrarNada()

/////////////////////////////////////////////////////////////////////////////////////////////////////
class Estudiante {
  constructor(UnIdNombreEst, unNombreEst, unNombreUsuarioEst, unaContraseñaEst, nivelEst, profesorAsignado, cantEj) {
    this.IdEstudiante = UnIdNombreEst;
    this.nombreEst = unNombreEst;
    this.nombreUsuarioEst = unNombreUsuarioEst;
    this.contraseñaEst = unaContraseñaEst;
    this.nivelEst = nivelEst;
    this.profesorAsignado = profesorAsignado;
    this.cantidadEjerciciosResueltos = cantEj;
  }
}

let estudiantes = [
  new Estudiante(-1, "Mario", "MarioCasas09", "Mario901", "Inicial", 1, 0),
  new Estudiante(-2, "Lucas", "LucasDible01", "Dible13", "Inicial", 3, 0),
  new Estudiante(-3, "Gonzalo", "GonzaloBueno", "Bueno21", "Inicial", 1, 0),
]
///////////////////////////////////////////////////////////////////////////////////////////////////////
class Profesor {
  constructor(UnIdunNombre, unNombre, unnombreUsuario, unaContraseña) {
    this.identificador = UnIdunNombre;
    this.nombre = unNombre;
    this.nombreUsuario = unnombreUsuario;
    this.contraseña = unaContraseña;
  }
}

let profesores = [
  new Profesor(1, "Juan", "JuanPerez01", "Juan01"),
  new Profesor(2, "Pedro", "PedroPerez01", "Predro17"),
  new Profesor(3, "Felipe", "FelipePerez01", "Felipe21"),

]
/////////////////////LOGICA//////////////////////////////////////////////////////////////////////////
let identificadorProfesor = 4;
let identificadorEstudiante = -4;

agregarSelect();
function agregarSelect() {
  document.querySelector("#slcDocente").innerHTML = `<option value=-1>Seleccionar Docente</option>`
  for (let i = 0; i < profesores.length; i++) {
    const cadaProfesor = profesores[i];
    document.querySelector("#slcDocente").innerHTML +=
      `<option value="${cadaProfesor.nombre}">${cadaProfesor.nombre}</option>`
  }
}
//////////////////////////// REGISTRAR A UN ESTUDIANTE ////////////////////////////////////////////////
document.querySelector("#btnRegistrarEstudiante").addEventListener("click", registrarEstudiante);
function registrarEstudiante() {
  let nombreCampoE = document.querySelector("#txtNombre2").value;
  let nombreUsuarioCampoE = document.querySelector("#txtNomUsuario2").value;
  let contraseñaCampoE = document.querySelector("#txtContraseña2").value;
  let tipoCampo = Number(document.querySelector("#slcDocente").value);

  let profesorElegido = document.querySelector("#slcDocente").value;
  let obtenerProfesorElegido = obtenerObjeto(profesores, "nombre", profesorElegido);
  let idProfesorElegido = obtenerProfesorElegido.identificador;

  let contraseñaValidadaEstudiante = validarContraseña(contraseñaCampoE);
  let contraseñaEstudiante;
  if (contraseñaValidadaEstudiante) {
    contraseñaEstudiante = contraseñaCampoE;
  }

  let nivelEstudianteNuevo = "Inicial";
  let unEstudiante = new Estudiante(identificadorEstudiante, nombreCampoE, nombreUsuarioCampoE, contraseñaEstudiante, nivelEstudianteNuevo, idProfesorElegido);

  //VALIDAR QUE NO EXISTA OTRO USUARIO IGUAL:
  let usuarioExistente = buscarUsuario(estudiantes, "nombreUsuarioEst", nombreUsuarioCampoE);
  let profesorExistente = buscarUsuario(profesores, "nombreUsuario", nombreUsuarioCampoE)

  if (contraseñaValidadaEstudiante) {
    if (!usuarioExistente && !profesorExistente) {
      if (tipoCampo !== -1) {
        estudiantes.push(unEstudiante);
        identificadorEstudiante--;
        alert("Usuario creado")
      } else {
        alert("Debe seleccionar un docente");
      }
    } else {
      alert("Usuario ya existente");
    }
  } else {
    alert("Contraseña no válida");
  }
  console.log(estudiantes);
  armarTablaEstudiantes();
  document.getElementById("txtNombre2").value = "";
  document.getElementById("txtNomUsuario2").value = "";
  document.getElementById("txtContraseña2").value = "";
  document.getElementById("slcDocente").value = -1;
}


//////////////////////////////// REGISTRAR A UN PROFESOR ///////////////////////////////////////////
document.querySelector("#btnRegistrarProfesor").addEventListener("click", registrarProfesor);
function registrarProfesor() {
  let nombreCampo = document.querySelector("#txtNombre1").value;
  let nombreUsuarioCampo = document.querySelector("#txtNomUsuario1").value;
  let contraseñaCampo = document.querySelector("#txtContraseña1").value;

  let contraseñaValidada = validarContraseña(contraseñaCampo);
  let contraseña;
  if (contraseñaValidada) {
    contraseña = contraseñaCampo;
  }

  let unProfesor = new Profesor(identificadorProfesor, nombreCampo, nombreUsuarioCampo, contraseña);
  identificadorProfesor++;

  //VALIDAR QUE NO EXISTA OTRO USUARIO IGUAL:
  let usuarioExistente = buscarUsuario(profesores, "nombreUsuario", nombreUsuarioCampo);
  let estudianteExistente = buscarUsuario(estudiantes, "nombreUsuarioEst", nombreUsuarioCampo);

  if (contraseñaValidada) {
    if (!usuarioExistente && !estudianteExistente) {
      profesores.push(unProfesor);
      agregarSelect();
    } else {
      alert("Usuario ya existente");
    }
  } else {
    alert("Debe ingresar una contraseña válida");
  }
  console.log(profesores);
  document.getElementById("txtNombre1").value = "";
  document.getElementById("txtNomUsuario1").value = "";
  document.getElementById("txtContraseña1").value = "";
}


///////////////////////////////////////////// VALIDAR LA CONTRASENA /////////////////////////////////////
function validarContraseña(UnacontraseñaCualquiera) {
  if (UnacontraseñaCualquiera.length >= 4) {
    let mayuscula = false;
    let minuscula = false;
    let numero = false;

    for (let i = 0; i < UnacontraseñaCualquiera.length; i++) {
      if (UnacontraseñaCualquiera.charCodeAt(i) >= 65 && UnacontraseñaCualquiera.charCodeAt(i) <= 90) {
        mayuscula = true;
      }
      else if (UnacontraseñaCualquiera.charCodeAt(i) >= 97 && UnacontraseñaCualquiera.charCodeAt(i) <= 122) {
        minuscula = true;
      }
      else if (UnacontraseñaCualquiera.charCodeAt(i) >= 48 && UnacontraseñaCualquiera.charCodeAt(i) <= 57) {
        numero = true;
      }
    }
    if (mayuscula == true && minuscula == true && numero == true) {
      return true;
    }
  }
}

/////////////////////////////////////// INICIO DE SESION ///////////////////////////////////////////////
let usuarioEnSesion = 0; //PARA VER EL ID DEL USUARIO QUE INICIA SESION
let usuarioActivo; // PARA VER QUE TIPO DE USUARIO INICIA SESION
document.querySelector("#btnIniciar").addEventListener("click", iniciarSesion);
function iniciarSesion() {
  let usuarioCampo = document.querySelector("#txtNomUsuario").value;
  let contraseñaCampo = document.querySelector("#txtContraseña").value;

  let estudanteExiste = false;
  let profesorExiste = false;


  for (let i = 0; i < estudiantes.length; i++) {
    const cadaEstudiante = estudiantes[i];
    if (usuarioCampo === cadaEstudiante.nombreUsuarioEst && contraseñaCampo === cadaEstudiante.contraseñaEst) {
      alert("TODO CORRECTO");
      mostrarNada();
      mostrarBotones("estudiante")
      usuarioEnSesion = cadaEstudiante.IdEstudiante;
      usuarioActivo = "Estudiante";
      estudanteExiste = true; // ENCONTRÓ EL ESTUDIANTE
      break;
    }
  }

  if (!estudanteExiste) { //SI NO ENCUENTRA EL ESTUDIANTE VIENE A BUSCAR AL ARRAY PROFESORES
    for (let i = 0; i < profesores.length; i++) {
      const cadaProfesor = profesores[i];
      if (usuarioCampo === cadaProfesor.nombreUsuario && contraseñaCampo === cadaProfesor.contraseña) {
        alert("TODO CORRECTO");
        mostrarNada();
        mostrarBotones("profesor")
        usuarioEnSesion = cadaProfesor.identificador;
        usuarioActivo = "Profesor";
        profesorExiste = true; // ENCONTRÓ EL PROFESOR
        break;
      }
    }
  }
  console.log("Id del usuario en sesion: " + usuarioEnSesion);

  if (!estudanteExiste && !profesorExiste) {
    alert("Datos incorrectos")
  }
  document.querySelector("#pMostrarUsuarioActivo").innerHTML = `${usuarioActivo}`;
  document.getElementById("txtNomUsuario").value = "";
  document.getElementById("txtContraseña").value = "";
}
/////////////////////////////////////// FIN INICIO DE SESION ///////////////////////////////

/////////////////////////////// CERRAR SESION //////////////////////////////////////////////

document.querySelector("#btnSeccionCerrarSesion").addEventListener("click", cerrarSesion);
function cerrarSesion() {
  document.querySelector("#pMostrarUsuarioActivo").innerHTML = "";
  mostrarNada();
  mostrarBotones("noLogeado");
  cambiarSeccion("seccionIniciarSesion");
}

//////////////////////////// FUNCIONES IMPORTANTES /////////////////////////////
function mostrarTodosLosEjerciciosNuevamente(seccion) {///////Si la busqueda por titulo o descripcion no coincide muestras todos
  let seccionMostrada = document.querySelector(seccion)////// los ejercicios nuvamente
  seccionMostrada.style.display = "block"
}

function ocultarUno(seccion) {
  let seccionOcultada = document.querySelector(seccion);//Oculta todos los ejercicios
  seccionOcultada.style.display = "none";
}

function buscarElemento(arrElementos, propiedad, dato) {
  let existe = false;
  for (let i = 0; i < arrElementos.length; i++) {
    const elemento = arrElementos[i];
    if (elemento[propiedad] === dato) {
      existe = true;
      break;
    }
  }
  return existe;
}

function buscarUsuario(arrElementos, propiedad, dato) {
  let existe = false;
  for (let i = 0; i < arrElementos.length; i++) {
    const elemento = arrElementos[i];
    if (elemento[propiedad] === dato) {
      existe = true;
      break;
    }
  }
  return existe;
}


function obtenerObjeto(arrElementos, propiedad, dato) {
  let objeto = null;
  for (let i = 0; i < arrElementos.length; i++) {
    const elemento = arrElementos[i];
    if (elemento[propiedad] === dato) {
      objeto = elemento;
      break;
    }
  }
  return objeto;
}

//////////////////// SUBIR NIVEL ESTUDIANTES (VER ESTUDIANTES) //////////////////////
armarTablaEstudiantes();
function armarTablaEstudiantes() {
  document.querySelector("#tblNivelAlumnos").innerHTML = "";
  for (let i = 0; i < estudiantes.length; i++) {
    const cadaEstudiante = estudiantes[i];
    document.querySelector("#tblNivelAlumnos").innerHTML +=
      `<tr>
            <td>${cadaEstudiante.IdEstudiante}</td>
            <td>${cadaEstudiante.nombreEst}</td>
            <td>${cadaEstudiante.nivelEst}</td>
            <td><input type="button" value="Subir Nivel" data-idEstudiante=${cadaEstudiante.IdEstudiante} class="btnSubirNivel"></td>
        </tr>`
  }

  let botonesSubirNivel = document.querySelectorAll(".btnSubirNivel");
  for (let i = 0; i < botonesSubirNivel.length; i++) {
    const cadaBoton = botonesSubirNivel[i];
    cadaBoton.addEventListener("click", subirNivel);
  }
}

function subirNivel() {
  let idEstudianteSubirNivel = Number(this.getAttribute("data-idEstudiante")); // rotorna el data-idEstudiante de donde se apretó el botón

  for (let i = 0; i < estudiantes.length; i++) {
    const cadaEstudiante = estudiantes[i];
    if (idEstudianteSubirNivel == cadaEstudiante.IdEstudiante) {

      if (cadaEstudiante.nivelEst === "Inicial") {
        cadaEstudiante.nivelEst = "Intermedio"
      } else if (cadaEstudiante.nivelEst === "Intermedio") {
        cadaEstudiante.nivelEst = "Avanzado"
      } else {
        alert("Este alumno ya alcanzo el nivel más alto")
      }
    }
  }
  armarTablaEstudiantes();
}
///////////////////////// FIN SUBIR NIVEL ESTUDIANTES ////////////////////////

//////////////////////// ---------- EJERCICIOS ---------- //////////////////////////
class Ejercicio {
  constructor(idEj, tituloEj, descripcionEj, imagEj, idProfeCrea, nivEj, estadoEj) {
    this.idEjercicio = idEj;
    this.titulo = tituloEj;
    this.descripcion = descripcionEj;
    this.imagenPartitura = imagEj;
    this.idProfersorCreador = idProfeCrea;
    this.nivelEj = nivEj;
    this.ejercicioResuelto = estadoEj;
  }//titulo, descripcion e imagen son con contenido. El resto son vinculos
}
// 0 = no resuelto
// 1 = resuelto

let descripcionEjercicioPrueba = "esta es la descripción del ejercicio"//solo de prueba
let ejercicios = [
  new Ejercicio(1, "Ejercicio 01", "hola holaHOLA", "ej1.png", 1, "Inicial", 0),
  new Ejercicio(2, "Ejercicio 02", descripcionEjercicioPrueba, "ej2.png", 1, "Inicial", 1),
  new Ejercicio(3, "Ejercicio 03", descripcionEjercicioPrueba, "ej3.png", 1, "Inicial", 0),
  new Ejercicio(4, "Ejercicio 04", descripcionEjercicioPrueba, "ej4.png", 1, "Intermedio", 1),
  new Ejercicio(5, "Ejercicio 05", descripcionEjercicioPrueba, "ej5.png", 1, "Intermedio", 0),
  new Ejercicio(6, "Ejercicio 06", descripcionEjercicioPrueba, "ej6.png", 1, "Intermedio", 1),
  new Ejercicio(7, "Ejercicio 07", descripcionEjercicioPrueba, "ej7.png", 1, "Avanzado", 1),
  new Ejercicio(8, "Ejercicio 08", descripcionEjercicioPrueba, "ej8.png", 1, "Avanzado", 1),
  new Ejercicio(9, "Ejercicio 09", descripcionEjercicioPrueba, "ej9.png", 1, "Avanzado", 0)
];

let idIdentificadorEj = 10;

document.querySelector("#btnSubirEjercicios").addEventListener("click", agregarEjercicio);
function agregarEjercicio() {
  let tituloCampo = document.querySelector("#txtTituloEjercicio").value;
  let descripcionCampo = document.querySelector("#txtDescripcionEjercicios").value;
  let nivelEstudianteCampo = document.querySelector("#slcNivelAlumnoEjercicios").value;

  let idProfersorCreador = 0; // PARA VER CUAL ES EL PROFESOR QUE INICIÓ SESION
  if (usuarioEnSesion > 0) {
    idProfersorCreador = usuarioEnSesion;
  }

  let aparece = buscarElemento(ejercicios, "titulo", tituloCampo);

  if (nivelEstudianteCampo !== "-1") {
    if (!aparece) {
      if (tituloCampo !== "") {
        if (tituloCampo.length + descripcionCampo.length > 20) {
          if (tituloCampo.length + descripcionCampo.length < 200) {
            let fotoDePartitura = document.querySelector("#filePartiturasEjercicios").value;
            let partituraCampo = fotoDePartitura.substring(fotoDePartitura.lastIndexOf("\\") + 1);

            if (partituraCampo !== "") {
              let ejercicio = new Ejercicio(idIdentificadorEj, tituloCampo, descripcionCampo, partituraCampo, idProfersorCreador, nivelEstudianteCampo);
              ejercicios.push(ejercicio);
              idIdentificadorEj++;

            } else {
              alert("Debe seleccionar un archivo")
            }
          } else {
            alert("El ejercicio debe tener menos de 200 caracteres");
          }
        } else {
          alert("El ejercicio debe tener mas de 20 caracteres")
        }
      } else {
        alert("Debe ingresar un título")
      }
    } else {
      alert("El ejercicio ya existe")
    }
  } else {
    alert("Debe ingresar un nivel")
  }
}

//////////////////////////// BUSCAR EJERCICIOS PLANTEADOS ////////////////////////////////
//let estudianteNivel = obtenerObjeto(estudiantes, "IdEstudiante", usuarioEnSesion);
//console.log(estudianteNivel);
let estudianteNivel = 0;
document.querySelector("#btnSeccionEjerciciosPlanteados").addEventListener("click", mostrarEjercicios);
function mostrarEjercicios() {
  document.querySelector("#pTodosLosEjercicios").innerHTML = "";
  estudianteNivel = obtenerObjeto(estudiantes, "IdEstudiante", usuarioEnSesion);

  for (let i = 0; i < ejercicios.length; i++) {
    const ejercicio = ejercicios[i];
    if (ejercicio.nivelEj == estudianteNivel.nivelEst && ejercicio.idProfersorCreador == estudianteNivel.profesorAsignado) {
      document.querySelector("#pTodosLosEjercicios").innerHTML +=
        `<hr> ${ejercicio.titulo} <br>
      ${ejercicio.descripcion} <br>
    <img src="img/${ejercicio.imagenPartitura}"></img><br>`
    }
  }
  document.getElementById("txtBuscadorEjercicio").value = "";
}

document.querySelector("#btnBuscadorEjercicio").addEventListener("click", buscarEjercicio);
function buscarEjercicio() {
  document.querySelector("#pResultados").innerHTML = "";
  // buscar el nivel del alumno
  let estudianteQueBusca = obtenerObjeto(estudiantes, "IdEstudiante", usuarioEnSesion);
  let nivelEstudianteQueBusca = estudianteQueBusca.nivelEst;
  //buscar el profesor asignado que tiene el alumno
  let profesorEstudianteQueBusca = estudianteQueBusca.profesorAsignado;

  let busquedaCampo = document.querySelector("#txtBuscadorEjercicio").value;
  let objetoEncontrado;
  let encontroTitulo = false;
  let encontro = false;
  for (let i = 0; i < ejercicios.length; i++) {
    const cadaEjercicio = ejercicios[i];
    if (busquedaCampo.toLowerCase() == cadaEjercicio.titulo.toLowerCase() && nivelEstudianteQueBusca == cadaEjercicio.nivelEj && profesorEstudianteQueBusca == cadaEjercicio.idProfersorCreador) {
      encontroTitulo = true;
      objetoEncontrado = cadaEjercicio;
      break;
    }
  }

  if (!encontroTitulo) {
    for (let i = 0; i < ejercicios.length; i++) {
      const cadaEjercicio = ejercicios[i];
      if (busquedaCampo.toLowerCase() == cadaEjercicio.descripcion.toLowerCase() && nivelEstudianteQueBusca == cadaEjercicio.nivelEj && profesorEstudianteQueBusca == cadaEjercicio.idProfersorCreador) {
        encontro = true;
        objetoEncontrado = cadaEjercicio;
        break;
      }
    }
  }

  if (encontroTitulo || encontro) {
    alert("Se encotró un ejercicio");
    ocultarUno("#seccionTodosLosEjercicios");
    document.querySelector("#pResultados").innerHTML +=
      `Titulo: ${objetoEncontrado.titulo} <br>
  Descripcion: ${objetoEncontrado.descripcion} <br>
  <img src="img/${objetoEncontrado.imagenPartitura}">`
  } else {
    alert("No hay resultados que coincidan con su búsqueda");
    mostrarTodosLosEjerciciosNuevamente("#seccionTodosLosEjercicios")
    // cambiarSeccion("seccionTodosLosEjercicios");
  }
  document.getElementById("txtBuscadorEjercicio").value = "";
}


//////////////////////////// ENTREGA DE EJERCICIOS ////////////////////////////////

class Resolucion {
  constructor(idDelEj, audioRe, devRe, audio, idProf, nivelRe, idEstRe, resuelto) {
    this.idEjercicio = idDelEj;
    this.tituloAudio = audioRe;
    this.devolucion = devRe;
    this.audio = audio;
    this.idProfe = idProf;
    this.nivelResolucion = nivelRe;
    this.idEstudianteResulve = idEstRe;
    this.resolucion = resuelto;
    this.nombreEstudiante;
  }//audio y devolucion son con contenido. El resto son vinculos
}
let devolucionPrueba = "esta es la devolucion del ejercicio resuelto"
let resoluciones = [
  new Resolucion(1, "Ejercicio 01", "hola holaHOLA", "ej1.m4a", 1, "Inicial", -1, 0),
  new Resolucion(2, "Ejercicio 02", devolucionPrueba, "ej2.m4a", 1, "Inicial", -1, 0),
  new Resolucion(3, "Ejercicio 03", devolucionPrueba, "ej3.m4a", 1, "Inicial", -2, 1),
  new Resolucion(4, "Ejercicio 04", devolucionPrueba, "ej4.m4a", 1, "Intermedio", -2, 0),
  new Resolucion(5, "Ejercicio 05", devolucionPrueba, "ej5.m4a", 1, "Intermedio", -2, 1),
  new Resolucion(6, "Ejercicio 06", devolucionPrueba, "ej6.m4a", 1, "Intermedio", -1, 0),
  new Resolucion(7, "Ejercicio 07", devolucionPrueba, "ej7.m4a", 1, "Avanzado", -2, 1),
  new Resolucion(8, "Ejercicio 08", devolucionPrueba, "ej8.m4a", 1, "Avanzado", -2, 0),
  new Resolucion(9, "Ejercicio 09", devolucionPrueba, "ej9.m4a", 1, "Avanzado", -3, 1)
];


//////////////////////////// CORREGIR TAREAS ////////////////////////////

let conseguirIdEstudiante = 0;
let estudianteResuelve;
let nombreEstudianteResuelve;
corregirTarea();
function corregirTarea() {
  for (let i = 0; i < resoluciones.length; i++) {
    const cadaResolucion = resoluciones[i];
    conseguirIdEstudiante = cadaResolucion.idEstudianteResulve;
    estudianteResuelve = obtenerObjeto(estudiantes, "IdEstudiante", conseguirIdEstudiante);
    nombreEstudianteResuelve = estudianteResuelve.nombreEst;
    cadaResolucion.nombreEstudiante = nombreEstudianteResuelve;

    if (cadaResolucion.resolucion == 0) {
      document.querySelector("#pListaEjercicios").innerHTML +=
        `${cadaResolucion.tituloAudio}<br>
      ${cadaResolucion.nombreEstudiante}<br>
      ${cadaResolucion.nivelResolucion}<br>
      <audio src="audio/${cadaResolucion.audio}"controls></audio><br>
      <textarea cols="40" rows="5" class="textAreas" data-txtArea=${cadaResolucion.idEjercicio} ></textarea><br>
      <input type="button" value="Enviar" data-idEnviar=${cadaResolucion.idEjercicio} class="btnEnviarDev"><hr>`
    }
  }

  let botonesEnviarDevolucion = document.querySelectorAll(".btnEnviarDev");
  for (let i = 0; i < botonesEnviarDevolucion.length; i++) {
    const cadaBoton = botonesEnviarDevolucion[i];
    cadaBoton.addEventListener("click", enviarDevolucion);
  }

}

let contadorEjercicios = 0
function enviarDevolucion() {
  let devolucionAEnviar = Number(this.getAttribute("data-idEnviar"));
  console.log(devolucionAEnviar);

  let estudianteDelEjercicio = obtenerObjeto(resoluciones, "idEjercicio", devolucionAEnviar)
  console.log(estudianteDelEjercicio);

  let idEstudianteDelEjercicio = estudianteDelEjercicio.idEstudianteResulve;
  console.log(idEstudianteDelEjercicio);

  let objetoEstudianteFinal = obtenerObjeto(estudiantes,"idEstudiante",idEstudianteDelEjercicio);
  console.log(objetoEstudianteFinal);
}


//----------------------------------------------------------------------------
//-----------------------------------------------------------------------------------


/*class Ejercicio {//clase de los ejercicios planteados
  constructor(tituloEj, descripcionEj, imagEj, idEj, idProfeCrea, nivEj) {

      this.titulo = tituloEj;
      this.descripcion = descripcionEj;
      this.imagenPartitura = imagEj;
      this.idEjercicio = idEj;
      this.idProfersorCreador = idProfeCrea;
      this.nivelEj = nivEj;

  }//titulo, descripcion e imagen son con contenido. El resto son vinculos

}

let ejercicios = [];//array de ejercicios planteados por los profesores

//---------------------------------------------------------------------------

class Ejercicio {//clase de los ejercicios planteados
  constructor(tituloEj, descripcionEj, imagEj, idEj, idProfeCrea, nivEj) {

      this.titulo = tituloEj;
      this.descripcion = descripcionEj;
      this.imagenPartitura = imagEj;
      this.idEjercicio = idEj;
      this.idProfersorCreador = idProfeCrea;
      this.nivelEj = nivEj;

  }//titulo, descripcion e imagen son con contenido. El resto son vinculos

}

let ejercicios = [];//array de ejercicios planteados por los profesores

//---------------------------------------------------------------------------

class Resolucion {//clase de las resoluciones de ejercicios planteados
  constructor(audioRe, devRe, idRe, idDelEj, idProf, idEstRe, nivelRe) {
      this.audio = audioRe;
      this.devolucion = devRe;
      this.idResolucion = idRe;
      this.idDelEjercicio = idDelEj;
      this.idProfe = idProf;
      this.idEstudianteReulve = idEstRe;
      this.nivelResolucion = nivelRe;
  }//audio y devolucion son con contenido. El resto son vinculos
}

let resoluciones = [];//array de ejercicios resueltos por los estudiantes

//----------------------------------------------------------------------------

let idIdentificadorEj = 1000;
let idProfesorCread = 10000;//tiene que venir del id del profesor que crea el ejercicio(este es solo para que funcione)
document.querySelector("#btnSubirEjercicios").addEventListener("click", agregarEjercicio);


function agregarEjercicio() {
  let tituloCampo = document.querySelector("#txtTituloEjercicio").value;
  //let partituraCampo = document.querySelector("#filePartiturasEjercicios").value;
  let descripcionCampo = document.querySelector("#txtDescripcionEjercicios").value;
  let nivelEstudianteCampo = document.querySelector("#slcNivelAlumnoEjercicios").value;








  let aparece = buscarElemento(ejercicios, "titulo", tituloCampo);
  if (!aparece && tituloCampo !== "" && descripcionCampo !== "") {
      if (tituloCampo.length + descripcionCampo.length > 20 && tituloCampo.length + descripcionCampo.length < 200) {
          let fotoDePartitura = document.querySelector("#filePartiturasEjercicios").value;

          let partituraCampo = fotoDePartitura.substring(fotoDePartitura.lastIndexOf("\\") + 1);

          if (partituraCampo !== "") {

              let ejercicio = new Ejercicio(tituloCampo, descripcionCampo, partituraCampo, idIdentificadorEj, idProfesorCread, nivelEstudianteCampo);



              idIdentificadorEj++;
              idProfesorCread++;// tiene que venir del id del profesor que esta creando el nuevo ejercicio
              //cuando el profesor inicia su sesión tiene que guardarse su id en una variable de donde pueda
              //traerla al nuevo ejercicio
              ejercicios.push(ejercicio);

          }
      }
  } else {
      alert("hay errores");//solo aparece el alert la primera vez

  }
}








function buscarElemento(arrElementos, propiedad, dato) {
  let existe = false;
  for (let i = 0; i < arrElementos.length; i++) {
      const elemento = arrElementos[i];
      if (elemento[propiedad] === dato) {
          existe = true;
          break;
      }
  }
  return existe;
}


//-----------------------------------------------------------------------------------


document.querySelector("#btnInicarSesion").addEventListener("click", cargarEstudiante);
//como se llame el boton de iniciar sesión

//como se llame el campo donde ingreso el nombre (ú obtenerlo del objeto de ese estudiante)
function cargarEstudiante(){
  let obtenerNombreEstudiante = document.querySelector("#txtNombre").value;
   document.querySelector("#pNombreAlumno").innerHTML = obtenerNombreEstudiante;





}*/


