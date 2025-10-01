const tools = [
  { name: "Broche de magnetita", color: "yellow" },
  { name: "Colgante fragmentador", color: "yellow" },
  { name: "Brújula", color: "yellow" },
  { name: "Ojo del druida", color: "blue" },
  { name: "Alfiler recto", color: "red" },
  { name: "Campana protectora", color: "blue" },
  { name: "Aguijón cortante", color: "red" },
  { name: "Campana magmática", color: "blue" },
  { name: "Cinturón lastrado", color: "yellow" },
  { name: "Garracurva", color: "red" },
  { name: "Máscara fracturada", color: "blue" },
  { name: "Alfiler triple", color: "red" },
  { name: "Brebaje pulgoso", color: "red" },
  { name: "Alfiler largo", color: "red" },
  { name: "Bolsa pólipo", color: "blue" },
  { name: "Alfimohada", color: "red" },
  { name: "Multiuso", color: "blue" },
  { name: "Tejeluz", color: "blue" },
  { name: "Tobilleras rapisedeñas", color: "yellow" },
  { name: "Bolsa de bicho muerto", color: "yellow" },
  { name: "Ampolla con aguja / Ampolla de plasmio", color: "red" },
  { name: "Dados de magnetita", color: "yellow" },
  { name: "Taladro de excavador", color: "red" },
  { name: "Agarre del ascendente", color: "yellow" },
  { name: "Extensor de carrete", color: "blue" },
  { name: "Cilicio", color: "yellow" },
  { name: "Tachuelas", color: "red" },
  { name: "Garra espejo / Espejo oscuro", color: "blue" },
  { name: "Rueda mecánica", color: "red" },
  { name: "Anillo de dientes de sierra", color: "blue" },
  { name: "Brazada de desliz", color: "yellow" },
  { name: "Piedra de pedernal", color: "red" },
  { name: "Banda inyectora", color: "blue" },
  { name: "Cristal de memoria", color: "blue" },
  { name: "Herramienta estropeada", color: "red" },
  { name: "Honda veloz", color: "blue" },
  { name: "Mosca mecánica", color: "red" },
  { name: "Marca de ladrón", color: "yellow" },
  { name: "Pico hurgón", color: "blue" },
  { name: "Corta concha", color: "red" },
  { name: "Cañón de rosarios", color: "red" },
  { name: "Recipientes voltaicos", color: "red" },
  { name: "Cuerdas arácnidas", color: "yellow" },
  { name: "Corona de pureza", color: "blue" },
  { name: "Anillo arrojadizo", color: "red" },
  { name: "Garralarga", color: "blue" },
  { name: "Huevo de pulgalia", color: "blue" },
  { name: "Reserva sedeña", color: "red" },
  { name: "Filamento voltáico", color: "blue" },
  { name: "Farol de fuego fauto", color: "blue" },
  { name: "Placa de alfiler", color: "blue" }
];

let selectedBlason = "";
let selectedTools = [];

const MAX_BY_COLOR = {
  "Cazadora": { yellow: 3, blue: 2, red: 1 },
  "Parca": { yellow: 2, blue: 2, red: 2 },
  "Bestia": { yellow: 3, blue: 1, red: 1 },
  "Errante": { yellow: 4, blue: 2, red: 1 },
  "Arquitecta": { yellow: 2, blue: 3, red: 1 },
  "Bruja": { yellow: 2, blue: 3, red: 2 },
  "Chamana": { yellow: 3, blue: 2, red: 1 }
};

function renderTools() {
  const container = document.getElementById("tools-container");
  container.innerHTML = "";

  ["yellow","blue","red"].forEach(color => {
    const groupDiv = document.createElement("div");
    groupDiv.classList.add("group");
    groupDiv.innerHTML = `<h2>${color.toUpperCase()}</h2>`;
    tools.filter(t => t.color === color).forEach(tool => {
      const div = document.createElement("div");
      div.classList.add("tool");
      if(selectedTools.includes(tool.name)) div.classList.add("selected");
      div.innerHTML = `<h3>${tool.name}</h3>`;
      div.onclick = () => toggleTool(tool);
      groupDiv.appendChild(div);
    });
    container.appendChild(groupDiv);
  });
}

function toggleTool(tool) {
  if (!selectedBlason) {
    alert("Selecciona primero un Blasón.");
    return;
  }
  const limits = MAX_BY_COLOR[selectedBlason];
  const colorCount = selectedTools.filter(tName => tools.find(t => t.name === tName).color === tool.color).length;

  if(selectedTools.includes(tool.name)){
    selectedTools = selectedTools.filter(t => t !== tool.name);
  } else {
    if(colorCount >= limits[tool.color]){
      alert(`No puedes seleccionar más herramientas ${tool.color} con el blasón ${selectedBlason}`);
      return;
    }
    selectedTools.push(tool.name);
  }
  renderTools();
}

document.getElementById("blason").addEventListener("change", e => {
  selectedBlason = e.target.value;
  selectedTools = [];
  renderTools();
});

document.addEventListener("DOMContentLoaded", renderTools);
