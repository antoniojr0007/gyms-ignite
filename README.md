# APP
Gym-pass style app.

# RFs (Requisitos funcionais)

- [x] Deve ser possivel se cadastrar;
- [x] Deve ser possivel se autenticar;
- [x] Deve ser possivel obter o perfil de um usuário logado;
- [x] Deve ser possivel obter o numero de check-ins pelo usuário logado;
- [x] Deve ser possivel o usuário obter seu histórico de check-ins;
- [x] Deve ser possivel o usuário buscar academias próximas num raio de ate 10km;
- [x] Deve ser possivel o usuário buscar academias pelo nome;
- [x] Deve ser possivel o usuário efetuar check-in em uma academia;
- [x] Deve ser possivel validar o check-in de um usuário
- [x] Deve ser possivel cadastrar uma academia

# RNs (Regras de negócios)

- [x] O usuário nao deve se cadastrar com um email duplicado;
- [x] O usuário nao pode fazer 2 check-ins no mesmo dia;
- [x] O usuário nao poder fazer check-in se nao estiver perto (100m) academia;
- [x] o check-in so pode ser validado ate 20 minutos apos criado;
- [x] o check-in so pode ser validado por administradores;
- [x] A academia so pode ser cadastrado por administradores;

# RNFs (requisitos não-funcionais)
- [x] A senha do usuário tem que estar criptografada;
- [x] Os dados da aplicação precisa estar persistido em um banco postegreSQL
- [x] Todas listas deve estar paginadas com 20 items por pagina
- [x] o usuário deve ser identificado por um JWT( Json Web Token) 