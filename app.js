const TOOLS = [
  { id: "broche_magnetita", name: "Broche de magnetita", color: "amarillo", desc: "Atrae rosarios cercanos.", img: "https://placehold.co/64x64/yellow/black?text=BM" },
  { id: "brujula", name: "Brújula", color: "amarillo", desc: "Muestra tu ubicación en el mapa.", img: "https://placehold.co/64x64/yellow/black?text=B" },
  { id: "cinturon_lastrado", name: "Cinturón lastrado", color: "amarillo", desc: "Reduce retroceso al golpear.", img: "https://placehold.co/64x64/yellow/black?text=CL" }
];

const BLASONS = [
  { id: "cazadora", name: "Cazadora", effect: "Aumenta daño a enemigos pequeños", slotCost: 1, img: "https://placehold.co/48x48/red/white?text=C" },
  { id: "parca", name: "Parca", effect: "Incrementa daño crítico", slotCost: 1, img: "https://placehold.co/48x48/red/white?text=P" },
  { id: "bruja", name: "Bruja", effect: "Incrementa poder de hechizos", slotCost: 1, img: "https://placehold.co/48x48/red/white?text=Br" }
];

const STORAGE_KEY = "silksong_builds_v1";
let selectedTool = TOOLS[0].id;
let selectedBlasons = [];
let builds = [];

// Cargar builds del localStorage
document.addEventListener("DOMContentLoaded", () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) builds = JSON.parse(raw);

  renderTools();
  renderBlasons();
  renderBuilds();
  updatePreview();

  document.getElementById("saveBuild").onclick = saveBuild;
  document.getElementById("randomizeBuild").onclick = randomize;
  document.getElementById("exportAll").onclick = exportAll;
  document.getElementById("importFile").onchange = importJSON;
  document.getElementById("filterInput").oninput = renderBuilds;
});

// Render herramientas
function renderTools() {
  const list = document.getElementById("toolsList");
  list.innerHTML = "";
  TOOLS.forEach(t => {
    const div = document.createElement("div");
    div.innerHTML = `<img src="${t.img}"><div>${t.name} [${t.color}]</div>`;
    div.className = "list-item";
    div.onclick = () => { selectedTool = t.id; updatePreview(); };
    list.appendChild(div);
  });
}

// Render blasones
function renderBlasons() {
  const list = document.getElementById("blasonsList");
  list.innerHTML = "";
  BLASONS.forEach(b => {
    const div = document.createElement("div");
    div.innerHTML = `<img src="${b.img}"><div>${b.name} - ${b.effect}</div>`;
    div.className = "list-item";
    div.onclick = () => toggleBlason(b.id);
    list.appendChild(div);
  });
}

function toggleBlason(id) {
  if (selectedBlasons.includes(id)) {
    selectedBlasons = selectedBlasons.filter(x => x !== id);
  } else {
    if (selectedBlasons.length >= 3) {
      alert("Máximo 3 blasones.");
      return;
    }
    selectedBlasons.push(id);
  }
  updatePreview();
}

// Vista previa
function updatePreview() {
  const tool = TOOLS.find(t => t.id === selectedTool);
  const blasons = selectedBlasons.map(id => BLASONS.find(b => b.id === id));

  document.getElementById("previewTool").innerHTML =
    `<div><img src="${tool.img}"><strong>${tool.name}</strong> [${tool.color}]<br><small>${tool.desc}</small></div>`;

  document.getElementById("previewBlasons").innerHTML =
    blasons.map(b => `<div><img src="${b.img}">${b.name}</div>`).join("");

  document.getElementById("previewNotes").innerText =
    "Efectos: " + blasons.map(b => b.effect).join(", ");
}

// Guardar build
function saveBuild() {
  const name = document.getElementById("buildName").value.trim() || "Build sin nombre";
  const tool = TOOLS.find(t => t.id === selectedTool);
  const blasons = [...selectedBlasons];
  const build = { id: Date.now().toString(), name, tool, blasons };
  builds.unshift(build);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(builds));
  renderBuilds();
}

// Render builds guardadas
function renderBuilds() {
  const filter = document.getElementById("filterInput").value.toLowerCase();
  const list = document.getElementById("buildsList");
  list.innerHTML = "";
  builds.filter(b => b.name.toLowerCase().includes(filter)).forEach(b => {
    const div = document.createElement("div");
    div.className = "saved-item";
    div.innerHTML = `
      <div class="name">${b.name}</div>
      <button onclick="exportBuild('${b.id}')">Exportar</button>
      <button class="delete" onclick="deleteBuild('${b.id}')">Eliminar</button>`;
    list.appendChild(div);
  });
}

function deleteBuild(id) {
  if (!confirm("¿Eliminar build?")) return;
  builds = builds.filter(b => b.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(builds));
  renderBuilds();
}

function exportBuild(id) {
  const b = builds.find(x => x.id === id);
  const payload = JSON.stringify(b, null, 2);
  downloadFile(`${b.name}.json`, payload);
}

function exportAll() {
  const payload = JSON.stringify(builds, null, 2);
  downloadFile("silksong_builds.json", payload);
}

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function importJSON(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const parsed = JSON.parse(ev.target.result);
      builds.unshift({ id: Date.now().toString(), ...parsed });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(builds));
      renderBuilds();
    } catch (err) {
      alert("JSON inválido");
    }
  };
  reader.readAsText(file);
}

function randomize() {
  const t = TOOLS[Math.floor(Math.random() * TOOLS.length)];
  const b = [...BLASONS].sort(() => 0.5 - Math.random()).slice(0, 2).map(x => x.id);
  selectedTool = t.id;
  selectedBlasons = b;
  document.getElementById("buildName").value = "Aleatorio " + t.name;
  updatePreview();
}
