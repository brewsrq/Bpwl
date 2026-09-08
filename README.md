# The Blueprint Workout App

A local-first, installable workout tracker for the 12-week Blueprint program.

## Use it on a phone

The installable version must be placed on an HTTPS static host. Upload the entire folder without changing the filenames. GitHub Pages, Cloudflare Pages, Netlify, and similar static hosts all work. Then open `index.html` on the phone:

- iPhone/iPad: Safari -> Share -> Add to Home Screen.
- Android: Chrome -> menu -> Install app or Add to Home screen.

After the first successful load, the PWA works offline. Data stays in that browser on that device, so use **More -> Backup and exports -> Download JSON backup** regularly.

For a quick desktop test, run this command from the extracted folder:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Included features

- Complete W1-W12 program with the changing set and rep prescriptions.
- Separate weight, reps, and RIR entry for every working set.
- Next-session load and rep suggestions using prior performance, RIR, equipment increment, and the current week's set count.
- Editable exercise library, alternatives, rest times, increments, and muscle contribution percentages.
- Completed and planned weekly credited-rep and credited-set totals by muscle and muscle group.
- Offline 12-week cycle builder for a new emphasis after the current cycle.
- Gym calendar, manual attendance entries, session timer, rest timer, and weekly/monthly/yearly/all-time duration totals.
- Weight, measurements, calorie, and macro tracking.
- JSON backup/restore and Excel-friendly CSV exports.

## Muscle-volume method

Each exercise has editable contribution percentages. One bench-press rep can count as 1.0 chest rep, 0.5 triceps rep, and 0.3 front-delt rep. These are **credited training reps**, not a direct physiological measurement. Completed sessions store a snapshot of the mapping so later edits do not rewrite history.

## Data privacy

There is no account, analytics service, database, or network API. All user data is held in browser local storage. Clearing browser/site data can erase it; JSON backup is the recovery method.
