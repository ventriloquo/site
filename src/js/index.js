"use strict";
import notes from "./notes.js";
import socials from "./socials.js";
import rick from "./rick.js";

// Definitions
export const links = [];
export const pages = [];

export function putText(id, text) {
  document.getElementById(id).innerText = text;
}

export function putStyle(id, style) {
  document.getElementById(id).setAttribute("style", `${style}`);
}

export function putAttribute(id, ...attribute) {
  document.getElementById(id).setAttribute(...attribute);
}

/** creates an element with a target ID to appendTo, a name for it's own ID
 *
 * @example createElementWithText("div", "mainBody", "example")
 */
export function createElement(element, appendTo, name) {
  const temp = document.createElement(`${element}`);
  document.getElementById(appendTo).appendChild(temp);
  temp.setAttribute("id", `${name}`);
}

/** creates an element with a target ID to appendTo, a name for it's own ID and
 * the text.
 *
 * @example createElementWithText("p", "mainBody", "example", "This is an example")
 */
export function createElementWithText(element, appendTo, name, text) {
  const temp = document.createElement(`${element}`);
  document.getElementById(appendTo).appendChild(temp);
  temp.setAttribute("id", `${name}`);
  temp.innerText = text;
}

export function slugify(text) {
  return text.toLowerCase()
    .replaceAll(" ", "_")
    .replaceAll("é", "e")
    .replaceAll("ê", "e")
    .replaceAll("á", "a")
    .replaceAll("à", "a")
    .replaceAll("ã", "a")
    .replaceAll("ç", "c")
    .replaceAll("ô", "a")
    .replaceAll("õ", "o")
    .replaceAll("ó", "o");
}

/** Creates a page with a given "name" for an ID and a "altName" for the title
 * of the page.
 *
 * If no "altName" is given, then the "name" becomes both the ID and Title of
 * the page.
 *
 * After the page is created, the ID for the page will be pushed to the
 * "pages" array
 *
 * @example createPage("example", "Example page")
 */
export function createPage(name, altName) {
  if (altName === undefined) {
    altName = name;
  }

  const slug = slugify(name);

  createElement("article", "mainBody", `${slug}`);
  createElementWithText("h1", `${slug}`, "title", `${altName}`);
  links.push({ "name": `${altName}`, "url": `#${slug}` });

  pages.push(name);
}

/** Creates a page with a given "name" for an ID and a "altName" for the title
 * of the page.
 *
 * If no "altName" is given, then the "name" becomes both the ID and Title of
 * the page.
 *
 * It does not push the created page's ID to the "pages" array
 *
 * @example createPrivatePage("example-private", "Example private page")
 */
export function createPrivatePage(name, altName) {
  if (altName === undefined) {
    altName = name;
  }

  const slug = slugify(name);

  createElement("article", "mainBody", `${slug}`);
  createElementWithText("h1", `${slug}`, "title", `${altName}`);

  pages.push(name);
}

export function createParagraph(id, text) {
  createElementWithText("p", `${id}`, `${id}_paragraph`, `${text}`);
}

// Site

//// Navbar
function createNavbar(id) {
  createElement("nav", "mainBody", `${id}`);

  {
    createElement("a", `${id}`, "home_link");
    putAttribute("home_link", "href", "#");
    putText("home_link", "Home");
  }

  {
    createElement("div", `${id}`, "other_links");
    for (const link of links) {
      createElement("a", "other_links", `${link.name}`);
      putAttribute(`${link.name}`, "href", `${link.url}`);
      putText(`${link.name}`, `${link.name}`);
    }
  }

  putStyle(`${id}`, "z-index: 1000")
}


function removeNavbar(id) {
  document.getElementById(`${id}`).remove()
}


//// Home
{
  createPrivatePage("home", "Caderno do Tukain");
  createParagraph(
    "home",
    `Aqui é um lugar em que eu compartilho algumas coisas do meu dia a dia e meus achados pelo mundo da internet.

    ---

    "The strength of JavaScript is that you can do anything. The weakness is that you will." - Reg Braithwaite`,
  );

  let clicks = 0;
  const home_title =
    document.getElementById("home").getElementsByTagName("h1")[0];
  home_title.addEventListener("click", () => {
    clicks++;
    switch (clicks) {
      case 5:
        home_title.innerText = "Você já me clicou 5 vezes...";
        break;
      case 10:
        home_title.innerText = "10 vezes? Sério?";
        break;
      case 20:
        home_title.innerText = "Você só pode tá de sacanagem";
        break;
      case 30:
        home_title.innerText = "Cara, você não tem mais nada para fazer não?";
        break;
      case 40:
        home_title.innerText = "Dá pra parar?";
        break;
      case 50:
        home_title.innerText = "...";
        break;
      case 54:
        home_title.innerText = "Foda-se";
        break;
      case 55:
        rick();
        window.location.href = "#rick";
        removeNavbar("navbar")
        home_title.innerText = "Caderno do Tukain\n(para de me clicar)";
        createNavbar("navbar_after_rick")
        clicks = 0
        break;
    }
  });
}

//// Blog
{
  createPage("notes", "Anotações");
  createElement("ul", "notes", "notes_list");

  let wordCount = 0;
  let charCount = 0;
  let wordCountAll = 0;
  let charCountAll = 0;
  let n = notes.length + 1;
  let i = 1;

  for (const note of notes) {
    n--;
    i++;
    // Entries;
    createElement("li", "notes_list", `notes_entry${n}`);

    createElement("span", `notes_entry${n}`, `date_${n}`);
    putText(`date_${n}`, `${note.date}`);
    putStyle(
      `date_${n}`,
      `display: inline-block;
      width: 5em;
      animation: fade 500ms both;
      animation-delay: ${i}00ms`,
    );

    createElement("a", `notes_entry${n}`, `${n}`);
    putText(`${n}`, `${note.title}`);
    putAttribute(`${n}`, "href", `#note_${n}`);
    putStyle(
      `${n}`,
      `animation: fade 500ms both;
      animation-delay: ${i}00ms`,
    );

    // Word/Char count
    wordCount =
      note.content.replaceAll(/(-|\(|\)|#|\n)/g, "").split(" ").filter((item) =>
        item !== ""
      ).length;
    charCount =
      note.content.replaceAll(/( |\n)/g, "").split(/([a-zA-Z])/g).filter(
        (item) => item !== "",
      ).length;
    wordCountAll = wordCount + wordCountAll;
    charCountAll = charCount + charCountAll;

    // note
    createPrivatePage(`note_${n}`, `${note.title}`);
    createElementWithText(
      "h3",
      `note_${n}`,
      "note_info",
      `${note.date} - ${wordCount} palavras - ${charCount} caracteres`,
    );
    createParagraph(`note_${n}`, `${note.content}`);
  }

  const pagesList = pages.toString()
    .replaceAll(/^/g, "- #")
    .replaceAll(",", "\n- #")
    .replaceAll("\n- #note_", "\n  - #note_");

  // Statistics
  createPrivatePage("stats", "Estatísticas");
  createElementWithText(
    "pre",
    "stats",
    "stats_data",
    `Número de anotações:   ${notes.length}
Palavras escritas:     ${wordCountAll}
Caracteres utilizados: ${charCountAll}
Lista de páginas:
${pagesList}
- #stats
    `,
  );
  putStyle("stats_data", "font-family: monospace");
}

//// Links
{
  createPage("Links");
  createElement("ul", "links", "socials_list");
  let i = 0;
  for (const social of socials) {
    i++;
    createElement("li", "socials_list", `${social.name.toLowerCase()}`);
    createElementWithText(
      "a",
      `${social.name.toLowerCase()}`,
      `${social.name.toLowerCase()}_link`,
      `${social.name}`,
    );
    putAttribute(`${social.name.toLowerCase()}_link`, "href", `${social.url}`);
    putAttribute(`${social.name.toLowerCase()}_link`, "target", "_blank");
    putStyle(
      `${social.name.toLowerCase()}_link`,
      `animation: fade 500ms both; animation-delay: ${i}00ms`,
    );
  }
}

createNavbar("navbar")
