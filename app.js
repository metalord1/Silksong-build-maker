const tools = [
  { name: "Broche de magnetita", color: "amarilla" },
  { name: "Colgante fragmentador", color: "amarilla" },
  { name: "Brújula", color: "amarilla" },
  { name: "Ojo del druida", color: "azul" },
  { name: "Alfiler recto", color: "roja" },
  { name: "Campana protectora", color: "azul" },
  { name: "Aguijón cortante", color: "roja" },
  { name: "Campana magmática", color: "azul" },
  { name: "Cinturón lastrado", color: "amarilla" },
  { name: "Garracurva", color: "roja" },
  { name: "Máscara fracturada", color: "azul" },
  { name: "Alfiler triple", color: "roja" },
  { name: "Brebaje pulgoso", color: "roja" },
  { name: "Alfiler largo", color: "roja" },
  { name: "Bolsa pólipo", color: "azul" },
  { name: "Alfimohada", color: "roja" },
  { name: "Multiuso", color: "azul" },
  { name: "Tejeluz", color: "azul" },
  { name: "Tobilleras rapisedeñas", color: "amarilla" },
  { name: "Bolsa de bicho muerto", color: "amarilla" },
  { name: "Ampolla con aguja / Ampolla de plasmio", color: "roja" },
  { name: "Dados de magnetita", color: "amarilla" },
  { name: "Taladro de excavador", color: "roja" },
  { name: "Agarre del ascendente", color: "amarilla" },
  { name: "Extensor de carrete", color: "azul" },
  { name: "Cilicio", color: "amarilla" },
  { name: "Tachuelas", color: "roja" },
  { name: "Garra espejo / Espejo oscuro", color: "azul" },
  { name: "Rueda mecánica", color: "roja" },
  { name: "Anillo de dientes de sierra", color: "azul" },
  { name: "Brazada de desliz", color: "amarilla" },
  { name: "Piedra de pedernal", color: "roja" },
  { name: "Banda inyectora", color: "azul" },
  { name: "Cristal de memoria", color: "azul" },
  { name: "Herramienta estropeada", color: "roja" },
  { name: "Honda veloz", color: "azul" },
  { name: "Mosca mecánica", color: "roja" },
  { name: "Marca de ladrón", color: "amarilla" },
  { name: "Pico hurgón", color: "azul" },
  { name: "Corta concha", color: "roja" },
  { name: "Cañón de rosarios", color: "roja" },
  { name: "Recipientes voltaicos", color: "roja" },
  { name: "Cuerdas arácnidas", color: "amarilla" },
  { name: "Corona de pureza", color: "azul" },
  { name: "Anillo arrojadizo", color: "roja" },
  { name: "Garralarga", color: "azul" },
  { name: "Huevo de pulgalia", color: "azul" },
  { name: "Reserva sedeña", color: "roja" },
  { name: "Filamento voltáico", color: "azul" },
  { name: "Farol de fuego fauto", color: "azul" },
  { name: "Placa de alfiler", color: "azul" }
];

let selectedBlason = "";
let selectedTools = [];

const MAX_BY_COLOR = {
  "Cazadora": { amarilla: 2, azul: 2, roja: 2 },
  "Parca": { amarilla: 2, azul: 2, roja: 2 },
  "Bestia": { amarilla: 2, azul: 0, roja: 2 },
  "Errante": { amarilla: 3, azul: 2, roja: 1 },
  "Arquitecta": { amarilla: 2, azul: 2, roja: 3 },
  "Bruja": { amarilla: 0, azul: 2, roja: 2 },
  "Chamana": { amarilla: 0, azul: 2, roja: 0 }
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

