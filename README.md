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

# Rodando os testes

- Faça um clone do projeto:
<pre><code>git clone git@github.com:cleysondiego/sgm-frontend.git</code></pre>

- Instale as dependências do projeto:
<pre><code>yarn install</code></pre>

- Rode os testes:
<pre><code>yarn test</code></pre>

- Para limpar o cache dos testes:
<pre><code>yarn jest --clearCache</code></pre>

# Features e Requisitos

## Cadastro de usuário

**RF (Requisitos Funcionais)**

- O usuário da secretaria deve poder cadastrar/excluir/editar/consultar um novo usuário para secretaria;
- O usuário da secretaria deve poder cadastrar/excluir/editar/consultar professores, monitores e monitorias;
- O usuário da secretaria deve poder visualizar relatórios;

**RN (Regras de Negócios)**

- Não poderá existir dois usuários com o mesmo email;
- Um usuário só pode ser do tipo secretaria, professor ou monitor.

## Recuperação de senha

**RF (Requisitos Funcionais)**

- O usuário deve poder recuperar sua senha informando o seu email;
- O usuário deve perceber um email com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF (Requisitos não Funcionais)**

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
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

## Relatório

**RF (Requisitos Funcionais)**

- O usuário da secretaria poderá visualizar relatórios para acompanhamento das monitorias;
- O relatório deverá ser dividido ano/mês e separado por curso/matéria da monitoria;
- O usuário do professor e o usuário do monitor poderão visualizar relatórios de presença dos alunos por dia/mês;
- O sistema deverá ter um schedule para enviar o relatório de presença do dia atual para o professor.

**RN (Regras de Negócios)**

- O usuário da secretaria pode visualizar o relatório completo de uma disciplina;
- O usuário do professor e o usuário do monitor pode visualizar o relatório de presença dos alunos por dia/mês;
- O usuário do monitor deverá ter acesso a uma rota que fará o envio da lista de presença do dia atual;
- O schedule deverá ser enviado todos os dias às 20hs.

## Monitorias

**RF (Requisitos Funcionais)**

- O usuário da secretaria deve poder cadastrar/excluir/editar/consultar monitorias;
- A candidatura para se tornar o monitor de uma disciplina pode ser feita através de um formulário (sem usuário logado);
- O professor pode consultar a monitoria que ele é responsável;

**RN (Regras de Negócios)**

- O monitor e o professor, podem estar associados apenas em uma monitoria;

## Presenças

**RF (Requisitos Funcionais)**

- A presença deverá ser realizada pelo monitor, informando o RA do aluno presente;
- O monitor e o professor poderão consultar as presenças;

**RN (Regras de Negócios)**

- O aluno não poderá ter presença 2x ou mais no mesmo dia;

## Matérias

**RF (Requisitos Funcionais)**

- O professor poderá consultar/adicionar/alterar/deletar arquivos relacionados a matérias da sua disciplina;
- O professor poderá consultar/adicionar/alterar/deletar links relacionados a matérias da sua disciplina;
- O monitor poderá consultar os arquivos e links da sua disciplina;

**RN (Regras de Negócios)**

- O professor poderá adicionar qualquer tipo de arquivo e link na sua disciplina;
- O monitor poderá consultar arquivos e links da sua disciplina;
