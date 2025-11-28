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
    `Aqui é um lugar em que eu compartilho algumas coisas do meu dia a dia e meus achados pelo mundo da internet.`,
  );
}

//// Blog
{
  createPage("notes", "Anotações");
  createElement("ul", "notes", "notes_list");
  let p = notes.length + 1;
  let i = 1;
  let wordCount = 0;
  for (const note of notes) {
    p--;
    i++;
    // Entries;
    createElement("li", "notes_list", `notes_entry${p}`);
    createElement("a", `notes_entry${p}`, `${p}`);
    putText(`${p}`, `${note.date} - ${note.title}`);
    putAttribute(`${p}`, "href", `#note_${p}`);
    putStyle(
      `${p}`,
      `animation: fade 500ms both; animation-delay: ${i}00ms`,
    );

    // note
    createPrivatePage(`note_${p}`, `${note.title}`);
    createElementWithText(
      "h3",
      `note_${p}`,
      "note_date",
      `${note.date}`,
    );
    createParagraph(`note_${p}`, `${note.content}`);

    wordCount = note.content.split(" ").length + wordCount;
  }

  // Statistics
  createPrivatePage("stats", "Estatísticas");
  createParagraph(
    "stats",
    `Número de anotações: ${notes.length}
    Palavras escritas: ${wordCount}
    `,
  );

  const pagesList = pages.toString()
    .replaceAll(/^/g, "\t- #")
    .replaceAll(",", "\n\t\t- #")
    .replaceAll("\n\t\t- #note_", "\n\t\t\t- #note_");

  console.log(`
    Estatísticas
    ============

    Número de anotações: ${notes.length}
    Palavras escritas:   ${wordCount}
    Lista de páginas:
    ${pagesList}
  `);
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
