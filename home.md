---
title: Início
---
# Tukain\'s Blog

Aqui é um lugar onde eu gosto de compartilhar um pouco do
meu cotidiano. Também é um lugar onde eu ponho em prática algumas
coisas que eu aprendi, seja elas relacionadas à tecnologia, programação ou
qualquer outro assunto que eu achar pertinente.

Resumindo, esse aqui é o site de um Nerdola.

## Últimos posts

<table>
<tbody>
{% for post in site.posts limit: 5 %}
{% assign duration = 1 | plus: duration %}
  <tr class="blog_item" style="animation: fade-in both {{duration}}00ms;">
    <td>{{post.date | date: "%d.%m.%Y"}}</td>
    <td>
        <a href="{{post.url}}">
            {{post.title}}
        </a>
    </td>
  </tr>
{% endfor %}
</tbody>
</table>
<a class="button" href="/blog">Ler mais</a>
<a class="button" href="/feed.xml">Feed</a>
