const firebaseConfig = {
  apiKey: "AIzaSyA-XFTWGpmqfoiwKpvUEPMmF_cr3gJMYbM",
  authDomain: "gestorproyectos-511db.firebaseapp.com",
  databaseURL: "https://gestorproyectos-511db-default-rtdb.firebaseio.com",
  projectId: "gestorproyectos-511db",
  storageBucket: "gestorproyectos-511db.appspot.com",
  messagingSenderId: "256455306545",
  appId: "1:256455306545:web:c48e480d1c294c0d04d410",
};

firebase.initializeApp(firebaseConfig);

function resetFields() {
  document.getElementById("Input1").value = "";
  document.getElementById("Input2").value = "";
  document.getElementById("Input3").value = "";
  document.getElementById("Input4").value = "selecciona";
  document.getElementById("Input5").value = "";
  document.getElementById("Input6").value = "";
  document.getElementById("Input7").value = "";
  document.getElementById("Input8").value = "selecciona";
}

function createR() {
  document.getElementById("Input1").disabled = false;

  //guardo los datos capturados usando el id de cada control
  var id = document.getElementById("Input1").value;
  var nombre = document.getElementById("Input2").value;
  var descripcion = document.getElementById("Input3").value;
  var tipoProyecto = document.getElementById("Input4").value;
  var tecnologias = document.getElementById("Input5").value;
  var participantes = document.getElementById("Input6").value;
  var fecha = document.getElementById("Input7").value;
  var urgencia = document.getElementById("Input8").value;

  //validaciones
  if (id.length > 0) {
    //crea un objeto que guarda los datos

    var proyecto = {
      id,
      nombre,
      descripcion,
      tipoProyecto,
      tecnologias,
      participantes,
      fecha,
      urgencia,
    };

    firebase
      .database()
      .ref("Proyectos/" + id)
      .update(proyecto)
      .then(() => {
        resetFields();
      })
      .then(() => {
        read();
      });

    swal("Listo", "Proyecto agregado correctamente", "success");
  } else {
    swal("Error", "Llena todos los campos", "warning");
  }

    document.getElementById("Input1").disabled = false;
  }

  function read() {
    document.getElementById("Table1").innerHTML = "";

    var ref = firebase.database().ref("Proyectos");

    ref.on("child_added", function (snapshot) {
      printRow(snapshot.val());
    });
  }

  function printRow(proyecto) {
    if (proyecto != null) {
      var table = document.getElementById("Table1");

      //creamos un nuevo elemento en la tabla en la ultima posicion
      var row = table.insertRow(-1);

      //insertamos cada una de las celdas/columnas del registro

      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      var cell7 = row.insertCell(6);
      var cell8 = row.insertCell(7);
      var cell9 = row.insertCell(8);
      var cell9 = row.insertCell(8);
      var cell10 = row.insertCell(9);

      cell1.innerHTML = proyecto.id;
      cell2.innerHTML = proyecto.nombre;
      cell3.innerHTML = proyecto.descripcion;
      cell4.innerHTML = proyecto.tipoProyecto;
      cell5.innerHTML = proyecto.tecnologias;
      cell6.innerHTML = proyecto.participantes;
      cell7.innerHTML = proyecto.fecha;
      cell8.innerHTML = proyecto.urgencia;
      cell9.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${proyecto.id})">Eliminar</button>`;
      cell10.innerHTML =
        '<button type="button" class="btn btn-success" onClick="seekR(' +
        proyecto.id +
        ')">Modificar</button>';
    }
  }

  function deleteR(id) {
    firebase
      .database()
      .ref("Proyectos/" + id)
      .set(null)
      .then(() => {
        read();
      })
      .then(() => {
        swal("Listo!", "Eliminado correctamente", "success");
      });
  }

  function seekR(id) {
    var ref = firebase.database().ref("Proyectos/" + id);
    ref.on("value", function (snapshot) {
      updateR(snapshot.val());
    });
  }

  function updateR(proyecto) {
    if (proyecto != null) {
      document.getElementById("Input1").value = proyecto.id;
      document.getElementById("Input1").disabled = true;
      document.getElementById("Input2").value = proyecto.nombre;
      document.getElementById("Input3").value = proyecto.descripcion;
      document.getElementById("Input4").value = proyecto.tipoProyecto;
      document.getElementById("Input5").value = proyecto.tecnologias;
      document.getElementById("Input6").value = proyecto.participantes;
      document.getElementById("Input7").value = proyecto.fecha;
      document.getElementById("Input8").value = proyecto.urgencia;
    }
  }

  function readQ() {
    document.getElementById("Table2").innerHTML = "";
    var c = document.getElementById("Input8").value;

    var ref = firebase.database().ref("Proyectos");
    ref
      .orderByChild("tipoProyecto")
      .equalTo(c)
      .on("child_added", function (snapshot) {
        printRowQ(snapshot.val());
      });
  }

  function printRowQ(proyecto) {
    var table = document.getElementById("Table2");

    var row = table.insertRow(-1);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);

    cell1.innerHTML = proyecto.id;
    cell2.innerHTML = proyecto.nombre;
    cell3.innerHTML = proyecto.descripcion;
    cell4.innerHTML = proyecto.tipoProyecto;
    cell5.innerHTML = proyecto.tecnologias;
    cell6.innerHTML = proyecto.participantes;
    cell7.innerHTML = proyecto.fecha;
    cell8.innerHTML = proyecto.urgencia;
  }

