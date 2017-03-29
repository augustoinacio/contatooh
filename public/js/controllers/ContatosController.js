angular.module('contatooh').controller('ContatosController',
    function(Contato, $scope) {

      //  var Contato = $resource('/contatos/:id');

        $scope.total = 0;

        $scope.contatos = [];

        $scope.filtro = '';

        $scope.mensagem = {
            texto: ''
        };

        /*$scope.incrementa = function() {
            $scope.total++;
        };*/

        /*$http.get('/contatos')
              .success(function(data) {
                  $scope.contatos = data;
              })
              .error(function(statusText) {
                  console.log("Não foi possivel obter a lista de contatos");
                  console.log(statusText);
              });*/

        function buscaContatos() {
            Contato.query(
                function(contatos) {
                    $scope.contatos = contatos;
                    $scope.mensagem = {};
                },
                function(erro) {
                    console.log(erro);
                    $scope.mensagem = {
                        texto: "Não foi possivel obter a lista de contatos"
                    };
                }
            );
        }
        buscaContatos();
    });
