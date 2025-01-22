let numeroSecreto = 0;
let intentos = 0;
let numeroMaximo = 10;
let numerosRepetidos = [];

function deshabilitarBoton(id,estado){
    document.querySelector(id).setAttribute(estado,'true');
    return;
}
function removerAtributo(id,atributo){
    document.querySelector(id).removeAttribute(atributo);
    return;
}

function verificarIntento(){
    //toma el valor q ingresa el usuario
    let numeroUsuario = parseInt(document.querySelector('#valorUsuario').value);
    
    if (numeroUsuario === '' || isNaN(numeroUsuario) || numeroUsuario < 1 || numeroUsuario > numeroMaximo) {
        asignarTextoElemento ('p','Ese valor no es valido!!! por favor, ingresa un valor del 1 al 10 o inicia un nuevo juego.');
        limpiarCaja();
    } else{
        if (numeroUsuario === numeroSecreto){
            asignarTextoElemento('p', `Muy bien, el numero era ${numeroSecreto}. Acertaste  en ${intentos} ${(intentos == 1) ? 'intento' : 'intentos'}.`);
            removerAtributo('#reiniciar','disabled')
            limpiarCaja();
            deshabilitarBoton('#valorUsuario','disabled');
            deshabilitarBoton('#iniciar','disabled');    
        } else {//el usuario no acerto y se verifica si el numero es mayor o menor
            limpiarCaja();
            if (numeroUsuario > numeroSecreto) {
                asignarTextoElemento('p', 'El numero secreto es menor.');
            } else {
                asignarTextoElemento('p','El numero secreto es mayor.');
            }
        }
        intentos++;
    }
}       
function reiniciarCondiciones () {
    // Vuelve a como estaba el parrafo y el titulo, genera un numero secreto y reinicia los intentos 
    asignarTextoElemento('h1', 'El juego del numero');
    asignarTextoElemento('p',`Elegi un numero del 1 al ${numeroMaximo}:`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    limpiarCaja();
}

function reiniciarJuego() {
    reiniciarCondiciones();
    removerAtributo('#iniciar','disabled')
    removerAtributo('#valorUsuario','disabled') 
    numerosRepetidos = [];
}


function asignarTextoElemento(elemento,texto) {
    let elementoTitulo = document.querySelector(elemento);
    elementoTitulo.innerHTML = texto;
}
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}
function generarNumeroSecreto(){
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    console.log(numeroGenerado);
    console.log(numerosRepetidos);
    // verifica si se llego al maximo de elementos en la lista
    if (numerosRepetidos.length == Math.floor(numeroMaximo/2)){
        numerosRepetidos = [];
        return generarNumeroSecreto();
    }else{
        // verifica si el numero generado esta en la lista, si no esta, lo agrega, si esta, devuelve otro numero random
        if (numerosRepetidos.includes(numeroGenerado)){
            return generarNumeroSecreto();
        } else{
            numerosRepetidos.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

reiniciarCondiciones();


