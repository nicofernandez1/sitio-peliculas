const btnSearch = document.getElementById('btn-search')
btnSearch.addEventListener('click', async () => {
    const data = await obtenerDatos()
    dibujarDatos(data)
})

async function obtenerDatos() {
    try {
        const search = document.getElementById('search').value
        
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWNlNTIyZDU0NTUyMGFhMjU3OWFhMTE2NDZlZTJkYiIsInN1YiI6IjY2NGY5YTQ3MWU1NzA1OTU2MWNhZjA0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.18sJEYOH70ADghi2rv07GE0CRiVM9B4yjxKjq-3xnWM'
            }
        };

        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}`, options)
        const data = await response.json()
        
        return data
    } catch(error) {
        console.error(error)
    }
}

function dibujarDatos(obj) {
    const resultsContainer = document.getElementById('results-container')
    resultsContainer.innerHTML = ''

    obj.results.forEach(resultado => {
        const a = document.createElement('a')
        a.href = '#'
        const img = document.createElement('img')
        img.src = `https://image.tmdb.org/t/p/w500/${resultado.poster_path}`
        
        resultsContainer.appendChild(a)
        a.appendChild(img)
    })
}