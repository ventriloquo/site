"use strict";

import { posts } from "./db/posts.js";

import {
  slug,
  create_element,
  set_attribute,
  create_page,
  create_priv_page,
  add_text
} from "../index.js";

export function list_entries() {
  create_page("blog", "Anotações");
  create_element("ul", "entry_list", "blog");

  for (let post of posts) {
    const id = `${slug(post.date)}_${slug(post.title)}`;
    const id_link = `${slug(post.date)}_entry`;

    create_element("li", `${id}`, "entry_list");
    create_element("a", `${id_link}`, `${id}`);

    set_attribute(`${id_link}`, "href", `#${id}_page`);
    set_attribute(`${id_link}`, "class", "blog_entry");
    add_text(`${id_link}`, `${post.date} - ${post.title}`);
  }
}

export function create_post() {
  for (let post of posts) {
    create_priv_page(
      `${slug(post.date)}_${slug(post.title)}_page`,
      `${post.title}`,
      `<h3>${post.date}</h3>
      <hr>
      ${post.content
        .replaceAll("\n", "<br>")
        .replaceAll("#+begin_src<br>", "<pre>")
        .replaceAll("<br>#+end_src<br>", "</pre>")
        .replaceAll("#+begin_example<br>", "<pre class='example'>")
        .replaceAll("<br>#+end_example<br>", "</pre>")
        .replaceAll("#+begin_quote<br>", "<blockquote><p>")
        .replaceAll("#+end_quote<br>", "</p></blockquote>")
        .replaceAll("<br>- ", "<li>")
        .replaceAll("<br>", "</li><br>")
        .replaceAll("<br>* ", "<h2>")
        .replaceAll("<br>", "</h2><br>")
        .replaceAll("[[", "<a href='")
        .replaceAll("][", "'>")
        .replaceAll("]]", "</a>")}`
    );
  }
}

