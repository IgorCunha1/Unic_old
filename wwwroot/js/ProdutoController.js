var app = angular.module('Unic', []);

app.factory('serviceProduto', ['$http', function($http) {
    var service = {};

    service.salvarProduto = function (produto){
        return $http.post('Produto/SalvarProduto/', produto);
    };

    service.deletarProduto = function(produtoId){
        return $http.post('Produto/Delete/' + produtoId);
    };

    service.editarProduto = function(produto){
        return $http.post('Produto/Edit/', produto);
    };
    
    service.selecionarProduto = function(produtoId){
        return $http.get('Produto/SelecionarProduto/' + produtoId);
    };


    return service;
}]);

app.controller('ProdutoController', ['$scope','$http', 'serviceProduto', function ($scope, $http, serviceProduto) {
  
    
    $scope.exibirSalvar = function(){
        document.getElementById('botaoSalvar').style.display = 'block';
        document.getElementById('botaoEditar').style.display ='none';
    }
    
    $scope.exibirEditar = function(){
        document.getElementById('botaoSalvar').style.display = 'none';
        document.getElementById('botaoEditar').style.display = 'block';
    }
    $scope.LimparCampos = function(){
        $scope.Id = '';
        $scope.Descricao = '';
        $scope.PrecoCompra = '';
        $scope.PrecoVenda = '';
        $scope.Estoque = '';
    }

    $scope.exibirNovoProduto = function(){
        $scope.LimparCampos();
        $scope.exibirSalvar();
    };

    $scope.SalvarProduto = function () {

        $scope.produto = {};
        $scope.produto.descricao = $scope.Descricao;
        $scope.produto.precoCompra = $scope.PrecoCompra;
        $scope.produto.precoVenda = $scope.PrecoVenda;
        $scope.produto.estoque = $scope.Estoque;

        serviceProduto.salvarProduto($scope.produto).then(function (response){
                console.log(response);
                $scope.ListarProdutos();
                $scope.Descricao = '';
                $scope.PrecoCompra = '';
                $scope.PrecoVenda = '';
                $scope.Estoque = '';
            
        }, function(){
            $scope.Descricao = '';
            $scope.PrecoCompra = '';
            $scope.PrecoVenda = '';
            $scope.Estoque = '';
            
        });       
    };

    $scope.DeletarProduto = function (id){
        
        serviceProduto.deletarProduto(id).then(function(response){
                $scope.ListarProdutos();
        });
    };

    $scope.ListarProdutos = function () {
        $http({
            method: 'get',
            url: 'Produto/ListarProdutos',
        }).then(function (response) {
            $scope.produtos = response.data;
        }, function () {
            alert(response);
        })
    };

    $scope.SelecionarProduto = function(id){
        serviceProduto.selecionarProduto(id).then(function(response){
            $scope.produto = response.data;
            $scope.Id = $scope.produto.id;
            $scope.Descricao = $scope.produto.descricao;
            $scope.PrecoVenda = $scope.produto.precoVenda;
            $scope.PrecoCompra = $scope.produto.precoCompra;
            $scope.Estoque = $scope.produto.estoque;

            $scope.exibirEditar();
        });
    }

    $scope.EditarProduto = function(){
        $scope.produto = {};
        $scope.produto.id = $scope.Id;
        $scope.produto.descricao = $scope.Descricao;
        $scope.produto.precoCompra = $scope.PrecoCompra;
        $scope.produto.precoVenda = $scope.PrecoVenda;
        $scope.produto.estoque = $scope.Estoque;
        serviceProduto.editarProduto($scope.produto).then(function(response){
                $scope.ListarProdutos();
                $scope.Id = '';
                $scope.Descricao = '';
                $scope.PrecoCompra = '';
                $scope.PrecoVenda = '';
                $scope.Estoque = '';
        });
    }
/**
    $('#modalProduto').on('show.bs.modal', function(event){
        var btn = $(event.relatedTarget)
        var recipient = btn.data('relatedTarget');
    })
 */
}]);
