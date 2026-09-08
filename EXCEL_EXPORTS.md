# Excel integration

Open **More -> Backup and exports** in the app.

## Workout sets
Exports one row per completed set with:

`Date, Cycle, Week, Day, Session duration min, Exercise, Set, Weight, Reps, RIR, Completed`

## Weights
Exports:

`Date, Weight`

## Measurements
Exports:

`Date, Weight, Waist, Chest, Arm, Thigh, Hips, Neck, Notes`

## Gym visits
Exports both completed workouts and manually logged visits:

`Date, Type, Duration min, Notes`

Each CSV opens directly in Excel. The full JSON backup is the authoritative restore file because it also preserves program cycles, editable exercise mappings, macro history, and in-progress state.
