// ==UserScript==
// @name         Amazon Script
// @namespace    http://tampermonkey.net/
// @version      2024-10-27
// @description  Convertidor de precios para productos de Amazon España, que facilita la conversión de euros a pesos mexicanos.
// @author       Myriam Figueroa
// @match        https://www.amazon.es/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Conversión actual
    const tasaConversion = 21.60

    function conversionPrecio(precioEuros){
        return (precioEuros * tasaConversion).toFixed(2);
    }

    const precioAmazon = document.querySelectorAll('.a-price');

    precioAmazon.forEach(precioArticulo => {
        const cadPrecio = precioArticulo.querySelector('.a-offscreen')?.innerText.trim() || "";
        const Decprecio = parseFloat(cadPrecio.replace(/\s+/g, '').replace('€', '').replace(',', '.'));

        const precioPesos = conversionPrecio(Decprecio);
        const nuevoPrecio = document.createElement('span');
        nuevoPrecio.innerText = ` (${precioPesos} MXN)`;
        nuevoPrecio.style.fontWeight = 'normal';
        nuevoPrecio.style.marginLeft = '5px';
        nuevoPrecio.style.fontSize = '0.6em';

        precioArticulo.appendChild(nuevoPrecio);
    });
})();