# Address Intelligence V1

This note tracks the current commercial check approach and the next safe steps for richer location context.

Current approach:
- Use the submitted address and postcode only to shape prompts, evidence gaps, lease questions, and memo context.
- Do not claim the tool verifies rents, business rates, EPC, licensing, planning, or local demand.
- Keep any location output indicative and user-entered unless a verified source is added later.

Possible future enhancements:
- Address normalisation and geocoding through an official lookup service such as OS Places API or a similar provider.
- Non-domestic business rates or rateable value context from VOA or GOV.UK sources, where a reliable lookup path exists.
- Non-domestic EPC context from the EPC open data sources, if a verified data link is added later.
- Local commercial rent evidence from manually verified comparables or a trusted third-party source.

Rules for any future implementation:
- Treat these as future enhancements, not current verified outputs.
- Do not expose raw lookup payloads in public UI.
- Keep the commercial check and results flow usable when no external lookup is available.
- Keep the output framed as decision-support only, not valuation or professional advice.
