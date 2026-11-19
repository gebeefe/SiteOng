# 🌍 GUIA DE INÍCIO RÁPIDO - Mundo Verde JavaScript

## ✅ O que foi feito

Seu projeto PHP foi **100% convertido para JavaScript, HTML e CSS**! 

### Arquivos Criados (Novos):
- ✅ `app.js` - Lógica principal (autenticação, sessões, carrinho)
- ✅ `data.js` - Dados (produtos, novidades, usuários)
- ✅ `index.html` - Página inicial
- ✅ `sobre.html` - Página sobre a ONG
- ✅ `produtos.html` - Catálogo de produtos
- ✅ `carrinho.html` - Carrinho de compras
- ✅ `cadastro.html` - Cadastro de usuários
- ✅ `login.html` - Login de usuários
- ✅ `novidade.html` - Notícias/Novidades
- ✅ `teste.html` - Página de testes
- ✅ `README_JS.md` - Documentação completa

### Arquivos Originais Mantidos:
- `style.css` - CSS compartilhado
- `img/` - Pasta de imagens

---

## 🚀 Como Começar

### 1. Abrir o Projeto
- Abra **`index.html`** em seu navegador (Chrome, Firefox, Safari, Edge)
- Não precisa de servidor - funciona localmente!

### 2. Testar Funcionalidades (Opcional)
- Abra **`teste.html`** para ver dados carregados
- Teste cadastro, login e carrinho de forma rápida

### 3. Usar o Site
```
1. Clique em "Cadastre-se" na página inicial
2. Crie uma conta com email e senha
3. Faça login
4. Adicione produtos ao carrinho
5. Acesse "Carrinho" para revisão
```

---

## 📊 O que Mudou (PHP → JavaScript)

### Banco de Dados
- **Antes:** MySQL via `Admin/conexao.php`
- **Agora:** JSON em `localStorage` do navegador

### Autenticação
- **Antes:** `$_SESSION` com PHP
- **Agora:** `localStorage` com JavaScript

### Páginas
- **Antes:** `.php` dinâmicos
- **Agora:** `.html` + JavaScript

### Carrinho
- **Antes:** Armazenado no banco de dados
- **Agora:** Armazenado em `localStorage`

---

## 🔑 Funcionalidades Implementadas

### ✅ Autenticação
- Cadastro de usuários
- Login com email e senha
- Logout
- Sessão com expiração (120 min de inatividade)

### ✅ Produtos
- Listagem de produtos
- Adicionar ao carrinho
- Visualizar detalhes

### ✅ Carrinho
- Adicionar itens
- Remover itens
- Calcular total
- Persistir entre recarregos (localStorage)

### ✅ Interface
- Menu responsivo
- Header/Footer dinâmicos
- Mensagens de feedback
- Design Bootstrap 5

---

## 💡 Exemplos de Uso

### Adicionar Usuário de Teste
Abra o console (F12) e execute:
```javascript
StorageManager.addUser('João Silva', 'joao@test.com', 'senha123');
```

### Verificar Usuários Cadastrados
```javascript
console.log(StorageManager.getUsers());
```

### Obter Carrinho do Usuário
```javascript
const user = StorageManager.getCurrentUser();
const carrinho = StorageManager.getCart(user.userId);
console.log(carrinho);
```

### Limpar Todos os Dados
```javascript
localStorage.clear();
```

---

## 📁 Estrutura de Arquivos Importantes

```
data.js
├── appData.productos[]    → Produtos para venda
├── appData.novidades[]    → Notícias/Atualizações
└── StorageManager        → Gerenciar dados em localStorage

app.js
├── Utils.renderHeader()   → Renderiza menu do site
├── Utils.renderFooter()   → Renderiza rodapé
├── Utils.showMessage()    → Exibe alertas
└── handleLogout()        → Função de logout

*.html (Páginas)
├── index.html            → Início
├── produtos.html         → Produtos
├── carrinho.html         → Carrinho
├── cadastro.html         → Cadastro
├── login.html            → Login
└── novidade.html         → Notícias
```

---

## ⚙️ Configuração (Se Necessário)

### Modificar Produtos
Edite `data.js` > `appData.productos`:
```javascript
{
    id: 1,
    nome: "Seu Produto",
    descricao: "Descrição...",
    preco_unitario: 99.99,
    imagem_url: "img/seu-produto.jpg"
}
```

### Modificar Novidades
Edite `data.js` > `appData.novidades`:
```javascript
{
    id: 1,
    titulo: "Título da Notícia",
    conteudo: "Conteúdo da notícia..."
}
```

### Modificar Tempo de Expiração de Sessão
Em `data.js`, busque `SESSION_TIMEOUT`:
```javascript
const SESSION_TIMEOUT = 120 * 60 * 1000; // 120 minutos em ms
```

---

## 🐛 Resolução de Problemas

### Problema: Página branca ao abrir
**Solução:** Verifique que todos os arquivos estão na mesma pasta

### Problema: Produtos não aparecem
**Solução:** Abra F12 (Console) e verifique erros. Procure por `data.js`

### Problema: Dados desaparecem ao fechar navegador
**Solução:** Limpe o cache ou use uma aba Privada (testa se localStorage funciona)

### Problema: Login não funciona
**Solução:** 
1. Abra a página de `teste.html`
2. Clique em "Teste: Cadastrar Usuário"
3. Depois em "Teste: Login"

---

## 🔒 ⚠️ Segurança (Importante!)

**Este é um projeto de DEMONSTRAÇÃO/APRENDIZADO.**

**Problemas de segurança:**
- ❌ Senhas em texto plano (não usar em produção!)
- ❌ Sem validação de servidor
- ❌ Dados apenas no navegador (cliente)
- ❌ Sem proteção contra XSS/CSRF

**Para produção, você precisa:**
- ✅ Criar backend com Node.js/Express/PHP
- ✅ Hash de senhas com bcrypt
- ✅ Validação no servidor
- ✅ Banco de dados real (PostgreSQL/MySQL)
- ✅ HTTPS
- ✅ JWT para autenticação

---

## 📱 Compatibilidade

- ✅ Chrome/Chromium (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ✅ Responsivo em mobile/tablet

---

## 🎯 Próximos Passos

### Melhorias Sugeridas:
1. **Adicionar Backend** - Node.js com Express
2. **Implementar Pagamento** - Stripe/PayPal
3. **Envio de Email** - Confirmação de cadastro
4. **Painel Admin** - Gerenciar produtos
5. **Banco de Dados Real** - PostgreSQL/MongoDB
6. **API REST** - Para integração futura

### Recursos Úteis:
- [Bootstrap Docs](https://getbootstrap.com/docs/5.3/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

## 📞 Dúvidas?

Revise os comentários nos arquivos:
- `app.js` - Explicações de cada função
- `data.js` - Documentação do StorageManager
- `*.html` - Tags de script com lógica

---

**✨ Seu site agora é 100% JavaScript/HTML/CSS!**

Aproveite e customize conforme necessário! 🚀
