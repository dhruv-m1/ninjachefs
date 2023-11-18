# 🖥 Frontend

## Jump to

* [Getting Started](readme.md#getting-started)
* [Prerequisites](readme.md#prerequisites)
* [Deployment](readme.md#deployment)

## Getting Started

Running the frontend locally requires the installation of [Node.js (Version 10+)](https://nodejs.org/en/download/).

To run the project, [fulfill all prerequisites](readme.md#prerequisites) and `cd` into the `/frontend` folder.

Create a [`.env` file](https://stackoverflow.com/questions/49579028/adding-an-env-file-to-a-react-project), at root-level, containing the requisite environment variables mentioned [above](readme.md#environment-variables).

Subsequently, install dependencies by running:

```bash
npm install
```

The frontend can be started locally using:

```bash
npm start
```

## Prerequisites
You'll need to setup a clerk instance and setup environment variables  to run the app.

For up-to-date information on environment variables and setting up a clerk instance, please see the [documentation](https://dhruv-tech.gitbook.io/ninjachefs/frontend#prerequisites).

## Deployment

Use any static site hosting service like Vercel, Cloudflare Pages or DigitalOcean App Platform to deploy the app by specifying the [basic configuration](readme.md#basic-configuration) details below and setting up [environment variables](readme.md#environment-variables).&#x20;

The guides below detail this process:

* [Vercel](https://vercel.com/guides/deploying-react-with-vercel)
* [Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/)
* [DigitialOcean](https://www.digitalocean.com/community/tutorials/how-to-deploy-a-react-application-to-digitalocean-app-platform)&#x20;

### Configuration Details

| Property               | Value           | Addl. Details       |
| ---------------------- | --------------- | ------------------- |
| Framework              | `React`         | `Version 18.1.0`    |
| Build Command          | `npm run build` | `Node Version >=10` |
| Build output directory | `/build`        |                     |
| Root directory         | `/frontend`     |                     |
