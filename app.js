// Funções utilitárias para a aplicação
const Utils = {
    formatPrice: function(price) {
        return 'R$ ' + parseFloat(price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },
    
    escapeHtml: function(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    
    renderHeader: function() {
        const currentUser = StorageManager.getCurrentUser();
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        let navItems = `
            <li><a href="index.html" class="${currentPage === 'index.html' ? 'active-nav' : ''}">Início</a></li>
            <li><a href="sobre.html" class="${currentPage === 'sobre.html' ? 'active-nav' : ''}">Sobre</a></li>
            <li><a href="produtos.html" class="${currentPage === 'produtos.html' ? 'active-nav' : ''}">Produtos</a></li>
            <li><a href="novidade.html" class="${currentPage === 'novidade.html' ? 'active-nav' : ''}">Novidades</a></li>
        `;
        
        if (currentUser) {
            navItems += `
                <li><a href="carrinho.html" class="${currentPage === 'carrinho.html' ? 'active-nav' : ''}">Carrinho</a></li>
                <li><span style="color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">Olá, ${Utils.escapeHtml(currentUser.nome)}</span></li>
                <li><a href="#" onclick="handleLogout()" style="color: #ff5555;">Sair</a></li>
            `;
        } else {
            navItems += `
                <li><a href="login.html" class="${currentPage === 'login.html' ? 'active-nav' : ''}">Login</a></li>
                <li><a href="cadastro.html" class="${currentPage === 'cadastro.html' ? 'active-nav' : ''}">Cadastre-se</a></li>
                <li><a href="carrinho.html" class="${currentPage === 'carrinho.html' ? 'active-nav' : ''}">Carrinho</a></li>
            `;
        }
        
        const headerHTML = `
            <header id="main-header">
                <div class="logo">
                    <a href="index.html">Mundo<span>Verde</span></a>
                </div>
                <nav class="nav">
                    <ul id="nav-menu">
                        ${navItems}
                    </ul>
                </nav>
                <button class="menu-toggle" id="menu-toggle">☰</button>
            </header>
        `;
        
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            headerContainer.innerHTML = headerHTML;
            
            // Add menu toggle functionality
            const menuToggle = document.getElementById('menu-toggle');
            const navMenu = document.getElementById('nav-menu');
            if (menuToggle && navMenu) {
                menuToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('show');
                });
            }
        }
    },
    
    renderFooter: function() {
        const footerHTML = `
            <footer>
                <p>© 2025 Mundo Verde - ONG Ambiental. Todos os direitos reservados.</p>
            </footer>
        `;
        
        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) {
            footerContainer.innerHTML = footerHTML;
        }
    },
    
    showMessage: function(message, type = 'success') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} text-center`;
        alertDiv.setAttribute('role', 'alert');
        alertDiv.style.position = 'fixed';
        alertDiv.style.top = '100px';
        alertDiv.style.left = '50%';
        alertDiv.style.transform = 'translateX(-50%)';
        alertDiv.style.zIndex = '9999';
        alertDiv.style.minWidth = '300px';
        alertDiv.textContent = message;
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => alertDiv.remove(), 5000);
    },

    initScrollAnimations: function() {
        const reveals = document.querySelectorAll('.reveal');
        
        const revealOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        reveals.forEach(reveal => {
            revealOnScroll.observe(reveal);
        });

        // Header scroll effect
        const header = document.getElementById('main-header');
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
            // Trigger once on load
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            }
        }
    },

    initCounters: function() {
        const counters = document.querySelectorAll('.counter-value');
        const speed = 200; // The lower the slower

        const animateCounters = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;
                        const inc = target / speed;

                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 10);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            animateCounters.observe(counter);
        });
    }
};

function handleLogout() {
    if (confirm('Tem certeza que deseja sair?')) {
        StorageManager.logout();
        window.location.href = 'index.html';
    }
}

// Inicializa o header e footer quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    Utils.renderHeader();
    Utils.renderFooter();
    Utils.initScrollAnimations();
    Utils.initCounters();
    
    // Verifica expiração de sessão
    setInterval(function() {
        const user = StorageManager.getCurrentUser();
        if (!user && localStorage.getItem('current_session')) {
            Utils.showMessage('Sua sessão expirou por inatividade. Por favor, faça login novamente.', 'warning');
        }
    }, 60000); // Verifica a cada minuto
});
