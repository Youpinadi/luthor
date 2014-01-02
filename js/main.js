function MainCtrl($scope, $sce) {
    $scope.tokens = [];
    $scope.mini_whitespaces = false;

    $scope.input = "variable1 >\t5;\ni == 2;\n1 + 2 = 3;\ntoto = \"pouet\"; yo = 'hello'";

    $scope.findTokens = function()
    {
        $scope.tokens = Lexer.tokenize($scope.input);
    }

    $scope.displayWhitespaces = function(str)
    {
        return str.replace(/\n/g, '\\n').replace(/\t/g, '\\t');
    }

    $scope.findTokens();
}