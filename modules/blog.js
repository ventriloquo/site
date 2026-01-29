"use strict";

import { posts } from "./db/posts.js";

import {
  slug,
  create_priv_page,
  markup,
  page_list,
  tag
} from "./common.js";

export function list_entries(limit, list_name = "entry_list") {
  let l = 0;
  for (const post of posts) {
    if (l === limit) break;
    const post_iso_date = `${post.date.split(".")[2]}/${post.date.split(".")[1]}/${post.date.split(".")[0]}`;
    const id =  `blog/${post_iso_date}/${slug(post.title)}/`;
    const id_index = `post_${posts.indexOf(post)}`;

    document.getElementById(list_name).appendChild(
      tag("li", {},
        tag("a", {"class":"blog_entry", "href":`#${id}`}, `${post.date} - ${post.title}`))
    );
    l++;
  }
}

export function create_post() {
  for (const post of posts) {
    const post_iso_date = `${post.date.split(".")[2]}/${post.date.split(".")[1]}/${post.date.split(".")[0]}`;
    const post_link = `blog/${post_iso_date}/${slug(post.title)}/`;
    const wordcount = post.content.split(" ").length;
    const minutes = Math.floor(wordcount/200);
    const read_time = minutes <= 1 ? "~1 minuto para ler" : `~${minutes} minutos para ler`;
    
    create_priv_page(
      post_link,
      `${post.title}`,
      tag("div", {},
        tag("h3", {"style":"font-weight: normal"}, post.date, tag("span", {}, ` - ~${wordcount} palavras, ${read_time}`)),
        tag("hr"),
        tag("p", {}, markup(post.content)))
    );
  }
}

export function blog() {
  page_list.push(
    {
      id: `/#blog`,
      title: "Blog"
    }
  );
  tag("section", {"id":"blog"},
    tag("h1", {"id":"blog_title", "style":"position: relative"}, "Blog",
      tag("span", {"id":"entry_count", "style":"position: absolute; right: 0; bottom: 0; font-size: large"}, `${posts.length} posts`)),
    tag("ul", {"id":"entry_list"}));

  list_entries();
  create_post();
}
