# PRD
A JS library for generating pseudo-random distribution.

## What is PRD?
from the [Dota 2 Gamepedia page](https://dota2.gamepedia.com/Random_distribution):
> The uniform or true random distribution describes the probability of random event that underlies no manipulation of the chance depending on earlier outcomes. This means that every "roll" operates independently.

> The pseudo-random distribution (often shortened to PRD) in Dota 2 refers to a statistical mechanic of how certain probability-based items and abilities work. In this implementation the event's chance increases every time it does not occur, but is lower in the first place as compensation. This results in the effects occurring more consistently.

> The probability of an effect to occur (or proc) on the Nth test since the last successful proc is given by P(N) = C × N. For each instance which could trigger the effect but does not, the PRD augments the probability of the effect happening for the next instance by a constant C. This constant, which is also the initial probability, is lower than the listed probability of the effect it is shadowing. Once the effect occurs, the counter is reset. 

TL;DR it keeps random-based occurences from games from being luck-based. PRD increases the chances of occuring whenever the random chance fails to occur. 

## How to use
### Importing
for client-side JS
```html
    <script type="text/javascript" src="/path/to/prd.js"></script>
```

for NodeJS
```js
    const PRD = require("prd").default;
```

for ES6
```js
    import PRD from "prd";
```
### Creating a PRD
The PRD constructor takes a number value, namely "chance", which is in the range of 0 to 1
```js
    let prd = new PRD(0.25);
```

### Generating success
```js
    const success = prd.next();
```
What the PRD can do is that if you call the next() method, it tells whether the next result would be a fail or a success. Once the PRD successes, the PRD progress will reset back to 1, since the succession is based from P(N) = N*C where N is the number of attempts and C is the constant, calculated from the given chance. (see the wikipedia page.)

### Resetting
```js
    prd.reset();
```

