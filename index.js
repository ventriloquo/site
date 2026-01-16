"use strict";

import posts from "./modules/posts.js"

export function slug(text) {
  return text.toLowerCase()
             .replaceAll(" ", "_")
             .replaceAll(",", "")
             .replaceAll(".", "")
             .replaceAll(">", "")
             .replaceAll("<", "")
             .replaceAll("-", "")
             .replaceAll("+", "")
             .replaceAll("__", "_")
             .replaceAll("___", "_")
             .replaceAll("á", "a")
             .replaceAll("à", "a")
             .replaceAll("â", "a")
             .replaceAll("ã", "a")
             .replaceAll("é", "e")
             .replaceAll("è", "e")
             .replaceAll("ê", "e")
             .replaceAll("ó", "o")
             .replaceAll("ò", "o")
             .replaceAll("ô", "o")
             .replaceAll("õ", "o")
             .replaceAll("ç", "c")
}

export function create_element(name, id, appendTo) {
  const element = document.createElement(name)
  element.setAttribute("id", id)

  document.getElementById(appendTo).appendChild(element)
}

export function set_attribute(id, name, value) {
  document.getElementById(id).setAttribute(name, value);
}

export function create_page(name, title, content) {
  if (title === undefined) {
    const title = name;
  }

  create_element("section", name, "body");
  create_element("h1", `${name}_title`, name);

  document.getElementById(`${name}_title`).innerText = title;
  if (content) {
    create_element("p", `${name}_content`, `${name}`)
    document.getElementById(`${name}_content`).innerHTML = content
  };

}

export function list_entries() {
  for (let post of posts) {
    const id = `${slug(post.date)}_${slug(post.title)}`
    const id_link = `${slug(post.date)}_entry`

    create_element("li", `${id}`, "entry_list");
    create_element("a", `${id_link}`, `${id}`);

    document.getElementById(`${id_link}`).href = `#${id}_page`
    document.getElementById(`${id_link}`).innerText = `${post.date} - ${post.title}`

    set_attribute(`${id_link}`, "class", "blog_entry")
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
    )
  }
}

export function main() {
  list_entries()
  create_post()
}

main()
