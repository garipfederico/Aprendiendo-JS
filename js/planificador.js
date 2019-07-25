var correlParaCursarRegulares = [[0,0],[0,0],[0,0],[1,2,3],[4],[1],[1],[1],[1]];
var correlParaCursarAprobadas = [[0,0],[0,0],[0,0],[0,0,0],[4],[1],[1],[1],[1]];

function cargarAño(){
	var d = new Date();
	document.getElementById("añoInicial").innerHTML += " " + d.getFullYear();
}


function ocultar(valor1, valor2){
	var materiasOcultar = document.getElementsByClassName(valor1);
	var materiasMostar = document.getElementsByClassName(valor2);
	var i;
	for (i = 0; i < materiasOcultar.length; i++) {
		materiasOcultar[i].style.display = 'None';
		}

	for (i = 0 ; i < materiasMostar.length; i++){
		materiasMostar[i].style.display = ''
		}
}

	function setEstado(este){
	estadoActual = este.innerHTML;
	if (estadoActual == 'Regular'){
		este.innerHTML = 'Aprobada';
		este.className = 'A';
	}
	if (estadoActual == 'Aprobada'){
		este.innerHTML = 'No Cursada';
		este.className = 'NC';
	}
	if ( estadoActual == 'No Cursada'){
		este.innerHTML = 'Regular';
		este.className = 'R';
	}
}

function materias(){
	var materias = document.getElementById('materias');
	//var materiasLista = materias.getElementsByTagName('TR');
	var materiasLista = materias.getElementsByClassName('comun' || 'ingenieria' || 'analista');
	//var materiasTotales = tabla.getElementId('materias');
	//var materiasTot = materiasTotales.item(1);
	//materiasTot.remove();
	return materiasLista;
}

function disponibilidadAñosiguiente(){
	var tabla = document.getElementById('Tabla');
	var materias = tabla.getElementsByTagName('TR');
	var materiasNoCursada = materiaEstado("No Cursada");
	var materiasRegular = materiaEstado("Regular");
	var materiasAprobada = materiaEstado("Aprobada");
	var materiasACursar = listadoParaCursar(materiasNoCursada);
	//var visual = materiasACursar[0].innerHTML;
	//alert(visual);
	document.getElementById('materias').innerHTML +=  "<br><div> Año siguiente </div> "
	var i; 
	for (i=0 ; i < materiasACursar.length ; i++){
		document.getElementById('materias').innerHTML += materiasACursar[i].innerHTML;
	}
}
// Recibe un estado (No cursada, regular o aprobada)
// devuelve el listado de materias que lo cumplen
function materiaEstado(estado){
	var listadoMateriasSegunEstado = [];
	var i;
	var materiasTotales = materias();
	for (i=0 ; i < materiasTotales.length; i++){
		var estadoActual = materias()[i].getElementsByTagName('TD')[3].innerHTML;
		if( estadoActual == estado){
			listadoMateriasSegunEstado.push(materias()[i]);
		}
	}
	return listadoMateriasSegunEstado
}
// Recibe un listado de no cursadas y devuelve aquellas que estan habilitadas para cursar
function listadoParaCursar(noCursadas){
	listadoParaCursa = [];
	var i;
	for (i=0 ; i < noCursadas.length ; i++){
		if ((verificarCursadas(noCursadas[i]) == true) && (verificarAprobadas(noCursadas[i]) == true)) {
			listadoParaCursa.push(noCursadas[i]);
			//alert(noCursadas[i].innerHTML);
		}
	}
	return listadoParaCursa;
}

function listadoParaNoCursar(noCursadas) {
	listadoParaNoCursa = [];
	var i;
	for (i = 0; i < noCursadas.length; i++) {
		if ((verificarCursadas(noCursadas[i]) == true) && (verificarAprobadas(noCursadas[i]) == true)) {
			//alert(noCursadas[i].innerHTML);
		} else {
			listadoParaNoCursa.push(noCursadas[i]);
		}
	}
return listadoParaNoCursa;
}
// Recibe un Dom de una materia y devuelve el DOM de sus correlativas dependiendo cur o aprob
function listarMateriasPorCondicion(unaMateria, arrayCondiciones){
	var id = unaMateria.getElementsByTagName('TD')[0].innerHTML-1;
	//alert('id: ' + id);
	var listadoRegularesPorID = arrayCondiciones[id];
	//alert('longitud: ' + listadoRegularesPorID.length);
	//var correlParaCursarRegulares = [[0],[0],[0],[1,2,3],[4],[1],[1],[1],[1]];
	var listaCorrelDOM = [];
	var i;
	for (i=0 ; i < listadoRegularesPorID.length ; i++){
		var materiaDOM = materias()[listadoRegularesPorID[i]];
		listaCorrelDOM.push(materiaDOM);
	}
    return listaCorrelDOM;
}

function verificarCursadas(unaMateria){
	var i;
	var correlDOM = listarMateriasPorCondicion(unaMateria, correlParaCursarRegulares);
	var verifica = true;
	var cantDeCorrelativas = correlDOM.length;
	for (i=0; i < cantDeCorrelativas ; i++){
		var estadoCorrelativa = correlDOM[i].getElementsByTagName('TD')[3].innerHTML;
		if ((estadoCorrelativa == "Regular") || estadoCorrelativa == "Aprobada" ){
		}else{
			verifica = false;
		}
	}
	return verifica;
}

function verificarAprobadas(unaMateria){
	var i;
	var correlDOM = listarMateriasPorCondicion(unaMateria, correlParaCursarAprobadas);
	var verifica = true;
	var cantDeCorrelativas = correlDOM.length;
	for (i=0; i < cantDeCorrelativas ; i++){
		var estadoCorrelativa = correlDOM[i].getElementsByTagName('TD')[3].innerHTML;
		if (estadoCorrelativa == "Aprobada" ){
		}else{
			verifica = false;
		}
	}
	return verifica;
}

function setEstadoInicial() {
	var aprobadas = materiaEstado('Aprobada');
	var regulares = materiaEstado('Regular');
	var noCursadas = materiaEstado('No Cursada');
	var habilitadas = listadoParaCursar(noCursadas);
	var noHabilitadas = listadoParaNoCursar(noCursadas);

	document.getElementById('materias').innerHTML = '';
	i = 0;
	for (i = 0; i < aprobadas.length; i++) {
		document.getElementById('materias').innerHTML += aprobadas[i].innerHTML;
	}
	document.getElementById('materias').innerHTML += '<tr><td colspan="6">indicar objetivos para el año academico actual</td></tr>';
	for (i = 0; i < regulares.length; i++) {
		document.getElementById('materias').innerHTML += regulares[i].innerHTML;
	}
	for ( i = 0; i < habilitadas.length; i++ ){
		document.getElementById('materias').innerHTML += habilitadas[i].innerHTML;
	}
	document.getElementById('materias').innerHTML += '<tr><td colspan="6">Materias no disponibles aun...</td></tr>';
	for ( i = 0; i < noHabilitadas.length; i++ ){
		document.getElementById('materias').innerHTML += noHabilitadas[i].innerHTML;
	}

}