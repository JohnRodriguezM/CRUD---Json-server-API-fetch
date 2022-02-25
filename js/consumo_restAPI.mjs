'use strict';


// con control+c     se pausa el json server
// y si se detiene se puede usar  en la termina ||||       json-server --watch db.json  o nombre y raiz del archivo
// para cambiar el puerto en el que se despliega mi local host puedo usar el comeando ||||| json-server -w -p (numero del puerto) y (nombre archivo)


let url = 'http://localhost:3000/DBZ-universo7'
const $ol = document.getElementById('ol-api')
console.log(url,$ol)


const getData = async () => {
    try{
        let response = await fetch(url)
        console.log(response)
        let data = await response.json()
        // manejo del error para el catch
        if(response.ok === false){
            throw {
                status: response.status,
                ok : response.ok,
            }
        }

        console.log(data);
        data.forEach((el)=>{
            let li = document.createElement('li')
            $ol.appendChild(li)
            li.innerHTML = `mi nombre es: ${el.name} --- \n  y mi nivel de poder es: ${el.nivelPoder}`
        })

    }
    catch(err){
      alert(`haz tenido un error ${err.status}, esta direccion no ha sido encontrada`)
    }
    finally{
        console.log("yo me ejecuto siempre")
    }
}

getData()








// proxima clase, creación de CRUD
/*
read,
create,
put,
delete
*/

/*
 GET    /profile
POST   /profile
PUT    /profile
PATCH  /profile 
*/