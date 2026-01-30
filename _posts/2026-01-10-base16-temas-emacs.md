---
title: Base16 e sincronização de temas com o Emacs
---
Uma das coisas que eu mais gosto de fazer no meu setup é customizar a paleta de
cores de tudo (como quase todo usuário Linux). Porém, às vezes isso é bem
tediante.

Cada programa tem o seu próprio jeito de configurar, o tipo de sistema de cores
nem sempre segue um padrão (`RGB`, `RGBA`, `ARGB` e etc), enfim, muitas coisa para
ter que lembrar e ajustar. Por conta disso, eu customava fazer um setup com um
certo tema (por exemplo, [everforest](https://github.com/sainnhe/everforest)) e
usar ele por pelo menos 1 ou 3 meses, já que a dor de cabeça de sair ajustando as
cores de todos os programas que eu uso era grande demais para que eu fizesse isso
com mais frequência.

Porém, como dito no meu post anterior:

> […] eu também consigo integrar a paleta de cor do tema que eu estou usando no
> Emacs e aplicar ela no CSS do site!

Isso se dá graças ao fato de que o Emacs consegue "descrever" as cores dos
componentes do buffer, como cor, tipo de fonte, transparência e etc. Ou seja,
basta você pedir ao Emacs que ele dê a cor do background dele e ele vai te dar
uma string com a cor!

```elisp
(face-attribute 'default :background)
```

Levando isso em consideração, eu pensei o seguinte: se eu consigo fazer essa
integração com o meu site, então eu consigo fazer isso com as configurações do
meu setup!

E então, depois de umas duas horas +/-, eu fiz um script em Elisp que gera
esses arquivos de configuração para mim e deixei ele pronto para executar
sempre que o Emacs é aberto.

A forma como ele funciona é bem simples: eu defini algumas variáveis contendo
as cores que vou utilizar nas configurações (por exemplo, `red`) e escrevo o
seguinte para criar os arquivos de configuração:

```elisp
(generate-config "~/.config/rofi/themes/colors.rasi"
		 "* {\n"
		 "  col1: "	background	";\n"
		 "  col2: "	grey            ";\n"
		 "  col3: "	foreground      ";\n"
		 "  col4: "	accent		";\n"
		 "  col5: "	blue		";\n"
		 "}")
```

`generate-config` é na realidade um `Macro` de uma função que fiz chamada `new-buffer`.

A definição dessa função é a seguinte:

```elisp
(defun new-buffer (name &optional content filepath)
  (if (not (stringp name))
      (error "`%s' is not a string." name)
    (switch-to-buffer name)
    (erase-buffer)
    (if content (insert content))
    (if (not filepath)
	(warn "No `filepath' provided. Showing buffer instead.")
      (write-file filepath)
      (kill-current-buffer)
      (message "`%s' was written" filepath))))
```

Sim, eu sei, esse treco tá feio que dói. Maaass, funciona. Essa função funciona
como um "Helper" para criar buffers com um conteúdo pre-definido e salvar esse
buffer para o arquivo especificado em `filepath`.

A definição do `Macro` é bem simples:

```elisp
(defmacro generate-config (buffer-name &rest lines)
  `(new-buffer ,buffer-name (concat ,@lines) ,buffer-name))
```

Basicamente, para usar ele você dá uma string contendo o caminho para o arquivo
que será escrito (ex: `~/.config/rofi/themes/colors.rasi`) e em seguida,
qualquer número de strings desejadas para serem colocadas no arquivo. Isso
permite que você use strings contidas em variáveis, como uma cor em hexadecimal
por exemplo.

Dá para usar ele para criar/escrever qualquer arquivo de texto, não só
configurações, mas por conta do objetivo do "script", o nome dele ficou assim.

Ele tem uma única dependência: [base16-emacs](https://github.com/tinted-theming/base16-emacs).

Esse pacote é dá uma porrada de temas do framework "[base16](https://github.com/chriskempson/base16)".
E uma coisa que faz parte das guidelines desse framework é que as cores ansi também são
modificadas. Dessa forma fica fácil extrair a cor vemelha por exemplo, porque
eu não preciso procurar ela dentro da lista de cores do Emacs, eu só preciso do
atributo `ansi-color-red`.

Por enquanto, esse script que fiz só funciona perfeitamente com esse pacote.

Com o tempo vou adicionar mais "templates" a esse script e também vou deixar
ele mais robusto, mas por enquanto ele está praticamente perfeito (eu uso
pouquíssimos programas de interface gráfica no meu setup, então só de
configurar o meu terminal 90% das coisas que uso ficam tematizadas).
