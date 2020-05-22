# Secret Family Recipes Front-End

## Proposal

* What problem does your app solve?
    * Losing recipes
    * Keeping "secret family recipes" a secret
* Be as specific as possible; how does your app solve the problem?
    * Allows users to store recipes securely in a digital format so they can access them from any device and choose with whom they share them.
* What is the mission statement?
    * Keep your family recipes in the family, but keep them always at hand.

## Features

* What features are required for your minimum viable product?
    * [ ] New user creation
    * [ ] save recipes
    * [ ] search own recipes by tag or title
    * [ ] view, edit, and delete own recipes
    * [ ] viewable on different devices
* What features may you wish to put in a future release?
    * upload photo of finished dish
* What do the top 3 similar apps do for their users?
    * Save favorite recipes into virtual binder
    * Put recipes in manually or import from Internet
    * Hands-free so you can cook at the same time
    * Search by meal type and ingredient
    * Add ingredients to shopping list from recipe
    * Meal planner - schedule meals for certain days

## Frameworks - Libraries

* What 3rd party frameworks/libraries are you considering using?
    * React
    * React Router
    * Redux
    * Axios
    * Reactstrap
    * Styled components
* Do the APIs you need require you to contact them to gain access?
    * We are not planning to use external APIs
* Are you required to pay to use said API(s)?
    * N/A

## Target Audience

* Who is your target audience? Be specific.
    * People who cook at home, primarily from 20+.
    * People who value their family's recipes and want to keep them rather than getting recipes off the internet or out of cookbooks.
* What feedback have you gotten from potential users?
* Have you validated this problem and your solution with a target audience? Describe how,

## Prototype Key Feature(s)

* How long do you think it will take to implement these features?
    * 8 days
* Do you anticipate working on stretch functionality after completion of a Minimal Viable Product?
    * We will consider the options for stretch at the beginning of the second week.

## Recipe Object

```
recipe: {
  id: number,
	title: string,
	source: string,
	ingredients: Array<string>,
	steps: Array<string>,
	tags: Array<string>
}
```
