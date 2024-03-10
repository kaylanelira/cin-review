from pytest_bdd import parsers, given, when, then, scenario
from service.discipline_service import DisciplineService, db_instance
from tests.utils import utils
from schemas.discipline import Discipline
from fastapi import HTTPException
import pytest

debug = True

@pytest.fixture
def discipline_result():
    return {}

@scenario('../features/disciplines.feature', "Adição bem-sucedida de uma nova cadeira")
def test_add_discipline_success():
    pass

@given(parsers.cfparse('o usuario submete o formulario de cadeiras com "{name}" "{code}" "{department}" "{semester}" "{professor}" "{description}"'), target_fixture="discipline_result")
def submit_discipline_forms(name : str, code : str, department : str, semester : int, professor : str, description : str):
    try:
        delete_result = DisciplineService.delete_discipline(code)
        # debug = True
        # if debug:
        # print('scenario 1')
        # print(delete_result["detail"])  
    except HTTPException as e:
        pass
        # if debug:
            # print(e.detail)  
    
    discipline = Discipline(
        name=name, 
        code=code, 
        department=department, 
        semester=semester, 
        professor=professor,
        description=description
    )
    # print(discipline)
    discipline_result = DisciplineService.add_discipline(discipline)
    # print(discipline_result)

    # if debug:
        # print(discipline_result)
        # debug = False
    return discipline_result 

@then(parsers.cfparse("a cadeira {name} deve estar presente na lista de cadeiras"))
def discipline_is_in_list(name):
    all_disciplines = DisciplineService.get_all_disciplines()
    # if debug:
        # print(all_disciplines)

    assert any(discipline['name'] == name for discipline in all_disciplines)

@scenario('../features/disciplines.feature', "Falha na adição de uma nova cadeira devido a campo não preenchido")
def test_add_discipline_failure_missing_fields():
    # if debug:
        # print('scenario 2')
    pass

@then(parsers.cfparse("uma mensagem de confirmação é exibida: {message}"))
def discipline_added_confirmation(discipline_result, message):
    # if debug:
        # print('message', message, 'discipline_result', discipline_result)
    # if discipline_result['message'] is not None:
        # print(f'discipline result{discipline_result["message"]}')
        # print('NOT none')
    # else:
        # print('none')
    # print('discipline result', discipline_result)
    assert discipline_result['message'] == message
    
@then(parsers.cfparse("uma mensagem de erro é exibida: {message}"))
def discipline_add_failure_missing_fields(discipline_result, message):
    print('discipline result', discipline_result)

    if debug and discipline_result['message'] != message:
        pass
        # print('discipline_result', discipline_result['message'], 'message', message)
    assert discipline_result["message"] == message
    
@then(parsers.cfparse("a cadeira {name} não deve estar presente na lista de cadeiras"))
def discipline_is_not_in_list(name):
    all_disciplines = DisciplineService.get_all_disciplines()
    # if debug:
        # print(all_disciplines)
    assert not any(discipline['name'] == name for discipline in all_disciplines)

@scenario('../features/disciplines.feature', "Falha na adição de uma nova cadeira devido a Code e semestre repetidos")
def test_add_discipline_failure_redundant():
    pass

@given(parsers.cfparse('a cadeira com Code "{code}" e semestre "{semester}" já existe no sistema'))
def ensure_discipline_exists(code, semester):
    # Primeiro, deleta todas as disciplinas com o mesmo código para evitar duplicatas
    try:
        delete_result = DisciplineService.delete_discipline(code)
        # if debug:
            # print(delete_result["detail"])
    except HTTPException as e:
        # if debug:
        pass
            # print(f"No disciplines found with the code {code} to delete. Proceeding to add the new discipline.")

    new_discipline = Discipline(
        name='Nome da Cadeira',  
        code=code,
        semester=int(semester),  
        department='Departamento',  
        professor='Nome do Professor',  
        description='Descrição da Cadeira'
    )
    # if debug:
        # print(new_discipline)
    msg = DisciplineService.add_discipline(new_discipline)

    # if debug:
        # print(msg)

    all_disciplines = DisciplineService.get_all_disciplines()
    # if debug:
        # print('disciplinas', all_disciplines, 'code, semester', type(code), type(semester))
    assert any(discipline['code'] == code and discipline['semester'] == int(semester) for discipline in all_disciplines), f"Disciplina com code {code} e semestre {semester} não foi encontrada após adição."


@given(parsers.cfparse('usuario submete o formulario de cadeiras com "{name}" "{code}" "{department}" "{semester}" "{professor}" "{description}"'), target_fixture="discipline_result")
def submit_discipline_formul(name : str, code : str, department : str, semester : int, professor : str, description : str):

    discipline = Discipline(
        name=name, 
        code=code, 
        department=department, 
        semester=semester, 
        professor=professor,
        description=description
    )
    discipline_result = DisciplineService.add_discipline(discipline)
    # if debug:
        # print(discipline_result)
    return discipline_result 

@then(parsers.cfparse('deve existir apenas uma cadeira com Code "{code}" e semestre "{semester}" no sistema'))
def check_for_duplicate_discipline(code, semester):
    all_disciplines = DisciplineService.get_all_disciplines()
    # if debug:
        # print('all disciplines', all_disciplines)
    filtered_disciplines = [discipline for discipline in all_disciplines if discipline['code'] == code and discipline['semester'] == int(semester)]
    assert len(filtered_disciplines) == 1, f"Encontrada mais de uma disciplina com Code {code} e semestre {semester}."

@scenario('../features/disciplines.feature', "Edição bem-sucedida de uma cadeira pelo Code")
def test_edit_discipline_success():
    pass

@given(parsers.cfparse('o usuario submete o formulario de edicao de cadeiras para a cadeira com code "{code}" com "{name}", "{new_code}", "{department}", "{semester}", "{professor}", "{description}"'), target_fixture="discipline_result")
def submit_discipline_update_forms(code: str, name: str, new_code: str, department: str, semester: str, professor: str, description: str):
    update_data = {
        'name': name,
        'code': new_code,  
        'department': department,
        'semester': int(semester),
        'professor': professor,
        'description': description
    }

    try:
        # Obtain the discipline using the provided code
        discipline = DisciplineService.get_discipline_by_code(code)
        if not discipline:
            raise ValueError(f"Discipline with code {code} not found.")
        
        # Get the discipline ID from the obtained discipline
        discipline_id = discipline['id']
        # print(discipline_id, update_data)

        # Update the discipline using the obtained ID and update data
        update_result = DisciplineService.update_discipline(discipline_id, update_data)
        
        # Optionally, print a success message
        print(f"Discipline {code} updated successfully.")
        discipline_result = {'message': update_result['message']}
    except HTTPException as e:
        # print(f"Failed to update discipline {code}: {e.detail}")
        raise e
    # if debug:
        # print('update_result["message"]', update_result['message'])
    return discipline_result

@then(parsers.cfparse('a cadeira com Code "{code}" deve refletir as novas informações na lista de cadeiras "{name}", "{department}", "{semester}", "{professor}", "{description}"'))
def check_updated_discipline_info(code: str, name: str, department: str, semester: str, professor: str, description: str):
    all_disciplines = DisciplineService.get_all_disciplines()
    # if debug:
        # print('all disciplines after update', all_disciplines)

    # Filtra para encontrar a cadeira com o código especificado
    updated_discipline = next((discipline for discipline in all_disciplines if discipline['code'] == code), None)

    # Se a cadeira não for encontrada, falha o teste
    assert updated_discipline is not None, f"Cadeira com code {code} não encontrada."

    # Verifica se as informações da cadeira foram atualizadas corretamente
    assert updated_discipline['name'] == name, f"Nome esperado '{name}', encontrado '{updated_discipline['name']}'"
    assert updated_discipline['department'] == department, f"Departamento esperado '{department}', encontrado '{updated_discipline['department']}'"
    assert str(updated_discipline['semester']) == semester, f"Semestre esperado '{semester}', encontrado '{updated_discipline['semester']}'"
    assert updated_discipline['professor'] == professor, f"Professor esperado '{professor}', encontrado '{updated_discipline['professor']}'"
    assert updated_discipline['description'] == description, f"Descrição esperada '{description}', encontrada '{updated_discipline['description']}'"

@scenario('../features/disciplines.feature', "Falha na edição de uma cadeira devido a campo não preenchido")
def test_edit_discipline_missing_field():
    pass

@then(parsers.cfparse('as alterações na cadeira com Code "{code}" e semestre "{semester}" nao devem ser salvas'))
def check_semester_unchanged(code, semester):
    discipline = DisciplineService.get_discipline_by_code(code)

    assert discipline is not None, f"Cadeira com o código {code} não foi encontrada."
    # print("discipline['semester']", discipline['semester'], semester)
    assert str(discipline['semester']) == semester, f"O semestre da cadeira com o código {code} foi alterado inesperadamente."

@scenario('../features/disciplines.feature', "Falha na edição de cadeira devido a Code inexistente")
def test_edit_does_not_exist():
    pass

@given(parsers.cfparse('o usuario busca pela cadeira utilizando o Code "{code}"'), target_fixture="discipline_result")
def search_discipline(code: str):
    try:
        discipline_result = DisciplineService.get_discipline_by_code(code)
        return discipline_result
    except HTTPException as e:
        pytest.fail(e.detail)

@scenario('../features/disciplines.feature', "Deletar todas as cadeiras com o mesmo codigo")
def test_delete_discipline_code():
    pass

@given(parsers.cfparse('existem {discipline_number} cadeiras com o Code "{code}" no sistema'))
def ensure_multiple_disciplines_exist(code: str, discipline_number: int):
    res = ''
    try:
        res = DisciplineService.delete_discipline(code)
    except:
        pass
        # if debug:
            # print(res)
    # if debug:
        # print(int(discipline_number) + 1)
    for semester in range(1, int(discipline_number) + 1):
        new_discipline = Discipline(
            name='Nome da Cadeira',
            code=code,
            semester=int(semester),  
            department='Departamento',
            professor='Nome do Professor',
            description='Descrição da Cadeira'
        )
        add_result = DisciplineService.add_discipline(new_discipline)
        # if debug:
            # print(f"Cadeira adicionada: {add_result}")
    
    all_disciplines = DisciplineService.get_all_disciplines()
    added_disciplines = [discipline for discipline in all_disciplines if discipline['code'] == code]
    assert len(added_disciplines) == int(discipline_number), "Número incorreto de cadeiras adicionadas."
    
@when(parsers.cfparse('o usuario solicita a deleção das cadeiras utilizando o Code "{code}"'), target_fixture='discipline_result')
def usuario_solicita_delecao(code: str, discipline_result):
    try:
        msg = DisciplineService.delete_discipline(code)
        # print(msg['detail'])
        discipline_result = str(msg['detail'])
        # if debug:
            # print(f"Resultado da deleção: {discipline_result}")
    except HTTPException as e:
        pass
        # if debug:
            # print(f"Erro ao deletar cadeiras com o code {code}: {e.detail}")
    return discipline_result

@then(parsers.cfparse('todas as cadeiras com o Code "{code}" são removidas do sistema'))
def discipline_code_removed(code: str):
    discipline = DisciplineService.get_discipline_by_code(code)
    assert discipline == {"message": "Discipline code does not exist."}, f"Esperava-se que todas as cadeiras com o código {code} fossem removidas, mas ainda existem no sistema."

@then(parsers.cfparse("mensagem de confirmação é exibida: {message}"))
def discipline_added_confirmation(discipline_result, message):
    # if debug:
        # print('message', message, 'discipline_result', discipline_result)
    assert discipline_result == message
