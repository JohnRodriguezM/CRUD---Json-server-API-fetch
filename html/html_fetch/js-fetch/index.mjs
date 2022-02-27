'use strict'

const d = document;
const $title = document.querySelector('.crud-title')
const $table = d.querySelector('.crud-table')
const $form = d.getElementById('crudForm')
const $template = d.getElementById('crud-template').content
const fragment = d.createDocumentFragment();
// tbody para insertar los datos
const $tbody = d.querySelector('tbody')
console.log($tbody)

// otros necesarios
const $buttonDatos = d.getElementById('traerDatos')

// información traída de otro documento para el crud


// con control+c     se pausa el json server
// y si se detiene se puede usar  en la termina ||||       json-server --watch db.json  o nombre y raiz del archivo
// para cambiar el puerto en el que se despliega mi local host puedo usar el comeando ||||| json-server -w -p (numero del puerto) y (nombre archivo)

let url = 'http://localhost:8888/DBZ-universo7'

// fetch recibe dos parametros,cuando no especificamos el 2do parametro que son las options, la respuesta que se da es de tipo get (read)


const getData = async () => {
    try {
        let response = await fetch(url)
        console.log(response)
        let json = await response.json()
        console.log(json)
        // manipulacion del erro para el catch
        if (!response.ok) throw {
            response: response.ok,
            status: response.status
        }
        ///
        let datos = json.forEach((el) => {
            $template.querySelector('.name').textContent = el.name;
            $template.querySelector('.powerLevel').textContent = el.nivelPoder;
            $template.querySelector('.edit').dataset.id = el.id;
            $template.querySelector('.edit').dataset.name = el.name;
            $template.querySelector('.edit').dataset.nivelPoder = el.nivelPoder;
            $template.querySelector('.delete').dataset.id = el.id;
            let clone = d.importNode($template,
                true) //(elemento que importo, false si no quiero el contenido || true si quiero el contenido)
            fragment.appendChild(clone)
        })
        $tbody.append(fragment)
    } catch (err) {
        let messageError = "ocurrió un error" || err.status;
        $table.insertAdjacentHTML('afterend',
            `<p style = "color: red;"> Ha ocurrido un error de tipo: <b> ${err.status} </b></p>`)
    } finally {

    }
}



d.addEventListener('DOMContentLoaded', getData)

d.addEventListener('submit', async e => {
    if(e.target === $form){
        e.preventDefault()
        if(!e.target.id.value){
            // post (create)
            try{
                let options = {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify({
                        name: e.target.nombre.value,
                        nivelPoder: e.target.nivelPoder.value,
                    })
                }
                let peticion = await fetch(url,options)
                console.log(peticion)
                let data = await peticion.json()
                location.reload()
            }
            catch(err){
                console.log(err)
            }
        }
        else{
            // manejo del put "dentro" del manejo del post para obtener los datos necesarios
            try{
                let options = {
                    method: 'PUT',
                    headers: {
                        "Content-type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify({
                        name: e.target.nombre.value,
                        nivelPoder: e.target.nivelPoder.value,
                    })
                }
                let peticion = await fetch(`${url}/${e.target.id.value}`,options)
                console.log(peticion)
                let data = await peticion.json()
            }
            catch(err){
                console.log(err)
            }
        }
    }
})
// manejo del put
d.addEventListener('click',e => {
    if(e.target.matches('.edit')){
        $title.textContent = "editar personaje"
        $form.nombre.value = e.target.dataset.name;
        $form.nivelPoder.value = e.target.dataset.nivelPoder;
        $form.id.value = e.target.dataset.id;
        $buttonDatos.style.backgroundColor = "red"
        $form.sub.value = "enviar cambios"
    }
})
// manejo del delete
d.addEventListener('click',e => {
    if(e.target.matches('.delete')){
        try{
            let options = {
                    method: 'DELETE',
                }
            let isDelete = confirm("Are you sure you want to delete")
            if(isDelete){
                fetch(`${url}/${e.target.dataset.id}`,options)
            }
        }
        catch(err){

        }
    }
})
// tratando de solucionar el lio del post
//jum
d.addEventListener('click',e => {
    if(e.target.matches('#traerDatos')){
        $title.textContent = "Push character dbz"
        $form.sub.value = "Send new character"
        $buttonDatos.style.backgroundColor = "#eeeeee"
        $form.id.value = null;
        $form.reset()
    }
})