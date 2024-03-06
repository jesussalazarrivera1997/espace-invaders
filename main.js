

class Marcianos {

    constructor(id, x = 20, y = 20) {
        //CUADRADO construlle el cuerpo del marcianito
        this.elementoCuadrado = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.elementoCuadrado.setAttribute("id", id);
        this.carid = id
        this.elementoCuadrado.setAttribute("x", x);
        this.carx = x;
        this.elementoCuadrado.setAttribute("y", y);
        this.cary = y;
        this.elementoCuadrado.setAttribute("width", 10);
        this.acho = 10
        this.elementoCuadrado.setAttribute("height", 10);
        this.alto = 10
        this.elementoCuadrado.setAttribute("fill", "gray");
        this.accion = "parar";
        console.log(this.elementoCuadrado)
        document.getElementById("lienzo").appendChild(this.elementoCuadrado);
    }

    mover(cantidad = 40, direccion) {
        //las direcciones se dan con cuatro numeros  y la cantidad la distancia
        //1. mueve a la derecha
        //2. mueve a la izquierda
        //3. mueve hacia abajo
        console.log(direccion)
        var marciano = document.getElementById(this.carid);
        switch (direccion) {
            case 1:
                this.carx = this.carx + cantidad;
                marciano.setAttribute("x", this.carx);
                break;
            case 2:
                this.carx = this.carx - cantidad;
                marciano.setAttribute("x", this.carx);
                break;
            case 3:
                this.cary = this.cary + cantidad;
                marciano.setAttribute("y", this.cary);
                break;
        }

    }
    parar() {
        this.accion = "parar";
    }
}

class Bala {
    constructor(id, x = 56, y = 40, tamannor = 5, coolor = "red", vely = -5) {


        // CIRCULO cuerpo de la bala 
        this.elemento = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        this.elemento.setAttribute("cx", x);
        this.elemento.setAttribute("cy", y);
        this.elemento.setAttribute("r", tamannor);
        this.elemento.setAttribute("id", id);
        this.alturac = document.getElementById("lienzo").getAttribute("height")
        this.anchurac = document.getElementById("lienzo").getAttribute("width")
        this.elemento.setAttribute("fill", coolor);
        document.getElementById("lienzo").appendChild(this.elemento);
        this.id = id;
        this.radio = tamannor;
        this.y = y;
        this.x = x
        this.vely = vely;

        this.moverbala = setInterval(() => {
            // movimiento de la vala 
            this.y = this.y + this.vely;
            var circulo = document.getElementById(this.id)
            circulo.setAttribute("cy", this.y);

        }, 20)

    }



}

class jugador {

    constructor(id, x = 20, y = 480, eventoss = ["d", "a", "s"]) {
        //CUADRADO forma del cuerpo del jugador 
        this.balas = [];
        this.contador = 0;
        this.elementoCuadrado = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.elementoCuadrado.setAttribute("id", id);
        this.eventos = eventoss;
        this.carid = id
        this.elementoCuadrado.setAttribute("x", x);
        this.carx = x;
        this.elementoCuadrado.setAttribute("y", y);
        this.cary = y;
        this.elementoCuadrado.setAttribute("width", 20);
        this.acho = 5
        this.elementoCuadrado.setAttribute("height", 20);
        this.alto = 60
        this.elementoCuadrado.setAttribute("fill", "black");
        this.accion = "parar";
        //this.elementoCuadrado.setAttribute("stroke","black");
        //this.elementoCuadrado.setAttribute("stroke-width",20);
        document.getElementById("lienzo").appendChild(this.elementoCuadrado);
        // set de movimientos y acciones del jugador 
        window.addEventListener("keydown", () => {
            if (window.event.key == this.eventos[0]) {
                this.accion = "derecha";
            }
            if (window.event.key == this.eventos[1]) {
                this.accion = "izquierda";
            }
            if (window.event.key == this.eventos[2]) {
                this.accion = "disparo";
            }
        });
        //disparar evento 
        window.addEventListener("keypress", () => {
            if (window.event.key == this.eventos[2]) {
                this.balas.push(new Bala(this.contador, this.carx + 10, this.cary));
                this.contador++;

            }
        });
        // evento mover a derecha e izquierda y parar cuando llege al limite de la pantalla 
        window.addEventListener("keyup", () => { this.accion = "parar" });
        this.mover =setInterval(() => {
            if (this.accion == "izquierda") {
                if (this.carx <= 5) {
                    this.accion = "parar";
                } else {
                    this.carx = this.carx - 5;
                    document.getElementById(this.carid).setAttribute("x", this.carx)
                }
            }
            if (this.accion == "derecha") {
                if (this.carx >= 490) {
                    this.accion = "parar";
                } else {
                    this.carx = this.carx + 5;
                    document.getElementById(this.carid).setAttribute("x", this.carx)
                }
            }

        }, 20)
    }
    parar() {
        this.accion = "parar";
    }
}


var listaMarcianos=[]
function crearMarcianos(numMar=10){
    //funcion variable que crea un numero de marcianitos 
    var idmarciano='id';
    var conta=0;
    var numy=20;
    listaMarcianos=[];
    do {
        var numx=40;
        while(numx<360){
            conta++ 
            numMar--
            numx=numx+40
            listaMarcianos.push(new Marcianos(idmarciano+conta,numx,numy))
        }
        numy=numy+30
        
        
    } while (numMar>=0);
};

crearMarcianos()


var contadormover=0

class Juego {
    constructor() {    
        this.jugador = new jugador("player")
        this.mar = listaMarcianos;
        this.jugar = setInterval(() => {
            this.chocar();
            this.mover()
        }, 20)
    }

    mover(){
        var listamov =this.mar
        contadormover++
         if(contadormover==100){
            listamov.forEach(element => {
                element.mover(40,2)
            })
        }
         if(contadormover==150){
            listamov.forEach(element => {
                element.mover(40,1)
            })
        }
        if(contadormover==200){
            listamov.forEach(element => {
                element.mover(40,1)
            })
        }
        if(contadormover==250){
            listamov.forEach(element => {
                element.mover(40,2)
            })
        }if (contadormover==350){
            listamov.forEach(element => {
                element.mover(40,3)
            })
        }
        if(contadormover>400){
            contadormover=0
        }

    }

    chocar() {
        var contenedorValas = this.jugador.balas;
        var contenedorMarcianos = this.mar;
        if (contenedorValas!=[]) {
        for (var bala of contenedorValas) {
            var puntos = [[(bala.y - bala.radio), bala.x], [(bala.y + bala.radio), bala.x], [bala.y, (bala.x - bala.radio)], [bala.y, (bala.x + bala.radio)]]
            for (var marciano of contenedorMarcianos) {
                for (var punto of puntos) {
                    // la bala choca y se elimina esta y el marciano
                    if ((punto[0] >= marciano.cary && punto[0] <= (marciano.cary + marciano.alto)) && (punto[1] >= marciano.carx && punto[1] <= (marciano.carx + marciano.acho))) {
                    document.getElementById(bala.id).remove();
                    document.getElementById(marciano.carid).remove();
                    var i = this.jugador.balas.indexOf(bala);
                    clearInterval(this.jugador.balas[i].moverbala)
                    this.jugador.balas.splice(i, 1);
                    var u = this.mar.indexOf(marciano);
                    this.mar.splice(u, 1);
                    }
                }
                if(bala.y<=0){
                    //la bala sale del cuadro y se elimina
                    document.getElementById(bala.id).remove();
                    var i = this.jugador.balas.indexOf(bala);
                    clearInterval(this.jugador.balas[i].moverbala);
                    this.jugador.balas.splice(i, 1);
                }
                
            }
        }
        if (this.mar.length == 0) {
            alert("Has ganado")
            clearInterval(this.jugar)
        }
    }
}
}
var juego = new Juego()