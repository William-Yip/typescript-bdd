Feature: Cliente online

Como um cliente online
Quero que o sistema me mostre minhas
Para eu poder controlar minhas despesas

Scenario: Obter dados da API

Dado que o cliente tem conexão com a intenet
Quando o cliente solicitar para carregar suas compras
Então o sistema deve exibir suas compras vindo de uma API
E substituir os dados do cache com os dados mais atuais

Feature: Cliente offline

Como um cliente offline
Quero que o sistema me mostra minahs ultimas compras gravadas
Para eu poder ver minhas despesas mesmo sem ter internet

Scenario: Obeter dados do Cache

Dado que o cliente não tem conexão com a internet
E exista algum dado gravado no cache
E os dadao do cache forem mais novo que 3 dias
Quando o cliente solicitar para carregar suas compras
Então o sistema deve exibir uma mensagem de erro

Dado que o cliente não tem conexão com a internet
E o cache esteja vazio
Quando o cliente solicitar para carregar suas compras
Então o sistema deve exibir uma mensagem de erro