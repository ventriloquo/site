---
title: Blog
---
<style>
  table, td, th {
    background-color: var(--bg-0);
    border: none;
  }
</style>
<a href="/rss.xml">Feed RSS</a>
<table>
<tbody>
{% for post in site.posts %}
{% assign duration = 1 | plus: duration %}
  <tr style="animation: fade-in both {{duration}}00ms;">
    <td>{{post.date | date: "%d.%m.%Y"}}</td>
    <td class="blog_item">
        <a href="{{post.url}}">
            {{post.title}}
        </a>
        <span>{{post.excerpt}}</span><br>
    </td>
  </tr>
{% endfor %}
</tbody>
</table>
