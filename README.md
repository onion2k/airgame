# airgame

A PWA air hockey game. Uses vanilla JS multitouch event handling to control the bats, matter-js for physics, and (eventually) a GLSL renderer for graphics.

# multitouch

Up to two players on one phone at the moment using multitouch (the location of the touch determines the player). Might experiment with multi device playfields too.

# Physics

Physics is a very simple matter-js world. In theory this could be achieved using GLSL. One day...

# Rendering

Currently using the default matter-js renderer but that'll be replaced with a TWGL + GLSL renderer once the game is actually working.

# Roadmap

* Full screen mode
* Wait for two players before interactive
* Scores
* Online play