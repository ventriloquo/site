---
title: Jogos
---
# Minha biblioteca de jogos do Nintendo Switch.

## Mídia física
<div class="game_collection">
{% for midia_fisica in site.data.games.midia_fisica %}
<div class="game" id="{{ midia_fisica.title | slugify }}">
    <a href="#{{ midia_fisica.title | slugify }}">
        <img
            alt="{{ midia_fisica.title }} cover art"
            width="180"
            height="280"
            loading="lazy"
            src="{{ midia_fisica.cover }}">
    </a>
    <hgroup class="game_info">
        <h2>{{ midia_fisica.title }}</h2>
        {% if midia_fisica.description %}
            <q>{{ midia_fisica.description }}</q>
        {% endif %}
        {% if midia_fisica.buy_date %}
            <p><span style="color: var(--accent-2)">Quando foi comprado:</span> {{ midia_fisica.buy_date }}</p>
        {% endif %}
        {% if midia_fisica.url %}
            <a href="{{ midia_fisica.url }}" target="_blank">{{ midia_fisica.url }}</a>
        {% endif %}
    </hgroup>
</div>
{% endfor %}
</div>

## Mídia digital
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
            <p><span style="color: var(--accent-2)">Quando foi comprado:</span> {{ midia_digital.buy_date }}</p>
        {% endif %}
        {% if midia_digital.url %}
            <a href="{{ midia_digital.url }}" target="_blank">{{ midia_digital.url }}</a>
        {% endif %}
    </hgroup>
</div>
{% endfor %}
</div>
