---
description: Quick Start Guide
---

# 🔄 Backend API

## Jump to

* [Basic Configuration](backend-api.md#basic-configuration)
* [Environment Variables](backend-api.md#environment-variables)
* [Additional Prerequisites](backend-api.md#additional-prerequisites)
* [Running Locally](backend-api.md#running-locally)
* [Deployment](backend-api.md#deployment)

## Basic Configuration

| Property               | Value         | Addl. Details                                        |
| ---------------------- | ------------- | ---------------------------------------------------- |
| Runtime                | Node.js       | `Version 20`                                         |
| Build Command          | None          |                                                      |
| Build output directory | None          |                                                      |
| Install Command        | `npm install` |                                                      |
| Start Command          | `node app`    | Default Host is `127.0.0.1`, Default Port is `8080`  |
| Root directory         | `/backend`    |                                                      |
| Entrypoint             | `./app.js`    |                                                      |

## Environment Variables

<table><thead><tr><th width="216">Variable</th><th>Description</th><th>Purpose</th></tr></thead><tbody><tr><td><pre class="language-properties"><code class="lang-properties">MONGODB_SRV
</code></pre></td><td>API Key to communicate with MongoDB Atlas Instance.</td><td>Auth</td></tr><tr><td><pre class="language-properties"><code class="lang-properties">CLERK_API_KEY
</code></pre></td><td>API Key to authenticate and communicate with Clerk.</td><td>Auth, Session Management</td></tr><tr><td><pre class="language-properties"><code class="lang-properties">OPENAI_KEY
</code></pre></td><td>API Key to authenticate with OpenAI Models.</td><td>Auth</td></tr><tr><td><pre class="language-properties"><code class="lang-properties">CLOUDFLARE_ID
</code></pre></td><td>Cloudflare Account ID</td><td>Auth</td></tr><tr><td><pre class="language-properties"><code class="lang-properties">CLOUDFLARE_TOKEN
</code></pre></td><td>API key to access Cloudflare Images</td><td>Auth</td></tr><tr><td><pre class="language-properties" data-overflow="wrap"><code class="lang-properties">ADDRECIPE_SPAM_PROMPT
</code></pre></td><td>Assess spam score of a submission using AI.</td><td>Prompt (See Note ↓)</td></tr><tr><td><pre class="language-properties" data-overflow="wrap"><code class="lang-properties">ADDRECIPE_METADATA_PROMPT
</code></pre></td><td>Generate metadata for a submission using AI.</td><td>Prompt (See Note ↓)</td></tr><tr><td><pre class="language-properties" data-overflow="wrap"><code class="lang-properties">ADDRECIPE_INGREDIENTS_PROMPT
</code></pre></td><td>Generate ingredient list, classify ingredients and bind steps to ingredients for a submission using AI.</td><td>Prompt (See Note ↓)</td></tr><tr><td><pre class="language-properties" data-overflow="wrap"><code class="lang-properties">ADDRECIPE_INSIGHTS_ONLY_PROMPT
</code></pre></td><td>Generate health and allergy insights for a submission using AI.</td><td>Prompt (See Note ↓)</td></tr><tr><td><pre data-overflow="wrap"><code>HOST
</code></pre></td><td>Host for binding the runtime process, <code>127.0.0.1</code> if unspecified.</td><td>Config</td></tr><tr><td><pre><code>PORT
</code></pre></td><td>Port for binding the runtime process, <code>8080</code> if unspecified.</td><td>Config</td></tr></tbody></table>

{% hint style="info" %}
**Note:** Prompts Injections are an area of growing concern and research. As there is currently no concrete way to prevent prompt injections apart from fortifications within the prompt itself, the prompts have been supplied as environment variables considering that the codebase is public. [Get in touch](mailto:email@dhruv.tech) for access to prompts.
{% endhint %}

## Additional Prerequisites

Setting up the Backend API requires an instance of MongoDB Atlas, Clerk, Cloudflare Images and an API key for the OpenAI Platform.

### Setting up a MongoDB Atlas instance

The project uses MongoDB as its datastore, with certain query features that are only available through the MongoDB Atlas platform.

[This tutorial](https://www.mongodb.com/basics/create-database) provides guidance on setting up a database on MongoDB Atlas. You do not need to create collections once your database is setup. The project will automatically create required collections in the empty database as the need arises.

Using any other instance of MongoDB will break the search feature and the [scheduled workers](scheduled-workers/) used for [cleaning submission tracking logs](scheduled-workers/clean-logs.md).

### Setting up a Clerk instance

[**Clerk** ](https://clerk.com)is used as the OAuth authentication provider for the project.

Thus, setting up a Clerk account and obtaining an API key is a mandatory requirement for running the application.

[This tutorial](https://clerk.com/docs/quickstarts/setup-clerk) provides a detailed walkthrough of setting up an account and obtaining a Clerk Secret Key.

### Configuring Cloudflare Images

The API is designed to use Cloudflare Images as the CDN for image delivery. Documentation for Cloudflare Images is available [here](https://developers.cloudflare.com/images/cloudflare-images/).&#x20;

Once your account is setup and you've obtained your `Cloudflare Account ID` and `API key`. You'll need to [configure](https://developers.cloudflare.com/images/cloudflare-images/transform/resize-images/) the following image variants in your dashboard:

| Property         | Value        |
| ---------------- | ------------ |
| **Variant Name** | **ncHeader** |
| Width            | 1366         |
| Height           | 768          |
| Fit              | Cover        |
| Metadata         | Strip All    |
| Make Public      | Yes          |
| Blur             | 0            |

| Property         | Value           |
| ---------------- | --------------- |
| **Variant Name** | **ncThumbnail** |
| Width            | 405             |
| Height           | 300             |
| Fit              | Cover           |
| Metadata         | Strip All       |
| Make Public      | Yes             |
| Blur             | 0               |

### Getting an OpenAI Platform Key

All AI features in the application have been built on top of the OpenAI SDK and require an `API Key` to access models hosted by OpenAI. You can obtain an API key by following this [guide](https://www.howtogeek.com/885918/how-to-get-an-openai-api-key/).

## Running Locally

Running this application requires `Node.js version 20+`.&#x20;

To run the application, `cd` into the `/backend` folder and add a .env file with all the requisite environment variables - you do not need to specify the `HOST` and `PORT` variables to run the app locally.

Install dependencies, by running:

```bash
npm install
```

Run the app, using the following command:

```bash
node app
```

Please ensure that port `8080` is available and that you are not connected to a VPN before you run the app.&#x20;

## Deployment

The application can be deployed by specifying its [basic configuration details](backend-api.md#basic-configuration) and setting up [environment variables ](backend-api.md#environment-variables)on many modern app hosting services such as DigitalOcean App Platform and Railway.

You may refer to these guides, for such services:

* [Deploy Node.js app on DigitalOcean App Platform](https://www.youtube.com/watch?v=4hdDDPLvpnQ).
* [Deploy Node.js app on Railway](https://alphasec.io/how-to-deploy-a-nodejs-app-on-railway/).

If you wish to manually deploy this application on a server, please follow these guides:

* [Deploy Node.js app on a Linux server (Debian-based)](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04).
* [Deploy Node.js app on a Windows server.](https://dev.to/massivebrains/deploying-node-express-app-on-a-windows-server-2l5c)

## See also

[api-reference](reference/api-reference/ "mention")
