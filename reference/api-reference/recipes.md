---
description: Route Guide
---

# Recipes

## Getting Recipes

{% swagger method="get" path="/v1/recipes/:skip/:limit" baseUrl="domain.api" summary="Get all recipes in a paginated manner" %}
{% swagger-description %}
Provides an array of JSON Objects
{% endswagger-description %}

{% swagger-parameter in="path" name=":skip" type="Integer" required="true" %}
Number of records to skip from the beginning of the list of recipes.
{% endswagger-parameter %}

{% swagger-parameter in="path" name=":limit" type="Integer" required="true" %}
Number of records, after the skipped records, to return from the list of recipes.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="List of recipes" %}
```json
{
  "code": 200,
  "data": [...]
}
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Internal Error" %}
```json
{ 
    "code": 500, 
    "msg": "Could not retrive data from data store"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/v1/recipes/:id" baseUrl="domain.api" summary="Get a recipe by ID" %}
{% swagger-description %}
Provides a JSON Object
{% endswagger-description %}

{% swagger-parameter in="path" name=":id" type="String" required="true" %}
ID of the recipe
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="JSON Recipe Object" %}
```json
{
    "_id": "...",
    "name": "...",
    "author": "...",
    "cooking_time": 0,
    "diet": "...",
    "img_url": "...",
    "ingredients": [
        {
            "name": "...",
            "steps": [1, 2],
            "category": "other | veggies | meat | dairy"
        },
        ...
    ],
    "steps": [
        "...",
        "...",
        "..."
    ],
    "allergies": [
        "...",
        "..."
    ],
    "intro": "...",
    "desc": "...",
    "health_score": 5,
    "health_reason": "...",
    "userId": "..."
}
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Recipe does not exist" %}
```json
{ 
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Internal Error" %}

{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/v1/recipes/:skip/:limit" baseUrl="domain.api" summary="Get all recipes published by the authenticated user" %}
{% swagger-description %}
Provides an array of JSON Objects
{% endswagger-description %}

{% swagger-parameter in="path" name=":skip" type="Integer" required="true" %}
Number of records to skip from the beginning of the list of recipes.
{% endswagger-parameter %}

{% swagger-parameter in="path" name=":limit" type="Integer" required="true" %}
Number of records, after the skipped records, to return from the list of recipes.
{% endswagger-parameter %}

{% swagger-parameter in="header" name="Authorization" type="Bearer Token" required="true" %}
Bearer Token supplied by Clerk after user has authenticated.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="List of recipes" %}
```json
{
  "code": 200,
  "data": [...]
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="Not Authenticated" %}

{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Internal Error" %}
```json
{ 
    "code": 500, 
    "msg": "Could not retrive data from data store"
}
```
{% endswagger-response %}
{% endswagger %}

## Publishing Recipes

{% swagger method="post" path="/v1/recipes" baseUrl="domain.api" summary="Publish recipe content." %}
{% swagger-description %}
Requires JSON Body

Returns JSON Object
{% endswagger-description %}

{% swagger-parameter in="body" name="name" type="String" required="true" %}
Name/title of the recipe.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="cookingTime" type="Number" required="true" %}
Time (mins) required to make this recipe.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="steps" type="String Array" required="true" %}
Array of steps to make the recipe.
{% endswagger-parameter %}

{% swagger-parameter in="header" name="Authorization" type="Bearer Token" required="true" %}
Bearer Token supplied by Clerk after user has authenticated.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="submission_id" type="String" %}
Existing submission ID, assigned during an image upload.&#x20;



The submission will be continued on the same ID and the uploaded image will be attached to the recipe, if the recipe submission is accepted. AI will not generate an image.
{% endswagger-parameter %}

{% swagger-parameter in="header" name="Content-Type" type="application/json" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Processed as Spam Submission" %}
```json
{
  "code": 200,
  "spam": true,
  "msg": "[Reason for spam categorisation]"
}
```
{% endswagger-response %}

{% swagger-response status="201: Created" description="Submission Accepted" %}
```json
{
  "code": 201,
  "spam": false,
  "submission_id": "..."
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="Not Authenticated" %}

{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Internal Error" %}
```json
{ 
    "code": 500, 
    "msg": "Could not retrive data from data store"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/v1/recipes/images/upload" baseUrl="domain.api" summary="Initialise a recipe submission with an image upload" %}
{% swagger-description %}
Returns a JSON Object
{% endswagger-description %}

{% swagger-parameter in="body" name="image" type="Binary" required="true" %}
Image File
{% endswagger-parameter %}

{% swagger-parameter in="header" name="Authorization" type="Bearer Token" required="true" %}
Bearer Token supplied by Clerk after user has authenticated.
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="Uploaded and Awaiting Recipe Submission" %}
```json
{
    "code": 201
    "submission_id": "..."
}
```
{% endswagger-response %}

{% swagger-response status="406: Not Acceptable" description="Not an Image or File larger than 10MB" %}
```json
{ 
    "code": 404,
    "msg": "Could not delete item, please try again later."
}
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Internal Error" %}

{% endswagger-response %}
{% endswagger %}

## Deleting Recipes

{% swagger method="delete" path="/v1/recipes/:id" baseUrl="domain.api" summary="Delete a recipe by ID" %}
{% swagger-description %}
Provides a JSON Object
{% endswagger-description %}

{% swagger-parameter in="path" name=":id" type="String" required="true" %}
ID of the recipe
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Deleted" %}
```json
{
    "code": 200
    "msg": "Deleted item with _id ..."
}
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="Recipe does not exist" %}
```json
{ 
    "code": 404,
    "msg": "Could not delete item, please try again later."
}
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Internal Error" %}

{% endswagger-response %}
{% endswagger %}

## Editing Recipes

{% swagger method="put" path="/v1/recipes" baseUrl="domain.api" summary="Modify recipe content." %}
{% swagger-description %}
Returns JSON Object if successful
{% endswagger-description %}

{% swagger-parameter in="body" name="name" type="String" required="true" %}
Name/title of the recipe.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="cookingTime" type="Number" required="true" %}
Time (mins) required to make this recipe.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="steps" type="String Array" required="true" %}
Array of steps to make the recipe.
{% endswagger-parameter %}

{% swagger-parameter in="header" name="Authorization" type="Bearer Token" required="true" %}
Bearer Token supplied by Clerk after user has authenticated.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="intro" type="String" required="true" %}
Introduction of the recipe.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="desc" type="String" required="true" %}
Description of the recipe.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="ingredients" type="Object Array" required="true" %}
Array of objects describing ingredients used (identical to the ingredient array in Recipe Object)
{% endswagger-parameter %}

{% swagger-parameter in="header" name="Content-Type" type="application/json" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Processed as Spam Submission" %}
```json
{
  "code": 200,
  "spam": true,
  "msg": "[Reason for spam categorisation]"
}
```
{% endswagger-response %}

{% swagger-response status="201: Created" description="Submission Processed" %}
```json
{
  "code": 201,
  "spam": false
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="Not Authenticated" %}

{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Internal Error" %}
```json
{ 
    "code": 500, 
    "msg": "Could not retrive data from data store"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="put" path="/v1/recipes/images/upload" baseUrl="domain.api" summary="Upload and replace image on an existing recipe" %}
{% swagger-description %}
Returns a JSON Object
{% endswagger-description %}

{% swagger-parameter in="body" name="image" type="Binary" required="true" %}
Image File
{% endswagger-parameter %}

{% swagger-parameter in="header" name="Authorization" type="Bearer Token" required="true" %}
Bearer Token supplied by Clerk after user has authenticated.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Uploaded and Replaced" %}
```json
{
    "code": 200
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="Not logged in or this recipe does not belong to user." %}

{% endswagger-response %}

{% swagger-response status="406: Not Acceptable" description="Not an Image or File larger than 10MB" %}
```json
{ 
    "code": 404,
    "msg": "Could not delete item, please try again later."
}
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="Internal Error" %}

{% endswagger-response %}
{% endswagger %}

