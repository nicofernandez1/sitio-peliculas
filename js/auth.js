function logout() {
    localStorage.removeItem('USUARIO')
    window.location.href = '/'
}

function isLogged() {
    if (!localStorage.getItem('USUARIO')) {
        window.location.href = '/'
    }
}