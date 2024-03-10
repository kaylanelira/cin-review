Feature: Pagina Inicial
As a usuario do sistema
I want to acessar as cadeiras disponiveis no sistema
So that para que eu possa visualizar e postar reviews

Scenario: Carregamento com sucesso das reviews mais recentes
    Given o "ReviewService" possui as "reviews" 
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
    When o usuário "tester" está na página "feed"
    Then é possível ver o review com nota "10" e comentário "Gostei muito!"
   
