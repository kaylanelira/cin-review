Feature: Criar conta
  As a usuário
  I want criar, deletar e editar conta
  so that eu possa administrar uma conta

Scenario: Criar uma conta com sucesso
  Given o usuário está na página "create-account"
  When o usuário preenche o campo "create-account-name" com "Napo"
  And o usuário preenche o campo "create-account-surname" com "Bonaparte"
  And o usuário preenche o campo "create-account-username" com "napoleao"
  And o usuário preenche o campo "create-account-email" com "napobona@ufpe.br"
  And o usuário preenche o campo "create-account-password" com "frança"
  And o usuário preenche o campo "create-account-repeated-password" com "frança"
  And o usuário clica em "Cadastrar"
  Then o usuário está na página "feed"

Scenario: Criar uma conta sem email
  Given o usuário está na página "create-account"
  When o usuário preenche o campo "create-account-name" com "Napo"
  And o usuário preenche o campo "create-account-surname" com "Bonaparte"
  And o usuário preenche o campo "create-account-username" com "napoleao"
  And o usuário preenche o campo "create-account-password" com "frança"
  And o usuário preenche o campo "create-account-repeated-password" com "frança"
  And o usuário clica em "Cadastrar"
  Then o usuário vê a mensagem "Erro ao cadastrar usuário: Email é um campo obrigatório."

Feature: Editar conta

Scenario: Editar o nome de uma conta
  Given o usuário com username "napoleao" e senha "frança" está logado
  And o usuário clica em "Perfil"
  When o usuário clica em "Editar"
  And o usuário preenche o campo "edit-account-name" com "leão"
  And o usuário clica em "Salvar Alterações"
  Then o usuário está na página "profile"

Feature: Deletar conta

Scenario: Deletar uma conta
  Given o usuário com username "napoleao" e senha "frança" está logado
  And o usuário clica em "Perfil"
  When o usuário clica em "Deletar"
  And o usuário preenche o campo "delete-account-password" com "frança"
  Then o usuário está na página "create-account"