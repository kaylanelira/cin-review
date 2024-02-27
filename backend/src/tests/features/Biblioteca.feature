Feature: administrar uma biblioteca de usuario

	Scenario: Criacao bem-sucedida de pasta
		Given um usuario com ID "134340" com biblioteca vazia
		When uma requisicao POST eh enviada para "/library/create_folder" com os dados
			| user_id | name        | classes_id     |
			|  134340 | 1o periodo  | 1000,20        |
		Then o status da resposta deve ser "200"
		And o JSON da resposta deve conter a mensagem "1o periodo"
		And a pasta de nome "1o periodo" e user_id "134340" eh adicionada ao banco de dados

	Scenario: Criacao de pasta de nome duplicado
		Given um usuario com ID "134340" que possui uma pasta de nome "1o periodo"
		When uma requisicao POST eh enviada para "/library/create_folder" com os dados
			| user_id | name        | classes_id     |
			|  134340 | 1o periodo  |                |
		Then o status da resposta deve ser "409"
		And o JSON da resposta deve conter a mensagem "Nome de pasta ja existe"
		And o banco de dados continua com apenas um objeto de user_id="134340" e nome="1o periodo"

	Scenario: Insercao bem-sucedida de cadeira em pasta
		Given um usuario com ID "134340" cuja pasta "2o periodo" nao possui cadeiras
		When uma requisicao PUT eh enviada para "/library/2o_periodo/update_folder" com os dados
			| user_id | name    | classes_id   |
			|  134340 | 2o periodo  | 1000     |
		Then o status da resposta deve ser "200"
		And o JSON da resposta deve conter a mensagem "2o periodo"
		And o objeto de nome "2o periodo" e user_id "134340" agora possui uma cadeira de id "1000" 

	Scenario: Insercao duplicada de cadeira em pasta
		Given uma pasta no banco de dados
			| user_id | name        | classes_id |
			|  134340 | 2o periodo  | 1000       |
		When uma requisicao PUT eh enviada para "/library/2o_periodo/update_folder" com os dados
			| user_id | name        | classes_id      |
			|  134340 | 2o periodo  | 1000, 102, 1000 |
		Then o status da resposta deve ser "409"
		And o JSON da resposta deve conter a mensagem "Insercao de cadeira repetida na pasta"
		And o objeto de nome "2o periodo" e user_id "134340" continua possuindo apenas a cadeira de id "1000" no banco de dados 

	Scenario: Remocao bem-sucedida de uma cadeira da pasta
		Given um usuario com ID "134340" 
		And a pasta "2o periodo" da biblioteca de "134340" possui as cadeiras de ID "1000" e "102"
		When uma requisicao PUT eh enviada para "/library/2o_periodo/update_folder" com os dados
			| user_id | name        | classes_id |
			|  134340 | 2o periodo  | 1000       |
		Then o status da resposta deve ser "200"
		And o JSON da resposta deve conter a mensagem "2o periodo"

	Scenario: Mostrar os dados da biblioteca de um usuario
		Given um usuario com ID "134340" que possui pastas com nomes "3o periodo"
		When uma requisicao GET eh enviada para "/library/get_user_library" com os dados
			| user_id |
			| 134340  | 
		Then o status da resposta deve ser "200"
		And o JSON da resposta deve conter as informacões das pastas de nome "3o periodo"

	Scenario: Remocao bem-sucedida de pasta da biblioteca
		Given um usuario com ID "134340" cuja biblioteca possui a pasta de nome "2o periodo"
		When uma requisicao DELETE eh enviada para "/library/2o_periodo/delete_folder" com os dados
			| user_id | name        |
			|  134340 | 2o periodo  |
		Then o status da resposta deve ser "200"
		And o JSON da resposta deve conter a mensagem "2o periodo"
		And a pasta de nome "2o periodo" com user_id="134340" nao existe mais no banco de dados
