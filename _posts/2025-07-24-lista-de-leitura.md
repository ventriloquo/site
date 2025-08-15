---
title: Minha primeira lista de leitura
---
Ontem eu estava dando uma navegada no Neocities, vendo alguns sites seguidos
pelo pessoal que eu sigo (eita frase confusa), e encontrei um site de um
escritor independente. Nesse site ele tinha coisas como poemas, publicações
e também um blog.

Eu chequei um dos posts dele e uma coisa me chamou a atenção: Tinha uma barra
de progresso encima do post, que dizia o progresso de leitura de um livro que
ele estava lendo. Ao olhar isso eu me senti inspirado, e como eu já estava com
vontade de dar uma variada um pouco no desenvolvimento do meu site, eu decidi
criar uma página com a minha biblioteca!

<q>Eu chamo de lista de leitura porquê eu vou adicionar livros que eu não
tenho ainda e mangás também.</q>

Nela vão estar listados todos os livros que eu já li e/ou estou lendo, junto
também de uma informação de quantas páginas faltam para que eu termine o livro.
Também tem um status geral, com a quantidade de livros que eu tenho no total,
quantos desses eu já li, quantos eu estou lendo e uma barra de progresso que
mede o total de páginas que eu li em comparação com o total de páginas da
biblioteca.

Fazer essa implementação foi um aprendizado também, já que eu não uso
bibliotecas externas (no máximo busco informações no famoso Stack Overflow).
Agora se tem uma coisa que eu preciso fazer é dar uma revisada no código e
tentar deixar ele mais... legível. Não que ele esteja repleto de variáveis de 1
letra, mas é sempre bom deixar o código fácil de ler para você mesmo não se
perder no futuro.

> Se bem que esse bloco de código mostra um pouco da bagunça:
> ```js
> for (let i = 0; i < livros_progresso.length; i++) {
>   livros_progresso[i].setAttribute("id", "progress");
>   livros[i].setAttribute("id", `livro_${i}`);
> 
>   const restante = document.createElement("p");
>   restante.setAttribute("id", "restante");
>   restante.style.fontSize  = "small"
>   restante.style.fontStyle = "italic"
>   restante.style.color     = "var(--accent)"
> 
>   if (livros_progresso[i].value == livros_progresso[i].max) {
>     livros_lidos++;
>   } else {
>     restante.innerText = `Faltam ${livros_progresso[i].max - livros_progresso[i].value} páginas`
>     document.getElementById(`livro_${i}`).appendChild(restante)
>     livros_sendo_lidos++;
>   }
> 
>   paginas_lidas = paginas_lidas + livros_progresso[i].value;
>   paginas_total = paginas_total + livros_progresso[i].max;
> }
> ```

Enfim, vou deixar para fazer o polimento quando eu estiver com mais tempo e com
a mente livre.

Até o próximo post!`,
