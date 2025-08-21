---
title: Blog
---
<style>
  table, td, th {
    background-color: var(--bg-0);
    border: none;
    border-bottom: solid 1px var(--bg-1);
  }
</style>
<a href="/rss.xml">Feed RSS</a>
<table>
<tbody>
{% for post in site.posts %}
{% assign duration = 1 | plus: duration %}
  <tr style="animation: fade-in both {{duration}}00ms;">
    <td>{{post.date | date: "%d.%m.%Y"}}</td><td><a href="{{post.url}}">{{post.title}}</a></td>
  </tr>
{% endfor %}
</tbody>
</table>
