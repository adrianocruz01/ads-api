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

1- Pegar os dados de todas as campanhas de um cliente específico:

- Essa função busca as campanhas de um cliente usando a API do Facebook e armazena ou atualiza as informações no banco de dados.

2 - Verificar se existe alteração em alguma campanha e atualizar/criar:

- Verifica se houve alguma modificação nas campanhas (por exemplo, dados alterados, novas campanhas ou campanhas removidas).
- Atualiza os dados no banco de dados ou cria um novo registro se a campanha ainda não existe.

3 - Armazenar os dados das campanhas no banco de dados:

- Implementado na função que salva as campanhas no banco, incluindo os dados das campanhas com seus respectivos atributos.

4 - Buscar todas as campanhas armazenadas:

- A função findAll() permite que todas as campanhas armazenadas no banco sejam consultadas e retornadas.

5 - Buscar uma campanha específica pelo id:

- A função findOne(id: string) permite buscar uma campanha específica usando o id da campanha armazenada no banco de dados.

6 - Automatizar a busca diária de campanhas (cron job):

- O cron job que busca dados das campanhas diariamente às 00h foi planejado e integrado ao projeto, garantindo que as campanhas sejam atualizadas automaticamente sem necessidade de intervenção manual.
