const materialesInput = document.getElementById('materiales');
const alturaInput = document.getElementById('altura');
const edadInput = document.getElementById('edad');
const mantenimientoInput = document.getElementById('mantenimiento');
const calcularBtn = document.getElementById('calcular');
const reiniciarBtn = document.getElementById('reiniciar');
const vulnerabilidadSpan = document.getElementById('vulnerabilidad');
const graficoBarras = document.getElementById('graficoBarras');
let chart = null;

function calcularVulnerabilidad() {
  const materiales = parseFloat(materialesInput.value);
  const altura = parseFloat(alturaInput.value);
  const edad = parseFloat(edadInput.value);
  const mantenimiento = parseFloat(mantenimientoInput.value);

  const vulnerabilidad = 1.5 + (0.3 * materiales) + (0.4 * altura) + (0.2 * edad) + (0.5 * mantenimiento);

  vulnerabilidadSpan.textContent = vulnerabilidad.toFixed(2);

  actualizarGrafico(materiales, altura, edad, mantenimiento);
}

function reiniciarValores() {
  materialesInput.value = 0;
  alturaInput.value = 0;
  edadInput.value = 0;
  mantenimientoInput.value = 0;
  vulnerabilidadSpan.textContent = 0;
  actualizarGrafico(0, 0, 0, 0);
}

function actualizarGrafico(materiales, altura, edad, mantenimiento) {
  if (chart) {
    chart.destroy();
  }

  const data = {
    labels: ['Vulnerabilidad Sísmica'],
    datasets: [
      {
        label: 'Base',
        data: [1.5], 
        backgroundColor: 'rgba(220, 220, 220, 1)' 
      },
      {
        label: 'Materiales',
        data: [0.3 * materiales], 
        backgroundColor: 'rgba(255, 99, 132, 0.7)' 
      },
      {
        label: 'Altura',
        data: [0.4 * altura], 
        backgroundColor: 'rgba(54, 162, 235, 0.7)' 
      },
      {
        label: 'Edad',
        data: [0.2 * edad], 
        backgroundColor: 'rgba(255, 205, 86, 0.7)' 
      },
      {
        label: 'Mantenimiento',
        data: [0.5 * mantenimiento], 
        backgroundColor: 'rgba(75, 192, 192, 0.7)' 
      }
    ]
  };

  chart = new Chart(graficoBarras, {
    type: 'bar',
    data: data,
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Componentes de la Vulnerabilidad Sísmica'
        }
      },
      responsive: true,
      scales: {
        x: {
          stacked: true 
        },
        y: {
          stacked: true,
          beginAtZero: true,
          title: {
            display: true,
            text: 'Nivel de Vulnerabilidad'
          }
        }
      }
    }
  });
}

calcularBtn.addEventListener('click', calcularVulnerabilidad);
reiniciarBtn.addEventListener('click', reiniciarValores);

// Inicializar gráfico 
actualizarGrafico(0, 0, 0, 0); 