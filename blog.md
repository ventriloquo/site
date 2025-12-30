---
title: Blog
---
<style>
  .feed {
    text-align: center !important;
  }
</style>
<p class="feed"><a class="button" href="/feed.xml">Feed RSS</a></p>
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
