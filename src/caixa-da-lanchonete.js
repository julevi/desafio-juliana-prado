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

    verificarItensPrincipais(itens) {
        let temCafe = false;
        let temSanduiche = false;
        
        for (const item of itens) {
            const [codigo] = item.split(',');
    
            if (codigo === "cafe") {
                temCafe = true;
                break;
            }
        }

        for (const item of itens) {
            const [codigo] = item.split(',');
    
            if (codigo === "sanduiche") {
                temSanduiche = true;
                break;
            }
        }
        
        for (const item of itens) {
            const [codigo] = item.split(',');
    
            if (codigo === "queijo" && !temSanduiche) {
                return "Item extra não pode ser pedido sem o principal";
            }

            if (codigo === "chantily" && !temCafe) {
                return "Item extra não pode ser pedido sem o principal";
            }

        }
    
        return null;
    }
    
    verificarFormaDePagamento(formaDePagamento) {
        if (!this.formaDePagamento[formaDePagamento]) {
            return "Forma de pagamento inválida!";
        }
        return null;
    }

    naoExisteItens(itens) {
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }
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
    }

    formatarValorMonetario(valor) {
        return valor.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        const verificaItensPrincipais = this.verificarItensPrincipais(itens);
        const naoExisteItens = this.naoExisteItens(itens);
        const itemPedidoIgualAZero = this.itemPedidoIgualAZero(itens);
        const verificarFormaDePagamento = this.verificarFormaDePagamento(formaDePagamento);


        if (verificaItensPrincipais) {
            return verificaItensPrincipais;
        }

        if (verificarFormaDePagamento) {
            return verificarFormaDePagamento;
        }

        if (naoExisteItens) {
            return naoExisteItens;
        }

        if (itemPedidoIgualAZero) {
            return itemPedidoIgualAZero;
        }



        let valorTotal = 0;

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');

            if (this.codigoNaoExiste(codigo)) {
                return this.codigoNaoExiste(codigo);
            }

            valorTotal += this.cardapioDaLanchonete[codigo].valor * parseInt(quantidade);
        }


        if (formaDePagamento === "dinheiro") {
            valorTotal -= valorTotal * 0.05;
        } else if (formaDePagamento === "credito") {
            valorTotal += valorTotal * 0.03
        }
        return `R$ ${this.formatarValorMonetario(valorTotal)}`;

    }

}

export { CaixaDaLanchonete };
