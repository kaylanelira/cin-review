# Documentação de Componentes

## Button

- Caminho: 
frontend/src/shared/components/Button

- Como utilizar:
  ```jsx
  <Button data-cy="create" type="submit">
    Cadastrar
  </Button>

## Input
- Caminho: 
frontend/src/shared/components/Input

- Como utilizar:
  ```jsx
  <Input text="Sobrenome" value={surname} setInfo={setSurname}/>

## Input Required
- Caminho: 
frontend/src/shared/components/InputRequired

- Como utilizar:
  ```jsx
  <InputRequired text="Senha" value={password} setInfo={setPassword} type="password"/>

O valor "type" serve apenas para indicar se é senha ou não, pelo menos até agora.