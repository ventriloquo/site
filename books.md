---
title: Lista de Leitura
---
<hgroup>
  <h1>Lista de leitura</h1>
  <p>
    Eu não sou o tipo de pessoa que <b>gosta</b> de ler, mas
    já li uma coisinha ou outra (embora a maior parte tenha
    sido mangás).
  </p>
</hgroup>
<table>
    <tbody>
        <tr>
            <td>Total de livros</td>
            {% assign total = site.data.books | size %}
            <td style="text-align: center">{{total}}</td>
        </tr>
        <tr>
            <td>Total de livros lidos</td>
            {% for book in site.data.books %}
                {% if book.progress.current == book.progress.maximum %}
                    {% assign read = 1 | plus: read %}
                {% endif %}
            {% endfor %}
            <td style="text-align: center">{{read}}</td>
        </tr>
        <tr>
            <td>Total de livros que estou lendo</td>
            <td style="text-align: center">{{ total | minus: read}}</td>
        </tr>
        <tr>
            <th>Meu progresso</th>
            {% for book in site.data.books %}
                {% assign max = book.progress.maximum | plus: max %}
                {% assign cur = book.progress.current | plus: cur %}
            {% endfor %}
            <th class="book" style="border: none; text-align: center">
            {{cur}} páginas de {{max}}
            <progress value="{{cur}}" max="{{max}}"></progress></th>
        </tr>
    </tbody>
</table>
<div class="book_shelf">
{% for book in site.data.books %}
<div class="book" id="{{ book.title | slugify }}">
    <a href="#{{ book.title | slugify }}">
    <img
        loading="lazy"
        alt="{{ book.title }} cover"
        width="180"
        height="280"
        src="/assets/img/books/{{ book.cover }}">
    </a>
    <hgroup class="book_info">
        <h2>
            {{ book.title }}
        </h2>
        {% if book.description %}
            <q>{{ book.description }}</q>
        {% endif %}
        {% if book.url %}
            <a href="{{ book.url }}" target="_blank">{{ book.url }}</a>
        {% endif %}
        <progress
            value="{{ book.progress.current }}"
            max="{{ book.progress.maximum }}"
        ></progress>
        {% if book.progress.current == "0" %}
            {% assign color = "red" %}
        {% elsif book.progress.current == book.progress.maximum %}
            {% assign color = "green" %}
        {% else %}
            {% assign color = "brown" %}
        {% endif %}
        <div
          class="progress"
          style="background-color:   var(--{{color}});"
          >Páginas lidas: {{ book.progress.current }}/{{ book.progress.maximum }}</div>
    </hgroup>
</div>
{% endfor %}
</div>
