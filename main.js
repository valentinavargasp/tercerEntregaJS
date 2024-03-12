document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const welcomeMessage = document.getElementById("welcomeMessage");

    // Verificar si el usuario está autenticado al cargar la página
    checkAuthentication();

    // Evento de inicio de sesión
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = loginForm.username.value;
        const password = loginForm.password.value;

        // Simulación de autenticación
        if (localStorage.getItem(username) === password) {
            showWelcomeMessage(username);
        } else {
            alert("Nombre de usuario o contraseña incorrectos.");
        }
    });

    // Evento de registro
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const newUsername = registerForm['newUsername'].value;
        const newPassword = registerForm['newPassword'].value;
        const confirmPassword = registerForm['confirmPassword'].value;

        // Validar las contraseñas
        if (newPassword !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        // Verificar si el usuario ya está registrado
        if (localStorage.getItem(newUsername)) {
            alert("El nombre de usuario ya está en uso.");
            return;
        }

        // Registrar nuevo usuario
        localStorage.setItem(newUsername, newPassword);
        alert("Registro exitoso. Por favor, inicia sesión.");
        registerForm.reset();
    });

    // Verificar si el usuario está autenticado al cargar la página
    function checkAuthentication() {
        const authenticatedUser = localStorage.getItem("authenticatedUser");
        if (authenticatedUser) {
            showWelcomeMessage(authenticatedUser);
        }
    }

    // Mostrar mensaje de bienvenida al iniciar sesión
    function showWelcomeMessage(username) {
        welcomeMessage.style.display = "block";
    const welcomeText = document.getElementById("welcomeText");
    welcomeText.textContent = `¡Bienvenido/a, ${username}!`;
    loginForm.style.display = "none";
    registerForm.style.display = "none";
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const calendario = document.getElementById("calendario");
    const guardarBtn = document.getElementById("guardar");
    let turnosSeleccionados = {};

    // Calendario interactivo provisorio
    function generarCalendario() {
        const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
        const horas = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
        
        const tabla = document.createElement("table");
        tabla.classList.add("calendario");

        // Encabezado de la tabla
        const thead = document.createElement("thead");
        const encabezado = document.createElement("tr");
        encabezado.innerHTML = "<th></th>";

        horas.forEach(hora => {
            encabezado.innerHTML += `<th>${hora}</th>`;
        });
        thead.appendChild(encabezado);
        tabla.appendChild(thead);

        // Cuerpo de la tabla
        const tbody = document.createElement("tbody");
        diasSemana.forEach(dia => {
            const fila = document.createElement("tr");
            fila.innerHTML = `<td>${dia}</td>`;

            horas.forEach(hora => {
                const celda = document.createElement("td");
                const input = document.createElement("input");
                input.type = "checkbox";
                input.value = `${dia} ${hora}`;
                input.addEventListener("change", function() {
                    if (this.checked) {
                        turnosSeleccionados[this.value] = true;
                    } else {
                        delete turnosSeleccionados[this.value];
                    }
                });
                celda.appendChild(input);
                fila.appendChild(celda);
            });

            tbody.appendChild(fila);
        });
        tabla.appendChild(tbody);
        calendario.appendChild(tabla);
    }

    // Guardar selección en el almacenamiento local
    function guardarSeleccion() {
        localStorage.setItem("turnosSeleccionados", JSON.stringify(turnosSeleccionados));
        alert("Selección guardada correctamente.");
    }

    // Cargar selección guardada
    function cargarSeleccionGuardada() {
        const seleccionGuardada = localStorage.getItem("turnosSeleccionados");
        if (seleccionGuardada) {
            turnosSeleccionados = JSON.parse(seleccionGuardada);
            marcarTurnosSeleccionados();
        }
    }

    // Marcar los turnos seleccionados en el calendario
    function marcarTurnosSeleccionados() {
        const checkboxes = document.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach(checkbox => {
            if (turnosSeleccionados[checkbox.value]) {
                checkbox.checked = true;
            }
        });
    }

    // Inicializar la aplicación
    generarCalendario();
    cargarSeleccionGuardada();

    // Evento click del botón guardar
    guardarBtn.addEventListener("click", guardarSeleccion);
});
