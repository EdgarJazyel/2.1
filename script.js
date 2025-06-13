// Mostrar secciones según menú
function mostrarSeccion(id) {
  document.querySelectorAll('main > section').forEach(sec => {
    sec.classList.add('hidden');
  });
  document.getElementById(id).classList.remove('hidden');
}

// Variables para cotizaciones
var cotizaciones = [];

// === FUNCIONES DE COTIZACIÓN ===
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

  // push, pop y reverse
  extrasList.push("Seguro básico");
  var ultimoExtra = extrasList.pop();
  extrasList.reverse();

  // Cálculo con operadores matemáticos, lógicos y relacionales
  var precioBase = 150000;
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

function mostrarCotizaciones() {
  var div = document.getElementById('cotizaciones');
  div.innerHTML = "";
  for (var i = 0; i < cotizaciones.length; i++) {
    var c = cotizaciones[i];
    div.innerHTML += `<p><strong>${c.nombre}</strong> - Modelo: ${c.modelo} - Extras: ${c.extras} - Cantidad: ${c.cantidad} - Total: $${c.total.toLocaleString()}</p>`;
  }
}

function eliminarCotizaciones() {
  cotizaciones = [];
  mostrarCotizaciones();
}

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

// === SIMULACIÓN INTERACTIVA ===
var historialSimulaciones = [];

function ejecutarSimulacion() {
  var resultadosDiv = document.getElementById("resultadosSimulacion");
  resultadosDiv.innerHTML = "";

  // Datos simulados
  var modelos = ["Huracán", "Aventador", "Urus", "Gallardo"];
  var velocidades = [];
  for (var i = 0; i < 5; i++) {
    velocidades.push(Math.floor(Math.random() * 380) + 200); // entre 200 y 380 km/h
  }

  // Cálculos
  var velocidadMaxima = Math.max(...velocidades);
  var velocidadMinima = Math.min(...velocidades);
  var totalVelocidad = velocidades.reduce((a, b) => a + b, 0);
  var promedioVelocidad = (totalVelocidad / velocidades.length).toFixed(2);

  // Validación con isNaN
  var valorPrueba = "350";
  var esNumero = !isNaN(valorPrueba) ? "Sí es número" : "No es número";

  // Manejo de cadenas
  var modeloEjemplo = "Lamborghini Huracán Performante";
  var modeloMayus = modeloEjemplo.toUpperCase();
  var modeloResumen = modeloEjemplo.substring(0, 12) + "...";

  // Manejo de arrays
  var extras = ["Paquete aerodinámico", "Frenos cerámicos", "Interior Alcántara"];
  extras.push("Asistencia de conducción");
  extras.unshift("Paquete Track");
  extras.shift(); // Eliminar primero
  extras.pop(); // Eliminar último
  extras.reverse();

  // Estructuras de control
  var categoria;
  if (velocidadMaxima >= 350) {
    categoria = "Supercar Extremo";
  } else if (velocidadMaxima >= 300) {
    categoria = "Supercar Estándar";
  } else {
    categoria = "Deportivo Alto Rendimiento";
  }

  // For...in
  var resultadoForIn = "<strong>Modelos probados:</strong><br>";
  for (var key in modelos) {
    resultadoForIn += "Índice " + key + ": " + modelos[key] + "<br>";
  }

  // Guardar en historial
  historialSimulaciones.push({
    fecha: new Date().toLocaleString(),
    max: velocidadMaxima,
    categoria: categoria
  });

  // Mostrar resultados
  resultadosDiv.innerHTML += `
    <h3>Simulación de Velocidades</h3>
    <pre>
Modelo: ${modeloMayus}
Resumen: ${modeloResumen}
Velocidades registradas: ${velocidades.join(", ")}
Velocidad máxima: ${velocidadMaxima} km/h
Velocidad mínima: ${velocidadMinima} km/h
Promedio: ${promedioVelocidad} km/h
Categoría: ${categoria}
Verificación numérica: "${valorPrueba}" → ${esNumero}
Extras disponibles: ${extras.join(", ")}
${resultadoForIn}
    </pre>
  `;
}

function reiniciarDatos() {
  document.getElementById("resultadosSimulacion").innerHTML = "";
  historialSimulaciones = [];
}

// Mostrar inicio al cargar
mostrarSeccion('inicio');
