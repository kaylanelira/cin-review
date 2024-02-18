Feature: gerenciamento de reviews

Scenario: Cadastrar um review com sucesso
    Given o usuário "TJAS" não tem um review cadastrado para a disciplina "Física"
    When uma requisição POST é enviada "/review/add" com username "TJAS", disciplina "Física", nota "10" e comentário "Gostei muito"
    Then o código da resposta é "200"
    And o JSON da resposta deve conter username "TJAS", disciplina "Física", nota "10" e comentário "Gostei muito"

Scenario: Cadastrar um review repetido
    Given o usuário "TJAS" já tem um review cadastrado com disciplina "Física", nota "10" e comentário "Gostei muito"
    When uma requisição POST é enviada "/review/add" com username "TJAS", disciplina "Física", nota "10" e comentário "Gostei muito"
    Then o código da resposta é "409"
    And o JSON da resposta deve conter a mensagem "User has already reviewed this discipline"

Scenario: Editar um review com sucesso
    Given o usuário "TJAS" já tem um review cadastrado com disciplina "Cálculo", nota "5" e comentário "mediana!"
    When uma requisição PUT é enviada "/review/edit" com username "TJAS", disciplina "Cálculo", nota "8" e comentário "muito bom!"
    Then o código da resposta é "200"
    And o JSON da resposta deve conter username "TJAS", disciplina "Cálculo", nota "8" e comentário "muito bom!"