"use strict";

import { posts } from "./db/posts.js";

import {
  slug,
  create_element,
  set_attribute,
  create_page,
  create_priv_page,
  add_text
} from "./common.js";

export function list_entries() {
  create_page("blog", "Blog");
  create_element("ul", "entry_list", "blog");
  
  set_attribute("blog_title", "style", "position: relative");
  
  create_element("span", "entry_count", "blog_title");
  set_attribute("entry_count", "style", "position: absolute; right: 0");
  add_text("entry_count", `${posts.length} posts`);

  for (const post of posts) {
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
  for (const post of posts) {
    create_priv_page(
      `${slug(post.date)}_${slug(post.title)}_page`,
      `${post.title}`,
      `<h3>${post.date}</h3>
      <span id="${slug(post.date)}_${slug(post.title)}_readinfo"></span>
      <hr>
      ${post.content
        .replaceAll("\n", "<br>")
        .replaceAll("#+begin_src<br>", "<pre class='src'>")
        .replaceAll("<br>#+end_src<br>", "</pre>")
        .replaceAll("#+begin_example<br>", "<pre class='example'>")
        .replaceAll("<br>#+end_example<br>", "</pre>")
        .replaceAll("#+begin_quote<br>", "<blockquote><p>")
        .replaceAll("#+end_quote<br>", "</p></blockquote>")
        .replaceAll("<br>- ", "<li>")
        .replaceAll("<br>", "</li><br>")
        .replaceAll("<br>* ", "<h2>")
        .replaceAll("<br>", "</h2><br>")
        .replaceAll("[[", "<a target='_blank' href='")
        .replaceAll("][", "'>")
        .replaceAll("]]", "</a>")
      }`
    );
    const wordcount = post.content.split(" ").length;
    const read_time = Math.floor(wordcount/200) <= 1 ? "~1 minuto para ler" : `~${Math.floor(wordcount/200)} minutos para ler`;
    add_text(`${slug(post.date)}_${slug(post.title)}_readinfo`, `~${wordcount} palavras, ${read_time}`);
  }
}
