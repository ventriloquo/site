"use strict";

import {
  create_priv_page,
  page_list,
  tag
} from "./common.js";

export function menu() {
  create_priv_page("mobile_menu", "Menu",
    tag("div", {},
      tag("ul", {"id":"mobile_menu"})
    )
  );

  let i = 0;
  for (const page of page_list) {
    document.getElementById("mobile_menu").appendChild(
      tag("li", {"id":`menu_item_${i}`},
        tag("a", {"href":page.id, "class":"blog_entry"}, page.title)
      )
    );

    document.getElementById("desktop_menu").appendChild(
      tag("a", {"href":page.id}, page.title)
    )

    i++;
  }
}

export default menu;
