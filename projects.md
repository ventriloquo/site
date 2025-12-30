---
title: Projetos
---

<style>
.project {
    display: flex;
    flex-wrap: no-wrap;
}
.project img {
    margin: 1em;
    max-height: 300px;
    max-width: 200px;
}
a[href^="http"]::after {
    content: "";
}
@media only screen and (max-width: 1280px) {
    .project {
        flex-wrap: wrap;
        justify-content: center;
    }
}
</style>

# Meus projetos
Esta é uma lista de alguns dos projetos pessoais em que estou trabalhando/trabalhei.

{% for project in site.data.projects %}
<div class="project">
    <a href="{{project.url}}">
        <img src="/assets/img/projects/{{ project.cover }}">
    </a>
    <div>
        <h1>{{ project.name }}</h1>
        {{project.description}}
    </div>
</div>
<hr>
{% endfor %}

