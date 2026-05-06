$(document).ready(function () {
  console.log("Ejecutando script :)");

  $.getJSON("https://mindicador.cl/api", function (data) {
    var dailyIndicators = data;

    $("#toggle-dolar").change(function () {
      const activo_dolar = $(this).is(":checked");

      if (activo_dolar) {
        $("#div_hide").show();
        $("#valor-dolar").text(
          "Valor Dolar: " +
            dailyIndicators.dolar.valor +
            " " +
            dailyIndicators.dolar.unidad_medida
        );
      } else {
        $("#valor-dolar").text(null);
        $("#div_hide").hide();
      }
    });

    $("#toggle-euro").change(function () {
      const activo_euro = $(this).is(":checked");

      if (activo_euro) {
        $("#div_hide2").show();
        $("#valor-euro").text(
          "Valor Euro: " +
            dailyIndicators.euro.valor +
            " " +
            dailyIndicators.euro.unidad_medida
        );
      } else {
        $("#valor-euro").text(null);
        $("#div_hide2").hide();
      }
    });

    $("#toggle-bitcoin").change(function () {
      const activo_bitcoin = $(this).is(":checked");

      if (activo_bitcoin) {
        $("#div_hide3").show();
        $("#valor-bitcoin").text(
          "Valor Bitcoin: " +
            dailyIndicators.bitcoin.valor +
            " " +
            dailyIndicators.bitcoin.unidad_medida
        );
      } else {
        $("#valor-bitcoin").text(null);
        $("#div_hide3").hide();
      }
    });

    $("#toggle-uf").change(function () {
      const activo_uf = $(this).is(":checked");

      if (activo_uf) {
        $("#div_hide4").show();
        $("#valor-uf").text(
          "Valor uf: " +
            dailyIndicators.uf.valor +
            " " +
            dailyIndicators.uf.unidad_medida
        );
      } else {
        $("#valor-uf").text(null);
        $("#div_hide4").hide();
      }
    });
  }).fail(function () {
    console.log("Error al consumir la API!");
  });
});

// Ver la grafica de los indicadores//

$(document).ready(function () {
  // Función para cargar el gráfico
  function cargarGrafico(indicador) {
    $.getJSON(`https://mindicador.cl/api/${indicador}`, function (data) {
      const labels = [];
      const valores = [];

      data.serie
        .slice(0, 30)
        .reverse()
        .forEach((item) => {
          const fecha = new Date(item.fecha);
          labels.push(`${fecha.getDate()}/${fecha.getMonth() + 1}`);
          valores.push(item.valor);
        });

      const ctx = document.getElementById("indicador-Eco").getContext("2d");

      if (window.miGrafico) {
        window.miGrafico.destroy();
      }

      window.miGrafico = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: `${
                indicador.charAt(0).toUpperCase() + indicador.slice(1)
              } (últimos 30 días)`,
              data: valores,
              borderColor: "rgba(0, 123, 255, 1)",
              backgroundColor: "rgba(0, 123, 255, 0.3)",
              borderWidth: 2,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true, position: "top" },
          },
          scales: {
            y: { beginAtZero: false },
          },
        },
      });
    });
  }

  // Evento para mostrar gráfico y guardar indicador actual
  $(".btn-mostrar").click(function () {
    const indicador = $(this).data("indicador");
    $("#container-graf").show();

    // Guardar indicador en variable global
    window.indicadorActual = indicador;

    cargarGrafico(indicador);
  });

  // Evento para cerrar gráfico 
  $("#btn-cerrar").click(function () {
    $("#container-graf").hide();
  });

  // Evento para actualizar gráfico
  $("#btn-actualizar").click(function () {
    if (window.indicadorActual) {
      console.log("Botón Actualizar presionado");
      cargarGrafico(window.indicadorActual);
    } else {
      console.log("No hay indicador cargado aún");
    }
  });
});
