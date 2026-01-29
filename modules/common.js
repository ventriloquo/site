"use strict";

export const page_list = [];

export function slug(text) {
  return text.toLowerCase()
             .replaceAll(" ", "_")
             .replaceAll(",", "")
             .replaceAll(".", "")
             .replaceAll(">", "")
             .replaceAll("<", "")
             .replaceAll("-", "")
             .replaceAll("+", "")
             .replaceAll(":", "")
             .replaceAll(";", "")
             .replaceAll("?", "")
             .replaceAll("!", "")
            // .replaceAll("/", "")
             .replaceAll("%", "")
             .replaceAll("#", "")
             .replaceAll("*", "")
             .replaceAll("&", "")
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
             .replaceAll("ç", "c");
}

export function markup(text) {
  return text
        .replaceAll("\n", "<br>")
        .replaceAll("#+begin_src<br>", "<pre class='src'>")
        .replaceAll("#+end_src<br>", "</pre>")
        .replaceAll("#+begin_example<br>", "<pre class='example'>")
        .replaceAll("#+end_example<br>", "</pre>")
        .replaceAll("#+begin_quote<br>", "<blockquote class='quote'><p>")
        .replaceAll("#+end_quote<br>", "</p></blockquote>")
        .replaceAll("#+begin_note<br>", "<blockquote class='note'><p>")
        .replaceAll("<br>#+end_note<br>", "</p></blockquote>")
        .replaceAll("<br>- ", "<li>")
        .replaceAll("<br>", "</li><br>")
        .replaceAll("<br>* ", "<h2>")
        .replaceAll("<br>", "</h2><br>")
        .replaceAll("[[", "<a target='_blank' href='")
        .replaceAll("][", "'>")
        .replaceAll("]]", "</a>");
}

export function tag(name, attributes, ...content) {
  const element = document.createElement(name);
  if (attributes !== undefined) {
    for (const attribute in attributes) {
      element.setAttribute(attribute, attributes[attribute]);
    }
  }
  for (const c of content) {
    if (c !== undefined) {
      if (typeof(c) === "string") {
        element.innerHTML = c;
      } else {
        element.appendChild(c);
      }
    }
  }
  return body.appendChild(element);
}

export function set_attribute(id, name, value) {
  document.getElementById(id).setAttribute(name, value);
}

export function add_text(element, text) {
  document.getElementById(element).innerText = text;
}

export function add_html(element, HTML) {
  document.getElementById(element).innerHTML = HTML;
}

export function create_page(name, title, content, priv = false) {
  const id = slug(name);

  tag(
    "section", {"id":id},
    tag("h1", {"id":`${id}_title`}, title),
    tag("div", {"id":`${id}_content`}, content)
  );

  if (!priv) {
    page_list.push(
      {
        id: `/#${id}`,
        title: `${title}`
      }
    );
  }
}

export function create_priv_page(name, title, content) {
  create_page(name, title, content, true);
}
