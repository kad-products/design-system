## Visual Tests

Component tests use Playwright CT (`@playwright/experimental-ct-react`). Snapshot images are stored in Git and must be generated on Linux to match the CI container. Run the following to update snapshots locally:

```sh
docker run --rm \
  -v $(pwd):/work/ \
  -v /work/node_modules \
  -w /work/ \
  mcr.microsoft.com/playwright:v1.63.0-noble \
  /bin/sh -c "npm install -g pnpm && pnpm install && pnpm playwright:update"
```

Then commit the updated snapshots alongside your changes.