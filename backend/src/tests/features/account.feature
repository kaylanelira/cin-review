Feature: Administrar uma conta API

Scenario: Cadastrar uma conta com sucesso
	Given o nome de usuário "alms" ou email "alms@cin.ufpe.br" não existe no UserService
	When uma requisição POST é enviada para "/user/create_user" com os dados
		| id | name   | surname  | username | email               | password |
		|  1 | Denise | Almeida  | alms     | alms@cin.ufpe.br    | senha123 |
	Then o status da resposta deve ser "201"
	And o JSON da resposta deve conter o nome de usuário "alms" 
	And o usuário com o nome de usuário "alms" está cadastrado no UserService

Scenario: Cadastrar uma conta com e-mail já existente
	Given o UserService possui os usuários
		| id | name     | surname  | username | email               | password |
		| 1  | Griselda | Blanco   | bafm     | bafm@cin.ufpe.br    | senha123 |
	When uma requisição POST é enviada para "/user/create_user" com os dados
		| id | name   | username | email               | password |
		| 1  | Bruno  | bafm1    | bafm@cin.ufpe.br    | senha123 |
	Then o status da resposta deve ser "409"
	And a resposta deve conter uma mensagem de erro "Email indisponivel"

Scenario: Cadastrar uma conta com senhas diferentes
	Given o nome de usuário "alms" ou email "alms@cin.ufpe.br" não existe no UserService
	When uma requisição POST é enviada para "/user/create_user" com os dados
		| id | name   | surname  | username | email               | password | repeated_password |
		|  1 | Denise | Almeida  | alms     | alms@cin.ufpe.br    | senha123 | senha123          |
	Then o status da resposta deve ser "400"
	And a resposta deve conter uma mensagem de erro "As senhas não são iguais."

Scenario: Cadastrar uma conta sem e-mail
	Given o nome de usuário "bafm" ou email "bafm@cin.ufpe.br" não existe no UserService
	When uma requisição POST é enviada para "/user/create_user" com os dados
		| id | name   | surname  | username | email               | password | same_password |
		| 1  | Breno  | Miranda  | bafm     |                     | senha123 | senha123      |
	Then o status da resposta deve ser "400"
	And a resposta deve conter uma mensagem de erro "Email é um campo obrigatório."

Scenario: Deletar uma conta com senha correta
	Given o UserService possui os usuários
		| id | name   | surname  | username | email               | password | same_password |
		| 1  | Breno  | Miranda  | bafm     | bafm@cin.ufpe.br    | senha123 | senha123      |
	When uma requisição DELETE for enviada para "/user/delete_user/1" com a senha "senha123"
	Then o status da resposta deve ser "200"
	And o usuario com o nome de usuário "bafm" não está cadastrado no UserService

Scenario: Deletar uma conta com senha incorreta
	Given o UserService possui os usuários
		| id | name   | surname  | username | email               | password | same_password |
		| 1  | Breno  | Miranda  | bafm1    | bafm1@cin.ufpe.br   | senha123 | senha123      |
	When uma requisição DELETE for enviada para "/user/delete_user/1" com a senha "senha12"
	Then o status da resposta deve ser "400"
	And a resposta deve conter uma mensagem de erro "Senha incorreta. A conta não foi deletada."

Scenario: Editar o nome de usuário de uma conta com sucesso
	Given o UserService possui os usuários
		| id | name   | surname  | username | email               | password | same_password |
		| 1  | Breno  | Miranda  | bafm2    | bafm1@cin.ufpe.br   | senha123 | senha123      |
	When uma requisição PUT é enviada para "/user/update_user/1" com os dados
		| id | name   | surname  | username | email               | password | same_password |
		| 1  | Breno  | Miranda  | bafm1    | bafm1@cin.ufpe.br   | senha123 | senha123      |
	Then o status da resposta deve ser "200"
	And o JSON da resposta deve conter o nome de usuário "bafm1" 

Scenario: Editar nome de usuário por um já existente
	Given o UserService possui os usuários
		| id | name   | surname  | username | email               | password | same_password |
		| 1  | Breno  | Miranda  | bafm1    | bafm1@cin.ufpe.br   | senha123 | senha123      |
		| 2  | Breno  | Miranda  | bafm     | bafm@cin.ufpe.br    | senha123 | senha123      |
	When uma requisição PUT é enviada para "/user/update_user/1" com os dados
		| id | name   | surname  | username | email               | password | same_password |
		| 1  | Breno  | Miranda  | bafm     | bafm1@cin.ufpe.br   | senha123 | senha123      |
	Then o status da resposta deve ser "409"
	And a resposta deve conter uma mensagem de erro "Nome de usuário indisponivel"

Scenario: Editar conta sem preencher usuário
	Given o UserService possui os usuários
		| id | name   | surname  | username | email               | password | same_password |
		| 1  | Breno  | Miranda  | bafm1    | bafm1@cin.ufpe.br   | senha123 | senha123      |
	When uma requisição PUT é enviada para "/user/update_user/1" com os dados
		| id | name   | surname  | username | email               | password | same_password |
		| 1  | Breno  | Miranda  |          | bafm1@cin.ufpe.br   | senha123 | senha123      |
	Then o status da resposta deve ser "400"
	And a resposta deve conter uma mensagem de erro "Nome de usuário é um campo obrigatório."