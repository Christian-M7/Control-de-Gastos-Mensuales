let nombreGasto = document.getElementById('nombreGasto');
let valorGasto = document.getElementById('valorGasto');
let descripcionGasto = document.getElementById('descripcion');
let listaNombreGastos = [];
let listaValorGastos = [];
let listaDescripcionGastos = [];
const listaElementos = document.getElementById('listaDeGastos');
let gastoTotalElementos = document.getElementById('totalGastos');

// Variables para el modo edición
let editIndex = -1; // Índice del gasto en edición, -1 indica que no se está editando
let botonFormulario = document.getElementById('botonFormulario');

function clickBoton(){

     // Validar si los campos de nombre y valor están llenos
     if (!nombreGasto.value.trim()) {
        alert("Por favor, ingresa el nombre del gasto.");
        return; // Detiene la ejecución si no se ha ingresado un nombre
    }

    if (!valorGasto.value || valorGasto.value <= 0) {
        alert("Por favor, ingresa un valor mayor a 0.");
        return; // Detiene la ejecución si no se ha ingresado un valor válido
    }

    if (editIndex === -1) {
        // Modo agregar
        agregarGasto();
    } else {
        // Modo actualizar / edición
        actualizarGasto();
    }
}

function agregarGasto(){

    listaNombreGastos.push(nombreGasto.value);
    listaValorGastos.push(valorGasto.value);
    listaDescripcionGastos.push(descripcionGasto.value);

    //genera o actualiza la lista
    listaGastos();

}

function listaGastos(){

    let vistaLista = '';
    let gastosTotal = 0;
    
    listaNombreGastos.forEach((elemento, posicion) => {
        const valorElemento = Number(listaValorGastos [posicion]);
        const descripcionElemento = listaDescripcionGastos [posicion];
        let alertaPrecio = '';

        if(valorElemento >= 150){
            alertaPrecio = '<span style="color: red;"> <- Este es igual o mayor a 150$!!</span>';
        } else {
            alertaPrecio = '';
        }

        //Lista de los gastos (elementos) en el html
        vistaLista += `<li> ${elemento} - USD ${valorElemento.toFixed(2)} | ${descripcionElemento} | ${alertaPrecio}
            <div class="input-group">    
                <button onclick="editarElemento(${posicion})">Editar</button>
                <button onclick="eliminarElemento(${posicion})">X</button>
            </div>
        </li>`;
        //Sumatoria total en el html
        gastosTotal += Number(valorElemento);
    });

    listaElementos.innerHTML = vistaLista;
    gastoTotalElementos.innerHTML = gastosTotal.toFixed(2);

    limpiar();
}

function limpiar(){
    nombreGasto.value = '';
    valorGasto.value = '';
    descripcionGasto.value = '';
    //en caso de que es edición
    editIndex = -1; // Resetea el índice de edición
    botonFormulario.innerHTML = 'Agregar Gasto'; // Cambia el botón de nuevo a "Agregar Gasto"
}

function eliminarElemento(posicion){
    listaNombreGastos.splice(posicion,1);
    listaValorGastos.splice(posicion,1);
    listaDescripcionGastos.splice(posicion,1);

    listaGastos();
}

function editarElemento(posicion){
    // Carga los valores en los inputs para ser editados
    nombreGasto.value = listaNombreGastos[posicion];
    valorGasto.value = listaValorGastos[posicion];
    descripcionGasto.value = listaDescripcionGastos[posicion];

    // Actualiza el índice del elemento en edición
    editIndex = posicion;

    // Cambia el texto del botón a "Actualizar Gasto"
    botonFormulario.innerHTML = 'Actualizar Gasto';
}

function actualizarGasto(){
    // Actualiza los arrays con los nuevos valores
    listaNombreGastos[editIndex] = nombreGasto.value;
    listaValorGastos[editIndex] = Number(valorGasto.value);
    listaDescripcionGastos[editIndex] = descripcionGasto.value;

    // Genera nuevamente la lista de gastos actualizada
    listaGastos();
}