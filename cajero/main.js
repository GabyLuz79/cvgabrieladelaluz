
var cuentas = [
    { nombre: "Gaby", saldo: 200, password: 'pandita' },
    { nombre: "Danny", saldo: 290, password: 'charmander' },
    { nombre: "Raul", saldo: 67, password: '2468' }
];
var indice = -1;

var htmlInicio = '<button onclick="login()">Iniciar sesion</button> <button onclick="crearCuenta()">Crear cuenta</button>';

var htmlOperaciones = '<p>Elija la operacion a realizar:</p><button onclick="consultarDisponible()">Consultar saldo</button> <button onclick="ingresar()">Ingresar monto</button> <button onclick="retirar()">Retirar monto</button> <button onclick="salir()">Salir</button>';

var htmlRespuesta = '<p id="texto"></p><button onclick="operaciones()">Volver</button>';

function operaciones() {
    document.getElementById("cajero").innerHTML = htmlOperaciones;
};
function login() {
    var nombreCuenta;
    for (var i = 0; i < cuentas.length; i++) {

        if (i === 0) {
            nombreCuenta = prompt("Ingrese nombre de usuario:");
        };

        if (nombreCuenta === null) {

            break;
        } else if (nombreCuenta === cuentas[i].nombre) {


            var indiceCuenta = i;

            var pwCuenta;
            while (pwCuenta !== cuentas[indiceCuenta].password) {
                pwCuenta = prompt('Accediendo a la cuenta de "' + cuentas[indiceCuenta].nombre + '". Ingrese contraseña:');
                if (pwCuenta === null) {
                    indiceCuenta === -1;
                    break;
                } else if (pwCuenta === cuentas[indiceCuenta].password) {
                    operaciones();

                    indice = indiceCuenta;
                } else {
                    alert("La contraseña no es correcta. Intente de nuevo.");
                };
            };

            break;
        } else if (i === cuentas.length - 1) {

            alert("No existe usuario con este nombre. Intente de nuevo.");
            i = -1;
        };
    };
};
function crearCuenta() {
    var existe = true;
    while (existe !== false) {
        var ccNombre = prompt("Ingrese el usuario que desea utilizar:");
        if (ccNombre !== null) {

            for (var i = 0; i < cuentas.length; i++) {
                if (ccNombre === cuentas[i].nombre) {
                    existe = true;
                    alert("Este nombre de usuario ya existe.");
                    break;
                } else {
                    existe = false;
                };
            };

            if (existe === false) {
                var ccPassword = prompt("Ingrese una contraseña:");
                if (ccPassword !== null) {
                    var ccSaldo = NaN;
                    while (isNaN(ccSaldo) === true) {
                        ccSaldo = prompt("Ingrese saldo inicial:");
                        if (ccSaldo !== null) {
                            ccSaldo = Number(ccSaldo);
                            if (isNaN(ccSaldo) === true) {
                                alert("El valor ingresado no es numero. Intente de nuevo.");
                            } else if (ccSaldo === null) {
                                break;
                            } else if (ccSaldo < 10) {
                                alert("El valor ingresado es menor que el monto minimo. El monto minimo que debe tener una cuenta es $10.");
                                ccSaldo = NaN;
                            } else if (ccSaldo > 990) {
                                alert("El valor ingresado es mayor que el monto maximo. El monto maximo puede tener la cuenta es de $990");
                                ccSaldo = NaN;
                            } else {
                                cuentas.push({ nombre: ccNombre, saldo: ccSaldo, password: ccPassword });
                                alert('Se ha guardado tu cuenta. Tu nombre de usuario es "' + ccNombre + '". Tu contraseña es "' + ccPassword + '". Tu saldo inicial es de $' + ccSaldo + '.')
                            };
                        } else {
                            break;
                        };
                    };
                };
            };
        } else {
            break;
        };
    };
};
function consultarDisponible() {
    var textToShow = ("El saldo disponible en la cuenta de " + "<b>" + cuentas[indice].nombre + "</b>" + " es de: <b>$" + cuentas[indice].saldo + "</b>");
    document.getElementById("cajero").innerHTML = htmlRespuesta
    document.getElementById("texto").innerHTML = textToShow;
};
function ingresar() {
    var saldoActual = cuentas[indice].saldo;
    while (saldoActual === cuentas[indice].saldo) {
        var strMonto = prompt("Monto a ingresar:");
        var monto = Number(strMonto);
        if (strMonto === null) {
            break;
        } else if ((isNaN(monto) === true) || (monto <= 0)) {
            alert("Por favor, ingrese un monto valido.");
        } else {
            var nuevoSaldo = monto + saldoActual
            if (nuevoSaldo > 990) {
                alert("Su saldo actual es de $" + saldoActual + ", al ingresar $" + monto + " se supera el maximo de $990. Operacion no permitida.");
            } else {
                var textToShow = ("El monto ingresado es de <b>$" + monto + "</b>. Su nuevo saldo es de <b>$" + nuevoSaldo + "</b>.");
                cuentas[indice].saldo = nuevoSaldo;
                document.getElementById("cajero").innerHTML = htmlRespuesta;
                document.getElementById("texto").innerHTML = textToShow
            };
        };
    };
};
function retirar() {
    var saldoActual = cuentas[indice].saldo;
    while (saldoActual === cuentas[indice].saldo) {
        var strMonto = prompt("Monto a ingresar:");
        var monto = Number(strMonto);
        if (strMonto === null) {
            break;
        } else if ((isNaN(monto) === true) || (monto <= 0)) {
            alert("Por favor, ingrese un monto valido.");
        } else {
            var nuevoSaldo = saldoActual - monto;
            if (nuevoSaldo < 10) {
                alert("Su saldo actual es de $" + saldoActual + ". Al retirar $" + monto + " la cuenta tendri­a menos de  $10. Operacion no permitida.");
            } else {
                var textToShow = ("El monto ingresado es de <b>$" + monto + "</b>. Su nuevo saldo es de <b>$" + nuevoSaldo + "</b>.");
                cuentas[indice].saldo = nuevoSaldo;
                document.getElementById("cajero").innerHTML = htmlRespuesta;
                document.getElementById("texto").innerHTML = textToShow;
            };
        };
    };
};
function salir() {
    indice = -1;
    document.getElementById("cajero").innerHTML = htmlInicio;
};
