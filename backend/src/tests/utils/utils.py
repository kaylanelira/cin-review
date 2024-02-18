from fastapi.testclient import TestClient

def req_type_to_function(client: TestClient, req_type: str):
    return {
        "GET": client.get,
        "POST": client.post,
        "PUT": client.put,
        "DELETE": client.delete
    }[req_type]


def get_response_items_list(response):
    return response.json()["data"]["items"]

def convert_gherkin_string_to_dict(gherkin_string):
    # Divide a string em linhas
    lines = gherkin_string.strip().split('\n')

    # A linha de dados é a segunda linha
    data_line = lines[1].strip()

    # Os cabeçalhos são obtidos a partir da primeira linha
    headers = [header.strip() for header in lines[0].split('|')[1:-1]]

    # Cria um dicionário para a linha de dados
    values = [value.strip() for value in data_line.split('|')[1:-1]]
    data_dict = dict(zip(headers, values))

    return data_dict

def convert_gherkin_string_to_list(gherkin_string):
    # Divide a string em linhas
    lines = gherkin_string.strip().split('\n')

    # Os cabeçalhos são obtidos a partir da primeira linha
    headers = [header.strip() for header in lines[0].split('|')[1:-1]]

    # Cria uma lista de dicionários para cada linha de dados
    data_list = []
    for line in lines[1:]:
        # Para cada linha de dados, cria um dicionário
        values = [value.strip() for value in line.split('|')[1:-1]]
        data_dict = dict(zip(headers, values))
        data_list.append(data_dict)

    return data_list
