(function (global) {
  'use strict';

  const D = global.BlueprintData || (typeof require !== 'undefined' ? require('./data.js') : null);
  if (!D) throw new Error('BlueprintData is required before core.js');

  const STORAGE_KEY = 'blueprint_workout_app_state_v1';
  const GROUP_ALIASES = {
    chest: 'Chest', pec: 'Chest', pecs: 'Chest',
    back: 'Back', lat: 'Back', lats: 'Back', row: 'Back',
    shoulder: 'Shoulders', shoulders: 'Shoulders', delt: 'Shoulders', delts: 'Shoulders',
    arm: 'Arms', arms: 'Arms', bicep: 'Arms', biceps: 'Arms', tricep: 'Arms', triceps: 'Arms', forearm: 'Arms', forearms: 'Arms',
    leg: 'Legs', legs: 'Legs', quad: 'Legs', quads: 'Legs', hamstring: 'Legs', hamstrings: 'Legs', glute: 'Legs', glutes: 'Legs', calf: 'Legs', calves: 'Legs',
    core: 'Core', abs: 'Core', abdominal: 'Core', trunk: 'Core'
  };

  function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function uid(prefix) {
    const rand = Math.random().toString(36).slice(2, 9);
    const time = Date.now().toString(36);
    return `${prefix || 'id'}-${time}-${rand}`;
  }

  function isoDate(date) {
    const d = date instanceof Date ? date : new Date(date);
    if (Number.isNaN(d.getTime())) return '';
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function todayISO() {
    return isoDate(new Date());
  }

  function parseISODate(s) {
    if (!s) return null;
    const [y, m, d] = String(s).split('-').map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d, 12, 0, 0, 0);
  }

  function startOfWeek(date, mondayFirst = true) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const day = d.getDay();
    const delta = mondayFirst ? (day === 0 ? -6 : 1 - day) : -day;
    d.setDate(d.getDate() + delta);
    return d;
  }

  function endOfWeek(date, mondayFirst = true) {
    const d = startOfWeek(date, mondayFirst);
    d.setDate(d.getDate() + 6);
    d.setHours(23, 59, 59, 999);
    return d;
  }

  function formatDuration(seconds) {
    const s = Math.max(0, Math.round(Number(seconds) || 0));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h) return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    return `${m}:${String(sec).padStart(2, '0')}`;
  }

  function roundToIncrement(value, increment) {
    const n = Number(value);
    const inc = Number(increment) || 1;
    if (!Number.isFinite(n)) return null;
    return Math.round(n / inc) * inc;
  }

  function defaultState() {
    const cycle = deepClone(D.DEFAULT_CYCLE);
    cycle.createdAt = new Date().toISOString();
    return {
      schemaVersion: D.APP_VERSION,
      profile: {
        name: '',
        unit: 'lb',
        currentWeight: 276,
        goalWeight: '',
        calories: 2300,
        protein: 200,
        carbs: 218,
        fat: 70,
        weekStartsMonday: true,
        defaultWeek: 1,
        defaultDay: 'D1',
        theme: 'dark'
      },
      settings: {
        autoStartRest: true,
        vibration: true,
        sound: true,
        sessionAutoResume: true,
        defaultDeemphasis: 'Legs'
      },
      exercises: deepClone(D.DEFAULT_EXERCISES),
      cycles: [cycle],
      activeCycleId: cycle.id,
      sessions: [],
      gymVisits: [],
      weighIns: [],
      measurements: [],
      nutritionTargets: [{
        id: uid('macro'),
        effectiveDate: todayISO(),
        calories: 2300,
        protein: 200,
        carbs: 218,
        fat: 70,
        note: 'Starting target'
      }],
      activeSessionId: null,
      activeTimer: null,
      restTimer: null,
      ui: {
        selectedWeek: 1,
        selectedDay: 'D1',
        selectedVolumeWeek: 1,
        selectedCalendarMonth: todayISO().slice(0, 7)
      }
    };
  }

  function migrateState(raw) {
    if (!raw || typeof raw !== 'object') return defaultState();
    const base = defaultState();
    const out = Object.assign(base, raw);
    out.profile = Object.assign(base.profile, raw.profile || {});
    out.settings = Object.assign(base.settings, raw.settings || {});
    out.ui = Object.assign(base.ui, raw.ui || {});
    out.exercises = Array.isArray(raw.exercises) && raw.exercises.length ? raw.exercises : base.exercises;
    out.cycles = Array.isArray(raw.cycles) && raw.cycles.length ? raw.cycles : base.cycles;
    out.sessions = Array.isArray(raw.sessions) ? raw.sessions : [];
    out.gymVisits = Array.isArray(raw.gymVisits) ? raw.gymVisits : [];
    out.weighIns = Array.isArray(raw.weighIns) ? raw.weighIns : [];
    out.measurements = Array.isArray(raw.measurements) ? raw.measurements : [];
    out.nutritionTargets = Array.isArray(raw.nutritionTargets) && raw.nutritionTargets.length ? raw.nutritionTargets : base.nutritionTargets;
    out.schemaVersion = D.APP_VERSION;
    return out;
  }

  function loadState(storage) {
    try {
      const store = storage || (typeof localStorage !== 'undefined' ? localStorage : null);
      if (!store) return defaultState();
      const raw = store.getItem(STORAGE_KEY);
      return raw ? migrateState(JSON.parse(raw)) : defaultState();
    } catch (err) {
      console.warn('Could not load saved state', err);
      return defaultState();
    }
  }

  function saveState(state, storage) {
    const store = storage || (typeof localStorage !== 'undefined' ? localStorage : null);
    if (!store) return false;
    store.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  }

  function getActiveCycle(state) {
    return state.cycles.find(c => c.id === state.activeCycleId) || state.cycles[0] || null;
  }

  function getCycle(state, cycleId) {
    return state.cycles.find(c => c.id === cycleId) || null;
  }

  function getExercise(state, exerciseId) {
    return state.exercises.find(e => e.id === exerciseId) || null;
  }

  function getWeek(cycle, weekNumber) {
    return cycle && cycle.weeks ? cycle.weeks.find(w => Number(w.number) === Number(weekNumber)) : null;
  }

  function getDay(cycle, weekNumber, dayId) {
    const week = getWeek(cycle, weekNumber);
    return week && week.days ? week.days.find(d => d.id === dayId) : null;
  }

  function prescriptionTargetText(p) {
    return `${p.sets} x ${p.repMin}${p.repMax !== p.repMin ? `-${p.repMax}` : ''}${p.perSide ? '/side' : ''}`;
  }

  function rirText(p) {
    if (Number(p.rirMin) === Number(p.rirMax)) return `${p.rirMin} RIR`;
    return `${p.rirMin}-${p.rirMax} RIR`;
  }

  function currentElapsedSeconds(timer, nowMs) {
    if (!timer) return 0;
    const now = Number(nowMs) || Date.now();
    const start = Number(timer.startedAt) || now;
    const pausedTotal = Number(timer.pausedTotalMs) || 0;
    const livePause = timer.pausedAt ? now - Number(timer.pausedAt) : 0;
    return Math.max(0, Math.floor((now - start - pausedTotal - livePause) / 1000));
  }

  function restRemainingSeconds(timer, nowMs) {
    if (!timer || !timer.endsAt) return 0;
    return Math.max(0, Math.ceil((Number(timer.endsAt) - (Number(nowMs) || Date.now())) / 1000));
  }

  function snapshotMuscles(exercise) {
    return (exercise && exercise.muscles ? exercise.muscles : []).map(x => ({
      muscle: x.muscle,
      credit: Math.max(0, Math.min(1, Number(x.credit) || 0))
    }));
  }

  function createSession(state, cycleId, weekNumber, dayId, date) {
    const cycle = getCycle(state, cycleId);
    const day = getDay(cycle, weekNumber, dayId);
    if (!cycle || !day) throw new Error('Cannot create session: program day not found.');
    const session = {
      id: uid('session'),
      cycleId,
      cycleName: cycle.name,
      week: Number(weekNumber),
      dayId,
      dayTitle: day.title,
      date: date || todayISO(),
      createdAt: new Date().toISOString(),
      startedAt: null,
      completedAt: null,
      durationSec: 0,
      status: 'draft',
      notes: '',
      readiness: '',
      sessionRpe: '',
      exercises: day.prescriptions.map(p => {
        const ex = getExercise(state, p.exerciseId) || { id: p.exerciseId, name: p.displayName || 'Unknown exercise', muscles: [], restSec: 90, increment: 5, category: 'Compound' };
        const suggestion = calculateSuggestion(state, cycleId, weekNumber, dayId, p.exerciseId);
        return {
          prescriptionId: p.id,
          exerciseId: p.exerciseId,
          exerciseName: ex.name,
          displayName: p.displayName || ex.name,
          categorySnapshot: ex.category || 'Compound',
          restSecSnapshot: Number(ex.restSec) || 90,
          incrementSnapshot: Number(ex.increment) || 5,
          musclesSnapshot: snapshotMuscles(ex),
          target: deepClone(p),
          suggestion,
          sets: Array.from({ length: Number(p.sets) || 1 }, (_, idx) => ({
            id: uid('set'),
            number: idx + 1,
            weight: '',
            reps: '',
            rir: '',
            completed: false,
            completedAt: null,
            isExtra: false
          }))
        };
      })
    };
    state.sessions.push(session);
    state.activeSessionId = session.id;
    return session;
  }

  function getSession(state, sessionId) {
    return state.sessions.find(s => s.id === sessionId) || null;
  }

  function findSessionForProgramDay(state, cycleId, weekNumber, dayId) {
    return state.sessions
      .filter(s => s.cycleId === cycleId && Number(s.week) === Number(weekNumber) && s.dayId === dayId && s.status !== 'discarded')
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))[0] || null;
  }

  function completedWorkingSets(sessionExercise) {
    return (sessionExercise && sessionExercise.sets ? sessionExercise.sets : []).filter(s => s.completed && Number(s.reps) > 0);
  }

  function findLastExercisePerformance(state, exerciseId, options) {
    const opts = options || {};
    const before = opts.before ? new Date(opts.before).getTime() : Infinity;
    const skipSessionId = opts.skipSessionId || null;
    const matches = [];
    state.sessions.forEach(session => {
      if (session.id === skipSessionId || session.status !== 'completed') return;
      const completedTime = session.completedAt ? new Date(session.completedAt).getTime() : new Date(session.date).getTime();
      if (completedTime >= before) return;
      session.exercises.forEach(se => {
        if (se.exerciseId !== exerciseId) return;
        const sets = completedWorkingSets(se);
        if (sets.length) matches.push({ session, sessionExercise: se, sets, time: completedTime });
      });
    });
    matches.sort((a, b) => b.time - a.time);
    return matches[0] || null;
  }

  function compareProgramSetCount(cycle, weekNumber, dayId, exerciseId) {
    const currentDay = getDay(cycle, weekNumber, dayId);
    const current = currentDay && currentDay.prescriptions.find(p => p.exerciseId === exerciseId);
    if (!current) return { previous: null, current: null, delta: 0 };
    let previous = null;
    for (let w = Number(weekNumber) - 1; w >= 1; w -= 1) {
      const priorDay = getDay(cycle, w, dayId);
      const p = priorDay && priorDay.prescriptions.find(x => x.exerciseId === exerciseId);
      if (p) { previous = Number(p.sets); break; }
    }
    return { previous, current: Number(current.sets), delta: previous == null ? 0 : Number(current.sets) - previous };
  }

  function calculateSuggestion(state, cycleId, weekNumber, dayId, exerciseId) {
    const cycle = getCycle(state, cycleId);
    const day = getDay(cycle, weekNumber, dayId);
    const p = day && day.prescriptions.find(x => x.exerciseId === exerciseId);
    const ex = getExercise(state, exerciseId);
    if (!p || !ex) return null;
    const prior = findLastExercisePerformance(state, exerciseId);
    const setChange = compareProgramSetCount(cycle, weekNumber, dayId, exerciseId);
    const result = {
      targetSets: Number(p.sets),
      targetRepMin: Number(p.repMin),
      targetRepMax: Number(p.repMax),
      targetRirMin: Number(p.rirMin),
      targetRirMax: Number(p.rirMax),
      setDelta: setChange.delta,
      load: null,
      perSet: [],
      headline: '',
      reason: '',
      confidence: prior ? 'history' : 'new'
    };

    if (!prior) {
      result.headline = `Choose a conservative load for ${prescriptionTargetText(p)}`;
      result.reason = `Start near ${p.repMin} reps while leaving ${rirText(p)}. The program prescribes ${p.sets} set${p.sets === 1 ? '' : 's'} this week.`;
      result.perSet = Array.from({ length: Number(p.sets) }, () => ({ weight: null, reps: Number(p.repMin) }));
      return result;
    }

    const previousSets = prior.sets;
    const completedCount = previousSets.length;
    const weights = previousSets.map(s => Number(s.weight)).filter(Number.isFinite);
    const baseWeight = weights.length ? weights[0] : null;
    const reps = previousSets.map(s => Number(s.reps) || 0);
    const rirs = previousSets.map(s => s.rir === '' || s.rir == null ? null : Number(s.rir));
    const allAtTop = completedCount >= Number(prior.sessionExercise.target.sets || completedCount) && reps.every(r => r >= Number(prior.sessionExercise.target.repMax || p.repMax));
    const allRirAcceptable = rirs.filter(v => v != null).length === 0 || rirs.filter(v => v != null).every(v => v >= Number(p.rirMin));
    const poorPerformance = reps.filter(r => r < Number(p.repMin)).length >= Math.ceil(Math.max(1, completedCount) / 2) || rirs.filter(v => v != null && v <= 0).length >= 2;
    const block = (getWeek(cycle, weekNumber) || {}).block || '';
    const pivot = /pivot/i.test(block);
    const consolidate = /consolidate/i.test(block);
    let suggestedWeight = baseWeight;
    let action = 'hold';

    if (baseWeight != null && pivot) {
      suggestedWeight = roundToIncrement(baseWeight * 0.925, ex.increment);
      action = 'reduce';
      result.headline = `Pivot: ${suggestedWeight} ${state.profile.unit} and ${p.sets} set${p.sets === 1 ? '' : 's'}`;
      result.reason = 'The current week intentionally reduces both volume and load. Leave the gym fresher than you arrived.';
    } else if (baseWeight != null && consolidate) {
      suggestedWeight = roundToIncrement(baseWeight * 0.95, ex.increment);
      action = 'reduce';
      result.headline = `Consolidate: about ${suggestedWeight} ${state.profile.unit} for ${p.sets} set${p.sets === 1 ? '' : 's'}`;
      result.reason = 'Use roughly 5% less than the most recent load if needed to finish at the higher prescribed RIR.';
    } else if (baseWeight != null && allAtTop && allRirAcceptable) {
      suggestedWeight = roundToIncrement(baseWeight + Number(ex.increment || 5), ex.increment);
      action = 'increase';
      result.headline = `Increase to ${suggestedWeight} ${state.profile.unit}; restart near ${p.repMin} reps`;
      result.reason = 'All logged working sets reached the top of the prior range without exceeding the effort target.';
    } else if (baseWeight != null && poorPerformance) {
      suggestedWeight = roundToIncrement(baseWeight * 0.95, ex.increment);
      action = 'reduce';
      result.headline = `Reduce to about ${suggestedWeight} ${state.profile.unit}; rebuild from ${p.repMin} reps`;
      result.reason = 'Multiple sets missed the current minimum or reached failure. A small reset should restore quality.';
    } else if (baseWeight != null) {
      suggestedWeight = baseWeight;
      action = 'hold';
      result.headline = `Hold ${suggestedWeight} ${state.profile.unit}; add a clean rep`;
      result.reason = 'Keep the load and try to improve total repetitions while staying inside the prescribed range and RIR.';
    } else {
      result.headline = `Repeat the movement and aim for ${p.repMin}-${p.repMax} reps`;
      result.reason = 'The previous entry did not include a usable load.';
    }

    for (let i = 0; i < Number(p.sets); i += 1) {
      const prev = previousSets[Math.min(i, previousSets.length - 1)];
      let targetReps = Number(p.repMin);
      if (action === 'hold' && prev) targetReps = Math.min(Number(p.repMax), Math.max(Number(p.repMin), Number(prev.reps || p.repMin) + 1));
      result.perSet.push({ weight: suggestedWeight, reps: targetReps });
    }

    if (setChange.delta > 0) {
      result.reason += ` The program adds ${setChange.delta} set${setChange.delta === 1 ? '' : 's'} versus the prior week.`;
    } else if (setChange.delta < 0) {
      result.reason += ` The program removes ${Math.abs(setChange.delta)} set${setChange.delta === -1 ? '' : 's'} this week to manage fatigue.`;
    }
    result.load = suggestedWeight;
    return result;
  }

  function getMuscleGroup(muscle) {
    return Object.keys(D.MUSCLE_GROUPS).find(group => D.MUSCLE_GROUPS[group].includes(muscle)) || 'Other';
  }

  function sessionInWeek(session, cycleId, weekNumber) {
    return session.cycleId === cycleId && Number(session.week) === Number(weekNumber) && session.status !== 'discarded';
  }

  function calculateWeeklyVolume(state, cycleId, weekNumber, mode) {
    const muscle = {};
    const group = {};
    D.MUSCLES.forEach(m => { muscle[m] = { reps: 0, sets: 0, rawSets: 0 }; });
    Object.keys(D.MUSCLE_GROUPS).forEach(g => { group[g] = { reps: 0, sets: 0, rawSets: 0 }; });
    const cycle = getCycle(state, cycleId);
    const usePlanned = mode === 'planned';

    function add(exercise, reps, setCredit) {
      (exercise.muscles || []).forEach(mc => {
        const credit = Math.max(0, Math.min(1, Number(mc.credit) || 0));
        if (!muscle[mc.muscle]) muscle[mc.muscle] = { reps: 0, sets: 0, rawSets: 0 };
        muscle[mc.muscle].reps += Number(reps) * credit;
        muscle[mc.muscle].sets += Number(setCredit) * credit;
        muscle[mc.muscle].rawSets += Number(setCredit);
        const g = getMuscleGroup(mc.muscle);
        if (!group[g]) group[g] = { reps: 0, sets: 0, rawSets: 0 };
        group[g].reps += Number(reps) * credit;
        group[g].sets += Number(setCredit) * credit;
        group[g].rawSets += Number(setCredit);
      });
    }

    if (usePlanned) {
      const week = getWeek(cycle, weekNumber);
      if (week) week.days.forEach(day => day.prescriptions.forEach(p => {
        const ex = getExercise(state, p.exerciseId);
        if (!ex) return;
        const midpoint = (Number(p.repMin) + Number(p.repMax)) / 2;
        for (let i = 0; i < Number(p.sets); i += 1) add(ex, midpoint, 1);
      }));
    } else {
      state.sessions.filter(s => sessionInWeek(s, cycleId, weekNumber)).forEach(session => {
        session.exercises.forEach(se => {
          const mapping = { muscles: se.musclesSnapshot || (getExercise(state, se.exerciseId) || {}).muscles || [] };
          completedWorkingSets(se).forEach(set => add(mapping, Number(set.reps) || 0, 1));
        });
      });
    }

    const round = obj => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, {
      reps: Math.round(v.reps),
      sets: Math.round(v.sets * 10) / 10,
      rawSets: Math.round(v.rawSets * 10) / 10
    }]));
    return { muscle: round(muscle), group: round(group), mode: usePlanned ? 'planned' : 'completed' };
  }

  function groupCreditsForExercise(exercise) {
    const out = {};
    (exercise.muscles || []).forEach(mc => {
      const g = getMuscleGroup(mc.muscle);
      out[g] = (out[g] || 0) + Number(mc.credit || 0);
    });
    return out;
  }

  function parseFocusText(text) {
    const lower = String(text || '').toLowerCase();
    const focus = new Set();
    const reduce = new Set();
    // Split on punctuation and conjunctions that usually introduce a new instruction.
    const clauses = lower.split(/[.;\n]|\bbut\b|\bwhile\b/).map(x => x.trim()).filter(Boolean);
    clauses.forEach(clause => {
      const isReduce = /\b(reduce|less|deemphas(?:ize|ise)?|minimum|minimal|maintain(?:ing|ed|s)?(?: only)?|cut back)\b/.test(clause);
      const isFocus = /\b(focus|emphas(?:ize|ise)|priority|prioriti[sz]e|more)\b/.test(clause);
      Object.keys(GROUP_ALIASES).forEach(alias => {
        const safe = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        if (!new RegExp(`\\b${safe}\\b`, 'i').test(clause)) return;
        const groupName = GROUP_ALIASES[alias];
        if (isReduce && !isFocus) reduce.add(groupName);
        else focus.add(groupName);
      });
    });
    // Handle phrases such as "focus back and shoulders, reduce legs" by parsing the
    // text segments on each side of a reduction keyword separately.
    const reductionMatch = lower.match(/^(.*?)(?:,|;)?\s*\b(reduce|less|deemphas(?:ize|ise)?|minimum|minimal|maintain(?:ing|ed|s)?(?: only)?|cut back)\b(.*)$/);
    if (reductionMatch) {
      const before = reductionMatch[1];
      const after = reductionMatch[3];
      Object.keys(GROUP_ALIASES).forEach(alias => {
        const safe = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const re = new RegExp(`\\b${safe}\\b`, 'i');
        const groupName = GROUP_ALIASES[alias];
        if (re.test(before)) focus.add(groupName);
        if (re.test(after)) reduce.add(groupName);
      });
    }
    reduce.forEach(g => focus.delete(g));
    return { focus: Array.from(focus), reduce: Array.from(reduce) };
  }

  function fullVolumeTemplate(cycle) {
    const preferred = getWeek(cycle, 5) || getWeek(cycle, 4) || getWeek(cycle, 3) || cycle.weeks[0];
    return deepClone(preferred.days);
  }

  function scaleSets(baseSets, weekNumber) {
    const b = Number(baseSets) || 1;
    if (weekNumber <= 2) return Math.max(1, Math.min(2, b));
    if (weekNumber === 8) return Math.max(1, Math.ceil(b * 0.55));
    if (weekNumber === 12) return Math.max(1, Math.ceil(b * 0.6));
    return b;
  }

  function phaseForWeek(weekNumber) {
    const map = {
      1: ['Re-entry I', 3, 4, 'Use conservative loads and establish repeatable technique.'],
      2: ['Re-entry II', 3, 3, 'Add reps before load and keep soreness manageable.'],
      3: ['Build I', 2, 3, 'Move to full productive volume.'],
      4: ['Build II', 2, 2, 'Continue double progression without chasing failure.'],
      5: ['Progress I', 1, 2, 'Beat one or more prior set performances with clean form.'],
      6: ['Progress II', 1, 2, 'Add load only after earning the top of the range.'],
      7: ['Progress III', 1, 2, 'Hardest accumulation week; keep compounds shy of failure.'],
      8: ['Pivot', 3, 4, 'Reduce set count and load to manage fatigue.'],
      9: ['Strength-Hypertrophy I', 2, 2, 'Use heavier primary work and controlled accessories.'],
      10: ['Strength-Hypertrophy II', 1, 2, 'Progress primary lifts without sacrificing range.'],
      11: ['Strength-Hypertrophy III', 1, 2, 'Peak week without grinders or maximal testing.'],
      12: ['Consolidate', 2, 3, 'Finish recovered and compare performance quality.']
    };
    const x = map[weekNumber];
    return { block: x[0], rirMin: x[1], rirMax: x[2], note: x[3] };
  }

  function adjustRepRangeForPhase(p, ex, weekNumber) {
    const out = deepClone(p);
    if (weekNumber >= 9 && weekNumber <= 11 && ex && ex.category === 'Compound') {
      out.repMin = Math.max(3, Number(out.repMin) - 1);
      out.repMax = Math.max(out.repMin + 1, Number(out.repMax) - 2);
    }
    if (weekNumber === 12 && ex && ex.category === 'Compound') {
      out.repMin = Math.max(4, Number(out.repMin));
    }
    return out;
  }

  function generateRefocusCycle(state, options) {
    const opts = options || {};
    const source = getCycle(state, opts.sourceCycleId || state.activeCycleId);
    if (!source) throw new Error('No source cycle available.');
    const focusGroups = Array.from(new Set((opts.focusGroups || []).filter(g => D.MUSCLE_GROUPS[g])));
    const reduceGroups = Array.from(new Set((opts.reduceGroups || []).filter(g => D.MUSCLE_GROUPS[g] && !focusGroups.includes(g))));
    const templateDays = fullVolumeTemplate(source);

    // Identify the strongest prescriptions for focus and de-emphasis by group credit.
    templateDays.forEach(day => {
      day.prescriptions.forEach(p => {
        const ex = getExercise(state, p.exerciseId);
        p._groupCredits = ex ? groupCreditsForExercise(ex) : {};
      });
      focusGroups.forEach(groupName => {
        const candidates = day.prescriptions
          .filter(p => (p._groupCredits[groupName] || 0) > 0)
          .sort((a, b) => (b._groupCredits[groupName] || 0) - (a._groupCredits[groupName] || 0));
        if (candidates.length) candidates[0]._focusBonus = (candidates[0]._focusBonus || 0) + 1;
      });
      reduceGroups.forEach(groupName => {
        const candidates = day.prescriptions
          .filter(p => (p._groupCredits[groupName] || 0) >= 0.7 && Number(p.sets) > 1 && !(p._focusBonus > 0))
          .sort((a, b) => (b._groupCredits[groupName] || 0) - (a._groupCredits[groupName] || 0));
        if (candidates.length) candidates[candidates.length - 1]._reduce = (candidates[candidates.length - 1]._reduce || 0) + 1;
      });
      // Bring focus work earlier without displacing the first compound lift.
      if (focusGroups.length) {
        const firstFocusIndex = day.prescriptions.findIndex(p => focusGroups.some(g => (p._groupCredits[g] || 0) > 0.7));
        if (firstFocusIndex > 1) {
          const [item] = day.prescriptions.splice(firstFocusIndex, 1);
          day.prescriptions.splice(1, 0, item);
        }
      }
    });

    const weeks = [];
    for (let w = 1; w <= 12; w += 1) {
      const phase = phaseForWeek(w);
      const days = templateDays.map((day, dayIdx) => {
        const upperPriority = focusGroups.filter(g => ['Chest','Back','Shoulders','Arms'].includes(g));
        const lowerPriority = focusGroups.filter(g => ['Legs','Core','Arms'].includes(g));
        const baseLabel = dayIdx % 2 === 0 ? `Upper ${dayIdx === 0 ? 'A' : 'B'}` : `Lower ${dayIdx === 1 ? 'A' : 'B'}`;
        const relevant = dayIdx % 2 === 0 ? upperPriority : lowerPriority;
        const generatedTitle = relevant.length ? `${baseLabel} - ${relevant.join(' + ')} Priority` : day.title;
        return {
        id: day.id || `D${dayIdx + 1}`,
        title: generatedTitle,
        focus: focusGroups.length ? `${focusGroups.join(' + ')} priority` : day.focus,
        prescriptions: day.prescriptions.map((base, idx) => {
          const ex = getExercise(state, base.exerciseId);
          let fullSets = Number(base.sets) + Number(base._focusBonus || 0) - Number(base._reduce || 0);
          fullSets = Math.max(1, Math.min(4, fullSets));
          let scaled = scaleSets(fullSets, w);
          // Re-entry weeks never exceed two sets; pivot/consolidation preserve the drop.
          if (w <= 2) scaled = Math.min(2, scaled);
          let p = Object.assign({}, base, {
            id: `w${w}-d${dayIdx + 1}-${idx + 1}-${uid('rx').slice(-5)}`,
            sets: scaled,
            rirMin: phase.rirMin,
            rirMax: phase.rirMax,
            order: idx + 1
          });
          p = adjustRepRangeForPhase(p, ex, w);
          delete p._groupCredits; delete p._focusBonus; delete p._reduce;
          return p;
        })
      };
      });
      weeks.push({ number: w, block: phase.block, rirLabel: phase.rirMin === phase.rirMax ? `${phase.rirMin} RIR` : `${phase.rirMin}-${phase.rirMax} RIR`, note: phase.note, days });
    }

    return {
      id: uid('cycle'),
      name: opts.name || `${focusGroups.length ? focusGroups.join(' + ') : 'Balanced'} Focus Cycle`,
      createdAt: new Date().toISOString(),
      startDate: opts.startDate || null,
      status: 'draft',
      focusGroups,
      deemphasisGroups: reduceGroups,
      description: `Generated from ${source.name}. Priority: ${focusGroups.join(', ') || 'balanced'}. Reduced emphasis: ${reduceGroups.join(', ') || 'none'}.`,
      weeks
    };
  }

  function replaceExerciseInCycle(state, cycleId, oldExerciseId, newExerciseId, startWeek, scope, dayId) {
    const cycle = getCycle(state, cycleId);
    if (!cycle) return 0;
    let changed = 0;
    const start = Number(startWeek) || 1;
    cycle.weeks.forEach(week => {
      if (scope === 'occurrence' && Number(week.number) !== start) return;
      if (scope !== 'all' && Number(week.number) < start) return;
      week.days.forEach(day => {
        if (dayId && day.id !== dayId) return;
        day.prescriptions.forEach(p => {
          if (p.exerciseId === oldExerciseId) {
            p.exerciseId = newExerciseId;
            const ex = getExercise(state, newExerciseId);
            p.displayName = ex ? ex.name : p.displayName;
            changed += 1;
          }
        });
      });
    });
    return changed;
  }

  function updatePrescription(state, cycleId, weekNumber, dayId, prescriptionId, patch) {
    const day = getDay(getCycle(state, cycleId), weekNumber, dayId);
    if (!day) return false;
    const p = day.prescriptions.find(x => x.id === prescriptionId);
    if (!p) return false;
    Object.assign(p, patch);
    p.sets = Math.max(1, Math.min(8, Number(p.sets) || 1));
    p.repMin = Math.max(1, Number(p.repMin) || 1);
    p.repMax = Math.max(p.repMin, Number(p.repMax) || p.repMin);
    return true;
  }

  function addOrUpdateGymVisit(state, date, patch) {
    const d = date || todayISO();
    let visit = state.gymVisits.find(v => v.date === d && !v.sessionId);
    if (!visit) {
      visit = { id: uid('visit'), date: d, type: 'manual', durationSec: 0, notes: '', createdAt: new Date().toISOString() };
      state.gymVisits.push(visit);
    }
    Object.assign(visit, patch || {});
    return visit;
  }

  function allGymVisits(state) {
    const sessionVisits = state.sessions.filter(s => s.status === 'completed').map(s => ({
      id: `session-${s.id}`,
      date: s.date,
      type: 'session',
      durationSec: Number(s.durationSec) || 0,
      notes: s.dayTitle || '',
      sessionId: s.id
    }));
    return sessionVisits.concat(state.gymVisits || []).sort((a, b) => String(a.date).localeCompare(String(b.date)));
  }

  function timeStats(state, referenceDate) {
    const ref = referenceDate ? new Date(referenceDate) : new Date();
    const weekStart = startOfWeek(ref, state.profile.weekStartsMonday !== false);
    const weekEnd = endOfWeek(ref, state.profile.weekStartsMonday !== false);
    const monthStart = new Date(ref.getFullYear(), ref.getMonth(), 1);
    const monthEnd = new Date(ref.getFullYear(), ref.getMonth() + 1, 0, 23, 59, 59, 999);
    const yearStart = new Date(ref.getFullYear(), 0, 1);
    const yearEnd = new Date(ref.getFullYear(), 11, 31, 23, 59, 59, 999);
    const visits = allGymVisits(state);
    const summarize = (from, to) => {
      const filtered = visits.filter(v => {
        const d = parseISODate(v.date);
        return d && d >= from && d <= to;
      });
      return { count: filtered.length, seconds: filtered.reduce((sum, v) => sum + (Number(v.durationSec) || 0), 0) };
    };
    return {
      week: summarize(weekStart, weekEnd),
      month: summarize(monthStart, monthEnd),
      year: summarize(yearStart, yearEnd),
      all: { count: visits.length, seconds: visits.reduce((sum, v) => sum + (Number(v.durationSec) || 0), 0) }
    };
  }

  function weeklyTimeSeries(state, weeksBack) {
    const count = Number(weeksBack) || 12;
    const out = [];
    const current = startOfWeek(new Date(), state.profile.weekStartsMonday !== false);
    const visits = allGymVisits(state);
    for (let i = count - 1; i >= 0; i -= 1) {
      const start = new Date(current);
      start.setDate(start.getDate() - i * 7);
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      const seconds = visits.filter(v => {
        const d = parseISODate(v.date);
        return d && d >= start && d <= end;
      }).reduce((sum, v) => sum + (Number(v.durationSec) || 0), 0);
      out.push({ start: isoDate(start), label: `${start.getMonth() + 1}/${start.getDate()}`, seconds });
    }
    return out;
  }

  function rollingWeightAverage(state, endDate, days) {
    const end = parseISODate(endDate || todayISO()) || new Date();
    const start = new Date(end);
    start.setDate(start.getDate() - (Number(days) || 7) + 1);
    const values = state.weighIns.filter(w => {
      const d = parseISODate(w.date);
      return d && d >= start && d <= end && Number.isFinite(Number(w.weight));
    }).map(w => Number(w.weight));
    return values.length ? values.reduce((a, b) => a + b, 0) / values.length : null;
  }

  function upsertByDate(collection, date, record) {
    const idx = collection.findIndex(x => x.date === date);
    if (idx >= 0) collection[idx] = Object.assign(collection[idx], record, { date });
    else collection.push(Object.assign({ id: uid('entry'), date }, record));
    collection.sort((a, b) => String(a.date).localeCompare(String(b.date)));
  }

  function csvEscape(value) {
    if (value == null) return '';
    const s = String(value);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  }

  function toCSV(rows) {
    return rows.map(row => row.map(csvEscape).join(',')).join('\n');
  }

  function exportSessionsCSV(state) {
    const rows = [['Date','Cycle','Week','Day','Session duration min','Exercise','Set','Weight','Reps','RIR','Completed']];
    state.sessions.filter(s => s.status === 'completed').forEach(s => {
      s.exercises.forEach(se => se.sets.forEach(set => {
        if (!set.completed) return;
        rows.push([s.date,s.cycleName,s.week,s.dayId,Math.round((Number(s.durationSec)||0)/60),se.exerciseName,set.number,set.weight,set.reps,set.rir,'Yes']);
      }));
    });
    return toCSV(rows);
  }

  function exportWeightsCSV(state) {
    const rows = [['Date','Weight']].concat(state.weighIns.map(w => [w.date,w.weight]));
    return toCSV(rows);
  }

  function exportMeasurementsCSV(state) {
    const rows = [['Date','Weight','Waist','Chest','Arm','Thigh','Hips','Neck','Notes']];
    state.measurements.forEach(m => rows.push([m.date,m.weight,m.waist,m.chest,m.arm,m.thigh,m.hips,m.neck,m.notes]));
    return toCSV(rows);
  }

  function exportVisitsCSV(state) {
    const rows = [['Date','Type','Duration min','Notes']];
    allGymVisits(state).forEach(v => rows.push([v.date,v.type,Math.round((Number(v.durationSec)||0)/60),v.notes]));
    return toCSV(rows);
  }

  function validateState(state) {
    const errors = [];
    if (!state || !Array.isArray(state.exercises)) errors.push('Exercise library is missing.');
    if (!state || !Array.isArray(state.cycles)) errors.push('Program cycles are missing.');
    (state.exercises || []).forEach(ex => {
      if (!ex.id || !ex.name) errors.push('An exercise is missing an id or name.');
      (ex.muscles || []).forEach(mc => {
        if (!D.MUSCLES.includes(mc.muscle)) errors.push(`${ex.name}: unknown muscle ${mc.muscle}.`);
        if (Number(mc.credit) < 0 || Number(mc.credit) > 1) errors.push(`${ex.name}: muscle credit must be 0-1.`);
      });
    });
    (state.cycles || []).forEach(cycle => {
      (cycle.weeks || []).forEach(week => (week.days || []).forEach(day => (day.prescriptions || []).forEach(p => {
        if (!getExercise(state, p.exerciseId)) errors.push(`${cycle.name} W${week.number} ${day.id}: missing exercise ${p.exerciseId}.`);
        if (Number(p.sets) < 1 || Number(p.repMin) < 1 || Number(p.repMax) < Number(p.repMin)) errors.push(`${cycle.name} W${week.number} ${day.id}: invalid prescription.`);
      })));
    });
    return errors;
  }

  const API = {
    DATA: D,
    STORAGE_KEY,
    uid,
    deepClone,
    isoDate,
    todayISO,
    parseISODate,
    startOfWeek,
    endOfWeek,
    formatDuration,
    roundToIncrement,
    defaultState,
    migrateState,
    loadState,
    saveState,
    getActiveCycle,
    getCycle,
    getExercise,
    getWeek,
    getDay,
    prescriptionTargetText,
    rirText,
    currentElapsedSeconds,
    restRemainingSeconds,
    createSession,
    getSession,
    findSessionForProgramDay,
    completedWorkingSets,
    findLastExercisePerformance,
    calculateSuggestion,
    calculateWeeklyVolume,
    getMuscleGroup,
    parseFocusText,
    generateRefocusCycle,
    replaceExerciseInCycle,
    updatePrescription,
    addOrUpdateGymVisit,
    allGymVisits,
    timeStats,
    weeklyTimeSeries,
    rollingWeightAverage,
    upsertByDate,
    exportSessionsCSV,
    exportWeightsCSV,
    exportMeasurementsCSV,
    exportVisitsCSV,
    toCSV,
    validateState
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  global.BlueprintCore = API;
})(typeof globalThis !== 'undefined' ? globalThis : this);
