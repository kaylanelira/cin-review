from pytest_bdd import parsers, given, when, then, scenario
from service.review_service import ReviewService, db_instance
from service.discipline_service import DisciplineService
from tests.utils import utils

debug = True

# Scenario 1 =====================================================================================
@scenario(scenario_name="Carregamento com sucesso das reviews mais recentes", feature_name="../features/feed.feature")
def test_carregamento_com_sucesso_das_reviews_mais_recentes():
    pass

@given(
    parsers.cfparse('o ReviewService possui as reviews\n{data}'),
    target_fixture="context"
)
def add_review_to_ReviewService(client, context, data):
    if isinstance(data, str):
        review_data_list = utils.convert_gherkin_string_to_list(data)
    elif isinstance(data, dict):
        review_data_list = data
    
    for review_data in review_data_list:
        if review_data in ReviewService.get_reviews_by_name_and_discipline(review_data["discipline"], review_data["username"]):
            ReviewService.delete_review(review_data['_id'])

    for review_data in review_data_list:
        req_url = f'/review/add_review'
        response = client.post(req_url, json=review_data)
        if debug:
            print(f"Resposta do servidor (status {response.status_code}): {response.text}")
        
    context["response"] = response
    return context

@when(
    parsers.cfparse('uma requisição GET é enviada para "{req_url}"'),
    target_fixture="context"
)
def get_requisition(client, context, req_url: str):    
    response = client.get(req_url)
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

@then('o JSON da resposta deve conter as dez reviews mais recentes')
def check_response_json(context):
    reviews = db_instance.get_all_items("reviews")
    sorted_reviews = sorted(reviews, key=lambda x: x['time'], reverse=True)
    recent_reviews = sorted_reviews[:10]
    response_json = context["response"].json()
    assert recent_reviews == response_json

    return context    

# Scenario 2 =====================================================================================
@scenario(scenario_name="Sem review cadastradas (mais recentes)", feature_name="../features/feed.feature")
def test_sem_review_cadastradas_mais_recentes():
    pass

@given('o ReviewService nao possui reviews')
def remove_review_to_ReviewService():
    reviews = db_instance.get_all_items("reviews")
    for review in reviews:
        ReviewService.delete_review(review['_id'])

@then('o JSON da resposta deve estar vazio')
def check_empty_json(context):
    assert len(context["response"].json()) == 0
    return context 

# Scenario 3 =====================================================================================
@scenario(scenario_name="Carregamento com sucesso das cadeiras Em Alta", feature_name="../features/feed.feature")
def test_carregamento_com_sucesso_das_cadeiras_em_alta():
    pass

@then('o JSON da resposta deve conter as dez cadeiras com mais reviews')
def check_response_json(context):
    reviews = db_instance.get_all_items("reviews")
    review_count = {}
    for review in reviews:
        discipline = review["discipline"]
        if discipline in review_count:
            review_count[discipline] += 1
        else:
            review_count[discipline] = 1
    sorted_disciplines = sorted(review_count.keys(), key=lambda x: review_count[x], reverse=True)
    top_disciplines = sorted_disciplines[:10]
    response_json = context["response"].json()
    assert top_disciplines == response_json
    return context 

# Scenario 4 =====================================================================================
@scenario(scenario_name="Sem review cadastradas (Em alta)", feature_name="../features/feed.feature")
def test_sem_review_cadastradas_em_alta():
    pass

# Scenario 5 =====================================================================================
@scenario(scenario_name="Carregamento com sucesso das disciplinas por ordem alfabetica", feature_name="../features/feed.feature")
def test_Carregamento_com_sucesso_das_disciplinas_por_ordem_alfabetica():
    pass

@given( parsers.cfparse('o DisciplineService possui as disciplinas\n{data}'),
    target_fixture="context")
def add_discipline_to_DisciplineService(client, context, data):
    if isinstance(data, str):
        discipline_data_list = utils.convert_gherkin_string_to_list(data)
    elif isinstance(data, dict):
        discipline_data_list = data
    
    for discipline_data in discipline_data_list:
        if discipline_data in DisciplineService.get_all_disciplines():
            DisciplineService.delete_discipline(discipline_data['code'])

    for discipline_data in discipline_data_list:
        req_url = f'/discipline/add_discipline'
        response = client.post(req_url, json=discipline_data)
        if debug:
            print(f"Resposta do servidor (status {response.status_code}): {response.text}")
        
    context["response"] = response
    return context

@then('o JSON da resposta deve conter as disciplinas em ordem alfabetica')
def check_response_json_alphabetically(context):
    response_json = context["response"].json()
    disciplines_names = [discipline["name"] for discipline in response_json]
    assert disciplines_names == sorted(disciplines_names), "Os nomes das disciplinas não estão em ordem alfabética"
    return context 

# Scenario 6 =====================================================================================
@scenario(scenario_name="Sem disciplinas cadastradas", feature_name="../features/feed.feature")
def test_sem_disciplinas_cadastradas():
    pass

@given('o DisciplineService nao possui disciplina')
def remove_discipline_to_DisciplineService():
    disciplines = DisciplineService.get_all_disciplines()
    for discipline in disciplines:
        DisciplineService.delete_discipline(discipline['code'])

# Scenario 7 =====================================================================================
@scenario(scenario_name="Aplicacao do filtro por periodo com sucesso", feature_name="../features/feed.feature")
def test_aplicacao_do_filtro_por_periodo_com_sucesso():
    pass

@then(parsers.cfparse('o JSON da resposta deve conter as disciplinas do periodo "{semester}"'),
    target_fixture="context")
def check_response_json_by_semester(context, semester):
    disciplines = DisciplineService.get_all_disciplines()
    disciplines_in_semester = [discipline for discipline in disciplines if discipline["semester"] == semester]
    
    response_json = context["response"].json()
    assert disciplines_in_semester == response_json
    return context 

# Scenario 8 =====================================================================================
@scenario(scenario_name="Aplicacao do filtro por periodo sem sucesso", feature_name="../features/feed.feature")
def test_aplicacao_do_filtro_por_periodo_sem_sucesso():
    pass

# Scenario 9 =====================================================================================
@scenario(scenario_name="Busca pelo nome da disciplina com sucesso", feature_name="../features/feed.feature")
def test_busca_pela_disciplina_com_sucesso():
    pass

@then(parsers.cfparse('o JSON da resposta deve conter as disciplina com substring "{substring}"'),
    target_fixture="context")
def check_response_json_by_substring(context, substring):
    disciplines = DisciplineService.get_all_disciplines()
    disciplines_with_substring = [discipline for discipline in disciplines if substring.lower() in discipline['name'].lower()]
    
    response_json = context["response"].json()
    assert disciplines_with_substring == response_json
    return context 

# Scenario 10 =====================================================================================
@scenario(scenario_name="Busca pelo nome da disciplina sem sucesso", feature_name="../features/feed.feature")
def test_busca_pela_disciplina_sem_sucesso():
    pass