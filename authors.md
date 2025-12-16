---
title: Autores
layout: base
---
<style>
    .authors_list {
        display: flex;
        flex-wrap: wrap;
    }
    .author {
        width: 400px;
    }
    .author_details {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        margin-bottom: 1em;
    }
    .author_details p {
        margin: 0;
    }
    .author_details img {
        width: 150px;
        height: 150px;
        border-radius: 100%;
        margin: 0;
    }
    .authors_list .author {
        margin: 5px;
        padding: 2em;
        border: var(--border);
        border-color: var(--bg-0);
    }
    .author:target {
        border-color: var(--accent-1)
    }
    @media only screen and (orientation: portrait) {
        .authors_list {
            justify-content: center;
        }
        .author {
            width: 250px;
        }
        .author_details {
            flex-direction: column;
        }
    }
</style>

# Autores

<div class="authors_list">
{% for author in site.data.authors %}
<div class="author" id="{{ author.name | slugify }}">
    <div class="author_details">
    <img src="/assets/img/authors/{{ author.name | slugify }}.png">
    <hgroup>
        <h2>{{author.name}}</h2>
        {% if author.codeberg_user %}
            <p><a href="https://codeberg.org/{{author.codeberg_user}}">Codeberg</a></p>
        {% endif %}
        {% if author.github_user %}
            <p><a href="https://github.com/{{author.github_user}}">Github</a></p>
        {% endif %}
        {% if author.neocities %}
            <p><a href="https://neocities.org/site/{{ author.neocities }}">Neocities</a></p>
        {% endif %}
        {% if author.twitter %}
            <p><a href="https://x.com/{{author.twitter}}">Twitter/X</a></p>
        {% endif %}
        {% if author.youtube %}
            <p><a href="https://www.youtube.com/@{{ author.youtube }}">Youtube</a></p>
        {% endif %}
        {% if author.instagram %}
            <p><a href="https://instagram.com/{{ author.instagram }}">Instagram</a></p>
        {% endif %}
    </hgroup>
    </div>
    {{author.description}}
</div>
{% endfor %}
</div>

# Quer se tornar um autor?
Se você quiser, você também pode criar posts para esse site!

Para isso, o que você vai precisar fazer é fazer uma [fork deste site](https://github.com/ventriloquo/site),
adicione uma entrada no arquivo `_data/authors.yml` e uma foto de perfil em
`assets/img/authors/` (o nome deve ser em _slug notation_ e o arquivo deve ser
`png`).

Depois disso, é só fazer um post em `_posts`! Tipo assim:

```markdown
---
title: Meu primeiro post
author: Burro
---

Esse é o meu primeiro post
```

O post não vai ser adicionado automaticamente, eu irei checar o seu _pull
request_ e só então irei fazer um _merge_ no repositório.

### Regras

Só serão aceitos os _pull requests_ que:

- Não possuem conteúdo impróprio (odioso, pornográfico ou criminoso)
- Modifiquem somente o arquivo `_data/authors.yml`, adicionando novos
  autores/atualizando os seus detalhes.
- Adicionem um novo tema em `assets/css/themes` (eu já deixei alguns temas lá
  de exemplo).
- Links para suas redes sociais devem estar presentes somente na página de
  autores, ou então, devem ter alguma relação com o post em si (exemplo: você
  está falando sobre algo na sua página do Neocities).

Se você achar algum problema no site em si ou tem alguma objeção quanto à essas
regras, sinta-se livre para abrir uma _issue_!
