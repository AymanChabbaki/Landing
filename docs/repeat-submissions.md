# Repeat-submission signals

Both forms now include these additional fields in the existing webhook payload:

- `visitorId`: random browser ID, shared between `/` and `/ar/` on the same origin.
- `visitorIdStatus`: `stored`, `submission_only` (storage blocked), or `unavailable`.
- `submittedAt`: browser-provided ISO timestamp; use a server timestamp in the sheet if authoritative time is needed.
- `formLanguage`: `fr` or `ar`.

## Express backend setup

The forms now post to `/api/leads`; the previous Apps Script webhook is no longer
used. Copy `.env.example` to the deployment environment and fill every required
secret. Share the Google Sheet with the service account's `client_email` as an
editor. The backend automatically upgrades an existing header row containing
nine or fewer columns to the schema in `api/index.js`; rows below it are left
unchanged. Back up the sheet before the first production request.

To send conversions, set a row's `status` to `Qualified`. Vercel checks once per
day at 08:00 UTC using `/api/process-qualified` and `CRON_SECRET`. The endpoint
also accepts an authenticated manual GET or POST. Successful rows are marked
`meta_event_sent = TRUE`; failures retain an error and attempt count for retry.
Stable event IDs let Meta deduplicate overlapping retry attempts.

After deploying the site and updated script, submit twice from the same browser
and confirm matching nonempty `visitorId` values with status `stored`. Test the
Arabic form too. A separate browser profile should produce a different ID.
No live test leads have been sent during local verification.

## Interpreting matches

Filter the visitor ID column to find repeat sources. Compare the WhatsApp numbers
and submission times as additional clues. Ignore empty IDs when grouping rows.
Do not automatically block someone based only on this signal.

This is not an IP address and does not prove two submissions came from the same
person. Shared browsers share IDs; private browsing, cleared site data, another
device, or another domain produce different IDs. An attacker can alter or omit
client-provided metadata. Existing rows cannot be backfilled. IDs rotate on the
next submission after 90 days; saved sheet rows are not automatically deleted.
Limit sheet access and set a retention policy for saved metadata.

Verified network IP collection would require a trusted server-side submission
endpoint. No external IP-lookup service or device fingerprinting is used here.
