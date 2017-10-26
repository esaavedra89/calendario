/**
 *Practicas de Javascript, se usa libreria de FullCalendar, Jquery, SweetAlert, Bootstrap
 * pero para las funciones sera Javascript puro
 *
 * */

//Funcion que recoge datos de Modal de Bootstrap para mostrarlos en panatlla
//esta funcion sera para crear eventos
function getInfo(date) {
    var name = document.getElementById("recipient-name").value;
    var textArea = document.getElementById("message-text").value;
    if(name == null || textArea == null || name.length == 0 || textArea.length == 0 || /^\s+$/.test(name) || /^\s+$/.test(textArea)){
        swal("Casillas no deben quedar en blanco");
        return false;
    }else {
        swal("Usted ingreso: "+name + " "+textArea+" Pronto ingresaremos mas funciones");
    }
    document.getElementById("myForm").reset();//reseteamos formulario al enviarlo
    $('#exampleModal').appendTo("body").modal('hide');//ocultamos modal de Bootstrap
}

//Inicializamos el Fullcalendar
$(document).ready(function() {
    //pagina lista, inicializamos el calnedario

    $('#calendar').fullCalendar({
        //colcoar opciones y llamadas aqui
        header: {
            left: 'prev,next today',//
            center: 'title',//por defecto es fecha dependiendo de la vista
            right: 'agendaDay, agendaWeek, month'//lado derecho boton month,agendaWeek,agendaDay
        },
        defaultView: 'agendaWeek',//vista por defecto
        lang:'es',//lenguaje
        allDaySlot: false,//quita espacio de allday
        minTime: '8:00:00',//limita tiempo
        maxTime: '18:00:00',//limita tiempo
        weekends: false,//quita fines de semana
        navLinks: true,//habilita enlaces
        editable: true,//permite mover o estirar
        eventStartEditable: true,
        dragRevertDuration: 500,
        displayEventTime: true,
        displayEventEnd: true,
        selectable: true,
        //selectOverlap: true,
        slotEventOverlap: false,
        eventLimit: false,
        nowIndicator: true,
        //selectConstraint: true,

        /*eventDrop-Depositar Evento, funcion que maneja los casos de mover eventos de lugar con el mouse
            con esat funcion puedes permitir o denegar movimientos de los eventos, revertilos si asi lo deseas
        */
        eventDrop: function(event, delta, revertFunc) {

            alert(event.title + " fue movido a la fecha " + event.start.format("DD/MM/YYYY, h:mm:ss")),
            /*if (!confirm("Desea realizar dicho cambio?")) {
                revertFunc();
            }*/
            //sweetalet para manejar la toma de desiciones
            swal("Desea realizar dicho cambio?", {
                buttons: {
                    Si: true,
                    No: "No!"
                }
            })
                .then((value) => {
                switch (value) {
                case "Si":
                    swal("Excelente!", "Movimiento exitoso!", "success",{
                        timer:2000,
                    });
                    break;
                default:
                    swal("Cancelado!",{
                        timer: 2000,

                    })
                    revertFunc()
                }
            })
        },
        eventResizeStop: function( event, jsEvent, ui, view, revertFunc ) {
            alert(event.title + " fue fue estirado " + event.end.format("DD/MM/YYYY, h:mm:ss"));
                if (!confirm("Desea realizar dicho cambio?")) {
                 revertFunc();
                 }
        },
        /*eventDragStop: function( event, jsEvent, ui, view, businessHours ) {
            if(event==businessHours){
                alert("hola");
            }
        },*/
        /*eventAllow: function(dropLocation, draggedEvent) {
            if (draggedEvent.id === '999') {
                return String(dropLocation.resourceId).indexOf('a') >= 0; // boolean
            }
            else {
                return true;
            }
        },*/
       eventConstraint: 'businessHours',
        businessHours:
            // days of week. an array of zero-based day of week integers (0=Sunday)
            //className: 'fc-nonbusiness',//clase a modificar
            /*dow: [ 1, 2, 3, 4, 5 ], // Monday - Friday
            start: '12:00', // a start time (10am in this example)
            end: '13:00' // an end time (6pm in this example)*/

            [ //Especificamos el horario no laborable paa el medio dia
                {
                    dow: [ 1, 2, 3, 4, 5 ], // Monday, Tuesday, Wednesday
                    start: '08:00', // 8am
                    end: '12:00' // 12pm
                },
                {
                    dow: [1, 2, 3, 4, 5], // Thursday, Friday
                    start: '13:00', // 13pm
                    end: '18:00' // 6pm
                }
            ],
        events:[
            /*
                className: 'fc-nonbusiness',//clase a modificar
                rendering: 'background',
                color: '#a4a79d'
            */
            {
                title: 'Cita por defecto',//titulo de cita
                start: '2017-10-23T10:15',//inicio
                end: '2017-10-23T12:00',//final
                allDay: false
            },
            {
                title: 'Otra Cita por defecto',//titulo de cita
                start: '2017-10-24T10:15:00',//inicio
                end: '2017-10-24T12:0:00',//final
                rendering: 'background'
                /*resourceId: 'c'*/
            },
            {
                title:'prueba',
                start: '2017-10-25T08:00',
                end: '2017-10-25T10:00',
                color: 'green',
                dow: [1,2,3,4,5]
            },
            {
                title:'Sin End',
                start:'2017-10-26T14:00',
                end:'2017-10-26T16:00',
                color: 'blue'
            }],
        eventColor: '#28cdd8',//color de los eventos
        eventBorderColor: '#4aaf57',
        eventTextColor: '#fff',
        selectOverlap: function(event) {
            return event.rendering === 'background';
        },
        //funcion para la seleccion de dias en calendario
        dayClick: function(date){
            swal("Desea crear un nuevo evento", {
                buttons: {
                    Si: true,
                    No: "Cancelar!",
                    Fecha: 'Ver fecha seleccionada'
                },
            })
                .then((value) => {
                switch (value) {
                case "Fecha":
                    swal("La fecha seleccionada es " + date.format("DD/MM/YYYY, h:mm:ss"));
                    break;

                case "Si":

                    $('#exampleModal').appendTo("body").modal('show');
                    break;

                default:
                    swal("Cancelado!",{
                        timer: 2000,
                    });

                }
            });
        },

        eventClick: function(date, event, element) {
            var moment = $('#calendar').fullCalendar('getDate');
            if(event){
                swal("Desea editar el evento", {
                    buttons: {
                        Si: true,
                        No: "Cancelar!",
                        Fecha: 'Ver fecha seleccionada'
                    },
                })
                    .then((value) => {
                    switch (value) {

                    case "Fecha":
                        swal("La cita tiene fecha de " + moment.format());
                        //swal("La cita tiene fecha de " + date.format("DD/MM/YYYY, h:mm:ss"));
                        break;

                    case "Si":
                        swal("Excelente!", "Pronto se configurara esta opcion!", "success",{
                            timer:2000,
                        });
                        //$('#exampleModal').appendTo("body").modal('show');
                        break;

                    default:
                        swal("Cancelado!",{
                            timer: 2000,
                        });
                    }
                });
            }
        }
    })
});