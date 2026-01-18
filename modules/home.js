"use strict";

import {
  create_priv_page, create_element, slug } from "../index.js";
import { posts } from "./db/posts.js";

export function home() {
  create_priv_page(
    "home",
    "Caderno do Tukain",
`<p>
Aqui é um lugar onde eu gosto de compartilhar um pouco do meu cotidiano.
Também é um lugar onde eu ponho em prática algumas coisas que eu aprendi,
seja elas relacionadas à tecnologia, programação ou qualquer outro assunto
que eu achar pertinente.
</p>

<blockquote>
  <p>"The strength of JavaScript is that you can do anything. The weakness is that you will." - Reg Braithwaite</p>
</blockquote>

<h2>Últimos posts</h2>
`);

  // for (let i = 0; i < 2; i++) {
  //   const id = `${slug(posts[i].date)}_${slug(posts[i].title)}`;
  //   const id_link = `${slug(posts[i].date)}_entry`;

  //   create_element("li", `${id}`, "entry_list");
  //   create_element("a", `${id_link}`, `${id}`);

  //   set_attribute(`${id_link}`, "href", `#${id}_page`);
  //   set_attribute(`${id_link}`, "class", "blog_entry");
  //   add_text(`${id_link}`, `${posts[i].date} - ${posts[i].title}`);
  // }
}
