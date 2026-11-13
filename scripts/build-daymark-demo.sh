#!/bin/bash
set -euo pipefail

portfolio="$(cd "$(dirname "$0")/.." && pwd)"
daymark="$(cd "${1:?Pass the path to a Daymark checkout with dependencies installed}" && pwd)"
stage="$(mktemp -d)"
trap 'rm -rf "$stage"' EXIT
git -C "$daymark" archive HEAD | tar -x -C "$stage"
ln -s "$daymark/node_modules" "$stage/node_modules"

python3 - "$stage" <<'PY'
from pathlib import Path
import re
import sys

root = Path(sys.argv[1])

def replace(file, before, after):
    path = root / file
    text = path.read_text()
    if text.count(before) != 1:
        raise SystemExit(f'Daymark source changed: {file}: {before}')
    path.write_text(text.replace(before, after))

replace('js/util/Storage.js', "static PREFIX = 'todo-app';", "static PREFIX = 'daymark-portfolio-demo';")
replace('js/util/Storage.js', """      if (!legacyKey) return null;

      const legacy = JSON.parse(localStorage.getItem(legacyKey));
      if (!isLegacyValue(legacy)) return null;
      this.set(key, legacy);
      return legacy;""", "      return null;")
replace('js/util/Storage.js', 'static get(key, legacyKey, isLegacyValue = () => false)', 'static get(key)')
replace('js/util/Storage.js', "locks.request('daymark-planner'", "locks.request('daymark-portfolio-demo-planner'")
replace('js/app.js', "import plannerStyles from '../css/style.css?inline';", "import '../demo-workspace.js';\nimport plannerStyles from '../css/style.css?inline';")
replace('js/app.js', "setupInstall($('#install-app'), $('#install-help'), $('#install-complete'));", "")
replace('js/app.js', """const push = setupPushReminders({
  button: $('#closed-app-reminders'),
  help: $('#closed-app-reminders-help'),
  fieldHelp: [$('#capture-reminder-help'), $('#edit-reminder-help')],
  announce
});""", "const push = { scheduleChanged() {}, confirmed: () => false };")
replace('js/app.js', "setupOffline(() => !saving && undoBanner.hidden && !document.querySelector('dialog[open]') && !hasCaptureDraft());", "")
replace('js/util/Reminders.js', "const canNotify = typeof Notification?.requestPermission === 'function';", "const canNotify = false;")
replace('js/util/Reminders.js', "'todo-app-deviceReminders'", "'daymark-portfolio-demo-deviceReminders'")
replace('index.html', "localStorage.getItem('todo-app-darkMode') ?? localStorage.getItem('darkMode')", "localStorage.getItem('daymark-portfolio-demo-darkMode')")

html = root / 'index.html'
text = html.read_text()
text = re.sub(r'^.*<link[^>]+(?:manifest|apple-touch-startup-image|apple-touch-icon)[^>]+>\n', '', text, flags=re.M)
text = re.sub(r'      <button id="install-app".*?(?=      <button id="dark-mode-toggle")', '', text, flags=re.S)
text = text.replace('</head>', '''  <meta name="robots" content="noindex">
  <style>
    #demo-tools { position: fixed; z-index: 25; right: 1rem; bottom: 1rem; }
    #demo-tools button { min-height: 44px; border: 1px solid #a7b4cc; border-radius: .65rem; padding: .5rem .85rem; background: #fff; color: #18213b; font: 650 .9rem system-ui, sans-serif; box-shadow: 0 3px 15px #19274425; cursor: pointer; }
    #demo-tools button:focus-visible { outline: 2px solid #3649df; outline-offset: 2px; }
    @media (max-width: 780px) { #demo-tools { bottom: calc(5rem + env(safe-area-inset-bottom)); } }
  </style>
</head>''')
text = text.replace('</body>', '''  <div id="demo-tools"><button type="button" id="reset-demo">Reset demo</button></div>
</body>''')
html.write_text(text)
PY

cat > "$stage/demo-workspace.js" <<'JS'
import { localDay } from './js/model/TaskModel.js';
import { Storage } from './js/util/Storage.js';

function exampleWorkspace() {
  const today = new Date();
  const deadline = new Date(today);
  deadline.setDate(deadline.getDate() + 3);
  return {
    tasks: [
      { id: 'review', text: 'Review the launch checklist', projectId: 'website', plannedDate: localDay(today), dueDate: localDay(deadline), priority: 'high', checklist: [{ text: 'Check mobile layout', done: false }, { text: 'Review copy', done: true }] },
      { id: 'proposal', text: 'Send the updated proposal', projectId: 'website', dueDate: localDay(today), priority: 'medium' },
      { id: 'weekly', text: 'Plan the week', plannedDate: localDay(today), repeat: 'weekly', priority: 'low' },
      { id: 'idea', text: 'Collect ideas for the next release', priority: 'none' },
    ],
    projects: [{ id: 'website', name: 'Website launch', archived: false }],
  };
}

if (!Storage.get('planner')) Storage.set('planner', exampleWorkspace());

document.querySelector('#reset-demo').addEventListener('click', () => {
  if (!window.confirm('Reset the demo and replace your changes with the sample tasks?')) return;
  void Storage.withPlannerLock(() => {
    for (const key of ['planner', 'tasks', 'projects', 'darkMode', 'reminderReceipts']) Storage.remove(key);
    Storage.set('planner', exampleWorkspace());
    window.location.replace(window.location.pathname);
  });
});
JS

rm -rf "$stage/public/ios-launch" "$stage/public/daymark.webmanifest"
(cd "$stage" && npm run build -- --base=/daymark-demo/ --configLoader runner)
rm -f "$stage/dist/sw.js"
destination="$portfolio/public/daymark-demo"
mkdir -p "$destination"
rsync -a --delete "$stage/dist/" "$destination/"
