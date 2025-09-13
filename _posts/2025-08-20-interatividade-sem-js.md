---
title: Interatividade sem JavaScript
modified: 2025-09-12
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

{% raw %}
```django
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
```
{% endraw %}

Esse é o código reponsável por gerar a listagem de jogos de mídia digital na
página da minha biblioteca de jogos. É basicamente HTML com ~~algumas~~ muitas
funcionalidades extras.

Eu posso até mesmo gerar uma lista com os 2 primeiros jogos da minha
biblioteca, olha aqui:

<div class="game_collection">
{% for midia_digital in site.data.games.midia_digital | limit: 2 %}
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

Bastou que eu adicionasse {% raw %}`| limit: 2`{% endraw %} no final do for-loop ({% raw %}`{% for...`{% endraw %})
e pronto! Eu tenho a mesma lista, só que com os primeiros 2 jogos!

Essa facilidade é o que mais me atrai a usar o Jekyll.

Porém, só o Jekyll não basta para criar esse tipo de coisa. Vamos dizer que ele é
só o motor da parada, o resto fica por conta do CSS (que inclusive, está
gigantesco, 549 linhas 😱).

Eu não sou um guru do CSS, porém eu sei de uma coisinha ou outra, o suficiente
para que esses "truques com 0 JavaScript" sejam possíveis pelo menos.

É impressionante a quantidade de coisa que você pode fazer usando somente CSS,
[até mesmo um jogo você consegue fazer](https://benjaminaster.github.io/CSS-Minecraft/)!

Esse site vai ficar sem JavaScript para sempre? Provavelmente não, porém no
momento, ele é completamente limpo de qualquer linha de JavaScript, e no dia
que eu for colocar algo com JavaScript, vai ter que ser algo que realmente
precise dele para funcionar. De resto, se eu consiguir implementar só usando
Liquid e CSS, eu vou implementar só com eles.

## Limitações

Claro que este tipo de implementação tem suas limitações, a maior e mais clara
delas é que o site é completamente estático. Ele não tem um estado que se
modifica de acordo com a interação do usuário, nem faz mudanças de forma
dinâmica, no máximo, faz uma ilusão semelhante.

Apesar disso, acredito que este modo de operar é superior, por conta dos
benefícios no desempenho e também na questão de mantenabilidade (sim, essa
palavra existe).

Claro que a sintáxe da Liquid é um pouco... estranha. Mas não é como se
JavaScript fosse a coisa mais bela de se ver também.

{% raw %}
```liquid
{% for book in site.data.books %}
  {% if book.progress.current == book.progress.maximum %}
    {% assign read = 1 | plus: read %}
  {% endif %}
{% endfor %}
```
{% endraw %}
