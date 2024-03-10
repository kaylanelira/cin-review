Feature: Adicionar, remover e editar reviews
  As a usuário
  I want Adicionar, remover, editar reviews.
  so that meus reviews sejam exibidos no site.

Scenario: Criar um review
  Given o usuário com username "tester" e senha "123" está logado
  Given o usuário "tester" não possui um review cadastrado para a cadeira "ESS"
  Given o usuário "tester" está na página "course/ESS"
  When o usuário clica em "Add"
  When o usuário preenche o campo "rating" com "10"
  When o usuário preenche o campo "comment" com "Gostei muito!"
  When o usuário clica em "Enviar"
  Then o usuário "tester" ainda está na página "course/ESS"
  And é possível ver o review com nota "10" e comentário "Gostei muito!"