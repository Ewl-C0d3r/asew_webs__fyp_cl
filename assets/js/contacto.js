/* ===== CONTACTO.JS - FUNCIONALIDADES DEL FORMULARIO DE CONTACTO ===== */

// Variables del formulario
let contactForm;
let formFields = {};
let isSubmitting = false;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
});

// ===== INICIALIZAR FORMULARIO DE CONTACTO =====
function initializeContactForm() {
    contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    // Obtener campos del formulario
    formFields = {
        nombre: document.getElementById('nombre'),
        email: document.getElementById('email'),
        telefono: document.getElementById('telefono'),
        mensaje: document.getElementById('mensaje')
    };
    
    // Configurar eventos
    setupFormEvents();
    setupFieldValidation();
}

// ===== CONFIGURAR EVENTOS DEL FORMULARIO =====
function setupFormEvents() {
    // Evento de envío del formulario
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Eventos de validación en tiempo real
    Object.keys(formFields).forEach(fieldName => {
        const field = formFields[fieldName];
        if (field) {
            field.addEventListener('blur', () => validateField(fieldName));
            field.addEventListener('input', () => clearFieldError(fieldName));
        }
    });
}

// ===== CONFIGURAR VALIDACIÓN DE CAMPOS =====
function setupFieldValidation() {
    // Validación de email en tiempo real
    if (formFields.email) {
        formFields.email.addEventListener('input', function() {
            const email = this.value;
            if (email && !isValidEmail(email)) {
                showFieldError('email', 'Por favor ingrese un email válido');
            } else {
                clearFieldError('email');
            }
        });
    }
    
    // Validación de teléfono (opcional pero si se ingresa debe ser válido)
    if (formFields.telefono) {
        formFields.telefono.addEventListener('input', function() {
            const telefono = this.value;
            if (telefono && !isValidPhone(telefono)) {
                showFieldError('telefono', 'Formato de teléfono no válido (ej: +56912345678)');
            } else {
                clearFieldError('telefono');
            }
        });
    }
}

// ===== MANEJAR ENVÍO DEL FORMULARIO =====
async function handleFormSubmit(e) {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    // Validar todos los campos
    if (!validateAllFields()) {
        showFormMessage('Por favor corrija los errores antes de enviar', 'error');
        return;
    }
    
    isSubmitting = true;
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    
    try {
        // Cambiar estado del botón
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        // Obtener datos del formulario
        const formData = getFormData();
        
        // Enviar formulario (por WhatsApp como fallback)
        await sendFormData(formData);
        
        // Mostrar mensaje de éxito
        showFormMessage('¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.', 'success');
        
        // Limpiar formulario
        resetForm();
        
    } catch (error) {
        console.error('Error al enviar formulario:', error);
        showFormMessage('Error al enviar el mensaje. Por favor intente nuevamente.', 'error');
    } finally {
        // Restaurar botón
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        isSubmitting = false;
    }
}

// ===== VALIDACIÓN DE CAMPOS =====
function validateAllFields() {
    let isValid = true;
    
    // Validar nombre (requerido)
    if (!validateField('nombre')) isValid = false;
    
    // Validar email (requerido y formato)
    if (!validateField('email')) isValid = false;
    
    // Validar mensaje (requerido)
    if (!validateField('mensaje')) isValid = false;
    
    // Validar teléfono (opcional pero formato si se ingresa)
    if (formFields.telefono && formFields.telefono.value) {
        if (!validateField('telefono')) isValid = false;
    }
    
    return isValid;
}

// Validar campo individual
function validateField(fieldName) {
    const field = formFields[fieldName];
    if (!field) return true;
    
    const value = field.value.trim();
    
    switch (fieldName) {
        case 'nombre':
            if (!value) {
                showFieldError(fieldName, 'El nombre es requerido');
                return false;
            }
            if (value.length < 2) {
                showFieldError(fieldName, 'El nombre debe tener al menos 2 caracteres');
                return false;
            }
            break;
            
        case 'email':
            if (!value) {
                showFieldError(fieldName, 'El email es requerido');
                return false;
            }
            if (!isValidEmail(value)) {
                showFieldError(fieldName, 'Por favor ingrese un email válido');
                return false;
            }
            break;
            
        case 'telefono':
            if (value && !isValidPhone(value)) {
                showFieldError(fieldName, 'Formato de teléfono no válido');
                return false;
            }
            break;
            
        case 'mensaje':
            if (!value) {
                showFieldError(fieldName, 'El mensaje es requerido');
                return false;
            }
            if (value.length < 10) {
                showFieldError(fieldName, 'El mensaje debe tener al menos 10 caracteres');
                return false;
            }
            break;
    }
    
    clearFieldError(fieldName);
    return true;
}

// ===== FUNCIONES DE VALIDACIÓN =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Acepta formatos: +56912345678, 56912345678, 912345678
    const phoneRegex = /^(\+?56)?[0-9]{8,9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// ===== MANEJO DE ERRORES EN CAMPOS =====
function showFieldError(fieldName, message) {
    const field = formFields[fieldName];
    if (!field) return;
    
    // Remover error anterior
    clearFieldError(fieldName);
    
    // Añadir clase de error al campo
    field.classList.add('error');
    
    // Crear elemento de error
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    // Insertar después del campo
    field.parentNode.insertBefore(errorElement, field.nextSibling);
}

function clearFieldError(fieldName) {
    const field = formFields[fieldName];
    if (!field) return;
    
    // Remover clase de error
    field.classList.remove('error');
    
    // Remover mensaje de error
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// ===== OBTENER DATOS DEL FORMULARIO =====
function getFormData() {
    return {
        nombre: formFields.nombre.value.trim(),
        email: formFields.email.value.trim(),
        telefono: formFields.telefono.value.trim(),
        mensaje: formFields.mensaje.value.trim(),
        timestamp: new Date().toLocaleString('es-CL')
    };
}

// ===== ENVIAR DATOS DEL FORMULARIO =====
async function sendFormData(data) {
    // Crear mensaje para WhatsApp
    const whatsappMessage = createWhatsAppMessage(data);
    
    // Abrir WhatsApp con el mensaje
    const whatsappUrl = `https://wa.me/+56992448094?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Abrir en nueva ventana
    window.open(whatsappUrl, '_blank');
    
    // Simular delay para UX
    await new Promise(resolve => setTimeout(resolve, 1000));
}

// Crear mensaje para WhatsApp
function createWhatsAppMessage(data) {
    let message = `*NUEVA CONSULTA DESDE EL SITIO WEB*\n\n`;
    message += `*Nombre:* ${data.nombre}\n`;
    message += `*Email:* ${data.email}\n`;
    
    if (data.telefono) {
        message += `*Teléfono:* ${data.telefono}\n`;
    }
    
    message += `*Mensaje:*\n${data.mensaje}\n\n`;
    message += `*Fecha:* ${data.timestamp}`;
    
    return message;
}

// ===== MOSTRAR MENSAJES DEL FORMULARIO =====
function showFormMessage(message, type = 'info') {
    // Remover mensaje anterior
    const existingMessage = contactForm.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Crear nuevo mensaje
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message-${type}`;
    messageElement.textContent = message;
    
    // Insertar al inicio del formulario
    contactForm.insertBefore(messageElement, contactForm.firstChild);
    
    // Auto-remover después de 5 segundos para mensajes de éxito
    if (type === 'success') {
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }
    
    // Scroll al mensaje
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ===== RESETEAR FORMULARIO =====
function resetForm() {
    contactForm.reset();
    
    // Limpiar errores
    Object.keys(formFields).forEach(fieldName => {
        clearFieldError(fieldName);
    });
}

// ===== FUNCIONES AUXILIARES =====

// Formatear teléfono mientras se escribe
function formatPhoneInput(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.startsWith('56')) {
        value = '+' + value;
    } else if (value.length === 9) {
        value = '+56' + value;
    }
    
    input.value = value;
}

// Aplicar formato de teléfono si existe el campo
if (formFields.telefono) {
    formFields.telefono.addEventListener('input', function() {
        formatPhoneInput(this);
    });
}

// ===== FUNCIONALIDADES ADICIONALES =====

// Contador de caracteres para el mensaje
function setupCharacterCounter() {
    const mensajeField = formFields.mensaje;
    if (!mensajeField) return;
    
    const maxLength = 500;
    
    // Crear contador
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.textContent = `0/${maxLength}`;
    
    // Insertar después del textarea
    mensajeField.parentNode.appendChild(counter);
    
    // Actualizar contador
    mensajeField.addEventListener('input', function() {
        const length = this.value.length;
        counter.textContent = `${length}/${maxLength}`;
        
        if (length > maxLength * 0.9) {
            counter.classList.add('warning');
        } else {
            counter.classList.remove('warning');
        }
        
        if (length >= maxLength) {
            counter.classList.add('limit');
        } else {
            counter.classList.remove('limit');
        }
    });
    
    // Limitar caracteres
    mensajeField.setAttribute('maxlength', maxLength);
}

// Inicializar contador de caracteres
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(setupCharacterCounter, 100);
});