Feature: Administrar uma conta API

Scenario: Cadastrar uma conta com sucesso
	Given o nome de usuário "alms" ou email "alms@cin.ufpe.br" não existe no UserService
	When uma requisição POST é enviada para "/user/create_user" com os dados
		| name   | surname  | username | email               | password | repeated_password | phone_number | field_of_interest      |
		| Denise | Almeida  | alms     | alms@cin.ufpe.br    | senha123 | senha123          | 1239478495   | Engenharia de Software |
	Then o status da resposta deve ser "201"
	And o JSON da resposta deve conter o nome de usuário "alms" 
	And o usuário com o nome de usuário "alms" está cadastrado no UserService

Scenario: Cadastrar uma conta com e-mail já existente
	Given o UserService possui os usuários
		| name   | surname  | username | email               | password | repeated_password | phone_number | field_of_interest      |
		| Denise | Almeida  | alms     | alms@cin.ufpe.br    | senha123 | senha123          | 1239478495   | Engenharia de Software |
	When uma requisição POST é enviada para "/user/create_user" com os dados
		| name   | username | email               | password | repeated_password |
		| Bruno  | baf      | alms@cin.ufpe.br    | senha123 | senha123          |
	Then o status da resposta deve ser "409"
	And a resposta deve conter uma mensagem de erro "Email indisponivel"

Scenario: Cadastrar uma conta com senhas diferentes
	Given o nome de usuário "helena" ou email "hele@cin.ufpe.br" não existe no UserService
	When uma requisição POST é enviada para "/user/create_user" com os dados
		| name   | username   | email               | password | repeated_password |
		| Helena | helena     | hele@cin.ufpe.br    | senha123 | senha13           |
	Then o status da resposta deve ser "400"
	And a resposta deve conter uma mensagem de erro "As senhas não são iguais."

Scenario: Cadastrar uma conta sem e-mail
	Given o nome de usuário "bafm" ou email "bafm@cin.ufpe.br" não existe no UserService
	When uma requisição POST é enviada para "/user/create_user" com os dados
		| name   | username | email               | password | repeated_password |
		| Breno  | bafm     |                     | senha123 | senha123          |
	Then o status da resposta deve ser "400"
	And a resposta deve conter uma mensagem de erro "Email é um campo obrigatório."

Scenario: Deletar uma conta com senha correta
	Given o UserService possui os usuários
		| name   | username   | email               | password | repeated_password  |
		| Helena | helena     | hele@cin.ufpe.br    | senha139 | senha139           |
	When uma requisição DELETE for enviada para "/user/delete_user/helena" com a senha "senha139"
	Then o status da resposta deve ser "200"
	And o usuario com o nome de usuário "helena" não está cadastrado no UserService

Scenario: Deletar uma conta com senha incorreta
	Given o UserService possui os usuários
		| name   | surname  | username | email               | password      | repeated_password |
		| Denise | Almeida  | alms     | alms@cin.ufpe.br    | senhadaDenise | senhadaDenise     |
	When uma requisição DELETE for enviada para "/user/delete_user/alms" com a senha "senha12"
	Then o status da resposta deve ser "400"
	And a resposta deve conter uma mensagem de erro "Senha incorreta. A conta não foi deletada."

Scenario: Editar o nome de usuário de uma conta com sucesso
	Given o UserService possui os usuários
		| name     | surname  | username | email               | password | repeated_password |
		| Griselda | Blanco   | bafm     | bafm@cin.ufpe.br    | senha123 | senha123          |
	And o nome de usuário "griselda" não existe no UserService
	When uma requisição PUT é enviada para "/user/update_user/bafm" com os dados
		| name     | surname  | username | email               | password | repeated_password |
		| Griselda | Blanco   | griselda | bafm@cin.ufpe.br    | senha123 | senha123          |
	Then o status da resposta deve ser "200"
	And o JSON da resposta deve conter o nome de usuário "griselda" 

Scenario: Editar nome de usuário por um já existente
	Given o UserService possui os usuários
		| name     | surname  | username | email               | password     | repeated_password |
		| Breno    | Miranda  | bafm1    | bafm1@cin.ufpe.br   | senha1234566 | senha1234566      |
		| Griselda | Blanco   | griselda | griseb@cin.ufpe.br  | senha123sddd | senha123sddd      |
	When uma requisição PUT é enviada para "/user/update_user/bafm1" com os dados
		| name   | surname  | username | email               | password     | repeated_password |
		| Breno  | Miranda  | griselda | bafm1@cin.ufpe.br   | senha1234566 | senha1234566      |
	Then o status da resposta deve ser "409"
	And a resposta deve conter uma mensagem de erro "Nome de usuário indisponivel"

Scenario: Editar conta sem preencher usuário
	Given o UserService possui os usuários
		| name   | surname  | username | email               | password | repeated_password |
		| Breno  | Miranda  | bafm1    | bafm1@cin.ufpe.br   | senha123 | senha123          |
	When uma requisição PUT é enviada para "/user/update_user/bafm1" com os dados
		| name   | surname  | username | email               | password | repeated_password |
		| Breno  | Miranda  |          | bafm1@cin.ufpe.br   | senha123 | senha123          |
	Then o status da resposta deve ser "400"
	And a resposta deve conter uma mensagem de erro "Nome de usuário é um campo obrigatório."