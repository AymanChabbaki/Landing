# Repeat-submission signals

Both forms now include these additional fields in the existing webhook payload:

- `visitorId`: random browser ID, shared between `/` and `/ar/` on the same origin.
- `visitorIdStatus`: `stored`, `submission_only` (storage blocked), or `unavailable`.
- `submittedAt`: browser-provided ISO timestamp; use a server timestamp in the sheet if authoritative time is needed.
- `formLanguage`: `fr` or `ar`.

## Required before this appears in Google Sheets

The live Google Apps Script is not included in this repository. Sending additional
JSON fields does not automatically create columns or save them in the sheet.
Obtain the existing script from the sheet's Extensions > Apps Script menu, add
columns for the four fields above, and extend its existing row-writing logic in
the matching column order. Preserve its current sheet selection, columns, and
other integrations. Deploy a new version of the existing web app after updating.
Do not replace the unknown existing script with a generic handler.

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
