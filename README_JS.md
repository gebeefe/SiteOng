# Mundo Verde - ONG Ambiental (JavaScript/HTML/CSS)

## Visão Geral

Este é o website da ONG Mundo Verde convertido de PHP para **JavaScript, HTML e CSS puro**. O projeto mantém toda a funcionalidade original mas agora funciona como uma aplicação frontend com armazenamento em `localStorage`.

## 📋 Estrutura do Projeto

```
SiteOng-main/
├── index.html              # Página inicial
├── sobre.html              # Página sobre a ONG
├── produtos.html           # Catálogo de produtos
├── carrinho.html           # Carrinho de compras
├── cadastro.html           # Registro de usuários
├── login.html              # Login de usuários
├── novidade.html           # Novidades/Notícias
├── style.css               # Estilos compartilhados
├── app.js                  # Lógica principal da aplicação
├── data.js                 # Dados (produtos, usuários, etc.)
├── img/                    # Pasta de imagens
└── README.md               # Este arquivo
```

## 🚀 Como Usar

1. **Abra o projeto** em um navegador moderno (Chrome, Firefox, Safari, Edge)
2. **Não requer servidor backend** - funciona 100% no frontend
3. **Dados são armazenados** em `localStorage` do navegador

### Primeiro Acesso

- Clique em **"Cadastre-se"** para criar uma nova conta
- Preencha os dados (nome, email, senha)
- Faça login com suas credenciais

### Comprando Produtos

1. Acesse a página **"Produtos"**
2. Selecione a quantidade desejada
3. Clique em **"Adicionar"** para adicionar ao carrinho
4. Acesse **"Carrinho"** para revisar e finalizar sua compra

## 📁 Arquivos Principais

### `data.js`
Contém:
- Dados dos produtos (`appData.productos`)
- Novidades (`appData.novidades`)
- Funções de `StorageManager` para gerenciar localStorage

**Conteúdo:**
```javascript
const appData = {
    productos: [/* lista de produtos */],
    novidades: [/* lista de novidades */]
};
```

### `app.js`
Gerencia:
- Renderização de header/footer
- Sessões de usuário
- Expiração de sessão (120 minutos)
- Mensagens de alerta

### Páginas HTML
Cada página HTML:
- Importa `data.js` e `app.js`
- Inclui Bootstrap 5.3 para estilos responsivos
- Renderiza dinamicamente com JavaScript
- Valida dados no frontend

## 🔐 Autenticação

### Como funciona:
- Usuários são armazenados em `localStorage` sob a chave `site_users`
- Login cria uma sessão (`current_session`)
- Sessão expira após **120 minutos de inatividade**
- Dados de usuário ficam no navegador (não seguros para produção)

### Para testar:
```javascript
// No console do navegador, adicione um usuário de teste:
StorageManager.addUser('João', 'joao@test.com', 'senha123');
```

## 🛒 Carrinho de Compras

- **Armazenamento:** localStorage com chave `carts`
- **Por usuário:** Cada usuário tem seu próprio carrinho
- **Funcionalidades:**
  - Adicionar produtos
  - Remover itens
  - Ver total
  - Limpar carrinho

## 🎨 Estilos

O projeto usa:
- **Bootstrap 5.3** para componentes responsivos
- **Google Fonts** (Poppins)
- **CSS customizado** em `style.css`

## 📝 Principais Classes CSS

- `.hero-section` - Seção destaque com imagem
- `.content-section-block` - Bloco de conteúdo com imagem e texto
- `.active-nav` - Indicador de página ativa na navegação
- `.text-block` - Bloco de texto estilizado

## 🔄 Conversão do PHP Original

### O que foi alterado:

| Funcionalidade | PHP | JavaScript |
|---|---|---|
| Banco de dados | MySQL | localStorage |
| Sessões | `$_SESSION` | localStorage |
| Autenticação | Password hash | String simples |
| Dados | Queries SQL | Arrays JavaScript |
| Páginas | .php dinâmico | .html + JS |

### Arquivos removidos:
- `Admin/` pasta (não foi convertida)
- `addcarrinho.php` → funções em `produtos.html`
- `header.php` → `app.js renderHeader()`
- `logout_usuario.php` → `handleLogout()` em `app.js`
- Conexão MySQL → `data.js`

## ⚠️ Limitações (em relação ao PHP original)

1. **Sem persistência real:** Dados são perdidos ao limpar cache do navegador
2. **Sem servidor:** Não há backend para pagamentos ou emails
3. **Sem admin:** Painel administrativo não foi convertido
4. **Segurança:** Senhas armazenadas em texto plano (⚠️ Não usar em produção!)

## 🔧 Para Melhorar em Produção

1. **Adicionar backend Node.js/Express** para persistência real
2. **Implementar hash de senhas** com bcrypt
3. **Usar JWT** para autenticação
4. **Implementar pagamento** (Stripe, PayPal)
5. **Adicionar validação de email**
6. **Implementar painel admin**

## 📱 Compatibilidade

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Responsivo em mobile

## 🧪 Teste Rápido

1. Abra `index.html` no navegador
2. Clique em "Cadastre-se"
3. Preencha: Nome, Email, Senha
4. Clique em "Cadastrar"
5. Faça login
6. Adicione produtos ao carrinho
7. Acesse o carrinho

## 📞 Suporte

Para questões sobre o código ou funcionalidades, revise:
- `app.js` - Lógica principal
- `data.js` - Gerenciamento de dados
- Cada arquivo `.html` - Estrutura específica

---

**Versão:** 2.0 (JavaScript)  
**Última atualização:** 2025  
**Status:** Funcional para demonstração
