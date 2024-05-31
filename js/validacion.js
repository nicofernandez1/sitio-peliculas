const form = document.getElementById('login-form')
const btn = document.getElementById('btn')
btn.addEventListener('click', validarDatos)

function validarDatos(event) {
    event.preventDefault()
    
    const usuario = document.getElementById('usuario').value
    const password = document.getElementById('password').value

    if(!usuario) {
        alert("Ingrese su nombre de usuario")
        return
    }
    
    if(password.length < 4) {
        alert("La contraseña debe ser de al menos 4 caracteres")
        return
    }

    form.submit()
}