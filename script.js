// Declaração de variáveis: Var, let e const

    // Var

function exemplo() {
    var x = 10;
    if (true) {
    	var x = 20;
    	console.log(x); // 20
    }
    console.log(x); // 20
}

        // A variável x foi redeclarada dentro do bloco if e o valor foi alterado.

    // Let

function exemplo() {
    let x = 10;
    if (true) {
        let x = 20;
        console.log(x); // 20
    }
    console.log(x); // 10
}

        // A variável x foi redeclarada dentro do bloco if, mas o valor original foi mantido fora do bloco.

    // Const.

function exemplo() {
    const x = 10;
    x = 20; // Erro: Assignment to constant variable.
    console.log(x); // 10
}
        // Tentar alterar o valor de uma constante gera um erro.
