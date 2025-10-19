Feature: Fluxo de Usuário e Livros na API DemoQA

    @teste-1
    Scenario: Criar um novo usuário
        Given que eu crio um novo usuário com credenciais dinâmicas
        When eu gero um token de acesso para este usuário
        And confirmo que o usuário criado está autorizado
        Then eu vejo os detalhes do usuário criado corretamente 

    @teste-2
    Scenario: Alugar dois livros
        Given que eu crio um novo usuário com credenciais dinâmicas
        When eu gero um token de acesso para este usuário
        And confirmo que o usuário criado está autorizado
        And busco a lista de livros disponíveis
        And adiciono dois livros da lista à minha coleção
        Then eu vejo os detalhes do usuário com os dois livros adicionados corretamente

    @teste-3
    Scenario: Listar os detalhes do usuário com os livros escolhidos 
        Given que eu crio um novo usuário com credenciais dinâmicas
        When eu gero um token de acesso para este usuário
        And confirmo que o usuário criado está autorizado
        And busco a lista de livros disponíveis
        And adiciono dois livros da lista à minha coleção
        Then eu vejo os detalhes do usuário com os dois livros adicionados corretamente