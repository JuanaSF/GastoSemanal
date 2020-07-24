// ------------------- Variables ----------------

let presupuestoUsuario = prompt("Cual es tu presupuesto Semanal?");
let cantidadPresupuesto;

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