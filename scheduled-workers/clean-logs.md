---
description: Worker Guide
---

# clean-logs

## Purpose

* Delete tracking logs of successful submissions, older than 1 day, from the database.
* Delete tracking logs of hanging submissions, older than 1 day, from the database and their corresponding images from Cloudflare Images.
* Delete tracking logs of unsuccessful submissions, older than 30 days, from the database.

## Default Frequency

Once, Every day, at 3:30am UTC.

## Environment Variables

The following environment variables are required:

<table><thead><tr><th width="217">Variable</th><th width="294">Description</th><th>Purpose</th></tr></thead><tbody><tr><td><pre class="language-properties"><code class="lang-properties">REALM_ID
</code></pre></td><td>Realm App ID</td><td>Auth</td></tr><tr><td><pre class="language-properties"><code class="lang-properties">REALM_KEY
</code></pre></td><td>Realm API Key</td><td>Auth</td></tr><tr><td><pre class="language-properties"><code class="lang-properties">REALM_DB
</code></pre></td><td>Name of the MongoDB database to be accessed.</td><td>Identification</td></tr><tr><td><pre class="language-properties"><code class="lang-properties">CLOUDFLARE_TOKEN
</code></pre></td><td>API key to access Cloudflare Images</td><td>Auth</td></tr><tr><td><pre class="language-properties"><code class="lang-properties">CLOUDFLARE_ID
</code></pre></td><td>Cloudflare Account ID</td><td>Auth</td></tr></tbody></table>

## Additional Prerequisites

Since, UDP connections are not possible from Cloudflare workers, we need to communicate with our database through HTTP requests (TCP). Setting up a Realm app instance (on MongoDB Atlas), linked to our `pending submissions` collection would be required to make this happen.

This guide details this process:

* [Setting up a Realm App](https://www.mongodb.com/developer/products/atlas/cloudflare-worker-rest-api/#check-out-the-rest-api-code)

## See also

* [Running workers locally and deploying to Cloudflare.](./)
* [Finding your Cloudflare Account ID and API token](https://developers.cloudflare.com/images/cloudflare-images/api-request).
