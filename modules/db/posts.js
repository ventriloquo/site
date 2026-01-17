"use strict";

export const posts = [
  {
    title: "Base16 e sincronização de temas com o Emacs",
    date: "10.01.2026",
    content: `
Uma das coisas que eu mais gosto de fazer no meu setup é customizar a paleta de cores de tudo (como quase todo usuário Linux). Porém, às vezes isso é bem tediante.

Cada programa tem o seu próprio jeito de configurar, o tipo de sistema de cores nem sempre segue um padrão (<code>RGB</code>, <code>RGBA</code>, <code>ARGB</code> e etc), enfim, muitas coisa para ter que lembrar e ajustar. Por conta disso, eu customava fazer um setup com um certo tema (por exemplo, [[https://github.com/sainnhe/everforest][everforest]]) e usar ele por pelo menos 1 ou 3 meses, já que a dor de cabeça de sair ajustando as cores de todos os programas que eu uso era grande demais para que eu fizesse isso com mais frequência.

Porém, como dito no meu post anterior:

#+begin_quote
[…] eu também consigo integrar a paleta de cor do tema que eu estou usando no Emacse aplicar ela no CSS do site!
#+end_quote

Isso se dá graças ao fato de que o Emacs consegue "descrever" as cores dos componentes do <i>buffer</i>, como cor, tipo de fonte, transparência e etc. Ou seja, basta você pedir ao Emacs que ele dê a cor do background dele e ele vai te dar uma string com a cor!

#+begin_src
(face-attribute 'default :background)
#+end_src
#+begin_example
#feedf3
#+end_example

Levando isso em consideração, eu pensei o seguinte: se eu consigo fazer essa integração com o meu site, então eu consigo fazer isso com as configurações do meu setup!

E então, depois de umas duas horas +/-, eu fiz um script em <code>Elisp</code> que gera esses arquivos de configuração para mim e deixei ele pronto para executar sempre que o Emacs é aberto.

<img loading="lazy" src="/assets/theme_switcher.gif">

A forma como ele funciona é bem simples: eu defini algumas variáveis contendo as cores que vou utilizar nas configurações (por exemplo, <code>red</code>) e escrevo o seguinte para criar os arquivos de configuração:

#+begin_src
(generate-config "~/.config/rofi/themes/colors.rasi"
		 "* {\\n"
		 "  col1: "	background	";\\n"
		 "  col2: "	grey            ";\\n"
		 "  col3: "	foreground      ";\\n"
		 "  col4: "	accent		";\\n"
		 "  col5: "	blue		";\\n"
		 "}")
#+end_src

<code>generate-config</code> é na realidade um <i>Macro</i> de uma função que fiz chamada <code>new-buffer</code>.

A definição dessa função é a seguinte:

#+begin_src
(defun new-buffer (name &optional content filepath)
  (if (not (stringp name))
      (error "\`%s' is not a string." name)
    (switch-to-buffer name)
    (erase-buffer)
    (if content (insert content))
    (if (not filepath)
	(warn "No \`filepath' provided. Showing buffer instead.")
      (write-file filepath)
      (kill-current-buffer)
      (message "\`%s' was written" filepath))))
#+end_src

Sim, eu sei, esse treco tá feio que dói. Maaass, funciona. Essa função funciona como um "<i>Helper</i>" para criar <i>buffers</i> com um conteúdo pre-definido e salvar esse buffer para o arquivo especificado em <code>filepath</code>.

A definição do <i>Macro</i> é bem simples:

#+begin_src
(defmacro generate-config (buffer-name &rest lines)
  \`(new-buffer ,buffer-name (concat ,@lines) ,buffer-name))
#+end_src

Basicamente, para usar ele você dá uma <i>string</i> contendo o caminho para o arquivo que será escrito (ex: <code>~/.config/rofi/themes/colors.rasi</code>) e em seguida, qualquer número de strings desejadas para serem colocadas no arquivo. Isso permite que você use <i>strings</i> contidas em variáveis, como uma cor em hexadecimal por exemplo.

Dá para usar ele para criar/escrever qualquer arquivo de texto, não só configurações, mas por conta do objetivo do "script", o nome dele ficou assim.

Ele tem uma única dependência: [[https://github.com/tinted-theming/base16-emacs][base16-emacs]].

Esse pacote é dá uma porrada de temas do <i>framework</i> "[[https://github.com/chriskempson/base16][base16]]". E uma coisa que faz parte das <i>guidelines</i> desse <i>framework</i> é que as cores [[https://en.wikipedia.org/wiki/ANSI_escape_code#Colors][ansi]] também são modificadas. Dessa forma fica fácil extrair a cor vemelha por exemplo, porque eu não preciso procurar ela dentro da lista de cores do Emacs, eu só preciso do atributo <code>ansi-color-red</code>.

Por enquanto, esse script que fiz só funciona perfeitamente com esse pacote.

Com o tempo vou adicionar mais "templates" a esse script e também vou deixar ele mais robusto, mas por enquanto ele está praticamente perfeito (eu uso pouquíssimos programas de interface gráfica no meu setup, então só de configurar o meu terminal 90% das coisas que uso ficam tematizadas).
`
  },
  {
    title: "Emacs - O meu novo computador",
    date: "25.12.2025",
    content: `
O Emacs é famoso por ser um programa que faz de <b>tudo</b>. E isso não é exagero (antes fosse!). Com ele você consegue fazer desde a tarefa mais básica que é editar texto, a planilhas, gestão de projetos, leitura de feeds RSS, comunicação via IRC, XMPP ou E-mail...

Enfim, <b>muita</b> coisa.

Óbviamente eu não faço tudo isso que listei acima, mas faço sim algumas coisas com ele e gostaria de escrever sobre. Bom, vamos começar!

* Minha configuração atual

Depois de um tempo em hiato, eu voltei a desenvolver a minha configuração do Emacs. Agora ela além de estar mais robusta, configurei até mesmo o cliente de e-mail [[https://www.gnu.org/software/emacs/manual/html_node/emacs/Rmail.html]["Rmail"]] (o "cliente de e-mail padrão do Emacs") e o [[https://www.gnu.org/software/emacs/erc.html][Erc]] (o cliente IRC pré-instalado do Emacs).

Além disso, usei um snippet do pessoal do [[https://systemcrafters.net][System Crafters]] para conseguir usar com mais facilidade a funcionalidade de leitura de arquivos <code>gpg</code>, o nome da função é meio estranho, mas basicamente, eu só preciso chamar ela e dar como um argumento uma chave presente no arquivo <code>.authinfo</code> e ela me retornará a senha correspondente à essa chave.

Como por exemplo:

#+begin_src
(efs/lookup-password :machine irc.libera.chat)
#+end_src
#+begin_quote
[[https://systemcrafters.net/emacs-tips/using-encrypted-passwords/#accessing-passwords-outside-of-emacs][A função em si é essa aqui]]:

#+begin_src
(defun efs/lookup-password (&rest keys)
  (let ((result (apply #'auth-source-search keys)))
    (if result
        (funcall (plist-get (car result) :secret))
      nil)))
#+end_src
#+end_quote

Eu também dei uma repaginada no alinhamento das coisas, afinal, não
basta funcionar, tem que ser bonito de se ver, e a Elisp é uma
linguagem ótima para fazer esse tipo de coisa! Porque ela:

- Não se importa com a quantidade de espaços que existe entre uma
  função e um parâmetro;
- Tem uma sintáxe bem simples de se ler (às vezes).

Sendo assim, eu consigo fazer esse tipo de coisa aqui:

#+begin_src
(icomplete-mode		               	t)
(ido-mode		               	t)
(ido-everywhere		               	t)
(which-key-mode		               	t)
(delete-selection-mode	               	t)
(global-visual-line-mode               	t)
(global-auto-revert-mode               	t)
(global-prettify-symbols-mode          	t)
(global-hl-line-mode	               	t)
(global-completion-preview-mode        	t)
(global-display-line-numbers-mode       t)
(fido-vertical-mode			t)
#+end_src

#+begin_quote
"Perfeitamente equilibrado, como tudo deve ser."
#+end_quote

[[https://i.redd.it/qpbqimfqx4p71.jpg]]

* Meu novo site

Também reescrevi meu site usando o <code>ox-publish</code>, a funcionalidade de publicação de documentos nativa do Emacs! Quando configurado de uma certa forma, ele não fica muito diferente de um [[https://jekyllrb.com][SSG]] ou [[https://codeberg.org/tukain/blog.sh][algo do gênero]].

Dentre vários facilitadores dados pelo [[https://orgmode.org/][org-mode]], acho que a que eu mais gosto é o <i>syntax highlighting</i>. Ele usa as cores do tema que você está usando no Emacs! Além disso, você também consegue executar os blocos de códigos presentes no documento e exibir o resultado desses blocos!

#+begin_src
(message "Maneiro, né?")
#+end_src
#+begin_example
Maneiro, né?
#+end_example

Não tenho ainda muitas ideias do que eu posso fazer com essa coisinha, mas pode ser que seja útil para demonstrar algo que aprendi a fazer na [[https://harelang.org][Hare]] (desde que o output seja em texto, claro).

O que eu sei é que o desenvolvimento do site passa a ser algo centralizado no Emacs. Algo que tem seus lados positivos, mas também tem seus negativos. O que eu posso fazer é tirar proveito dos <code>git submodules</code> para conseguir gerenciar um repositório com o "código-fonte" do site e o site "compilado" de forma facilitada (o que eu [[https://codeberg.org/tukain/site][já]] [[https://codeberg.org/tukain/pages][fazia]] na realidade).

Ah, mais uma coisa que eu lembrei agora: cada página desse site funciona de forma "independente" das outras. Basicamente, todas as páginas já incluem toda a estilização necessária para ter a aparência do site (todas elas incluem uma <i>tag</i> <code>&lt;style&gt;</code> com o CSS do site :P).

Além disso, eu também consigo integrar a paleta de cor do tema que eu estou usando no Emacs e aplicar ela no CSS do site!

Ou seja, as cores que o site tem, são as mesmas que a do meu Emacs, sem que eu precise definir elas manualmente!

#+begin_src
(setq org-html-head-extra
      (concat
       "&lt;head&gt;&lt;link rel='icon' href='/assets/fav.png'&gt;&lt;/head&gt;"
       "&lt;style&gt;"
       (with-temp-buffer (insert-file-contents "src/assets/styles.css") (buffer-string))
       ":root {"
           "--bg-1:"    (face-attribute 'default :background)			";"
           "--bg-0:"    (face-attribute 'hl-line :background nil 'default)	";"
           "--fg:"	(face-attribute 'default :foreground)			";"
           "--ac:"	(face-attribute 'cursor  :background nil 'default)	";"
       "}"
       "&lt;/style&gt;"))
#+end_src

* Organização financeira

O <code>org-mode</code> também tem a funcionalidade de gerir planilhas, com fórmulas e tudo!

Por exemplo, digamos que eu esteja gerendo uma planilha contendo os meus gastos mensais com planos de assinatura/contas recorrentes. Eu poderia fazer isso aqui:

#+begin_src
| Nome        | Dia de cobrança | Valor (R$) |
|-------------+-----------------+------------|
| Netflix     |              22 |      20.90 |
| Crunchyroll |              11 |      14.99 |
|-------------+-----------------+------------|
| Total       |                 |   35.89 R$ |
#+TBLFM: @>$3=string("R$")vsum(@I$3..@II$3)
#+end_src

É, a sintáxe não é lá aquelas coisas... mas é funcional. Para coisas simples ela é relativamente intuitiva (+/- né). O maneiro mesmo é escrever essas tabelas, por quê? Porque o Emacs formata automagicamente elas! É só começar uma tabela com <code>| nome</code> e apertar <code>tab</code>!

Além disso, também existe a tecla de atalho =Ctrl c }= que exibe alguns marcadores na tabela para poder facilitar o processo de escrever as fórmulas.

Ficando +/- assim:
#+begin_src
   1| Nome        | Dia de cobrança | Valor (R$) |
I*1 |-------------+-----------------+------------|
   2| Netflix     |              22 | 20.90      |
   3| Crunchyroll |              11 | 14.99      |
I*2 |-------------+-----------------+------------|
   4| Total       |                 | 35.89 R$   |
   5| Média       |                 | 17.945 R$  |
#+TBLFM: @4$3=string("R$")vsum(@I$3..@II$3)::@5$3=string("R$")vmean(@I$3..@II$3)
#+end_src

Como eu estou tentando diminuir o meu uso no celular, isso pode ser o tipo de coisa que pode me ajudar. Dessa forma eu vou ter um jeito de gerenciar as minhas finanças sem depender de aplicativos no meu celular. Até porque eu posso criar <i>deadlines</i> no <code>org-mode</code> e visualizar meus afazeres usando a agenda integrada dele!

#+begin_quote
Devo que admitir que não sei ainda como se usa o <code>org-agenda</code>, mas pelo o que eu li no [[https://orgmode.org/features.html#agendas][site oficial]] parece ser muito bacana!
#+end_quote

* Workflow de programação

O Emacs é primariamente um editor de código (por mais incrível que pareça). Sendo assim, ele possui *várias* funções e configurações para deixar a usabilidade na hora de programar melhor.

Uma das coisas mais maneiras do Emacs é a Elisp, a linguagem que ele é configurado, interpreta e é em boa parte escrito nela também. A parte de "interpretar" é que é a mais interessante, porquê isso permite que você teste um "plugin" sem a necessidade de instalar ele! Você só precisa criar um buffer ou abrir o "/scratch buffer/" e apertar =Ctrl c= =Ctrl e=. Isso vai fazer o Emacs interpretar o buffer inteiro, e dessa forma, você pode testar o "plugin" à vontade enquanto o Emacs estiver aberto!

Então você pode, por exemplo, testar um "plugin" que dá <i>syntax highlighting</i> (colorização de código) para alguma linguagem de programação que não é suportada por padrão pelo Emacs, como a [[https://harelang.org][Hare]], por exemplo.

Também tem o <code>compile-mode</code>... Meu Deus, por que isso não é um padrão de indústria?

Basicamente, o <code>compile-mode</code> serve para executar um comando especificado por você no diretório em que você estava e, caso aconteça erros, ele cria "links" com base nas linhas/colunas especificadas pela mensagem de erro.

Por exemplo...

#+begin_src
// Eu não incluí o módulo "fmt", necessário para usar a função "println"

export fn main() void = {
	println("Olá, mundo!")!;
};
#+end_src
#+begin_example
teste.ha:2:16: error: Unknown object 'println'

2 |		println("Olá, mundo!")!;
  |	               ^


harec for /tmp/teste.ha exited with status 4
#+end_example

A parte escrita com <code>teste.ha:2:16:</code> viraria um link, onde se eu clicar, o Emacs abriria o arquivo onde o erro ocorreu e deixaria o ponteiro do editor na linha e na coluna especificada pelo erro.

Depois de corrigir o erro, eu só preciso apertar uma tecla de atalho para que o comando usado para compilar o programa seja re-executado. Sem a necessidade de ir até onde o arquivo do programa está!

Particularmente isso é bem útil para mim, já que eu sou bem iniciante no mundo de programação, e isso é uma mão na roda na hora de escrever algo.

#+begin_quote
Principalmente na hora de desenvolver as [[https://codeberg.org/tukain/raylib.ha][minhas bindings]] para a [[https://github.com/raysan5/raylib][Raylib]].

Com uma sintáxe dessas aqui a última coisa que eu quero é ter que fazer todo esse processo na mão:

#+begin_src
@symbol("TakeScreenshot") fn TakeScreenshot(filename: *c::char) void;
export fn take_screenshot(filename: str) void = TakeScreenshot(c::fromstr(filename: str)!);
#+end_src
#+end_quote

* Conclusão

Enfim, acho que já deu para entender um pouco sobre algumas das coisas que eu faço (e coisas que dá para fazer) com o Emacs. Faz um bom tempo que eu não escrevo um post tão longo, já estava com saudades!

Até o próximo post!
`
  },
  {
    title: "Blog.sh - O meu próprio SSG",
    date: "20.12.2025",
    content: `
Ok, SSG é exagero. Esse carinha só serve para gerar um blog (por isso o nome blog.sh, quem diria).

Ele é basicamente um Shell Script (o mais POSIX que eu conseguir) que gera snippets de HTML a partir de certos parâmetros, usa o smu para converter Markdown para HTML e no fim, junta os dois para criar páginas para posts e lista essas páginas em uma index organizada por ordem crescente.

Ele é um projeto antigo meu e que eu ressuscitei essa semana.

Motivo? Tédio.

Eu tava dando uma olhada em alguns repositórios antigos meus e ele tava no meio deles. Então eu quis dar uma repaginada no garoto e cá está ele, novinho em folha e com funcionalidades que ele não possuia antes, como:

- mostrar as datas dos posts
- categorizar os posts em múltiplas pastas com base na data deles (que nem o Jekyll!)
- gerar um feed RSS

Enfim, ainda tem muito o que eu posso fazer para melhorar esse Script.
`
  },
  {
    title: "Gambiarras mostruosas com o Codeberg",
    date: "16.12.2025",
    content: `
Se você, assim como eu, é um nerd que usa Linux, então você já ouviu falar do Github. Muito provavelmente você também tem uma conta lá e uma meia dúzia de repositórios.

Mas, você já imaginou ter um repositório que faz um git push para outros repositórios de outros serviços de git hosting?

Esse é o tipo de coisa que você consegue fazer com o Codeberg/Forgejo!

Eu acabei de redescobrir essa funcionalidade e já tô fazendo a festa com ela!

Esse site por exemplo, eu faço uma modificação no repositório (como criar um novo post), mando as mudanças para o Codeberg, e então, o Codeberg vai usar as credenciais que eu providenciei (no caso, a url do outro repositório e um token de acesso) e vai mandar as mudanças do repositório do Codeberg para os outros repositórios que eu registrei!

Ou seja, eu consigo fazer uma espécie de backup dos meus repositórios. Bastando eu registrar outros repositórios de destino.

Ainda usando esse site como exemplo, ele está hospedado no Codeberg, Github e mais outro local, as mudanças são passadas de um para o outro, e no final, todos eles são clones do repositório do Codeberg. E além disso, o meu site fica hospedado tanto no Codeberg quanto no Neocities, já que o Codeberg possui o serviço "Codeberg Pages" (equivalente ao Github Pages) e no Github eu deixei um Workflow para mandar o site contruído para o Neocities.

#+begin_quote
Resumindo, dá para criar uma corrente de repositórios ligados a um repositório principal que são idênticos.
#+end_quote

Já tô configurando meus outros repositórios para funcionarem da mesma forma, já que aí eu vou ter uma certa redundância com cada um, então em caso de um banimento por conta de moderação automática (tô falando de você Github, perdi umas 4 contas nessa brincadeira) eu ainda vou ter um backup do repositório em outro local.
`
  },
  {
    title: "Niri - O WM mais diferenciado que já usei",
    date: "15.12.2025",
    content: `
Eu sou um usuário Linux a um bom tempo, a pelo menos uns 6/7 anos agora, e eu já usei diversos tipos de Desktop Environments e Window Managers. Desde o clássico XFCE4 ao DWM no X11, e no Wayland, do KDE ao Sway.

Mas todos eles seguem certos arquétipos de ambientes de trabalho semelhantes ao Windows ou ao macOS (no caso dos WM's, eles seguem um padrão bem similar em relação a como eles gerenciam janelas, a diferença fica em o que você consegue modificar e como). Agora o Niri…

Ele parece uma junção do Sway com o GNOME.

Ele gerencia janelas de forma semelhante a outros gerenciadores de janelas, mas não completamente. Nenhuma janela se sobrepõe à outra, a menos que essa janela seja flutuante. Sempre que uma nova janela aparece, ela surgirá no lado direito da tela, e se ela não couber dentro da tela, o foco irá "deslizar" para essa janela.

Imagine que as suas janelas estão em uma fita infinita, todas as janelas irão aparecer nessa fita e nenhuma delas vai se sobrepôr uma com a outra. É basicamente esse o diferencial do Niri.

As áreas de trabalho são basicamente outras "fitas infinitas" que ficam organizadas abaixo umas das outras, e você pode facilmente navegar entre elas e enviar janelas para cada uma. Há também um overview de todas as janelas e áreas de trabalho ("exposé" para os usuários de macOS) que é acessível com uma simples tecla de atalho (Win + o por padrão).

Para facilitar a sua vida, aqui está um vídeo mostrando como isso tudo funciona

Eu tô amando a minha experiência com o Niri. É basicamente a junção das coisas que eu mais amo do Sway com as coisas que mais amo do GNOME.

- Áreas de trabalho dinâmicas
- Overview de todas as janelas
- Organização automática de janelas
- Um arquivo de configuração poderosíssimo
- Roda liso numa batata (meu notebook é um Celeron com 4Gb de RAM)
`
  },
  {
    title: "Boku no Hero acabou",
    date: "14.12.2025",
    content: `
Cara… eu não consigo nem acreditar nisso… finalmente acabou!

Eu não sei nem o que dizer direito, o sentimento está sendo o mesmo de quando eu terminei Fullmetal Alchemist Brotherhood, a ficha não caiu ainda.

Eu acompanho o anime de Boku no Hero desde o lançamento da segunda temporada, eu tinha uns 12 anos de idade, hoje em dia eu já tenho 20. Posso facilmente dizer que esse foi o anime da minha adolescência.

Assisti todos os episódios religiosamente (eita que exagero) e todos os filmes (quando chegaram aos sete mares).

E hoje, eu assisti o último episódio, da última temporada.

É oficialmente um fim de um cíclo para mim. E foi algo prazeroso. Vou sentir saudades de aguardar todo final de semana para poder assistir um episódio novo.
`
  },
  {
    title: "Learn You A Haskell",
    date: "10.12.2025",
    content: `
Deixei um dos meus projetos hospedado aqui no meu site. O lyah (Learn You A Haskell)!

Ele é uma restauração do site do livro "Learn You A Haskell For Great Good", só que feita usando o Jekyll.

Tentei deixar ele o mais próximo do site original (quando ele ainda estava de pé, pelo menos).

Se você quiser ver ele, é só acessar "<a href="tukainpng.neocities.org/lyah">tukainpng.neocities.org/lyah</a>"!
`
  },
  {
    title: "TGA 2025",
    date: "06.12.2025",
    content: `
- Valve lança uma linha de Hardware
- Valve já afirmou no passado que tem novos projetos de jogos em desenvolvimento
- Referências a um certo jogo com as siglas "HEV" (Hazardous EnVironment Suit, a armadura do half-life) aparecem no código-fonte da Source 2
- TGA 2025 já tá chegando

* I HAVE HOPE!!!

VALVE, LANÇA HALF-LIFE 3 PELO AMOR DE DEEEUUUSS 😭😭😭😭
`
  },
  {
    title: "Final de ano já tá chegando",
    date: "03.12.2025",
    content: `
Nesse ano muita coisa aconteceu na minha vida (na de todo mundo na real né?), algumas boas, outras nem tanto. Mas num geral, acho que foi um ano relativamente bom. Principalmente se eu comparar com o tempo perdido que foi final de 2019, 2020, 2021 e o início de 2022.

Fiz também bastante coisa nesse ano, criei muitas boas memórias.

- Tive um reencontro com um amigo que conheci no SENAI (a gente não se via fazia mó tempo)
- Comprei um Nintendo Switch Lite no início do ano, depois em Outubro eu comprei um Switch padrão e vendi o Lite
- Fiz, refiz e fiz esse site de novo e de novo
- Quase comprei uma bicicleta elétrica (ainda bem que não comprei, principalmente por conta dessa PL de pagar IPVA até em cadeira de roda)
- Usei/Testei vários streamings diferentes (até agora, os únicos que duraram o ano todo foram o Spotify e a Crunchyroll)
- Completei 2 anos de namoro com a minha namorada (te amo querida)
- Criei uma conta no Twitter e me arrependi logo em seguida (eu vou deletar aquele treco, ô algoritimo que só recomenda desgraça)
- Tive as minhas primeiras férias como um CLT (o condenado trabalha 1 ano inteiro para tirar 30 dias de descanço, é foda kkkkk)

Enfim, é muita coisa para tentar resumir.
`
  },
  {
    title: "F One Punch Man 🪦",
    date: "28.11.2025",
    content: `
Eu sei. Você sabe. Todos sabemos. A terceira temporada de One Punch Man está um completo desastre.

Como que conseguiram a façanha de fazer uma animação pior que a da segunda? (ela já era uma bosta!)

Não vou pôr a culpa inteira no estúdio em si, ele tem uma capacidade até que boa para fazer animações de baixo custo. Mas aí é que tá o problema: <b>ANIMAÇÕES DE BAIXO CUSTO</b>.

Pelo amor de Deus, Bandai! É de One Punch Man que a gente tá falando! Como que você espera que isso vai dar certo? Passar da Mad <b>FUCKING</b> House na 1ª temporada para um estúdio que no máximo conseguiria fazer um Slice of Life mediano? É sério?

Sinceramente, eu espero que esse treco seja cancelado. Dói só de ver os episódios lançando.

Descarta essas 2 últimas temporadas, põe esse treco no congelador e só tira se for para tacar na mão de um estúdio como a Bones ou Mad House.
`
  },
  {
    title: "Uma pequena curiosidade sobre o DOM",
    date: "27.11.2025",
    content: `
Eu gosto muito de assistir as lives do Tsoding, e em uma das lives onde ele estava falando sobre JavaScript, ele mostrou uma coisa muito curiosa sobre o DOM.

Basicamente, qualquer <code>ID</code> dado a um elemento no HTML pode ser acessado como uma variável no JavaScript.

Bacana né?

Você pode, por exemplo, criar um elemento &lt;p&gt;, dar o <code>ID</code> "paragrafo" e usar o JavaScript para adicionar texto a ele!

+/- assim:

#+begin_src
&lt;p id="paragrafo"&gt;&lt;/p&gt;
&lt;script&gt;
  paragrafo.innerText = "Adicionando texto!"
&lt;/script&gt;
#+end_src
`
  },
  {
    title: "Tédio",
    date: "25.10.2025",
    content: `
Sabe uma coisa que eu ando sentindo ultimamente? É. Tédio. E por causa dele, eu percebi um padrão de comportamento meu que é muito similar ao da minha mãe. Minha mãe é que nem um tubarão

Não sei se você conhece essa piadinha, mas ela é a seguinte:

#+begin_quote
A minha mãe é que nem um tubarão, se ficar parada morre.
#+end_quote

Essa descrição se encaixa como uma luva para uma das coisas que ela vive fazendo, que é mudar móveis/decoração de lugar, pintar paredes, colocar uma planta nova na varanda, ou até tirar uma, enfim, o ambiente de casa está sempre mudando.

Isso não é algo ruim, longe disso, é bom viver em um ambiente que é tão vivo. Porém, percebi que eu herdei algo semelhante a essa "mania" de mudar as coisas como estão, a diferença é que eu faço isso de forma digital, com esse site!

* Esse site vive em constante mudança

É até enjoativo, eu já fiz e refiz esse site de novo e de novo e de novo. Inclusive, já fiz posts falando sobre isso! Que nem a minha mãe, a constante mudança que faço é tão frequente e tão… natural, que eu acabo só percebendo quando já estou no meio da mudança.

Por um lado, por conta desse desejo constante de experimentar algo novo, eu acabo aprendendo coisas novas. Ano passado mesmo eu não sabia fazer metade do que sei hoje em dia, e o mesmo vale para o ano retrasado e etc.

Por outro lado, sinto que por nunca me dar por satisfeito, não consigo seguir em frente com outros projetos, o que é, ironicamente, péssimo para o meu aprendizado.

* As constantes

Apesar disso, ainda existem coisas que eu não largo a mão com tanta facilidade, uma delas é jogar video-game, por exemplo. Em fevereiro, eu comprei um Nintendo Switch Lite, desde então, venho construindo aos poucos uma biblioteca. Não só isso, como também estou lentamente fazendo uma biblioteca de mangás também, estando perto de finalizar a minha coleção do Akira.

Eu vou tentar me educar para que os meus estudos de programação sejam também uma dessas constantes. O que na realidade já foram no passado, mas devido a vários enventos que ocorreram na minha vida eu acabei perdendo o gás.

Enfim, vou indo nessa, até o próximo post!
`
  },
  {
    title: "A Nintendo fez uma das patentes mais idiotas do mundo",
    date: "13.09.2025",
    content: `Não é segredo para ninguém que a Nintendo (ou como o Lion do Canal Central diz: Metendo) é a encarnação da ganância e soberba. Ela tem franquias incríveis e também foi muito importante para <a href="https://pt.wikipedia.org/wiki/Crise_dos_jogos_eletr%C3%B4nicos_de_1983">salvar a indústria quando ela estava a beira de um colapso</a>, mas, não podemos negar que a Nintendo de hoje é algo completamente diferente do que a Nintendo dos anos 80/90.

#+begin_quote
Principalmente depois que o Reggie saiu dela em 2019
#+end_quote

A Nintendo, pouco a pouco, vem perdendo a vergonha e ficando cada vez mais anti-consumidor (irônico, né?). <a href="https://www.nintendo.com/pt-br/store/products/mario-kart-world-switch-2/?srsltid=AfmBOoqfbT2DxZ0uAFUdP3guuVvxnUAmLk0tdpvAqDA8Wr9_on9vkCpb">Jogos medíocres a R$500,00</a> ou então <a href="https://www.nintendo.com/pt-br/store/products/the-legend-of-zelda-breath-of-the-wild-switch/">jogos com quase 10 anos de idade com preço de lançamento</a> (mesmo em mídia digital!)

Eu comprei um Nintendo Switch Lite por duas razões:

- Jogos em mídia física de verdade (e não Blu-Rays com uma chave de acesso pra um download de 300Gb)
- Custo-benefício

Em relação a este console, eu falo sem medo que este é um dos melhores consoles da geração (O melhor é o Switch OLED). O irônico é que eu tenho um console da Nintendo, com uma case temática de um dos jogos da Nintendo, mas não tenho nenhum jogo da Nintendo.

Preço, falta de legendas/dublagem, enfim, estes e outros pontos me fazem não ter a mínima vontade de comprar um jogo dela. Mas tem uma coisinha que ela fez que simplemente é tão absurda quanto ela é idiota.

* A patente

A patente <a href="https://gamesfray.com/wp-content/uploads/2025/09/US12403397B2-2025-09-02.pdf">N°12.403.397</a> é, de forma resumida, uma patente sobre as mecânicas de sumonar um personagem para lutar no lugar do personagem controlado pelo jogador.

Notou alguma semelhança?

Jogos da franquia JoJo's Bizarre Adventures, Persona, Digimon, Bakugan, Yu-Gi-Oh!, todos eles possuem mecânicas que caem como uma luva nessa descrição da patente.

#+begin_quote
Inclusive, <a href="https://en.wikipedia.org/wiki/List_of_JoJo%27s_Bizarre_Adventure_video_games#Main_series:~:text=JoJo%27s%20Bizarre%20Adventure%20(1993%20%2D%20Super%20Famicom%20%2D%20Cobra%20Team%2C%20WinkySoft)%20%2D%20Role%2Dplaying%20game">alguns deles existiam antes</a> mesmo da <a href="https://en.wikipedia.org/wiki/Pok%C3%A9mon_(video_game_series)#:~:text=The%20first%20games%2C%20Pocket%20Monsters%20Red%20and%20Green%2C%20were%20released%20in%201996%20in%20Japan%20for%20the%20Game%20Boy">franquia Pokémon</a> existir!
#+end_quote

Bom, agora a Metendo© tem uma patente que é infringida pelos jogos destas franquias.

Mas, como já destacado pela <a href="https://www.ign.com/articles/nintendo-should-never-have-received-controversial-summon-character-and-let-it-fight-pokmon-patent-ip-lawyers-say#:~:text=However%2C%20Don%20McGowan,screen%20patent.%E2%80%9D">IGN</a> no artigo deles falando sobre o assunto, dificilmente alguém vai levar essa patente a sério, e isso foi algo que o antigo CLO da própria Nintendo disse! Essa patente é ridícula a esse ponto, nem um ex-funcionário põe fé nessa bosta.
`
  },
  {
    title: "Até que eu tô curtindo a Elisp",
    date: "30.06.2025",
    content:
    `
Nos últimos dias eu não ando fazendo tanta coisa assim, além de trabalhar e estudar um pouco quando dá, mas uma coisa que eu venho experimentando cada vez mais (até no trabalho, quando tenho tempo) é a própria linguagem do Emacs, a Elisp.

Se você me conhece, ou já viu meu perfil do Github, você já sabe que eu sou um usuário de drog- Emacs, e ele não só é configurado nessa linguagem, como é escrito nela e também interpreta ela! Só para colocar em perspectiva, um equivalente a isso seria um programa configurado em Python, que é escrito em Python e que interpreta Python.

A Elisp é um dialeto da Lisp que é integrada ao Emacs e que tem funcionalidades que giram entorno de fazer parte de um editor de texto. Resumindo:

- Você não tem dor de cabeça para gerenciar arquivos
- Você tem acesso a ferramentas de manipulação de buffers de texto
- Você tem toda a flexibilidade do Emacs a disposição

Enfim, é uma boa linguagem para experimentar.

Porém a sintaxe é que é a parte intrigante dos dialetos de Lisp.

Tudo (eu não tô de sacanagem) tem base em S-Expressions, o que faz com que uma declaração que seria escrita assim em C:

#+begin_src
int soma(int x, int y)
{
  return x + y;
}
#+end_src

Virar isso aqui:

#+begin_src
(defun soma (x y)
  (+ x y))
#+end_src

Ambos resultam na mesma coisa, uma função que tem dois argumentos e que realiza a soma dos dois. Só.

E de primeira, isso é estranho para um cacete, mas depois de um tempo… continua estranho, mas você começa a curtir até.

É muito simples entender como que funciona a lógica por trás disso, só não é lá muito comum de ver algo desse tipo. E eu tô curtindo brincar com isso.

Principalmente porquê, como eu já disse, a Elisp é parte do Emacs, então onde o Emacs pode ser usado, eu posso brincar com ela (ou até mesmo criar coisas úteis, o que é difícil de se imaginar vindo de mim).
    `
  },
];

export default posts;
