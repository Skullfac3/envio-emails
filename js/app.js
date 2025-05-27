document.addEventListener('DOMContentLoaded', function(){

    const email = {
        email: '',
        asunto: '',
        mensaje: '',
        cc: '',
    };

    //Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputCC = document.querySelector('#cc'); // Agrega el campo cc
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    // Asignar eventos
    inputEmail.addEventListener( 'input', validar)
    inputAsunto.addEventListener( 'input', validar)
    inputMensaje.addEventListener( 'input', validar)
    inputCC.addEventListener( 'input', validar) // Agrega el campo cc

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e){

        e.preventDefault();
        resetFormulario();

    });

    function enviarEmail(e){
        e.preventDefault();

        // Mostrar el spinner
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            // Ocultar el spinner
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

           resetFormulario();

            // Crear una alerta de enviado
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000);
    }

    // Funcion que valida los target
    function validar(e){
        // Manejar campo CC como opcional
        if(e.target.value.trim() === ''){
            if(e.target.id === 'cc') {
                limpiarAlerta(e.target.parentElement);
                email[e.target.name] = '';
                comprobarEmail();
                return;
            }
            
            mostrarAlerta(`El Campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
    
        // LÍNEA MODIFICADA: Valida formato tanto de email como de cc
        if ((e.target.id === 'email' || e.target.id === 'cc') && !validarEmail(e.target.value)){
            mostrarAlerta('El Email no es valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
    
        limpiarAlerta(e.target.parentElement);
        email[e.target.name] = e.target.value.trim().toLowerCase();
        comprobarEmail();
    }

    function comprobarEmail(){
        if(email.email === 'mkt@empresa.com' && email.asunto === 'Asunto de prueba' && email.mensaje === 'Mensaje de prueba'){
            console.log('Enviado');
        }
    }

    function mostrarAlerta(mensaje, referencia){
        // Comprueba si ya existe una alerta
        limpiarAlerta(referencia);

        // Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')

        // Inyectar el error al formulario
        referencia.appendChild(error);
    }

    // Funcion para eliminar alerta si ya se lleno el campo
    function limpiarAlerta(referencia){
        // Comprueba si una alerta ya existe
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
            }
        }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail(){
        // Verificar solo los campos obligatorios
        if(email.email === '' || email.asunto === '' || email.mensaje === '') {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        } 
        
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    function resetFormulario(){
         // reiniciar el objeto
         email.email = '';
         email.asunto = '';
         email.mensaje = '';
         email.cc = '';
 
         formulario.reset();
         comprobarEmail();
    }
})

// Reto 
// 1.- Añade un campo extra llamado CC, para añadir un destinatario extra.
// 2.- Ese campo no es obligatorio; pero en caso de tener información, debe ser un email válido.

