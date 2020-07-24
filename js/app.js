// ------------------- Variables ----------------

const presupuestoUsuario = prompt("Cual es tu presupuesto Semanal?");
let cantidadPresupuesto;
const formulario = document.getElementById('agregar-gasto');

// -------------------- Clases ---------------------

class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto)
    }
    presupuestoRestante(cantidad = 0) {
        return this.restante -= Number(cantidad);
    }
}
//Calse Interfaz manejo todo lo relacionado con el html
class Interfaz {
    insertarPresupuesto(cantidad){
        const presupuestoSpan = document.getElementById('total');
        const restanteSpan = document.getElementById('restante');
        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`
    }
    imprimirMensaje(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));
        // insertar en el DOM
        document.querySelector('.primario').insertBefore(divMensaje, formulario);
        // quitar el alert despues de 3 segundos
        setTimeout(function(){
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 3000);
    }
}



// ---------------- Events Listeners -------------------

document.addEventListener('DOMContentLoaded', function(){
    if(presupuestoUsuario === null || presupuestoUsuario === ''){
        window.location.reload();
    } else {
        // se instancia Presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        //Se instancia clase Interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);     
    }
})

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    // se lee del formulario de gastos
    const nombreGasto = document.getElementById('gasto').value;
    const cantidadGasto = document.getElementById('cantidad').value;

    const ui = new Interfaz();
    //Comprobar que los campos no esten vacios
    if(nombreGasto ==='' || cantidadGasto ===''){
        ui.imprimirMensaje('hubo un error, por favor complete los campos', 'error');
    } else {
        ui.imprimirMensaje('agregando gasto...', 'correcto');
    }
})