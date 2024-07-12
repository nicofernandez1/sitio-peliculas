let movies = []
let editingMovieId = null

const dialog = document.getElementById('dialog')
const btnAgregar = document.getElementById('btn-agregar')
const btnCancelar = document.getElementById('btn-cancelar')
const btnEnviar = document.getElementById('btn-enviar')
const display = document.getElementById('display')

btnAgregar.addEventListener('click', () => {
    editingMovieId = null
    limpiarInputs()
    dialog.showModal()
})
btnCancelar.addEventListener('click', () => dialog.close())
document.addEventListener('DOMContentLoaded', async () => {
    await obtenerDatos()
    dibujarDatos(movies)
})
btnEnviar.addEventListener('click', async () => {
    editingMovieId ? await enviarJSON(editingMovieId) : await enviarJSON()
    await obtenerDatos()
    dibujarDatos(movies)
})


async function obtenerDatos() {
    try {
        const response = await fetch(`http://localhost:8080/webapp/ListarMoviesController`)
        const data = await response.json()
        movies = data
        
    } catch(error) {
        console.error(error)
    }
}

function dibujarDatos(arrObj) {
    const tbody = document.getElementById('tbody')
    tbody.innerHTML = ''

    arrObj.forEach(movie => {
        tbody.insertAdjacentHTML('beforeend', `
                <tr>
                    <td>${movie.id_movie}</td>
                    <td>${movie.titulo}</td>
                    <td>${movie.anio}</td>
                    <td>${movie.director}</td>
                    <td><i class="fa-solid fa-trash btn-eliminar" onclick="eliminarRegistro(${movie.id_movie})"></i></td>
                    <td><i class="fa-solid fa-pen-to-square btn-editar" onclick='editarRegistro(${movie.id_movie})'></i></td>
                </tr>
            `)
    })

    tbody.hasChildNodes() ? display.textContent = '' : display.textContent = 'No hay peliculas en la lista' 
}

async function enviarJSON(id_movie = 0) {
    let accion = id_movie ? 'Actualizar' : 'Crear'
    let metodo = id_movie ? 'PUT' : 'POST'
    
    const titulo = document.getElementById('titulo').value
    const anio = Number(document.getElementById('anio').value)
    const director = document.getElementById('director').value

    const movie = {
        id_movie,
        titulo,
        anio,
        director
    }

    try {
        const response = await fetch(`http://localhost:8080/webapp/${accion}MovieController`, {
            method: metodo,
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
            }

        });

        
        console.log(response)
    } catch (error) {
        console.error(error)
    }

    dialog.close()
    
}

async function eliminarRegistro(id) {
    
    const eliminar = confirm("¿Estas seguro de eliminar?")

    if (eliminar) {
        await fetch(`http://localhost:8080/webapp/BorrarMovieController?id=${id}`, {
            method: 'DELETE'
        })

        await obtenerDatos()
        dibujarDatos(movies)
    }
}

function editarRegistro(id_movie) {
    const movie = movies.find(movie => movie.id_movie === id_movie)
    dialog.showModal()
    document.getElementById('titulo').value = movie.titulo
    document.getElementById('anio').value = movie.anio
    document.getElementById('director').value = movie.director

    editingMovieId = id_movie
    
}

function limpiarInputs() {
    document.getElementById('titulo').value = ""
    document.getElementById('anio').value = ""
    document.getElementById('director').value = ""
}