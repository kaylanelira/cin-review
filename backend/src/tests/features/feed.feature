Feature: Pagina Inicial
As a usuario do sistema
I want to acessar as cadeiras disponiveis no sistema
So that para que eu possa visualizar e postar reviews

Scenario: Carregamento com sucesso das reviews mais recentes
    Given o ReviewService possui as reviews 
        | username  | discipline    | rating | comment       | time                |
        | usuario1  | disciplina1   | 5      | Comentário 1  | 2024-02-18 16:41:59 |
        | usuario2  | disciplina1   | 4      | Comentário 2  | 2024-02-18 16:41:59 |
        | usuario3  | disciplina2   | 3      | Comentário 3  | 2024-02-18 16:41:59 |
        | usuario4  | disciplina2   | 4      | Comentário 4  | 2024-02-18 16:41:59 |
        | usuario5  | disciplina3   | 5      | Comentário 5  | 2024-02-18 16:41:59 |
        | usuario6  | disciplina3   | 5      | Comentário 5  | 2024-02-18 16:42:42 |
        | usuario7  | disciplina4   | 5      | Comentário 5  | 2024-02-18 16:43:33 |
        | usuario8  | disciplina4   | 5      | Comentário 5  | 2024-02-18 16:44:05 |
        | usuario9  | disciplina5   | 5      | Comentário 5  | 2024-02-18 16:44:20 |
        | usuario10 | disciplina5   | 5      | Comentário 5  | 2024-02-18 16:44:40 |
        | usuario11 | disciplina6   | 5      | Comentário 5  | 2024-02-18 16:45:31 |
        | usuario12 | disciplina6   | 5      | Comentário 5  | 2024-02-18 16:45:56 |
        | usuario13 | disciplina7   | 5      | Comentário 5  | 2024-02-18 16:47:18 |
        | usuario14 | disciplina7   | 5      | Comentário 5  | 2024-02-18 16:48:07 |
        | usuario15 | disciplina8   | 5      | Comentário 5  | 2024-02-18 16:48:41 |
        | usuario16 | disciplina8   | 5      | Comentário 5  | 2024-02-18 16:49:05 |
        | usuario17 | disciplina9   | 5      | Comentário 5  | 2024-02-18 16:50:01 |
        | usuario18 | disciplina9   | 5      | Comentário 5  | 2024-02-18 16:50:38 |
        | usuario19 | disciplina10  | 5      | Comentário 5  | 2024-02-18 16:51:05 |
        | usuario20 | disciplina10  | 5      | Comentário 5  | 2024-02-18 16:51:24 |
        | usuario21 | disciplina11  | 5      | Comentário 5  | 2024-02-18 16:51:48 |
        | usuario22 | disciplina12  | 5      | Comentário 5  | 2024-02-18 16:52:07 |
        | usuario23 | disciplina13  | 5      | Comentário 5  | 2024-02-18 16:52:28 |
        | usuario24 | disciplina14  | 4      | Comentário 4  | 2024-02-18 16:52:49 |
        | usuario25 | disciplina15  | 5      | Comentário 5  | 2024-02-18 16:53:06 |
    When uma requisição GET é enviada para "review/get_recent_reviews"
    Then o status da resposta deve ser "200"
	And o JSON da resposta deve conter as dez reviews mais recentes

Scenario: Sem review cadastradas (mais recentes)
    Given o ReviewService nao possui reviews
    When uma requisição GET é enviada para "review/get_recent_reviews"
    Then o status da resposta deve ser "200"
	And o JSON da resposta deve estar vazio

Scenario: Carregamento com sucesso das cadeiras Em Alta
    Given o ReviewService possui as reviews 
        | username  | discipline    | rating | comment       | time                |
        | usuario1  | disciplina1   | 5      | Comentário 1  | 2024-02-18 16:41:59 |
        | usuario2  | disciplina1   | 4      | Comentário 2  | 2024-02-18 16:41:59 |
        | usuario3  | disciplina2   | 3      | Comentário 3  | 2024-02-18 16:41:59 |
        | usuario4  | disciplina2   | 4      | Comentário 4  | 2024-02-18 16:41:59 |
        | usuario5  | disciplina3   | 5      | Comentário 5  | 2024-02-18 16:41:59 |
        | usuario6  | disciplina3   | 5      | Comentário 5  | 2024-02-18 16:42:42 |
        | usuario7  | disciplina4   | 5      | Comentário 5  | 2024-02-18 16:43:33 |
        | usuario8  | disciplina4   | 5      | Comentário 5  | 2024-02-18 16:44:05 |
        | usuario9  | disciplina5   | 5      | Comentário 5  | 2024-02-18 16:44:20 |
        | usuario10 | disciplina5   | 5      | Comentário 5  | 2024-02-18 16:44:40 |
        | usuario11 | disciplina6   | 5      | Comentário 5  | 2024-02-18 16:45:31 |
        | usuario12 | disciplina6   | 5      | Comentário 5  | 2024-02-18 16:45:56 |
        | usuario13 | disciplina7   | 5      | Comentário 5  | 2024-02-18 16:47:18 |
        | usuario14 | disciplina7   | 5      | Comentário 5  | 2024-02-18 16:48:07 |
        | usuario15 | disciplina8   | 5      | Comentário 5  | 2024-02-18 16:48:41 |
        | usuario16 | disciplina8   | 5      | Comentário 5  | 2024-02-18 16:49:05 |
        | usuario17 | disciplina9   | 5      | Comentário 5  | 2024-02-18 16:50:01 |
        | usuario18 | disciplina9   | 5      | Comentário 5  | 2024-02-18 16:50:38 |
        | usuario19 | disciplina10  | 5      | Comentário 5  | 2024-02-18 16:51:05 |
        | usuario20 | disciplina10  | 5      | Comentário 5  | 2024-02-18 16:51:24 |
        | usuario21 | disciplina11  | 5      | Comentário 5  | 2024-02-18 16:51:48 |
        | usuario22 | disciplina12  | 5      | Comentário 5  | 2024-02-18 16:52:07 |
        | usuario23 | disciplina13  | 5      | Comentário 5  | 2024-02-18 16:52:28 |
        | usuario24 | disciplina14  | 4      | Comentário 4  | 2024-02-18 16:52:49 |
        | usuario25 | disciplina15  | 5      | Comentário 5  | 2024-02-18 16:53:06 |
    When uma requisição GET é enviada para "review/get_disciplines_by_most_reviews"
    Then o status da resposta deve ser "200"
	And o JSON da resposta deve conter as dez cadeiras com mais reviews

Scenario: Sem review cadastradas (Em alta)
    Given o ReviewService nao possui reviews
    When uma requisição GET é enviada para "review/get_disciplines_by_most_reviews"
    Then o status da resposta deve ser "200"
	And o JSON da resposta deve estar vazio

Scenario: Carregamento com sucesso das disciplinas por ordem alfabetica
    Given o DisciplineService possui as disciplinas 
        | name                                    | code   | department | semester | professor        | description                      |
        | Ingles para Computacao                  | LE530  | EC         | 6        | Prof. Silva      | Curso de ingles                  |
        | Fisica 3                                | FI108  | AREA 2     | 4        | Prof. Oliveira   | Terceiro semestre de Fisica      |
        | Engenharia de Software e Sistemas       | IF682  | EC         | 6        | Prof. Breno      | Estudo da Engenharia de Software |
        | Calculo 1                               | MA026  | AREA 2     | 1        | Prof. Souza      | Calculo diferencial e integral   |
        | Introducao a Computacao                 | IF668  | EC         | 1        | Prof. Pereira    | Conceitos basicos de computacao  |
        | Introducao a Programacao                | IF669  | EC         | 1        | Prof. ACM        | Introducao a programacao C       |
        | Matematica Discreta                     | IF670  | EC         | 1        | Prof. Nivan      | Estudo de matematica discreta    |
        | Algebra Vetorial Linear para Computacao | MA531  | EC         | 1        | Prof. Paulo      | Algebra vetorial aplicada        |
    When uma requisição GET é enviada para "discipline/get_all_alphabetically"
    Then o status da resposta deve ser "200"
	And o JSON da resposta deve conter as disciplinas em ordem alfabetica

Scenario: Sem disciplinas cadastradas
    Given o DisciplineService nao possui disciplina
    When uma requisição GET é enviada para "discipline/get_all"
    Then o status da resposta deve ser "200"
	And o JSON da resposta deve estar vazio

Scenario: Aplicacao do filtro por periodo com sucesso
    Given o DisciplineService possui as disciplinas 
        | name                                    | code   | department | semester | professor        | description                      |
        | Ingles para Computacao                  | LE530  | EC         | 6        | Prof. Silva      | Curso de ingles                  |
        | Fisica 3                                | FI108  | AREA 2     | 4        | Prof. Oliveira   | Terceiro semestre de Fisica      |
        | Engenharia de Software e Sistemas       | IF682  | EC         | 6        | Prof. Breno      | Estudo da Engenharia de Software |
        | Calculo 1                               | MA026  | AREA 2     | 1        | Prof. Souza      | Calculo diferencial e integral   |
        | Introducao a Computacao                 | IF668  | EC         | 1        | Prof. Pereira    | Conceitos basicos de computacao  |
        | Introducao a Programacao                | IF669  | EC         | 1        | Prof. ACM        | Introducao a programacao C       |
        | Matematica Discreta                     | IF670  | EC         | 1        | Prof. Nivan      | Estudo de matematica discreta    |
        | Algebra Vetorial Linear para Computacao | MA531  | EC         | 1        | Prof. Paulo      | Algebra vetorial aplicada        |
    When uma requisição GET é enviada para "discipline/by-semester/1"
    Then o status da resposta deve ser "200"
	And o JSON da resposta deve conter as disciplinas do periodo "1"

Scenario: Aplicacao do filtro por periodo sem sucesso
    Given o DisciplineService possui as disciplinas
        | name                                    | code   | department | semester | professor        | description                      |
        | Ingles para Computacao                  | LE530  | EC         | 6        | Prof. Silva      | Curso de ingles                  |
        | Fisica 3                                | FI108  | AREA 2     | 4        | Prof. Oliveira   | Terceiro semestre de Fisica      |
        | Engenharia de Software e Sistemas       | IF682  | EC         | 6        | Prof. Breno      | Estudo da Engenharia de Software |
        | Calculo 1                               | MA026  | AREA 2     | 1        | Prof. Souza      | Calculo diferencial e integral   |
        | Introducao a Computacao                 | IF668  | EC         | 1        | Prof. Pereira    | Conceitos basicos de computacao  |
        | Introducao a Programacao                | IF669  | EC         | 1        | Prof. ACM        | Introducao a programacao C       |
        | Matematica Discreta                     | IF670  | EC         | 1        | Prof. Nivan      | Estudo de matematica discreta    |
        | Algebra Vetorial Linear para Computacao | MA531  | EC         | 1        | Prof. Paulo      | Algebra vetorial aplicada        |
    When uma requisição GET é enviada para "discipline/by-semester/5"
    Then o status da resposta deve ser "200"
	And o JSON da resposta deve estar vazio

Scenario: Busca pelo nome da disciplina com sucesso
    Given o DisciplineService possui as disciplinas 
        | name                                    | code   | department | semester | professor        | description                      |
        | Ingles para Computacao                  | LE530  | EC         | 6        | Prof. Silva      | Curso de ingles                  |
        | Fisica 3                                | FI108  | AREA 2     | 4        | Prof. Oliveira   | Terceiro semestre de Fisica      |
        | Engenharia de Software e Sistemas       | IF682  | EC         | 6        | Prof. Breno      | Estudo da Engenharia de Software |
        | Calculo 1                               | MA026  | AREA 2     | 1        | Prof. Souza      | Calculo diferencial e integral   |
        | Introducao a Computacao                 | IF668  | EC         | 1        | Prof. Pereira    | Conceitos basicos de computacao  |
        | Introducao a Programacao                | IF669  | EC         | 1        | Prof. ACM        | Introducao a programacao C       |
        | Matematica Discreta                     | IF670  | EC         | 1        | Prof. Nivan      | Estudo de matematica discreta    |
        | Algebra Vetorial Linear para Computacao | MA531  | EC         | 1        | Prof. Paulo      | Algebra vetorial aplicada        |
    When uma requisição GET é enviada para "discipline/get_disciplines_by_search/"is""
    Then o status da resposta deve ser "200"
	And o JSON da resposta deve conter as disciplina com substring "is"

Scenario: Busca pelo nome da disciplina sem sucesso
    Given o DisciplineService possui as disciplinas 
        | name                                    | code   | department | semester | professor        | description                      |
        | Ingles para Computacao                  | LE530  | EC         | 6        | Prof. Silva      | Curso de ingles                  |
        | Fisica 3                                | FI108  | AREA 2     | 4        | Prof. Oliveira   | Terceiro semestre de Fisica      |
        | Engenharia de Software e Sistemas       | IF682  | EC         | 6        | Prof. Breno      | Estudo da Engenharia de Software |
        | Calculo 1                               | MA026  | AREA 2     | 1        | Prof. Souza      | Calculo diferencial e integral   |
        | Introducao a Computacao                 | IF668  | EC         | 1        | Prof. Pereira    | Conceitos basicos de computacao  |
        | Introducao a Programacao                | IF669  | EC         | 1        | Prof. ACM        | Introducao a programacao C       |
        | Matematica Discreta                     | IF670  | EC         | 1        | Prof. Nivan      | Estudo de matematica discreta    |
        | Algebra Vetorial Linear para Computacao | MA531  | EC         | 1        | Prof. Paulo      | Algebra vetorial aplicada        |
    When uma requisição GET é enviada para "discipline/get_disciplines_by_search/"isa""
    Then o status da resposta deve ser "200"
	And o JSON da resposta deve estar vazio