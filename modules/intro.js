"use strict";

import {
  tag
} from "./common.js";

export function intro() {
  tag("section", {"id":"intro"},
    tag("div", {"class":"intro"},
      tag("div", {"class":"cube"},
        tag("div", {"class":"face face--front"}, tag("a", {"href":"/#home"}, tag("div", {"style":"width: 200px; height: 200px;"}))),
        tag("div", {"class":"face face--right"}),
        tag("div", {"class":"face face--back"}),
      ),
      tag("h1", {}, "Bem-vindo!")
    )
  );
}
export default intro;
