Feature: Login
  As a usuário
  I want logar na minha conta.
  so that eu possa utilizar o sistema.

Scenario: logar com um usuario cadastrado
  Given o usuário está na página "login"
  When o usuário preenche o campo "username" com "test"
  And o usuário preenche o campo "password" com "test"
  And o usuário clica em "Entrar"
  Then o usuário ainda está na página "feed"

Scenario: logar com um usuario não cadastrado
  Given o usuário "test" não está cadastrado
  Given o usuário está na página "login"
  When o usuário preenche o campo "username" com "test"
  And o usuário preenche o campo "password" com "test"
  And o usuário clica em "Entrar"
  Then o usuário ainda está na página "login"