

function getInfo(date) {
    var name = document.getElementById("recipient-name").value;
    var textArea = document.getElementById("message-text").value;

    if(name == null || textArea == null || name.length == 0 || textArea.length == 0 || /^\s+$/.test(name) || /^\s+$/.test(textArea)){
        swal("Casillas no deben quedar en blanco");

        return false;
    }else {
        swal("Usted ingreso: "+name + " "+textArea+" Pronto ingresaremos mas funciones");
    }


    document.getElementById("myForm").reset();
    $('#exampleModal').appendTo("body").modal('hide');
}

$(document).ready(function() {
    //pagina lista, inicializamos el calnedario

    $('#calendar').fullCalendar({
        //colcoar opciones y llamadas aqui
        header: {
            left: 'prev,next today',//
            center: 'title',//por defecto es fecha dependiendo de la vista
            right: 'agendaDay, agendaWeek, month'//lado derecho boton month,agendaWeek,agendaDay
        },
        /*businessHours: {
         // days of week. an array of zero-based day of week integers (0=Sunday)
         start: '12:00', // a start time (10am in this example)
         end: '13:00' // an end time (6pm in this example)
         },*/
        defaultView: 'agendaWeek',//vista por defecto
        lang:'es',//lenguaje
        allDaySlot: false,//quita espacio de allday
        minTime: '8:00:00',//limita tiempo
        maxTime: '18:00:00',//limita tiempo
        weekends: false,//quita fines de semana
        navLinks: true,//habilita enlaces
        editable: true,//permite mover o estirar
        eventStartEditable: true,
        events:[{
            title: 'Cita por defecto',//titulo de cita
            start: '2017-10-23T10:15:00',//inicio
            end: '2017-10-23T12:0:00'//final
        },
            {//editamos para colocar la hora del medio dia en gris
                className: 'fc-nonbusiness',//clase a modificar
                start: '12:00',
                end: '13:00',
                dow: [1, 2, 3, 4, 5], // monday - thursday
                rendering: 'background',
                color: '#a4a79d'//color del espacio seleccionado

            }],
        eventColor: '#28cdd8',//color de los eventos
        eventBorderColor: '#4aaf57',
        eventTextColor: '#fff',
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
                    swal("Cancelado!");

                }
            });

        }
    })
});