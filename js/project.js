const form = document.getElementById('film-form')
const titleEl = document.querySelector('#title')
const directorEl = document.querySelector('#director')
const urlEl = document.querySelector('#url')
const cardBody = document.querySelectorAll('.card-body')[1]
const clear = document.querySelector('#clear-films')


const ui = new UI()
const storage = new Storage()

eventListeners()

function eventListeners(){
    form.addEventListener('submit',addFilm)
    document.addEventListener('DOMContentLoaded',function() {
        let films = storage.getFilmsFromStorage()
        ui.loadAllFilms(films)
    })
    cardBody.addEventListener('click', deleteFilm)
    clear.addEventListener('click', clearAllFilms)
}
    

function addFilm(e){
    const title = titleEl.value
    const director = directorEl.value
    const url = urlEl.value

    if (title === '' || director === '' || url === '') {
        ui.displayMessages('Tum alanlari doldurun ...','danger')
    } 
    else {
        const newFilm = new Film(title,director,url)
        ui.addFilmToUI(newFilm)
        storage.addFilmToStorage(newFilm)
        ui.displayMessages('Film basari ile eklendi ...','success')
        // ui.clearInputs(titleEl,directorEl,urlEl)
    }

    ui.clearInputs(titleEl,directorEl,urlEl)


    e.preventDefault()
}

function deleteFilm(e) {
    if (e.target.id === 'delete-film') {
        ui.deleteFilmFromUI(e.target)
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent)
        ui.displayMessages("Film silindi ...",'success')
    }
}


function clearAllFilms() {
    if (confirm('Are you sure?')) {
        ui.clearAllFilmsFromUI()
        storage.clearAllFilmsFromStorage()
        ui.displayMessages("Filmler silindi ...",'success')
    }
}




// bezi catismamazliqlari m.m.c dediyi kimi ozumuz aradan qaldirmaq
//bezi buttonlarin parentlerine klik eventi verilir sebebi hemin buttonlarin sonradan yaranmasidir.