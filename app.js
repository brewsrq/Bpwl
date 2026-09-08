(function () {
  'use strict';

  const C = window.BlueprintCore;
  let state = C.loadState();
  let currentRoute = 'today';
  let volumeMode = 'completed';
  let installPrompt = null;
  let modalContext = null;
  let tickHandle = null;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = value => String(value == null ? '' : value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  const num = value => value === '' || value == null ? '' : Number(value);
  const fmt1 = value => Number.isFinite(Number(value)) ? Number(value).toFixed(1).replace(/\.0$/, '') : '—';
  const fmtDate = value => {
    const d = C.parseISODate(value);
    return d ? d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
  };
  const fmtMonth = ym => {
    const [y, m] = ym.split('-').map(Number);
    return new Date(y, m - 1, 1).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  };

  function persist(render = false) {
    C.saveState(state);
    if (render) renderAll();
  }

  function toast(message, type) {
    const region = $('#toast-region');
    const el = document.createElement('div');
    el.className = `toast ${type || ''}`;
    el.textContent = message;
    region.appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }

  function openModal(title, html, context) {
    modalContext = context || null;
    $('#modal-title').textContent = title;
    $('#modal-body').innerHTML = html;
    $('#modal-backdrop').classList.remove('hidden');
    $('#modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const focusable = $('#modal-body input:not([type="hidden"]), #modal-body select, #modal-body button');
      if (focusable) focusable.focus({ preventScroll: true });
    }, 50);
  }

  function closeModal() {
    $('#modal-backdrop').classList.add('hidden');
    $('#modal').classList.add('hidden');
    document.body.style.overflow = '';
    modalContext = null;
  }

  function applyTheme() {
    document.body.classList.toggle('light', state.profile.theme === 'light');
    document.querySelector('meta[name="theme-color"]').setAttribute('content', state.profile.theme === 'light' ? '#ffffff' : '#0c1720');
  }

  function routeTo(route) {
    currentRoute = route;
    $$('.view').forEach(v => v.classList.toggle('active', v.dataset.view === route));
    $$('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.route === route));
    renderRoute(route);
    $('#main-content').focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function renderRoute(route) {
    if (route === 'today') renderToday();
    else if (route === 'program') renderProgram();
    else if (route === 'volume') renderVolume();
    else if (route === 'calendar') renderCalendar();
    else renderMore();
    updateHeader();
  }

  function renderAll() {
    applyTheme();
    $$('.view').forEach(v => v.classList.toggle('active', v.dataset.view === currentRoute));
    $$('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.route === currentRoute));
    renderRoute(currentRoute);
    updateTimers();
  }

  function updateHeader() {
    const cycle = C.getActiveCycle(state);
    $('#brand-cycle').textContent = cycle ? cycle.name : 'Workout system';
  }

  function sessionForSelection() {
    const cycle = C.getActiveCycle(state);
    if (!cycle) return null;
    if (state.activeSessionId) {
      const active = C.getSession(state, state.activeSessionId);
      if (active && active.cycleId === cycle.id && Number(active.week) === Number(state.ui.selectedWeek) && active.dayId === state.ui.selectedDay) return active;
    }
    const matches = state.sessions.filter(s => s.cycleId === cycle.id && Number(s.week) === Number(state.ui.selectedWeek) && s.dayId === state.ui.selectedDay && s.status !== 'discarded');
    matches.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    return matches[0] || null;
  }

  function completedDaysForWeek(cycleId, week) {
    return new Set(state.sessions.filter(s => s.cycleId === cycleId && Number(s.week) === Number(week) && s.status === 'completed').map(s => s.dayId));
  }

  function weekCompletionPercent(cycle, week) {
    const done = completedDaysForWeek(cycle.id, week).size;
    const total = (C.getWeek(cycle, week) || { days: [] }).days.length || 4;
    return Math.round((done / total) * 100);
  }

  function renderToday() {
    const root = $('#view-today');
    const cycle = C.getActiveCycle(state);
    if (!cycle) {
      root.innerHTML = '<div class="empty"><strong>No active program</strong>Build or activate a cycle from Program.</div>';
      return;
    }
    const weekNum = Number(state.ui.selectedWeek || 1);
    const week = C.getWeek(cycle, weekNum) || cycle.weeks[0];
    const dayId = state.ui.selectedDay || 'D1';
    const day = C.getDay(cycle, week.number, dayId) || week.days[0];
    state.ui.selectedWeek = week.number;
    state.ui.selectedDay = day.id;
    const session = sessionForSelection();
    const completion = weekCompletionPercent(cycle, week.number);

    const weekPills = cycle.weeks.map(w => `<button class="pill ${w.number === week.number ? 'active' : ''}" data-action="select-week" data-week="${w.number}">W${w.number}</button>`).join('');
    const dayPills = week.days.map(d => {
      const done = completedDaysForWeek(cycle.id, week.number).has(d.id);
      return `<button class="pill ${d.id === day.id ? 'active' : ''}" data-action="select-day" data-day="${esc(d.id)}">${esc(d.id)}${done ? ' ✓' : ''}</button>`;
    }).join('');

    root.innerHTML = `
      <header class="page-header">
        <span class="eyebrow">Current cycle</span>
        <h1>Train and log</h1>
        <p>Targets adjust by week; actual sets, reps, and RIR drive the next-session suggestion.</p>
      </header>
      <div class="pill-row">${weekPills}</div>
      <div class="pill-row">${dayPills}</div>
      <section class="card accent">
        <div class="week-hero">
          <div>
            <span class="badge accent">W${week.number} · ${esc(week.block)}</span>
            <h2>${esc(day.title)}</h2>
            <p>${esc(week.note)}</p>
          </div>
          <div class="progress-ring" style="--p:${completion}"><span>${completion}%</span></div>
        </div>
        <div class="card-actions" style="margin-top:12px">
          <span class="badge">${esc(week.rirLabel)}</span>
          <span class="badge">${day.prescriptions.length} exercises</span>
          <span class="badge">${day.prescriptions.reduce((s,p)=>s+Number(p.sets),0)} sets</span>
        </div>
        ${renderSessionControls(session, cycle, week, day)}
      </section>
      <div class="section-title"><h2>${session ? 'Workout log' : 'Session preview'}</h2><small>${session && session.status === 'completed' ? 'Completed ' + fmtDate(session.date) : C.todayISO()}</small></div>
      <div id="exercise-list">${session ? renderSessionExercises(session) : renderPrescriptionPreview(day)}</div>
      ${session && session.status !== 'completed' ? `
        <section class="card" style="margin-top:12px">
          <div class="field"><label for="session-notes">Session notes</label><textarea id="session-notes" class="textarea" data-input="session-notes" placeholder="Equipment changes, pain-free range, technique cue...">${esc(session.notes || '')}</textarea></div>
        </section>` : ''}
    `;
    persist(false);
  }

  function renderSessionControls(session, cycle, week, day) {
    if (!session) {
      return `<div class="workout-controls">
        <button class="button primary" data-action="start-session">Start session</button>
        <button class="button" data-action="preview-suggestions">View suggestions</button>
      </div>`;
    }
    if (session.status === 'completed') {
      return `<div class="session-banner"><div><small>Completed</small><strong>${C.formatDuration(session.durationSec)}</strong></div><button class="button small" data-action="repeat-session">Repeat</button></div>`;
    }
    const elapsed = state.activeTimer && state.activeTimer.sessionId === session.id ? C.currentElapsedSeconds(state.activeTimer) : Number(session.durationSec) || 0;
    const paused = Boolean(state.activeTimer && state.activeTimer.pausedAt);
    return `<div class="session-banner">
      <div><small>${paused ? 'PAUSED' : session.status === 'draft' ? 'READY' : 'SESSION TIME'}</small><strong data-live-session-time>${C.formatDuration(elapsed)}</strong></div>
      <div class="card-actions">
        ${session.status === 'draft' ? `<button class="button small primary" data-action="start-existing-session">Begin</button>` : `<button class="button small" data-action="${paused ? 'resume-session' : 'pause-session'}">${paused ? 'Resume' : 'Pause'}</button>`}
        <button class="button small secondary" data-action="finish-session">Finish</button>
      </div>
    </div>`;
  }

  function renderPrescriptionPreview(day) {
    return day.prescriptions.map((p, i) => {
      const ex = C.getExercise(state, p.exerciseId);
      return `<article class="card exercise-card">
        <div class="exercise-head"><div class="exercise-index"><span class="exercise-number">${i + 1}</span><div class="exercise-title"><h3>${esc(ex ? ex.name : p.displayName)}</h3><div class="meta"><span class="badge">${C.prescriptionTargetText(p)}</span><span class="badge">${C.rirText(p)}</span></div></div></div><button class="exercise-menu" data-action="prescription-menu" data-prescription="${esc(p.id)}" aria-label="Exercise options">•••</button></div>
      </article>`;
    }).join('');
  }

  function renderSessionExercises(session) {
    return session.exercises.map((se, i) => renderExerciseCard(session, se, i)).join('');
  }

  function renderExerciseCard(session, se, index) {
    const ex = C.getExercise(state, se.exerciseId);
    const suggestion = C.calculateSuggestion(state, session.cycleId, session.week, session.dayId, se.exerciseId) || se.suggestion;
    se.suggestion = suggestion;
    const completed = C.completedWorkingSets(se).length;
    const target = se.target;
    const setRows = se.sets.map((set, idx) => {
      const sug = suggestion && suggestion.perSet ? suggestion.perSet[Math.min(idx, suggestion.perSet.length - 1)] : null;
      const weightPh = sug && sug.weight != null ? String(sug.weight) : 'weight';
      const repsPh = sug && sug.reps != null ? String(sug.reps) : `${target.repMin}-${target.repMax}`;
      return `<div class="set-row ${set.completed ? 'complete' : ''}" data-set-row="${esc(set.id)}">
        <span class="set-number">${set.isExtra ? '+' : idx + 1}</span>
        <input class="set-input" inputmode="decimal" type="number" step="any" min="0" placeholder="${esc(weightPh)}" value="${esc(set.weight)}" data-set-field="weight" data-session="${esc(session.id)}" data-exercise="${esc(se.exerciseId)}" data-set="${esc(set.id)}" aria-label="Set ${idx + 1} weight">
        <input class="set-input" inputmode="numeric" type="number" step="1" min="0" placeholder="${esc(repsPh)}" value="${esc(set.reps)}" data-set-field="reps" data-session="${esc(session.id)}" data-exercise="${esc(se.exerciseId)}" data-set="${esc(set.id)}" aria-label="Set ${idx + 1} reps">
        <input class="set-input" inputmode="numeric" type="number" step="1" min="0" max="10" placeholder="RIR" value="${esc(set.rir)}" data-set-field="rir" data-session="${esc(session.id)}" data-exercise="${esc(se.exerciseId)}" data-set="${esc(set.id)}" aria-label="Set ${idx + 1} repetitions in reserve">
        <button class="complete-set" data-action="toggle-set" data-session="${esc(session.id)}" data-exercise="${esc(se.exerciseId)}" data-set="${esc(set.id)}" aria-label="Mark set ${idx + 1} complete"><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></button>
      </div>`;
    }).join('');
    const setDelta = suggestion && suggestion.setDelta ? `<span class="set-change">${suggestion.setDelta > 0 ? '+' : ''}${suggestion.setDelta} set${Math.abs(suggestion.setDelta) === 1 ? '' : 's'} vs prior week.</span> ` : '';
    return `<article class="card exercise-card" data-exercise-card="${esc(se.exerciseId)}">
      <div class="exercise-head">
        <div class="exercise-index"><span class="exercise-number">${index + 1}</span><div class="exercise-title"><h3>${esc(se.exerciseName || (ex && ex.name) || se.displayName)}</h3><div class="meta"><span class="badge">${C.prescriptionTargetText(target)}</span><span class="badge">${C.rirText(target)}</span><span class="badge ${completed >= Number(target.sets) ? 'success' : ''}">${completed}/${target.sets}</span></div></div></div>
        <button class="exercise-menu" data-action="session-exercise-menu" data-session="${esc(session.id)}" data-exercise="${esc(se.exerciseId)}" aria-label="Exercise options">•••</button>
      </div>
      ${suggestion ? `<div class="suggestion"><strong>${esc(suggestion.headline)}</strong><p>${setDelta}${esc(suggestion.reason)}</p></div>` : ''}
      <div class="set-table"><div class="set-head"><span>Set</span><span>Weight</span><span>Reps</span><span>RIR</span><span>Done</span></div>${setRows}</div>
      <div class="exercise-foot">
        <button class="button small ghost" data-action="apply-load" data-session="${esc(session.id)}" data-exercise="${esc(se.exerciseId)}">Use load</button>
        <button class="button small ghost" data-action="add-set" data-session="${esc(session.id)}" data-exercise="${esc(se.exerciseId)}">+ Set</button>
        <button class="button small ghost" data-action="show-guide" data-exercise="${esc(se.exerciseId)}">Guide</button>
      </div>
    </article>`;
  }

  function renderProgram() {
    const root = $('#view-program');
    const cycle = C.getActiveCycle(state);
    if (!cycle) { root.innerHTML = '<div class="empty"><strong>No program</strong>Create a new cycle.</div>'; return; }
    const weekNum = Number(state.ui.selectedWeek || 1);
    const week = C.getWeek(cycle, weekNum) || cycle.weeks[0];
    const completedSessions = state.sessions.filter(s => s.cycleId === cycle.id && s.status === 'completed').length;
    const weekCells = cycle.weeks.map(w => `<button class="week-cell ${w.number === week.number ? 'active' : ''} ${weekCompletionPercent(cycle,w.number)===100?'complete':''}" data-action="program-week" data-week="${w.number}"><strong>W${w.number}</strong><small>${esc(w.block)}</small></button>`).join('');
    const dayDetails = week.days.map((day, idx) => `<details class="program-day" ${idx === 0 ? 'open' : ''}>
      <summary><div><strong>${esc(day.id)} · ${esc(day.title)}</strong><small>${day.prescriptions.reduce((s,p)=>s+Number(p.sets),0)} working sets</small></div><span class="badge">${day.prescriptions.length}</span></summary>
      <div class="program-day-body">${day.prescriptions.map(p => {
        const ex = C.getExercise(state,p.exerciseId);
        return `<div class="program-row"><div><p><strong>${esc(ex ? ex.name : p.displayName)}</strong></p><small>${C.prescriptionTargetText(p)} · ${C.rirText(p)}</small></div><button class="button small" data-action="prescription-menu" data-prescription="${esc(p.id)}" data-week="${week.number}" data-day="${esc(day.id)}">Edit</button></div>`;
      }).join('')}</div>
    </details>`).join('');
    const drafts = state.cycles.filter(c => c.status === 'draft');

    root.innerHTML = `
      <header class="page-header"><span class="eyebrow">Program control</span><h1>${esc(cycle.name)}</h1><p>${esc(cycle.description || '')}</p></header>
      <section class="card accent">
        <div class="card-header"><div><h2>Cycle status</h2><p>${completedSessions} completed sessions · ${cycle.focusGroups.join(' + ') || 'balanced'} focus</p></div><span class="badge success">ACTIVE</span></div>
        <div class="status-grid" style="margin-top:12px">
          <div class="stat"><small>Current week</small><strong>W${week.number}</strong><em>${esc(week.block)}</em></div>
          <div class="stat"><small>Completion</small><strong>${Math.round(completedSessions / 48 * 100)}%</strong><em>${completedSessions}/48 sessions</em></div>
        </div>
        <div class="workout-controls"><button class="button primary" data-action="build-cycle">Build next cycle</button><button class="button" data-action="cycle-list">All cycles (${state.cycles.length})</button></div>
      </section>
      ${drafts.length ? `<section class="card warning"><div class="card-header"><div><h3>${drafts.length} draft cycle${drafts.length===1?'':'s'}</h3><p>Review or activate when ready.</p></div><button class="button small" data-action="cycle-list">Open</button></div></section>` : ''}
      <div class="section-title"><h2>12-week map</h2><small>Tap a week</small></div>
      <div class="week-grid">${weekCells}</div>
      <section class="card" style="margin-top:12px"><div class="card-header"><div><span class="badge accent">W${week.number}</span><h2 style="margin-top:7px">${esc(week.block)}</h2><p>${esc(week.note)}</p></div><span class="badge">${esc(week.rirLabel)}</span></div></section>
      ${dayDetails}
    `;
  }

  function renderVolume() {
    const root = $('#view-volume');
    const cycle = C.getActiveCycle(state);
    if (!cycle) return;
    const weekNum = Number(state.ui.selectedVolumeWeek || state.ui.selectedWeek || 1);
    const vol = C.calculateWeeklyVolume(state, cycle.id, weekNum, volumeMode);
    const groups = Object.entries(vol.group).filter(([,v]) => v.reps > 0 || volumeMode === 'planned');
    const max = Math.max(1, ...groups.map(([,v]) => v.reps));
    const groupBars = groups.map(([name,v]) => `<div class="bar-row"><label>${esc(name)}</label><div class="bar-track"><div class="bar-fill" style="width:${Math.round(v.reps/max*100)}%"></div></div><span class="bar-value">${v.reps} reps</span></div>`).join('');
    const muscles = Object.entries(vol.muscle).filter(([,v]) => v.reps > 0).sort((a,b)=>b[1].reps-a[1].reps);
    const muscleRows = muscles.length ? muscles.map(([name,v]) => `<tr><td>${esc(name)}</td><td>${v.reps}</td><td>${fmt1(v.sets)}</td><td>${esc(C.getMuscleGroup(name))}</td></tr>`).join('') : '<tr><td colspan="4">No completed sets logged for this week.</td></tr>';
    root.innerHTML = `
      <header class="page-header"><span class="eyebrow">Weekly volume</span><h1>Muscle rep count</h1><p>Each completed rep is credited to the muscles mapped to that exercise. Contribution percentages are editable in the exercise library.</p></header>
      <div class="pill-row">${cycle.weeks.map(w=>`<button class="pill ${w.number===weekNum?'active':''}" data-action="volume-week" data-week="${w.number}">W${w.number}</button>`).join('')}</div>
      <section class="card">
        <div class="volume-toggle"><button class="${volumeMode==='completed'?'active':''}" data-action="volume-mode" data-mode="completed">Completed</button><button class="${volumeMode==='planned'?'active':''}" data-action="volume-mode" data-mode="planned">Planned estimate</button></div>
        <div class="inline-note" style="margin-top:12px">Credited reps and credited sets are workload bookkeeping, not a claim that every involved muscle receives an identical stimulus. Primary muscles usually receive 100% credit; assisting muscles receive partial credit.</div>
      </section>
      <div class="section-title"><h2>Muscle groups</h2><small>${volumeMode === 'planned' ? 'Midpoint rep estimate' : 'Actual completed reps'}</small></div>
      <section class="card"><div class="bar-list">${groupBars || '<div class="empty">No data yet.</div>'}</div></section>
      <div class="section-title"><h2>Individual muscles</h2><small>Reps · weighted sets</small></div>
      <section class="card" style="overflow-x:auto"><table class="volume-table"><thead><tr><th>Muscle</th><th>Reps</th><th>Sets</th><th>Group</th></tr></thead><tbody>${muscleRows}</tbody></table></section>
    `;
  }

  function renderCalendar() {
    const root = $('#view-calendar');
    const ym = state.ui.selectedCalendarMonth || C.todayISO().slice(0,7);
    const [year, month] = ym.split('-').map(Number);
    const first = new Date(year, month - 1, 1);
    const offset = state.profile.weekStartsMonday !== false ? (first.getDay() === 0 ? 6 : first.getDay() - 1) : first.getDay();
    const gridStart = new Date(year, month - 1, 1 - offset);
    const visits = C.allGymVisits(state);
    const visitMap = {};
    visits.forEach(v => { (visitMap[v.date] ||= []).push(v); });
    const weekdays = state.profile.weekStartsMonday !== false ? ['M','T','W','T','F','S','S'] : ['S','M','T','W','T','F','S'];
    const days = [];
    for (let i=0;i<42;i+=1) {
      const d=new Date(gridStart); d.setDate(gridStart.getDate()+i); const iso=C.isoDate(d); const entries=visitMap[iso]||[];
      const sec=entries.reduce((s,v)=>s+(Number(v.durationSec)||0),0);
      days.push(`<button class="calendar-day ${d.getMonth()!==month-1?'outside':''} ${iso===C.todayISO()?'today':''} ${entries.length?'has-gym':''}" data-action="calendar-day" data-date="${iso}"><span class="day-num">${d.getDate()}</span>${entries.length?`<span class="dots">${entries.slice(0,3).map(()=>'<span class="dot"></span>').join('')}</span>${sec?`<span class="time">${Math.round(sec/60)}m</span>`:''}`:''}</button>`);
    }
    const stats=C.timeStats(state);
    const series=C.weeklyTimeSeries(state,12); const maxSec=Math.max(1,...series.map(x=>x.seconds));
    const chart=series.map(x=>`<div class="time-bar-wrap" title="${esc(x.label)}: ${Math.round(x.seconds/60)} minutes"><div class="time-bar" style="height:${Math.max(3,Math.round(x.seconds/maxSec*112))}px"></div><small>${esc(x.label)}</small></div>`).join('');
    root.innerHTML=`
      <header class="page-header"><span class="eyebrow">Attendance and time</span><h1>Gym calendar</h1><p>Completed sessions and manual gym visits are retained for weekly, monthly, yearly, and all-time totals.</p></header>
      <section class="status-grid">
        <div class="stat"><small>This week</small><strong>${C.formatDuration(stats.week.seconds)}</strong><em>${stats.week.count} visit${stats.week.count===1?'':'s'}</em></div>
        <div class="stat"><small>This month</small><strong>${C.formatDuration(stats.month.seconds)}</strong><em>${stats.month.count} visit${stats.month.count===1?'':'s'}</em></div>
        <div class="stat"><small>This year</small><strong>${C.formatDuration(stats.year.seconds)}</strong><em>${stats.year.count} visits</em></div>
        <div class="stat"><small>All time</small><strong>${C.formatDuration(stats.all.seconds)}</strong><em>${stats.all.count} visits</em></div>
      </section>
      <div class="section-title"><h2>Last 12 weeks</h2><small>Session time</small></div><section class="card"><div class="time-chart">${chart}</div></section>
      <div class="section-title"><h2>${fmtMonth(ym)}</h2><button class="button small" data-action="add-gym-visit" data-date="${C.todayISO()}">+ Visit</button></div>
      <section class="card">
        <div class="calendar-toolbar"><button class="icon-button" data-action="calendar-prev" aria-label="Previous month">‹</button><strong>${fmtMonth(ym)}</strong><button class="icon-button" data-action="calendar-next" aria-label="Next month">›</button></div>
        <div class="calendar-grid">${weekdays.map(w=>`<div class="calendar-weekday">${w}</div>`).join('')}${days.join('')}</div>
      </section>`;
  }

  function renderMore() {
    const root=$('#view-more');
    const avg7=C.rollingWeightAverage(state,C.todayISO(),7);
    const macros=state.nutritionTargets.slice().sort((a,b)=>String(b.effectiveDate).localeCompare(String(a.effectiveDate)))[0] || {};
    const activeCount=state.exercises.filter(e=>e.active!==false).length;
    root.innerHTML=`
      <header class="page-header"><span class="eyebrow">Tools and settings</span><h1>Manage your system</h1><p>Edit exercises, update targets, review history, and back up everything stored on this device.</p></header>
      <section class="status-grid">
        <div class="stat"><small>7-day weight</small><strong>${avg7==null?'—':avg7.toFixed(1)}</strong><em>${esc(state.profile.unit)}</em></div>
        <div class="stat"><small>Calories</small><strong>${macros.calories||'—'}</strong><em>${macros.protein||'—'} g protein</em></div>
        <div class="stat"><small>Exercises</small><strong>${activeCount}</strong><em>editable</em></div>
        <div class="stat"><small>Cycles</small><strong>${state.cycles.length}</strong><em>${state.cycles.filter(c=>c.status==='draft').length} draft</em></div>
      </section>
      <div class="section-title"><h2>Log and update</h2></div>
      <section class="card list">
        ${moreRow('exercise-library','Exercise library',`${activeCount} active exercises · muscle credits and alternatives`)}
        ${moreRow('log-progress','Weight and measurements',`${state.weighIns.length} weigh-ins · ${state.measurements.length} measurements`)}
        ${moreRow('macro-targets','Calories and macros',`Current: ${macros.calories||'—'} kcal · ${macros.protein||'—'} g protein`)}
        ${moreRow('time-history','Session time history',`${C.timeStats(state).all.count} recorded gym visits`)}
      </section>
      <div class="section-title"><h2>App and data</h2></div>
      <section class="card list">
        ${moreRow('install-app','Install on phone','Offline-capable home-screen app')}
        ${moreRow('export-data','Backup and Excel exports','JSON backup plus CSV files')}
        ${moreRow('settings','Settings','Theme, timers, units, week layout')}
        ${moreRow('about-app','About and volume method','Privacy, calculations, and limitations')}
      </section>`;
  }

  function moreRow(action,title,sub) {
    return `<button class="list-item" data-action="${action}" style="width:100%;border-left:0;border-right:0;border-top:0;background:transparent;color:inherit;text-align:left"><span class="list-copy"><strong>${esc(title)}</strong><small>${esc(sub)}</small></span><span class="list-chevron">›</span></button>`;
  }

  function goToActiveSession() {
    const active = C.getSession(state, state.activeSessionId);
    if (!active) return false;
    if (active.cycleId !== state.activeCycleId) state.activeCycleId = active.cycleId;
    state.ui.selectedWeek = active.week;
    state.ui.selectedDay = active.dayId;
    routeTo('today');
    return true;
  }

  function canStartSession(session) {
    if (!state.activeSessionId || state.activeSessionId === (session && session.id)) return true;
    toast('Another workout is already running. Finish or pause it before starting a different session.', 'error');
    goToActiveSession();
    return false;
  }

  function startExistingSession(session) {
    if (!session || !canStartSession(session)) return;
    const now=Date.now();
    session.status='in_progress'; session.startedAt=session.startedAt||new Date(now).toISOString();
    state.activeSessionId=session.id;
    state.activeTimer={sessionId:session.id,startedAt:now,pausedAt:null,pausedTotalMs:0};
    persist(true);
  }

  function pauseSession() {
    if (!state.activeTimer || state.activeTimer.pausedAt) return;
    state.activeTimer.pausedAt=Date.now(); persist(true);
  }
  function resumeSession() {
    if (!state.activeTimer || !state.activeTimer.pausedAt) return;
    state.activeTimer.pausedTotalMs=(Number(state.activeTimer.pausedTotalMs)||0)+(Date.now()-Number(state.activeTimer.pausedAt));
    state.activeTimer.pausedAt=null; persist(true);
  }

  function confirmFinishSession() {
    const session=C.getSession(state,state.activeSessionId) || sessionForSelection();
    if (!session || session.status==='completed') return;
    const completed=session.exercises.reduce((s,e)=>s+C.completedWorkingSets(e).length,0);
    openModal('Finish session',`<p>You logged <strong>${completed} completed working sets</strong>.</p>
      <div class="form-grid"><div class="field"><label>Readiness (1-5)</label><input id="finish-readiness" class="input" type="number" min="1" max="5" value="${esc(session.readiness)}"></div><div class="field"><label>Session RPE (1-10)</label><input id="finish-rpe" class="input" type="number" min="1" max="10" value="${esc(session.sessionRpe)}"></div></div>
      <div class="modal-footer"><button class="button" data-action="close-modal">Keep training</button><button class="button primary" data-action="confirm-finish">Finish and save</button></div>`,{type:'finish-session',sessionId:session.id});
  }

  function finishSession() {
    const session=C.getSession(state,modalContext && modalContext.sessionId);
    if (!session) return;
    session.readiness=$('#finish-readiness').value;
    session.sessionRpe=$('#finish-rpe').value;
    session.completedAt=new Date().toISOString();
    session.status='completed';
    if (state.activeTimer && state.activeTimer.sessionId===session.id) session.durationSec=C.currentElapsedSeconds(state.activeTimer);
    else if (!session.durationSec && session.startedAt) session.durationSec=Math.max(0,Math.round((Date.now()-new Date(session.startedAt).getTime())/1000));
    state.activeSessionId=null; state.activeTimer=null; state.restTimer=null;
    closeModal(); persist(true); toast('Workout completed and added to the calendar.','success');
  }

  function startRest(seconds, label) {
    const s=Math.max(15,Number(seconds)||90);
    state.restTimer={endsAt:Date.now()+s*1000,durationSec:s,label:label||'Rest'};
    persist(false); updateTimers();
  }

  function completeSet(actionEl) {
    const session=C.getSession(state,actionEl.dataset.session);
    const se=session && session.exercises.find(e=>e.exerciseId===actionEl.dataset.exercise);
    const set=se && se.sets.find(x=>x.id===actionEl.dataset.set);
    if (!set) return;
    if (!set.completed && !(Number(set.reps)>0)) { toast('Enter the reps completed before checking the set.','error'); return; }
    set.completed=!set.completed; set.completedAt=set.completed?new Date().toISOString():null;
    if (set.completed && state.settings.autoStartRest) startRest(se.restSecSnapshot,se.exerciseName);
    persist(true);
  }

  function applySuggestedLoad(sessionId,exerciseId) {
    const session=C.getSession(state,sessionId); const se=session&&session.exercises.find(e=>e.exerciseId===exerciseId); if(!se)return;
    const sug=C.calculateSuggestion(state,session.cycleId,session.week,session.dayId,exerciseId);
    if(!sug||sug.load==null){toast('No prior load is available yet.','error');return;}
    se.sets.forEach((set,i)=>{if(!set.completed)set.weight=sug.perSet[Math.min(i,sug.perSet.length-1)].weight;});
    persist(true); toast('Suggested load filled. Log actual reps after each set.','success');
  }

  function addSet(sessionId,exerciseId) {
    const session=C.getSession(state,sessionId); const se=session&&session.exercises.find(e=>e.exerciseId===exerciseId); if(!se)return;
    se.sets.push({id:C.uid('set'),number:se.sets.length+1,weight:'',reps:'',rir:'',completed:false,completedAt:null,isExtra:true}); persist(true);
  }

  function updateSetInput(el) {
    const session=C.getSession(state,el.dataset.session); const se=session&&session.exercises.find(e=>e.exerciseId===el.dataset.exercise); const set=se&&se.sets.find(x=>x.id===el.dataset.set); if(!set)return;
    set[el.dataset.setField]=el.value; C.saveState(state);
  }

  function showExerciseGuide(exerciseId) {
    const ex=C.getExercise(state,exerciseId); if(!ex)return;
    const alternatives=(ex.alternatives||[]).map(id=>C.getExercise(state,id)||{id:'',name:id}).filter(a=>a.name);
    openModal(ex.name,`<div class="card soft"><span class="badge accent">${esc(ex.category)}</span><span class="badge">${esc(ex.equipment)}</span><span class="badge">${esc(ex.pattern)}</span><p>${esc(ex.cues||'No technique notes yet.')}</p></div>
      <div class="section-title"><h2>Muscle credits</h2><small>Used for weekly counts</small></div>
      <div class="list">${(ex.muscles||[]).map(m=>`<div class="list-item"><span>${esc(m.muscle)}</span><strong>${Math.round(Number(m.credit)*100)}%</strong></div>`).join('')}</div>
      <div class="section-title"><h2>Alternatives</h2></div><div class="pill-row">${alternatives.length?alternatives.map(a=>a.id?`<button class="pill" data-action="show-guide" data-exercise="${esc(a.id)}">${esc(a.name)}</button>`:`<span class="pill">${esc(a.name)}</span>`).join(''):'<span class="helper">None listed.</span>'}</div>
      <div class="modal-footer"><button class="button" data-action="edit-exercise" data-exercise="${esc(ex.id)}">Edit exercise</button><button class="button primary" data-action="close-modal">Done</button></div>`,{type:'guide',exerciseId});
  }

  function prescriptionMenu(el) {
    const cycle=C.getActiveCycle(state); const weekNum=Number(el.dataset.week||state.ui.selectedWeek); const dayId=el.dataset.day||state.ui.selectedDay; const day=C.getDay(cycle,weekNum,dayId); const p=day&&day.prescriptions.find(x=>x.id===el.dataset.prescription); if(!p)return;
    const ex=C.getExercise(state,p.exerciseId);
    openModal('Program exercise',`<section class="card soft"><h3 style="margin:0">${esc(ex?ex.name:p.displayName)}</h3><p class="helper">W${weekNum} ${esc(dayId)} · ${C.prescriptionTargetText(p)} · ${C.rirText(p)}</p></section>
      <div class="list">
        <button class="list-item" data-action="replace-exercise" data-old-exercise="${esc(p.exerciseId)}" data-prescription="${esc(p.id)}"><span class="list-copy"><strong>Change exercise</strong><small>Keep the same set and rep prescription</small></span><span class="list-chevron">›</span></button>
        <button class="list-item" data-action="edit-prescription" data-prescription="${esc(p.id)}"><span class="list-copy"><strong>Edit sets and reps</strong><small>Change this specific week and day</small></span><span class="list-chevron">›</span></button>
        <button class="list-item" data-action="show-guide" data-exercise="${esc(p.exerciseId)}"><span class="list-copy"><strong>Exercise guide</strong><small>Muscles, alternatives, and cues</small></span><span class="list-chevron">›</span></button>
      </div>`,{type:'prescription-menu',cycleId:cycle.id,week:weekNum,dayId,prescriptionId:p.id,exerciseId:p.exerciseId});
  }

  function sessionExerciseMenu(el) {
    const session=C.getSession(state,el.dataset.session); const se=session&&session.exercises.find(e=>e.exerciseId===el.dataset.exercise); if(!se)return;
    openModal(se.exerciseName,`<div class="list">
      <button class="list-item" data-action="replace-exercise" data-old-exercise="${esc(se.exerciseId)}"><span class="list-copy"><strong>Change for this and future weeks</strong><small>Historical workouts keep their original muscle mapping</small></span><span class="list-chevron">›</span></button>
      <button class="list-item" data-action="edit-prescription" data-prescription="${esc(se.prescriptionId)}"><span class="list-copy"><strong>Edit today's prescription</strong><small>Sets, reps, and RIR</small></span><span class="list-chevron">›</span></button>
      <button class="list-item" data-action="show-guide" data-exercise="${esc(se.exerciseId)}"><span class="list-copy"><strong>Guide and alternatives</strong><small>Technique and volume mapping</small></span><span class="list-chevron">›</span></button>
      ${se.sets.some(s=>s.isExtra&&!s.completed)?`<button class="list-item" data-action="remove-extra-set" data-session="${esc(session.id)}" data-exercise="${esc(se.exerciseId)}"><span class="list-copy"><strong>Remove last extra set</strong><small>Only an incomplete extra set can be removed</small></span><span class="list-chevron">›</span></button>`:''}
    </div>`,{type:'session-exercise-menu',sessionId:session.id,cycleId:session.cycleId,week:session.week,dayId:session.dayId,prescriptionId:se.prescriptionId,exerciseId:se.exerciseId});
  }

  function openReplaceExercise(oldExerciseId) {
    const current=C.getExercise(state,oldExerciseId);
    const options=state.exercises.filter(e=>e.active!==false&&e.id!==oldExerciseId).sort((a,b)=>a.name.localeCompare(b.name)).map(e=>`<option value="${esc(e.id)}">${esc(e.name)} — ${esc(e.pattern)}</option>`).join('');
    openModal('Change exercise',`<div class="field"><label>Replace ${esc(current?current.name:'exercise')} with</label><select id="replacement-exercise" class="select"><option value="">Choose an exercise</option>${options}</select></div>
      <div class="field" style="margin-top:12px"><label>Apply change</label><select id="replacement-scope" class="select"><option value="future">This week and future weeks</option><option value="occurrence">Only this occurrence</option><option value="all">Entire cycle</option></select></div>
      <div class="inline-note" style="margin-top:12px">The replacement's muscle credits will be used for new sessions. Completed history retains its original mapping.</div>
      <div class="modal-footer"><button class="button" data-action="close-modal">Cancel</button><button class="button primary" data-action="confirm-replacement">Replace</button></div>`,Object.assign({},modalContext||{},{type:'replace-exercise',oldExerciseId}));
  }

  function confirmReplacement() {
    const newId=$('#replacement-exercise').value; const scope=$('#replacement-scope').value; const ctx=modalContext; if(!newId||!ctx)return;
    const changed=C.replaceExerciseInCycle(state,ctx.cycleId||state.activeCycleId,ctx.oldExerciseId,newId,ctx.week||state.ui.selectedWeek,scope,scope==='all'?null:(ctx.dayId||state.ui.selectedDay));
    if(ctx.sessionId){
      const session=C.getSession(state,ctx.sessionId); const se=session&&session.exercises.find(e=>e.exerciseId===ctx.oldExerciseId); const ex=C.getExercise(state,newId);
      if(se&&ex){se.exerciseId=newId;se.exerciseName=ex.name;se.displayName=ex.name;se.categorySnapshot=ex.category;se.restSecSnapshot=ex.restSec;se.incrementSnapshot=ex.increment;se.musclesSnapshot=ex.muscles.map(m=>({...m}));se.target.exerciseId=newId;se.suggestion=C.calculateSuggestion(state,session.cycleId,session.week,session.dayId,newId);}
    }
    closeModal();persist(true);toast(`Exercise replaced in ${changed} program occurrence${changed===1?'':'s'}.`,'success');
  }

  function openEditPrescription(prescriptionId) {
    const ctx=modalContext||{}; const cycle=C.getCycle(state,ctx.cycleId||state.activeCycleId); const day=C.getDay(cycle,ctx.week||state.ui.selectedWeek,ctx.dayId||state.ui.selectedDay); const p=day&&day.prescriptions.find(x=>x.id===prescriptionId); if(!p)return;
    openModal('Edit prescription',`<div class="form-grid"><div class="field"><label>Sets</label><input id="rx-sets" class="input" type="number" min="1" max="8" value="${p.sets}"></div><div class="field"><label>Minimum reps</label><input id="rx-min" class="input" type="number" min="1" value="${p.repMin}"></div><div class="field"><label>Maximum reps</label><input id="rx-max" class="input" type="number" min="1" value="${p.repMax}"></div><div class="field"><label>Per side?</label><select id="rx-side" class="select"><option value="false" ${!p.perSide?'selected':''}>No</option><option value="true" ${p.perSide?'selected':''}>Yes</option></select></div><div class="field"><label>Minimum RIR</label><input id="rx-rir-min" class="input" type="number" min="0" max="10" value="${p.rirMin}"></div><div class="field"><label>Maximum RIR</label><input id="rx-rir-max" class="input" type="number" min="0" max="10" value="${p.rirMax}"></div></div>
      <div class="modal-footer"><button class="button" data-action="close-modal">Cancel</button><button class="button primary" data-action="save-prescription">Save</button></div>`,Object.assign({},ctx,{type:'edit-prescription',prescriptionId}));
  }

  function savePrescription() {
    const ctx=modalContext; if(!ctx)return;
    const patch={sets:num($('#rx-sets').value),repMin:num($('#rx-min').value),repMax:num($('#rx-max').value),perSide:$('#rx-side').value==='true',rirMin:num($('#rx-rir-min').value),rirMax:num($('#rx-rir-max').value)};
    C.updatePrescription(state,ctx.cycleId||state.activeCycleId,ctx.week||state.ui.selectedWeek,ctx.dayId||state.ui.selectedDay,ctx.prescriptionId,patch);
    if(ctx.sessionId){const session=C.getSession(state,ctx.sessionId);const se=session&&session.exercises.find(e=>e.prescriptionId===ctx.prescriptionId);if(se){Object.assign(se.target,patch);while(se.sets.length<patch.sets)se.sets.push({id:C.uid('set'),number:se.sets.length+1,weight:'',reps:'',rir:'',completed:false,completedAt:null,isExtra:false});while(se.sets.length>patch.sets&&se.sets[se.sets.length-1]&&!se.sets[se.sets.length-1].completed)se.sets.pop();}}
    closeModal();persist(true);toast('Prescription updated.','success');
  }

  function openCycleBuilder() {
    const prompt='Emphasize back and shoulders; reduce legs.';
    const chips=Object.keys(C.DATA.MUSCLE_GROUPS).map(g=>`<label class="check-row"><input type="checkbox" name="focus-group" value="${esc(g)}"><span>${esc(g)}</span></label>`).join('');
    const reduces=Object.keys(C.DATA.MUSCLE_GROUPS).map(g=>`<label class="check-row"><input type="checkbox" name="reduce-group" value="${esc(g)}" ${g===state.settings.defaultDeemphasis?'checked':''}><span>${esc(g)}</span></label>`).join('');
    openModal('Build the next cycle',`<div class="field"><label>Describe the new focus</label><textarea id="cycle-prompt" class="textarea" placeholder="${esc(prompt)}"></textarea><span class="helper">The offline parser recognizes chest, back, shoulders, arms, legs, and core. You can also use the checkboxes below.</span></div>
      <div class="section-title"><h2>Priority groups</h2></div><div class="form-grid">${chips}</div>
      <div class="section-title"><h2>Reduce to free recovery</h2></div><div class="form-grid">${reduces}</div>
      <div class="field" style="margin-top:14px"><label>Cycle name</label><input id="cycle-name" class="input" placeholder="Back + Shoulders Focus Cycle"></div>
      <div class="inline-note" style="margin-top:12px">The builder clones your current exercise selection, moves priority work earlier, and adjusts weekly sets while preserving the re-entry, pivot, strength-hypertrophy, and consolidation phases. Every generated prescription remains editable.</div>
      <div class="modal-footer"><button class="button" data-action="close-modal">Cancel</button><button class="button primary" data-action="generate-cycle">Generate draft</button></div>`,{type:'cycle-builder'});
  }

  function generateCycle() {
    const parsed=C.parseFocusText($('#cycle-prompt').value);
    const checkedFocus=$$('input[name="focus-group"]:checked',$('#modal-body')).map(x=>x.value);
    const checkedReduce=$$('input[name="reduce-group"]:checked',$('#modal-body')).map(x=>x.value);
    const focus=Array.from(new Set([...parsed.focus,...checkedFocus]));
    const reduce=Array.from(new Set([...parsed.reduce,...checkedReduce])).filter(g=>!focus.includes(g));
    if(!focus.length){toast('Choose at least one priority group.','error');return;}
    const name=$('#cycle-name').value.trim()||`${focus.join(' + ')} Focus Cycle`;
    const cycle=C.generateRefocusCycle(state,{focusGroups:focus,reduceGroups:reduce,name});
    state.cycles.push(cycle); closeModal();persist(true);toast('Draft cycle generated. Open All cycles to review or activate.','success');
  }

  function openCycleList() {
    const rows=state.cycles.map(c=>`<div class="list-item"><div class="list-copy"><strong>${esc(c.name)}</strong><small>${esc(c.status.toUpperCase())} · ${esc(c.focusGroups.join(' + ')||'Balanced')} · created ${fmtDate((c.createdAt||'').slice(0,10))}</small></div><div class="card-actions">${c.id!==state.activeCycleId?`<button class="button small primary" data-action="activate-cycle" data-cycle="${esc(c.id)}">Activate</button>`:'<span class="badge success">Active</span>'}<button class="button small" data-action="rename-cycle" data-cycle="${esc(c.id)}">Edit</button></div></div>`).join('');
    openModal('Program cycles',`<div class="list">${rows}</div><div class="modal-footer"><button class="button primary" data-action="build-cycle">Build new cycle</button></div>`,{type:'cycle-list'});
  }

  function activateCycle(id) {
    state.cycles.forEach(c=>{if(c.status==='active')c.status='archived';}); const cycle=C.getCycle(state,id); if(!cycle)return; cycle.status='active'; state.activeCycleId=id; state.ui.selectedWeek=1; state.ui.selectedDay='D1'; state.ui.selectedVolumeWeek=1; closeModal();persist(true);toast(`${cycle.name} is now active.`,'success');
  }

  function openExerciseLibrary() {
    const list=state.exercises.slice().sort((a,b)=>a.name.localeCompare(b.name)).map(ex=>`<button class="list-item" data-action="edit-exercise" data-exercise="${esc(ex.id)}" style="width:100%;border-left:0;border-right:0;border-top:0;background:transparent;color:inherit;text-align:left;${ex.active===false?'opacity:.5':''}"><span class="list-copy"><strong>${esc(ex.name)}</strong><small>${esc(ex.pattern)} · ${(ex.muscles||[]).map(m=>`${m.muscle} ${Math.round(m.credit*100)}%`).join(', ')}</small></span><span class="list-chevron">›</span></button>`).join('');
    openModal('Exercise library',`<div class="field"><input id="exercise-search" class="input" placeholder="Search exercises" data-input="exercise-search"></div><div id="exercise-library-list" class="list">${list}</div><div class="modal-footer"><button class="button primary" data-action="add-exercise">+ Add exercise</button></div>`,{type:'exercise-library'});
  }

  function renderMuscleCreditRows(muscles) {
    const rows=(muscles&&muscles.length?muscles:[{muscle:'Chest',credit:1}]);
    return rows.map((m,i)=>`<div class="muscle-credit-row" data-credit-row><div class="field"><label>Muscle</label><select class="select" data-credit-muscle>${C.DATA.MUSCLES.map(x=>`<option value="${esc(x)}" ${x===m.muscle?'selected':''}>${esc(x)} (${esc(C.getMuscleGroup(x))})</option>`).join('')}</select></div><div class="field"><label>Credit</label><div class="credit-input-wrap"><input class="input" data-credit-value type="number" min="0" max="100" step="5" value="${Math.round(Number(m.credit)*100)}"><span>%</span></div></div><button class="icon-button" data-action="remove-credit" aria-label="Remove muscle">×</button></div>`).join('');
  }

  function openExerciseEditor(exerciseId) {
    const ex=exerciseId?C.getExercise(state,exerciseId):null; const obj=ex||{id:'',name:'',category:'Compound',equipment:'',pattern:'',restSec:120,increment:5,cues:'',alternatives:[],muscles:[{muscle:'Chest',credit:1}],active:true};
    openModal(ex?'Edit exercise':'Add exercise',`<div class="form-grid"><div class="field span-2"><label>Name</label><input id="ex-name" class="input" value="${esc(obj.name)}"></div><div class="field"><label>Category</label><select id="ex-category" class="select"><option ${obj.category==='Compound'?'selected':''}>Compound</option><option ${obj.category==='Isolation'?'selected':''}>Isolation</option></select></div><div class="field"><label>Equipment</label><input id="ex-equipment" class="input" value="${esc(obj.equipment)}"></div><div class="field"><label>Movement pattern</label><input id="ex-pattern" class="input" value="${esc(obj.pattern)}"></div><div class="field"><label>Default rest (seconds)</label><input id="ex-rest" class="input" type="number" min="15" value="${esc(obj.restSec)}"></div><div class="field"><label>Load increment (${esc(state.profile.unit)})</label><input id="ex-increment" class="input" type="number" min="0" step="0.5" value="${esc(obj.increment)}"></div><div class="field"><label>Status</label><select id="ex-active" class="select"><option value="true" ${obj.active!==false?'selected':''}>Active</option><option value="false" ${obj.active===false?'selected':''}>Archived</option></select></div><div class="field span-2"><label>Technique cues</label><textarea id="ex-cues" class="textarea">${esc(obj.cues||'')}</textarea></div></div>
      <div class="section-title"><h2>Muscle credits</h2><small>Required for weekly rep count</small></div><div id="muscle-credit-list">${renderMuscleCreditRows(obj.muscles)}</div><button class="button small" data-action="add-credit" style="margin-top:10px">+ Muscle</button>
      <div class="field" style="margin-top:14px"><label>Alternative exercise IDs or names (comma separated)</label><input id="ex-alts" class="input" value="${esc((obj.alternatives||[]).join(', '))}"></div>
      <div class="modal-footer"><button class="button" data-action="close-modal">Cancel</button><button class="button primary" data-action="save-exercise">Save exercise</button></div>`,{type:'exercise-editor',exerciseId:exerciseId||null});
  }

  function saveExercise() {
    const name=$('#ex-name').value.trim(); if(!name){toast('Exercise name is required.','error');return;}
    const muscles=$$('[data-credit-row]',$('#modal-body')).map(row=>({muscle:$('[data-credit-muscle]',row).value,credit:Math.max(0,Math.min(1,Number($('[data-credit-value]',row).value||0)/100))})).filter(m=>m.credit>0);
    if(!muscles.length){toast('Add at least one muscle credit above 0%.','error');return;}
    const obj={name,category:$('#ex-category').value,equipment:$('#ex-equipment').value.trim(),pattern:$('#ex-pattern').value.trim(),restSec:Number($('#ex-rest').value)||90,increment:Number($('#ex-increment').value)||0,cues:$('#ex-cues').value.trim(),alternatives:$('#ex-alts').value.split(',').map(x=>x.trim()).filter(Boolean),muscles,active:$('#ex-active').value==='true'};
    if(modalContext.exerciseId){
      Object.assign(C.getExercise(state,modalContext.exerciseId),obj);
      state.sessions.filter(s=>s.status!=='completed'&&s.status!=='discarded').forEach(s=>s.exercises.forEach(se=>{
        if(se.exerciseId===modalContext.exerciseId){
          se.exerciseName=obj.name; se.displayName=obj.name; se.categorySnapshot=obj.category;
          se.restSecSnapshot=obj.restSec; se.incrementSnapshot=obj.increment;
          se.musclesSnapshot=obj.muscles.map(m=>({...m}));
        }
      }));
    }else{obj.id=C.uid('exercise');state.exercises.push(obj);}
    closeModal();persist(true);toast('Exercise saved. Its muscle mapping will count in future sessions.','success');
  }

  function openProgressLog() {
    const recent=state.weighIns.slice().sort((a,b)=>String(b.date).localeCompare(String(a.date))).slice(0,8);
    const measures=state.measurements.slice().sort((a,b)=>String(b.date).localeCompare(String(a.date))).slice(0,5);
    openModal('Weight and measurements',`<div class="form-grid"><div class="field"><label>Date</label><input id="weight-date" class="input" type="date" value="${C.todayISO()}"></div><div class="field"><label>Weight (${esc(state.profile.unit)})</label><input id="weight-value" class="input" type="number" step="0.1" placeholder="276.0"></div></div><button class="button primary block" data-action="save-weight" style="margin-top:10px">Save weigh-in</button>
      <div class="section-title"><h2>Recent weigh-ins</h2><small>7-day avg: ${fmt1(C.rollingWeightAverage(state,C.todayISO(),7))}</small></div><div class="list">${recent.length?recent.map(w=>`<div class="list-item"><span>${fmtDate(w.date)}</span><strong>${fmt1(w.weight)} ${esc(state.profile.unit)}</strong></div>`).join(''):'<div class="empty">No weigh-ins yet.</div>'}</div>
      <div class="divider"></div><div class="form-grid"><div class="field"><label>Measurement date</label><input id="measure-date" class="input" type="date" value="${C.todayISO()}"></div><div class="field"><label>Weight</label><input id="measure-weight" class="input" type="number" step="0.1"></div>${['Waist','Chest','Arm','Thigh','Hips','Neck'].map(x=>`<div class="field"><label>${x}</label><input id="measure-${x.toLowerCase()}" class="input" type="number" step="0.1"></div>`).join('')}<div class="field span-2"><label>Notes</label><input id="measure-notes" class="input"></div></div><button class="button primary block" data-action="save-measurement" style="margin-top:10px">Save measurements</button>
      <div class="section-title"><h2>Recent measurement dates</h2></div><div class="list">${measures.length?measures.map(m=>`<div class="list-item"><span>${fmtDate(m.date)}</span><small>Waist ${fmt1(m.waist)} · Chest ${fmt1(m.chest)} · Arm ${fmt1(m.arm)}</small></div>`).join(''):'<div class="empty">No measurements yet.</div>'}</div>`,{type:'progress-log'});
  }

  function saveWeight() {
    const date=$('#weight-date').value; const weight=Number($('#weight-value').value); if(!date||!Number.isFinite(weight)||weight<=0){toast('Enter a valid date and weight.','error');return;}
    C.upsertByDate(state.weighIns,date,{weight}); state.profile.currentWeight=weight; persist(false); openProgressLog(); toast('Weight saved.','success');
  }
  function saveMeasurement() {
    const date=$('#measure-date').value;if(!date){toast('Choose a date.','error');return;}
    const rec={}; ['weight','waist','chest','arm','thigh','hips','neck'].forEach(k=>{const v=Number($(`#measure-${k}`).value);rec[k]=Number.isFinite(v)&&v>0?v:'';});rec.notes=$('#measure-notes').value.trim();
    C.upsertByDate(state.measurements,date,rec);persist(false);openProgressLog();toast('Measurements saved.','success');
  }

  function openMacroTargets() {
    const current=state.nutritionTargets.slice().sort((a,b)=>String(b.effectiveDate).localeCompare(String(a.effectiveDate)))[0]||{};
    const rows=state.nutritionTargets.slice().sort((a,b)=>String(b.effectiveDate).localeCompare(String(a.effectiveDate))).map(x=>`<div class="list-item"><div class="list-copy"><strong>${x.calories} kcal · ${x.protein} P · ${x.carbs} C · ${x.fat} F</strong><small>${fmtDate(x.effectiveDate)} · ${esc(x.note||'')}</small></div></div>`).join('');
    openModal('Calories and macros',`<div class="form-grid"><div class="field"><label>Effective date</label><input id="macro-date" class="input" type="date" value="${C.todayISO()}"></div><div class="field"><label>Calories</label><input id="macro-cal" class="input" type="number" value="${current.calories||2300}"></div><div class="field"><label>Protein (g)</label><input id="macro-protein" class="input" type="number" value="${current.protein||200}"></div><div class="field"><label>Fat (g)</label><input id="macro-fat" class="input" type="number" value="${current.fat||70}"></div><div class="field"><label>Carbs (g)</label><input id="macro-carbs" class="input" type="number" value="${current.carbs||218}"></div><div class="field"><label>Note</label><input id="macro-note" class="input" placeholder="W4 adjustment"></div></div><button class="button primary block" data-action="save-macros" style="margin-top:10px">Save updated target</button><div class="section-title"><h2>History</h2></div><div class="list">${rows}</div>`,{type:'macros'});
  }
  function saveMacros() {
    const rec={id:C.uid('macro'),effectiveDate:$('#macro-date').value,calories:Number($('#macro-cal').value),protein:Number($('#macro-protein').value),carbs:Number($('#macro-carbs').value),fat:Number($('#macro-fat').value),note:$('#macro-note').value.trim()};
    if(!rec.effectiveDate||!rec.calories||!rec.protein){toast('Date, calories, and protein are required.','error');return;}
    state.nutritionTargets.push(rec);Object.assign(state.profile,{calories:rec.calories,protein:rec.protein,carbs:rec.carbs,fat:rec.fat});closeModal();persist(true);toast('Macro target saved.','success');
  }

  function openTimeHistory() {
    const stats=C.timeStats(state); const visits=C.allGymVisits(state).slice().sort((a,b)=>String(b.date).localeCompare(String(a.date))).slice(0,40);
    openModal('Session time history',`<div class="status-grid"><div class="stat"><small>Week</small><strong>${C.formatDuration(stats.week.seconds)}</strong><em>${stats.week.count} visits</em></div><div class="stat"><small>Month</small><strong>${C.formatDuration(stats.month.seconds)}</strong><em>${stats.month.count} visits</em></div><div class="stat"><small>Year</small><strong>${C.formatDuration(stats.year.seconds)}</strong><em>${stats.year.count} visits</em></div><div class="stat"><small>All time</small><strong>${C.formatDuration(stats.all.seconds)}</strong><em>${stats.all.count} visits</em></div></div><div class="section-title"><h2>Recent visits</h2></div><div class="list">${visits.length?visits.map(v=>`<div class="list-item"><div class="list-copy"><strong>${fmtDate(v.date)}</strong><small>${esc(v.notes||v.type)}</small></div><strong>${C.formatDuration(v.durationSec)}</strong></div>`).join(''):'<div class="empty">No visits recorded.</div>'}</div>`,{type:'time-history'});
  }

  function openCalendarDay(date) {
    const visits=C.allGymVisits(state).filter(v=>v.date===date);
    openModal(fmtDate(date),`${visits.length?`<div class="list">${visits.map(v=>`<div class="list-item"><div class="list-copy"><strong>${esc(v.type==='session'?'Logged workout':'Gym visit')}</strong><small>${esc(v.notes||'')}</small></div><strong>${C.formatDuration(v.durationSec)}</strong></div>`).join('')}</div>`:'<div class="empty"><strong>No gym entry</strong>Add a manual visit or complete a workout on this date.</div>'}<div class="modal-footer"><button class="button primary" data-action="add-gym-visit" data-date="${esc(date)}">+ Gym visit</button></div>`,{type:'calendar-day',date});
  }

  function openGymVisit(date) {
    openModal('Add gym visit',`<div class="form-grid"><div class="field"><label>Date</label><input id="visit-date" class="input" type="date" value="${esc(date||C.todayISO())}"></div><div class="field"><label>Duration (minutes)</label><input id="visit-duration" class="input" type="number" min="0" placeholder="60"></div><div class="field span-2"><label>Notes</label><input id="visit-notes" class="input" placeholder="Cardio, unlogged session, class..."></div></div><div class="modal-footer"><button class="button" data-action="close-modal">Cancel</button><button class="button primary" data-action="save-gym-visit">Save visit</button></div>`,{type:'gym-visit'});
  }

  function saveGymVisit() {
    const date=$('#visit-date').value; const mins=Number($('#visit-duration').value)||0; if(!date){toast('Choose a date.','error');return;}
    C.addOrUpdateGymVisit(state,date,{durationSec:Math.round(mins*60),notes:$('#visit-notes').value.trim()});closeModal();persist(true);toast('Gym visit added.','success');
  }

  function openSettings() {
    openModal('Settings',`<div class="form-grid"><div class="field"><label>Weight unit</label><select id="setting-unit" class="select"><option value="lb" ${state.profile.unit==='lb'?'selected':''}>lb</option><option value="kg" ${state.profile.unit==='kg'?'selected':''}>kg</option></select></div><div class="field"><label>Theme</label><select id="setting-theme" class="select"><option value="dark" ${state.profile.theme==='dark'?'selected':''}>Dark</option><option value="light" ${state.profile.theme==='light'?'selected':''}>Light</option></select></div><div class="field"><label>Week starts</label><select id="setting-week" class="select"><option value="true" ${state.profile.weekStartsMonday!==false?'selected':''}>Monday</option><option value="false" ${state.profile.weekStartsMonday===false?'selected':''}>Sunday</option></select></div><div class="field"><label>Default reduced focus</label><select id="setting-deemphasis" class="select">${Object.keys(C.DATA.MUSCLE_GROUPS).map(g=>`<option ${g===state.settings.defaultDeemphasis?'selected':''}>${esc(g)}</option>`).join('')}</select></div></div>
      <label class="check-row"><input id="setting-auto-rest" type="checkbox" ${state.settings.autoStartRest?'checked':''}><span>Start the rest timer when a set is completed</span></label><label class="check-row"><input id="setting-vibrate" type="checkbox" ${state.settings.vibration?'checked':''}><span>Vibrate when rest ends (when supported)</span></label><label class="check-row"><input id="setting-sound" type="checkbox" ${state.settings.sound?'checked':''}><span>Play a short tone when rest ends</span></label>
      <div class="modal-footer"><button class="button danger" data-action="reset-app">Reset app</button><button class="button primary" data-action="save-settings">Save</button></div>`,{type:'settings'});
  }

  function saveSettings() {
    state.profile.unit=$('#setting-unit').value;state.profile.theme=$('#setting-theme').value;state.profile.weekStartsMonday=$('#setting-week').value==='true';state.settings.defaultDeemphasis=$('#setting-deemphasis').value;state.settings.autoStartRest=$('#setting-auto-rest').checked;state.settings.vibration=$('#setting-vibrate').checked;state.settings.sound=$('#setting-sound').checked;closeModal();persist(true);toast('Settings saved.','success');
  }

  function openInstall() {
    const isIos=/iphone|ipad|ipod/i.test(navigator.userAgent);
    openModal('Install on your phone',`<section class="card accent"><h3 style="margin-top:0">Offline after first load</h3><p>The program, workout logs, timers, and history remain on this device. Create regular JSON backups.</p></section>${installPrompt?`<button class="button primary block" data-action="prompt-install">Install app</button>`:''}<div class="section-title"><h2>${isIos?'iPhone / iPad':'Browser installation'}</h2></div><ol><li>Open the hosted app in ${isIos?'Safari':'Chrome or your preferred browser'}.</li><li>${isIos?'Tap Share, then Add to Home Screen.':'Open the browser menu and choose Install app or Add to Home screen.'}</li><li>Launch The Blueprint from the new home-screen icon.</li></ol><div class="inline-note">Opening index.html directly can run the app, but home-screen installation and the service worker require it to be served from HTTPS or localhost.</div>`,{type:'install'});
  }

  function openExport() {
    openModal('Backup and exports',`<section class="card accent"><h3 style="margin-top:0">Full backup</h3><p>JSON preserves programs, exercise mappings, workouts, measurements, macros, and timers. Use it to move or restore the app.</p><button class="button primary block" data-action="download-backup">Download JSON backup</button><button class="button block" data-action="import-backup" style="margin-top:8px">Import JSON backup</button></section><div class="section-title"><h2>Excel-friendly CSV</h2></div><div class="form-grid"><button class="button" data-action="download-csv" data-kind="sessions">Workout sets</button><button class="button" data-action="download-csv" data-kind="weights">Weights</button><button class="button" data-action="download-csv" data-kind="measurements">Measurements</button><button class="button" data-action="download-csv" data-kind="visits">Gym visits</button></div>`,{type:'export'});
  }

  function downloadBlob(filename,content,type) {
    const blob=new Blob([content],{type:type||'text/plain'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),500);
  }

  function openAbout() {
    openModal('About the app',`<section class="card"><h3 style="margin-top:0">Local-first and offline</h3><p>All entries are stored in this browser's local storage. No account, cloud database, analytics, or external network request is used by the app itself.</p></section><div class="section-title"><h2>Weekly muscle counts</h2></div><p>Completed reps are multiplied by each exercise's editable muscle credit. A bench-press rep may count as 1.0 chest rep, 0.5 triceps rep, and 0.3 front-delt rep. Group totals sum the individual muscles assigned to that group. Historical sessions retain a snapshot of the mapping used when the session was created.</p><div class="section-title"><h2>Next-session suggestions</h2></div><p>The app uses the current week's programmed set count and rep range, the last completed performance, logged RIR, each exercise's load increment, and special W8/W12 fatigue reductions. Suggestions are decision support rather than a substitute for pain-free technique or professional care.</p><div class="section-title"><h2>Iterative cycles</h2></div><p>The offline cycle builder clones the active exercise selection, adds recoverable priority volume, reduces selected competing work, and preserves the 12-week phase structure. You can edit every generated exercise and prescription before activating it.</p>`,{type:'about'});
  }

  function openQuickAdd() {
    openModal('Quick add',`<div class="form-grid"><button class="button" data-action="log-progress">Weight</button><button class="button" data-action="log-progress">Measurements</button><button class="button" data-action="add-gym-visit" data-date="${C.todayISO()}">Gym visit</button><button class="button" data-action="macro-targets">Macros</button></div>`,{type:'quick-add'});
  }

  function handleClick(event) {
    const route=event.target.closest('[data-route]'); if(route){routeTo(route.dataset.route);return;}
    const el=event.target.closest('[data-action]'); if(!el)return;
    const action=el.dataset.action;
    if(action==='close-modal'){closeModal();return;}
    if(action==='go-today'){routeTo('today');return;}
    if(action==='open-quick-add'){openQuickAdd();return;}
    if(action==='select-week'){state.ui.selectedWeek=Number(el.dataset.week);state.ui.selectedDay='D1';persist(true);return;}
    if(action==='select-day'){state.ui.selectedDay=el.dataset.day;persist(true);return;}
    if(action==='program-week'){state.ui.selectedWeek=Number(el.dataset.week);persist(true);return;}
    if(action==='volume-week'){state.ui.selectedVolumeWeek=Number(el.dataset.week);persist(true);return;}
    if(action==='volume-mode'){volumeMode=el.dataset.mode;renderVolume();return;}
    if(action==='start-session'){if(state.activeSessionId){goToActiveSession();toast('Your active workout is open.','error');return;}const cycle=C.getActiveCycle(state);const session=C.createSession(state,cycle.id,state.ui.selectedWeek,state.ui.selectedDay,C.todayISO());startExistingSession(session);return;}
    if(action==='start-existing-session'){startExistingSession(sessionForSelection());return;}
    if(action==='pause-session'){pauseSession();return;}
    if(action==='resume-session'){resumeSession();return;}
    if(action==='finish-session'){confirmFinishSession();return;}
    if(action==='confirm-finish'){finishSession();return;}
    if(action==='open-session'){goToActiveSession();return;}
    if(action==='repeat-session'){if(state.activeSessionId){goToActiveSession();return;}const cycle=C.getActiveCycle(state);const s=C.createSession(state,cycle.id,state.ui.selectedWeek,state.ui.selectedDay,C.todayISO());startExistingSession(s);return;}
    if(action==='toggle-set'){completeSet(el);return;}
    if(action==='apply-load'){applySuggestedLoad(el.dataset.session,el.dataset.exercise);return;}
    if(action==='add-set'){addSet(el.dataset.session,el.dataset.exercise);return;}
    if(action==='remove-extra-set'){const s=C.getSession(state,el.dataset.session);const se=s&&s.exercises.find(e=>e.exerciseId===el.dataset.exercise);if(se){const idx=[...se.sets].reverse().findIndex(x=>x.isExtra&&!x.completed);if(idx>=0)se.sets.splice(se.sets.length-1-idx,1);}closeModal();persist(true);return;}
    if(action==='show-guide'){showExerciseGuide(el.dataset.exercise);return;}
    if(action==='prescription-menu'){prescriptionMenu(el);return;}
    if(action==='session-exercise-menu'){sessionExerciseMenu(el);return;}
    if(action==='replace-exercise'){openReplaceExercise(el.dataset.oldExercise);return;}
    if(action==='confirm-replacement'){confirmReplacement();return;}
    if(action==='edit-prescription'){openEditPrescription(el.dataset.prescription);return;}
    if(action==='save-prescription'){savePrescription();return;}
    if(action==='preview-suggestions'){const cycle=C.getActiveCycle(state);const day=C.getDay(cycle,state.ui.selectedWeek,state.ui.selectedDay);openModal('Next-session suggestions',day.prescriptions.map(p=>{const ex=C.getExercise(state,p.exerciseId);const s=C.calculateSuggestion(state,cycle.id,state.ui.selectedWeek,state.ui.selectedDay,p.exerciseId);return `<section class="card soft"><strong>${esc(ex?ex.name:p.displayName)}</strong><p>${esc(s?s.headline:'No suggestion')}</p><small>${esc(s?s.reason:'')}</small></section>`;}).join(''),{type:'suggestions'});return;}
    if(action==='build-cycle'){openCycleBuilder();return;}
    if(action==='generate-cycle'){generateCycle();return;}
    if(action==='cycle-list'){openCycleList();return;}
    if(action==='activate-cycle'){activateCycle(el.dataset.cycle);return;}
    if(action==='rename-cycle'){const cycle=C.getCycle(state,el.dataset.cycle);openModal('Edit cycle name',`<div class="field"><label>Name</label><input id="rename-cycle-value" class="input" value="${esc(cycle.name)}"></div><div class="modal-footer"><button class="button" data-action="close-modal">Cancel</button><button class="button primary" data-action="save-cycle-name">Save</button></div>`,{type:'rename-cycle',cycleId:cycle.id});return;}
    if(action==='save-cycle-name'){const cycle=C.getCycle(state,modalContext.cycleId);cycle.name=$('#rename-cycle-value').value.trim()||cycle.name;closeModal();persist(true);return;}
    if(action==='calendar-prev'||action==='calendar-next'){const [y,m]=state.ui.selectedCalendarMonth.split('-').map(Number);const d=new Date(y,m-1+(action==='calendar-next'?1:-1),1);state.ui.selectedCalendarMonth=C.isoDate(d).slice(0,7);persist(true);return;}
    if(action==='calendar-day'){openCalendarDay(el.dataset.date);return;}
    if(action==='add-gym-visit'){openGymVisit(el.dataset.date||C.todayISO());return;}
    if(action==='save-gym-visit'){saveGymVisit();return;}
    if(action==='rest-minus'){if(state.restTimer)state.restTimer.endsAt-=15000;persist(false);updateTimers();return;}
    if(action==='rest-plus'){if(state.restTimer)state.restTimer.endsAt+=15000;persist(false);updateTimers();return;}
    if(action==='rest-skip'){state.restTimer=null;persist(false);updateTimers();return;}
    if(action==='exercise-library'){openExerciseLibrary();return;}
    if(action==='add-exercise'){openExerciseEditor(null);return;}
    if(action==='edit-exercise'){openExerciseEditor(el.dataset.exercise);return;}
    if(action==='add-credit'){const list=$('#muscle-credit-list');list.insertAdjacentHTML('beforeend',renderMuscleCreditRows([{muscle:'Chest',credit:1}]));return;}
    if(action==='remove-credit'){const row=el.closest('[data-credit-row]');if(row&&$$('[data-credit-row]',$('#modal-body')).length>1)row.remove();return;}
    if(action==='save-exercise'){saveExercise();return;}
    if(action==='log-progress'){openProgressLog();return;}
    if(action==='save-weight'){saveWeight();return;}
    if(action==='save-measurement'){saveMeasurement();return;}
    if(action==='macro-targets'){openMacroTargets();return;}
    if(action==='save-macros'){saveMacros();return;}
    if(action==='time-history'){openTimeHistory();return;}
    if(action==='install-app'){openInstall();return;}
    if(action==='prompt-install'){if(installPrompt){installPrompt.prompt();installPrompt.userChoice.finally(()=>{installPrompt=null;closeModal();});}return;}
    if(action==='export-data'){openExport();return;}
    if(action==='download-backup'){downloadBlob(`blueprint-backup-${C.todayISO()}.json`,JSON.stringify(state,null,2),'application/json');return;}
    if(action==='import-backup'){$('#import-file').click();return;}
    if(action==='download-csv'){const kind=el.dataset.kind;const map={sessions:C.exportSessionsCSV,weights:C.exportWeightsCSV,measurements:C.exportMeasurementsCSV,visits:C.exportVisitsCSV};downloadBlob(`blueprint-${kind}-${C.todayISO()}.csv`,map[kind](state),'text/csv');return;}
    if(action==='settings'){openSettings();return;}
    if(action==='save-settings'){saveSettings();return;}
    if(action==='reset-app'){if(confirm('Delete all local app data and restore the default program?')){state=C.defaultState();closeModal();persist(true);toast('The app has been reset.','success');}return;}
    if(action==='about-app'){openAbout();return;}
  }

  function handleInput(event) {
    const el=event.target;
    if(el.dataset.setField){updateSetInput(el);return;}
    if(el.dataset.input==='session-notes'){const s=sessionForSelection();if(s){s.notes=el.value;C.saveState(state);}return;}
    if(el.dataset.input==='exercise-search'){
      const q=el.value.toLowerCase().trim();$$('#exercise-library-list [data-exercise]').forEach(row=>{row.style.display=row.textContent.toLowerCase().includes(q)?'flex':'none';});
    }
  }

  function updateTimers() {
    const chip=$('#session-timer-chip');
    if(state.activeTimer){chip.classList.remove('hidden');$('#session-timer-text').textContent=C.formatDuration(C.currentElapsedSeconds(state.activeTimer));$$('[data-live-session-time]').forEach(x=>x.textContent=C.formatDuration(C.currentElapsedSeconds(state.activeTimer)));}else chip.classList.add('hidden');
    const rest=$('#rest-timer');
    if(state.restTimer){const remaining=C.restRemainingSeconds(state.restTimer);if(remaining<=0){state.restTimer=null;C.saveState(state);rest.classList.add('hidden');notifyRestDone();}else{rest.classList.remove('hidden');$('#rest-timer-text').textContent=C.formatDuration(remaining);}}else rest.classList.add('hidden');
  }

  function notifyRestDone() {
    if(state.settings.vibration&&navigator.vibrate)navigator.vibrate([180,80,180]);
    if(state.settings.sound){try{const ctx=new (window.AudioContext||window.webkitAudioContext)();const o=ctx.createOscillator();const g=ctx.createGain();o.frequency.value=880;g.gain.value=.05;o.connect(g);g.connect(ctx.destination);o.start();o.stop(ctx.currentTime+.18);}catch(e){/* ignored */}}
    toast('Rest complete.','success');
  }

  function handleImport(file) {
    if(!file)return;const reader=new FileReader();reader.onload=()=>{try{const imported=C.migrateState(JSON.parse(reader.result));const errors=C.validateState(imported);if(errors.length)throw new Error(errors.slice(0,3).join(' '));state=imported;persist(true);toast('Backup imported successfully.','success');}catch(err){toast(`Could not import backup: ${err.message}`,'error');}};reader.readAsText(file);
  }

  function init() {
    const hashRoute = String(location.hash || '').replace('#', '');
    if (['today','program','volume','calendar','more'].includes(hashRoute)) currentRoute = hashRoute;
    applyTheme();
    document.addEventListener('click',handleClick);
    document.addEventListener('input',handleInput);
    $('#import-file').addEventListener('change',e=>handleImport(e.target.files[0]));
    window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;});
    if('serviceWorker' in navigator&&location.protocol!=='file:')navigator.serviceWorker.register('./service-worker.js').catch(err=>console.warn('Service worker registration failed',err));
    const errors=C.validateState(state);if(errors.length){console.warn('State validation warnings',errors);}
    renderAll();
    tickHandle=setInterval(updateTimers,500);
    document.addEventListener('visibilitychange',()=>{if(!document.hidden)updateTimers();});
  }

  init();
})();
