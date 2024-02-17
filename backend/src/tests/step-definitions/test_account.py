from src.schemas.response import HTTPResponses, HttpResponseModel
from pytest_bdd import parsers, given, when, then, scenario
from src.service.user_service import UserService, db_instance
from src.tests.utils.utils import convert_gherkin_string_to_dict

""" Scenario: Cadastrar uma conta com sucesso """
@scenario(scenario_name="Cadastrar uma conta com sucesso", feature_name="../features/account.feature")
def test_create_account_sucessfully():
    pass
    
@given(parsers.cfparse('o nome de usuário "{username}" não existe no UserService'))
def remove_user_from_database(username: str):
    user = UserService.get_user_by_username(username)
    if user:
        user_id = user['id']
        db_instance.delete('users', user_id)

@when(
    parsers.cfparse('uma requisição POST é enviada para "{req_url}" com os dados\n{data}'),
    target_fixture="context"
)
def create_account(client, context, req_url: str, data: dict):
    # ajustando os dados do gherkin para um dict
    if isinstance(data, str):
        adjusted_data = convert_gherkin_string_to_dict(data)
    elif isinstance(data, dict):
        adjusted_data = data
        
    response = client.post(req_url, json=adjusted_data)
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

""" Scenario: Cadastrar uma conta com email já existente """
@scenario(scenario_name="Cadastrar uma conta com e-mail já existente", feature_name="../features/account.feature")
def test_create_account_existing_email():
    pass
    
@given(parsers.cfparse('o nome de usuário "{username}" existe no UserService'))
def check_username_on_UserService(username: str):
    user = UserService.get_user_by_username(username)
    assert user

@then(parsers.cfparse('a resposta deve conter uma mensagem de erro "{error_message}"'))
def response_error_message(context, error_message: str):
    response_data = context["response"].json()
    error_detail = response_data.get("detail", "")
    assert error_message in error_detail, f"A mensagem de erro esperada '{error_message}' não foi encontrada na resposta"


""" Scenario: Deletar uma conta com senha correta """
# @scenario(scenario_name="Deletar uma conta com senha correta", feature_name="../features/account.feature")
# def test_delete_user():
#     pass

# @given(parsers.cfparse('o usuário com o nome de usuário "{username}" e senha "{password}" está cadastrado no UserService'))
# def check_username_password(username: str, password: str):
#     user = db_instance.get_by_username(username)
#     user_username = user["username"]
#     user_password = user["password"]
#     assert user_username, user_password
    
# @when(parsers.cfparse('uma requisição DELETE for enviada para "{req_url}" com a senha "{password}"'))
# def req_delete_with_correct_password(context, req_url: str, password: str):
#     # TODO AUTENTICAÇÃO

#     # Assuming you need to include the password in the request body or query parameters
#     data = {"password": password}

#     # Perform the DELETE request
#     response = UserService.delete_user()

#     # Store the response in the context for later assertions or checks
#     context["response"] = response
    
# @then(parsers.cfparse('o usuario com ID {id} não deve existir no UserService'))

""" Scenario: Editar o nome de usuário de uma conta com sucesso """
# @scenario(scenario_name="Editar o nome de usuário de uma conta com sucesso", feature_name="../features/account.feature")
# def edit_username_successfully():
#     pass

# @given('o usuário com o nome de usuário "{username}" e senha "{password}" está cadastrado no UserService')
# @when('uma requisição PUT for enviada para "{req_url}" com o nome de usuário "{username}"')
# def 
# # Then o status da resposta deve ser "200"
# # And o JSON da resposta deve conter o usuario com o ID "100" e nome de usuário "bafm1"