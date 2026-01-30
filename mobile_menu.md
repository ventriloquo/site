---
title: Menu
---

<ul>
{% for link in site.data.nav %}
<li><a class="blog_entry" href="{{link.url}}">{{link.title}}</a></li>
{% endfor %}
</ul>
