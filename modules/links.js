"use strict";

import {
  create_page,
  markup,
  tag,
} from "./common.js";

import { links as link_list } from "./db/links.js";

export function links() {
  create_page(
    "links",
    "Links",
    tag("div", {},
      tag("p", {}, markup("Estes são alguns links dos [[https://neocities.org/site/tukainpng/follows][sites que eu acompanho]].")),
      tag("div",
        {
          "id":"links_container",
          "style":"display: flex; flex-wrap: wrap; justify-content: space-evenly"
        }
      )
    )
  );

  for (const link of link_list) {
    const link_index = `link_${link_list.indexOf(link)}`;

    document.getElementById("links_container").appendChild(
      tag("a",
        {
          "id":     String(link_index),
          "target": "blank",
          "href":   String(link.url),
          "class":  "link_button"
        }
      )
    );

    switch (link.button) {
      case undefined:
        document.getElementById(link_index).appendChild(
          tag("p", {},
            link.title
          )
        ); break;
      default:
       document.getElementById(link_index).appendChild(
         tag("img",
           {
             "loading":"lazy",
             "src":link.button,
             "title":link.title,
             "width": "88px",
             "height": "31px",
             "style":"object-fit: cover"
           }
         )
       );
    }
  }
}

export default links;
