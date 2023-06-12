$(document).ready(function () {
  const url = "https://www.php.engenius.com.co/DatabaseIE.php";

  function fetchData(requestData, successCallback, errorCallback) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.login === "Success") {
          successCallback(data.data);
        } else {
          errorCallback("Error al obtener los datos");
        }
      })
      .catch((error) => {
        errorCallback("Error: " + error);
      });
  }
  // esta me muestra los municipios en la tabla
  function showData(data, tableId) {
    const body_table = document.getElementById(tableId);
    body_table.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
      const result = data[i];
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${result.nombre}</td>
        <td>${result.dane}</td>
      `;
      body_table.appendChild(tr);
    }
  }
  // con esta función obtengo la información de la api
  function getMunicipios() {
    const requestData = {
      User: "etraining",
      Password: "explorandoando2020%",
      option: "municipios",
    };

    fetchData(
      requestData,
      function (data) {
        showData(data, "info-data");
        $("#municipios-table tr").click(function () {
          $(this).addClass("clicked").siblings().removeClass("clicked");
        });
      },
      function (error) {
        alert(error);
      }
    );
  }
  // ejecuto la función para mostrar la información al cargar la pagina
  getMunicipios();

  $(document).on("click", "#municipios-table tbody tr", function () {
    const nombreMunicipio = $(this).find("td:first").text();
    const codMun = $(this).find("td:last").text();

    let title_table_IE = document.getElementById("title-table-IE");
    title_table_IE.innerHTML = `${nombreMunicipio}`;

    getInstituciones(codMun);
  });

  function getInstituciones(codMun) {
    const requestData = {
      User: "etraining",
      Password: "explorandoando2020%",
      option: "instituciones",
      CodMun: codMun,
    };

    fetchData(
      requestData,
      function (data) {
        showData(data, "info-data-IE");
        $("#institucion-table tr").click(function () {
          $(this).addClass("clicked").siblings().removeClass("clicked");
        });
        // Limpiar la tabla de sedes
        document.getElementById("info-data-Sedes").innerHTML = "";
        document.getElementById("title-table-sedes").innerHTML = "";
        // Limpiar la tabla de grupos
        document.getElementById("info-data-Grupos").innerHTML = "";
        document.getElementById("title-table-grupos").innerHTML = "";
        // Limpiar la tabla de la información del grupo
        document.getElementById("info-data-InfoGrupo").innerHTML = "";
        document.getElementById("title-table-infGrupo").innerHTML = "";
      },
      function (error) {
        alert(error);
      }
    );
  }

  $(document).on("click", "#instituciones-table tbody tr", function () {
    const codInst = $(this).find("td:last").text();

    getSedes(codInst);
  });

  function getSedes(codInst) {
    const requestData = {
      User: "etraining",
      Password: "explorandoando2020%",
      option: "sedes",
      CodInst: codInst,
    };

    fetchData(
      requestData,
      function (data) {
        showData(data, "info-data-Sedes");
        $("#sedes-table tr").click(function () {
          $(this).addClass("clicked").siblings().removeClass("clicked");
        });
        // Limpiar la tabla de grupos
        document.getElementById("info-data-Grupos").innerHTML = "";
        // Limpiar la tabla de la información del grupo
        document.getElementById("info-data-InfoGrupo").innerHTML = "";
      },
      function (error) {
        console.log("Error al obtener las sedes");
      }
    );
  }

  $(document).on("click", "#institucion-table tbody tr", function () {
    const nombreInstitucion = $(this).find("td:first").text();
    const codInst = $(this).find("td:last").text();

    let title_table_sedes = document.getElementById("title-table-sedes");
    title_table_sedes.innerHTML = `${nombreInstitucion}`;
    getSedes(codInst);
  });

  function getGrupos(codSede) {
    const requestData = {
      User: "etraining",
      Password: "explorandoando2020%",
      option: "grupos",
      CodSede: codSede,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.login === "Success" && data.option === "grupos") {
          showGrupos(data.data);
          $("#grupo-table tr").click(function () {
            $(this).addClass("clicked").siblings().removeClass("clicked");
          });
          // Limpiar la tabla de la información del grupo
          document.getElementById("info-data-InfoGrupo").innerHTML = "";
        } else {
          console.log("Error al obtener los grupos");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function showGrupos(grupos) {
    let body_table_Grupos = document.getElementById("info-data-Grupos");
    body_table_Grupos.innerHTML = "";
    for (let i = 0; i < grupos.length; i++) {
      let resultGrupo = grupos[i];
      let tr_table_Grupos = document.createElement("tr");
      tr_table_Grupos.innerHTML = `
      <td>${resultGrupo.nombre}</td>
      <td>${resultGrupo.id}</td>
    `;
      body_table_Grupos.appendChild(tr_table_Grupos);
    }
  }

  $(document).on("click", "#sedes-table tbody tr", function () {
    const nombreSede = $(this).find("td:first").text();
    const codSede = $(this).find("td:last").text();

    let title_grupos = document.getElementById("title-table-grupos");
    title_grupos.innerHTML = `${nombreSede}`;
    getGrupos(codSede);
  });

  function getInfoGrupo(idGrupo) {
    const requestData = {
      User: "etraining",
      Password: "explorandoando2020%",
      option: "infoGrupo",
      IdGrupo: idGrupo,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.login === "Success" && data.option === "infoGrupo") {
          showInfoGrupo(data.data);
        } else {
          alert("Error al obtener los grupos");
        }
      })
      .catch((error) => {
        alert("Error:", error);
      });
  }

  function showInfoGrupo(grupo) {
    let body_data_group = document.getElementById("info-data-InfoGrupo");
    body_data_group.innerHTML = "";
    for (let i = 0; i < grupo.length; i++) {
      let resultDataGroup = grupo[i];
      let tr_body_data_group = document.createElement("tr");
      tr_body_data_group.innerHTML = `
      
        <td>${resultDataGroup.id}</td>
        <td>${resultDataGroup.nombre}</td>
        <td>${resultDataGroup.sede}</td>
        <td>${resultDataGroup.institución}</td>
        <td>${resultDataGroup.municipio}</td>
        <td>${resultDataGroup.numGrupo}</td>
      `;
      body_data_group.appendChild(tr_body_data_group);
    }
  }

  $(document).on("click", "#grupo-table tbody tr", function () {
    const nomGrupo = $(this).find("td:first").text();
    const idGrupo = $(this).find("td:last").text();

    let title_infoGrupo = document.getElementById("title-table-infGrupo");
    title_infoGrupo.innerHTML = `${nomGrupo}`;
    getInfoGrupo(idGrupo);
  });
});
