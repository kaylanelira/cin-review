Feature: gerenciamento de reviews

Scenario: Cadastrar um review com sucesso
    Given o usuário "TJAS" não tem um review cadastrado para a disciplina "Física"
    When uma requisição POST é enviada "/review/add" com username "TJAS", disciplina "Física", nota "10" e comentário "Gostei muito"
    Then o código da resposta é "200"
    And o JSON da resposta deve conter username "TJAS", disciplina "Física", nota "10" e comentário "Gostei muito"