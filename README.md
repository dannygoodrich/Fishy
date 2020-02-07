Title: Fishy
Live Site:

Wireframes:
[IMG_1045.JPG](IMG_1045.JPG)


Planning: I didnt plan very much. After the Canvas Craler codealong, I had the gist of how my game would work. I had to create a hero("fishy"), and spawn other fishes, of different sizes, that would move from right to left. first I needed to create the game board with canvas. Then I  would need to create all of the elements that would be in the game. These elements would be part of a "game state" that would be running in a "game loop". Then I would need a collision detection function, that either made the fishy bigger or told the user the game was over. I also needed a function for controlling the movement of the player.

MVP: The user will control a crawler who is a fishy. Then using JS the program will render other fish that are moving left. Then I will make a function to detect collisions. If the fishy collides with a smaller fish, the fishy grows and the user gains 1 point. If the fishy collides with a larger fish the game is over. The setting is under water.

Game Play: There is no Winning in Fishy. Only losing or staying alive. Using HTML5 canvas and collison detection, the user either swims into a bigger fish and loses, or swims into a smaller fish and grows. The user controls the fish using the keys 'W'(up), 'A'(left), 'S'(down), and 'D'(right).

Bugs/Obstacles: Spite sheets. I'm only utilizing 4 out of 12 frames with my fish images. Collision detection gets worse with size of fish, because the image is a square, but the fish are not. Rendering fish at different times.

features: bakground color changes throughout using CSS. 2 levels presnt when points(score) equals 11. Idle fish can move from left edge to right edge of game. 


Tech: I want to use basic HTML, CSS, and JS to create my gameboard and game logic. The game board will be made with CSS/HTML canvas. All game elements will be run with functions

Sources: https://w3schools.com
        https://developer.mozilla.org
        https://gamedeveloperstudio.com (fish sprite)
        https://opengameart.org
        sound: İlker Yalçıner (ilkeryalciner.com)



Stretch Goals: 
1-Background changes during game
2-Move fishy diagonally
3-Collide with sick fish and and horizontal movement disabled


