# Chuck-NORRIS

Chuck **N**on-**O**perational **R**ecords & **R**elated **I**mage**s** (NORRIS) is a scheduled worker built to delete (chuck) submission tracking records and Images that are no longer needed (non-operational).&#x20;

## Purpose

* Delete tracking records of successful submissions, older than 1 day, from the database.
* Delete tracking records of hanging (incomplete) submissions, older than 1 day, from the database and their corresponding images from Cloudflare Images.
* Delete tracking records of unsuccessful submissions, older than 30 days, from the database.
* Show up here and there in the docs to make you smile!😊

## Default Frequency

Once, Every day, at 3:30am UTC.

Can be changed through the `wrangler.toml` file or the Cloudflare Dashboard.

## Prerequisites

Since, UDP connections are not possible from Cloudflare workers, we need to communicate with our database through HTTP requests (TCP). Setting up an atlas app service (realm) instance, linked to our `pendingsubmissions` collection would be required to make this happen.

This guide details this process:

* [Setting up Atlas App Service to connect with Cloudflare workers](https://www.mongodb.com/developer/products/atlas/cloudflare-worker-rest-api/#check-out-the-rest-api-code).

Please ensure the following `rule` configuration for the `pendingsubmissions` collection:

| Parameter            | Value                 |
| -------------------- | --------------------- |
| Role                 | readAndWriteAll       |
| Apply When           | Always                |
| Document Permissions | Read, Write, Search   |
| Field Permissions    | Read: All, Write: All |


**(!) WARNING: Chuck-NORRIS can delete the Recycling Bin!**&#x20;

_Not really, but please be careful when setting up this rule. Make sure that 'Apply When' is set correctly and that the rule is applied to the correct collection to avoid inadvertent data loss._


## Environment Variables

The following environment variables are required:

<table><thead><tr><th width="217">Variable</th><th width="294">Description</th><th>Purpose</th></tr></thead><tbody><tr><td><pre class="language-properties"><code class="lang-properties">REALM_ID
</code></pre></td><td>Atlas App ID</td><td>Auth</td></tr><tr><td><pre class="language-properties"><code class="lang-properties">REALM_KEY
</code></pre></td><td>Atlas App Service (Realm) API Key</td><td>Auth</td></tr><tr><td><pre class="language-properties"><code class="lang-properties">REALM_DB
</code></pre></td><td>Name of the MongoDB database to be accessed.</td><td>Identification</td></tr><tr><td><pre class="language-properties"><code class="lang-properties">CLOUDFLARE_TOKEN
</code></pre></td><td>API key to access Cloudflare Images</td><td>Auth</td></tr><tr><td><pre class="language-properties"><code class="lang-properties">CLOUDFLARE_ID
</code></pre></td><td>Cloudflare Account ID</td><td>Auth</td></tr></tbody></table>

## Related Resources

* [Running workers locally and deploying to Cloudflare.](./)
* [Finding your Cloudflare Account ID and API token](https://developers.cloudflare.com/images/cloudflare-images/api-request).
