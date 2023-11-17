---
description: Quick Start Guide
---

# 🖥 Frontend

## Jump to

* [Basic Configuration](frontend.md#basic-configuration)
* [Environment Variables](frontend.md#environment-variables)
* [Additional Prerequisites](frontend.md#additional-prerequisites)
* [Running Locally](frontend.md#running-locally)
* [Deployment](frontend.md#deployment)

## Basic Configuration

| Property               | Value           | Addl. Details       |
| ---------------------- | --------------- | ------------------- |
| Framework              | `React`         | `Version 18.1.0`    |
| Build Command          | `npm run build` | `Node Version >=10` |
| Build output directory | `/build`        |                     |
| Root directory         | `/frontend`     |                     |

## Environment Variables

<table><thead><tr><th width="216">Variable</th><th>Description</th><th>Purpose</th></tr></thead><tbody><tr><td><pre class="language-properties" data-overflow="wrap"><code class="lang-properties">REACT_APP_CLERK_PUBLISHABLE_KEY
</code></pre></td><td>API Key to authenticate with Clerk.</td><td>Auth</td></tr><tr><td><pre class="language-properties" data-overflow="wrap"><code class="lang-properties">REACT_APP_BACKEND_URI
</code></pre></td><td>Base URL for backend API</td><td>Identify backend API deployment.</td></tr></tbody></table>

## Additional Prerequisites

### Setting up a Clerk instance

[**Clerk** ](https://clerk.com)is used as the OAuth authentication provider for the project.

Thus, setting up a Clerk account and obtaining a `perishable key` is a mandatory requirement for running the application.

[This tutorial](https://clerk.com/docs/quickstarts/setup-clerk) provides a detailed walkthrough of setting up an account and obtaining a `perishable key`.

## Running Locally

Running the frontend locally requires the installation of [Node.js (Version >= 10)](https://nodejs.org/en/download/).

To run the project, `cd` into the `/frontend` folder and create a [`.env` file](https://stackoverflow.com/questions/49579028/adding-an-env-file-to-a-react-project) at the root-level containing the requisite environment variables mentioned [above](frontend.md#environment-variables).

Subsequently, install dependencies by running:

```bash
npm install
```

The frontend can be started locally using:

```bash
npm start
```

## Deployment

Use any static site hosting service like Vercel, Cloudflare Pages or DigitalOcean App Platform to deploy the app by specifying the [basic configuration](frontend.md#basic-configuration) details specified above and furnishing requisite [environment variables](frontend.md#environment-variables).&#x20;

The guides below detail this process:

* [Vercel](https://vercel.com/guides/deploying-react-with-vercel)
* [Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/)
* [DigitialOcean](https://www.digitalocean.com/community/tutorials/how-to-deploy-a-react-application-to-digitalocean-app-platform)&#x20;
