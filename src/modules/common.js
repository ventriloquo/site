"use strict";

export const page_list = [];

export function slug(text) {
  return String(text)
              .toLowerCase()
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
  return String(text)
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

export function invert_date(date, separator) {
    const input = String(date);
    const year = input.split(String(separator))[2];
    const month = input.split(String(separator))[1];
    const day = input.split(String(separator))[0];
    return `${year}${separator}${month}${separator}${day}`
}

export function tag(name, attributes, ...content) {
  if (document.getElementById('body') === null) {
    document.getElementsByTagName('body')[0].setAttribute("id", "body");
  }

  const element = document.createElement(String(name));

  if (Object(attributes) !== undefined) {
    for (const attribute in attributes) {
      element.setAttribute(String(attribute), attributes[String(attribute)]);
    }
  }
  for (const c of content) {
    switch (typeof(c)) {
      case "string": element.innerHTML = c; break;
      case "number": element.innerText = c; break;
      default: element.appendChild(Object(c));
    }
  }
  return body.appendChild(element);
}

export function create_page(name, title, content, priv = false) {
  const id = slug(String(name));

  tag("section", {"id":String(id)},
    tag("h1", {"id":`${id}_title`}, String(title)),
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
  create_page(String(name), String(title), content, true);
}
