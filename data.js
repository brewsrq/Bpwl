(function (global) {
  const data = {
  "APP_VERSION": 1,
  "MUSCLE_GROUPS": {
    "Chest": [
      "Chest"
    ],
    "Back": [
      "Lats",
      "Upper Back",
      "Spinal Erectors"
    ],
    "Shoulders": [
      "Front Delts",
      "Side Delts",
      "Rear Delts"
    ],
    "Arms": [
      "Biceps",
      "Triceps",
      "Forearms / Brachialis"
    ],
    "Legs": [
      "Quads",
      "Hamstrings",
      "Glutes",
      "Adductors",
      "Calves"
    ],
    "Core": [
      "Abs / Trunk"
    ]
  },
  "MUSCLES": [
    "Chest",
    "Lats",
    "Upper Back",
    "Spinal Erectors",
    "Front Delts",
    "Side Delts",
    "Rear Delts",
    "Biceps",
    "Triceps",
    "Forearms / Brachialis",
    "Quads",
    "Hamstrings",
    "Glutes",
    "Adductors",
    "Calves",
    "Abs / Trunk"
  ],
  "DEFAULT_EXERCISES": [
    {
      "id": "bench-press",
      "name": "Bench Press",
      "category": "Compound",
      "equipment": "Barbell",
      "pattern": "Horizontal press",
      "restSec": 180,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Chest",
          "credit": 1
        },
        {
          "muscle": "Triceps",
          "credit": 0.5
        },
        {
          "muscle": "Front Delts",
          "credit": 0.3
        }
      ],
      "cues": "Plant the feet, keep the upper back tight, lower to the lower-mid chest, and press up and slightly back.",
      "alternatives": [
        "db-bench-press",
        "smith-bench-press",
        "machine-chest-press"
      ],
      "active": true
    },
    {
      "id": "db-bench-press",
      "name": "Dumbbell Bench Press",
      "category": "Compound",
      "equipment": "Dumbbells",
      "pattern": "Horizontal press",
      "restSec": 150,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Chest",
          "credit": 1
        },
        {
          "muscle": "Triceps",
          "credit": 0.45
        },
        {
          "muscle": "Front Delts",
          "credit": 0.3
        }
      ],
      "cues": "Keep forearms stacked and lower only as far as the shoulders remain controlled.",
      "alternatives": [
        "bench-press",
        "machine-chest-press"
      ],
      "active": true
    },
    {
      "id": "smith-bench-press",
      "name": "Smith Machine Bench Press",
      "category": "Compound",
      "equipment": "Smith machine",
      "pattern": "Horizontal press",
      "restSec": 150,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Chest",
          "credit": 1
        },
        {
          "muscle": "Triceps",
          "credit": 0.5
        },
        {
          "muscle": "Front Delts",
          "credit": 0.3
        }
      ],
      "cues": "Set the bench so the bar reaches the lower-mid chest without forcing the shoulders forward.",
      "alternatives": [
        "bench-press",
        "machine-chest-press"
      ],
      "active": true
    },
    {
      "id": "incline-db-press",
      "name": "Incline Dumbbell Press",
      "category": "Compound",
      "equipment": "Dumbbells",
      "pattern": "Incline press",
      "restSec": 150,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Chest",
          "credit": 1
        },
        {
          "muscle": "Triceps",
          "credit": 0.45
        },
        {
          "muscle": "Front Delts",
          "credit": 0.4
        }
      ],
      "cues": "Use a low-to-moderate incline and keep the forearms vertical.",
      "alternatives": [
        "incline-bar-smith-bench",
        "incline-machine-press"
      ],
      "active": true
    },
    {
      "id": "incline-bar-smith-bench",
      "name": "Incline Barbell or Smith Bench",
      "category": "Compound",
      "equipment": "Barbell / Smith",
      "pattern": "Incline press",
      "restSec": 180,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Chest",
          "credit": 1
        },
        {
          "muscle": "Triceps",
          "credit": 0.5
        },
        {
          "muscle": "Front Delts",
          "credit": 0.4
        }
      ],
      "cues": "Use a modest incline and repeat the same touch point and bar path each week.",
      "alternatives": [
        "incline-db-press",
        "incline-machine-press"
      ],
      "active": true
    },
    {
      "id": "incline-machine-press",
      "name": "Incline Machine Press",
      "category": "Compound",
      "equipment": "Machine",
      "pattern": "Incline press",
      "restSec": 120,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Chest",
          "credit": 1
        },
        {
          "muscle": "Triceps",
          "credit": 0.45
        },
        {
          "muscle": "Front Delts",
          "credit": 0.4
        }
      ],
      "cues": "Adjust the seat so the handles line up with the upper-mid chest.",
      "alternatives": [
        "incline-db-press",
        "incline-bar-smith-bench"
      ],
      "active": true
    },
    {
      "id": "machine-chest-press",
      "name": "Machine Chest Press",
      "category": "Compound",
      "equipment": "Machine",
      "pattern": "Horizontal press",
      "restSec": 120,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Chest",
          "credit": 1
        },
        {
          "muscle": "Triceps",
          "credit": 0.45
        },
        {
          "muscle": "Front Delts",
          "credit": 0.3
        }
      ],
      "cues": "Set the seat for a comfortable mid-chest path and control the stretch.",
      "alternatives": [
        "bench-press",
        "db-bench-press",
        "smith-bench-press"
      ],
      "active": true
    },
    {
      "id": "cable-fly",
      "name": "Cable Fly",
      "category": "Isolation",
      "equipment": "Cable",
      "pattern": "Chest isolation",
      "restSec": 90,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Chest",
          "credit": 1
        }
      ],
      "cues": "Maintain a soft elbow bend and move the upper arms across the torso.",
      "alternatives": [
        "pec-deck",
        "db-fly"
      ],
      "active": true
    },
    {
      "id": "pec-deck",
      "name": "Pec Deck",
      "category": "Isolation",
      "equipment": "Machine",
      "pattern": "Chest isolation",
      "restSec": 90,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Chest",
          "credit": 1
        }
      ],
      "cues": "Keep the shoulders down and stop the stretch before the shoulder rolls forward.",
      "alternatives": [
        "cable-fly"
      ],
      "active": true
    },
    {
      "id": "db-fly",
      "name": "Dumbbell Fly",
      "category": "Isolation",
      "equipment": "Dumbbells",
      "pattern": "Chest isolation",
      "restSec": 90,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Chest",
          "credit": 1
        }
      ],
      "cues": "Use a conservative range and keep a fixed, soft elbow bend.",
      "alternatives": [
        "cable-fly",
        "pec-deck"
      ],
      "active": true
    },
    {
      "id": "chest-supported-row",
      "name": "Chest-Supported Row",
      "category": "Compound",
      "equipment": "Machine / Dumbbells",
      "pattern": "Horizontal pull",
      "restSec": 150,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Upper Back",
          "credit": 1
        },
        {
          "muscle": "Lats",
          "credit": 0.7
        },
        {
          "muscle": "Rear Delts",
          "credit": 0.4
        },
        {
          "muscle": "Biceps",
          "credit": 0.45
        }
      ],
      "cues": "Keep the chest on the pad and pull the elbows back and slightly toward the hips.",
      "alternatives": [
        "seated-cable-row",
        "machine-row"
      ],
      "active": true
    },
    {
      "id": "seated-cable-row",
      "name": "Seated Cable Row",
      "category": "Compound",
      "equipment": "Cable",
      "pattern": "Horizontal pull",
      "restSec": 150,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Upper Back",
          "credit": 1
        },
        {
          "muscle": "Lats",
          "credit": 0.7
        },
        {
          "muscle": "Rear Delts",
          "credit": 0.35
        },
        {
          "muscle": "Biceps",
          "credit": 0.45
        }
      ],
      "cues": "Sit tall, lead with the elbows, and avoid using hip momentum.",
      "alternatives": [
        "chest-supported-row",
        "machine-row"
      ],
      "active": true
    },
    {
      "id": "machine-row",
      "name": "Machine Row",
      "category": "Compound",
      "equipment": "Machine",
      "pattern": "Horizontal pull",
      "restSec": 135,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Upper Back",
          "credit": 1
        },
        {
          "muscle": "Lats",
          "credit": 0.7
        },
        {
          "muscle": "Rear Delts",
          "credit": 0.35
        },
        {
          "muscle": "Biceps",
          "credit": 0.45
        }
      ],
      "cues": "Keep the torso stable and choose a grip that allows the elbows to travel comfortably.",
      "alternatives": [
        "chest-supported-row",
        "seated-cable-row"
      ],
      "active": true
    },
    {
      "id": "one-arm-db-row",
      "name": "One-Arm Dumbbell Row",
      "category": "Compound",
      "equipment": "Dumbbell",
      "pattern": "Horizontal pull",
      "restSec": 135,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Lats",
          "credit": 1
        },
        {
          "muscle": "Upper Back",
          "credit": 0.75
        },
        {
          "muscle": "Rear Delts",
          "credit": 0.3
        },
        {
          "muscle": "Biceps",
          "credit": 0.45
        }
      ],
      "cues": "Brace against a bench and pull the elbow toward the hip without twisting.",
      "alternatives": [
        "one-arm-cable-row",
        "chest-supported-row"
      ],
      "active": true
    },
    {
      "id": "one-arm-cable-row",
      "name": "One-Arm Cable Row",
      "category": "Compound",
      "equipment": "Cable",
      "pattern": "Horizontal pull",
      "restSec": 120,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Lats",
          "credit": 1
        },
        {
          "muscle": "Upper Back",
          "credit": 0.7
        },
        {
          "muscle": "Rear Delts",
          "credit": 0.3
        },
        {
          "muscle": "Biceps",
          "credit": 0.45
        }
      ],
      "cues": "Reach under control and finish with the elbow near the hip.",
      "alternatives": [
        "one-arm-db-row",
        "seated-cable-row"
      ],
      "active": true
    },
    {
      "id": "lat-pulldown",
      "name": "Neutral-Grip Lat Pulldown / Assisted Pull-Up",
      "category": "Compound",
      "equipment": "Cable / Assisted machine",
      "pattern": "Vertical pull",
      "restSec": 150,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Lats",
          "credit": 1
        },
        {
          "muscle": "Upper Back",
          "credit": 0.4
        },
        {
          "muscle": "Biceps",
          "credit": 0.5
        }
      ],
      "cues": "Begin from a controlled overhead stretch and pull the elbows toward the ribs.",
      "alternatives": [
        "assisted-pull-up",
        "one-arm-pulldown"
      ],
      "active": true
    },
    {
      "id": "assisted-pull-up",
      "name": "Assisted Pull-Up",
      "category": "Compound",
      "equipment": "Assisted machine",
      "pattern": "Vertical pull",
      "restSec": 150,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Lats",
          "credit": 1
        },
        {
          "muscle": "Upper Back",
          "credit": 0.45
        },
        {
          "muscle": "Biceps",
          "credit": 0.5
        }
      ],
      "cues": "Keep the ribs controlled and drive the elbows down.",
      "alternatives": [
        "lat-pulldown"
      ],
      "active": true
    },
    {
      "id": "one-arm-pulldown",
      "name": "One-Arm Cable Pulldown",
      "category": "Compound",
      "equipment": "Cable",
      "pattern": "Vertical pull",
      "restSec": 120,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Lats",
          "credit": 1
        },
        {
          "muscle": "Upper Back",
          "credit": 0.3
        },
        {
          "muscle": "Biceps",
          "credit": 0.45
        }
      ],
      "cues": "Pull the elbow toward the hip while keeping the torso quiet.",
      "alternatives": [
        "lat-pulldown"
      ],
      "active": true
    },
    {
      "id": "rear-delt-fly",
      "name": "Rear-Delt Fly",
      "category": "Isolation",
      "equipment": "Machine / Cable",
      "pattern": "Rear delt",
      "restSec": 75,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Rear Delts",
          "credit": 1
        },
        {
          "muscle": "Upper Back",
          "credit": 0.3
        }
      ],
      "cues": "Move the upper arms out and back without shrugging.",
      "alternatives": [
        "face-pull"
      ],
      "active": true
    },
    {
      "id": "face-pull",
      "name": "Face Pull",
      "category": "Isolation",
      "equipment": "Cable",
      "pattern": "Rear delt",
      "restSec": 75,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Rear Delts",
          "credit": 1
        },
        {
          "muscle": "Upper Back",
          "credit": 0.35
        }
      ],
      "cues": "Pull toward the forehead and rotate the hands apart.",
      "alternatives": [
        "rear-delt-fly"
      ],
      "active": true
    },
    {
      "id": "overhead-press",
      "name": "Seated Overhead Press",
      "category": "Compound",
      "equipment": "Dumbbells / Machine",
      "pattern": "Vertical press",
      "restSec": 150,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Front Delts",
          "credit": 1
        },
        {
          "muscle": "Triceps",
          "credit": 0.5
        },
        {
          "muscle": "Side Delts",
          "credit": 0.25
        }
      ],
      "cues": "Keep the ribs stacked and press through a comfortable path.",
      "alternatives": [
        "machine-shoulder-press"
      ],
      "active": true
    },
    {
      "id": "machine-shoulder-press",
      "name": "Machine Shoulder Press",
      "category": "Compound",
      "equipment": "Machine",
      "pattern": "Vertical press",
      "restSec": 120,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Front Delts",
          "credit": 1
        },
        {
          "muscle": "Triceps",
          "credit": 0.5
        },
        {
          "muscle": "Side Delts",
          "credit": 0.25
        }
      ],
      "cues": "Set the seat so the handles begin around ear level.",
      "alternatives": [
        "overhead-press"
      ],
      "active": true
    },
    {
      "id": "cable-lateral-raise",
      "name": "Cable Lateral Raise",
      "category": "Isolation",
      "equipment": "Cable",
      "pattern": "Lateral raise",
      "restSec": 75,
      "increment": 2.5,
      "muscles": [
        {
          "muscle": "Side Delts",
          "credit": 1
        }
      ],
      "cues": "Lead with the elbow and stop around shoulder height.",
      "alternatives": [
        "db-lateral-raise",
        "machine-lateral-raise"
      ],
      "active": true
    },
    {
      "id": "db-lateral-raise",
      "name": "Dumbbell Lateral Raise",
      "category": "Isolation",
      "equipment": "Dumbbells",
      "pattern": "Lateral raise",
      "restSec": 75,
      "increment": 2.5,
      "muscles": [
        {
          "muscle": "Side Delts",
          "credit": 1
        }
      ],
      "cues": "Use a controlled arc and avoid turning the set into a shrug.",
      "alternatives": [
        "cable-lateral-raise",
        "machine-lateral-raise"
      ],
      "active": true
    },
    {
      "id": "machine-lateral-raise",
      "name": "Machine Lateral Raise",
      "category": "Isolation",
      "equipment": "Machine",
      "pattern": "Lateral raise",
      "restSec": 75,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Side Delts",
          "credit": 1
        }
      ],
      "cues": "Keep the torso against the pad and drive through the elbows.",
      "alternatives": [
        "cable-lateral-raise",
        "db-lateral-raise"
      ],
      "active": true
    },
    {
      "id": "cable-pressdown",
      "name": "Cable Pressdown",
      "category": "Isolation",
      "equipment": "Cable",
      "pattern": "Elbow extension",
      "restSec": 75,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Triceps",
          "credit": 1
        }
      ],
      "cues": "Keep the elbows fixed and finish with a controlled lockout.",
      "alternatives": [
        "single-arm-cable-triceps",
        "skull-crusher"
      ],
      "active": true
    },
    {
      "id": "overhead-cable-extension",
      "name": "Overhead Cable Extension",
      "category": "Isolation",
      "equipment": "Cable",
      "pattern": "Elbow extension overhead",
      "restSec": 90,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Triceps",
          "credit": 1
        }
      ],
      "cues": "Allow a full comfortable stretch and keep the upper arms stable.",
      "alternatives": [
        "db-overhead-extension",
        "skull-crusher"
      ],
      "active": true
    },
    {
      "id": "single-arm-cable-triceps",
      "name": "Single-Arm Cable Triceps Extension",
      "category": "Isolation",
      "equipment": "Cable",
      "pattern": "Elbow extension",
      "restSec": 75,
      "increment": 2.5,
      "muscles": [
        {
          "muscle": "Triceps",
          "credit": 1
        }
      ],
      "cues": "Keep the shoulder quiet and move only at the elbow.",
      "alternatives": [
        "cable-pressdown"
      ],
      "active": true
    },
    {
      "id": "skull-crusher",
      "name": "EZ-Bar Skull Crusher",
      "category": "Isolation",
      "equipment": "EZ bar",
      "pattern": "Elbow extension",
      "restSec": 90,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Triceps",
          "credit": 1
        }
      ],
      "cues": "Lower behind the forehead with the upper arms slightly angled back.",
      "alternatives": [
        "overhead-cable-extension",
        "cable-pressdown"
      ],
      "active": true
    },
    {
      "id": "db-overhead-extension",
      "name": "Dumbbell Overhead Extension",
      "category": "Isolation",
      "equipment": "Dumbbell",
      "pattern": "Elbow extension overhead",
      "restSec": 90,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Triceps",
          "credit": 1
        }
      ],
      "cues": "Keep the ribs down and let the elbows bend deeply without shoulder pain.",
      "alternatives": [
        "overhead-cable-extension"
      ],
      "active": true
    },
    {
      "id": "incline-db-curl",
      "name": "Incline Dumbbell Curl",
      "category": "Isolation",
      "equipment": "Dumbbells",
      "pattern": "Elbow flexion",
      "restSec": 75,
      "increment": 2.5,
      "muscles": [
        {
          "muscle": "Biceps",
          "credit": 1
        },
        {
          "muscle": "Forearms / Brachialis",
          "credit": 0.2
        }
      ],
      "cues": "Keep the upper arm behind the torso and avoid swinging.",
      "alternatives": [
        "cable-curl",
        "preacher-curl"
      ],
      "active": true
    },
    {
      "id": "preacher-curl",
      "name": "Preacher Curl",
      "category": "Isolation",
      "equipment": "Machine / EZ bar",
      "pattern": "Elbow flexion",
      "restSec": 75,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Biceps",
          "credit": 1
        },
        {
          "muscle": "Forearms / Brachialis",
          "credit": 0.3
        }
      ],
      "cues": "Keep the upper arm on the pad and control the bottom.",
      "alternatives": [
        "cable-curl",
        "incline-db-curl"
      ],
      "active": true
    },
    {
      "id": "ez-bar-curl",
      "name": "EZ-Bar Curl",
      "category": "Isolation",
      "equipment": "EZ bar",
      "pattern": "Elbow flexion",
      "restSec": 90,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Biceps",
          "credit": 1
        },
        {
          "muscle": "Forearms / Brachialis",
          "credit": 0.3
        }
      ],
      "cues": "Keep the torso still and complete the same range each rep.",
      "alternatives": [
        "cable-curl",
        "preacher-curl"
      ],
      "active": true
    },
    {
      "id": "cable-curl",
      "name": "Cable Curl",
      "category": "Isolation",
      "equipment": "Cable",
      "pattern": "Elbow flexion",
      "restSec": 75,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Biceps",
          "credit": 1
        },
        {
          "muscle": "Forearms / Brachialis",
          "credit": 0.25
        }
      ],
      "cues": "Keep the elbows fixed and squeeze without leaning back.",
      "alternatives": [
        "ez-bar-curl",
        "incline-db-curl"
      ],
      "active": true
    },
    {
      "id": "hammer-curl",
      "name": "Hammer Curl",
      "category": "Isolation",
      "equipment": "Dumbbells / Cable",
      "pattern": "Neutral-grip curl",
      "restSec": 75,
      "increment": 2.5,
      "muscles": [
        {
          "muscle": "Forearms / Brachialis",
          "credit": 1
        },
        {
          "muscle": "Biceps",
          "credit": 0.6
        }
      ],
      "cues": "Use a neutral wrist and keep the elbow close to the torso.",
      "alternatives": [
        "rope-hammer-curl"
      ],
      "active": true
    },
    {
      "id": "rope-hammer-curl",
      "name": "Rope Hammer Curl",
      "category": "Isolation",
      "equipment": "Cable",
      "pattern": "Neutral-grip curl",
      "restSec": 75,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Forearms / Brachialis",
          "credit": 1
        },
        {
          "muscle": "Biceps",
          "credit": 0.6
        }
      ],
      "cues": "Separate the rope slightly at the top without moving the elbows.",
      "alternatives": [
        "hammer-curl"
      ],
      "active": true
    },
    {
      "id": "hack-squat-leg-press",
      "name": "Hack Squat or Leg Press",
      "category": "Compound",
      "equipment": "Machine",
      "pattern": "Knee dominant",
      "restSec": 180,
      "increment": 10,
      "muscles": [
        {
          "muscle": "Quads",
          "credit": 1
        },
        {
          "muscle": "Glutes",
          "credit": 0.55
        },
        {
          "muscle": "Adductors",
          "credit": 0.2
        }
      ],
      "cues": "Use a stance that allows controlled depth while keeping the feet planted.",
      "alternatives": [
        "hack-squat",
        "leg-press",
        "back-squat"
      ],
      "active": true
    },
    {
      "id": "hack-squat",
      "name": "Hack Squat",
      "category": "Compound",
      "equipment": "Machine",
      "pattern": "Knee dominant",
      "restSec": 180,
      "increment": 10,
      "muscles": [
        {
          "muscle": "Quads",
          "credit": 1
        },
        {
          "muscle": "Glutes",
          "credit": 0.55
        },
        {
          "muscle": "Adductors",
          "credit": 0.2
        }
      ],
      "cues": "Keep the low back supported and descend as far as control allows.",
      "alternatives": [
        "leg-press",
        "back-squat"
      ],
      "active": true
    },
    {
      "id": "leg-press",
      "name": "Leg Press",
      "category": "Compound",
      "equipment": "Machine",
      "pattern": "Knee dominant",
      "restSec": 180,
      "increment": 10,
      "muscles": [
        {
          "muscle": "Quads",
          "credit": 1
        },
        {
          "muscle": "Glutes",
          "credit": 0.5
        },
        {
          "muscle": "Adductors",
          "credit": 0.2
        }
      ],
      "cues": "Keep the hips against the pad and avoid locking the knees aggressively.",
      "alternatives": [
        "hack-squat",
        "back-squat"
      ],
      "active": true
    },
    {
      "id": "back-squat",
      "name": "Back Squat",
      "category": "Compound",
      "equipment": "Barbell",
      "pattern": "Knee dominant",
      "restSec": 210,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Quads",
          "credit": 1
        },
        {
          "muscle": "Glutes",
          "credit": 0.6
        },
        {
          "muscle": "Adductors",
          "credit": 0.25
        },
        {
          "muscle": "Spinal Erectors",
          "credit": 0.25
        }
      ],
      "cues": "Brace before descending, keep pressure through the whole foot, and use a repeatable depth.",
      "alternatives": [
        "hack-squat",
        "leg-press"
      ],
      "active": true
    },
    {
      "id": "bulgarian-split-squat",
      "name": "Bulgarian Split Squat",
      "category": "Compound",
      "equipment": "Dumbbells / Smith",
      "pattern": "Unilateral knee dominant",
      "restSec": 150,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Quads",
          "credit": 1
        },
        {
          "muscle": "Glutes",
          "credit": 0.7
        },
        {
          "muscle": "Adductors",
          "credit": 0.2
        }
      ],
      "cues": "Set a stable stance and drive through the full front foot.",
      "alternatives": [
        "reverse-lunge",
        "split-squat"
      ],
      "active": true
    },
    {
      "id": "reverse-lunge",
      "name": "Reverse Lunge",
      "category": "Compound",
      "equipment": "Dumbbells / Barbell",
      "pattern": "Unilateral knee dominant",
      "restSec": 135,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Quads",
          "credit": 1
        },
        {
          "muscle": "Glutes",
          "credit": 0.7
        },
        {
          "muscle": "Adductors",
          "credit": 0.2
        }
      ],
      "cues": "Step back far enough to keep the front foot planted and torso controlled.",
      "alternatives": [
        "bulgarian-split-squat",
        "split-squat"
      ],
      "active": true
    },
    {
      "id": "split-squat",
      "name": "Split Squat",
      "category": "Compound",
      "equipment": "Dumbbells / Smith",
      "pattern": "Unilateral knee dominant",
      "restSec": 135,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Quads",
          "credit": 1
        },
        {
          "muscle": "Glutes",
          "credit": 0.65
        },
        {
          "muscle": "Adductors",
          "credit": 0.2
        }
      ],
      "cues": "Use a fixed stance and descend straight down with control.",
      "alternatives": [
        "bulgarian-split-squat",
        "reverse-lunge"
      ],
      "active": true
    },
    {
      "id": "leg-extension",
      "name": "Leg Extension",
      "category": "Isolation",
      "equipment": "Machine",
      "pattern": "Knee extension",
      "restSec": 75,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Quads",
          "credit": 1
        }
      ],
      "cues": "Align the machine pivot with the knee and control both directions.",
      "alternatives": [
        "sissy-squat"
      ],
      "active": true
    },
    {
      "id": "sissy-squat",
      "name": "Assisted Sissy Squat",
      "category": "Isolation",
      "equipment": "Bodyweight / machine",
      "pattern": "Knee extension",
      "restSec": 90,
      "increment": 0,
      "muscles": [
        {
          "muscle": "Quads",
          "credit": 1
        }
      ],
      "cues": "Use assistance and a pain-free range.",
      "alternatives": [
        "leg-extension"
      ],
      "active": true
    },
    {
      "id": "romanian-deadlift",
      "name": "Romanian Deadlift",
      "category": "Compound",
      "equipment": "Barbell / Dumbbells",
      "pattern": "Hip hinge",
      "restSec": 180,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Hamstrings",
          "credit": 1
        },
        {
          "muscle": "Glutes",
          "credit": 0.7
        },
        {
          "muscle": "Spinal Erectors",
          "credit": 0.3
        }
      ],
      "cues": "Push the hips back, keep the load close, and stop when the hamstrings limit the range.",
      "alternatives": [
        "back-extension",
        "cable-pull-through"
      ],
      "active": true
    },
    {
      "id": "trap-bar-deadlift",
      "name": "Trap-Bar Deadlift",
      "category": "Compound",
      "equipment": "Trap bar",
      "pattern": "Hip hinge / pull",
      "restSec": 210,
      "increment": 10,
      "muscles": [
        {
          "muscle": "Glutes",
          "credit": 0.8
        },
        {
          "muscle": "Quads",
          "credit": 0.7
        },
        {
          "muscle": "Hamstrings",
          "credit": 0.5
        },
        {
          "muscle": "Upper Back",
          "credit": 0.3
        },
        {
          "muscle": "Spinal Erectors",
          "credit": 0.3
        }
      ],
      "cues": "Brace, push the floor away, and finish tall without leaning back.",
      "alternatives": [
        "conventional-deadlift",
        "rack-pull"
      ],
      "active": true
    },
    {
      "id": "conventional-deadlift",
      "name": "Conventional Deadlift",
      "category": "Compound",
      "equipment": "Barbell",
      "pattern": "Hip hinge / pull",
      "restSec": 240,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Glutes",
          "credit": 0.8
        },
        {
          "muscle": "Hamstrings",
          "credit": 0.65
        },
        {
          "muscle": "Spinal Erectors",
          "credit": 0.5
        },
        {
          "muscle": "Upper Back",
          "credit": 0.3
        },
        {
          "muscle": "Quads",
          "credit": 0.4
        }
      ],
      "cues": "Brace, keep the bar close, and push through the floor.",
      "alternatives": [
        "trap-bar-deadlift",
        "rack-pull"
      ],
      "active": true
    },
    {
      "id": "back-extension",
      "name": "45-Degree Back Extension",
      "category": "Compound",
      "equipment": "Bench",
      "pattern": "Hip hinge",
      "restSec": 120,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Hamstrings",
          "credit": 0.7
        },
        {
          "muscle": "Glutes",
          "credit": 1
        },
        {
          "muscle": "Spinal Erectors",
          "credit": 0.4
        }
      ],
      "cues": "Hinge at the hips and finish by squeezing the glutes, not overextending the spine.",
      "alternatives": [
        "romanian-deadlift",
        "cable-pull-through"
      ],
      "active": true
    },
    {
      "id": "cable-pull-through",
      "name": "Cable Pull-Through",
      "category": "Compound",
      "equipment": "Cable",
      "pattern": "Hip hinge",
      "restSec": 120,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Glutes",
          "credit": 1
        },
        {
          "muscle": "Hamstrings",
          "credit": 0.7
        }
      ],
      "cues": "Let the hips travel back and finish with the glutes.",
      "alternatives": [
        "romanian-deadlift",
        "back-extension"
      ],
      "active": true
    },
    {
      "id": "leg-curl",
      "name": "Leg Curl",
      "category": "Isolation",
      "equipment": "Machine",
      "pattern": "Knee flexion",
      "restSec": 90,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Hamstrings",
          "credit": 1
        }
      ],
      "cues": "Keep the hips against the pad and control the lengthened position.",
      "alternatives": [
        "nordic-curl"
      ],
      "active": true
    },
    {
      "id": "nordic-curl",
      "name": "Assisted Nordic Curl",
      "category": "Isolation",
      "equipment": "Bodyweight / machine",
      "pattern": "Knee flexion",
      "restSec": 120,
      "increment": 0,
      "muscles": [
        {
          "muscle": "Hamstrings",
          "credit": 1
        }
      ],
      "cues": "Use enough assistance to control the full lowering phase.",
      "alternatives": [
        "leg-curl"
      ],
      "active": true
    },
    {
      "id": "hip-thrust",
      "name": "Hip Thrust",
      "category": "Compound",
      "equipment": "Barbell / Machine",
      "pattern": "Hip extension",
      "restSec": 150,
      "increment": 10,
      "muscles": [
        {
          "muscle": "Glutes",
          "credit": 1
        },
        {
          "muscle": "Hamstrings",
          "credit": 0.25
        }
      ],
      "cues": "Keep the ribs down and finish with the glutes rather than the low back.",
      "alternatives": [
        "glute-bridge"
      ],
      "active": true
    },
    {
      "id": "glute-bridge",
      "name": "Glute Bridge",
      "category": "Compound",
      "equipment": "Barbell / Bodyweight",
      "pattern": "Hip extension",
      "restSec": 120,
      "increment": 10,
      "muscles": [
        {
          "muscle": "Glutes",
          "credit": 1
        },
        {
          "muscle": "Hamstrings",
          "credit": 0.2
        }
      ],
      "cues": "Pause at the top without overextending the spine.",
      "alternatives": [
        "hip-thrust"
      ],
      "active": true
    },
    {
      "id": "standing-calf-raise",
      "name": "Standing Calf Raise",
      "category": "Isolation",
      "equipment": "Machine",
      "pattern": "Calf raise",
      "restSec": 75,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Calves",
          "credit": 1
        }
      ],
      "cues": "Pause in the stretch and rise through the big toe.",
      "alternatives": [
        "seated-calf-raise"
      ],
      "active": true
    },
    {
      "id": "seated-calf-raise",
      "name": "Seated Calf Raise",
      "category": "Isolation",
      "equipment": "Machine",
      "pattern": "Calf raise",
      "restSec": 75,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Calves",
          "credit": 1
        }
      ],
      "cues": "Use a full controlled range and avoid bouncing.",
      "alternatives": [
        "standing-calf-raise"
      ],
      "active": true
    },
    {
      "id": "cable-crunch",
      "name": "Cable Crunch",
      "category": "Isolation",
      "equipment": "Cable",
      "pattern": "Trunk flexion",
      "restSec": 75,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Abs / Trunk",
          "credit": 1
        }
      ],
      "cues": "Curl the ribs toward the pelvis without turning it into a hip hinge.",
      "alternatives": [
        "machine-crunch",
        "plank"
      ],
      "active": true
    },
    {
      "id": "machine-crunch",
      "name": "Machine Crunch",
      "category": "Isolation",
      "equipment": "Machine",
      "pattern": "Trunk flexion",
      "restSec": 75,
      "increment": 5,
      "muscles": [
        {
          "muscle": "Abs / Trunk",
          "credit": 1
        }
      ],
      "cues": "Set the machine for a comfortable range and flex the trunk under control.",
      "alternatives": [
        "cable-crunch"
      ],
      "active": true
    },
    {
      "id": "plank",
      "name": "Plank",
      "category": "Isolation",
      "equipment": "Bodyweight",
      "pattern": "Trunk stability",
      "restSec": 60,
      "increment": 0,
      "muscles": [
        {
          "muscle": "Abs / Trunk",
          "credit": 1
        }
      ],
      "cues": "Maintain a stacked ribcage and pelvis while breathing normally.",
      "alternatives": [
        "cable-crunch"
      ],
      "active": true
    }
  ],
  "DEFAULT_CYCLE": {
    "id": "cycle-return-12",
    "name": "12-Week Return-to-Lifting",
    "createdAt": null,
    "startDate": null,
    "status": "active",
    "focusGroups": [
      "Chest",
      "Arms"
    ],
    "deemphasisGroups": [
      "Legs"
    ],
    "weeks": [
      {
        "number": 1,
        "block": "Re-entry I",
        "rirLabel": "3-4 RIR",
        "note": "Use conservative loads. Stop every set while technique still feels automatic.",
        "days": [
          {
            "id": "D1",
            "title": "Upper A - Bench Priority",
            "focus": "Chest strength, balanced pulling, arms",
            "prescriptions": [
              {
                "id": "w1-d1-1",
                "exerciseId": "bench-press",
                "displayName": "Bench Press",
                "sets": 2,
                "repMin": 6,
                "repMax": 8,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 1
              },
              {
                "id": "w1-d1-2",
                "exerciseId": "chest-supported-row",
                "displayName": "Chest-Supported Row",
                "sets": 2,
                "repMin": 8,
                "repMax": 10,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 2
              },
              {
                "id": "w1-d1-3",
                "exerciseId": "incline-db-press",
                "displayName": "Incline DB Press",
                "sets": 2,
                "repMin": 8,
                "repMax": 10,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 3
              },
              {
                "id": "w1-d1-4",
                "exerciseId": "lat-pulldown",
                "displayName": "Neutral Pulldown",
                "sets": 2,
                "repMin": 8,
                "repMax": 10,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 4
              },
              {
                "id": "w1-d1-5",
                "exerciseId": "cable-lateral-raise",
                "displayName": "Cable Lateral Raise",
                "sets": 2,
                "repMin": 12,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 5
              },
              {
                "id": "w1-d1-6",
                "exerciseId": "cable-pressdown",
                "displayName": "Rope Pressdown",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 6
              },
              {
                "id": "w1-d1-7",
                "exerciseId": "incline-db-curl",
                "displayName": "Incline DB Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 7
              }
            ]
          },
          {
            "id": "D2",
            "title": "Lower A - Hinge + Arm Support",
            "focus": "Quads, hamstrings, calves, direct arms",
            "prescriptions": [
              {
                "id": "w1-d2-1",
                "exerciseId": "hack-squat-leg-press",
                "displayName": "Hack Squat / Leg Press",
                "sets": 2,
                "repMin": 6,
                "repMax": 8,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 1
              },
              {
                "id": "w1-d2-2",
                "exerciseId": "romanian-deadlift",
                "displayName": "Romanian Deadlift",
                "sets": 2,
                "repMin": 6,
                "repMax": 8,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 2
              },
              {
                "id": "w1-d2-3",
                "exerciseId": "leg-curl",
                "displayName": "Seated Leg Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 3
              },
              {
                "id": "w1-d2-4",
                "exerciseId": "standing-calf-raise",
                "displayName": "Standing Calf Raise",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 4
              },
              {
                "id": "w1-d2-5",
                "exerciseId": "cable-crunch",
                "displayName": "Cable Crunch",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 5
              },
              {
                "id": "w1-d2-6",
                "exerciseId": "preacher-curl",
                "displayName": "Preacher Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 6
              },
              {
                "id": "w1-d2-7",
                "exerciseId": "overhead-cable-extension",
                "displayName": "Overhead Cable Ext.",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 7
              }
            ]
          },
          {
            "id": "D3",
            "title": "Upper B - Chest + Arms",
            "focus": "Upper chest, chest volume, arms",
            "prescriptions": [
              {
                "id": "w1-d3-1",
                "exerciseId": "incline-bar-smith-bench",
                "displayName": "Incline Bar/Smith Bench",
                "sets": 2,
                "repMin": 6,
                "repMax": 8,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 1
              },
              {
                "id": "w1-d3-2",
                "exerciseId": "seated-cable-row",
                "displayName": "Seated Cable Row",
                "sets": 2,
                "repMin": 8,
                "repMax": 10,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 2
              },
              {
                "id": "w1-d3-3",
                "exerciseId": "machine-chest-press",
                "displayName": "Machine Chest Press",
                "sets": 2,
                "repMin": 8,
                "repMax": 10,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 3
              },
              {
                "id": "w1-d3-4",
                "exerciseId": "lat-pulldown",
                "displayName": "Pulldown / Assist Pull-Up",
                "sets": 2,
                "repMin": 8,
                "repMax": 10,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 4
              },
              {
                "id": "w1-d3-5",
                "exerciseId": "cable-fly",
                "displayName": "Cable Fly",
                "sets": 2,
                "repMin": 12,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 5
              },
              {
                "id": "w1-d3-6",
                "exerciseId": "cable-lateral-raise",
                "displayName": "Cable Lateral Raise",
                "sets": 2,
                "repMin": 12,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 6
              },
              {
                "id": "w1-d3-7",
                "exerciseId": "ez-bar-curl",
                "displayName": "EZ-Bar Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 7
              },
              {
                "id": "w1-d3-8",
                "exerciseId": "cable-pressdown",
                "displayName": "Cable Pressdown",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 8
              }
            ]
          },
          {
            "id": "D4",
            "title": "Lower B - Strength + Priority Work",
            "focus": "Posterior chain, unilateral legs, chest/arms",
            "prescriptions": [
              {
                "id": "w1-d4-1",
                "exerciseId": "trap-bar-deadlift",
                "displayName": "Trap-Bar Deadlift",
                "sets": 2,
                "repMin": 5,
                "repMax": 6,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 1
              },
              {
                "id": "w1-d4-2",
                "exerciseId": "bulgarian-split-squat",
                "displayName": "Bulgarian Split Squat",
                "sets": 2,
                "repMin": 8,
                "repMax": 10,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 2
              },
              {
                "id": "w1-d4-3",
                "exerciseId": "leg-extension",
                "displayName": "Leg Extension",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 3
              },
              {
                "id": "w1-d4-4",
                "exerciseId": "leg-curl",
                "displayName": "Leg Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 4
              },
              {
                "id": "w1-d4-5",
                "exerciseId": "seated-calf-raise",
                "displayName": "Seated Calf Raise",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 5
              },
              {
                "id": "w1-d4-6",
                "exerciseId": "cable-fly",
                "displayName": "Cable Fly",
                "sets": 2,
                "repMin": 12,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 6
              },
              {
                "id": "w1-d4-7",
                "exerciseId": "hammer-curl",
                "displayName": "Hammer Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 7
              },
              {
                "id": "w1-d4-8",
                "exerciseId": "single-arm-cable-triceps",
                "displayName": "1-Arm Cable Triceps",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 8
              }
            ]
          }
        ]
      },
      {
        "number": 2,
        "block": "Re-entry II",
        "rirLabel": "3 RIR",
        "note": "Add reps before load. Soreness should be manageable before the next session.",
        "days": [
          {
            "id": "D1",
            "title": "Upper A - Bench Priority",
            "focus": "Chest strength, balanced pulling, arms",
            "prescriptions": [
              {
                "id": "w2-d1-1",
                "exerciseId": "bench-press",
                "displayName": "Bench Press",
                "sets": 2,
                "repMin": 6,
                "repMax": 8,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 1
              },
              {
                "id": "w2-d1-2",
                "exerciseId": "chest-supported-row",
                "displayName": "Chest-Supported Row",
                "sets": 2,
                "repMin": 8,
                "repMax": 10,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 2
              },
              {
                "id": "w2-d1-3",
                "exerciseId": "incline-db-press",
                "displayName": "Incline DB Press",
                "sets": 2,
                "repMin": 8,
                "repMax": 10,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 3
              },
              {
                "id": "w2-d1-4",
                "exerciseId": "lat-pulldown",
                "displayName": "Neutral Pulldown",
                "sets": 2,
                "repMin": 8,
                "repMax": 10,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 4
              },
              {
                "id": "w2-d1-5",
                "exerciseId": "cable-lateral-raise",
                "displayName": "Cable Lateral Raise",
                "sets": 2,
                "repMin": 12,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 5
              },
              {
                "id": "w2-d1-6",
                "exerciseId": "cable-pressdown",
                "displayName": "Rope Pressdown",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 6
              },
              {
                "id": "w2-d1-7",
                "exerciseId": "incline-db-curl",
                "displayName": "Incline DB Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 7
              }
            ]
          },
          {
            "id": "D2",
            "title": "Lower A - Hinge + Arm Support",
            "focus": "Quads, hamstrings, calves, direct arms",
            "prescriptions": [
              {
                "id": "w2-d2-1",
                "exerciseId": "hack-squat-leg-press",
                "displayName": "Hack Squat / Leg Press",
                "sets": 2,
                "repMin": 6,
                "repMax": 8,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 1
              },
              {
                "id": "w2-d2-2",
                "exerciseId": "romanian-deadlift",
                "displayName": "Romanian Deadlift",
                "sets": 2,
                "repMin": 6,
                "repMax": 8,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 2
              },
              {
                "id": "w2-d2-3",
                "exerciseId": "leg-curl",
                "displayName": "Seated Leg Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 3
              },
              {
                "id": "w2-d2-4",
                "exerciseId": "standing-calf-raise",
                "displayName": "Standing Calf Raise",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 4
              },
              {
                "id": "w2-d2-5",
                "exerciseId": "cable-crunch",
                "displayName": "Cable Crunch",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 5
              },
              {
                "id": "w2-d2-6",
                "exerciseId": "preacher-curl",
                "displayName": "Preacher Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 6
              },
              {
                "id": "w2-d2-7",
                "exerciseId": "overhead-cable-extension",
                "displayName": "Overhead Cable Ext.",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 7
              }
            ]
          },
          {
            "id": "D3",
            "title": "Upper B - Chest + Arms",
            "focus": "Upper chest, chest volume, arms",
            "prescriptions": [
              {
                "id": "w2-d3-1",
                "exerciseId": "incline-bar-smith-bench",
                "displayName": "Incline Bar/Smith Bench",
                "sets": 2,
                "repMin": 6,
                "repMax": 8,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 1
              },
              {
                "id": "w2-d3-2",
                "exerciseId": "seated-cable-row",
                "displayName": "Seated Cable Row",
                "sets": 2,
                "repMin": 8,
                "repMax": 10,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 2
              },
              {
                "id": "w2-d3-3",
                "exerciseId": "machine-chest-press",
                "displayName": "Machine Chest Press",
                "sets": 2,
                "repMin": 8,
                "repMax": 10,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 3
              },
              {
                "id": "w2-d3-4",
                "exerciseId": "lat-pulldown",
                "displayName": "Pulldown / Assist Pull-Up",
                "sets": 2,
                "repMin": 8,
                "repMax": 10,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 4
              },
              {
                "id": "w2-d3-5",
                "exerciseId": "cable-fly",
                "displayName": "Cable Fly",
                "sets": 2,
                "repMin": 12,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 5
              },
              {
                "id": "w2-d3-6",
                "exerciseId": "cable-lateral-raise",
                "displayName": "Cable Lateral Raise",
                "sets": 2,
                "repMin": 12,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 6
              },
              {
                "id": "w2-d3-7",
                "exerciseId": "ez-bar-curl",
                "displayName": "EZ-Bar Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 7
              },
              {
                "id": "w2-d3-8",
                "exerciseId": "cable-pressdown",
                "displayName": "Cable Pressdown",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 8
              }
            ]
          },
          {
            "id": "D4",
            "title": "Lower B - Strength + Priority Work",
            "focus": "Posterior chain, unilateral legs, chest/arms",
            "prescriptions": [
              {
                "id": "w2-d4-1",
                "exerciseId": "trap-bar-deadlift",
                "displayName": "Trap-Bar Deadlift",
                "sets": 2,
                "repMin": 5,
                "repMax": 6,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 1
              },
              {
                "id": "w2-d4-2",
                "exerciseId": "bulgarian-split-squat",
                "displayName": "Bulgarian Split Squat",
                "sets": 2,
                "repMin": 8,
                "repMax": 10,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 2
              },
              {
                "id": "w2-d4-3",
                "exerciseId": "leg-extension",
                "displayName": "Leg Extension",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 3
              },
              {
                "id": "w2-d4-4",
                "exerciseId": "leg-curl",
                "displayName": "Leg Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 4
              },
              {
                "id": "w2-d4-5",
                "exerciseId": "seated-calf-raise",
                "displayName": "Seated Calf Raise",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 5
              },
              {
                "id": "w2-d4-6",
                "exerciseId": "cable-fly",
                "displayName": "Cable Fly",
                "sets": 2,
                "repMin": 12,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 6
              },
              {
                "id": "w2-d4-7",
                "exerciseId": "hammer-curl",
                "displayName": "Hammer Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 7
              },
              {
                "id": "w2-d4-8",
                "exerciseId": "single-arm-cable-triceps",
                "displayName": "1-Arm Cable Triceps",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 3,
                "order": 8
              }
            ]
          }
        ]
      },
      {
        "number": 3,
        "block": "Build I",
        "rirLabel": "2-3 RIR",
        "note": "Move to full programmed sets. Keep every repetition controlled.",
        "days": [
          {
            "id": "D1",
            "title": "Upper A - Bench Priority",
            "focus": "Chest strength, balanced pulling, arms",
            "prescriptions": [
              {
                "id": "w3-d1-1",
                "exerciseId": "bench-press",
                "displayName": "Bench Press",
                "sets": 3,
                "repMin": 5,
                "repMax": 8,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 1
              },
              {
                "id": "w3-d1-2",
                "exerciseId": "chest-supported-row",
                "displayName": "Chest-Supported Row",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 2
              },
              {
                "id": "w3-d1-3",
                "exerciseId": "incline-db-press",
                "displayName": "Incline DB Press",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 3
              },
              {
                "id": "w3-d1-4",
                "exerciseId": "lat-pulldown",
                "displayName": "Neutral Pulldown",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 4
              },
              {
                "id": "w3-d1-5",
                "exerciseId": "cable-lateral-raise",
                "displayName": "Cable Lateral Raise",
                "sets": 3,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 5
              },
              {
                "id": "w3-d1-6",
                "exerciseId": "cable-pressdown",
                "displayName": "Rope Pressdown",
                "sets": 3,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 6
              },
              {
                "id": "w3-d1-7",
                "exerciseId": "incline-db-curl",
                "displayName": "Incline DB Curl",
                "sets": 3,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 7
              }
            ]
          },
          {
            "id": "D2",
            "title": "Lower A - Hinge + Arm Support",
            "focus": "Quads, hamstrings, calves, direct arms",
            "prescriptions": [
              {
                "id": "w3-d2-1",
                "exerciseId": "hack-squat-leg-press",
                "displayName": "Hack Squat / Leg Press",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 1
              },
              {
                "id": "w3-d2-2",
                "exerciseId": "romanian-deadlift",
                "displayName": "Romanian Deadlift",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 2
              },
              {
                "id": "w3-d2-3",
                "exerciseId": "leg-curl",
                "displayName": "Seated Leg Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 3
              },
              {
                "id": "w3-d2-4",
                "exerciseId": "standing-calf-raise",
                "displayName": "Standing Calf Raise",
                "sets": 3,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 4
              },
              {
                "id": "w3-d2-5",
                "exerciseId": "cable-crunch",
                "displayName": "Cable Crunch",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 5
              },
              {
                "id": "w3-d2-6",
                "exerciseId": "preacher-curl",
                "displayName": "Preacher Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 6
              },
              {
                "id": "w3-d2-7",
                "exerciseId": "overhead-cable-extension",
                "displayName": "Overhead Cable Ext.",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 7
              }
            ]
          },
          {
            "id": "D3",
            "title": "Upper B - Chest + Arms",
            "focus": "Upper chest, chest volume, arms",
            "prescriptions": [
              {
                "id": "w3-d3-1",
                "exerciseId": "incline-bar-smith-bench",
                "displayName": "Incline Bar/Smith Bench",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 1
              },
              {
                "id": "w3-d3-2",
                "exerciseId": "seated-cable-row",
                "displayName": "Seated Cable Row",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 2
              },
              {
                "id": "w3-d3-3",
                "exerciseId": "machine-chest-press",
                "displayName": "Machine Chest Press",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 3
              },
              {
                "id": "w3-d3-4",
                "exerciseId": "lat-pulldown",
                "displayName": "Pulldown / Assist Pull-Up",
                "sets": 2,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 4
              },
              {
                "id": "w3-d3-5",
                "exerciseId": "cable-fly",
                "displayName": "Cable Fly",
                "sets": 2,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 5
              },
              {
                "id": "w3-d3-6",
                "exerciseId": "cable-lateral-raise",
                "displayName": "Cable Lateral Raise",
                "sets": 3,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 6
              },
              {
                "id": "w3-d3-7",
                "exerciseId": "ez-bar-curl",
                "displayName": "EZ-Bar Curl",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 7
              },
              {
                "id": "w3-d3-8",
                "exerciseId": "cable-pressdown",
                "displayName": "Cable Pressdown",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 8
              }
            ]
          },
          {
            "id": "D4",
            "title": "Lower B - Strength + Priority Work",
            "focus": "Posterior chain, unilateral legs, chest/arms",
            "prescriptions": [
              {
                "id": "w3-d4-1",
                "exerciseId": "trap-bar-deadlift",
                "displayName": "Trap-Bar Deadlift",
                "sets": 2,
                "repMin": 4,
                "repMax": 6,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 1
              },
              {
                "id": "w3-d4-2",
                "exerciseId": "bulgarian-split-squat",
                "displayName": "Bulgarian Split Squat",
                "sets": 2,
                "repMin": 8,
                "repMax": 12,
                "perSide": true,
                "rirMin": 2,
                "rirMax": 3,
                "order": 2
              },
              {
                "id": "w3-d4-3",
                "exerciseId": "leg-extension",
                "displayName": "Leg Extension",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 3
              },
              {
                "id": "w3-d4-4",
                "exerciseId": "leg-curl",
                "displayName": "Leg Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 4
              },
              {
                "id": "w3-d4-5",
                "exerciseId": "seated-calf-raise",
                "displayName": "Seated Calf Raise",
                "sets": 3,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 5
              },
              {
                "id": "w3-d4-6",
                "exerciseId": "cable-fly",
                "displayName": "Cable Fly",
                "sets": 2,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 6
              },
              {
                "id": "w3-d4-7",
                "exerciseId": "hammer-curl",
                "displayName": "Hammer Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 7
              },
              {
                "id": "w3-d4-8",
                "exerciseId": "single-arm-cable-triceps",
                "displayName": "1-Arm Cable Triceps",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 8
              }
            ]
          }
        ]
      },
      {
        "number": 4,
        "block": "Build II",
        "rirLabel": "2 RIR",
        "note": "Continue double progression. Do not chase failure.",
        "days": [
          {
            "id": "D1",
            "title": "Upper A - Bench Priority",
            "focus": "Chest strength, balanced pulling, arms",
            "prescriptions": [
              {
                "id": "w4-d1-1",
                "exerciseId": "bench-press",
                "displayName": "Bench Press",
                "sets": 3,
                "repMin": 5,
                "repMax": 8,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w4-d1-2",
                "exerciseId": "chest-supported-row",
                "displayName": "Chest-Supported Row",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w4-d1-3",
                "exerciseId": "incline-db-press",
                "displayName": "Incline DB Press",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w4-d1-4",
                "exerciseId": "lat-pulldown",
                "displayName": "Neutral Pulldown",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w4-d1-5",
                "exerciseId": "cable-lateral-raise",
                "displayName": "Cable Lateral Raise",
                "sets": 3,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w4-d1-6",
                "exerciseId": "cable-pressdown",
                "displayName": "Rope Pressdown",
                "sets": 3,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w4-d1-7",
                "exerciseId": "incline-db-curl",
                "displayName": "Incline DB Curl",
                "sets": 3,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 7
              }
            ]
          },
          {
            "id": "D2",
            "title": "Lower A - Hinge + Arm Support",
            "focus": "Quads, hamstrings, calves, direct arms",
            "prescriptions": [
              {
                "id": "w4-d2-1",
                "exerciseId": "hack-squat-leg-press",
                "displayName": "Hack Squat / Leg Press",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w4-d2-2",
                "exerciseId": "romanian-deadlift",
                "displayName": "Romanian Deadlift",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w4-d2-3",
                "exerciseId": "leg-curl",
                "displayName": "Seated Leg Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w4-d2-4",
                "exerciseId": "standing-calf-raise",
                "displayName": "Standing Calf Raise",
                "sets": 3,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w4-d2-5",
                "exerciseId": "cable-crunch",
                "displayName": "Cable Crunch",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w4-d2-6",
                "exerciseId": "preacher-curl",
                "displayName": "Preacher Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w4-d2-7",
                "exerciseId": "overhead-cable-extension",
                "displayName": "Overhead Cable Ext.",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 7
              }
            ]
          },
          {
            "id": "D3",
            "title": "Upper B - Chest + Arms",
            "focus": "Upper chest, chest volume, arms",
            "prescriptions": [
              {
                "id": "w4-d3-1",
                "exerciseId": "incline-bar-smith-bench",
                "displayName": "Incline Bar/Smith Bench",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w4-d3-2",
                "exerciseId": "seated-cable-row",
                "displayName": "Seated Cable Row",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w4-d3-3",
                "exerciseId": "machine-chest-press",
                "displayName": "Machine Chest Press",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w4-d3-4",
                "exerciseId": "lat-pulldown",
                "displayName": "Pulldown / Assist Pull-Up",
                "sets": 2,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w4-d3-5",
                "exerciseId": "cable-fly",
                "displayName": "Cable Fly",
                "sets": 2,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w4-d3-6",
                "exerciseId": "cable-lateral-raise",
                "displayName": "Cable Lateral Raise",
                "sets": 3,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w4-d3-7",
                "exerciseId": "ez-bar-curl",
                "displayName": "EZ-Bar Curl",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 7
              },
              {
                "id": "w4-d3-8",
                "exerciseId": "cable-pressdown",
                "displayName": "Cable Pressdown",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 8
              }
            ]
          },
          {
            "id": "D4",
            "title": "Lower B - Strength + Priority Work",
            "focus": "Posterior chain, unilateral legs, chest/arms",
            "prescriptions": [
              {
                "id": "w4-d4-1",
                "exerciseId": "trap-bar-deadlift",
                "displayName": "Trap-Bar Deadlift",
                "sets": 2,
                "repMin": 4,
                "repMax": 6,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w4-d4-2",
                "exerciseId": "bulgarian-split-squat",
                "displayName": "Bulgarian Split Squat",
                "sets": 2,
                "repMin": 8,
                "repMax": 12,
                "perSide": true,
                "rirMin": 2,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w4-d4-3",
                "exerciseId": "leg-extension",
                "displayName": "Leg Extension",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w4-d4-4",
                "exerciseId": "leg-curl",
                "displayName": "Leg Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w4-d4-5",
                "exerciseId": "seated-calf-raise",
                "displayName": "Seated Calf Raise",
                "sets": 3,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w4-d4-6",
                "exerciseId": "cable-fly",
                "displayName": "Cable Fly",
                "sets": 2,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w4-d4-7",
                "exerciseId": "hammer-curl",
                "displayName": "Hammer Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 7
              },
              {
                "id": "w4-d4-8",
                "exerciseId": "single-arm-cable-triceps",
                "displayName": "1-Arm Cable Triceps",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 8
              }
            ]
          }
        ]
      },
      {
        "number": 5,
        "block": "Progress I",
        "rirLabel": "1-2 RIR",
        "note": "Aim to beat one or more prior set performances with clean form.",
        "days": [
          {
            "id": "D1",
            "title": "Upper A - Bench Priority",
            "focus": "Chest strength, balanced pulling, arms",
            "prescriptions": [
              {
                "id": "w5-d1-1",
                "exerciseId": "bench-press",
                "displayName": "Bench Press",
                "sets": 3,
                "repMin": 5,
                "repMax": 8,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w5-d1-2",
                "exerciseId": "chest-supported-row",
                "displayName": "Chest-Supported Row",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w5-d1-3",
                "exerciseId": "incline-db-press",
                "displayName": "Incline DB Press",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w5-d1-4",
                "exerciseId": "lat-pulldown",
                "displayName": "Neutral Pulldown",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w5-d1-5",
                "exerciseId": "cable-lateral-raise",
                "displayName": "Cable Lateral Raise",
                "sets": 3,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w5-d1-6",
                "exerciseId": "cable-pressdown",
                "displayName": "Rope Pressdown",
                "sets": 3,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w5-d1-7",
                "exerciseId": "incline-db-curl",
                "displayName": "Incline DB Curl",
                "sets": 3,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 7
              }
            ]
          },
          {
            "id": "D2",
            "title": "Lower A - Hinge + Arm Support",
            "focus": "Quads, hamstrings, calves, direct arms",
            "prescriptions": [
              {
                "id": "w5-d2-1",
                "exerciseId": "hack-squat-leg-press",
                "displayName": "Hack Squat / Leg Press",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w5-d2-2",
                "exerciseId": "romanian-deadlift",
                "displayName": "Romanian Deadlift",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w5-d2-3",
                "exerciseId": "leg-curl",
                "displayName": "Seated Leg Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w5-d2-4",
                "exerciseId": "standing-calf-raise",
                "displayName": "Standing Calf Raise",
                "sets": 3,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w5-d2-5",
                "exerciseId": "cable-crunch",
                "displayName": "Cable Crunch",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w5-d2-6",
                "exerciseId": "preacher-curl",
                "displayName": "Preacher Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w5-d2-7",
                "exerciseId": "overhead-cable-extension",
                "displayName": "Overhead Cable Ext.",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 7
              }
            ]
          },
          {
            "id": "D3",
            "title": "Upper B - Chest + Arms",
            "focus": "Upper chest, chest volume, arms",
            "prescriptions": [
              {
                "id": "w5-d3-1",
                "exerciseId": "incline-bar-smith-bench",
                "displayName": "Incline Bar/Smith Bench",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w5-d3-2",
                "exerciseId": "seated-cable-row",
                "displayName": "Seated Cable Row",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w5-d3-3",
                "exerciseId": "machine-chest-press",
                "displayName": "Machine Chest Press",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w5-d3-4",
                "exerciseId": "lat-pulldown",
                "displayName": "Pulldown / Assist Pull-Up",
                "sets": 2,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w5-d3-5",
                "exerciseId": "cable-fly",
                "displayName": "Cable Fly",
                "sets": 2,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w5-d3-6",
                "exerciseId": "cable-lateral-raise",
                "displayName": "Cable Lateral Raise",
                "sets": 3,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w5-d3-7",
                "exerciseId": "ez-bar-curl",
                "displayName": "EZ-Bar Curl",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 7
              },
              {
                "id": "w5-d3-8",
                "exerciseId": "cable-pressdown",
                "displayName": "Cable Pressdown",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 8
              }
            ]
          },
          {
            "id": "D4",
            "title": "Lower B - Strength + Priority Work",
            "focus": "Posterior chain, unilateral legs, chest/arms",
            "prescriptions": [
              {
                "id": "w5-d4-1",
                "exerciseId": "trap-bar-deadlift",
                "displayName": "Trap-Bar Deadlift",
                "sets": 2,
                "repMin": 4,
                "repMax": 6,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w5-d4-2",
                "exerciseId": "bulgarian-split-squat",
                "displayName": "Bulgarian Split Squat",
                "sets": 2,
                "repMin": 8,
                "repMax": 12,
                "perSide": true,
                "rirMin": 1,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w5-d4-3",
                "exerciseId": "leg-extension",
                "displayName": "Leg Extension",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w5-d4-4",
                "exerciseId": "leg-curl",
                "displayName": "Leg Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w5-d4-5",
                "exerciseId": "seated-calf-raise",
                "displayName": "Seated Calf Raise",
                "sets": 3,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w5-d4-6",
                "exerciseId": "cable-fly",
                "displayName": "Cable Fly",
                "sets": 2,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w5-d4-7",
                "exerciseId": "hammer-curl",
                "displayName": "Hammer Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 7
              },
              {
                "id": "w5-d4-8",
                "exerciseId": "single-arm-cable-triceps",
                "displayName": "1-Arm Cable Triceps",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 8
              }
            ]
          }
        ]
      },
      {
        "number": 6,
        "block": "Progress II",
        "rirLabel": "1-2 RIR",
        "note": "Add load only after earning the top of the rep range.",
        "days": [
          {
            "id": "D1",
            "title": "Upper A - Bench Priority",
            "focus": "Chest strength, balanced pulling, arms",
            "prescriptions": [
              {
                "id": "w6-d1-1",
                "exerciseId": "bench-press",
                "displayName": "Bench Press",
                "sets": 3,
                "repMin": 5,
                "repMax": 8,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w6-d1-2",
                "exerciseId": "chest-supported-row",
                "displayName": "Chest-Supported Row",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w6-d1-3",
                "exerciseId": "incline-db-press",
                "displayName": "Incline DB Press",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w6-d1-4",
                "exerciseId": "lat-pulldown",
                "displayName": "Neutral Pulldown",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w6-d1-5",
                "exerciseId": "cable-lateral-raise",
                "displayName": "Cable Lateral Raise",
                "sets": 3,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w6-d1-6",
                "exerciseId": "cable-pressdown",
                "displayName": "Rope Pressdown",
                "sets": 3,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w6-d1-7",
                "exerciseId": "incline-db-curl",
                "displayName": "Incline DB Curl",
                "sets": 3,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 7
              }
            ]
          },
          {
            "id": "D2",
            "title": "Lower A - Hinge + Arm Support",
            "focus": "Quads, hamstrings, calves, direct arms",
            "prescriptions": [
              {
                "id": "w6-d2-1",
                "exerciseId": "hack-squat-leg-press",
                "displayName": "Hack Squat / Leg Press",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w6-d2-2",
                "exerciseId": "romanian-deadlift",
                "displayName": "Romanian Deadlift",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w6-d2-3",
                "exerciseId": "leg-curl",
                "displayName": "Seated Leg Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w6-d2-4",
                "exerciseId": "standing-calf-raise",
                "displayName": "Standing Calf Raise",
                "sets": 3,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w6-d2-5",
                "exerciseId": "cable-crunch",
                "displayName": "Cable Crunch",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w6-d2-6",
                "exerciseId": "preacher-curl",
                "displayName": "Preacher Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w6-d2-7",
                "exerciseId": "overhead-cable-extension",
                "displayName": "Overhead Cable Ext.",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 7
              }
            ]
          },
          {
            "id": "D3",
            "title": "Upper B - Chest + Arms",
            "focus": "Upper chest, chest volume, arms",
            "prescriptions": [
              {
                "id": "w6-d3-1",
                "exerciseId": "incline-bar-smith-bench",
                "displayName": "Incline Bar/Smith Bench",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w6-d3-2",
                "exerciseId": "seated-cable-row",
                "displayName": "Seated Cable Row",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w6-d3-3",
                "exerciseId": "machine-chest-press",
                "displayName": "Machine Chest Press",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w6-d3-4",
                "exerciseId": "lat-pulldown",
                "displayName": "Pulldown / Assist Pull-Up",
                "sets": 2,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w6-d3-5",
                "exerciseId": "cable-fly",
                "displayName": "Cable Fly",
                "sets": 2,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w6-d3-6",
                "exerciseId": "cable-lateral-raise",
                "displayName": "Cable Lateral Raise",
                "sets": 3,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w6-d3-7",
                "exerciseId": "ez-bar-curl",
                "displayName": "EZ-Bar Curl",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 7
              },
              {
                "id": "w6-d3-8",
                "exerciseId": "cable-pressdown",
                "displayName": "Cable Pressdown",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 8
              }
            ]
          },
          {
            "id": "D4",
            "title": "Lower B - Strength + Priority Work",
            "focus": "Posterior chain, unilateral legs, chest/arms",
            "prescriptions": [
              {
                "id": "w6-d4-1",
                "exerciseId": "trap-bar-deadlift",
                "displayName": "Trap-Bar Deadlift",
                "sets": 2,
                "repMin": 4,
                "repMax": 6,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w6-d4-2",
                "exerciseId": "bulgarian-split-squat",
                "displayName": "Bulgarian Split Squat",
                "sets": 2,
                "repMin": 8,
                "repMax": 12,
                "perSide": true,
                "rirMin": 1,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w6-d4-3",
                "exerciseId": "leg-extension",
                "displayName": "Leg Extension",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w6-d4-4",
                "exerciseId": "leg-curl",
                "displayName": "Leg Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w6-d4-5",
                "exerciseId": "seated-calf-raise",
                "displayName": "Seated Calf Raise",
                "sets": 3,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w6-d4-6",
                "exerciseId": "cable-fly",
                "displayName": "Cable Fly",
                "sets": 2,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w6-d4-7",
                "exerciseId": "hammer-curl",
                "displayName": "Hammer Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 7
              },
              {
                "id": "w6-d4-8",
                "exerciseId": "single-arm-cable-triceps",
                "displayName": "1-Arm Cable Triceps",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 8
              }
            ]
          }
        ]
      },
      {
        "number": 7,
        "block": "Progress III",
        "rirLabel": "1-2 RIR",
        "note": "Hardest accumulation week. Keep compounds shy of failure.",
        "days": [
          {
            "id": "D1",
            "title": "Upper A - Bench Priority",
            "focus": "Chest strength, balanced pulling, arms",
            "prescriptions": [
              {
                "id": "w7-d1-1",
                "exerciseId": "bench-press",
                "displayName": "Bench Press",
                "sets": 3,
                "repMin": 5,
                "repMax": 8,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w7-d1-2",
                "exerciseId": "chest-supported-row",
                "displayName": "Chest-Supported Row",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w7-d1-3",
                "exerciseId": "incline-db-press",
                "displayName": "Incline DB Press",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w7-d1-4",
                "exerciseId": "lat-pulldown",
                "displayName": "Neutral Pulldown",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w7-d1-5",
                "exerciseId": "cable-lateral-raise",
                "displayName": "Cable Lateral Raise",
                "sets": 3,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w7-d1-6",
                "exerciseId": "cable-pressdown",
                "displayName": "Rope Pressdown",
                "sets": 3,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w7-d1-7",
                "exerciseId": "incline-db-curl",
                "displayName": "Incline DB Curl",
                "sets": 3,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 7
              }
            ]
          },
          {
            "id": "D2",
            "title": "Lower A - Hinge + Arm Support",
            "focus": "Quads, hamstrings, calves, direct arms",
            "prescriptions": [
              {
                "id": "w7-d2-1",
                "exerciseId": "hack-squat-leg-press",
                "displayName": "Hack Squat / Leg Press",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w7-d2-2",
                "exerciseId": "romanian-deadlift",
                "displayName": "Romanian Deadlift",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w7-d2-3",
                "exerciseId": "leg-curl",
                "displayName": "Seated Leg Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w7-d2-4",
                "exerciseId": "standing-calf-raise",
                "displayName": "Standing Calf Raise",
                "sets": 3,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w7-d2-5",
                "exerciseId": "cable-crunch",
                "displayName": "Cable Crunch",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w7-d2-6",
                "exerciseId": "preacher-curl",
                "displayName": "Preacher Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w7-d2-7",
                "exerciseId": "overhead-cable-extension",
                "displayName": "Overhead Cable Ext.",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 7
              }
            ]
          },
          {
            "id": "D3",
            "title": "Upper B - Chest + Arms",
            "focus": "Upper chest, chest volume, arms",
            "prescriptions": [
              {
                "id": "w7-d3-1",
                "exerciseId": "incline-bar-smith-bench",
                "displayName": "Incline Bar/Smith Bench",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w7-d3-2",
                "exerciseId": "seated-cable-row",
                "displayName": "Seated Cable Row",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w7-d3-3",
                "exerciseId": "machine-chest-press",
                "displayName": "Machine Chest Press",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w7-d3-4",
                "exerciseId": "lat-pulldown",
                "displayName": "Pulldown / Assist Pull-Up",
                "sets": 2,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w7-d3-5",
                "exerciseId": "cable-fly",
                "displayName": "Cable Fly",
                "sets": 2,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w7-d3-6",
                "exerciseId": "cable-lateral-raise",
                "displayName": "Cable Lateral Raise",
                "sets": 3,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w7-d3-7",
                "exerciseId": "ez-bar-curl",
                "displayName": "EZ-Bar Curl",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 7
              },
              {
                "id": "w7-d3-8",
                "exerciseId": "cable-pressdown",
                "displayName": "Cable Pressdown",
                "sets": 3,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 8
              }
            ]
          },
          {
            "id": "D4",
            "title": "Lower B - Strength + Priority Work",
            "focus": "Posterior chain, unilateral legs, chest/arms",
            "prescriptions": [
              {
                "id": "w7-d4-1",
                "exerciseId": "trap-bar-deadlift",
                "displayName": "Trap-Bar Deadlift",
                "sets": 2,
                "repMin": 4,
                "repMax": 6,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w7-d4-2",
                "exerciseId": "bulgarian-split-squat",
                "displayName": "Bulgarian Split Squat",
                "sets": 2,
                "repMin": 8,
                "repMax": 12,
                "perSide": true,
                "rirMin": 1,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w7-d4-3",
                "exerciseId": "leg-extension",
                "displayName": "Leg Extension",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w7-d4-4",
                "exerciseId": "leg-curl",
                "displayName": "Leg Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w7-d4-5",
                "exerciseId": "seated-calf-raise",
                "displayName": "Seated Calf Raise",
                "sets": 3,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w7-d4-6",
                "exerciseId": "cable-fly",
                "displayName": "Cable Fly",
                "sets": 2,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w7-d4-7",
                "exerciseId": "hammer-curl",
                "displayName": "Hammer Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 7
              },
              {
                "id": "w7-d4-8",
                "exerciseId": "single-arm-cable-triceps",
                "displayName": "1-Arm Cable Triceps",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 8
              }
            ]
          }
        ]
      },
      {
        "number": 8,
        "block": "Pivot",
        "rirLabel": "3-4 RIR",
        "note": "Reduce volume and load about 5-10%. Leave the gym fresher than you arrived.",
        "days": [
          {
            "id": "D1",
            "title": "Upper A - Bench Priority",
            "focus": "Chest strength, balanced pulling, arms",
            "prescriptions": [
              {
                "id": "w8-d1-1",
                "exerciseId": "bench-press",
                "displayName": "Bench Press",
                "sets": 2,
                "repMin": 6,
                "repMax": 8,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 1
              },
              {
                "id": "w8-d1-2",
                "exerciseId": "chest-supported-row",
                "displayName": "Chest-Supported Row",
                "sets": 2,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 2
              },
              {
                "id": "w8-d1-3",
                "exerciseId": "incline-db-press",
                "displayName": "Incline DB Press",
                "sets": 2,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 3
              },
              {
                "id": "w8-d1-4",
                "exerciseId": "lat-pulldown",
                "displayName": "Neutral Pulldown",
                "sets": 2,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 4
              },
              {
                "id": "w8-d1-5",
                "exerciseId": "cable-lateral-raise",
                "displayName": "Cable Lateral Raise",
                "sets": 2,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 5
              },
              {
                "id": "w8-d1-6",
                "exerciseId": "cable-pressdown",
                "displayName": "Rope Pressdown",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 6
              },
              {
                "id": "w8-d1-7",
                "exerciseId": "incline-db-curl",
                "displayName": "Incline DB Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 7
              }
            ]
          },
          {
            "id": "D2",
            "title": "Lower A - Hinge + Arm Support",
            "focus": "Quads, hamstrings, calves, direct arms",
            "prescriptions": [
              {
                "id": "w8-d2-1",
                "exerciseId": "hack-squat-leg-press",
                "displayName": "Hack Squat / Leg Press",
                "sets": 2,
                "repMin": 6,
                "repMax": 8,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 1
              },
              {
                "id": "w8-d2-2",
                "exerciseId": "romanian-deadlift",
                "displayName": "Romanian Deadlift",
                "sets": 2,
                "repMin": 6,
                "repMax": 8,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 2
              },
              {
                "id": "w8-d2-3",
                "exerciseId": "leg-curl",
                "displayName": "Seated Leg Curl",
                "sets": 1,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 3
              },
              {
                "id": "w8-d2-4",
                "exerciseId": "standing-calf-raise",
                "displayName": "Standing Calf Raise",
                "sets": 2,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 4
              },
              {
                "id": "w8-d2-5",
                "exerciseId": "cable-crunch",
                "displayName": "Cable Crunch",
                "sets": 1,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 5
              },
              {
                "id": "w8-d2-6",
                "exerciseId": "preacher-curl",
                "displayName": "Preacher Curl",
                "sets": 1,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 6
              },
              {
                "id": "w8-d2-7",
                "exerciseId": "overhead-cable-extension",
                "displayName": "Overhead Cable Ext.",
                "sets": 1,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 7
              }
            ]
          },
          {
            "id": "D3",
            "title": "Upper B - Chest + Arms",
            "focus": "Upper chest, chest volume, arms",
            "prescriptions": [
              {
                "id": "w8-d3-1",
                "exerciseId": "incline-bar-smith-bench",
                "displayName": "Incline Bar/Smith Bench",
                "sets": 2,
                "repMin": 6,
                "repMax": 8,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 1
              },
              {
                "id": "w8-d3-2",
                "exerciseId": "seated-cable-row",
                "displayName": "Seated Cable Row",
                "sets": 2,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 2
              },
              {
                "id": "w8-d3-3",
                "exerciseId": "machine-chest-press",
                "displayName": "Machine Chest Press",
                "sets": 2,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 3
              },
              {
                "id": "w8-d3-4",
                "exerciseId": "lat-pulldown",
                "displayName": "Pulldown / Assist Pull-Up",
                "sets": 1,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 4
              },
              {
                "id": "w8-d3-5",
                "exerciseId": "cable-fly",
                "displayName": "Cable Fly",
                "sets": 1,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 5
              },
              {
                "id": "w8-d3-6",
                "exerciseId": "cable-lateral-raise",
                "displayName": "Cable Lateral Raise",
                "sets": 2,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 6
              },
              {
                "id": "w8-d3-7",
                "exerciseId": "ez-bar-curl",
                "displayName": "EZ-Bar Curl",
                "sets": 2,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 7
              },
              {
                "id": "w8-d3-8",
                "exerciseId": "cable-pressdown",
                "displayName": "Cable Pressdown",
                "sets": 2,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 8
              }
            ]
          },
          {
            "id": "D4",
            "title": "Lower B - Strength + Priority Work",
            "focus": "Posterior chain, unilateral legs, chest/arms",
            "prescriptions": [
              {
                "id": "w8-d4-1",
                "exerciseId": "trap-bar-deadlift",
                "displayName": "Trap-Bar Deadlift",
                "sets": 1,
                "repMin": 4,
                "repMax": 6,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 1
              },
              {
                "id": "w8-d4-2",
                "exerciseId": "bulgarian-split-squat",
                "displayName": "Bulgarian Split Squat",
                "sets": 1,
                "repMin": 8,
                "repMax": 12,
                "perSide": true,
                "rirMin": 3,
                "rirMax": 4,
                "order": 2
              },
              {
                "id": "w8-d4-3",
                "exerciseId": "leg-extension",
                "displayName": "Leg Extension",
                "sets": 1,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 3
              },
              {
                "id": "w8-d4-4",
                "exerciseId": "leg-curl",
                "displayName": "Leg Curl",
                "sets": 1,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 4
              },
              {
                "id": "w8-d4-5",
                "exerciseId": "seated-calf-raise",
                "displayName": "Seated Calf Raise",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 5
              },
              {
                "id": "w8-d4-6",
                "exerciseId": "cable-fly",
                "displayName": "Cable Fly",
                "sets": 1,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 6
              },
              {
                "id": "w8-d4-7",
                "exerciseId": "hammer-curl",
                "displayName": "Hammer Curl",
                "sets": 1,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 7
              },
              {
                "id": "w8-d4-8",
                "exerciseId": "single-arm-cable-triceps",
                "displayName": "1-Arm Cable Triceps",
                "sets": 1,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 3,
                "rirMax": 4,
                "order": 8
              }
            ]
          }
        ]
      },
      {
        "number": 9,
        "block": "Strength-Hypertrophy I",
        "rirLabel": "2 RIR",
        "note": "Heavier primary lifts; accessories remain controlled and repeatable.",
        "days": [
          {
            "id": "D1",
            "title": "Upper A - Bench Priority",
            "focus": "Chest strength, balanced pulling, arms",
            "prescriptions": [
              {
                "id": "w9-d1-1",
                "exerciseId": "bench-press",
                "displayName": "Bench Press",
                "sets": 3,
                "repMin": 4,
                "repMax": 6,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w9-d1-2",
                "exerciseId": "chest-supported-row",
                "displayName": "Chest-Supported Row",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w9-d1-3",
                "exerciseId": "incline-db-press",
                "displayName": "Incline DB Press",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w9-d1-4",
                "exerciseId": "lat-pulldown",
                "displayName": "Neutral Pulldown",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w9-d1-5",
                "exerciseId": "cable-lateral-raise",
                "displayName": "Cable Lateral Raise",
                "sets": 3,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w9-d1-6",
                "exerciseId": "cable-pressdown",
                "displayName": "Rope Pressdown",
                "sets": 3,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w9-d1-7",
                "exerciseId": "incline-db-curl",
                "displayName": "Incline DB Curl",
                "sets": 3,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 7
              }
            ]
          },
          {
            "id": "D2",
            "title": "Lower A - Hinge + Arm Support",
            "focus": "Quads, hamstrings, calves, direct arms",
            "prescriptions": [
              {
                "id": "w9-d2-1",
                "exerciseId": "hack-squat-leg-press",
                "displayName": "Hack Squat / Leg Press",
                "sets": 3,
                "repMin": 5,
                "repMax": 8,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w9-d2-2",
                "exerciseId": "romanian-deadlift",
                "displayName": "Romanian Deadlift",
                "sets": 3,
                "repMin": 5,
                "repMax": 8,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w9-d2-3",
                "exerciseId": "leg-curl",
                "displayName": "Seated Leg Curl",
                "sets": 2,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w9-d2-4",
                "exerciseId": "standing-calf-raise",
                "displayName": "Standing Calf Raise",
                "sets": 3,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w9-d2-5",
                "exerciseId": "cable-crunch",
                "displayName": "Cable Crunch",
                "sets": 2,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w9-d2-6",
                "exerciseId": "preacher-curl",
                "displayName": "Preacher Curl",
                "sets": 2,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w9-d2-7",
                "exerciseId": "overhead-cable-extension",
                "displayName": "Overhead Cable Ext.",
                "sets": 2,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 7
              }
            ]
          },
          {
            "id": "D3",
            "title": "Upper B - Chest + Arms",
            "focus": "Upper chest, chest volume, arms",
            "prescriptions": [
              {
                "id": "w9-d3-1",
                "exerciseId": "incline-bar-smith-bench",
                "displayName": "Incline Bar/Smith Bench",
                "sets": 3,
                "repMin": 5,
                "repMax": 8,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w9-d3-2",
                "exerciseId": "seated-cable-row",
                "displayName": "Seated Cable Row",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w9-d3-3",
                "exerciseId": "machine-chest-press",
                "displayName": "Machine Chest Press",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w9-d3-4",
                "exerciseId": "lat-pulldown",
                "displayName": "Pulldown / Assist Pull-Up",
                "sets": 2,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w9-d3-5",
                "exerciseId": "cable-fly",
                "displayName": "Cable Fly",
                "sets": 2,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w9-d3-6",
                "exerciseId": "cable-lateral-raise",
                "displayName": "Cable Lateral Raise",
                "sets": 3,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w9-d3-7",
                "exerciseId": "ez-bar-curl",
                "displayName": "EZ-Bar Curl",
                "sets": 3,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 7
              },
              {
                "id": "w9-d3-8",
                "exerciseId": "cable-pressdown",
                "displayName": "Cable Pressdown",
                "sets": 3,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 8
              }
            ]
          },
          {
            "id": "D4",
            "title": "Lower B - Strength + Priority Work",
            "focus": "Posterior chain, unilateral legs, chest/arms",
            "prescriptions": [
              {
                "id": "w9-d4-1",
                "exerciseId": "trap-bar-deadlift",
                "displayName": "Trap-Bar Deadlift",
                "sets": 3,
                "repMin": 3,
                "repMax": 5,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w9-d4-2",
                "exerciseId": "bulgarian-split-squat",
                "displayName": "Bulgarian Split Squat",
                "sets": 2,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w9-d4-3",
                "exerciseId": "leg-extension",
                "displayName": "Leg Extension",
                "sets": 2,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w9-d4-4",
                "exerciseId": "leg-curl",
                "displayName": "Leg Curl",
                "sets": 2,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w9-d4-5",
                "exerciseId": "seated-calf-raise",
                "displayName": "Seated Calf Raise",
                "sets": 3,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w9-d4-6",
                "exerciseId": "cable-fly",
                "displayName": "Cable Fly",
                "sets": 2,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w9-d4-7",
                "exerciseId": "hammer-curl",
                "displayName": "Hammer Curl",
                "sets": 2,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 7
              },
              {
                "id": "w9-d4-8",
                "exerciseId": "single-arm-cable-triceps",
                "displayName": "1-Arm Cable Triceps",
                "sets": 2,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 2,
                "order": 8
              }
            ]
          }
        ]
      },
      {
        "number": 10,
        "block": "Strength-Hypertrophy II",
        "rirLabel": "1-2 RIR",
        "note": "Progress primary lifts without sacrificing bar path or range.",
        "days": [
          {
            "id": "D1",
            "title": "Upper A - Bench Priority",
            "focus": "Chest strength, balanced pulling, arms",
            "prescriptions": [
              {
                "id": "w10-d1-1",
                "exerciseId": "bench-press",
                "displayName": "Bench Press",
                "sets": 3,
                "repMin": 4,
                "repMax": 6,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w10-d1-2",
                "exerciseId": "chest-supported-row",
                "displayName": "Chest-Supported Row",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w10-d1-3",
                "exerciseId": "incline-db-press",
                "displayName": "Incline DB Press",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w10-d1-4",
                "exerciseId": "lat-pulldown",
                "displayName": "Neutral Pulldown",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w10-d1-5",
                "exerciseId": "cable-lateral-raise",
                "displayName": "Cable Lateral Raise",
                "sets": 3,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w10-d1-6",
                "exerciseId": "cable-pressdown",
                "displayName": "Rope Pressdown",
                "sets": 3,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w10-d1-7",
                "exerciseId": "incline-db-curl",
                "displayName": "Incline DB Curl",
                "sets": 3,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 7
              }
            ]
          },
          {
            "id": "D2",
            "title": "Lower A - Hinge + Arm Support",
            "focus": "Quads, hamstrings, calves, direct arms",
            "prescriptions": [
              {
                "id": "w10-d2-1",
                "exerciseId": "hack-squat-leg-press",
                "displayName": "Hack Squat / Leg Press",
                "sets": 3,
                "repMin": 5,
                "repMax": 8,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w10-d2-2",
                "exerciseId": "romanian-deadlift",
                "displayName": "Romanian Deadlift",
                "sets": 3,
                "repMin": 5,
                "repMax": 8,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w10-d2-3",
                "exerciseId": "leg-curl",
                "displayName": "Seated Leg Curl",
                "sets": 2,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w10-d2-4",
                "exerciseId": "standing-calf-raise",
                "displayName": "Standing Calf Raise",
                "sets": 3,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w10-d2-5",
                "exerciseId": "cable-crunch",
                "displayName": "Cable Crunch",
                "sets": 2,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w10-d2-6",
                "exerciseId": "preacher-curl",
                "displayName": "Preacher Curl",
                "sets": 2,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w10-d2-7",
                "exerciseId": "overhead-cable-extension",
                "displayName": "Overhead Cable Ext.",
                "sets": 2,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 7
              }
            ]
          },
          {
            "id": "D3",
            "title": "Upper B - Chest + Arms",
            "focus": "Upper chest, chest volume, arms",
            "prescriptions": [
              {
                "id": "w10-d3-1",
                "exerciseId": "incline-bar-smith-bench",
                "displayName": "Incline Bar/Smith Bench",
                "sets": 3,
                "repMin": 5,
                "repMax": 8,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w10-d3-2",
                "exerciseId": "seated-cable-row",
                "displayName": "Seated Cable Row",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w10-d3-3",
                "exerciseId": "machine-chest-press",
                "displayName": "Machine Chest Press",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w10-d3-4",
                "exerciseId": "lat-pulldown",
                "displayName": "Pulldown / Assist Pull-Up",
                "sets": 2,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w10-d3-5",
                "exerciseId": "cable-fly",
                "displayName": "Cable Fly",
                "sets": 2,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w10-d3-6",
                "exerciseId": "cable-lateral-raise",
                "displayName": "Cable Lateral Raise",
                "sets": 3,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w10-d3-7",
                "exerciseId": "ez-bar-curl",
                "displayName": "EZ-Bar Curl",
                "sets": 3,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 7
              },
              {
                "id": "w10-d3-8",
                "exerciseId": "cable-pressdown",
                "displayName": "Cable Pressdown",
                "sets": 3,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 8
              }
            ]
          },
          {
            "id": "D4",
            "title": "Lower B - Strength + Priority Work",
            "focus": "Posterior chain, unilateral legs, chest/arms",
            "prescriptions": [
              {
                "id": "w10-d4-1",
                "exerciseId": "trap-bar-deadlift",
                "displayName": "Trap-Bar Deadlift",
                "sets": 3,
                "repMin": 3,
                "repMax": 5,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w10-d4-2",
                "exerciseId": "bulgarian-split-squat",
                "displayName": "Bulgarian Split Squat",
                "sets": 2,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w10-d4-3",
                "exerciseId": "leg-extension",
                "displayName": "Leg Extension",
                "sets": 2,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w10-d4-4",
                "exerciseId": "leg-curl",
                "displayName": "Leg Curl",
                "sets": 2,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w10-d4-5",
                "exerciseId": "seated-calf-raise",
                "displayName": "Seated Calf Raise",
                "sets": 3,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w10-d4-6",
                "exerciseId": "cable-fly",
                "displayName": "Cable Fly",
                "sets": 2,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w10-d4-7",
                "exerciseId": "hammer-curl",
                "displayName": "Hammer Curl",
                "sets": 2,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 7
              },
              {
                "id": "w10-d4-8",
                "exerciseId": "single-arm-cable-triceps",
                "displayName": "1-Arm Cable Triceps",
                "sets": 2,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 8
              }
            ]
          }
        ]
      },
      {
        "number": 11,
        "block": "Strength-Hypertrophy III",
        "rirLabel": "1-2 RIR",
        "note": "Peak training week. No true 1RM testing and no grinders.",
        "days": [
          {
            "id": "D1",
            "title": "Upper A - Bench Priority",
            "focus": "Chest strength, balanced pulling, arms",
            "prescriptions": [
              {
                "id": "w11-d1-1",
                "exerciseId": "bench-press",
                "displayName": "Bench Press",
                "sets": 3,
                "repMin": 4,
                "repMax": 6,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w11-d1-2",
                "exerciseId": "chest-supported-row",
                "displayName": "Chest-Supported Row",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w11-d1-3",
                "exerciseId": "incline-db-press",
                "displayName": "Incline DB Press",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w11-d1-4",
                "exerciseId": "lat-pulldown",
                "displayName": "Neutral Pulldown",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w11-d1-5",
                "exerciseId": "cable-lateral-raise",
                "displayName": "Cable Lateral Raise",
                "sets": 3,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w11-d1-6",
                "exerciseId": "cable-pressdown",
                "displayName": "Rope Pressdown",
                "sets": 3,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w11-d1-7",
                "exerciseId": "incline-db-curl",
                "displayName": "Incline DB Curl",
                "sets": 3,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 7
              }
            ]
          },
          {
            "id": "D2",
            "title": "Lower A - Hinge + Arm Support",
            "focus": "Quads, hamstrings, calves, direct arms",
            "prescriptions": [
              {
                "id": "w11-d2-1",
                "exerciseId": "hack-squat-leg-press",
                "displayName": "Hack Squat / Leg Press",
                "sets": 3,
                "repMin": 5,
                "repMax": 8,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w11-d2-2",
                "exerciseId": "romanian-deadlift",
                "displayName": "Romanian Deadlift",
                "sets": 3,
                "repMin": 5,
                "repMax": 8,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w11-d2-3",
                "exerciseId": "leg-curl",
                "displayName": "Seated Leg Curl",
                "sets": 2,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w11-d2-4",
                "exerciseId": "standing-calf-raise",
                "displayName": "Standing Calf Raise",
                "sets": 3,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w11-d2-5",
                "exerciseId": "cable-crunch",
                "displayName": "Cable Crunch",
                "sets": 2,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w11-d2-6",
                "exerciseId": "preacher-curl",
                "displayName": "Preacher Curl",
                "sets": 2,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w11-d2-7",
                "exerciseId": "overhead-cable-extension",
                "displayName": "Overhead Cable Ext.",
                "sets": 2,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 7
              }
            ]
          },
          {
            "id": "D3",
            "title": "Upper B - Chest + Arms",
            "focus": "Upper chest, chest volume, arms",
            "prescriptions": [
              {
                "id": "w11-d3-1",
                "exerciseId": "incline-bar-smith-bench",
                "displayName": "Incline Bar/Smith Bench",
                "sets": 3,
                "repMin": 5,
                "repMax": 8,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w11-d3-2",
                "exerciseId": "seated-cable-row",
                "displayName": "Seated Cable Row",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w11-d3-3",
                "exerciseId": "machine-chest-press",
                "displayName": "Machine Chest Press",
                "sets": 3,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w11-d3-4",
                "exerciseId": "lat-pulldown",
                "displayName": "Pulldown / Assist Pull-Up",
                "sets": 2,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w11-d3-5",
                "exerciseId": "cable-fly",
                "displayName": "Cable Fly",
                "sets": 2,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w11-d3-6",
                "exerciseId": "cable-lateral-raise",
                "displayName": "Cable Lateral Raise",
                "sets": 3,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w11-d3-7",
                "exerciseId": "ez-bar-curl",
                "displayName": "EZ-Bar Curl",
                "sets": 3,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 7
              },
              {
                "id": "w11-d3-8",
                "exerciseId": "cable-pressdown",
                "displayName": "Cable Pressdown",
                "sets": 3,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 8
              }
            ]
          },
          {
            "id": "D4",
            "title": "Lower B - Strength + Priority Work",
            "focus": "Posterior chain, unilateral legs, chest/arms",
            "prescriptions": [
              {
                "id": "w11-d4-1",
                "exerciseId": "trap-bar-deadlift",
                "displayName": "Trap-Bar Deadlift",
                "sets": 3,
                "repMin": 3,
                "repMax": 5,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 1
              },
              {
                "id": "w11-d4-2",
                "exerciseId": "bulgarian-split-squat",
                "displayName": "Bulgarian Split Squat",
                "sets": 2,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 2
              },
              {
                "id": "w11-d4-3",
                "exerciseId": "leg-extension",
                "displayName": "Leg Extension",
                "sets": 2,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 3
              },
              {
                "id": "w11-d4-4",
                "exerciseId": "leg-curl",
                "displayName": "Leg Curl",
                "sets": 2,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 4
              },
              {
                "id": "w11-d4-5",
                "exerciseId": "seated-calf-raise",
                "displayName": "Seated Calf Raise",
                "sets": 3,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 5
              },
              {
                "id": "w11-d4-6",
                "exerciseId": "cable-fly",
                "displayName": "Cable Fly",
                "sets": 2,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 6
              },
              {
                "id": "w11-d4-7",
                "exerciseId": "hammer-curl",
                "displayName": "Hammer Curl",
                "sets": 2,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 7
              },
              {
                "id": "w11-d4-8",
                "exerciseId": "single-arm-cable-triceps",
                "displayName": "1-Arm Cable Triceps",
                "sets": 2,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 1,
                "rirMax": 2,
                "order": 8
              }
            ]
          }
        ]
      },
      {
        "number": 12,
        "block": "Consolidate",
        "rirLabel": "2-3 RIR",
        "note": "Compare rep quality and estimated strength, then finish recovered.",
        "days": [
          {
            "id": "D1",
            "title": "Upper A - Bench Priority",
            "focus": "Chest strength, balanced pulling, arms",
            "prescriptions": [
              {
                "id": "w12-d1-1",
                "exerciseId": "bench-press",
                "displayName": "Bench Press",
                "sets": 2,
                "repMin": 5,
                "repMax": 8,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 1
              },
              {
                "id": "w12-d1-2",
                "exerciseId": "chest-supported-row",
                "displayName": "Chest-Supported Row",
                "sets": 2,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 2
              },
              {
                "id": "w12-d1-3",
                "exerciseId": "incline-db-press",
                "displayName": "Incline DB Press",
                "sets": 2,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 3
              },
              {
                "id": "w12-d1-4",
                "exerciseId": "lat-pulldown",
                "displayName": "Neutral Pulldown",
                "sets": 2,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 4
              },
              {
                "id": "w12-d1-5",
                "exerciseId": "cable-lateral-raise",
                "displayName": "Cable Lateral Raise",
                "sets": 2,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 5
              },
              {
                "id": "w12-d1-6",
                "exerciseId": "cable-pressdown",
                "displayName": "Rope Pressdown",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 6
              },
              {
                "id": "w12-d1-7",
                "exerciseId": "incline-db-curl",
                "displayName": "Incline DB Curl",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 7
              }
            ]
          },
          {
            "id": "D2",
            "title": "Lower A - Hinge + Arm Support",
            "focus": "Quads, hamstrings, calves, direct arms",
            "prescriptions": [
              {
                "id": "w12-d2-1",
                "exerciseId": "hack-squat-leg-press",
                "displayName": "Hack Squat / Leg Press",
                "sets": 2,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 1
              },
              {
                "id": "w12-d2-2",
                "exerciseId": "romanian-deadlift",
                "displayName": "Romanian Deadlift",
                "sets": 2,
                "repMin": 6,
                "repMax": 10,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 2
              },
              {
                "id": "w12-d2-3",
                "exerciseId": "leg-curl",
                "displayName": "Seated Leg Curl",
                "sets": 1,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 3
              },
              {
                "id": "w12-d2-4",
                "exerciseId": "standing-calf-raise",
                "displayName": "Standing Calf Raise",
                "sets": 2,
                "repMin": 8,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 4
              },
              {
                "id": "w12-d2-5",
                "exerciseId": "cable-crunch",
                "displayName": "Cable Crunch",
                "sets": 1,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 5
              },
              {
                "id": "w12-d2-6",
                "exerciseId": "preacher-curl",
                "displayName": "Preacher Curl",
                "sets": 1,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 6
              },
              {
                "id": "w12-d2-7",
                "exerciseId": "overhead-cable-extension",
                "displayName": "Overhead Cable Ext.",
                "sets": 1,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 7
              }
            ]
          },
          {
            "id": "D3",
            "title": "Upper B - Chest + Arms",
            "focus": "Upper chest, chest volume, arms",
            "prescriptions": [
              {
                "id": "w12-d3-1",
                "exerciseId": "incline-bar-smith-bench",
                "displayName": "Incline Bar/Smith Bench",
                "sets": 2,
                "repMin": 6,
                "repMax": 8,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 1
              },
              {
                "id": "w12-d3-2",
                "exerciseId": "seated-cable-row",
                "displayName": "Seated Cable Row",
                "sets": 2,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 2
              },
              {
                "id": "w12-d3-3",
                "exerciseId": "machine-chest-press",
                "displayName": "Machine Chest Press",
                "sets": 2,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 3
              },
              {
                "id": "w12-d3-4",
                "exerciseId": "lat-pulldown",
                "displayName": "Pulldown / Assist Pull-Up",
                "sets": 1,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 4
              },
              {
                "id": "w12-d3-5",
                "exerciseId": "cable-fly",
                "displayName": "Cable Fly",
                "sets": 1,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 5
              },
              {
                "id": "w12-d3-6",
                "exerciseId": "cable-lateral-raise",
                "displayName": "Cable Lateral Raise",
                "sets": 2,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 6
              },
              {
                "id": "w12-d3-7",
                "exerciseId": "ez-bar-curl",
                "displayName": "EZ-Bar Curl",
                "sets": 2,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 7
              },
              {
                "id": "w12-d3-8",
                "exerciseId": "cable-pressdown",
                "displayName": "Cable Pressdown",
                "sets": 2,
                "repMin": 8,
                "repMax": 12,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 8
              }
            ]
          },
          {
            "id": "D4",
            "title": "Lower B - Strength + Priority Work",
            "focus": "Posterior chain, unilateral legs, chest/arms",
            "prescriptions": [
              {
                "id": "w12-d4-1",
                "exerciseId": "trap-bar-deadlift",
                "displayName": "Trap-Bar Deadlift",
                "sets": 1,
                "repMin": 4,
                "repMax": 6,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 1
              },
              {
                "id": "w12-d4-2",
                "exerciseId": "bulgarian-split-squat",
                "displayName": "Bulgarian Split Squat",
                "sets": 1,
                "repMin": 8,
                "repMax": 12,
                "perSide": true,
                "rirMin": 2,
                "rirMax": 3,
                "order": 2
              },
              {
                "id": "w12-d4-3",
                "exerciseId": "leg-extension",
                "displayName": "Leg Extension",
                "sets": 1,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 3
              },
              {
                "id": "w12-d4-4",
                "exerciseId": "leg-curl",
                "displayName": "Leg Curl",
                "sets": 1,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 4
              },
              {
                "id": "w12-d4-5",
                "exerciseId": "seated-calf-raise",
                "displayName": "Seated Calf Raise",
                "sets": 2,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 5
              },
              {
                "id": "w12-d4-6",
                "exerciseId": "cable-fly",
                "displayName": "Cable Fly",
                "sets": 1,
                "repMin": 12,
                "repMax": 20,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 6
              },
              {
                "id": "w12-d4-7",
                "exerciseId": "hammer-curl",
                "displayName": "Hammer Curl",
                "sets": 1,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 7
              },
              {
                "id": "w12-d4-8",
                "exerciseId": "single-arm-cable-triceps",
                "displayName": "1-Arm Cable Triceps",
                "sets": 1,
                "repMin": 10,
                "repMax": 15,
                "perSide": false,
                "rirMin": 2,
                "rirMax": 3,
                "order": 8
              }
            ]
          }
        ]
      }
    ],
    "description": "Four-day whole-body upper/lower structure with chest and arm priority, reduced re-entry volume, a W8 pivot, heavier W9-W11 work, and W12 consolidation."
  }
};
  if (typeof module !== "undefined" && module.exports) module.exports = data;
  global.BlueprintData = data;
})(typeof globalThis !== "undefined" ? globalThis : this);
