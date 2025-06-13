// === MENÚ ===
function mostrarSeccion(id) {
  document.querySelectorAll('main > section').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

// === COTIZACIONES ===
var cotizaciones = [];

function cotizar() {
  var nombre = document.getElementById('nombre').value;
  var modelo = document.getElementById('modelo').value;
  var cantidadStr = document.getElementById('cantidad').value;

  if (!nombre || !modelo || isNaN(cantidadStr) || parseInt(cantidadStr) < 1) {
    alert("Por favor completa todos los campos correctamente.");
    return;
  }

  var extrasList = [];
  if (document.getElementById('extra1').checked) extrasList.push(document.getElementById('extra1').value);
  if (document.getElementById('extra2').checked) extrasList.push(document.getElementById('extra2').value);
  if (document.getElementById('extra3').checked) extrasList.push(document.getElementById('extra3').value);

  extrasList.push("Paquete aerodinámico");
  extrasList.unshift("Modo Carrera");
  extrasList.pop();

  var precioBase = 200000;
  var precioExtra = extrasList.length * 10000;
  var total = (precioBase + precioExtra) * parseInt(cantidadStr);

  cotizaciones.push({
    cliente: nombre,
    modelo: modelo.toUpperCase(),
    extras: extrasList.join(", "),
    cantidad: parseInt(cantidadStr),
    total: total
  });

  mostrarCotizaciones();
}

function mostrarCotizaciones() {
  var div = document.getElementById('cotizaciones');
  div.innerHTML = "";
  cotizaciones.forEach((c, i) => {
    div.innerHTML += `<p><strong>${i+1}. ${c.cliente}</strong> - Modelo: ${c.modelo} - Extras: ${c.extras} - Total: $${c.total.toLocaleString()}</p>`;
  });
}

function eliminarCotizaciones() {
  cotizaciones = [];
  mostrarCotizaciones();
}

function generarPDF() {
  if (cotizaciones.length === 0) {
    alert("No hay cotizaciones para exportar.");
    return;
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Cotizaciones Lamborghini", 14, 20);
  let y = 30;
  cotizaciones.forEach((c, i) => {
    doc.setFontSize(12);
    doc.text(`${i+1}. Cliente: ${c.cliente}`, 14, y); y += 8;
    doc.text(`   Modelo: ${c.modelo}`, 14, y); y += 8;
    doc.text(`   Extras: ${c.extras}`, 14, y); y += 8;
    doc.text(`   Total: $${c.total.toLocaleString()}`, 14, y); y += 12;
    if (y > 270) { doc.addPage(); y = 30; }
  });
  doc.save("cotizaciones.pdf");
}

function enviarContacto(e) {
  e.preventDefault();
  var nombre = document.getElementById('nombreContacto').value;
  var email = document.getElementById('emailContacto').value;
  var mensaje = document.getElementById('mensajeContacto').value;
  if (!nombre || !email || !mensaje) {
    alert("Completa todos los campos.");
    return false;
  }
  document.getElementById('mensajeConfirmacion').textContent = `Gracias, ${nombre}. Tu mensaje fue enviado.`;
  e.target.reset();
  return false;
}

// === SECCIÓN OPERACIONES ===
var datosSistema = [];

function simularMotor() {
  var rpm = Math.floor(Math.random() * 9000) + 1000;
  var estado = rpm > 7000 ? "Alto Rendimiento" : "Estable";
  var tiempoArranque = (Math.random() * 2.5 + 2.0).toFixed(2);
  var resultado = ` Encendiendo motor V8 Híbrido...\n`;
  resultado += `RPM: ${rpm}\n`;
  resultado += `Estado: ${estado}\n`;
  resultado += `Tiempo de arranque: ${tiempoArranque}s\n`;

  datosSistema.push({ tipo: "motor", datos: { rpm, estado, tiempoArranque } });
  mostrarResultado(resultado);
}

function verSensores() {
  var sensores = {
    temperatura: Math.floor(Math.random() * 120) + 60,
    presionAceite: (Math.random() * 5 + 2).toFixed(2),
    bateria: Math.floor(Math.random() * 100) + "%",
    velocidad: Math.floor(Math.random() * 380)
  };
  var resultado = `📡 Datos de sensores:\n`;
  for (var key in sensores) {
    resultado += `${key}: ${sensores[key]}\n`;
  }
  datosSistema.push({ tipo: "sensores", datos: sensores });
  mostrarResultado(resultado);
}

function calcularRendimiento() {
  var kmh = Math.floor(Math.random() * 380) + 200;
  var aceleracion = (Math.random() * 3 + 2).toFixed(2);
  var consumo = (Math.random() * 20 + 5).toFixed(2);
  var categoria = kmh >= 350 ? "Supercar Extremo" : "Supercar";

  var resultado = ` Análisis de rendimiento:\n`;
  resultado += `Velocidad máxima: ${kmh} km/h\n`;
  resultado += `Aceleración 0-100 km/h: ${aceleracion}s\n`;
  resultado += `Consumo: ${consumo} L/100km\n`;
  resultado += `Categoría: ${categoria}\n`;

  datosSistema.push({ tipo: "rendimiento", datos: { kmh, aceleracion, consumo, categoria } });
  mostrarResultado(resultado);
}

function limpiarDatos() {
  document.getElementById("resultadosSimulacion").innerHTML = "";
  datosSistema = [];
}

function mostrarResultado(texto) {
  var contenedor = document.getElementById("resultadosSimulacion");
  contenedor.textContent += texto + "\n--------------------\n";
}

// Mostrar inicio al cargar
mostrarSeccion('inicio');
