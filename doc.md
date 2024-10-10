Passo a passo para rodar esse código local:

    Instalar:
    1 - git clone

    Baixar dependencias:
    2 - npm i 

        Explicação das dependencias (não precisa fazer):
        1: npm install @nestjs/sequelize sequelize sequelize-typescript pg pg-hstore
        obs:
        - @nestjs/sequelize: integração Nest.js com Sequelize.
        - sequelize-typescript: integração do TypeScript com o Sequelize.
        - pg e pg-hstore: bibliotecas do PostgreSQL para funcionar com o Sequelize.

        Baixar o docker:
        2: docker run --name political_postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=political_marketing -p 5432:5432 -d postgres




Funções da API:

Pegar os dados de todas as campanhas de um cliente específico:

Busca as campanhas de um cliente usando a API do Facebook.
Depois, armazena ou atualiza essas campanhas no banco de dados.
Verificar se existe alteração em alguma campanha e atualizar/criar:

Verifica se as campanhas mudaram (dados alterados, novas campanhas, etc.).
Atualiza os dados no banco ou cria um novo registro se for uma campanha nova.
Armazenar os dados das campanhas no banco de dados:

Salva todas as informações das campanhas, guardando cada detalhe para consultas futuras.
Buscar todas as campanhas armazenadas:

A função findAll() traz todas as campanhas que estão no banco de dados.
Buscar uma campanha específica pelo id:

A função findOne(id: string) permite buscar uma campanha específica usando o id dela.
Automatizar a busca diária de campanhas (cron job):

Um cron job foi criado para buscar as campanhas automaticamente todos os dias, às 00h.
Isso garante que as informações estejam sempre atualizadas sem precisar de esforço manual.
Autenticação e geração de token JWT para segurança:

Tem um sistema de login que gera um token seguro usando JWT.
A função login verifica os dados, e se tudo estiver certo, entrega o token para o acesso.
Criação de usuários e validação de credenciais:

Permite criar novos usuários e registra eles de forma segura.
A função create() cria novos usuários e armazena as senhas de forma protegida.
Só quem é registrado e validado consegue acessar os recursos protegidos.
Documentação da API com Swagger:

A API está documentada no Swagger, para facilitar a visualização e os testes dos endpoints.
Cada rota tem uma explicação, mostrando o que espera receber e o que vai retornar.
Verificação de existência do usuário no banco de dados antes de criar:

Antes de criar um novo usuário, verifica se ele já está no banco.
Assim, evita que dois usuários com o mesmo nome sejam cadastrados.