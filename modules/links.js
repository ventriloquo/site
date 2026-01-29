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
      tag("div", {"id":"links_container", "style":"display: flex; flex-wrap: wrap; justify-content: space-evenly"}))
  );

  for (const link of link_list) {
    let link_index = `link_${link_list.indexOf(link)}`;

    document.getElementById("links_container").appendChild(
      tag("a", {"id":link_index, "target":"blank", "href":link.url, "class":"link_button"})
    );

    if (link.button === undefined) {
      document.getElementById(link_index).appendChild(
        tag("p", {}, link.title)
      );
    } else {
       document.getElementById(link_index).appendChild(
         tag("img", {"loading":"lazy", "src":link.button, "title":link.title, "style":"width: 88px; height: 31px; object-fit: cover"})
       );
    }
  }
}

export default links;
