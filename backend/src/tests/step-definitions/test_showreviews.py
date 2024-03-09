from pytest_bdd import parsers, given, when, then, scenario
from service.review_service import ReviewService
from schemas.review import ReviewModel
import time

debug = True

# Scenario 1

@scenario(scenario_name="Ver a review de uma cadeira", feature_name='../features/showreviews.feature')
def test_show_newest_review():
    pass

@given(parsers.cfparse('a review de "{username}" com nota "{rating}" e comentário "{comment}" é a única review para a disciplina "{discipline}"'))
def discipline_only_review(username: str, rating : int, comment : str, discipline:str):
    ReviewService.delete_all_reviews()
    review = ReviewModel(
        username=username,
        discipline=discipline,
        rating=rating,
        comment=comment,
        time=None
    )
    ReviewService.add_review(review)

@when(
    parsers.cfparse('uma requisição GET é enviada para "{url}"'),
    target_fixture="context"
)
def show_review(client, context, url: str):
    response = client.get(url)
    if debug:
        print(f"Resposta do servidor (status {response.status_code}): {response.text}")
    context["response"] = response
    return context

@then(
    parsers.cfparse('o código da resposta deve ser "{status_code}"'), 
    target_fixture="context"
)
def check_response_code(context, status_code: str):
    assert context["response"].status_code == int(status_code), f"O status da resposta deve ser {status_code}"
    return context


@then(
    parsers.cfparse('o JSON de resposta deverá conter a review de "{username}" com nota "{rating}" e comentário "{comment}" para a disciplina "{discipline}" na sua posição "{position}"'), 
    target_fixture="context"
)
def check_response_json_id(context, username: str, rating : str, comment : str, discipline:str, position : str):
    pos = int(position)
    assert context["response"].json()[pos]["username"] == username
    assert context["response"].json()[pos]["discipline"] == discipline
    assert context["response"].json()[pos]["rating"] == int(rating)
    assert context["response"].json()[pos]["comment"] == comment
    ReviewService.delete_all_reviews()
    return context

# Scenario 2

@scenario(scenario_name="Ordenar reviews por melhores notas", feature_name='../features/showreviews.feature')
def test_show_best_ratings_reviews():
    ReviewService.delete_all_reviews()
    pass

@given(parsers.cfparse('a review de "{username}" com nota "{rating}" e comentário "{comment}" está cadastrada para a disciplina "{discipline}"'))
def insert_review(username: str, rating : int, comment : str, discipline:str):
    review = ReviewModel(
        username=username,
        discipline=discipline,
        rating=rating,
        comment=comment,
        time=None
    )
    ReviewService.add_review(review)

# Scenario 3
    
@scenario(scenario_name="Calcular avaliação média de uma cadeira", feature_name='../features/showreviews.feature')
def test_mean():
    ReviewService.delete_all_reviews()
    pass

@then(parsers.cfparse('o JSON de resposta deverá apresentar um float com valor "{mean}" como média geral da disiciplina "{discipline}"'))
def check_mean(context, mean: str, discipline : str):
    reviews = ReviewService.get_reviews_by_discipline(discipline)
    length = len(reviews)
    sum = 0
    i = 0
    for review in reviews:
        sum += review["rating"]
    assert float(mean) == sum/length
    ReviewService.delete_all_reviews()
    return context

# Scenario 4

@scenario(scenario_name="Ordenar reviews por mais recentes", feature_name='../features/showreviews.feature')
def test_show_recent_reviews():
    pass

@given(parsers.cfparse('a review de "{username}" com nota "{rating}" e comentário "{comment}" era inicialmente a única review cadastrada para a disciplina "{discipline}"'))
def insert_initially(username: str, rating : int, comment : str, discipline:str):
    discipline_only_review(username, rating , comment, discipline)

@given(parsers.cfparse('a review de "{username}" com nota "{rating}" e comentário "{comment}" foi cadastrada para a disciplina "{discipline}" um pouco depois'))
def insert_a_little_after(username: str, rating : int, comment : str, discipline:str):
    time.sleep(1)
    insert_review(username, rating, comment, discipline)

# Scenario 5
    
@scenario(scenario_name="Ordenar reviews por mais antigas", feature_name='../features/showreviews.feature')
def test_show_old_reviews():
    pass

# Scenario 6

@scenario(scenario_name="Primeira página de uma cadeira com muitas reviews", feature_name='../features/showreviews.feature')
def test_first_page():
    ReviewService.delete_all_reviews()
    pass

@then(parsers.cfparse('o JSON de resposta deverá conter "{qtd}" reviews'))
def insert_a_little_after(context, qtd : str):
    assert len(context["response"].json()) == int(qtd)
    return context

# Scenario 7

@scenario(scenario_name="Segunda página de uma cadeira com muitas reviews", feature_name='../features/showreviews.feature')
def test_second_page():
    ReviewService.delete_all_reviews()
    pass


# Scenario 8

@scenario(scenario_name="Ordenar uma cadeira com muitas reviews por pior nota", feature_name='../features/showreviews.feature')
def test_worst_ratings():
    ReviewService.delete_all_reviews()
    pass

@then(parsers.cfparse('o JSON de resposta não deverá conter a review de "{username}"'))
def insert_a_little_after(context, username : str):
    for review in context["response"].json():
        assert review["username"] != username
    return context

# Scenario 9

@scenario(scenario_name="Mostrar reviews de uma discipina sem reviews", feature_name='../features/showreviews.feature')
def test_discipline_without_reviews():
    pass

@given(parsers.cfparse('a disciplina de "{discipline}" não possui nenhum review'))
def delete_reviews_discipline(discipline : str):
    ReviewService.delete_all_discipline_reviews(discipline)

@then(parsers.cfparse('a messagem de erro "{message}" será mostrada'))
def delete_reviews_discipline(context, message : str):
    assert context["response"].json()["message"] == message
    return context

# Scenario 10

@scenario(scenario_name="Média de uma disciplina sem reviews", feature_name='../features/showreviews.feature')
def test_average_without_reviews():
    pass
