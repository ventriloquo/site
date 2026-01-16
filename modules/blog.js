import { posts } from "./posts.js";

import {
  slug,
  create_element,
  set_attribute,
  create_page
} from "../index.js";


export function list_entries() {
  for (let post of posts) {
    const id = `${slug(post.date)}_${slug(post.title)}`;
    const id_link = `${slug(post.date)}_entry`;

    create_element("li", `${id}`, "entry_list");
    create_element("a", `${id_link}`, `${id}`);

    document.getElementById(`${id_link}`).href = `#${id}_page`;
    document.getElementById(`${id_link}`).innerText = `${post.date} - ${post.title}`;

    set_attribute(`${id_link}`, "class", "blog_entry");
  }
}

export function create_post() {

  for (let post of posts) {
    create_page(
      `${slug(post.date)}_${slug(post.title)}_page`,
      `${post.title}`,
      `${post.content
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

