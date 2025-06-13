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
// === MOSTRAR RESULTADOS VISUALES EN LA PÁGINA ===
function mostrarResultadosRubrica() {
  // Variables básicas
  var nombre = "Juan";
  var edad = 25;
  var esMayorDeEdad = true;

  // Escape de caracteres
  var mensaje = "Hola \"usuario\", bienvenido.";

  // Operadores matemáticos
  var a = 10, b = 3;
  var suma = a + b;
  var resta = a - b;
  var multiplicacion = a * b;
  var division = a / b;
  var modulo = a % b;

  // Estructuras de control
  var resultadoIfElse = "";
  if (edad >= 18) {
    resultadoIfElse = nombre + " es mayor de edad.";
  } else {
    resultadoIfElse = nombre + " es menor de edad.";
  }

  var resultadoFor = "";
  for (var i = 0; i < 5; i++) {
    resultadoFor += i + ", ";
  }
  resultadoFor = resultadoFor.slice(0, -2); // quitar última coma

  var arrayEjemplo = ["Lamborghini", "Ferrari", "Porsche"];
  var resultadoForIn = "";
  for (var key in arrayEjemplo) {
    resultadoForIn += key + ": " + arrayEjemplo[key] + "<br>";
  }

  // Cadenas
  var cadena = "Bienvenido a Lamborghini";
  var mayusculas = cadena.toUpperCase();
  var minusculas = cadena.toLowerCase();
  var charAt = cadena.charAt(0);
  var substring = cadena.substring(0, 9);
  var split = cadena.split(" ");
  var concatenacion = "Modelo: " + "Aventador";

  // Arreglos
  var colores = ["Rojo", "Negro"];
  colores.push("Amarillo"); // Agregar al final
  colores.unshift("Verde"); // Agregar al inicio
  colores.pop(); // Eliminar último
  colores.shift(); // Eliminar primero
  var longitud = colores.length;
  var join = colores.join(", ");
  var reverse = colores.reverse().join(", ");

  // Números
  var numeroValido = isNaN("123") ? "No es número" : "Es número válido";
  var valorNaN = NaN;
  var esNaN = isNaN(valorNaN);

  // Mostrar resultados en pantalla
  var output = `
    <h3>Variables y Tipos</h3>
    <pre>
nombre = "${nombre}"
edad = ${edad}
esMayorDeEdad = ${esMayorDeEdad}
escape = "${mensaje}"
    </pre>

    <h3>Operadores</h3>
    <pre>
suma = ${suma}
resta = ${resta}
multiplicación = ${multiplicacion}
división = ${division}
módulo = ${modulo}
    </pre>

    <h3>Estructuras de Control</h3>
    <p><strong>If-else:</strong> ${resultadoIfElse}</p>
    <p><strong>For:</strong> ${resultadoFor}</p>
    <p><strong>For...in:</strong><br>${resultadoForIn}</p>

    <h3>Cadenas</h3>
    <pre>
toUpperCase: ${mayusculas}
toLowerCase: ${minusculas}
charAt(0): ${charAt}
substring(0,9): ${substring}
split(" "): ${split.join(", ")}
concatenación: ${concatenacion}
    </pre>

    <h3>Arreglos</h3>
    <pre>
push(), pop(), shift(), unshift()
longitud: ${longitud}
join(): ${join}
reverse(): ${reverse}
    </pre>

    <h3>Números</h3>
    <pre>
isNaN("123"): ${numeroValido}
isNaN(NaN): ${esNaN ? "Es NaN" : "No es NaN"}
    </pre>
  `;

  document.getElementById("resultados").innerHTML = output;
}
