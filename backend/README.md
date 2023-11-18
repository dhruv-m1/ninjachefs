# Backend

Please see the [documentation](https://dhruv-tech.gitbook.io/ninjachefs/backend-api/api-reference) for API reference.

## Jump to

* [Getting Started](README.md#getting-started)
* [Prerequisites](README.md#prerequisites)
* [Deployment](README.md##deployment)

## Getting Started

Running this application requires [Node.js (Version 20+)](https://nodejs.org/en/download/).&#x20;

To run the application, [fulfill all prerequisites](./#prerequisites) and `cd` into the `/backend` folder.&#x20;

Add a [.env file](https://dev.to/dallington256/how-to-use-env-file-in-nodejs-578h) with all the [requisite environment variables](./#prerequisites).

Install dependencies, by running:

```bash
npm install
```

Run the app, using the following command:

```bash
node app
```

Please ensure that port `8080` is available and that you are not connected to a VPN before you run the app.&#x20;

If you need to change the default port, please set the `PORT` environment vairable to your desired port.

## Prerequisites

Setting up the Backend API requires an instance of MongoDB Atlas, Clerk, Cloudflare Images, an API key for the OpenAI Platform.

You'll also need to setup environment variables to point to these instances.

For updated information on environment variables and setting up these instances, please see the [documentation](https://dhruv-tech.gitbook.io/ninjachefs/backend-api#prerequisites).

## Deployment

The application can be simply deployed by specifying its [configuration details](./#configuration-details) and adding [environment variables](./#prerequisites), when you use modern app hosting services such as Railway and DigitalOcean App Platform.

You may refer to these guides, for such services:

* [Deploy Node.js app on DigitalOcean App Platform](https://www.youtube.com/watch?v=4hdDDPLvpnQ).
* [Deploy Node.js app on Railway](https://alphasec.io/how-to-deploy-a-nodejs-app-on-railway/).

If you wish to manually deploy this application on a server, please follow these guides:

* [Deploy Node.js app on a Linux server (Debian-based)](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04).
* [Deploy Node.js app on a Windows server.](https://dev.to/massivebrains/deploying-node-express-app-on-a-windows-server-2l5c)

### Configuration Details

| Property               | Value         | Addl. Details                                                                                |
| ---------------------- | ------------- | -------------------------------------------------------------------------------------------- |
| Runtime                | Node.js       | `Version 20`                                                                                 |
| Build Command          | None          |                                                                                              |
| Build output directory | None          |                                                                                              |
| Install Command        | `npm install` |                                                                                              |
| Start Command          | `node app`    | Default `HOST` is `127.0.0.1`, Default `PORT` is `8080`. Change using environment variables. |
| Root directory         | `/backend`    |                                                                                              |
| Entrypoint             | `./app.js`    |                                                                                              |

