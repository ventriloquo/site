---
title: Jogos
---
<style>
img {
    width: 180px;
    max-height: 280px;
    object-fit: cover;
    display: inline-block;
    margin: 2px;
    padding: 2px;
}

p {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

noscript {
    display: block;
    position: initial;
    width: 100%;
    height: 4em;
    background-color: var(--red);
    color: var(--bg);
    text-align: center;
}

.no_flex {
    display: initial
}

@media only screen and (max-width: 720px) {
    img {
        margin: auto;
        display: block;
    }
}
</style>

# Minha biblioteca de jogos do Nintendo Switch.

<p class="no_flex">
<noscript>Não foi possível calcular quantos meses se passaram desde a compra do
meu switch. Motivo: o JavaScript está desabilitado em seu navegador</noscript>
Eu tenho um Nintendo Switch Lite a <span id="meses"></span> meses. Nesses meses eu já montei uma
biblioteca até que bem grandinha, definitivamente maior que a minha antiga
biblioteca do saudoso Xbox 360 (que saudades 🥲).</p>

<script>
// Antes que você julgue essa aberração, saiba de uma coisa:
// Isso aqui é fruto de uma burrice natural, não de uma inteligência
// artificial.
let date         = new Date
let current_date = `${(date.getMonth() + 1)}${date.getFullYear()}`
let buy_date     = 22025
let final_date   = (current_date - buy_date)/10000
document.getElementById("meses").innerText = ` ${final_date}`
</script>

## Mídia física
![](/assets/img/games/sonic_mania.jpeg)

## Mídia digital
![](/assets/img/games/mgs3.jpeg)
![](/assets/img/games/re4.jpeg)
![](/assets/img/games/dmc3.jpeg)
![](/assets/img/games/burnout_paradise.jpeg)
![](/assets/img/games/undertale.jpeg)
![](/assets/img/games/portal_1.jpeg)
![](/assets/img/games/portal_2.jpeg)
![](/assets/img/games/doom_1_2.jpeg)
![](/assets/img/games/quake_1.jpeg)
![](/assets/img/games/quake_2.jpeg)
![](/assets/img/games/rain_world.jpeg)
![](/assets/img/games/blasphemous.jpeg)
![](/assets/img/games/dragon_ball_fighterz.jpeg)
![](/assets/img/games/superhot.jpeg)
![](/assets/img/games/dead_cells.jpeg)
![](/assets/img/games/broforce.jpeg)
![](/assets/img/games/hades.jpeg)
![](/assets/img/games/bioshock_1.jpeg)
![](/assets/img/games/bioshock_2.jpeg)
![](/assets/img/games/bioshock_infinite.jpeg)
![](/assets/img/games/super_chicken_jumper.jpeg)
![](/assets/img/games/brawhalla.jpeg)
![](/assets/img/games/rocket_league.jpeg)
![](/assets/img/games/alan_wake.jpeg)

