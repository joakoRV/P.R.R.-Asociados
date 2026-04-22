/**
 * MOTOR LÓGICO: JERARQUÍA DE HERENCIA Y COMPOSICIÓN
 * Este archivo contiene la inteligencia financiera del sistema "Mi Plata".
 */

// 1. CLASE RAÍZ (ABSTRACTA): Cuenta
// Absorbe las interfaces ITransaction e ITransferible
class Cuenta {
    constructor(numeroCuenta, saldoInicial = 0) {
        if (this.constructor === Cuenta) {
            throw new Error("No se puede instanciar la clase abstracta 'Cuenta'.");
        }
        this.numeroCuenta = numeroCuenta;
        this._saldo = saldoInicial;
        
        // CICLO DE VIDA DE MOVIMIENTOS (Composición)
        // El historial se crea aquí y depende de la existencia de la cuenta.
        this.movimientos = []; 
    }

    get saldo() {
        return this._saldo;
    }

    // Método privado para la composición de movimientos
    _registrarMovimiento(tipo, monto) {
        const registro = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            fecha: new Date().toLocaleString(),
            tipo: tipo,
            monto: monto,
            saldoResultante: this._saldo
        };
        this.movimientos.push(registro);
    }

    // Implementación del contrato ITransaction
    consignar(monto) {
        if (monto <= 0) return false;
        this._saldo += monto;
        this._registrarMovimiento("Consignación", monto);
        return true;
    }

    // Implementación del contrato ITransferible
    transferir(monto, cuentaDestino) {
        if (this.numeroCuenta === cuentaDestino.numeroCuenta) {
            throw new Error("No es posible transferir al mismo producto.");
        }
        
        // El proceso de retiro de esta cuenta ejecutará las reglas de su subclase
        if (this.retirar(monto)) {
            cuentaDestino.consignar(monto);
            this._registrarMovimiento(`Transferencia enviada a: ${cuentaDestino.numeroCuenta}`, -monto);
            return true;
        }
        return false;
    }
}

// 2. ESPECIALIZACIÓN: Cuenta de Ahorros
class CuentaAhorros extends Cuenta {
    constructor(numeroCuenta, saldoInicial) {
        super(numeroCuenta, saldoInicial);
        this.comisionRetiro = 0.015; // 1.5%
    }

    retirar(monto) {
        const costoTransaccion = monto * this.comisionRetiro;
        const totalADebitar = monto + costoTransaccion;

        if (totalADebitar <= this._saldo) {
            this._saldo -= totalADebitar;
            this._registrarMovimiento(`Retiro (Comisión 1.5%: ${costoTransaccion.toFixed(2)})`, -totalADebitar);
            return true;
        }
        throw new Error("Saldo insuficiente para cubrir el retiro y la comisión del 1.5%.");
    }
}

// 3. ESPECIALIZACIÓN: Cuenta Corriente
class CuentaCorriente extends Cuenta {
    constructor(numeroCuenta, saldoInicial) {
        super(numeroCuenta, saldoInicial);
        // Sobregiro del 20% sobre el saldo actual (dinámico)
        this.porcentajeSobregiro = 0.20;
    }

    retirar(monto) {
        const limiteSobregiro = this._saldo * this.porcentajeSobregiro;
        const disponibleTotal = this._saldo + limiteSobregiro;

        if (monto <= disponibleTotal) {
            this._saldo -= monto;
            this._registrarMovimiento(monto > (this._saldo + monto) ? "Retiro (Uso de Sobregiro)" : "Retiro", -monto);
            return true;
        }
        throw new Error("El monto excede el cupo de sobregiro permitido (20%).");
    }
}