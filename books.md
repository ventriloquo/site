---
title: "Lista de Leitura"
---
Essa é a minha coleção de livros e mangás

<div style="display: flex; flex-wrap: wrap; justify-content: center">
{% for book in site.data.books %}
<div style="margin: 10px">
    <img style="object-fit: cover" alt="{{book.title}}" title="{{book.title}}" loading="lazy" src="/assets/{{book.cover}}"
    width="180" height="280">
    <progress value="{{book.progress.current}}" max="{{book.progress.maximum}}"></progress>
    <p style="margin: 0; text-align: center">{{book.progress.current}}/{{book.progress.maximum}}</p>
</div>
{% endfor %}
</div>

