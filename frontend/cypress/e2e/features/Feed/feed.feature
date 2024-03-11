Feature: Pagina Inicial
As a usuario do sistema
I want to acessar as cadeiras disponiveis no sistema
So that para que eu possa visualizar e postar reviews

Scenario: Carregamento com sucesso das reviews mais recentes
    Given o ReviewService possui: 
        | username  | discipline    | rating | comment       | time                |
        | usuario1  | LE530         | 5      | Comentário 1  | 2024-02-18 16:41:59 |
        | usuario2  | LE530         | 4      | Comentário 2  | 2024-02-18 16:41:59 |
        | usuario3  | LE530         | 3      | Comentário 3  | 2024-02-18 16:41:59 |
        | usuario4  | FI108         | 4      | Comentário 4  | 2024-02-18 16:41:59 |
        | usuario5  | FI108         | 5      | Comentário 5  | 2024-02-18 16:41:59 |
        | usuario6  | FI108         | 5      | Comentário 5  | 2024-02-18 16:42:42 |
        | usuario7  | IF682         | 5      | Comentário 5  | 2024-02-18 16:43:33 |
        | usuario8  | IF682         | 5      | Comentário 5  | 2024-02-18 16:44:05 |
        | usuario9  | IF682         | 5      | Comentário 5  | 2024-02-18 16:44:20 |
        | usuario10 | MA026         | 5      | Comentário 5  | 2024-02-18 16:44:40 |
        | usuario11 | MA026         | 5      | Comentário 5  | 2024-02-18 16:45:31 |
        | usuario12 | IF668         | 5      | Comentário 5  | 2024-02-18 16:45:56 |
        | usuario13 | IF668         | 5      | Comentário 5  | 2024-02-18 16:47:18 |
        | usuario14 | IF669         | 5      | Comentário 5  | 2024-02-18 16:48:07 |
        | usuario15 | IF669         | 5      | Comentário 5  | 2024-02-18 16:48:41 |
        | usuario16 | IF670         | 5      | Comentário 5  | 2024-02-18 16:49:05 |
        | usuario17 | IF670         | 5      | Comentário 5  | 2024-02-18 16:50:01 |
        | usuario18 | FI109         | 5      | Comentário 5  | 2024-02-18 16:50:38 |
        | usuario19 | FI109         | 5      | Comentário 5  | 2024-02-18 16:51:05 |
        | usuario20 | MA027         | 5      | Comentário 5  | 2024-02-18 16:51:24 |
        | usuario21 | MA027         | 5      | Comentário 5  | 2024-02-18 16:51:48 |
        | usuario22 | MA028         | 5      | Comentário 5  | 2024-02-18 16:52:07 |
        | usuario23 | MA028         | 5      | Comentário 5  | 2024-02-18 16:52:28 |
        | usuario24 | MA029         | 4      | Comentário 4  | 2024-02-18 16:52:49 |
        | usuario25 | FI106         | 5      | Comentário 5  | 2024-02-18 16:53:06 |
    And o DisciplineService possui: 
        | name                                    | code   | department | semester | professor        | description                      |
        | Ingles para Computacao                  | LE530  | EC         | 6        | Prof. Silva      | Curso de ingles                  |
        | Fisica 3                                | FI108  | AREA 2     | 4        | Prof. Oliveira   | Terceiro semestre de Fisica      |
        | Engenharia de Software e Sistemas       | IF682  | EC         | 6        | Prof. Breno      | Estudo da Engenharia de Software |
        | Calculo 1                               | MA026  | AREA 2     | 1        | Prof. Souza      | Calculo diferencial e integral   |
        | Introducao a Computacao                 | IF668  | EC         | 1        | Prof. Pereira    | Conceitos basicos de computacao  |
        | Introducao a Programacao                | IF669  | EC         | 1        | Prof. ACM        | Introducao a programacao C       |
        | Matematica Discreta                     | IF670  | EC         | 1        | Prof. Nivan      | Estudo de matematica discreta    |
        | Algebra Vetorial Linear para Computacao | MA531  | EC         | 1        | Prof. Paulo      | Algebra vetorial aplicada        |
        | Calculo 2                               | MA027  | AREA 2     | 2        | Prof. Souza      | Calculo diferencial e integral II|
        | Calculo 3                               | MA028  | AREA 2     | 3        | Prof. Souza      | Calculo diferencial integral III |
        | Calculo 4                               | MA029  | AREA 2     | 4        | Prof. Souza      | Calculo diferencial e integral IV|
        | Fisica 1                                | FI106  | AREA 2     | 2        | Prof. Oliveira   | Primeiro semestre de Fisica      |
        | Fisica 2                                | FI107  | AREA 2     | 3        | Prof. Oliveira   | Segundo semestre de Fisica       |
        | Fisica 4                                | FI109  | AREA 2     | 5        | Prof. Oliveira   | Quarto semestre de Fisica        |
    When o usuário está na página "feed"
    Then é possível ver no carrossel Mais Recente:
        | username  | discipline                        | comment       |
        | usuario1  | Ingles para Computacao            | Comentário 1  |
        | usuario2  | Ingles para Computacao            | Comentário 2  |
        | usuario3  | Ingles para Computacao            | Comentário 3  |
        | usuario4  | Fisica 3                          | Comentário 4  |
        | usuario5  | Fisica 3                          | Comentário 5  |
        | usuario6  | Fisica 3                          | Comentário 5  |
        | usuario7  | Engenharia de Software e Sistemas | Comentário 5  |
        | usuario8  | Engenharia de Software e Sistemas | Comentário 5  |
        | usuario9  | Engenharia de Software e Sistemas | Comentário 5  |
        | usuario10 | Calculo 1                         | Comentário 5  |
        | usuario11 | Calculo 1                         | Comentário 5  |
        | usuario12 | Introducao a Computacao           | Comentário 5  |
        | usuario13 | Introducao a Computacao           | Comentário 5  |
        | usuario14 | Introducao a Programacao          | Comentário 5  |
        | usuario15 | Introducao a Programacao          | Comentário 5  |
        | usuario16 | Matematica Discreta               | Comentário 5  |
        | usuario17 | Matematica Discreta               | Comentário 5  |
        | usuario18 | Fisica 4                          | Comentário 5  |
        | usuario19 | Fisica 4                          | Comentário 5  |
        | usuario20 | Calculo 2                         | Comentário 5  |
        | usuario21 | Calculo 2                         | Comentário 5  |
        | usuario22 | Calculo 3                         | Comentário 5  |
        | usuario23 | Calculo 3                         | Comentário 5  |
        | usuario24 | Calculo 4                         | Comentário 4  |
        | usuario25 | Fisica 1                          | Comentário 5  |

Scenario: Carregamento com sucesso das cadeiras Em Alta
    Given o ReviewService possui: 
        | username  | discipline    | rating | comment       | time                |
        | usuario1  | LE530         | 5      | Comentário 1  | 2024-02-18 16:41:59 |
        | usuario2  | LE530         | 4      | Comentário 2  | 2024-02-18 16:41:59 |
        | usuario3  | LE530         | 3      | Comentário 3  | 2024-02-18 16:41:59 |
        | usuario4  | FI108         | 4      | Comentário 4  | 2024-02-18 16:41:59 |
        | usuario5  | FI108         | 5      | Comentário 5  | 2024-02-18 16:41:59 |
        | usuario6  | FI108         | 5      | Comentário 5  | 2024-02-18 16:42:42 |
        | usuario7  | IF682         | 5      | Comentário 5  | 2024-02-18 16:43:33 |
        | usuario8  | IF682         | 5      | Comentário 5  | 2024-02-18 16:44:05 |
        | usuario9  | IF682         | 5      | Comentário 5  | 2024-02-18 16:44:20 |
        | usuario10 | MA026         | 5      | Comentário 5  | 2024-02-18 16:44:40 |
        | usuario11 | MA026         | 5      | Comentário 5  | 2024-02-18 16:45:31 |
        | usuario12 | IF668         | 5      | Comentário 5  | 2024-02-18 16:45:56 |
        | usuario13 | IF668         | 5      | Comentário 5  | 2024-02-18 16:47:18 |
        | usuario14 | IF669         | 5      | Comentário 5  | 2024-02-18 16:48:07 |
        | usuario15 | IF669         | 5      | Comentário 5  | 2024-02-18 16:48:41 |
        | usuario16 | IF670         | 5      | Comentário 5  | 2024-02-18 16:49:05 |
        | usuario17 | IF670         | 5      | Comentário 5  | 2024-02-18 16:50:01 |
        | usuario18 | FI109         | 5      | Comentário 5  | 2024-02-18 16:50:38 |
        | usuario19 | FI109         | 5      | Comentário 5  | 2024-02-18 16:51:05 |
        | usuario20 | MA027         | 5      | Comentário 5  | 2024-02-18 16:51:24 |
        | usuario21 | MA027         | 5      | Comentário 5  | 2024-02-18 16:51:48 |
        | usuario22 | MA028         | 5      | Comentário 5  | 2024-02-18 16:52:07 |
        | usuario23 | MA028         | 5      | Comentário 5  | 2024-02-18 16:52:28 |
        | usuario24 | MA029         | 4      | Comentário 4  | 2024-02-18 16:52:49 |
        | usuario25 | FI106         | 5      | Comentário 5  | 2024-02-18 16:53:06 |
    And o DisciplineService possui: 
        | name                                    | code   | department | semester | professor        | description                      |
        | Ingles para Computacao                  | LE530  | EC         | 6        | Prof. Silva      | Curso de ingles                  |
        | Fisica 3                                | FI108  | AREA 2     | 4        | Prof. Oliveira   | Terceiro semestre de Fisica      |
        | Engenharia de Software e Sistemas       | IF682  | EC         | 6        | Prof. Breno      | Estudo da Engenharia de Software |
        | Calculo 1                               | MA026  | AREA 2     | 1        | Prof. Souza      | Calculo diferencial e integral   |
        | Introducao a Computacao                 | IF668  | EC         | 1        | Prof. Pereira    | Conceitos basicos de computacao  |
        | Introducao a Programacao                | IF669  | EC         | 1        | Prof. ACM        | Introducao a programacao C       |
        | Matematica Discreta                     | IF670  | EC         | 1        | Prof. Nivan      | Estudo de matematica discreta    |
        | Algebra Vetorial Linear para Computacao | MA531  | EC         | 1        | Prof. Paulo      | Algebra vetorial aplicada        |
        | Calculo 2                               | MA027  | AREA 2     | 2        | Prof. Souza      | Calculo diferencial e integral II|
        | Calculo 3                               | MA028  | AREA 2     | 3        | Prof. Souza      | Calculo diferencial integral III |
        | Calculo 4                               | MA029  | AREA 2     | 4        | Prof. Souza      | Calculo diferencial e integral IV|
        | Fisica 1                                | FI106  | AREA 2     | 2        | Prof. Oliveira   | Primeiro semestre de Fisica      |
        | Fisica 2                                | FI107  | AREA 2     | 3        | Prof. Oliveira   | Segundo semestre de Fisica       |
        | Fisica 4                                | FI109  | AREA 2     | 5        | Prof. Oliveira   | Quarto semestre de Fisica        |
    When o usuário está na página "feed"
    Then é possível ver no carrossel Em Alta:
        | discipline                        |
        | Ingles para Computacao            |
        | Fisica 3                          |
        | Engenharia de Software e Sistemas |
        | Calculo 1                         |
        | Introducao a Computacao           |
        | Introducao a Programacao          |
        | Matematica Discreta               |
        | Fisica 4                          |
        | Calculo 2                         |
        | Calculo 3                         |

Scenario: Sem review cadastradas (Recentes)
    Given nao ha reviews
    When o usuário está na página "feed"
    Then nao e possivel ver o elemento com data-cy "RecentReviewCarousel"

Scenario: Sem review cadastradas (Em alta)
    Given nao ha reviews
    When o usuário está na página "feed"
    Then nao e possivel ver o elemento com data-cy "TopDisciplinesCarousel"
    
Scenario: Sem disciplinas cadastradas
    Given nao ha disciplinas
    When o usuário está na página "feed"
    Then é possível ver "Página em manutenção. Aguarde o cadastro de disciplinas."
    
Scenario: Aplicacao do filtro por periodo com sucesso
    Given o DisciplineService possui:
        | name                                    | code   | department | semester | professor        | description                      |
        | Ingles para Computacao                  | LE530  | EC         | 6        | Prof. Silva      | Curso de ingles                  |
        | Fisica 3                                | FI108  | AREA 2     | 4        | Prof. Oliveira   | Terceiro semestre de Fisica      |
        | Engenharia de Software e Sistemas       | IF682  | EC         | 6        | Prof. Breno      | Estudo da Engenharia de Software |
        | Calculo 1                               | MA026  | AREA 2     | 1        | Prof. Souza      | Calculo diferencial e integral   |
        | Introducao a Computacao                 | IF668  | EC         | 1        | Prof. Pereira    | Conceitos basicos de computacao  |
        | Introducao a Programacao                | IF669  | EC         | 1        | Prof. ACM        | Introducao a programacao C       |
        | Matematica Discreta                     | IF670  | EC         | 1        | Prof. Nivan      | Estudo de matematica discreta    |
        | Algebra Vetorial Linear para Computacao | MA531  | EC         | 1        | Prof. Paulo      | Algebra vetorial aplicada        |
        | Calculo 2                               | MA027  | AREA 2     | 2        | Prof. Souza      | Calculo diferencial e integral II|
        | Calculo 3                               | MA028  | AREA 2     | 3        | Prof. Souza      | Calculo diferencial integral III |
        | Calculo 4                               | MA029  | AREA 2     | 4        | Prof. Souza      | Calculo diferencial e integral IV|
        | Fisica 1                                | FI106  | AREA 2     | 2        | Prof. Oliveira   | Primeiro semestre de Fisica      |
        | Fisica 2                                | FI107  | AREA 2     | 3        | Prof. Oliveira   | Segundo semestre de Fisica       |
        | Fisica 4                                | FI109  | AREA 2     | 5        | Prof. Oliveira   | Quarto semestre de Fisica        |
    When o usuário está na página "feed"
    And semestre "1" é selecionado no filtro
    Then é possível ver as disciplinas:
        | name                                    | semester |
        | Calculo 1                               | 1        |
        | Introducao a Computacao                 | 1        |
        | Introducao a Programacao                | 1        |
        | Matematica Discreta                     | 1        |
        | Algebra Vetorial Linear para Computacao | 1        |

Scenario: Aplicacao do filtro por periodo sem sucesso
    Given o DisciplineService possui:
        | name                                    | code   | department | semester | professor        | description                      |
        | Ingles para Computacao                  | LE530  | EC         | 6        | Prof. Silva      | Curso de ingles                  |
        | Fisica 3                                | FI108  | AREA 2     | 4        | Prof. Oliveira   | Terceiro semestre de Fisica      |
        | Engenharia de Software e Sistemas       | IF682  | EC         | 6        | Prof. Breno      | Estudo da Engenharia de Software |
        | Calculo 1                               | MA026  | AREA 2     | 1        | Prof. Souza      | Calculo diferencial e integral   |
        | Introducao a Computacao                 | IF668  | EC         | 1        | Prof. Pereira    | Conceitos basicos de computacao  |
        | Introducao a Programacao                | IF669  | EC         | 1        | Prof. ACM        | Introducao a programacao C       |
        | Matematica Discreta                     | IF670  | EC         | 1        | Prof. Nivan      | Estudo de matematica discreta    |
        | Algebra Vetorial Linear para Computacao | MA531  | EC         | 1        | Prof. Paulo      | Algebra vetorial aplicada        |
        | Calculo 2                               | MA027  | AREA 2     | 2        | Prof. Souza      | Calculo diferencial e integral II|
        | Calculo 3                               | MA028  | AREA 2     | 3        | Prof. Souza      | Calculo diferencial integral III |
        | Calculo 4                               | MA029  | AREA 2     | 4        | Prof. Souza      | Calculo diferencial e integral IV|
        | Fisica 1                                | FI106  | AREA 2     | 2        | Prof. Oliveira   | Primeiro semestre de Fisica      |
        | Fisica 2                                | FI107  | AREA 2     | 3        | Prof. Oliveira   | Segundo semestre de Fisica       |
        | Fisica 4                                | FI109  | AREA 2     | 5        | Prof. Oliveira   | Quarto semestre de Fisica        |
    When o usuário está na página "feed"
    And semestre "9" é selecionado no filtro
    Then é possível ver "Nenhuma disciplina cadastrada."

Scenario: Busca pelo nome da disciplina com sucesso
    Given o DisciplineService possui:
        | name                                    | code   | department | semester | professor        | description                      |
        | Ingles para Computacao                  | LE530  | EC         | 6        | Prof. Silva      | Curso de ingles                  |
        | Fisica 3                                | FI108  | AREA 2     | 4        | Prof. Oliveira   | Terceiro semestre de Fisica      |
        | Engenharia de Software e Sistemas       | IF682  | EC         | 6        | Prof. Breno      | Estudo da Engenharia de Software |
        | Calculo 1                               | MA026  | AREA 2     | 1        | Prof. Souza      | Calculo diferencial e integral   |
        | Introducao a Computacao                 | IF668  | EC         | 1        | Prof. Pereira    | Conceitos basicos de computacao  |
        | Introducao a Programacao                | IF669  | EC         | 1        | Prof. ACM        | Introducao a programacao C       |
        | Matematica Discreta                     | IF670  | EC         | 1        | Prof. Nivan      | Estudo de matematica discreta    |
        | Algebra Vetorial Linear para Computacao | MA531  | EC         | 1        | Prof. Paulo      | Algebra vetorial aplicada        |
        | Calculo 2                               | MA027  | AREA 2     | 2        | Prof. Souza      | Calculo diferencial e integral II|
        | Calculo 3                               | MA028  | AREA 2     | 3        | Prof. Souza      | Calculo diferencial integral III |
        | Calculo 4                               | MA029  | AREA 2     | 4        | Prof. Souza      | Calculo diferencial e integral IV|
        | Fisica 1                                | FI106  | AREA 2     | 2        | Prof. Oliveira   | Primeiro semestre de Fisica      |
        | Fisica 2                                | FI107  | AREA 2     | 3        | Prof. Oliveira   | Segundo semestre de Fisica       |
        | Fisica 4                                | FI109  | AREA 2     | 5        | Prof. Oliveira   | Quarto semestre de Fisica        |
    When busca por cadeira com "is"
    Then é possível ver as disciplinas:
        | name                                    | semester |
        | Fisica 3                                | 4        |
        | Engenharia de Software e Sistemas       | 6        |
        | Matematica Discreta                     | 1        |
        | Fisica 1                                | 2        |
        | Fisica 2                                | 3        |
        | Fisica 4                                | 5        |  
    
Scenario: Busca pelo nome da disciplina sem sucesso
    Given o DisciplineService possui:
        | name                                    | code   | department | semester | professor        | description                      |
        | Ingles para Computacao                  | LE530  | EC         | 6        | Prof. Silva      | Curso de ingles                  |
        | Fisica 3                                | FI108  | AREA 2     | 4        | Prof. Oliveira   | Terceiro semestre de Fisica      |
        | Engenharia de Software e Sistemas       | IF682  | EC         | 6        | Prof. Breno      | Estudo da Engenharia de Software |
        | Calculo 1                               | MA026  | AREA 2     | 1        | Prof. Souza      | Calculo diferencial e integral   |
        | Introducao a Computacao                 | IF668  | EC         | 1        | Prof. Pereira    | Conceitos basicos de computacao  |
        | Introducao a Programacao                | IF669  | EC         | 1        | Prof. ACM        | Introducao a programacao C       |
        | Matematica Discreta                     | IF670  | EC         | 1        | Prof. Nivan      | Estudo de matematica discreta    |
        | Algebra Vetorial Linear para Computacao | MA531  | EC         | 1        | Prof. Paulo      | Algebra vetorial aplicada        |
        | Calculo 2                               | MA027  | AREA 2     | 2        | Prof. Souza      | Calculo diferencial e integral II|
        | Calculo 3                               | MA028  | AREA 2     | 3        | Prof. Souza      | Calculo diferencial integral III |
        | Calculo 4                               | MA029  | AREA 2     | 4        | Prof. Souza      | Calculo diferencial e integral IV|
        | Fisica 1                                | FI106  | AREA 2     | 2        | Prof. Oliveira   | Primeiro semestre de Fisica      |
        | Fisica 2                                | FI107  | AREA 2     | 3        | Prof. Oliveira   | Segundo semestre de Fisica       |
        | Fisica 4                                | FI109  | AREA 2     | 5        | Prof. Oliveira   | Quarto semestre de Fisica        |
    When busca por cadeira com "isa"
    Then é possível ver "Nenhuma disciplina cadastrada."