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
    insertarPresupuesto(cantidad) {
        const presupuestoSpan = document.getElementById('total');
        const restanteSpan = document.getElementById('restante');
        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`
    }
    imprimirMensaje(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));
        // insertar en el DOM
        document.querySelector('.primario').insertBefore(divMensaje, formulario);
        // quitar el alert despues de 3 segundos
        setTimeout(function () {
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 3000);
    }
    agregarGastoListado(gasto) {
        const listaGastos = document.querySelector('#gastos ul');
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between aling-items-center';
        li.innerHTML = `
                ${gasto.nombre}
            <span class='badge badge-primary badge-pill'> $ ${gasto.cantidad}</span>
        `;
        listaGastos.appendChild(li);
    }
    mostrarPresupuestoRestante(cantidad) {
        const restante = document.getElementById('restante');
        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);
        restante.innerHTML = `${presupuestoRestanteUsuario}`;
        this.comprobarPresupuesto();
    }
    comprobarPresupuesto() {
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;
        const restante = document.querySelector('.restante');
        //Comprueba cuanto queda del presupuesto y dependiendo 
        // de la cantidad lo va a mostrar en distintos colores

        if((presupuestoTotal/4) > presupuestoRestante) {
            restante.classList.remove('alert-success','alert-warning');
            restante.classList.add('alert-danger');
        } else if((presupuestoTotal/2) > presupuestoRestante) {
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }
    }
}

class Gasto {
    constructor(nombre, cantidad) {
        this.nombre = nombre;
        this.cantidad = cantidad;
    }
}

// ---------------- Events Listeners -------------------

document.addEventListener('DOMContentLoaded', function () {
    if (presupuestoUsuario === null || presupuestoUsuario === '') {
        window.location.reload();
    } else {
        // se instancia Presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        //Se instancia clase Interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
})

formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    // se lee del formulario de gastos
    const nuevoGasto = new Gasto();
    nuevoGasto.nombre = document.getElementById('gasto').value;
    nuevoGasto.cantidad = document.getElementById('cantidad').value;

    const ui = new Interfaz();
    //Comprobar que los campos no esten vacios
    if (nuevoGasto.nombre === '' || nuevoGasto.cantidad === '') {
        ui.imprimirMensaje('hubo un error, por favor complete los campos', 'error');
    } else {
        ui.imprimirMensaje('agregando gasto...', 'correcto');
        ui.agregarGastoListado(nuevoGasto);
        ui.mostrarPresupuestoRestante(nuevoGasto.cantidad);
    }
})