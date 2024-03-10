Feature: Ver as reviews passadas de uma cadeira

Scenario: Ver a review de uma cadeira
    Given a review de "Marcela" com nota "9" e comentário "ok" é a única review para a disciplina "SD"
    When uma requisição GET é enviada para "/displayreviews/recents/SD/1"
    Then o código da resposta deve ser "200"
    And o JSON de resposta deverá conter a review de "Marcela" com nota "9" e comentário "ok" para a disciplina "SD" na sua posição "0"

Scenario: Ordenar reviews por melhores notas
    Given a review de "Thiago9" com nota "9" e comentário "ok" está cadastrada para a disciplina "SD"
    And a review de "Thiago10" com nota "10" e comentário "ok" está cadastrada para a disciplina "SD"
    When uma requisição GET é enviada para "/displayreviews/bestgrades/SD/1"
    Then o código da resposta deve ser "200"
    And o JSON de resposta deverá conter a review de "Thiago10" com nota "10" e comentário "ok" para a disciplina "SD" na sua posição "0"
    And o JSON de resposta deverá conter a review de "Thiago9" com nota "9" e comentário "ok" para a disciplina "SD" na sua posição "1"

Scenario: Calcular avaliação média de uma cadeira
    Given a review de "hello9" com nota "9" e comentário "ok" está cadastrada para a disciplina "IH"
    And a review de "hello1" com nota "1" e comentário "ok" está cadastrada para a disciplina "IH"
    And a review de "hello2" com nota "8" e comentário "ok" está cadastrada para a disciplina "IH"
    When uma requisição GET é enviada para "/displayreviews/mean/IH"
    Then o código da resposta deve ser "200"
    And o JSON de resposta deverá apresentar um float com valor "6.0" como média geral da disiciplina "IH"

Scenario: Ordenar reviews por mais recentes
    Given a review de "Welcome" com nota "9" e comentário "ok" era inicialmente a única review cadastrada para a disciplina "GDI"
    And a review de "Hi" com nota "8" e comentário "ok" foi cadastrada para a disciplina "GDI" um pouco depois
    And a review de "Hello" com nota "2" e comentário "ok" foi cadastrada para a disciplina "GDI" um pouco depois
    When uma requisição GET é enviada para "/displayreviews/recents/GDI/1"
    Then o código da resposta deve ser "200"
    And o JSON de resposta deverá conter a review de "Hello" com nota "2" e comentário "ok" para a disciplina "GDI" na sua posição "0"
    And o JSON de resposta deverá conter a review de "Hi" com nota "8" e comentário "ok" para a disciplina "GDI" na sua posição "1"
    And o JSON de resposta deverá conter a review de "Welcome" com nota "9" e comentário "ok" para a disciplina "GDI" na sua posição "2"

Scenario: Ordenar reviews por mais antigas
    Given a review de "Welcome" com nota "9" e comentário "ok" era inicialmente a única review cadastrada para a disciplina "GDI"
    And a review de "Hi" com nota "8" e comentário "ok" foi cadastrada para a disciplina "GDI" um pouco depois
    And a review de "Hello" com nota "2" e comentário "ok" foi cadastrada para a disciplina "GDI" um pouco depois
    When uma requisição GET é enviada para "/displayreviews/oldest/GDI/1"
    Then o código da resposta deve ser "200"
    And o JSON de resposta deverá conter a review de "Welcome" com nota "9" e comentário "ok" para a disciplina "GDI" na sua posição "0"
    And o JSON de resposta deverá conter a review de "Hi" com nota "8" e comentário "ok" para a disciplina "GDI" na sua posição "1"
    And o JSON de resposta deverá conter a review de "Hello" com nota "2" e comentário "ok" para a disciplina "GDI" na sua posição "2"

Scenario: Primeira página de uma cadeira com muitas reviews
    Given a review de "hello0" com nota "9" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello1" com nota "10" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello2" com nota "10" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello3" com nota "10" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello4" com nota "10" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello5" com nota "10" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello6" com nota "10" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello7" com nota "10" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello8" com nota "10" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello9" com nota "10" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello10" com nota "10" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello11" com nota "10" e comentário "ok" está cadastrada para a disciplina "IP"
    When uma requisição GET é enviada para "/displayreviews/recents/IP/1"
    Then o código da resposta deve ser "200"
    And o JSON de resposta deverá conter "10" reviews

Scenario: Segunda página de uma cadeira com muitas reviews
    Given a review de "hello0" com nota "9" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello1" com nota "10" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello2" com nota "10" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello3" com nota "10" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello4" com nota "10" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello5" com nota "10" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello6" com nota "10" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello7" com nota "10" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello8" com nota "10" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello9" com nota "10" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello10" com nota "10" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello11" com nota "10" e comentário "ok" está cadastrada para a disciplina "IP"
    When uma requisição GET é enviada para "/displayreviews/recents/IP/2"
    Then o código da resposta deve ser "200"
    And o JSON de resposta deverá conter "2" reviews

Scenario: Ordenar uma cadeira com muitas reviews por pior nota
    Given a review de "hello9" com nota "9" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello1" com nota "1" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello2" com nota "2" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello3" com nota "3" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello4" com nota "4" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello5" com nota "5" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello8" com nota "8" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello7" com nota "7" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello10" com nota "10" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello6" com nota "6" e comentário "ok" está cadastrada para a disciplina "IP"
    And a review de "hello0" com nota "0" e comentário "ok" está cadastrada para a disciplina "IP"
    When uma requisição GET é enviada para "/displayreviews/worstgrades/IP/1"
    Then o código da resposta deve ser "200"
    And o JSON de resposta deverá conter "10" reviews
    And o JSON de resposta deverá conter a review de "hello0" com nota "0" e comentário "ok" para a disciplina "IP" na sua posição "0"
    And o JSON de resposta deverá conter a review de "hello1" com nota "1" e comentário "ok" para a disciplina "IP" na sua posição "1"
    And o JSON de resposta deverá conter a review de "hello2" com nota "2" e comentário "ok" para a disciplina "IP" na sua posição "2"
    And o JSON de resposta deverá conter a review de "hello3" com nota "3" e comentário "ok" para a disciplina "IP" na sua posição "3"
    And o JSON de resposta deverá conter a review de "hello4" com nota "4" e comentário "ok" para a disciplina "IP" na sua posição "4"
    And o JSON de resposta deverá conter a review de "hello5" com nota "5" e comentário "ok" para a disciplina "IP" na sua posição "5"
    And o JSON de resposta deverá conter a review de "hello6" com nota "6" e comentário "ok" para a disciplina "IP" na sua posição "6"
    And o JSON de resposta deverá conter a review de "hello7" com nota "7" e comentário "ok" para a disciplina "IP" na sua posição "7"
    And o JSON de resposta deverá conter a review de "hello8" com nota "8" e comentário "ok" para a disciplina "IP" na sua posição "8"
    And o JSON de resposta deverá conter a review de "hello9" com nota "9" e comentário "ok" para a disciplina "IP" na sua posição "9"
    And o JSON de resposta não deverá conter a review de "hello10"

Scenario: Mostrar reviews de uma discipina sem reviews
    Given a disciplina de "MNC" não possui nenhum review
    When uma requisição GET é enviada para "/displayreviews/recents/MNC/1"
    Then o código da resposta deve ser "404"
    And a messagem de erro "We couldn't find any reviews for this discipline" será mostrada

Scenario: Média de uma disciplina sem reviews
    Given a disciplina de "MNC" não possui nenhum review
    When uma requisição GET é enviada para "/displayreviews/mean/MNC"
    Then o código da resposta deve ser "404"
    And a messagem de erro "We couldn't find any reviews for this discipline" será mostrada