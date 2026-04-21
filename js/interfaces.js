/**
 * DEFINICIÓN DE CONTRATOS (INTERFACES)
 * Según el PDF de "Mi Plata", todas las cuentas deben cumplir con estos métodos.
 */

class ITransaction {
    // Regla: Toda cuenta debe poder consignar dinero
    consignar(monto) {
        throw new Error("El método 'consignar' no ha sido implementado.");
    }
    
    // Regla: Toda cuenta debe permitir retiros
    retirar(monto) {
        throw new Error("El método 'retirar' no ha sido implementado.");
    }
}

class ITransferible {
    // Regla: Las cuentas pueden enviar dinero a otros productos
    transferir(monto, cuentaDestino) {
        throw new Error("El método 'transferir' no ha sido implementado.");
    }
}

console.log("✅ Contratos de interfaz cargados.");