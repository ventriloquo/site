export const posts = [
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
