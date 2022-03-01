'use strict';

export const d = document;
export const url = "http://localhost:8888/DBZ-universo7";

export const necesarios = {
  // titulo del form
  $title: d.querySelector(".crud-title"),
  // tabla de alamacenamiento de datos
  $table: d.querySelector(".crud-table"),
  // forlario para modificar datos
  $form: d.getElementById("crudForm"),
  // template con una estructura ya establecida
  $template: d.getElementById("crud-template").content,
  // fragmento para ahorrar "memoria en el dom"
  fragment: d.createDocumentFragment(),
  // tbody para insertar los datos
  $tbody: d.querySelector("tbody"),
  // boton para diferentes funciones
  $buttonDatos: d.getElementById("traerDatos"),
};
// con control+c     se pausa el json server
// y si se detiene se puede usar  en la termina ||||       json-server --watch db.json  o nombre y raiz del archivo
// para cambiar el puerto en el que se despliega mi local host puedo usar el comeando ||||| json-server -w -p (numero del puerto) y (nombre archivo)
// fetch recibe dos parametros,cuando no especificamos el 2do parametro que son las options, la respuesta que se da es de tipo get (read)

export class PeticionesFetch {
  async getData() {
    const { $template, $tbody, fragment } = necesarios;
    try {
      let response = await fetch(url);
      let json = await response.json();
      // verificacion de respuesta correcta
      if (!response.ok)
        throw { status: response.status, response: response.ok };
      json.forEach((el) => {
        $template.querySelector(".name").textContent = el.name;
        $template.querySelector(".powerLevel").textContent = el.nivelPoder;
        $template.querySelector(".edit").dataset.id = el.id;
        $template.querySelector(".edit").dataset.name = el.name;
        $template.querySelector(".edit").dataset.nivelPoder = el.nivelPoder;
        $template.querySelector(".delete").dataset.id = el.id;
        let clone = d.importNode($template, true);
        fragment.appendChild(clone);
      });
      $tbody.appendChild(fragment);
    } catch (err) {
      let messageError = "ocurrió un error" || err.status;
      $table.insertAdjacentHTML(
        "afterend",
        `<p style = "color: red;"> Ha ocurrido un error de tipo: <b> ${err.status} </b></p>`
      );
    }
  }
}
// renovación de datos al no querer actualizar
d.addEventListener("click", (e) => {
  const { $title, $form, $buttonDatos } = necesarios;
  if (e.target.matches("#traerDatos")) {
    $title.textContent = "Push character dbz";
    $form.sub.value = "Send new character";
    $buttonDatos.style.backgroundColor = "#eeeeee";
    $buttonDatos.style.width = "30%";
    $buttonDatos.style.display = 'none';
    $form.id.value = null;
    $form.reset();
  }
});
