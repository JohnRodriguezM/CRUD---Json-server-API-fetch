"use strict";

import { PeticionesFetch, d } from "./index.mjs";

// se importa clase manejadora y se importa la variable d que contiene el objeto document.

const obtener = () => {
  return new PeticionesFetch().getData();
};

d.addEventListener("DOMContentLoaded", obtener);
