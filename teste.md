---
title: Teste
---
# Teste de colorização de código
{% raw %}
```django
<div class="game_collection">
{% for midia_digital in site.data.games.midia_digital %}
    <div class="game" id="{{ midia_digital.title | slugify }}">
    <a href="#{{ midia_digital.title | slugify }}">
        <img
            alt="{{ midia_digital.title }} cover art"
            width="180"
            height="180"
            loading="lazy"
            src="{{ midia_digital.cover }}">
    </a>
        <hgroup class="game_info">
            <h2>{{ midia_digital.title }}</h2>
            {% if midia_digital.description %}
                <q>{{ midia_digital.description }}</q>
            {% endif %}
            {% if midia_digital.buy_date %}
                <p><span style="color: var(--accent)">Quando foi comprado:</span> {{ midia_digital.buy_date }}</p>
            {% endif %}
            {% if midia_digital.url %}
                <a href="{{ midia_digital.url }}" target="_blank">{{ midia_digital.url }}</a>
            {% endif %}
        </hgroup>
    </div>
{% endfor %}
</div>
```
{% endraw %}
```css
:root {
    --fg:               #e4e4ef;
    --fg-1:             #f4f4ff;
    --fg-2:             #f5f5f5;
    --white:            #ffffff;
    --black:            #000000;
    --bg-1:             #101010;
    --bg:               #181818;
    --bg-1:             #282828;
    --bg-2:             #453d41;
    --bg-3:             #484848;
    --bg-4:             #52494e;
    --red-1:            #c73c3f;
    --red:              #f43841;
    --red-1:            #ff4f58;
    --green:            #73c936;
    --yellow:           #ffdd33;
    --brown:            #cc8c3c;
    --quartz:           #95a99f;
    --niagara-2:        #303540;
    --niagara-1:        #565f73;
    --niagara:          #96a6c8;
    --wisteria:         #9e95c7;
}

::-webkit-scrollbar {
    width:              5px;
    background-color:   var(--bg-1);
}

::-webkit-scrollbar-thumb {
    background-color:   var(--link-hover);
}

::-webkit-scrollbar-thumb:hover {
    background-color:   var(--link);
}

html {
    scroll-padding-top: 4em;
    scroll-behavior:    smooth;
    position:           relative;
    overflow-x:         hidden;
}

body {
    background-color:   var(--bg-0);
    color:              var(--fg-0);
    font-family:        "Sans Serif", system-ui;
    line-height:        1.6;
    position:           relative;
}
```

```javascript
"use strict";

let livros_lidos = 0;
let livros_sendo_lidos = 0;
let paginas_lidas = 0;
let paginas_total = 0;
const livros = document.getElementsByClassName("livro");
const livros_total = livros.length;
const livros_progresso = document.getElementsByTagName("progress");

for (let i = 0; i < livros_progresso.length; i++) {
  const progresso = livros_progresso[i];
  const pagina_maximo = Number(progresso.max);
  const pagina_atual = Number(progresso.value);

  progresso.setAttribute("title", `${pagina_atual} páginas lidas`);
  livros[i].setAttribute("id", `livro_${i}`);

  const restante = document.createElement("p");
  restante.style.fontSize = "small";
  restante.style.fontStyle = "italic";
  restante.style.color = "var(--accent-2)";

  if (pagina_atual === pagina_maximo) {
    livros_lidos++;
  } else {
    restante.innerText = `Faltam ${pagina_maximo - pagina_atual} páginas`;
    livros[i].appendChild(restante);
    livros_sendo_lidos++;
  }

  paginas_lidas = paginas_lidas + pagina_atual;
  paginas_total = paginas_total + pagina_maximo;
}

const status_biblioteca = document.getElementById("status_biblioteca");
status_biblioteca.innerHTML = `
  <table>
    <tbody>
      <tr>
        <td>Total de livros</td>
        <td style="text-align:center">${livros_total}</td>
      </tr>
      <tr>
        <td>Total de livros lidos</td>
        <td style="text-align:center">${livros_lidos}</td>
      </tr>
      <tr>
        <td>Total de livros que estou lendo</td>
        <td style="text-align:center"> ${livros_sendo_lidos}</td>
      </tr>
      <tr>
        <th>Meu progresso</th>
        <th class="livro" style="text-align:center">
          ${paginas_lidas} páginas de ${paginas_total}
          <progress
            value="${paginas_lidas}"
            max="${paginas_total}"
          >
          </progress>
        </th>
      </tr>
    </tbody>
  </table>
`;
```

```rust
use raylib::*;

type game_screen = enum {
	LOGO = 0,
	TITLE,
	GAMEPLAY,
	ENDING,
};

export fn main() int = {
	const screen_width: int = 800;
	const screen_height:int = 450;

	init_window(screen_width, screen_height, "raylib [core] example - basic screen manager");

	let current_screen = game_screen::LOGO;
	let frames_counter: int = 0;

	set_target_fps(60);

	for (!window_should_close()) {

	switch (current_screen) {
		case game_screen::LOGO => frames_counter += 1;
		if (frames_counter > 120) current_screen = game_screen::TITLE;
		case game_screen::TITLE =>
		     if (is_key_pressed(KeyboardKey::KEY_ENTER)
		     || is_gesture_detected(Gestures::GESTURE_TAP)) current_screen = game_screen::GAMEPLAY;
		case game_screen::GAMEPLAY =>
		     if (is_key_pressed(KeyboardKey::KEY_ENTER)
		     || is_gesture_detected(Gestures::GESTURE_TAP)) current_screen = game_screen::ENDING;
		case game_screen::ENDING =>
		     if (is_key_pressed(KeyboardKey::KEY_ENTER)
		     || is_gesture_detected(Gestures::GESTURE_TAP)) current_screen = game_screen::TITLE;
		case => break;
	};

	begin_drawing();
	clear_background(RAYWHITE);

	switch (current_screen) {
		case game_screen::LOGO =>
		     draw_text("LOGO SCREEN", 20, 20, 40, LIGHTGRAY);
		     draw_text("WAIT for 2 SECONDS...", 290, 220, 20, GRAY);
		case game_screen::TITLE =>
		     draw_rectangle(0, 0, screen_width, screen_height, GREEN);
		     draw_text("TITLE SCREEN", 20, 20, 40, DARKGREEN);
		     draw_text("PRESS ENTER or TAP to JUMP to GAMEPLAY SCREEN", 120, 220, 20, DARKGREEN);
		case game_screen::GAMEPLAY =>
		     draw_rectangle(0, 0, screen_width, screen_height, PURPLE);
		     draw_text("GAMEPLAY SCREEN", 20, 20, 40, MAROON);
		     draw_text("PRESS ENTER or TAP to JUMP to ENDING SCREEN", 130, 220, 20, MAROON);
		case game_screen::ENDING =>
		     draw_rectangle(0, 0, screen_width, screen_height, BLUE);
		     draw_text("ENDING SCREEN", 20, 20, 40, DARKBLUE);
		     draw_text("PRESS ENTER or TAP to RETURN to TITLE SCREEN", 120, 220, 20, DARKBLUE);
		case => break;
	};

	end_drawing();

	};

	close_window();

	return 0;
};
```

```elisp
(defun fib (limite &optional tipo)
  (setq a 0
	b 1)
  (while (< a limite)
    (setq c (+ a b)
	  a b
	  b c)
    (cond
     ((equal tipo 'line)
      (insert (format "\n%d" a)))
     (t (insert (format "%d, " a))))))

(fib 10 'line)

(defun fib-recusive (n)
  (if (or (= n 0) (= n 1))
      1
    (+ (fib-recusive (- n 1)) (fib-recusive (- n 2)))))

(fib-recusive 10)
```
