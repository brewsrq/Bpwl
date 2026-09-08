# The Blueprint Workout App 1.0.0

This release is a local-first workout companion for the Blueprint 12-week program. It stores all data on the device, runs offline after installation, and makes no external network requests after its files are cached.

## Volume accounting

Weekly totals are shown as **credited reps** and **credited sets**. Each exercise has editable muscle credits. For example, one completed bench-press rep can contribute 1.0 to Chest, 0.5 to Triceps, and 0.3 to Front Delts. The measure is a consistent workload-accounting tool, not a direct measure of physiological stimulus. Historical sessions preserve the mapping used when they were created.

## Future cycles

The cycle builder accepts a short request such as `Focus back and shoulders; maintain legs`. It produces a 12-week draft using the current exercise selection, the same fatigue-management phases, extra focus volume, and reduced competing volume. Every generated prescription remains editable before activation.

## Data protection

The app has no account or cloud sync. Browser or site-data deletion can erase local history. Download a JSON backup regularly and before changing phones.
