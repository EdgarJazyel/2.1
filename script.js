// Mostrar secciones según menú
function mostrarSeccion(id) {
  document.querySelectorAll('main > section').forEach(sec => {
    sec.classList.add('hidden');
  });
  document.getElementById(id).classList.remove('hidden');
}

// Variables para cotizaciones
var cotizaciones = [];

// Función cotizar que cumple con la rúbrica
function cotizar() {
  var nombre = document.getElementById('nombre').value;
  var modelo = document.getElementById('modelo').value;
  var cantidadStr = document.getElementById('cantidad').value;

  // Escape de comillas dobles
  var mensaje = "Hola \"" + nombre + "\", vamos a cotizar tu Lamborghini.";

  if (nombre === "" || modelo === "") {
    alert("Por favor llena todos los campos obligatorios.");
    return;
  }

  if (isNaN(cantidadStr) || cantidadStr === "" || parseInt(cantidadStr) < 1) {
    alert("Cantidad debe ser un número válido mayor o igual a 1.");
    return;
  }

  var cantidad = parseInt(cantidadStr, 10);

  // Manipulación de cadenas
  var modeloMayus = modelo.toUpperCase();
  var primerCaracter = modelo.charAt(0);
  var subcadena = modelo.substring(0, 3);
  var partesModelo = modelo.split(' ');

  // Manejo de arrays
  var extrasList = [];
  if (document.getElementById('extra1').checked) extrasList.push(document.getElementById('extra1').value);
  if (document.getElementById('extra2').checked) extrasList.push(document.getElementById('extra2').value);
  if (document.getElementById('extra3').checked) extrasList.push(document.getElementById('extra3').value);

  // push, pop, shift, unshift, reverse
  extrasList.push("Seguro básico");
  extrasList.unshift("Paquete VIP"); // nuevo
  var ultimoExtra = extrasList.pop();
  extrasList.shift(); // nuevo

  // Uso de for...in
  var resultadoForIn = "";
  for (var key in extrasList) {
    resultadoForIn += "Índice: " + key + " → " + extrasList[key] + "<br>";
  }

  // Cálculo con operadores matemáticos, lógicos y relacionales
  var precioBase = 150000; // ejemplo precio base
  var precioExtras = extrasList.length * 8000;
  var precioTotal = (precioBase + precioExtras) * cantidad;

  // Operadores incremento y decremento
  for (var i = 0; i < extrasList.length; i++) {
    i++;  // incremento explícito
    i--;  // decremento explícito
  }

  // Validación con isNaN
  var valorInvalido = "no es un número";
  var esNumero = !isNaN(valorInvalido) ? "Sí es número" : "No es número";

  // Operadores lógicos y negación
  if (!(cantidad < 1) && (nombre !== "" && modelo !== "")) {
    cotizaciones.push({
      nombre: nombre,
      modelo: modeloMayus,
      extras: extrasList.concat(partesModelo).join(", "),
      cantidad: cantidad,
      total: precioTotal
    });
    mostrarCotizaciones();
    alert(mensaje);
  }
}

// Mostrar cotizaciones
function mostrarCotizaciones() {
  var div = document.getElementById('cotizaciones');
  div.innerHTML = "";
  for (var i = 0; i < cotizaciones.length; i++) {
    var c = cotizaciones[i];
    div.innerHTML += `<p><strong>${c.nombre}</strong> - Modelo: ${c.modelo} - Extras: ${c.extras} - Cantidad: ${c.cantidad} - Total: $${c.total.toLocaleString()}</p>`;
  }
}

// Eliminar cotizaciones
function eliminarCotizaciones() {
  cotizaciones = [];
  mostrarCotizaciones();
}

// Generar PDF con jsPDF
function generarPDF() {
  if (cotizaciones.length === 0) {
    alert("No hay cotizaciones para generar PDF.");
    return;
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Cotizaciones Lamborghini", 14, 20);
  let y = 30;
  cotizaciones.forEach((c, index) => {
    doc.setFontSize(12);
    doc.text(`${index + 1}. Nombre: ${c.nombre}`, 14, y);
    y += 8;
    doc.text(`   Modelo: ${c.modelo}`, 14, y);
    y += 8;
    doc.text(`   Extras: ${c.extras}`, 14, y);
    y += 8;
    doc.text(`   Cantidad: ${c.cantidad}`, 14, y);
    y += 8;
    doc.text(`   Total: $${c.total.toLocaleString()}`, 14, y);
    y += 12;
    if (y > 270) { doc.addPage(); y = 20; }
  });
  doc.save("cotizaciones_lamborghini.pdf");
}

// Enviar contacto (simulado)
function enviarContacto(event) {
  event.preventDefault();
  var nombre = document.getElementById('nombreContacto').value;
  var email = document.getElementById('emailContacto').value;
  var mensaje = document.getElementById('mensajeContacto').value;

  if (!nombre || !email || !mensaje) {
    alert("Por favor llena todos los campos.");
    return false;
  }

  document.getElementById('mensajeConfirmacion').textContent = `Gracias, ${nombre}. Tu mensaje ha sido enviado.`;
  event.target.reset();
  return false;
}

// Mostrar inicio al cargar
mostrarSeccion('inicio');
