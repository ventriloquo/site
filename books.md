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
<div id="status_biblioteca">
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
                <th class="livro" style="border: none; text-align: center">
                {{cur}} páginas de {{max}}
                <progress value="{{cur}}" max="{{max}}"></progress></th>
            </tr>
        </tbody>
    </table>
</div>
<div id="biblioteca">
{% for book in site.data.books %}
<div class="livro" id="{{ book.title | slugify }}">
    <img
        loading="lazy"
        alt="{{ book.title }} cover"
        width="180"
        height="280"
        src="/assets/img/books/{{ book.cover }}">
    <progress
        value="{{ book.progress.current }}"
        max="{{ book.progress.maximum }}"
        title="{{ book.progress.current }} páginas lidas de {{ book.progress.maximum }}"></progress>
    <p><a
        href="{{ book.url }}"
        target="_blank">{{ book.title }}</a></p>
{% unless book.progress.current == book.progress.maximum %}
    <p
        style="font-size: small; font-style: italic; color: var(--accent-2);"
        >Faltam {{ book.progress.maximum | minus: book.progress.current }} páginas</p>
{% endunless %}
</div>
{% endfor %}
</div>
