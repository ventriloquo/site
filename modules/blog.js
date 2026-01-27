"use strict";

import { posts } from "./db/posts.js";

import {
  slug,
  create_element,
  set_attribute,
  create_page,
  create_priv_page,
  add_text,
  markup,
} from "./common.js";

export function list_entries(appendTo, limit, list_name = "entry_list") {
  create_element("ul", list_name, appendTo);
  let l = 0;
  for (const post of posts) {
    if (l === limit) break;
    const post_iso_date = `${post.date.split(".")[2]}/${post.date.split(".")[1]}/${post.date.split(".")[0]}`;
    const id =  `blog/${post_iso_date}/${slug(post.title)}/`;
    const id_index = `post_${posts.indexOf(post)}`;

    create_element("li", `${list_name}_${id_index}`, list_name);
    create_element("a", `${list_name}_${id_index}_link`, `${list_name}_${id_index}`);

    set_attribute(`${list_name}_${id_index}_link`, "href", `#${id}`);
    set_attribute(`${list_name}_${id_index}_link`, "class", "blog_entry");
    add_text(`${list_name}_${id_index}_link`, `${post.date} - ${post.title}`);
    l++;
  }
}

export function create_post() {
  for (const post of posts) {
    const post_iso_date = `${post.date.split(".")[2]}/${post.date.split(".")[1]}/${post.date.split(".")[0]}`;
    const post_link = `blog/${post_iso_date}/${slug(post.title)}/`;
    create_priv_page(
      post_link,
      `${post.title}`,
      `<h3>${post.date}</h3>
      <span id="${post_link}_readinfo"></span>
      <hr>
      ${markup(post.content)}`
    );
    const wordcount = post.content.split(" ").length;
    const minutes = Math.floor(wordcount/200);
    const read_time = minutes <= 1 ? "~1 minuto para ler" : `~${minutes} minutos para ler`;
    add_text(`${post_link}_readinfo`, `~${wordcount} palavras, ${read_time}`);
  }
}

export function blog() {
  create_page("blog", "Blog");
  
  set_attribute("blog_title", "style", "position: relative");
  
  create_element("span", "entry_count", "blog_title");
  set_attribute("entry_count", "style", "position: absolute; right: 0; bottom: 0; font-size: large");
  add_text("entry_count", `${posts.length} posts`);
  
  list_entries("blog", undefined);
  create_post();
}
