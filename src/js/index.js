"use strict";
import notes from "./notes.js";
import socials from "./socials.js";

// Definitions
const links = [];
const pages = [];

function createElement(element, appendTo, name) {
  const temp = document.createElement(`${element}`);
  document.getElementById(appendTo).appendChild(temp);
  temp.setAttribute("id", `${name}`);
}

function putText(id, text) {
  document.getElementById(id).innerText = text;
}

function putStyle(id, style) {
  document.getElementById(id).setAttribute("style", `${style}`);
}

function putAttribute(id, ...attribute) {
  document.getElementById(id).setAttribute(...attribute);
}

function createElementWithText(element, appendTo, name, text) {
  const temp = document.createElement(`${element}`);
  document.getElementById(appendTo).appendChild(temp);
  temp.setAttribute("id", `${name}`);
  temp.innerText = text;
}

function slugify(text) {
  return text.toLowerCase()
    .replaceAll(" ", "_")
    .replaceAll("é", "e")
    .replaceAll("á", "a")
    .replaceAll("ã", "a")
    .replaceAll("ç", "c")
    .replaceAll("ô", "a")
    .replaceAll("ó", "o");
}

function createPage(name, altName) {
  if (altName === undefined) {
    altName = name;
  }

  const slug = slugify(name);

  createElement("article", "mainBody", `${slug}`);
  createElementWithText("h1", `${slug}`, "title", `${altName}`);
  links.push({ "name": `${altName}`, "url": `#${slug}` });

  pages.push(name);
}

function createPrivatePage(name, altName) {
  if (altName === undefined) {
    altName = name;
  }

  const slug = slugify(name);

  createElement("article", "mainBody", `${slug}`);
  createElementWithText("h1", `${slug}`, "title", `${altName}`);

  pages.push(name);
}

function createParagraph(id, text) {
  createElementWithText("p", `${id}`, `${id}_paragraph`, `${text}`);
}

// Site

//// Home
{
  createPrivatePage("home", "Caderno do Tukain");
  createParagraph(
    "home",
    `Aqui é um lugar em que eu compartilho algumas coisas do meu dia a dia e meus achados pelo mundo da internet.

    ---

    "The strength of JavaScript is that you can do anything. The weakness is that you will." - Reg Braithwaite`,
  );
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
    createElement("a", `notes_entry${n}`, `${n}`);
    putText(`${n}`, `${note.date} - ${note.title}`);
    putAttribute(`${n}`, "href", `#note_${n}`);
    putStyle(
      `${n}`,
      `animation: fade 500ms both; animation-delay: ${i}00ms`,
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
    .replaceAll("\n- #note_", "\n    - #note_");

  // Statistics
  createPrivatePage("stats", "Estatísticas");
  createElementWithText(
    "pre",
    "stats",
    undefined,
    `Número de anotações: ${notes.length}
Palavras escritas: ${wordCountAll}
Caracteres utilizados: ${charCountAll}
Lista de páginas:
${pagesList}
- #stats
    `,
  );
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

//// Navbar
{
  createElement("nav", "mainBody", "navbar");

  {
    createElement("a", "navbar", "home_link");
    putAttribute("home_link", "href", "#");
    putText("home_link", "Home");
  }

  {
    createElement("div", "navbar", "other_links");
    for (const link of links) {
      createElement("a", "other_links", `${link.name}`);
      putAttribute(`${link.name}`, "href", `${link.url}`);
      putText(`${link.name}`, `${link.name}`);
    }
  }
}
