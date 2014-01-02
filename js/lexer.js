var Lexer =
{
	input: null,
	classes:
	{
		whitespace: /^(\t| |\n)+/,
		keyword: /^(if|else|fi)/,
		integer: /^([0-9]+)/,
		string: /^("[^"]*"|'[^']*')/,
		semicolumn: /^(;)/,
		operator: /^(\+|\-|\*|\/)/,
		assignment: /^(=)/,
		comparison: /^(\=\=\=?|>\=?|<\=?|\!\=)/,
		identifier: /^([a-z][a-z0-9]*)/i
	},
	lexingOrder: [
		'whitespace',
		'comparison',
		'assignment',
		'semicolumn',
		'keyword',
		'integer',
		'string',
		'operator',
		'identifier'
	],
	test: function()
	{
		var tests =
		{
			whitespace: [' ', '	', ' 	'],
			keyword: ['if', 'else', 'fi'],
			string: ['"Voila une belle phrase 2014"', "'Voila une belle phrase 2014'"],
			comparison: ['==', '===', '!=', '!==', '>=', '<='],
			integer: [0, 1, 12, 01],
			operator: ['+', '-', '*', '/'],
			semicolumn: [';'],
			identifier: ['a', 'a12', 'coucou']
		}

		for (i in tests)
		{
			console.log('Testing ' + i);
			var test = tests[i];
			for (t in test)
			{
				console.log('test "' + test[t] + '" against ' + this.classes[i] + ':', test[t].toString().match(this.classes[i]) != null);
			}
		}
	},
	getNextToken: function()
	{
		console.log('Looking for in "' + this.input + '": ');
		var i = 0;
		for (i in this.lexingOrder)
		{
			var tokenClass = this.lexingOrder[i];
			var regex = this.classes[tokenClass];
			var res = this.input.match(regex);
			if (res)
			{
				console.log(tokenClass + ' was found => ' + res[0]);
				this.input = this.input.slice(res[0].length, this.input.length);
				console.log(this.input);
				return {tokenClass: tokenClass, lexeme: res[0]};
			}
		}
		return false;
	},
	tokenize: function(input)
	{
		this.input = input;
		var tokens = [];
		console.log('Lexing : ' + this.input);

		while(this.input.length > 0)
		{
			var token = this.getNextToken();
			if (token)
			{
				tokens.push(token);
			}
			else
			{
				console.log("Lexing error after " + tokens[tokens.length - 1]);
				break;
			}
		}
		return tokens;
	}
}

	Lexer.test();
