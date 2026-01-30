---
title: Minha coleção de jogos
---

<div style="display: flex; flex-wrap: wrap; justify-content: center">
{% for game in site.data.games %}
    <img
        alt="{{game.title}}"
        title="{{game.title}}"
        src="/assets/{{game.cover}}"
        width="200"
        height="200"
        style="margin: 0px"
        >
{% endfor %}
</div>
