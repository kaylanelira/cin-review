Feature: Gerenciamento de Cadeiras
  As a usuário do sistema
  I want to gerenciar as cadeiras no sistema
  So that eu possa manter as informações das cadeiras atualizadas

Scenario: Adição bem-sucedida de uma nova cadeira
  Given que o usuário está logado no sistema de gerenciamento acadêmico
  When o usuário preenche o formulário de adição de cadeira com os seguintes detalhes:
    | Campo        | Valor             |
    | Name         | Matemática Discreta |
    | Professor    | Anjolina          |
    | Department | CIn               |
    | Semester     | 3                 |
    | Code       | IF123             |
    | Description    | Muito bom         |
  And o usuário submete o formulário
  Then uma mensagem de confirmação é exibida: "Discipline added successfully."
  And a cadeira "Matemática Discreta" deve estar presente na lista de cadeiras

Scenario: Falha na adição de uma nova cadeira devido a campo não preenchido
  Given que o usuário está logado no sistema de gerenciamento acadêmico
  When o usuário preenche o formulário de adição de cadeira com os seguintes detalhes:
    | Campo        | Valor             |
    | Name         | Matemática Discreta |
    | Professor    | Anjolina          |
    | Department | CIn               |
    | Semester     | 3                 |
    | Code       |                   | # Campo Code não preenchido
    | Description    | Muito bom         |
  And o usuário submete o formulário
  Then uma mensagem de erro é exibida: "Fill in all the fields."
  And a cadeira "Matemática Discreta" não deve estar presente na lista de cadeiras

Scenario: Falha na adição de uma nova cadeira devido a Code e semestre repetidos
  Given que o usuário está logado no sistema de gerenciamento acadêmico
  And o usuário navega até a página de adição de cadeira
  And a cadeira com Code "IF123" e semestre "3" já existe no sistema
  When o usuário preenche o formulário de adição de cadeira com os seguintes detalhes:
    | Campo        | Valor              |
    | Name         | Matemática Discreta  |
    | Professor    | Anjolina           |
    | Department | CIn                |
    | Semester     | 3                  |
    | Code       | IF123              |
    | Description    | Muito bom          |
  And o usuário submete o formulário
  Then uma mensagem de erro é exibida: "Discipline already added."
  And a tentativa de adicionar uma nova cadeira com Code "IF123" e semestre "3" deve ser rejeitada

Scenario: Edição bem-sucedida de uma cadeira pelo Code
  Given que o usuário está logado no sistema de gerenciamento acadêmico
  When o usuário busca pela cadeira utilizando o Code "IF123"
  And o usuário é direcionado para o formulário de edição da cadeira com Code "IF123"
  And o usuário atualiza o formulário de cadeira com os seguintes detalhes:
    | Campo        | Valor               |
    | Name         | Matemática Aplicada |
    | Professor    | Anjolina Jolie      |
    | Department | CIn                 |
    | Semester     | 4                   |
    | Description    | Conteúdo atualizado |
  And o usuário submete o formulário de atualização
  Then uma mensagem de confirmação é exibida: "Discipline updated successfully."
  And a cadeira com Code "IF123" deve refletir as novas informações na lista de cadeiras

Scenario: Falha na edição de uma cadeira devido a campo não preenchido
  Given que o usuário está logado no sistema de gerenciamento acadêmico
  When o usuário busca pela cadeira utilizando o Code "IF123"
  And o usuário é direcionado para o formulário de edição da cadeira com Code "IF123"
  And o usuário atualiza o formulário de cadeira deixando o campo "Description" vazio:
    | Campo        | Valor               |
    | Name         | Matemática Aplicada |
    | Professor    | Anjolina Jolie      |
    | Department | CIn                 |
    | Semester     | 4                   |
    | Description    |                     | # Campo Description deixado vazio
  And o usuário submete o formulário de atualização
  Then uma mensagem de erro é exibida: "Fill in all the fields."
  And as alterações na cadeira com Code "IF123" não devem ser salvas

Scenario: Falha na edição de cadeira devido a Code inexistente
  Given que o usuário está logado no sistema de gerenciamento acadêmico
  When o usuário busca pela cadeira utilizando o Code "IF999"
  Then uma mensagem de erro é exibida: "Discipline code does not exist."
  And a edição da cadeira com Code "IF999" não deve ser permitida

Scenario: Deletar todas as cadeiras com o mesmo Code
  Given que o usuário está logado no sistema de gerenciamento acadêmico
  And existem 3 cadeiras com o Code "IF123" no sistema
  When o usuário solicita a deleção das cadeiras utilizando o Code "IF123"
  Then todas as cadeiras com o Code "IF123" são removidas do sistema
  And uma mensagem é exibida: "3 disciplines deleted successfully."
