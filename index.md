---
title: Caderno do Tukain
---
Aqui é um lugar onde eu gosto de compartilhar um pouco do meu cotidiano.
Também é um lugar onde eu ponho em prática algumas coisas que eu aprendi, seja
elas relacionadas à tecnologia, programação ou qualquer outro assunto que eu
achar pertinente.

> <span>Reg Braithwaite</span><br>
>
> "The strength of JavaScript is that you can do anything.
> The weakness is that you will."

<h2>Últimos posts</h2>
<ul>
{% for post in site.posts limit: 3 %}
<li><a class="blog_entry" href="{{post.url}}">{{post.title}}</a></li>
{% endfor %}
</ul>
