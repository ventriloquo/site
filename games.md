---
title: Jogos
---
<style>
html {
    scroll-padding-top: 5em;
}
img {
    width: 180px;
    max-height: 280px;
    object-fit: cover;
    display: inline-block;
    margin: 2px;
    padding: 2px;
}

div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.game_info {
    display: none;
    max-width: 30ch;
}

.game:target .game_info {
    display: block
}

.game:target {
    display: flex;
    flex-wrap: wrap;
    margin: 2em auto;
    width: 100%;
    padding: 2em 0;
    align-items: center
}

.game:target img {
    margin-bottom: 1em;
}

.game:target .game_info {
    display: block;
    margin: auto;
}

@media only screen and (max-width: 720px) {
    img {
        margin: auto;
        display: block;
    }
}
</style>

# Minha biblioteca de jogos do Nintendo Switch.

Eu tenho um Nintendo Switch Lite a alguns meses. Nesses meses eu já montei uma
biblioteca até que bem grandinha, definitivamente maior que a minha antiga
biblioteca do saudoso Xbox 360 (que saudades 🥲).

## Mídia física
<div>
{% for midia_fisica in site.data.games.midia_fisica %}
<div class="game" id="{{ midia_fisica.title | slugify }}">
<a href="#{{ midia_fisica.title | slugify }}">
    <img loading="lazy" src="{{ midia_fisica.cover }}">
</a>
    <hgroup class="game_info">
        <h2>{{ midia_fisica.title }}</h2>
        {% if midia_fisica.description %}
            <q>{{ midia_fisica.description }}</q>
        {% endif %}
        {% if midia_fisica.buy_date %}
            <p><span style="color: var(--accent)">Quando foi comprado:</span> {{ midia_fisica.buy_date }}</p>
        {% endif %}
        {% if midia_fisica.url %}
            <a href="{{ midia_fisica.url }}" target="_blank">{{ midia_fisica.url }}</a>
        {% endif %}
    </hgroup>
</div>
{% endfor %}
</div>

## Mídia digital
<div>
{% for midia_digital in site.data.games.midia_digital %}
<div class="game" id="{{ midia_digital.title | slugify }}">
<a href="#{{ midia_digital.title | slugify }}">
    <img loading="lazy" src="{{ midia_digital.cover }}">
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
