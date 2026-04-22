// --- NAVEGACIÓN ENTRE SECCIONES ---
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar Lucide
    lucide.createIcons();
    
    // Manejar navegación entre secciones
    const navLinks = document.querySelectorAll('.nav-link[data-page]');
    const contentSections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.getAttribute('data-page');
            
            // Remover clase active de todos los links
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Ocultar todas las secciones
            contentSections.forEach(section => {
                section.classList.add('hidden');
            });
            
            // Mostrar sección correspondiente
            let targetSection;
            switch(targetPage) {
                case 'dashboard':
                    targetSection = document.getElementById('dashboard-section');
                    break;
                case 'transactions':
                    targetSection = document.getElementById('transactions-section');
                    break;
                case 'profile':
                    targetSection = document.getElementById('profile-section');
                    break;
                case 'settings':
                    targetSection = document.getElementById('settings-section');
                    break;
                case 'deposit':
                    targetSection = document.getElementById('deposit-section');
                    break;
                case 'transfer':
                    targetSection = document.getElementById('transfer-section');
                    break;
                case 'balance':
                    targetSection = document.getElementById('balance-section');
                    break;
                case 'movements':
                    targetSection = document.getElementById('movements-section');
                    break;
                case 'accounts':
                    targetSection = document.getElementById('accounts-section');
                    break;
                case 'cards':
                default:
                    targetSection = document.getElementById('cards-section');
                    break;
            }
            
            if (targetSection) {
                targetSection.classList.remove('hidden');
            }
        });
    });
    
    // Inicializar con la sección de tarjetas visible
    const cardsSection = document.getElementById('cards-section');
    if (cardsSection) {
        cardsSection.classList.remove('hidden');
    }
    
    const profileSection = document.getElementById('profile-section');
    if (profileSection) {
        profileSection.classList.add('hidden');
    }

    // Control del Sidebar
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleBtn');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('sidebar-hidden');
            
            // Ajustar el margen del contenedor principal
            const mainContainer = document.querySelector('.main-container');
            if (sidebar.classList.contains('sidebar-hidden')) {
                mainContainer.style.marginLeft = '0';
            } else {
                mainContainer.style.marginLeft = '18rem';
            }
        });
    }

    // Efecto de Brillo Dinámico para todas las tarjetas
    document.querySelectorAll('.card-wrapper').forEach(wrapper => {
        wrapper.addEventListener('mousemove', (e) => {
            if (wrapper.classList.contains('is-flipped')) return;

            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const glow = wrapper.querySelector('.card-glow');
            if (glow) {
                glow.style.setProperty('--x', `${(x / rect.width) * 100}%`);
                glow.style.setProperty('--y', `${(y / rect.height) * 100}%`);
            }

            // Ligera inclinación
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (centerY - y) / 12;
            const rotateY = (x - centerX) / 12;
            
            const cardInner = wrapper.querySelector('.card-inner');
            if (cardInner && !wrapper.classList.contains('is-flipped')) {
                cardInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });

        wrapper.addEventListener('mouseleave', () => {
            if (!wrapper.classList.contains('is-flipped')) {
                const cardInner = wrapper.querySelector('.card-inner');
                if (cardInner) {
                    cardInner.style.transform = 'rotateX(0deg) rotateY(0deg)';
                }
            }
        });

        // Click para voltear la tarjeta
        wrapper.addEventListener('click', function() {
            this.classList.toggle('is-flipped');
        });
    });

    // Fecha actual
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const currentDateElement = document.getElementById('currentDate');
    if (currentDateElement) {
        currentDateElement.textContent = new Date().toLocaleDateString('es-ES', options);
    }

    // Navegación activa (para links sin data-page)
    const navLinksGeneral = document.querySelectorAll('.nav-link:not([data-page])');
    navLinksGeneral.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los enlaces
            navLinksGeneral.forEach(l => l.classList.remove('active'));
            
            // Agregar clase active al enlace clickeado
            this.classList.add('active');
            
            // Aquí podrías agregar lógica para cambiar el contenido
            const page = this.getAttribute('data-page');
            console.log('Navegando a:', page);
        });
    });

    // Animación de entrada para las tarjetas
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar tarjetas para animación
    document.querySelectorAll('.card-wrapper').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Efectos de botones
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Crear efecto ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            // Agregar estilos ripple si no existen
            if (!document.querySelector('#ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'ripple-styles';
                style.textContent = `
                    button {
                        position: relative;
                        overflow: hidden;
                    }
                    .ripple {
                        position: absolute;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.6);
                        transform: scale(0);
                        animation: ripple-animation 0.6s ease-out;
                        pointer-events: none;
                    }
                    @keyframes ripple-animation {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Responsive: ajustar sidebar en móvil
    function checkScreenSize() {
        const sidebar = document.getElementById('sidebar');
        const mainContainer = document.querySelector('.main-container');
        
        if (window.innerWidth <= 1024) {
            sidebar.classList.add('sidebar-hidden');
            mainContainer.style.marginLeft = '0';
        } else {
            sidebar.classList.remove('sidebar-hidden');
            mainContainer.style.marginLeft = '18rem';
        }
    }

    // Verificar tamaño de pantalla al cargar y al redimensionar
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    // Funcionalidad del perfil
    const saveProfileBtn = document.querySelector('.profile-actions .btn-primary');
    const downloadDataBtn = document.querySelector('.profile-actions .btn-secondary');
    
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', function() {
            // Recopilar todos los datos del formulario
            const formData = {};
            const inputs = document.querySelectorAll('.form-input, .form-select');
            
            inputs.forEach(input => {
                formData[input.id] = input.value;
            });
            
            // Recopilar checkboxes
            const checkboxes = document.querySelectorAll('.preferences-grid input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                formData[checkbox.id] = checkbox.checked;
            });
            
            // Simular guardado
            console.log('Guardando perfil:', formData);
            showNotification('Perfil actualizado exitosamente', 'success');
            
            // Actualizar información del usuario en el sidebar
            const userName = document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value;
            const userNameElement = document.querySelector('.user-name');
            if (userNameElement) {
                userNameElement.textContent = userName;
            }
        });
    }
    
    if (downloadDataBtn) {
        downloadDataBtn.addEventListener('click', function() {
            // Crear archivo JSON con los datos del usuario
            const userData = {
                personal: {
                    firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    birthDate: document.getElementById('birthDate').value,
                    gender: document.getElementById('gender').value,
                    idType: document.getElementById('idType').value,
                    idNumber: document.getElementById('idNumber').value
                },
                contact: {
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    phone2: document.getElementById('phone2').value,
                    country: document.getElementById('country').value,
                    city: document.getElementById('city').value,
                    address: document.getElementById('address').value
                },
                work: {
                    occupation: document.getElementById('occupation').value,
                    company: document.getElementById('company').value,
                    income: document.getElementById('income').value,
                    workPhone: document.getElementById('workPhone').value
                },
                preferences: {
                    emailNotifications: document.getElementById('emailNotifications').checked,
                    smsNotifications: document.getElementById('smsNotifications').checked,
                    promotionalEmails: document.getElementById('promotionalEmails').checked,
                    monthlyStatements: document.getElementById('monthlyStatements').checked
                },
                exportDate: new Date().toISOString()
            };
            
            // Crear y descargar archivo
            const dataStr = JSON.stringify(userData, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `perfil_usuario_${Date.now()}.json`;
            link.click();
            URL.revokeObjectURL(url);
            
            showNotification('Datos descargados exitosamente', 'success');
        });
    }
    
    // Sistema de Feature Flags para funcionalidades
    const featureFlags = {
        'change-password': true,    // Disponible
        '2fa': false,              // Próximamente
        'biometrics': false,       // Próximamente
        'identity-verification': false,
        'connected-devices': false
    };

    // Función para verificar si una funcionalidad está disponible
    function isFeatureEnabled(feature) {
        return featureFlags[feature] || false;
    }

    // Inicializar filtros de movimientos
    initializeMovementFilters();
    
    // Renderizar movimientos iniciales si la sección está visible
    if (!document.getElementById('movements-section').classList.contains('hidden')) {
        renderMovements();
    }
    
    // Botones de seguridad con manejo de feature flags
    const securityBtns = document.querySelectorAll('.security-btn');
    securityBtns.forEach(btn => {
        const feature = btn.getAttribute('data-feature');
        
        if (feature) {
            // Actualizar estado del botón según feature flag
            if (isFeatureEnabled(feature)) {
                btn.classList.remove('security-disabled');
                btn.classList.add('security-enabled');
                btn.disabled = false;
                
                // Añadir funcionalidad real
                btn.addEventListener('click', function() {
                    handleSecurityAction(feature);
                });
            } else {
                btn.classList.remove('security-enabled');
                btn.classList.add('security-disabled');
                btn.disabled = true;
                
                // Mostrar notificación informativa
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    showNotification('Esta función estará disponible próximamente', 'info');
                });
            }
        }
    });

    // Manejador de acciones de seguridad
    function handleSecurityAction(feature) {
        switch(feature) {
            case 'change-password':
                showNotification('Abriendo formulario de cambio de contraseña...', 'success');
                // Aquí podrías abrir un modal o redirigir
                break;
            case '2fa':
                showNotification('Configuración de autenticación de dos factores', 'success');
                break;
            case 'biometrics':
                showNotification('Configuración de biometría facial', 'success');
                break;
            default:
                showNotification('Función en desarrollo', 'info');
        }
    }
    
    // Botón de cambiar avatar
    const avatarEditBtn = document.querySelector('.avatar-edit-btn');
    if (avatarEditBtn) {
        avatarEditBtn.addEventListener('click', function() {
            showNotification('Función de cambiar foto en desarrollo', 'success');
        });
    }
    function animateNumber(element, target, duration = 1000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Formatear como moneda
            element.textContent = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(current);
        }, 16);
    }

    // Animar el monto total cuando sea visible
    const summaryAmount = document.querySelector('.summary-amount');
    if (summaryAmount) {
        const amountObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetAmount = 12450000; // $12,450,000.00
                    animateNumber(summaryAmount, targetAmount, 2000);
                    amountObserver.unobserve(entry.target);
                }
            });
        });
        
        amountObserver.observe(summaryAmount);
    }
});

// --- FUNCIONES DE OPERACIONES BANCARIAS ---

function handleDeposit(event) {
    event.preventDefault();
    
    const account = document.getElementById('depositAccount').value;
    const amount = parseFloat(document.getElementById('depositAmount').value);
    const method = document.getElementById('depositMethod').value;
    const description = document.getElementById('depositDescription').value;
    
    // Validaciones
    if (!account || !amount || !method) {
        showNotification('Por favor completa todos los campos obligatorios', 'error');
        return;
    }
    
    if (amount < 10000) {
        showNotification('El monto mínimo de consignación es $10,000', 'error');
        return;
    }
    
    // Calcular comisión
    const fee = amount * 0.001; // 0.1%
    const total = amount + fee;
    
    // Actualizar resumen
    document.getElementById('depositSubtotal').textContent = formatCurrency(amount);
    document.getElementById('depositFee').textContent = formatCurrency(fee);
    document.getElementById('depositTotal').textContent = formatCurrency(total);
    
    // Simular procesamiento
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i data-lucide="loader-2" class="animate-spin"></i> Procesando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Guardar transacción
        const transaction = {
            type: 'deposit',
            account: account,
            amount: amount,
            method: method,
            description: description,
            fee: fee,
            total: total,
            date: new Date().toISOString(),
            status: 'completed'
        };
        
        saveTransaction(transaction);
        showNotification(`¡Consignación de ${formatCurrency(amount)} realizada exitosamente!`, 'success');
        
        // Resetear formulario
        event.target.reset();
        document.getElementById('depositSubtotal').textContent = '$0.00';
        document.getElementById('depositFee').textContent = '$0.00';
        document.getElementById('depositTotal').textContent = '$0.00';
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Actualizar saldos
        updateBalances();
        
        // Actualizar vista de movimientos si está visible
        if (document.getElementById('movements-section').classList.contains('hidden') === false) {
            renderMovements();
        }
        
    }, 2000);
}

function handleTransfer(event) {
    event.preventDefault();
    
    const from = document.getElementById('transferFrom').value;
    const to = document.getElementById('transferTo').value;
    const amount = parseFloat(document.getElementById('transferAmount').value);
    const type = document.getElementById('transferType').value;
    const beneficiary = document.getElementById('transferBeneficiary').value;
    const description = document.getElementById('transferDescription').value;
    
    // Validaciones
    if (!from || !to || !amount || !type || !beneficiary || !description) {
        showNotification('Por favor completa todos los campos', 'error');
        return;
    }
    
    if (amount < 10000) {
        showNotification('El monto mínimo de transferencia es $10,000', 'error');
        return;
    }
    
    // Calcular comisión según tipo
    let fee = 0;
    switch(type) {
        case 'own':
            fee = 0; // Cuenta propia sin comisión
            break;
        case 'third':
            fee = amount * 0.002; // 0.2%
            break;
        case 'other':
            fee = amount * 0.005; // 0.5%
            break;
        case 'international':
            fee = amount * 0.015; // 1.5%
            break;
    }
    
    const total = amount + fee;
    
    // Actualizar resumen
    document.getElementById('transferAmountDisplay').textContent = formatCurrency(amount);
    document.getElementById('transferFee').textContent = formatCurrency(fee);
    document.getElementById('transferTotal').textContent = formatCurrency(total);
    
    // Simular procesamiento
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i data-lucide="loader-2" class="animate-spin"></i> Procesando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Guardar transacción
        const transaction = {
            type: 'transfer',
            from: from,
            to: to,
            amount: amount,
            type: type,
            beneficiary: beneficiary,
            description: description,
            fee: fee,
            total: total,
            date: new Date().toISOString(),
            status: 'completed'
        };
        
        saveTransaction(transaction);
        showNotification(`Transferencia de ${formatCurrency(amount)} realizada exitosamente!`, 'success');
        
        // Resetear formulario
        event.target.reset();
        document.getElementById('transferAmountDisplay').textContent = '$0.00';
        document.getElementById('transferFee').textContent = '$0.00';
        document.getElementById('transferTotal').textContent = '$0.00';
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Actualizar saldos
        updateBalances();
        
        // Actualizar vista de movimientos si está visible
        if (document.getElementById('movements-section').classList.contains('hidden') === false) {
            renderMovements();
        }
        
    }, 2500);
}

function refreshBalances() {
    const refreshBtn = event.target;
    const originalText = refreshBtn.innerHTML;
    refreshBtn.innerHTML = '<i data-lucide="loader-2" class="animate-spin"></i> Actualizando...';
    refreshBtn.disabled = true;
    
    setTimeout(() => {
        // Simular actualización
        updateBalances();
        
        const lastUpdate = document.getElementById('lastBalanceUpdate');
        if (lastUpdate) {
            lastUpdate.textContent = 'Ahora';
        }
        
        refreshBtn.innerHTML = originalText;
        refreshBtn.disabled = false;
        
        showNotification('Saldos actualizados exitosamente', 'success');
        
    }, 1500);
}

function updateBalances() {
    // Actualizar timestamp
    const lastUpdate = document.getElementById('lastBalanceUpdate');
    if (lastUpdate) {
        const now = new Date();
        lastUpdate.textContent = 'Hace un momento';
    }
}

function exportMovements() {
    // Simular exportación
    const movements = getTransactions();
    const csvContent = generateMovementsCSV(movements);
    
    // Crear blob y descargar
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `movimientos_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Movimientos exportados exitosamente', 'success');
}

function generateMovementsCSV(movements) {
    const headers = ['Fecha', 'Tipo', 'Descripción', 'Monto', 'Cuenta', 'Estado'];
    const csvContent = [
        headers.join(','),
        ...movements.map(mov => [
            new Date(mov.date).toLocaleDateString(),
            mov.type,
            mov.description || '',
            mov.amount,
            mov.account || mov.from,
            mov.status
        ].join(','))
    ].join('\n');
    
    return csvContent;
}

// --- FUNCIONES AUXILIARES ---

function formatCurrency(amount) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function saveTransaction(transaction) {
    const transactions = getTransactions();
    transactions.unshift(transaction); // Agregar al inicio
    
    // Mantener solo las últimas 100 transacciones
    if (transactions.length > 100) {
        transactions.splice(100);
    }
    
    localStorage.setItem('prr_transactions', JSON.stringify(transactions));
}

function renderMovements() {
    const movementsList = document.querySelector('.movements-list');
    if (!movementsList) return;
    
    const movements = getTransactions();
    const filteredMovements = filterMovements(movements);
    
    if (filteredMovements.length === 0) {
        movementsList.innerHTML = `
            <div class="no-movements">
                <i data-lucide="inbox"></i>
                <h3>No hay movimientos</h3>
                <p>No se encontraron movimientos con los filtros seleccionados</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    movementsList.innerHTML = filteredMovements.map(movement => {
        const isPositive = movement.type === 'deposit';
        const icon = getMovementIcon(movement.type);
        const accountName = getAccountName(movement.account);
        const formattedDate = formatMovementDate(movement.date);
        
        return `
            <div class="movement-item ${movement.type}">
                <div class="movement-icon ${isPositive ? 'positive' : 'negative'}">
                    <i data-lucide="${icon}"></i>
                </div>
                <div class="movement-details">
                    <h4>${getMovementTitle(movement.type)}</h4>
                    <p>${movement.description}</p>
                    <span class="movement-date">${formattedDate}</span>
                </div>
                <div class="movement-amount ${isPositive ? 'positive' : 'negative'}">
                    <span class="amount">${isPositive ? '+' : '-'}${formatCurrency(movement.amount)}</span>
                    <span class="account">${accountName}</span>
                </div>
            </div>
        `;
    }).join('');
    
    // Re-inicializar Lucide icons
    lucide.createIcons();
}

function filterMovements(movements) {
    const accountFilter = document.getElementById('filterAccount')?.value || 'all';
    const typeFilter = document.getElementById('filterType')?.value || 'all';
    const dateFilter = document.getElementById('filterDate')?.value || '30';
    
    return movements.filter(movement => {
        // Filtrar por cuenta
        if (accountFilter !== 'all' && movement.account !== accountFilter) {
            return false;
        }
        
        // Filtrar por tipo
        if (typeFilter !== 'all' && movement.type !== typeFilter) {
            return false;
        }
        
        // Filtrar por fecha
        const movementDate = new Date(movement.date);
        const daysAgo = parseInt(dateFilter);
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysAgo);
        
        return movementDate >= cutoffDate;
    });
}

function getMovementIcon(type) {
    const icons = {
        'deposit': 'plus-circle',
        'transfer': 'send',
        'purchase': 'shopping-cart',
        'withdrawal': 'atm',
        'payment': 'credit-card',
        'fee': 'alert-circle'
    };
    return icons[type] || 'circle';
}

function getMovementTitle(type) {
    const titles = {
        'deposit': 'Consignación',
        'transfer': 'Transferencia',
        'purchase': 'Compra',
        'withdrawal': 'Retiro',
        'payment': 'Pago',
        'fee': 'Comisión'
    };
    return titles[type] || 'Movimiento';
}

function getAccountName(account) {
    const names = {
        'platinum': 'Platinum',
        'savings': 'Ahorros',
        'current': 'Corriente'
    };
    return names[account] || account;
}

function formatMovementDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('es-CO', options);
}

function initializeMovementFilters() {
    // Añadir event listeners a los filtros
    const filterAccount = document.getElementById('filterAccount');
    const filterType = document.getElementById('filterType');
    const filterDate = document.getElementById('filterDate');
    
    if (filterAccount) {
        filterAccount.addEventListener('change', renderMovements);
    }
    
    if (filterType) {
        filterType.addEventListener('change', renderMovements);
    }
    
    if (filterDate) {
        filterDate.addEventListener('change', renderMovements);
    }
}

function updateAccountBalance(account, amount) {
    // Simular actualización de saldo (en una app real esto iría al backend)
    const balances = JSON.parse(localStorage.getItem('prr_balances') || '{}');
    if (!balances[account]) {
        balances[account] = 0;
    }
    balances[account] += amount;
    localStorage.setItem('prr_balances', JSON.stringify(balances));
}

function getMethodName(method) {
    const methods = {
        'transfer': 'Transferencia Bancaria',
        'cash': 'Efectivo',
        'check': 'Cheque',
        'nequi': 'Nequi',
        'daviplata': 'Daviplata'
    };
    return methods[method] || method;
}

function getTransactions() {
    const stored = localStorage.getItem('prr_transactions');
    return stored ? JSON.parse(stored) : getDefaultTransactions();
}

function getDefaultTransactions() {
    return [
        {
            type: 'deposit',
            account: 'platinum',
            amount: 5000000,
            method: 'transfer',
            description: 'Transferencia desde Banco de Bogotá',
            date: new Date('2026-04-14T10:23:00').toISOString(),
            status: 'completed'
        },
        {
            type: 'transfer',
            from: 'savings',
            to: '****7890',
            amount: 850000,
            beneficiary: 'María González',
            description: 'Transferencia enviada',
            date: new Date('2026-04-13T15:45:00').toISOString(),
            status: 'completed'
        },
        {
            type: 'purchase',
            account: 'platinum',
            amount: 245600,
            description: 'Exito - Supermercado',
            date: new Date('2026-04-12T18:20:00').toISOString(),
            status: 'completed'
        },
        {
            type: 'deposit',
            account: 'current',
            amount: 8500000,
            method: 'payroll',
            description: 'Nómina mensual - Tech Solutions S.A.',
            date: new Date('2026-04-10T09:00:00').toISOString(),
            status: 'completed'
        },
        {
            type: 'withdrawal',
            account: 'savings',
            amount: 500000,
            description: 'Cajero Automático - Centro Comercial',
            date: new Date('2026-04-08T14:15:00').toISOString(),
            status: 'completed'
        },
        {
            type: 'transfer',
            account: 'current',
            amount: 1200000,
            from: '****1234',
            beneficiary: 'Carlos Rodríguez',
            description: 'Transferencia recibida',
            date: new Date('2026-04-05T11:30:00').toISOString(),
            status: 'completed'
        }
    ];
}

// --- CALCULADORES EN TIEMPO REAL ---

// Calcular comisión de consignación en tiempo real
document.getElementById('depositAmount')?.addEventListener('input', function() {
    const amount = parseFloat(this.value) || 0;
    const fee = amount * 0.001;
    const total = amount + fee;
    
    document.getElementById('depositSubtotal').textContent = formatCurrency(amount);
    document.getElementById('depositFee').textContent = formatCurrency(fee);
    document.getElementById('depositTotal').textContent = formatCurrency(total);
});

// Calcular comisión de transferencia en tiempo real
document.getElementById('transferAmount')?.addEventListener('input', function() {
    const amount = parseFloat(this.value) || 0;
    const type = document.getElementById('transferType').value;
    
    let fee = 0;
    switch(type) {
        case 'own':
            fee = 0;
            break;
        case 'third':
            fee = amount * 0.002;
            break;
        case 'other':
            fee = amount * 0.005;
            break;
        case 'international':
            fee = amount * 0.015;
            break;
    }
    
    const total = amount + fee;
    
    document.getElementById('transferAmountDisplay').textContent = formatCurrency(amount);
    document.getElementById('transferFee').textContent = formatCurrency(fee);
    document.getElementById('transferTotal').textContent = formatCurrency(total);
});

// Actualizar comisión al cambiar tipo de transferencia
document.getElementById('transferType')?.addEventListener('change', function() {
    const amount = parseFloat(document.getElementById('transferAmount').value) || 0;
    const type = this.value;
    
    let fee = 0;
    switch(type) {
        case 'own':
            fee = 0;
            break;
        case 'third':
            fee = amount * 0.002;
            break;
        case 'other':
            fee = amount * 0.005;
            break;
        case 'international':
            fee = amount * 0.015;
            break;
    }
    
    const total = amount + fee;
    
    document.getElementById('transferAmountDisplay').textContent = formatCurrency(amount);
    document.getElementById('transferFee').textContent = formatCurrency(fee);
    document.getElementById('transferTotal').textContent = formatCurrency(total);
});

// --- NOTIFICACIONES ---

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const colors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        info: 'linear-gradient(135deg, #3b82f6, #2563eb)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// --- ANIMACIONES ---

if (!document.querySelector('#operation-animations')) {
    const animationStyles = document.createElement('style');
    animationStyles.id = 'operation-animations';
    animationStyles.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .animate-spin {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(animationStyles);
}

// --- NOTIFICACIONES ---

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos básicos para la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    });
    
    // Colores según tipo
    const colors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
        info: 'linear-gradient(135deg, #3b82f6, #2563eb)'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-eliminación
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}
