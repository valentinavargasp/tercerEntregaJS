document.addEventListener("DOMContentLoaded", function () {
    const terapiaSelect = document.getElementById('especialidad');
    const profesionalSelect = document.getElementById('profesional');
    // Event listener para cambios en la selección de terapia
    terapiaSelect.addEventListener('change', function () {
        const terapiaSeleccionada = terapiaSelect.value;
        profesionalSelect.innerHTML = '<option value="" disabled selected>Elige un profesional</option>';
        if (terapiaSeleccionada !== '') {
            const profesionalesTerapia = profesionales[terapiaSeleccionada];
            if (profesionalesTerapia) {
                profesionalesTerapia.forEach(profesional => {
                    const option = document.createElement('option');
                    option.value = profesional.nombre;
                    option.textContent = `${profesional.nombre} - Disponible: ${profesional.diasDisponibles.join(', ')} - ${profesional.horario}`;
                    profesionalSelect.appendChild(option);
                });
            }
        }
    });
});

const profesionales = {
    "Psicoterapia Niños": [
        { nombre: "Carlos Martínez Lic. en Psicología MP 5678", diasDisponibles: ["Lunes", "Miércoles"], horario: "09:00 - 12:00" },
        { nombre: "María López Lic. en Psicología MP 1234", diasDisponibles: ["Martes", "Jueves"], horario: "13:00 - 16:00" }
    ],
    "Psicoterapia Adolescentes": [
        { nombre: "Laura Rodríguez Lic. en Psicología MP 9012", diasDisponibles: ["Lunes", "Miércoles", "Viernes"], horario: "10:00 - 13:00" },
        { nombre: "Ana García Lic. en Psicología MP 7890", diasDisponibles: ["Martes", "Jueves"], horario: "15:00 - 18:00" }
    ],
    "Psicoterapia Adultos": [
        { nombre: "Marta Ruiz Lic. en Psicología MP 4567", diasDisponibles: ["Lunes", "Miércoles", "Viernes"], horario: "09:00 - 12:00" },
        { nombre: "Pablo Herrera Lic. en Psicología MP 8901", diasDisponibles: ["Martes", "Jueves"], horario: "13:00 - 16:00" }
    ],
    "Psicoterapia Parejas": [
        { nombre: "Ana Belén Flores Lic. en Psicología MP 8765", diasDisponibles: ["Lunes", "Miércoles", "Viernes"], horario: "10:00 - 13:00" },
        { nombre: "Andrés Sánchez Lic. en Psicología MP 3456", diasDisponibles: ["Martes", "Jueves"], horario: "15:00 - 18:00" }
    ],
    "Orientación Vocacional": [
        { nombre: "Sofía Gutiérrez Lic. en Psicología MP 2345", diasDisponibles: ["Lunes", "Miércoles", "Viernes"], horario: "09:00 - 12:00" },
        { nombre: "José Martín Lic. en Psicología MP 6789", diasDisponibles: ["Martes", "Jueves"], horario: "13:00 - 16:00" }
    ]
};

// Evento de inicio de sesión
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    // Simulación de autenticación
    if (localStorage.getItem(username) === password) {
        showWelcomeMessage(username);
    } else {
        Swal.fire({
            icon: "error",
            title: "Nombre de usuario o contraseña incorrectos",
        });
    }
});

// Evento de registro
registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const newUsername = registerForm['newUsername'].value;
    const newPassword = registerForm['newPassword'].value;
    const confirmPassword = registerForm['confirmPassword'].value;

    // Validar las contraseñas
    if (newPassword !== confirmPassword) {
        Swal.fire({
            icon: "error",
            title: "Las contraseñas no coinciden",
        });
        return;
    }

    // Verificar si el usuario ya está registrado
    if (localStorage.getItem(newUsername)) {
        Swal.fire({
            icon: "error",
            title: "El nombre de usuario ya está en uso",
        });
        return;
    }

    // Registrar nuevo usuario
    localStorage.setItem(newUsername, newPassword);
    Swal.fire("Registro exitoso, por favor inicia sesión.");
    registerForm.reset();
});

// Mostrar mensaje de bienvenida al iniciar sesión
function showWelcomeMessage(username) {
    welcomeMessage.style.display = "block"; // Mostrar el mensaje de bienvenida
    const welcomeText = document.getElementById("welcomeText");
    welcomeText.textContent = `¡Bienvenido/a, ${username}!`;

    // Ocultar formularios de inicio de sesión y registro
    loginSection.style.display = "none";
    registerSection.style.display = "none";

    // Mostrar el formulario de reserva de turno
    formularioTurno.style.display = "block";


    // Ocultar texto adicional
    const additionalTexts = document.querySelectorAll(".additionalText");
    additionalTexts.forEach(text => {
        text.style.display = "none";
    });

    // Ocultar el mensaje de registro si está visible
    const registroMensaje = document.getElementById("registroMensaje");
    registroMensaje.style.display = "none";
}

const listaTurnos = [];

// Función para guardar el turno.
function guardarTurno(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    // Obtener los valores del formulario
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const especialidad = document.getElementById("especialidad").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;

    // Crear objeto Date con fecha actual
    const horaSeleccionada = new Date(`${fecha}T${hora}`);

    // Verificar si la hora está dentro del horario de atención (8:30 a 13:30 y de 17:00 a 21:00)
    const horaAperturaManana = new Date(`${fecha}T08:30:00`);
    const horaCierreManana = new Date(`${fecha}T13:30:00`);
    const horaAperturaTarde = new Date(`${fecha}T17:00:00`);
    const horaCierreTarde = new Date(`${fecha}T21:00:00`);

    if (
        (horaSeleccionada >= horaAperturaManana && horaSeleccionada <= horaCierreManana) ||
        (horaSeleccionada >= horaAperturaTarde && horaSeleccionada <= horaCierreTarde)
    ) {
        // Verificar si ya existe un turno para la misma fecha y hora
        const turnoExistente = listaTurnos.find(
            turno => turno.fecha === fecha && turno.hora === hora
        );

        if (turnoExistente) {
            // Si ya hay un turno para esa fecha y hora, mostrar mensaje de error
            alert("Ya existe un turno para esa fecha y hora. Por favor, elige otra fecha u hora.");
        } else {
            // Si no hay un turno para esa fecha y hora, guardar el nuevo turno
            const turno = {
                nombre,
                email,
                especialidad,
                fecha,
                hora,
            };

            // Agregar el turno a la lista de turnos
            listaTurnos.push(turno);

            // Limpiar el formulario
            document.getElementById("formularioTurno").reset();

            Swal.fire({
                title: "Quieres confirmar el turno?",
                showDenyButton: true,
                confirmButtonText: "Guardar",
                denyButtonText: `No guardar`
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire("Turno agendado", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("Turno eliminado", "", "info");
                }
            });

            // Mostrar los turnos almacenados en la interfaz
            mostrarTurnos();
        }
    } else {
        // mostrar mensaje de error
        alert("Los turnos solo se pueden reservar entre las 8:30 y las 13:30, y entre las 17:00 y las 21:00.");
    }
}
// Agregar evento al formulario cuando se envíe
document.getElementById("formularioTurno").addEventListener("submit", guardarTurno);


// Obtener el elemento de fecha y configurar los atributos min y max
const fechaInput = document.getElementById("fecha");
const fechaActual = new Date();
const fechaMaxima = new Date();
fechaMaxima.setDate(fechaMaxima.getDate() + 30); // Permitir reservas hasta 30 días en el futuro
fechaInput.min = fechaActual.toISOString().split("T")[0];
fechaInput.max = fechaMaxima.toISOString().split("T")[0];

// Obtener el elemento de hora y configurar los atributos min y max
const horaInput = document.getElementById("hora");
horaInput.min = "08:30";
horaInput.max = "21:00";