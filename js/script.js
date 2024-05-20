
import Crypto from "./Crypto.js";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('anuncioForm');
    const eliminarTodosBtn = document.getElementById('eliminarTodosBtn');
    const cryptosTable = document.getElementById('cryptosTable').querySelector('tbody');
    let cryptos = JSON.parse(localStorage.getItem('cryptos')) || [];

    const cargarCryptos = () => {
        cryptosTable.innerHTML = '';
        cryptos.forEach(crypto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${crypto.nombre}</td>
                <td>${crypto.simbolo}</td>
                <td>${crypto.fechaCreacion}</td>
                <td>${crypto.precioActual}</td>
                <td>${crypto.consenso}</td>
                <td>${crypto.cantidadCirculacion}</td>
                <td>${crypto.algoritmo}</td>
                <td>${crypto.sitioWeb}</td>
                <td>
                    <button class="eliminar-btn" data-id="${crypto.id}">Eliminar</button>
                </td>
            `;
            cryptosTable.appendChild(row);
        });

        const eliminarBtns = document.querySelectorAll('.eliminar-btn');
        eliminarBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                if (confirm('¿Estás seguro de que quieres eliminar esta moneda?')) {
                    eliminarCrypto(id);
                }
            });
        });
    };

    const guardarCrypto = () => {
        const nombre = form.nombre.value;
        const simbolo = form.simbolo.value;
        const fechaCreacion = new Date().toLocaleDateString();
        const precioActual = form.precio.value;
        const consenso = form.tipo.value;
        const cantidadCirculacion = form.cantidad.value;
        const algoritmo = form.algoritmo.value;
        const sitioWeb = form.sitioWeb.value;

        const id = Date.now();
        const crypto = new Crypto(id, nombre, simbolo, fechaCreacion, precioActual, consenso, cantidadCirculacion, algoritmo, sitioWeb);

        cryptos.push(crypto);
        localStorage.setItem('cryptos', JSON.stringify(cryptos));
        cargarCryptos();
        form.reset();
    };

    const eliminarCrypto = (id) => {
        cryptos = cryptos.filter(crypto => crypto.id !== parseInt(id));
        localStorage.setItem('cryptos', JSON.stringify(cryptos));
        cargarCryptos();
    };

    const eliminarTodos = () => {
        if (confirm('¿Estás seguro de que quieres eliminar todas las monedas?')) {
            cryptos = [];
            localStorage.setItem('cryptos', JSON.stringify(cryptos));
            cargarCryptos();
        }
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        guardarCrypto();
    });

    eliminarTodosBtn.addEventListener('click', eliminarTodos);

    cargarCryptos();
});