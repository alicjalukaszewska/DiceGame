# DiceGame

**[LIVE PREVIEW](https://alicjalukaszewska.github.io/DiceGame/)** 

Browser game that imitates commonly known dice game. Player decides if second roll of dice will be greater or lower than the first one. If he or she bets correctly, he or she gets a point, otherwise point goes to opponent. The game ends after five rounds.
Application is in Polish.

## Technology:

Application is written in Vanilla JS without any plugins and frameworks. 

CSS for it is made by SCSS, compiled by Gulp with plugin Gulp-Sass. 

## How it works:

Application waits for the user to type his or her name and click button. If user doesn’t put any name, clicking button will show alert and prevent game from running.

#### Round: 
The application firstly draws first player. Then rolls first set of dice.

If the current player is the user, he or she can decide if the next roll will be greater or lower than the current one. 
If the current player is computer, it decides based on maximum potential value (which is 18) minus minimum potential value (3) divided by two, which equals to 7.5. If summed value of the first roll is greater than 7.5, computer guesses that next value is lower. Else vice versa. 

The application rolls dice for the second time and decides which player should get a point. If the current player guessed correctly, he or she gets a point, otherwise point goes to the opponent. 

Application shows result of the round and adds point to the winner. 

Clicking button of the next round, reset all draw values, add one to round count and repeat round until round count gets to 5. 

When the fifth round ends, application show winner of the game and button to repeat game. 

Clicking the repeat game button resets all values, including points of players and round count, and restarts all initial values. 

---
### Potential future features:
* Option to change language to English
* Option to play with other player
* Statistics to show how many times player has won
