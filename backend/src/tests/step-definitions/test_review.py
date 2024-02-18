from pytest_bdd import parsers, given, when, then, scenario
from service.review_service import ReviewService
from schemas.review import ReviewModel

# Cenario 1

@scenario(scenario_name='Cadastrar um review com sucesso', feature_name='../features/review.feature')
def test_cadastrar_um_review_com_sucesso():
    pass

@given(parsers.cfparse('o usuário "{username}" não tem um review cadastrado para a disciplina "{discipline}"'))
def delete_user(username: str, discipline: str):

    existing_reviews = ReviewService.get_reviews_by_name_and_discipline(discipline, username)

    for review in existing_reviews:
        id_to_delete = review['_id']
        removed_id = ReviewService.delete_review(id_to_delete)
    
@when(
    parsers.cfparse('uma requisição POST é enviada "{url}" com username "{username}", disciplina "{discipline}", nota "{rating}" e comentário "{comment}"'),
    target_fixture="context"
)
def add_review(client, context, url: str, username: str, discipline: str, rating: int, comment: str):
    # try route
    response = client.post(url, json={"username": username, "discipline": discipline, "rating": rating, "comment": comment, "time": "NULL"})
    context["response"] = response
    
    # remove review if it exists
    existing_reviews = ReviewService.get_reviews_by_name_and_discipline(discipline, username)
    if(len(existing_reviews) != 0):
        id_to_delete = existing_reviews[0]['_id']
        removed_id = ReviewService.delete_review(id_to_delete)

    return context

@then(
    parsers.cfparse('o código da resposta é "{response_code}"'),
    target_fixture="response_code"
)
def check_response_status_code(context, response_code: str):
    assert context["response"].status_code == int(response_code)

@then(
    parsers.cfparse('o JSON da resposta deve conter username "{username}", disciplina "{discipline}", nota "{rating}" e comentário "{comment}"')
)
def response_json(context, username: str, discipline: str, rating: str, comment: str):

    response_json = context["response"].json()

    if isinstance(response_json, list):
        for review in response_json:
            assert review["username"] == username
            assert review["discipline"] == discipline
            assert review["rating"] == int(rating)
            assert review["comment"] == comment
    else:
        assert response_json["username"] == username
        assert response_json["discipline"] == discipline
        assert response_json["rating"] == int(rating)
        assert response_json["comment"] == comment


# Cenario 2 =====================================================================================

@scenario(scenario_name='Cadastrar um review repetido', feature_name='../features/review.feature')
def test_cadastrar_um_review_repetido():
    pass

@given(
    parsers.cfparse('o usuário "{username}" já tem um review cadastrado com disciplina "{discipline}", nota "{rating}" e comentário "{comment}"')
)
def add_previous_review(client, username: str, discipline: str, rating: int, comment: str):
    
    # remove existing review
    existing_reviews = ReviewService.get_reviews_by_name_and_discipline(discipline, username)
    if(len(existing_reviews) != 0):
        id_to_delete = existing_reviews[0]['_id']
        removed_id = ReviewService.delete_review(id_to_delete)
    
    review = ReviewModel(
        username=username,
        discipline=discipline,
        rating=rating,
        comment=comment,
        time=None
    )

    ReviewService.add_review(review)

@then(parsers.cfparse('o JSON da resposta deve conter a mensagem "{message}"'))
def response_json(context, message: str):
    response_json = context["response"].json()
    assert response_json["message"] == message

# Cenario 3 =====================================================================================

@scenario(scenario_name='Editar um review com sucesso', feature_name='../features/review.feature')
def test_editar_um_review_com_sucesso():
    pass

@when(
    parsers.cfparse('uma requisição PUT é enviada "{url}" com username "{username}", disciplina "{discipline}", nota "{rating}" e comentário "{comment}"'),
    target_fixture="context"
)
def edit_review(client, context, url: str, username: str, discipline: str, rating: int, comment: str):
    new_review = {
        "username": username,
        "discipline": discipline,
        "rating": rating,
        "comment": comment,
        "time": None
    }
    response = client.put(url, json=new_review)
    context["response"] = response
    
    # remove review if it exists
    existing_reviews = ReviewService.get_reviews_by_name_and_discipline(discipline, username)
    if(len(existing_reviews) != 0):
        id_to_delete = existing_reviews[0]['_id']
        removed_id = ReviewService.delete_review(id_to_delete)

    return context

# cenario 4 =====================================================================================

@scenario(scenario_name='Editar um review inexistente', feature_name='../features/review.feature')
def test_editar_um_review_inexistente():
    pass

# cenario 5 =====================================================================================

@scenario(scenario_name='Deletar um review com sucesso', feature_name='../features/review.feature')
def test_deletar_um_review_com_sucesso():
    pass

@when(
    parsers.cfparse('uma requisição DELETE é enviada "{url}" com username "{username}" e disciplina "{discipline}"'),
    target_fixture="context"
)
def delete_review(client, context, url: str, username: str, discipline: str):
    response = client.delete(url, params={"username": username, "discipline": discipline})
    context["response"] = response
    return context

# cenario 6 =====================================================================================

@scenario(scenario_name='Deletar um review inexistente', feature_name='../features/review.feature')
def test_deletar_um_review_inexistente():
    pass

# cenario 7 =====================================================================================

@scenario(scenario_name='Listar reviews de um usuário para uma cadeira', feature_name='../features/review.feature')
def test_listar_reviews_de_um_usuario_para_uma_cadeira():
    pass

@when(
    parsers.cfparse('uma requisição GET é enviada "{url}" com username "{username}" e disciplina "{discipline}"'),
    target_fixture="context"
)
def get_reviews_by_discipline_and_user(client, context, url: str, username: str, discipline: str):
    # try route
    response = client.get(url, params={"username": username, "discipline": discipline})
    context["response"] = response

    # remove review if it exists
    existing_reviews = ReviewService.get_reviews_by_name_and_discipline(discipline, username)
    if(len(existing_reviews) != 0):
        id_to_delete = existing_reviews[0]['_id']
        removed_id = ReviewService.delete_review(id_to_delete)

    return context

# cenario 8 =====================================================================================

@scenario(scenario_name='Listar reviews inexistentes de um usuário para uma cadeira', feature_name='../features/review.feature')
def test_listar_reviews_inexistentes_de_um_usuario_para_uma_cadeira():
    pass