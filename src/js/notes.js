export const posts = [
  {
    title: "F One Punch Man 🪦",
    date: "28.11.25",
    content:
    `Eu sei. Você sabe. Todos sabemos. A terceira temporada de One Punch Man está um completo desastre.

    Como que conseguiram a façanha de fazer uma animação pior que a da segunda? (ela já era uma bosta!)

    Não vou pôr a culpa inteira no estúdio em si, ele tem uma capacidade até que boa para fazer animações de baixo custo. Mas aí é que tá o problema: ANIMAÇÕES DE BAIXO CUSTO.

    Pelo amor de Deus, Bandai! É de One Punch Man que a gente tá falando! Como que você espera que isso vai dar certo? Passar da Mad FUCKING House na 1ª temporada para um estúdio que no máximo conseguiria fazer um Slice of Life mediano? É sério?

    Sinceramente, eu espero que esse treco seja cancelado. Dói só de ver os episódios lançando.

    Descarta essas 2 últimas temporadas, põe esse treco no congelador e só tira se for para tacar na mão de um estúdio como a Bones ou Mad House.`
  },
  {
    title: "Uma pequena curiosidade sobre o DOM",
    date: "27.11.25",
    content:
    `Eu gosto muito de assistir as lives do Tsoding, e em uma das lives onde ele estava falando sobre JavaScript, ele mostrou uma coisa muito curiosa sobre o DOM.

    Basicamente, qualquer ID dado a um elemento no HTML pode ser acessado como uma variável no JavaScript.

    Bacana né?

    Você pode, por exemplo, criar um elemento <p>, dar o ID "paragrafo" e usar o JavaScript para adicionar texto a ele!

    +/- assim:

    <p id="paragrafo"></p>
    <script>
    id.innerText = "Adicionando texto!"
    </script>`
  },
  {
    title: "Meus objetivos com este site",
    date: "26.11.25",
    content:
      `- Deixar ele extremamente rápido (a menos que o delay seja proposital)
    - Deixar ele bonito (agora a situação tá bem complicada)
    - Deixar ele fácil de usar em qualquer plataforma (aposto que tá uma bosta usar isso no celular)
    - Ser mais ativo com o desenvolvimento dele (quase impossível)
    - Ser objetivo
    - Não adicionar muitas coisas pessoais (a menos que seja parte de uma anotação nova)
    - Ter o mínimo de dependências externas possíveis
    - Ser facilmente editável
    - Funcionar no máximo de navegadores possível e de forma consistente
    - Mínimo de bloat possível (usar JavaScript já é bloat o suficiente)`,
  },
];

export default posts;
