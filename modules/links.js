import {
  create_page,
  create_element,
  set_attribute,
  add_text,
  markup,
} from "./common.js";

import { links as link_list } from "./db/links.js";

export function links() {
  create_page(
    "links",
    "Links",
    markup("Estes são alguns links dos [[https://neocities.org/site/tukainpng/follows][sites que eu acompanho]].")
  );
  create_element("div", "links_container", "links");
  set_attribute("links_container", "style", "display: flex; flex-wrap: wrap; justify-content: space-evenly");
  for (const link of link_list) {
    let link_index = `link_${link_list.indexOf(link)}`;
    
    create_element("a", link_index, "links_container");
    set_attribute(link_index, "target", "_blank");
    set_attribute(link_index, "href", link.url);
    set_attribute(link_index, "style", "margin: 3px 5px");
    
    if (link.button === undefined) {
      create_element("p", `${link_index}_placeholder`, link_index);
      add_text(`${link_index}_placeholder`, link.title);
    } else {
      create_element("img", `${link_index}_img`, link_index);
      set_attribute(`${link_index}_img`, "loading", "lazy");
      set_attribute(`${link_index}_img`, "src", link.button);
      set_attribute(`${link_index}_img`, "title", link.title);
      set_attribute(`${link_index}_img`, "style", "width: 88px; height: 31px; object-fit: cover");
    }
  }
}

export default links;