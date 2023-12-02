# NinjaChefs + AI

*Web application that leverages generative AI to simplify online recipe sharing.*

📑 For **technical documentation**, please see this [GitBook](https://dhruv-tech.gitbook.io/ninjachefs).

## Try it out

🌐 See a **live demo** [here](https://go.dhruv.tech/p/ninjachefs).

🍽️ **Sample recipes** for testing the demo can be found [here](https://github.com/dhruv-tech/ninjachefs/wiki).

<img src="https://github.com/dhruv-tech/ninjachefs/assets/26849655/5b1c885d-72ca-416d-988c-07f68267540f" alt="screenshot of ninjachefs homepage" height="375">

## Introduction

Sharing recipes online is tedious, and often involves a lot more than just writing the recipe - such as preparing a detailed ingredient list, writing an introduction, taking an appetising picture and a lot more.

NinjaChefs + AI, attempts to eliminate this 'barrier to entry' from online recipe sharing and make it accessible by helping the user focus on just the recipe.

## Tech Stack

* React (as the frontend framework)
* Tailwind (for styling the frontend)
* Node.js with Express (for building the backend API)
* MongoDB (as the datastore)
* CloudFlare Images (as the CDN for serving images)
* Clerk (for Authentication)
* OpenAI Platform SDK (for building Generative AI features)
* Cloudflare Workers (for building scheduled workers)

## Compatibility

The web application is compatible with the latest versions of:

* Chromium-based browsers Desktop/Mobile (ver. 114+) (Tested on Microsoft Edge & Google Chrome)
* Mozilla Firefox Desktop/Mobile (ver. 115+)

## List of Features

### Find recipes

* Publicly view shared recipes.
* Search recipes by name, author or diet.
* Pagination wherever a list/grid of recipes is displayed.

### Share recipes

* Add recipes with AI Assistance
  * AI will do the following:
    * Write the introduction and description of the recipe (GPT 3.5)
    * Identify and sort ingredients used in the recipe to build a categorised ingredient list, and associate ingredents with steps in which they are used. (GPT 3.5)
    * Identify whether the recipe is non-vegetarian, vegetarian or vegan.
    * Visualise and generate a cover image for the recipe if none is uploaded (GPT 3.5 & DALL-E 2)
      
 * Asynchronous processing of recipe submissions with polling-based status updates.

### Manage your recipes

* Authenticate with 3rd party OAuth providers or a local username and password.
* View recipes shared by you. 
* Delete your recipes.
* Manually edit your recipes to correct typos or mistakes in AI generated elements.

### Community Safety

* AI-powered spam filteration.
* AI-powered insights on common food allergens in recipes.
* AI-powered insights on the health implications of recipes.
  

