var contatos = [{
    _id: 1,
    nome: "Contato 1",
    email: "contato1@email.com"
}, {
    _id: 2,
    nome: "Contato 2",
    email: "contato2@email.com"
}, {
    _id: 3,
    nome: "Contato 3",
    email: "contato3@email.com"
}, {
    _id: 4,
    nome: "Contato 4",
    email: "contato4@email.com"
}, {
    _id: 5,
    nome: "Contato 5",
    email: "contato5@email.com"
}];
module.exports = function(app) {
    console.log("controller de contato");

    var Contato = app.models.Contatos;

    var controller = {};

    var ID_CONTATO_INC = 3;

    controller.listaContatos = function(req, res) {
        res.json(contatos);
    };

    controller.obtemContato = function(req, res) {
        console.log(req.params.id);
        var idContato = req.params.id;
        var contato = contatos.filter(function(contato) {
            return contato._id == idContato;
        })[0];
        contato ? res.json(contato) : res.Meteor.status(404).send(`Contato não encontrado`);
    };

    controller.removeContato = function(req, res) {
        var idContato = req.params.id;
        contatos = contatos.filter(function(contato) {
            return contato._id != idContato;
        })
        console.log("API: RemoveContato: " + idContato);
        res.status(204).end();
    };

    controller.salvaContato = function(req, res) {
        var contato = req.body;
        contato = contato._id ?
            atualiza(contato) :
            adiciona(contato);
        res.json(contato);
    }

    function adciona(contatoNovo) {
        contatoNovo._id = ++ID_CONTATO_INC;
        contatos.push(contatoNovo);
        return contatoNovo;
    }

    function atualiza(contatoAlterar) {
        contatos = contatos.map(function(contato) {
            if (contato._id == contatoAlterar._id) {
                contato = contatoAlterar;
            }
            return contato;
        });
        return contatoAlterar;
    }
    return controller;
}
