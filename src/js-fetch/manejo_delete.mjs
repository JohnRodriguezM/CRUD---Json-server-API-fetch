"use strict";

import { d, url } from "./index.mjs";

// manejo del delete
d.addEventListener("click", (e) => {
  if (e.target.matches(".delete")) {
    try {
      let options = {
        method: "DELETE",
      };
      let isDelete = confirm("Are you sure you want to delete");
      if (isDelete) {
        fetch(`${url}/${e.target.dataset.id}`, options);
      }
    } catch (err) {}
  }
});
