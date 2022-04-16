var app = angular.module('Unic', []);

app.factory('servicePessoa', ['$http', function($http){
    var service = {};

    service.ListarPessoas = function () {
       return $http.get('Pessoa/ListarPessoas');
    }
    service.SalvarPessoa = function (pessoa){
        return $http.post('Pessoa/SalvarPessoa/', pessoa);
    }

    service.SelecionarPessoa = function (id) {
        return $http.get('Pessoa/SelecionarPessoa/' + id);
    }

    service.EditarPessoa = function (pessoa) {
        return $http.post('Pessoa/Edit', pessoa);
    }

    return service;
}]);

app.controller('PessoaController', ['$scope','$http', 'servicePessoa', function ($scope, $http, servicePessoa){

    $scope.SelecionarPessoa = function (id) {
        $scope.pessoa = {};
        servicePessoa.SelecionarPessoa(id).then(function (response) {
            $scope.pessoa = response.data;
            $scope.Nome = $scope.pessoa.nome;
            $scope.Cpf = $scope.pessoa.cpf;
            $scope.Email = $scope.pessoa.email;
            $scope.Nascimento = new Date($scope.pessoa.nascimento);
        });
    }


    $scope.ListarPessoas = function () {

        
        $http({
            method: 'get',
            url: 'Pessoa/ListarPessoas'
        }).then(function(response){
            
            $scope.Pessoas = response.data;
        })
    };

    $scope.SalvarPessoa = function (){
        
        $scope.pessoa = {};
        $scope.pessoa.Nome = $scope.Nome;
        $scope.pessoa.Cpf = $scope.Cpf;
        $scope.pessoa.Email = $scope.Email;
        $scope.pessoa.Nascimento = $scope.Nascimento;

            servicePessoa.SalvarPessoa($scope.pessoa).then(function(response) {
                console.log(response);
            });
    };

}]);