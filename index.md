---
layout: base
---
<style>
.intro {
  display: block;
  margin: auto;
  position: relative;
  padding-top: 1em;
  justify-items: center;

  h1 {
    opacity: 0;
    transition: all 1s;
    position: absolute;
    bottom: -150%;
  }

  &:has(.cube:hover) {
    h1 {
      opacity: 1;
    }
  }

  /* https://triangulo.dev/posts/atomo-como-criar-cubo-css/ */
  .cube {
    width: 200px;
    height: 200px;
    position: relative;
    align-content: center;
  
    transform-style: preserve-3d;
  
    .face {
      transition: all 1s;
      background: rgba(var(--ac), 1);
      display: flex;
      align-items: center;
      justify-content: center;
  
      font-size: 50px;
      font-weight: bold;
      color: #234e52;
  
      width: 200px;
      height: 200px;
      position: absolute;
  
      a:hover  {
        background-color: transparent;
      }
    }
  
    .face--front {
      transform: rotateX(-20deg) rotateY(-20deg) translateZ(100px);
      background-image: url("/assets/fav.png");
      background-position: center;
    }
  
    .face--right {
      transform: rotateX(-20deg) rotateY(70deg) translateZ(100px);
    }
  
    .face--back {
      transform: rotateX(70deg) rotateY(0deg) rotateZ(20deg) translateZ(100px);
    }
  
    &:hover {
      .face {
        background-color: rgba(var(--ac), 1);
      }
  
      .face--front {
        transform: rotateX(0deg) rotateY(0deg) translateZ(200px);
      }
  
      .face--right {
        transform: rotateX(0deg) rotateY(0deg) rotateZ(45deg) translateY(0px) translateX(-70px) translateZ(100px);
        width: 300px;
        height: 300px;
      }
  
      .face--back {
        transform: rotateX(0deg) rotateY(0deg) translateY(-50px) translateX(-50px) translateZ(0px);
        background-color: rgba(var(--link), 1);
        width: 300px;
        height: 300px;
      }
    }
  }
}

@media only screen and (prefers-color-scheme: dark) {
  .intro {
    .cube {
      .face {
        background-color: gray;
      }
      .face--front {
        filter: grayscale(1);
      }
      &:hover {
        .face--front {
          filter: grayscale(0);
        }
      }
    }
  }
}

@media only screen and (prefers-color-scheme: light) {
  .intro {
    .cube {
      .face {
        background-color: #B09C7A;
      }
      .face--front {
        filter: sepia(1);
      }
      &:hover {
        .face--front {
          filter: sepia(0);
        }
      }
    }
  }
}

@keyframes fade-in {
  from {opactity: 0}
  to   {opactity: 1}
}
</style>

<div class="intro">
    <div class="cube">
        <div class="face face--front">
            <a href="/home">
                <div style="width: 200px; height: 200px;"></div>
            </a>
        </div>
        <div class="face face--right"></div>
        <div class="face face--back"></div>
    </div>
    <h1>Bem-vindo!</h1>
</div>
