// Данные для модального окна (в реальном проекте можно загружать с сервера)
const modelDetails = {
    1: {
        title: "Современный небоскрёб",
        category: "Архитектура",
        details: "Высота: 65 см, Детали: 2200 шт.",
        description: "Модель современного небоскрёба с модульной архитектурой. Особенности: съёмные этажи, детализированный фасад с остеклением, внутренняя подсветка. Идеально подходит для интерьера в стиле лофт или современного офиса.",
        priceRange: "12 000 - 18 000 руб",
        images: [
            "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1605727216802-4b8cedf3c8a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    },
    2: {
        title: "Космический корабль",
        category: "Техника", 
        details: "Длина: 50 см, Детали: 1800 шт.",
        description: "Футуристический космический корабль с подвижными элементами: поворачивающиеся двигатели, открывающийся грузовой отсек, выдвижные шасси. Модель отличается прочностью конструкции и вниманием к аэродинамическим формам.",
        priceRange: "10 000 - 15 000 руб",
        images: [
            "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1632059368265-78c6cabd2336?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    },
    3: {
        title: "Замок дракона",
        category: "Фантастика",
        details: "Высота: 45 см, Детали: 3500 шт.",
        description: "Масштабная модель замка дракона с множеством деталей: подъёмный мост, скрытые комнаты, вращающиеся башни. В комплекте идёт подсветка, создающая эффект огня в пещерах дракона. Уникальная коллекционная работа.",
        priceRange: "20 000 - 28 000 руб",
        images: [
            "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    }
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Меню для мобильных
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Фильтрация галереи
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modelCards = document.querySelectorAll('.model-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убрать активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавить активный класс текущей кнопке
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Показать/скрыть карточки
            modelCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Открытие модального окна с деталями модели
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    const modal = document.getElementById('model-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalBody = document.querySelector('.modal-body');
    
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const modelId = this.getAttribute('data-id');
            const model = modelDetails[modelId];
            
            if (model) {
                modalBody.innerHTML = `
                    <div class="modal-gallery">
                        <div class="main-image">
                            <img src="${model.images[0]}" alt="${model.title}" id="main-modal-img">
                        </div>
                        <div class="thumbnail-images">
                            ${model.images.map((img, index) => `
                                <img src="${img}" alt="${model.title} вид ${index+1}" class="thumbnail ${index === 0 ? 'active' : ''}">
                            `).join('')}
                        </div>
                    </div>
                    <div class="modal-info">
                        <h2>${model.title}</h2>
                        <div class="model-meta">
                            <span class="category">${model.category}</span>
                            <span class="details">${model.details}</span>
                            <span class="price">${model.priceRange}</span>
                        </div>
                        <p>${model.description}</p>
                        <div class="modal-actions">
                            <a href="#order-form" class="btn-primary" onclick="document.getElementById('model').value='${model.title}'; document.getElementById('model-modal').style.display='none';">Заказать эту модель</a>
                            <button class="btn-outline close-modal-btn">Закрыть</button>
                        </div>
                    </div>
                `;
                
                modal.style.display = 'flex';
                
                // Обработчики для миниатюр
                const thumbnails = document.querySelectorAll('.thumbnail');
                const mainImg = document.getElementById('main-modal-img');
                
                thumbnails.forEach(thumb => {
                    thumb.addEventListener('click', function() {
                        mainImg.src = this.src;
                        thumbnails.forEach(t => t.classList.remove('active'));
                        this.classList.add('active');
                    });
                });
                
                // Закрытие модального окна
                const closeModalBtn = document.querySelector('.close-modal-btn');
                if (closeModalBtn) {
                    closeModalBtn.addEventListener('click', function() {
                        modal.style.display = 'none';
                    });
                }
            }
        });
    });
    
    // Закрытие модального окна при клике на крестик или вне окна
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Обработка формы
    const orderForm = document.getElementById('order-form');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Сбор данных формы
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                model: document.getElementById('model').value,
                message: document.getElementById('message').value
            };
            
            // В реальном проекте здесь будет AJAX-запрос на сервер
            console.log('Данные заказа:', formData);
            
            // Показать сообщение об успехе
            const submitBtn = orderForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Запрос отправлен!';
            submitBtn.style.background = '#2ecc71';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                orderForm.reset();
                
                // Прокрутка к верху формы для обратной связи
                orderForm.scrollIntoView({behavior: 'smooth', block: 'center'});
            }, 3000);
            
            // В реальном проекте здесь будет отправка на сервер
            // fetch('/api/order', {method: 'POST', body: JSON.stringify(formData)})
        });
    }
    
    // Плавная прокрутка для навигационных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Закрытие мобильного меню
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Параллакс-эффект для героя
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });
});