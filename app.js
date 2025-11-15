// lista de herramientas y hechizos
const tools = [
  // hechizos
  { name: "Uñas pálidas", color: "hechizo" },
  { name: "Furia rúnica", color: "hechizo" },
  { name: "Dardo veloz", color: "hechizo" },
  { name: "Punto de cruz", color: "hechizo" },
  { name: "Lanza sedeña", color: "hechizo" },
  // herramientas
  { name: "Tormenta de hilos", color: "hechizo" },
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
  { name: "Saquito de coraza", color: "amarilla" },
  { name: "Ampolla de plasmio", color: "roja" },
  { name: "Ampolla con aguja", color: "roja" },
  { name: "Dados de magnetita", color: "amarilla" },
  { name: "Taladro de excavador", color: "roja" },
  { name: "Agarre del ascendente", color: "amarilla" },
  { name: "Extensor de carrete", color: "azul" },
  { name: "Cilicio", color: "amarilla" },
  { name: "Tachuelas", color: "roja" },
  { name: "Garra espejo", color: "azul" },
  { name: "Espejo oscuro", color: "azul" },
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
  { name: "Cortaconcha", color: "roja" },
  { name: "Cañón de rosarios", color: "roja" },
  { name: "Recipientes voltaicos", color: "roja" },
  { name: "Cuerdas arácnidas", color: "amarilla" },
  { name: "Corona de pureza", color: "azul" },
  { name: "Anillo arrojadizo", color: "roja" },
  { name: "Garralarga", color: "azul" },
  { name: "Huevo de pulgalia", color: "azul" },
  { name: "Reserva sedeña", color: "azul" },
  { name: "Filamento voltáico", color: "azul" },
  { name: "Farol de fuego fauto", color: "azul" },
  { name: "Placa de alfiler", color: "azul" },
  { name: "Garras espejo", color: "azul" },
  { name: "Ojos del druida", color: "azul" },
  { name: "Fijatrampas", color: "roja" },
  { name: "Hondasedeña", color: "roja" },
  { name: "Hozcurva", color: "roja" },
];

let selectedBlason = "";
let selectedTools = [];

// blasones y sus limites
const MAX_BY_COLOR = {
  "Cazadora": { amarilla: 2, azul: 2, roja: 2, hechizo: 1 },
  "Parca": { amarilla: 2, azul: 2, roja: 2, hechizo: 1 },
  "Bestia": { amarilla: 2, azul: 0, roja: 2, hechizo: 1 },
  "Errante": { amarilla: 3, azul: 2, roja: 1, hechizo: 1 },
  "Arquitecta": { amarilla: 2, azul: 2, roja: 3, hechizo: 0 },
  "Bruja": { amarilla: 0, azul: 2, roja: 2, hechizo: 1 },
  "Chamana": { amarilla: 0, azul: 2, roja: 0, hechizo: 3 }
};

function renderTools() {
  const container = document.getElementById("tools-container");
  container.innerHTML = "";

  // Mostrar contador solo si hay un blason seleccionado
  const limits = selectedBlason ? MAX_BY_COLOR[selectedBlason] : { amarilla: 0, azul: 0, roja: 0, hechizo: 0 };

  ["amarilla","azul","roja", "hechizo"].forEach(color => {
    const groupDiv = document.createElement("div");
    groupDiv.classList.add("group");
    groupDiv.innerHTML = `<h2>${color.toUpperCase()}</h2>`;

    // Contador de seleccion restantes
    if (selectedBlason) {
      const colorCount = selectedTools.filter(tName => tools.find(t => t.name === tName).color === color).length;
      const maxCount = limits[color];
      const remaining = Math.max(0, maxCount - colorCount); // Nunca negativo
      const counter = document.createElement("div");
      counter.className = "counter";
      counter.textContent = `Restantes: ${remaining} / ${maxCount}`;
      groupDiv.appendChild(counter);
    }

    tools.filter(t => t.color === color).forEach(tool => {
      const div = document.createElement("div");
      div.classList.add("tool");
      div.classList.add(tool.color); // <-- Aplica la clase de color correspondiente
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
    if(colorCount = 0){
      alert(`El blasón ${selectedBlason} no permite herramientas ${tool.color}`);
      return;
    } else {
      if(colorCount >= limits[tool.color]){
        alert(`No puedes seleccionar más herramientas ${tool.color} con el blasón ${selectedBlason}`);
        return;
      }
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
