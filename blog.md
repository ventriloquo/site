---
title: Blog
---
<style>
  table, td, th {
    border: none;
  }
  td a {
    color: var(--fg-2);
  }
</style>
<a href="/rss.xml">Feed RSS</a>
<table>
<tbody>
{% for post in site.posts %}
{% assign duration = 1 | plus: duration %}
  <tr class="blog_item" style="animation: fade-in both {{duration}}00ms;">
    <td>{{post.date | date: "%d.%m.%Y"}}</td>
    <td>
        <a href="{{post.url}}">
            {{post.title}}
        </a>
    </td>
  </tr>
{% endfor %}
</tbody>
</table>
