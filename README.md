# NinjaChefs + AI

*Web application that leverages generative AI to simplify online recipe sharing.*

Sharing recipes online is tedious, often involving a lot more than just writing the recipe - such as preparing a detailed ingredient list, writing an introduction, taking an appetising picture and much more. 

NinjaChefs, with AI, attempts to eliminate this 'red tape' from online recipe sharing and faciliate the sharing of recipes by just helping the user focus on 'just the recipe'. 

🌐 See a live demo at: [ninjachefs.dhruv.tech](https://go.dhruv.tech/p/ninjachefs)

🍽️ Sample recipes for testing the demo can be found [here.](https://github.com/dhruv-tech/ninjachefs/wiki)

<img src="https://github.com/dhruv-tech/ninjachefs/assets/26849655/5b1c885d-72ca-416d-988c-07f68267540f" alt="screenshot of ninjachefs homepage" height="375">

## Features

* Publicly view shared recipes.

* Search recipes by name, author or diet (fuzzy).

* Authenticate with 3rd party OAuth providers or a local username and password.

* Pagination wherever a list/grid of recipes is displayed.

* Add recipes with AI Assist
  * AI Assist provides the following fuctionality:
    * Writes the introduction and description of the recipe (GPT 3.5)
    * Identifies and sorts ingredients used in the recipe to build a categorised ingredient list, and associate ingredents with steps in which they are used. (GPT 3.5)
    * Identifies whether the recipe is non-vegetarian, vegetarian or vegan.
    * Provides insights on any common food allergens in the recipe. (GPT 3.5)
    * Provides insights on the health implications of a recipe. (GPT 3.5)
    * Visualises and generates a cover image for the recipe if none is uploaded (GPT 3.5 & DALL-E 2)

* AI-powered spam filteration during a recipe submission.

* Background processing of recipe submissions with polling-based status updates.

* Manage recipes shared by yourself
  * Delete your recipes.
  * Make corrections on certain AI generated elements of your recipes (under development)

## Tech Stack

* React (as the frontend framework)
* Tailwind (for styling the frontend)
* Node.js with Express (for building the backend API)
* MongoDB (as the datastore)
* CloudFlare Images (as the CDN for serving images)
* Clerk (for Authentication)
* OpenAI Platform SDK (for building Generative AI features)

## Compatibility

The web application is compatible with the latest versions of:

* Chromium-based browsers Desktop/Mobile (ver. 114+) (Tested on Microsoft Edge & Google Chrome)
* Mozilla Firefox Desktop/Mobile (ver. 115+)

