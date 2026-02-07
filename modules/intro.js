"use strict";

import {
  tag
} from "./common.js";

export function intro() {
  tag("section", {"id":"intro"},
    tag("div", {"class":"intro"},
      tag("div", {"class":"cube"},
        tag("div", {"class":"face face--front"}, tag("a", {"href":"/#home"}, tag("img", {"src":"/assets/fav.png"}))),
        tag("div", {"class":"face face--right"}),
        tag("div", {"class":"face face--back"}),
      ),
      tag("h1", {}, "Caderno do Tukain")
    )
  );
}
export default intro;
