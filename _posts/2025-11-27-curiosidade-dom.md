---
title: Uma pequena curiosidade sobre o DOM
---

Eu gosto muito de assistir as lives do Tsoding, e em uma das lives onde ele estava falando sobre JavaScript, ele mostrou uma coisa muito curiosa sobre o DOM.

Basicamente, qualquer ID dado a um elemento no HTML pode ser acessado como uma variável no JavaScript.

Bacana né?

Você pode, por exemplo, criar um elemento <p>, dar o ID \"paragrafo\" e usar o JavaScript para adicionar texto a ele!

+/- assim:

```html
<p id="paragrafo"></p>
<script>
    id.innerText = "Adicionando texto!"
</script>
```
