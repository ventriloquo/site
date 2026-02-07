"use strict";

import {
  page_list,
  create_priv_page,
  slug,
  invert_date,
  tag
} from "./common.js";

import { posts } from "./db/posts.js";

export function sitemap() {
  create_priv_page(
    "sitemap",
    "(pseudo) Mapa do Site",
    tag("p", {}, "Como esse site gira em torno da criação de pseudo-páginas, essa lista é apenas uma forma de visualizar o conteúdo acessível do site.")
  );

  document.getElementById("sitemap").appendChild(
    tag("div", {},
      tag("h2", {},
        tag("span", {}, "Total de páginas: "),
        tag("span",
          {
            "style":"color: rgba(var(--ac-1), 1)"
          },
          `${page_list.length  + posts.length}`
        ),
        tag("br")
      ),
      tag("br"),
      tag("ul",
        {
          "id":"page_list",
          "style":"white-space: pre; max-width: 100%; overflow-x: scroll"
        }
      )
    )
  );

  for (const page of page_list) {
    const page_index = page_list.indexOf(page);
    document.getElementById("page_list").appendChild(
      tag("li", {"id":`page_item_${page_index}`},
        tag("a", {"href":page.id}, page.id)
      )
    );
  }

  for (const post of posts) {
    const post_index = posts.indexOf(post);
    const post_iso_date = invert_date(post.date, ".").replaceAll(".", "/");
    const post_link = `/#blog/${post_iso_date}/${slug(post.title)}/`;
    document.getElementById("page_item_3").appendChild(
      tag("li", {},
        tag("a", {"href":post_link}, post_link)
      )
    );
  }
}

export default sitemap;
