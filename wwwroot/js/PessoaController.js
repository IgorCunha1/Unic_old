
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

    service.DeletarPessoa = function (id) {
        return $http.post(`Pessoa/DeleteConfirmed/${id}`);
    }

    return service;
}]);

app.controller('PessoaController', ['$scope','$http', 'servicePessoa', function ($scope, $http, servicePessoa){

    $scope.DeletarPessoa = function (id) {

        Swal.fire({
            title: 'Você Gostaria de Deletar esse cadastro?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Salvar',
            denyButtonText: 'Cancelar',          
        }).then((result) => {
            console.log(result);
            if (result.isConfirmed) {
                servicePessoa.DeletarPessoa(id).then(function (response) {
                    Swal.fire('Saved!', '', 'success');
                });
            } else if (result.isDenied) {
                Swal.fire('O Usuário não foi deletado', '', 'info')
            }
        });
       
    }

    

    $scope.EditarPessoa = function () {
        $scope.pessoa = {};
        $scope.pessoa.Id = $scope.Id;
        $scope.pessoa.Nome = $scope.Nome;   
        $scope.pessoa.Email = $scope.Email;
        $scope.pessoa.Nascimento = $scope.Nascimento;
        $scope.pessoa.Cpf = $scope.Cpf;
        

        servicePessoa.EditarPessoa($scope.pessoa).then(function (response) {
            $scope.Id = '';
            $scope.Nome = '';
            $scope.Email = '';
            $scope.Nascimento = '';
            $scope.Cpf = '';

            Swal.fire(
                'GoodJob!'
            );

            $scope.ListarPessoas();
        });
    }

    $scope.SelecionarPessoa = function (id) {
        $scope.pessoa = {};
        servicePessoa.SelecionarPessoa(id).then(function (response) {
            $scope.pessoa = response.data;
            $scope.Id = $scope.pessoa.id;
            $scope.Nome = $scope.pessoa.nome;
            $scope.Cpf = $scope.pessoa.cpf;
            $scope.Email = $scope.pessoa.email;
            $scope.Nascimento = new Date($scope.pessoa.nascimento);
            document.getElementById('botaoSalvar').style.display = 'none';
            document.getElementById('botaoEditar').style.display = 'block';
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
                if(response.data == 'Sucesso'){
                    Swal.fire('Cliente Salvo Com Sucesso', '', 'success');
                    $scope.ListarPessoas();
                }else{
                    Swal.fire('Não Foi possivel Salvar o Usuário', '', 'info')
                }
            });
    };

}]);