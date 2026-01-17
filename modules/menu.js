"use strict";

import {
  create_priv_page,
  create_element,
  set_attribute,
  add_text,
  page_list
} from "../index.js";

export function menu() {
  create_priv_page("mobile_menu", "Menu");
  create_element("ul", "menu_list", "mobile_menu");

  let i = 0;
  for (const page of page_list) {
    create_element("li", `menu_item_${i}`, "menu_list");
    create_element("a", `${page.id}`, `menu_item_${i}`);
    set_attribute(`${page.id}`, "href", `${page.id}`);
    set_attribute(`${page.id}`, "class", "blog_entry");
    add_text(`${page.id}`, `${page.title}`);

    create_element("a", `${page.id}`, `desktop_menu`);
    set_attribute(`${page.id}`, "href", `${page.id}`);
    add_text(`${page.id}`, `${page.title}`);
    i++;
  }
}

export default menu;
