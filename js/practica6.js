/**
 * Created by Eleazar on 10/19/2017.
 */
//calling one function inside another function
function uno(){
    var uno = document.getElementById("callFunction");

    if(uno.style.display==="none"|| uno.style.display===""){
        uno.style.display="block";
        uno.innerHTML = "Hi I am the function 1, then I'm going to call " +
            "the function 2.";
    }else{
        uno.style.display="none";
    }
    dos();
}
function dos(){
    var doss = document.getElementById("dos");
    if(doss.style.display==="none"|| doss.style.display===""){
        doss.style.display="block";
        doss.innerHTML = "Hi, the function one called me";
    }else{
        doss.style.display="none";
    }
}
//replace name
function changeName() {
    var enter = document.getElementById("in");
    var inter = enter.value;
    var print = document.getElementById("changeName");

    if(inter == null || inter.length == 0 || /^\s+$/.test(inter)){
        swal("Please Insert a value");
    }else {
        print.innerHTML = inter;
        document.getElementById("myForm").reset();
    }

}
//change background
function changeB() {
    var body = document.body;
    if(body.className===""){
        body.className = "background";
    }else if (body.className==="background") {
        body.className = "background-image";
    }else {
        body.className = "";
        body.style.color = "white";
    }
}
//mathOperations
function mathOperation() {
    var a = document.getElementById("numberOne").value;
    var b = document.getElementById("numberTwo").value;
    var printResul = document.getElementById("printResult");
    var select = document.getElementById("select-property");
    //obtener el texto que muestra la opcion seleccionada
    var listTextSelected = select.options[select.selectedIndex].text;


    if(a === null || b === null || a.length === 0 || b.length === 0 || isNaN(a) || isNaN(b)){
        swal("You need to enter a number");
    } else {
    switch (listTextSelected){
        case "Operations":
            swal("You must select one option");
            return false;
        case "Addition":
            printResul.innerHTML = (parseInt(a) + parseInt(b));//se usa parseInt para que pueda sumar las variables, de paso tiene que estan en parentesis
            break;
        case "Subtraction":
            printResul.innerHTML =(a-b);
            break;
        case "Multiplication":
            printResul.innerHTML = (a*b);
            break;
        case "Division":
            printResul.innerHTML = (a/b);
            break;
        case "Modulus":
            printResul.innerHTML = (a%b);
        }
        document.getElementById("Myform").reset();
    }
}
//create a node
function createNode() {
    var createNode = document.getElementById("createNode").value;
    var list = document.createElement("li");
    var contenido = document.createTextNode(createNode);
    var lista = document.getElementById("list");
    if(createNode === null || createNode.length === 0 || /^\s+$/.test(createNode)){
        swal("Please, insert a Framework")
    }else {
        list.appendChild(contenido);
        lista.appendChild(list);
        document.getElementById("form").reset();
    }

}



//delere a node
function deleteNode() {
    var list = document.getElementById("lista");
    list.parentNode.removeChild(list);
}

//clickin on
function clickOn(elEvento) {
    var evento = elEvento || window.event;
    var coordenadaX = evento.clientX;
    var coordenadaY = evento.clientY;
    var clickOn = document.getElementById("clickOn");

    if(coordenadaX<654 && coordenadaY<350){
        clickOn.innerHTML = "You are at the left-top";
    }else if(coordenadaX<654 &&coordenadaY>350){
        clickOn.innerHTML ="You are at the left-bottom";
    }else if(coordenadaX>654 && coordenadaY<350){
        clickOn.innerHTML = "You are at the right-top";
    }else {
        clickOn.innerHTML = "You are at the right-bottom";
    }
}

document.onclick = clickOn;

//Mouse ON page and screen
function information(elEvento) {
    var pag = document.getElementById("webPage");
    var nave = document.getElementById("explorer");
    var evento = elEvento || window.event;
    var coordenadaX = evento.clientX;
    var coordenadaY = evento.clientY;
    var coordenadaX1 = evento.pageX;
    var coordenadaY1 = evento.pageY;

    switch(evento.type) {
        case 'mousemove':
            pag.innerHTML = coordenadaX1 +", "+coordenadaY1;
            nave.innerHTML = coordenadaX +", " +coordenadaY;
            break;
        default:
            document.onmousemove = function(elEvento) {
                var pag = document.getElementById("webPage");
                var nave = document.getElementById("explorer");
                var evento = elEvento || window.event;
                var coordenadaX = evento.clientX;
                var coordenadaY = evento.clientY;
                var coordenadaX1 = evento.pageX;
                var coordenadaY1 = evento.pageY;

                pag.innerHTML = coordenadaX1 +", "+coordenadaY1;
                nave.innerHTML = coordenadaX +", " +coordenadaY;
            };
            break;
    }
}
document.onmousemove = information;







