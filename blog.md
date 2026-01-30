---
---

<div style="display: none">
{% for post in site.posts %}
    {% increment length %}
{% endfor %}
</div>

<h1 style="position: relative">Blog <span style="position: absolute; right: 0; font-size: large; align-self: center">{{length}} posts</span></h1>
{% include list_entries.html %}
