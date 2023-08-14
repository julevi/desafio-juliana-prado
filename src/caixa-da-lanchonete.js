class CaixaDaLanchonete {

    cardapioDaLanchonete = {
        "cafe": {
            descricao: "Café",
            valor: 3.00,
        },
        "chantily": {
            descricao: "Chantily (Extra do Café)",
            valor: 1.50,
        },
        "suco": {
            descricao: "Suco Natural",
            valor: 6.20,
        },
        "sanduiche": {
            descricao: "Sanduíche",
            valor: 6.50,
        },
        "queijo": {
            descricao: "Queijo (Extra do Sanduíche)",
            valor: 2.00,
        },
        "salgado": {
            descricao: "Salgado",
            valor: 7.25,
        },
        "combo1": {
            descricao: "1 Suco e 1 Sanduíche",
            valor: 9.50,
        },
        "combo2": {
            descricao: "1 Café e 1 Sanduíche",
            valor: 7.50,
        },
    };

    formaDePagamento = {
        "debito": true,
        "credito": true,
        "dinheiro": true,
    };

    desconto(valor, formaDePagamento) {
        if (formaDePagamento === "dinheiro" || formaDePagamento === "debito") {
            return valor * 0.05;
        } else if (formaDePagamento === "credito") {
            return valor * 0.03;
        } else {
            return 0;
        }
    }

    verificarItensPrincipais(itens) {
        for (const item of itens) {
            const [codigo, _] = item.split(',');

            if ((codigo === "queijo" && !itens.includes("sanduiche")) ||
                (codigo === "chantily" && !itens.includes("cafe"))) {
                return "Item extra não pode ser pedido sem o principal";
            }
        }
        return null;
    }

    naoExisteItens(itens) {
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }
        return null;
    }

    itemPedidoIgualAZero(itens) {
        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');

            if (parseInt(quantidade) === 0) {
                return "Quantidade inválida!";
            }
        }
        return null;
    }

    codigoNaoExiste(codigo) {
        if (!this.cardapioDaLanchonete.hasOwnProperty(codigo)) {
            return "Item inválido!";
        }
        return null;
    }

    naoExisteFormaDePagamento(formaDePagamento){
        if (!this.formaDePagamento.hasOwnProperty(formaDePagamento)) {
            return "Forma de pagamento inválida!";
        }
        return null;
    }
    

    calcularValorDaCompra(metodoDePagamento, itens) {
        return "";
    }
}

export { CaixaDaLanchonete };
