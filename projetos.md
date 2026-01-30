---
title: Projetos
---

{% for project in site.data.projects %}
<hr>
<div>
    <img loading="lazy" width="200" alt="{{project.title}}" src="{{project.icon}}">
    <h2><a href="{{project.repo}}">{{project.title}}</a></h2>
    <br>
    <p>{{project.description}}</p>
</div>
{% endfor %}
