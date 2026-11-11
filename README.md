# AI for Everyone

The SULAM proposal website for Universiti Malaya WIX2001, OCC 14, Group 3. The site includes a landing page, a twelve-chapter presentation with an eight-minute timer, a prompt comparison, and a downloadable public proposal.

## Run locally

Use Node.js 22.13 or later.

```sh
npm ci
npm run dev
```

Open the `/sulam/` URL that Vite prints.

## Publish with GitHub Pages

In **Settings → Pages**, select **Deploy from a branch**, choose **main** and **/docs**, then select **Save**. GitHub Pages serves the files in `docs/` at `https://shenenleow10521.github.io/sulam/`.

After changing the source, run `npm run build` and commit the updated `docs/` folder with the source changes. The build includes `.nojekyll` so GitHub Pages publishes the output directly.

The public copy removes student matriculation numbers and the contact email from the site and its proposal download.
