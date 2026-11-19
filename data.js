// Dados da aplicação - substitui o banco de dados SQL
const appData = {
    productos: [
        {
            id: 1,
            nome: "Blusa Mundo Verde",
            descricao: "Blusa confortável com logo da ONG Mundo Verde. Feita de material sustentável e eco-friendly.",
            preco_unitario: 79.99,
            imagem_url: "img/fototeste.jpeg"
        },
        {
            id: 2,
            nome: "Copo Mundo Verde",
            descricao: "Copo reutilizável de vidro com logo da ONG. Perfeito para levar café e contribuir com o meio ambiente.",
            preco_unitario: 34.99,
            imagem_url: "img/fototeste.jpeg"
        },
        {
            id: 3,
            nome: "Mochila Ecológica",
            descricao: "Mochila feita de material reciclado com design moderno. Ideal para estudantes e profissionais conscientes.",
            preco_unitario: 129.99,
            imagem_url: "img/fototeste.jpeg"
        },
        {
            id: 4,
            nome: "Kit Jardinagem",
            descricao: "Kit completo para iniciar sua própria horta em casa. Inclui sementes, ferramentas e guia prático.",
            preco_unitario: 149.99,
            imagem_url: "img/fototeste.jpeg"
        }
    ],
    
    novidades: [
        {
            id: 1,
            titulo: "Lançamento",
            conteudo: "Lançamento Blusa Mundo Verde - Nova coleção de roupas sustentáveis"
        },
        {
            id: 2,
            titulo: "Lançamento",
            conteudo: "Lançamento Copo Mundo Verde - Copos reutilizáveis para um futuro melhor"
        },
        {
            id: 3,
            titulo: "Projeto em Destaque",
            conteudo: "Novo projeto de reflorestamento iniciado em 5 estados brasileiros"
        }
    ],
    
    admins: [
        {
            id: 1,
            nome: "Administrador Principal",
            usuario: "admin",
            senha: "123"
        },
        {
            id: 2,
            nome: "gabriel",
            usuario: "gabriel",
            senha: "gabriel123"
        }
    ]
};

// LocalStorage helpers
const StorageManager = {
    // Usuários cadastrados
    getUsers: function() {
        const users = localStorage.getItem('site_users');
        return users ? JSON.parse(users) : [];
    },
    
    saveUsers: function(users) {
        localStorage.setItem('site_users', JSON.stringify(users));
    },
    
    addUser: function(nome, email, senha) {
        const users = this.getUsers();
        const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        users.push({ id: newId, nome, email, senha });
        this.saveUsers(users);
        return newId;
    },
    
    getUserByEmail: function(email) {
        return this.getUsers().find(u => u.email === email);
    },
    
    // Carrinho
    getCart: function(userId) {
        const carts = JSON.parse(localStorage.getItem('carts') || '{}');
        return carts[userId] || [];
    },
    
    saveCart: function(userId, items) {
        const carts = JSON.parse(localStorage.getItem('carts') || '{}');
        carts[userId] = items;
        localStorage.setItem('carts', JSON.stringify(carts));
    },
    
    addToCart: function(userId, productId, quantity) {
        const cart = this.getCart(userId);
        const product = appData.productos.find(p => p.id == productId);
        
        if (!product) return false;
        
        const existingItem = cart.find(item => item.produto_id == productId);
        if (existingItem) {
            existingItem.quantidade += quantity;
        } else {
            cart.push({
                item_id: cart.length + 1,
                produto_id: productId,
                quantidade: quantity,
                preco_unitario: product.preco_unitario,
                nome: product.nome,
                imagem_url: product.imagem_url
            });
        }
        
        this.saveCart(userId, cart);
        return true;
    },
    
    removeFromCart: function(userId, itemId) {
        const cart = this.getCart(userId);
        const filtered = cart.filter(item => item.item_id != itemId);
        this.saveCart(userId, filtered);
    },
    
    clearCart: function(userId) {
        const carts = JSON.parse(localStorage.getItem('carts') || '{}');
        delete carts[userId];
        localStorage.setItem('carts', JSON.stringify(carts));
    },
    
    // Sessão/Autenticação
    setCurrentUser: function(userId, nome, email) {
        const session = { userId, nome, email, loginTime: new Date().getTime() };
        localStorage.setItem('current_session', JSON.stringify(session));
    },
    
    getCurrentUser: function() {
        const session = localStorage.getItem('current_session');
        if (!session) return null;
        
        const user = JSON.parse(session);
        const SESSION_TIMEOUT = 120 * 60 * 1000; // 120 minutos em ms
        const elapsed = new Date().getTime() - user.loginTime;
        
        if (elapsed > SESSION_TIMEOUT) {
            this.logout();
            return null;
        }
        
        // Atualiza o tempo de atividade
        user.loginTime = new Date().getTime();
        localStorage.setItem('current_session', JSON.stringify(user));
        return user;
    },
    
    logout: function() {
        localStorage.removeItem('current_session');
    },
    
    isLoggedIn: function() {
        return this.getCurrentUser() !== null;
    }
};
