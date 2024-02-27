from pytest_bdd import parsers, given, when, then, scenario
from service.library_service import LibraryService
from tests.utils import utils
from schemas.library import FolderModel

# Cenario 1 --------------------------------------------------------------------------------------------------

@scenario(scenario_name='Criacao bem-sucedida de pasta', feature_name='../features/Biblioteca.feature')
def test_criar_pasta_sucesso():
    pass

@given(parsers.cfparse('um usuario com ID "{user_id}" com biblioteca vazia'))
def clear_lib(user_id: str):
    LibraryService.delete_user_library(user_id=user_id)
@when(
    parsers.cfparse('uma requisicao POST eh enviada para "{url}" com os dados\n{d_ata}')
)
def create_folder(client, context, url: str, d_ata: dict):
    if isinstance(d_ata, str):
        data = utils.convert_gherkin_string_to_dict(d_ata)
    elif isinstance(d_ata, dict):
        data = d_ata

    folder = {
        'user_id': data["user_id"],
        'name': data["name"],
        'classes_id': [int(i) for i in data['classes_id'].split(',')]
    }

    context["response"] = client.post(url, json=folder)
    return context

@then(
    parsers.cfparse('o status da resposta deve ser "{resp_status}"')
)
def check_response_status_code(context, resp_status: str):
    # context["response"].raise_for_status()
    assert context["response"].status_code == int(resp_status)
    return context

@then(
    parsers.cfparse('o JSON da resposta deve conter a mensagem "{msg}"')
)
def response_json(context, msg: str):
    response_json = context["response"].json()
    assert response_json["detail"] == msg
    return context

@then(
    parsers.cfparse('a pasta de nome "{folder_name}" e user_id "{user_id}" eh adicionada ao banco de dados')
)
def response_json(context, folder_name: str, user_id: str):
    folder = LibraryService.get_by_name_and_userID(folder_name, user_id)
    assert folder
    return context

# Cenario 2 --------------------------------------------------------------------------------------------------

@scenario(scenario_name='Criacao de pasta de nome duplicado', feature_name='../features/Biblioteca.feature')
def test_criar_pasta_fracasso():
    pass

@given(parsers.cfparse('um usuario com ID "{user_id}" que possui uma pasta de nome "{folder_name}"'))
def add_folder(user_id: str, folder_name: str):
    if LibraryService.get_by_name_and_userID(folder_name, user_id) is None:
        LibraryService.add_folder(FolderModel(user_id= user_id, name=folder_name))

@when(
    parsers.cfparse('uma requisicao POST eh enviada para "{url}" com os dados\n{d_ata}')
)
def create_folder(client, context, url: str, d_ata:dict):
    if isinstance(d_ata, str):
        data = utils.convert_gherkin_string_to_dict(d_ata)
    elif isinstance(d_ata, dict):
        data = d_ata
    
    toInt = lambda a: [int(i) for i in data['classes_id'].split(',')] if a!='' else []
    
    folder = {
        'user_id': data["user_id"],
        'name': data["name"],
        'classes_id': toInt(data['classes_id'])
    }

    context["response"] = client.post(url,  json=folder)
    return context

@then(
    parsers.cfparse('o status da resposta deve ser "{resp_status}"')
)
def check_response_status_code(context, resp_status: str):
    assert context["response"].status_code == int(resp_status)
    return context

@then(
    parsers.cfparse('o JSON da resposta deve conter a mensagem "{msg}"'),
    target_fixture="context"
)
def response_json(context, msg:str):
    response_json = context["response"].json()
    assert response_json["detail"] == msg
    return context

@then(
    parsers.cfparse('o banco de dados continua com apenas um objeto de user_id="{user_id}" e nome="{folder_name}"')
)
def response_json(context, folder_name: str, user_id: str):
    library = LibraryService.get_by_userID(user_id)
    flag = 0
    for folder in library:
        if folder["name"] == folder_name:
            flag = flag + 1
    assert flag == 1
    return context

# Cenario 3 --------------------------------------------------------------------------------------------------

@scenario(scenario_name='Insercao duplicada de cadeira em pasta', feature_name='../features/Biblioteca.feature')

def test_inserir_cadeira_fracasso():
    pass

@given(parsers.cfparse('uma pasta no banco de dados\n{d_ata}'))
def add_folder(d_ata:dict):
    if isinstance(d_ata, str):
        data = utils.convert_gherkin_string_to_dict(d_ata)
    elif isinstance(d_ata, dict):
        data = d_ata

    folder = FolderModel(
        user_id = data["user_id"],
        name = data["name"],
        classes_id = [int(i) for i in data['classes_id'].split(',')]
    )

    if LibraryService.get_by_name_and_userID(data["name"], data["user_id"]) is None:
        LibraryService.add_folder(folder)
    else:
        LibraryService.edit_folder(original_name=data["name"], updated_folder=folder)

@when(
    parsers.cfparse('uma requisicao PUT eh enviada para "{url}" com os dados\n{d_ata}'),
    target_fixture="context"
)
def edit_folder(client, context, url: str, d_ata:dict):
    if isinstance(d_ata, str):
        data = utils.convert_gherkin_string_to_dict(d_ata)
    elif isinstance(d_ata, dict):
        data = d_ata

    folder = {
        'user_id': data["user_id"],
        'name': data["name"],
        'classes_id': [int(i) for i in data['classes_id'].split(',')]
    }

    context["response"] = client.put(url, json=folder)
    return context

@then(
    parsers.cfparse('o status da resposta deve ser "{resp_status}"'),
    target_fixture="context"
)
def check_response_status_code(context, resp_status: str):
    assert context["response"].status_code == int(resp_status)
    return context

@then(
    parsers.cfparse('o JSON da resposta deve conter a mensagem "{msg}"')
)
def response_json(context, msg: str):
    response_json = context["response"].json()
    assert response_json["detail"] == msg
    return context

@then(
    parsers.cfparse('o objeto de nome "{folder_name}" e user_id "{user_id}" continua possuindo apenas a cadeira de id "{class_id}" no banco de dados')
)
def response_json(context, folder_name: str, user_id: str, class_id: str):
    library = LibraryService.get_by_name_and_userID(folder_name, user_id)
    
    assert library["classes_id"] == [int(class_id)]

    return context

# Cenario 4 --------------------------------------------------------------------------------------------------

@scenario(scenario_name='Insercao bem-sucedida de cadeira em pasta', feature_name='../features/Biblioteca.feature')
def test_inserir_cadeira_sucesso():
    pass

@given(parsers.cfparse('um usuario com ID "{user_id}" cuja pasta "{folder_name}" nao possui cadeiras'))
def add_folder(user_id: str, folder_name: str):
    if LibraryService.get_by_name_and_userID(folder_name, user_id) is None:
        LibraryService.add_folder(FolderModel(user_id = user_id, name = folder_name))
    else:
        LibraryService.edit_folder(folder_name, FolderModel(user_id= user_id, name= folder_name))

@when(
    parsers.cfparse('uma requisicao PUT eh enviada para "{url}" com os dados\n{d_ata}'),
    target_fixture="context"
)
def edit_folder(client, context, url: str, d_ata:dict):
    if isinstance(d_ata, str):
        data = utils.convert_gherkin_string_to_dict(d_ata)
    elif isinstance(d_ata, dict):
        data = d_ata
    
    folder = {
        'user_id': data["user_id"],
        'name': data["name"],
        'classes_id': [int(i) for i in data['classes_id'].split(',')]
    }
    response = client.put(url, json=folder)
    context["response"] = response
    return context

@then(
    parsers.cfparse('o status da resposta deve ser "{resp_status}"'),
    target_fixture="context"
)
def check_response_status_code(context, resp_status: str):
    # context["response"].raise_for_status()
    assert context["response"].status_code == int(resp_status)
    return context

@then(
    parsers.cfparse('o JSON da resposta deve conter a mensagem "{msg}"')
)
def response_json(context, msg:str):
    response_json = context["response"].json()
    assert response_json["detail"] == msg
    return context

@then(
    parsers.cfparse('o objeto de nome "{folder_name}" e user_id "{user_id}" agora possui uma cadeira de id "{class_id}"')
)
def response_json(context, folder_name: str, user_id: str, class_id: str):
    library = LibraryService.get_by_name_and_userID(folder_name, user_id)
    
    assert library["classes_id"] == [int(class_id)]
    
    return context

# Cenario 5 --------------------------------------------------------------------------------------------------

@scenario(scenario_name='Remocao bem-sucedida de pasta da biblioteca', feature_name='../features/Biblioteca.feature')
def test_remover_pasta_sucesso():
    pass

@given(parsers.cfparse('um usuario com ID "{user_id}" cuja biblioteca possui a pasta de nome "{folder_name}"'))
def add_folder(user_id: str, folder_name: str):
    if LibraryService.get_by_name_and_userID(folder_name, user_id) is None:
        LibraryService.add_folder(FolderModel (user_id = user_id, name = folder_name))

@when(
    parsers.cfparse('uma requisicao DELETE eh enviada para "{url}" com os dados\n{d_ata}'),
    target_fixture="context"
)
def delete_folder(client, context, url: str, d_ata:dict):
    if isinstance(d_ata, str):
        data = utils.convert_gherkin_string_to_dict(d_ata)
    elif isinstance(d_ata, dict):
        data = d_ata

    response = client.delete(url, params={"user_id":data["user_id"]})
    context["response"] = response
    return context

@then(
    parsers.cfparse('o status da resposta deve ser "{resp_status}"'),
    target_fixture="context"
)
def check_response_status_code(context, resp_status: str):
    # context["response"].raise_for_status()
    assert context["response"].status_code == int(resp_status)
    return context

@then(
    parsers.cfparse('o JSON da resposta deve conter a mensagem "{msg}"')
)
def response_json(context, msg: str):
    response_json = context["response"].json()
    assert response_json["detail"] == msg
    return context

@then(
    parsers.cfparse('a pasta de nome "{folder_name}" com user_id={user_id}" nao existe mais no banco de dados')
)
def response_json(context, folder_name: str, user_id: str):
    library = LibraryService.get_all()
    flag = 0
    for folder in library:
        if folder["name"] == folder_name and folder["user_id"] == user_id:
            flag = flag + 1
    assert flag == 0
    return context