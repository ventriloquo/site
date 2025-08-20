---
title: Interatividade sem JavaScript
---

Se você dar uma navegada no meu site, vai perceber que não existe 1 linha
sequer de JavaScript presente nele. E mesmo assim, ele tem um menu para mobile,
cards interativos na [página da minha biblioteca de jogos](/games), entre
outras coisas que quando vistas, assumi-se que foi utilizado JavaScript em
algum momento.

A parte interessante é que esse site costumava sim ter bastante JavaScript para
fazer justamente essa interatividade, mas o meu autismo não me permite usar ele
por muito tempo.

Mas como que eu estou fazendo essa "interatividade"? Simples, eu estou usando
um SSG (do inglês, gerador de site estático). O Jekyll para ser mais preciso.
Faz um certo tempo que eu não uso ele (não tanto assim, no máximo 3 meses),
mas, graças ao JavaScript irônicamente, aprendi a fazer outras coisas que
deixam a usabilidade do meu site melhor e mais divertida.

Tudo o que fiz basicamente foi espelhar as coisas que eu fazia usando
JavaScript com a linguagem de templates usada pelo Jekyll: a Liquid. O que não
foi muito difícil, já que o uso de JavaScript nesse site era idêntico ao uso da
Liquid e também tinha uma estrutura simples.

> Como sempre, a simplicidade salvando o dia.

Um exemplo que posso fazer é o seguinte:

{% highlight django %}
{% raw %}
<div class="game_collection">
{% for midia_digital in site.data.games.midia_digital %}
<div class="game" id="{{ midia_digital.title | slugify }}">
<a href="#{{ midia_digital.title | slugify }}">
    <img
        alt="{{ midia_digital.title }} cover art"
        width="180"
        height="180"
        loading="lazy"
        src="{{ midia_digital.cover }}">
</a>
    <hgroup class="game_info">
        <h2>{{ midia_digital.title }}</h2>
        {% if midia_digital.description %}
            <q>{{ midia_digital.description }}</q>
        {% endif %}
        {% if midia_digital.buy_date %}
            <p><span style="color: var(--accent)">Quando foi comprado:</span> {{ midia_digital.buy_date }}</p>
        {% endif %}
        {% if midia_digital.url %}
            <a href="{{ midia_digital.url }}" target="_blank">{{ midia_digital.url }}</a>
        {% endif %}
    </hgroup>
</div>
{% endfor %}
</div>
{% endraw %}
{% endhighlight %}

Esse é o código reponsável por gerar a listagem de jogos de mídia digital na
página da minha biblioteca de jogos. Basicamente, HTML com algumas
funcionalidades extras.

Eu posso até mesmo gerar uma lista com os 3 primeiros jogos da minha
biblioteca, olha aqui:

<div class="game_collection">
{% for midia_digital in site.data.games.midia_digital | limit: 3 %}
<div class="game" id="{{ midia_digital.title | slugify }}">
<a href="#{{ midia_digital.title | slugify }}">
    <img
        alt="{{ midia_digital.title }} cover art"
        width="180"
        height="180"
        loading="lazy"
        src="{{ midia_digital.cover }}">
</a>
    <hgroup class="game_info">
        <h2>{{ midia_digital.title }}</h2>
        {% if midia_digital.description %}
            <q>{{ midia_digital.description }}</q>
        {% endif %}
        {% if midia_digital.buy_date %}
            <p><span style="color: var(--accent)">Quando foi comprado:</span> {{ midia_digital.buy_date }}</p>
        {% endif %}
        {% if midia_digital.url %}
            <a href="{{ midia_digital.url }}" target="_blank">{{ midia_digital.url }}</a>
        {% endif %}
    </hgroup>
</div>
{% endfor %}
</div>

Bastou eu adicionar {% raw %}`| limit: 3`{% endraw %} no final do for-loop ({% raw %}`{% for...`{% endraw %})
e pronto! Eu tenho a mesma lista, só que com os primeiros 3 jogos!

Essa facilidade é o que mais me atrai a usar o Jekyll.

## A fazer: terminar o post :P
