"use strict";

import { d, url, necesarios } from "./index.mjs";

d.addEventListener("submit", async (e) => {
  const { $form } = necesarios;
  if (e.target === $form) {
    e.preventDefault();
    if (!e.target.id.value) {
      // post (create)
      try {
        let options = {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            name: e.target.nombre.value,
            nivelPoder: e.target.nivelPoder.value,
          }),
        };
        let peticion = await fetch(url, options);
        console.log(peticion);
        let data = await peticion.json();
        location.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      // manejo del put "dentro" del manejo del post para obtener los datos necesarios
      try {
        let options = {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            name: e.target.nombre.value,
            nivelPoder: e.target.nivelPoder.value,
          }),
        };
        let peticion = await fetch(`${url}/${e.target.id.value}`, options);
        console.log(peticion);
        let data = await peticion.json();
      } catch (err) {
        console.log(err);
      }
    }
  }
});

// manejo del put
d.addEventListener("click", (e) => {
  const { $title, $form, $buttonDatos } = necesarios;
  if (e.target.matches(".edit")) {
    $title.textContent = "editar personaje";
    $form.nombre.value = e.target.dataset.name;
    $form.nivelPoder.value = e.target.dataset.nivelPoder;
    $form.id.value = e.target.dataset.id;
    $buttonDatos.style.display = "block";
    $buttonDatos.style.backgroundColor = "red";
    $buttonDatos.style.width = "300px";

    $form.sub.value = "enviar cambios";
  }
});
