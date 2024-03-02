Feature: Gerenciamento de Cadeiras
  As a usuario do sistema
  I want to gerenciar as cadeiras no sistema
  So that eu possa manter as informações das cadeiras atualizadas

Scenario: Adição bem-sucedida de uma nova cadeira
  Given o usuario submete o formulario de cadeiras com "Matematica" "IF123" "CIn" "1" "Anjolina" "Muito bom"
  Then uma mensagem de confirmação é exibida: Discipline added successfully.
  And a cadeira Matematica deve estar presente na lista de cadeiras

Scenario: Falha na adição de uma nova cadeira devido a campo não preenchido
  Given o usuario submete o formulario de cadeiras com "Matematica Discreta" "IF123" "CIn" "1" "Anjolina" " "
  Then uma mensagem de erro é exibida: Fill in all the fields.
  And a cadeira "Matematica Discreta" não deve estar presente na lista de cadeiras

Scenario: Falha na adição de uma nova cadeira devido a Code e semestre repetidos
  Given a cadeira com Code "IF12" e semestre "10" já existe no sistema
  And usuario submete o formulario de cadeiras com "Matematica" "IF12" "CIn" "10" "Anjolina" "Muito bom" 
  Then uma mensagem de erro é exibida: Discipline already added.
  And deve existir apenas uma cadeira com Code "IF12" e semestre "10" no sistema

Scenario: Edição bem-sucedida de uma cadeira pelo Code
  Given a cadeira com Code "IF234" e semestre "8" já existe no sistema
  And o usuario submete o formulario de edicao de cadeiras para a cadeira com code "IF234" com "Matematica Indiscreta", "IF234", "naO", "12", "Paguso", "Pouco Ruim"
  Then uma mensagem de confirmação é exibida: Discipline updated successfully.
  And a cadeira com Code "IF234" deve refletir as novas informações na lista de cadeiras "Matematica Indiscreta", "naO", "12", "Paguso", "Pouco Ruim"

Scenario: Falha na edição de uma cadeira devido a campo não preenchido
  Given a cadeira com Code "IF234" e semestre "8" já existe no sistema
  And o usuario submete o formulario de edicao de cadeiras para a cadeira com code "IF234" com "Matematica Indiscreta", "IF234", " ", "12", "Paguso", "Pouco Ruim"
  Then uma mensagem de erro é exibida: Fill in all the fields.
  And as alterações na cadeira com Code "IF234" e semestre "8" nao devem ser salvas

Scenario: Falha na edição de cadeira devido a Code inexistente
  Given o usuario busca pela cadeira utilizando o Code "IF999" 
  Then uma mensagem de erro é exibida: Discipline code does not exist.

Scenario: Deletar todas as cadeiras com o mesmo codigo
  Given existem 3 cadeiras com o Code "IF123" no sistema
  When o usuario solicita a deleção das cadeiras utilizando o Code "IF123"
  Then todas as cadeiras com o Code "IF123" são removidas do sistema
  And mensagem de confirmação é exibida: 3 discipline(s) successfully deleted.
