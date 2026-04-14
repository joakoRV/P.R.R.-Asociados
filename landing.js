// --- LANDING PAGE JAVASCRIPT ---

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar Lucide
    lucide.createIcons();
    
    // Verificar si ya hay una sesión activa
    checkExistingSession();
    
    // Smooth scrolling para navegación
    document.querySelectorAll('.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animación de entrada para elementos
    animateOnScroll();
});

// --- FUNCIONES DE REGISTRO ---

function showSignupModal() {
    // Cerrar modal de login si está abierto
    closeLoginModal();
    
    const modal = document.getElementById('signupModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Resetear formulario
        const form = modal.querySelector('.signup-form');
        if (form) form.reset();
        
        // Enfocar primer input
        setTimeout(() => {
            const firstInput = modal.querySelector('#signupFirstName');
            if (firstInput) firstInput.focus();
        }, 100);
    }
}

function closeSignupModal() {
    const modal = document.getElementById('signupModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function handleSignup(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('signupFirstName').value;
    const lastName = document.getElementById('signupLastName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const idType = document.getElementById('signupIdType').value;
    const idNumber = document.getElementById('signupIdNumber').value;
    const acceptTerms = document.getElementById('acceptTerms').checked;
    const acceptMarketing = document.getElementById('acceptMarketing').checked;
    
    // Validaciones
    if (!validateSignupForm(firstName, lastName, email, phone, password, confirmPassword, idType, idNumber, acceptTerms)) {
        return;
    }
    
    // Simular registro
    registerUser({
        firstName,
        lastName,
        email,
        phone,
        password,
        idType,
        idNumber,
        acceptMarketing
    });
}

function validateSignupForm(firstName, lastName, email, phone, password, confirmPassword, idType, idNumber, acceptTerms) {
    // Validar nombres
    if (firstName.length < 2) {
        showNotification('El nombre debe tener al menos 2 caracteres', 'error');
        return false;
    }
    
    if (lastName.length < 2) {
        showNotification('Los apellidos deben tener al menos 2 caracteres', 'error');
        return false;
    }
    
    // Validar email
    if (!validateEmail(email)) {
        showNotification('Por favor, ingresa un correo válido', 'error');
        return false;
    }
    
    // Validar teléfono
    if (phone.length < 10) {
        showNotification('El teléfono debe tener al menos 10 dígitos', 'error');
        return false;
    }
    
    // Validar contraseña
    if (password.length < 6) {
        showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
        return false;
    }
    
    if (password !== confirmPassword) {
        showNotification('Las contraseñas no coinciden', 'error');
        return false;
    }
    
    // Validar documento
    if (!idType) {
        showNotification('Por favor, selecciona un tipo de documento', 'error');
        return false;
    }
    
    if (idNumber.length < 5) {
        showNotification('El número de documento debe tener al menos 5 dígitos', 'error');
        return false;
    }
    
    // Validar términos
    if (!acceptTerms) {
        showNotification('Debes aceptar los términos y condiciones', 'error');
        return false;
    }
    
    return true;
}

function registerUser(userData) {
    // Simular loading
    const submitBtn = document.querySelector('.signup-form button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i data-lucide="loader-2" class="animate-spin"></i> Creando cuenta...';
    submitBtn.disabled = true;
    
    // Simular llamada a API
    setTimeout(() => {
        // Simular registro exitoso
        const newUser = {
            name: `${userData.firstName} ${userData.lastName}`,
            email: userData.email,
            phone: userData.phone,
            id: 'CLI-' + Date.now(),
            status: 'Cliente Nuevo',
            avatar: `https://i.pravatar.cc/150?u=${userData.email}`,
            registrationDate: new Date().toISOString()
        };
        
        // Guardar en localStorage (simulando base de datos)
        const existingUsers = JSON.parse(localStorage.getItem('prr_users') || '[]');
        existingUsers.push(newUser);
        localStorage.setItem('prr_users', JSON.stringify(existingUsers));
        
        // Crear sesión automáticamente
        const sessionData = {
            user: newUser,
            loginTime: new Date().toISOString(),
            rememberMe: true
        };
        
        localStorage.setItem('prr_session', JSON.stringify(sessionData));
        
        // Mostrar éxito y redirigir
        showNotification('¡Cuenta creada exitosamente! Bienvenido a P.R.R. & Asociados', 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        
    }, 2500);
}

// --- FUNCIONES DE LOGIN ---

function showLoginModal() {
    // Cerrar modal de registro si está abierto
    closeSignupModal();
    
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Resetear formulario
        const form = modal.querySelector('.login-form');
        if (form) form.reset();
        
        // Enfocar primer input
        setTimeout(() => {
            const firstInput = modal.querySelector('#loginEmail');
            if (firstInput) firstInput.focus();
        }, 100);
    }
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Validaciones básicas
    if (!validateEmail(email)) {
        showNotification('Por favor, ingresa un correo válido', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }
    
    // Simular autenticación
    authenticateUser(email, password, rememberMe);
}

function authenticateUser(email, password, rememberMe) {
    // Simular loading
    const submitBtn = document.querySelector('.login-form button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i data-lucide="loader-2" class="animate-spin"></i> Iniciando sesión...';
    submitBtn.disabled = true;
    
    // Simular llamada a API
    setTimeout(() => {
        // Usuario de demo (en producción esto sería una llamada real a API)
        const demoUsers = [
            { email: 'juan.perez@email.com', password: '123456', name: 'Juan Pérez García' },
            { email: 'admin@prrasociados.com', password: 'admin123', name: 'Administrador' }
        ];
        
        const user = demoUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Guardar sesión
            const sessionData = {
                user: {
                    name: user.name,
                    email: user.email,
                    id: 'CLI-' + Date.now(),
                    status: 'Cliente Platinum',
                    avatar: `https://i.pravatar.cc/150?u=${email}`
                },
                loginTime: new Date().toISOString(),
                rememberMe: rememberMe
            };
            
            // Guardar en localStorage (o sessionStorage si no quiere recordar)
            const storage = rememberMe ? localStorage : sessionStorage;
            storage.setItem('prr_session', JSON.stringify(sessionData));
            
            // Mostrar éxito y redirigir
            showNotification('¡Bienvenido de vuelta!', 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
            
        } else {
            // Error de autenticación
            showNotification('Correo o contraseña incorrectos', 'error');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Agregar efecto de shake al formulario
            const form = document.querySelector('.login-form');
            form.style.animation = 'shake 0.5s';
            setTimeout(() => {
                form.style.animation = '';
            }, 500);
        }
    }, 2000);
}

function checkExistingSession() {
    // Verificar si hay sesión activa
    const sessionData = localStorage.getItem('prr_session') || sessionStorage.getItem('prr_session');
    
    if (sessionData) {
        try {
            const session = JSON.parse(sessionData);
            const loginTime = new Date(session.loginTime);
            const now = new Date();
            const hoursSinceLogin = (now - loginTime) / (1000 * 60 * 60);
            
            // Si la sesión tiene menos de 24 horas, redirigir al dashboard
            if (hoursSinceLogin < 24) {
                showNotification('Sesión activa detectada, redirigiendo...', 'info');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
                return;
            } else {
                // Sesión expirada, limpiar
                localStorage.removeItem('prr_session');
                sessionStorage.removeItem('prr_session');
            }
        } catch (error) {
            console.error('Error al verificar sesión:', error);
            localStorage.removeItem('prr_session');
            sessionStorage.removeItem('prr_session');
        }
    }
}

function logout() {
    localStorage.removeItem('prr_session');
    sessionStorage.removeItem('prr_session');
    window.location.href = 'landing.html';
}

// --- FUNCIONES AUXILIARES ---

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos para notificación
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

function animateOnScroll() {
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

    // Observar elementos para animación
    const elementsToAnimate = document.querySelectorAll('.benefit-card, .feature-comparison-card, .testimonial-card');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// --- AGREGAR ESTILOS ANIMACIÓN ---
if (!document.querySelector('#landing-animations')) {
    const animationStyles = document.createElement('style');
    animationStyles.id = 'landing-animations';
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
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
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

// --- CERRAR MODAL CON ESCAPE ---
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLoginModal();
    }
});

// --- PREVENIR ENVÍO DUPLICADO ---
let isSubmitting = false;
document.addEventListener('submit', function(event) {
    if (event.target.classList.contains('login-form') && isSubmitting) {
        event.preventDefault();
    }
    isSubmitting = true;
    setTimeout(() => {
        isSubmitting = false;
    }, 3000);
});
