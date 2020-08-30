# Preparando o ambiente para desenvolvimento

## Programas necessários

- Yarn
- NodeJS versão 12.16.3 ou superior
- Docker

## Criando o container do postgres

<pre><code>docker run --name sgmpostgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres</code></pre>

## Criando o container do redis

<pre><code>docker run --name sgmredis -p 6379:6379 -d -t redis:alpine</code></pre>

## Variáveis de ambiente

- Não se esqueça de preencher as variáveis de ambiente em um arquivo .env na raiz do projeto (Vide exemplo no .env.example).

# Rodando o projeto

- Faça um clone do projeto:
<pre><code>git clone git@github.com:cleysondiego/sgm-frontend.git</code></pre>

- Instale as dependências do projeto:
<pre><code>yarn install</code></pre>

- Inicie o container do postgres:
<pre><code>docker start sgmpostgres</code></pre>

- Inicie o container do redis:
<pre><code>docker start sgmredis</code></pre>

- Rode as migrations do banco de dados:
<pre><code>yarn typeorm migration:run</code></pre>

- Inicialize o servidor:
<pre><code>yarn dev:server</code></pre>

# Features e Requisitos

## Recuperação de senha

**RF (Requisitos Funcionais)**

- O usuário deve poder recuperar sua senha informando o seu email;
- O usuário deve perceber um email com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF (Requisitos não Funcionais)**

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (Background job);

**RN (Regras de Negócios)**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

## Atualização do perfil

**RF (Requisitos Funcionais)**

- O usuário deve poder atualizar seu nome, email e senha;

**RN (Regras de Negócios)**

- O usuário não pode alterar seu email para um email já utilizado por outro usuário;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;
