from pytest_bdd import parsers, given, when, then, scenario
from service.user_service import UserService, db_instance
from tests.utils import utils

# se verdadeira, printa as respostas do servidor
debug = True

# Scenario: Cadastrar uma conta com sucesso =================================================================================
@scenario(scenario_name="Cadastrar uma conta com sucesso", feature_name="../features/account.feature")
def test_create_account_sucessfully():
    pass
    
@given(parsers.cfparse('o nome de usuário "{username}" ou email "{email}" não existe no UserService'))
def remove_user_from_database(username: str, email:str):
    # tanto username como email são únicos, então precisamos ter certeza que nenhum dos dois existem no bd
    user_by_username = UserService.get_user_by_username(username)
    user_by_email = UserService.get_user_by_email(email)
    
    if user_by_username:
        user_id = user_by_username['id']
        db_instance.delete('users', user_id)
        
    elif user_by_email:  
        user_id = user_by_email['id']
        db_instance.delete('users', user_id)

@given(
    parsers.cfparse('o nome de usuário "{username}" não existe no UserService')
)
def remove_user_by_username(username:str):
    user_by_username = UserService.get_user_by_username(username)
    
    user_id = user_by_username['id']
    db_instance.delete('users', user_id)

@when(
    parsers.cfparse('uma requisição POST é enviada para "{req_url}" com os dados\n{data}'),
    target_fixture="context"
)
def create_account(client, context, req_url: str, data: dict):
    # ajustando os dados do .feature para um dict
    if isinstance(data, str):
        adjusted_data = utils.convert_gherkin_string_to_dict(data)
    elif isinstance(data, dict):
        adjusted_data = data
        
    response = client.post(req_url, json=adjusted_data)
    if debug:
        print(f"Resposta do servidor (status {response.status_code}): {response.text}")
    context["response"] = response
    return context

@then(
    parsers.cfparse('o status da resposta deve ser "{status_code}"'), 
    target_fixture="context"
)
def check_response_status_code(context, status_code: str):
    assert context["response"].status_code == int(status_code), f"O status da resposta deve ser {status_code}"
    return context


@then(
    parsers.cfparse('o JSON da resposta deve conter o nome de usuário "{username}"'), 
    target_fixture="context"
)
def check_response_json_id(context, username: str):
    assert context["response"].json()["username"] == username
    return context

@then(
    parsers.cfparse('o usuário com o nome de usuário "{username}" está cadastrado no UserService'),
    target_fixture="context"
)
def check_username_on_UserService(username: str):
    user = UserService.get_user_by_username(username)
    assert user
    return {"user": user}

# Scenario: Cadastrar uma conta com email já existente =======================================================================
@scenario(scenario_name="Cadastrar uma conta com e-mail já existente", feature_name="../features/account.feature")
def test_create_account_existing_email():
    pass

@then(parsers.cfparse('a resposta deve conter uma mensagem de erro "{error_message}"'))
def response_error_message(context, error_message: str):
    response_data = context["response"].json()
    
    error_detail = response_data.get("detail", "")
    assert error_message in error_detail, f"A mensagem de erro esperada '{error_message}' não foi encontrada na resposta"

# Cadastrar uma conta sem e-mail =============================================================================================
@scenario(scenario_name="Cadastrar uma conta sem e-mail", feature_name="../features/account.feature")
def test_create_account_without_email():
    pass

# Scenario: Cadastrar uma conta com senhas diferentes ========================================================================
@scenario(scenario_name="Cadastrar uma conta com senhas diferentes", feature_name="../features/account.feature")
def test_create_account_different_passwords():
    pass

# Scenario: Deletar uma conta com senha correta ==============================================================================
@scenario(scenario_name="Deletar uma conta com senha correta", feature_name="../features/account.feature")
def test_delete_user_successfuly():
    pass
    
@when(
    parsers.cfparse('uma requisição DELETE for enviada para "{req_url}" com a senha "{password}"'),
    target_fixture="context"
)
def req_delete_with_correct_password(client, context, req_url: str, password: str):
    response = client.delete(req_url, params={"password": password})

    if debug:
        print(f"Resposta do servidor (status {response.status_code}): {response.text}")
    context["response"] = response

    return context
    
@then(parsers.cfparse('o usuario com o nome de usuário "{username}" não está cadastrado no UserService'),
      target_fixture="context"
)
def check_username_not_on_UserService(username: str):
    user = UserService.get_user_by_username(username)
    assert not user
    return {"user": user}

# Scenario: Deletar uma conta com senha incorreta ============================================================================
@scenario(scenario_name="Deletar uma conta com senha incorreta", feature_name="../features/account.feature")
def test_delete_user_wrong_password():
    pass

# Scenario: Editar o nome de usuário de uma conta com sucesso ================================================================
@scenario(scenario_name="Editar o nome de usuário de uma conta com sucesso", feature_name="../features/account.feature")
def test_edit_username_successfully():
    pass

@when(
    parsers.parse('uma requisição PUT é enviada para "{req_url}" com os dados\n{data}'),
    target_fixture="context"
)
def req_put_new_username(client, context, req_url: str, data: dict):
    # ajustando os dados do .feature para um dict
    if isinstance(data, str):
        adjusted_data = utils.convert_gherkin_string_to_dict(data)
    elif isinstance(data, dict):
        adjusted_data = data
    
    response = client.put(req_url, json=adjusted_data)

    if debug:
        print(f"Resposta do servidor (status {response.status_code}): {response.text}")
    context["response"] = response

    return context

# Scenario: Editar nome de usuário por um já existente =======================================================================
@scenario(scenario_name="Editar nome de usuário por um já existente", feature_name="../features/account.feature")
def test_edit_username_existent():
    pass

@given(
    parsers.cfparse('o UserService possui os usuários\n{data}'),
    target_fixture="context"
)
def add_user_to_UserService(client, context, data):
    # ajustando os dados do Gherkin para um dict
    if isinstance(data, str):
        user_data_list = utils.convert_gherkin_string_to_list(data)
    elif isinstance(data, dict):
        user_data_list = data
    
    # antes de adicionar, temos que apagar se eles existirem
    for user_data in user_data_list:
        remove_user_from_database(user_data["username"], user_data["email"])

    # adicionando cada usuário
    for user_data in user_data_list:
        req_url = f'/user/create_user'
        response = client.post(req_url, json=user_data)
        if debug:
            print(f"Resposta do servidor (status {response.status_code}): {response.text}")
        
    context["response"] = response
    return context

# Scenario: Editar conta sem preencher usuário ===============================================================================
@scenario(scenario_name="Editar conta sem preencher usuário", feature_name="../features/account.feature")
def test_edit_without_username():
    pass