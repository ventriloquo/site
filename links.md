---
title: Links
---

<style>
a::after {
    content: "" !important;
}
</style>

<div style="display: flex; flex-wrap: wrap; justify-content: space-evenly">
{% for link in site.data.links %}
    <a href="{{link.url}}" target="_blank" style="margin: 3px 5px; align-content: center; text-decoration: none">
        {% if link.button %}
            <img
                style="object-fit: cover"
                width="88"
                height="31"
                alt="{{link.title}}"
                loading="lazy"
                src="{{link.button}}">
        {% else %}
            {{link.title}}
        {% endif %}
    </a>
{% endfor %}
</div>
