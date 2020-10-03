/**
 * @summary Attaches enum-like objects to the global scope
 * @author  Gianmarco Caputo <gianmarco.caputo.uk@gmail.com>
 */

// Available partners for login
global.Partners = Object.freeze({
    LENOVO: Symbol("lenovo"), SAGE: Symbol("sage"), DEMO: Symbol("demo")
});