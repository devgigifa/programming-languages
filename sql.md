Banco de dados relacional SQL

# Commando SELECT
-- SQL Server, Postgres, Oracle, mySql

Para todas as colunas
SELECT *
FROM tabela

Selecionar uma coluna ou mais ou todas de uma tabela

SELECT coluna1, coluna2
FROM tabela

Exemplo

SELECT *
FROM person.person;

SELECT Title
FROM person.person;

// Desafio 1
A equipe de markenting precisa fazer uma pesquisa sobrenomes mais comuns de seus clientes e precisa do nome e sobrenome de todos os clientes que estão cadastrados no sistema.

SELECT firstName, lastName
FROM person.person

# DISTINCT
únicos, remove os duplicados de uma tabela

SELECT DISTINCT coluna1, coluna2
FROM tabela

// Desafio 2
Quantos nomes sobrenomes únicos temos em nossa tabela person.person

SELECT DISTINCT lastName
FROM person.person

# WHERE

SELECT coluna1, coluna2
FROM tabela
WHERE condicao;


    OPERADOR      -      DESCRIÇÃO
    =                      IGUAL
    >                      MAIOR QUE
    <                      MENOR QUE
    >=                     MAIOR QUE OU IGUAL
    <=                     MENOR QUE OU IGUAL
    <>                     DIFERENTE DE
    AND                    OPERADOR LÓGICO E
    OR                     OPERADOR LÓGICO OU


SELECT *
FROM person.person
WHERE LastName = 'Miller' and FirstName = 'Anna'

SELECT *
FROM production.Product
WHERE color = 'blue' or color = 'black'

SELECT *
FROM production.Product
WHERE ListPrice > 1500 and ListPrice < 5000
// tipo filtragem de produtos em sites

# COUNT
Conta algo

SELECT COUNT(DISTINCT coluna1)
FROM tabela

SELECT COUNT(*)
FROM tabela

# TOP
primeiras entradas do banco de dados

SELCT TOP 10 *
FROM tabela

# ORDER BY
Define uma ordem, ordena

SELECT coluna1, coluna2
FROM tabela
ORDER BY coluna1 asc/desc

Exemplo
 Obter ProductId dos 10 produtos mais caros cadastrados no sistema, listando do mais caro para o mais barato

SELECT TOP 10 ProductId
FROM production.product
ORDER BY listPrice desc


# BEETWEN
Entre, usado para encontrar valor entre um valor mínimo e valor máximo

valor BEETWEEN mínimo AND máximo;
valor >= mínimo AND valor <= máximo;

SELECT *
FROM tabela
WHERE coluna1 between 1000 and 1500;

SELECT *
FROM tabela
WHERE coluna1 NOT between 1000 and 1500;

Formato de data no SQL '2009/01/01' ano/mes/dia

# IN
Usado junto com o WHERE para verificar se um valor correspondem com qualquer valor passado na lista de valores

valor IN ('valor1', 'valor2')
valor IN (SELECT valor FROM tabela)

Exemplo
SELECT *
FROM tabela
WHERE coluna1 IN (2,7,13)

usando NOT antes ele faz o oposto

# LIKE
procura um padrão
%to - roberto
to% - tomas
%to% giltobi

SELECT *
FROM tabela
WHERE coluna1 LIKE 'ovi%'

...

// DESAFIO
produtos vermelhos com preço entre 500 a 1000 dolares

SELECT COUNT(*)
FROM tabela
WHERE color = 'red'
AND ListPrice BETWEEN 500 AND 1000

# MIN MAX SUM AVG
Funções de agregação, basicamente agregam ou combinam dados de uma tabela em 1 resultado só
AS nome

SUM            SOMA


    SELECT TOP 10 sum(linetotal) AS 'soma'
    FROM tabela


MIN            MENOR VALOR


    SELECT TOP 10 min(linetotal) AS 'Menor valor'
    FROM tabela


MAX            MAIOR VALOR


    SELECT TOP 10 max(linetotal) AS 'Maior valor'
    FROM tabela


AVG            MEDIA


    SELECT TOP 10 avg(LineTotal) AS 'Média'


# GROUP BY
Divide o resultado da sua pesquisa em grupos
Para cada grupo pode aplicar uma função de agregação:
- calcular a soma de itens
- contar o número de itens naquele grupo


    SELECT coluna1, funcaoAgregacao(coluna2)
    FROM tabela
    GROUP BY COLUNA1;

Exemplo
-- Quantos de cada produto foi vendido

SELECT productId, COUNT(productId) AS 'contagem'
FROM tabela
GROUP BY productId

# HAVING
Usado em junção com o group by para filtrar resultados de um agrupamento.

SELECT coluna1, funcaoAgregacao(coluna2)
FROM tabela
GROUP BY coluna1
HAVING condicao

A diferença entre HAVING e WHERE: o GROUP BY é aplicado depois que os dados já foram agrupados, enquanto o WHERE é aplicado antes dos dados serem agrupados.


// Exemplo
select firstName, count(firstName) AS "quantidade"
FROM tabela
GROUP BY firstName
HAVING count(firstName) > 10

# AS
Renomear as colunas, dando nome específico
uma palavra não necessita aspas, apenas mais de uma

AS quantidade              AS "quantidade de produtos"

# INNER JOIN
Informações de mais de uma tabela, junção de informações de diferentes tabelas

// Exemplo
    *Cliente*                *Endereço*                
    ClienteId                EnderecoId
    Nome                     Rua
    EnderecoId               Cidade

SELECT C.ClienteId, C.Nome, E.Rua, E.Cidade
FROM Cliente C
INNER JOIN Endereco E ON E.EnderecoId = C.EnderecoId

Basicamente deve-se definir um apelido para a tabela como:
person.PersonPhone PP
person.phoneNumberType NT
PT.PhoneId = PP.PhoneId

Sintaxe
SELECT A.Coluna1, A.Coluna2, P.Coluna3
FROM tabela A
INNER JOIN tabela P ON A.Coluna2 = P.coluna2

# Tipos de Join
    INNER JOIN
    Retorna apenas os resultados que correspondem (existem) tanto na tabela A como na tabela B, retorna a interseção

    SELECT * FROM TabelaA
    INNER JOIN TabelaB
    ON TabelaA.nome = TabelaB.nome

.

    FULL OUTER JOIN
    Retorna um conjunto de todos os registros correspondentes da TabelaA e TabelaB qunado são iguais. E além disso, se não houver valores correspondentes, ele simplesmente irá preencher esse lado com 'null'. Tudo que existe nas duas tabelas.

    SELECT * FROM TabelaA
    FULL OUTER JOIN TabelaB
    ON TabelaA.nome = TabelaB.nome

.

    LEFT OUTER JOIN
    Retorna um conjunto de todos os registros da TabelaA, e além disso, os registros correspondentes (Quando disponíveis) na TabelaB. se não houver registros correspondentes ele simplesmente vaii preencher com 'null'.

    SELECT * FROM TabelaA
    LEFT JOIN TabelaB
    ON TabelaA.nome = TabelaB.nome

    O RIGHT OUTER JOIN é o contrário!
.

    SELF JOIN
    É uma forma de agrupar dados ou filtrar informações dentro da mesma tabela

    // Exemplo
    SELECT A.ContactName, A.region, B.ContactName, B.region
    FROM customers A, customers B
    WHERE A.region = B.region

# UNION
O operador combina dois ou mais resultados de um select em um resultado apenas e ainda remove os dados duplicados

SELECT coluna1, coluna2
FROM tabela1
UNION
SELECT coluna1, coluna2
FROM tabela2

// Exemplo
SELECT coluna1, coluna2
FROM tabela1
WHERE titulo = 'mr'
UNION
SELECT coluna1, coluna2
FROM tabela2
WHERE middleName = 'A'

# SUBQUERY (SUBSELECT)

// Exemplo
SELECT *
FROM production.product
WHERE listPrice > (SELECT AVG(listPrice) FROM production.product)

# DATEPART
Manipular com datas

https://learn.microsoft.com/pt-br/sql/t-sql/functions/datepart-transact-sql?view=sql-server-ver16

// Exemplo
SELECT salesOrderId, DATEPART(month, orderDate) AS mês
FROM sales.salesOrder

com média
SELECT AVG(totalDue) AS media, DATEPART(day, orderDate) AS mes
FROM sales.salesOrder
GROUP BY DATEPART(day, orderDate)
ORDER BY mes


# Tipos de dados
1. Booleanos
2. Caractere
3. Números
4. Temporais

## Booleanos
É iniciado como nulo, e pode receber tanto 1 ou 0

## Caractere
Tamanho fixo - char // permite inserir até uma quantidade fixa de caracteres e sempre ocupa todo o espaço reservado 10/50
Tamanho variável - varchar ou nvarchar // permite inserir até uma quantidade que for definida, porém só usa o espaço que for preenchido 10/50

## Números
Exatos:
TINYINT
SMALLINT
INT
BIGINT

Aproximados
REAL tem precisão aproximada de até 15 dígitos
FLOAT mesmo conceito de REAL

## Temporais
DATE - armazena data no formato yyyy/mm/dd
DATETIME - armazena data e horas no formato yyyy/mm/dd:hh:mm:ss

# CHAVES PRIMÁRIAS E ESTRANGEIRAS
## Chave primária:
* Uma coluna ou grupo de colunas, usada para identificar unicamente uma linha em uma tabela
* Criar chaves primárias através que restrições (constraints) que são regras que define quando está criando uma coluna, o que cria um índice único para aquela coluna ou grupo de colunas.

CREATE TABLE nome_tabela (
    nomeColuna tipoDados PRIMARY KEY
    nomeColuna tipoDados ...
)

## Chave estrangeira:
* Coluna ou grupo de colunas em uma tabela que identifica unicamente uma linha em outra tabela
* Uma chave estrangeira é definida em uma tabela onde ela é apenas uma referência e não contém todos os dados ali
* Basicamente uma chave estrangeira é uma coluna ou um grupo de colunas que é uma chave primária em outra tabela.

# CREATE TABLE
* NOT NULL - não permite nulos
* UNIQUE - força que todos os valores em uma coluna sejam diferentes
* PRIMARY KEY - junção de NOT NULL e UNIQUE
* FOREIGN KEY - identifica unicamente uma linha em outra tabela
* CHECK - força uma condição específica em uma coluna
* DEFAULT - força um valor padrão quando nenhum valor é passado

# UPDATE
alterar

UPDATE tabela
SET nome = 'mudança'
WHERE id = 3

SELECT * FROM tabela

# DELETE
Colocar condição para deletar

DELETE FROM tabela
WHERE nome = 'mudança'
