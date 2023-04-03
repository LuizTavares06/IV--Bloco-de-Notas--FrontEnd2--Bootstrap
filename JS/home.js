//VERIFICAÇÃO DE LOGIN
let usuarioLogado = JSON.parse(sessionStorage.getItem("UsuarioLogado" ?? "null"));
if (!usuarioLogado) {
    alert("Você precisa estar logado para utilizar essa aplicação!");
    window.location.href = "index.html";
};
//LIMPAR EXEMPLOS
document.getElementById('removeEx1').addEventListener('click', () => {
    document.getElementById('exRecado1').remove();
})
document.getElementById('removeEx2').addEventListener('click', () => {
    document.getElementById('exRecado2').remove();
})

//CARREGAR DADOS DO USUARIO
document.getElementById('tituloHome').innerHTML = `Olá ${usuarioLogado.nomeUsuario}!`;
document.addEventListener('DOMContentLoaded', () => {
    const recadosUsuarioLogado = pegarRecadosUsuario();
    if (recadosUsuarioLogado.length > 0) {
        limparExemplos();
        carregarDadosUsuario();
    }
})

function carregarDadosUsuario() {
    const recadosUsuarioLogado = pegarRecadosUsuario();
    for (recado of recadosUsuarioLogado) {
        criarRecadoHTML(recado);
    }
}

//CHAMA CRIAR RECADO
const btnChamaCriarRecado = document.getElementById('chamaCriarRecado')
const modalCriarRecado = document.getElementById('modalCriarRecado');

btnChamaCriarRecado.addEventListener('click', () => {
    modalCriarRecado.classList.add('scale-up-center');
})

//CRIAR NOVO RECADO
// const modalCriarRecado = new bootstrap.Modal(('modalCriarRecado'), {});
const btnCriarRecado = document.getElementById('btnCriarRecado');
btnCriarRecado.addEventListener('click', confereCriarRecado);

const labelIdRecado = document.getElementById('labelIdRecado');
const idRecado = document.getElementById('idRecado');
idRecado.addEventListener('mouseenter', () => {
    labelIdRecado.innerHTML = 'Identificador:';
    labelIdRecado.removeAttribute('style');
    idRecado.removeAttribute('style');
})

const labelTituloRecado = document.getElementById('labelTituloRecado');
const tituloRecado = document.getElementById('tituloRecado');
tituloRecado.addEventListener('mouseenter', () => {
    labelTituloRecado.innerHTML = 'Escolha um título:';
    labelTituloRecado.removeAttribute('style');
    tituloRecado.removeAttribute('style');
})

const labelDescricaoRecado = document.getElementById('labelDescricaoRecado');
const descricaoRecado = document.getElementById('descricaoRecado');
descricaoRecado.addEventListener('mouseenter', () => {
    labelDescricaoRecado.innerHTML = 'Descrição do recado:';
    labelDescricaoRecado.removeAttribute('style');
    descricaoRecado.removeAttribute('style');
})

function confereCriarRecado(e) {
    e.preventDefault()
    if (idRecado.value === "") {
        idRecado.setAttribute('style', 'background-color: #ff9999');
        labelIdRecado.innerHTML = "Você deve adicionar um identificador!";
        labelIdRecado.setAttribute('style', 'color: #ff9999');
        return
    }

    if (tituloRecado.value === "") {
        tituloRecado.setAttribute('style', 'background-color: #ff9999');
        labelTituloRecado.innerHTML = "Você deve adicionar um titulo!";
        labelTituloRecado.setAttribute('style', 'color: #ff9999');
        return
    }

    if (descricaoRecado.value === "") {
        descricaoRecado.setAttribute('style', 'background-color: #ff9999');
        labelDescricaoRecado.innerHTML = "Você deve adicionar uma descrição!";
        labelDescricaoRecado.setAttribute('style', 'color: #ff9999');
        return
    }
    const novoRecado = {
        id: idRecado.value,
        titulo: tituloRecado.value,
        descricao: descricaoRecado.value
    }

    const recadosUsuario = pegarRecadosUsuario();
    const existeId = recadosUsuario.some((recado) => recado.id === idRecado.value);
    if (existeId) {
        alert('Já existe um recado com esse ID, por favor tente com outro número.')
        return
    }

    limparExemplos()
    recadosUsuario.push(novoRecado);
    salvarRecadosUsuario(recadosUsuario);
    criarRecadoHTML(novoRecado);
}

function criarRecadoHTML(recado) {
    const espacoRecados = document.getElementById('espacoRecados');

    const novoRecado = document.createElement('div');
    novoRecado.setAttribute('id', `recado${recado.id}`);
    novoRecado.setAttribute('class', 'col-sm-6 mb-3 mb-sm-0 ');

    const novoCard = document.createElement('div');
    novoCard.setAttribute('class', 'card m-2');

    const novoCardBody = document.createElement('div');
    novoCardBody.setAttribute('class', 'card-body');

    const novoTituloRecado = document.createElement('h5');
    novoTituloRecado.setAttribute('class', 'overflow-hidden card-title');
    novoTituloRecado.innerHTML = `${recado.titulo}`;

    const novaDescricao = document.createElement('p');
    novaDescricao.setAttribute('class', 'card-text');
    novaDescricao.innerHTML = `${recado.descricao}`;

    const rowDosBotoes = document.createElement('div');
    rowDosBotoes.setAttribute('class', 'row');
    const colDosBotoes = document.createElement('div');
    colDosBotoes.setAttribute('class', 'col-12 justify-content-between');

    const btnApagar = document.createElement('button');
    btnApagar.setAttribute('class', 'btn btn-danger me-1');
    btnApagar.setAttribute('type', 'button');
    btnApagar.setAttribute('data-bs-target', '#modalApagar');
    btnApagar.setAttribute('data-bs-toggle', 'modal');
    btnApagar.addEventListener('click', (e) => {
        e.preventDefault();
        apagarRecado(recado);
    });
    btnApagar.innerHTML = "APAGAR";

    const btnEditar = document.createElement('button');
    btnEditar.setAttribute('class', 'btn btn-success');
    btnEditar.setAttribute('type', 'button');
    btnEditar.setAttribute('data-bs-toggle', 'modal');
    btnEditar.setAttribute('data-bs-target', '#modalEditarRecado');
    btnEditar.addEventListener('click', (e) => {
        e.preventDefault();
        editarRecado(recado);
    });
    btnEditar.innerHTML = "EDITAR";

    espacoRecados.appendChild(novoRecado);
    novoRecado.appendChild(novoCard);
    novoCard.appendChild(novoCardBody);
    novoCardBody.appendChild(novoTituloRecado);
    novoCardBody.appendChild(novaDescricao);
    novoCardBody.appendChild(rowDosBotoes);
    rowDosBotoes.appendChild(colDosBotoes);
    colDosBotoes.appendChild(btnApagar);
    colDosBotoes.appendChild(btnEditar);

    // modalCriarRecado.hide();
}

//EDITAR RECADO
const idEdit = document.getElementById('idEditarRecado');
const tituloEdit = document.getElementById('tituloEditarRecado');
const descricaoEdit = document.getElementById('descricaoEditarRecado');

function editarRecado(recado) {
    idEdit.value = recado.id;
    tituloEdit.value = recado.titulo;
    descricaoEdit.value = recado.titulo;

    document.getElementById('btnEditarRecado').addEventListener('click', (e) => {
        e.preventDefault();
        salvarRecadoEdit(idEdit.value)
    })
}

function salvarRecadoEdit(idEdit) {
    console.log("entrou no salvarEdit")
    let recadosUsuario = pegarRecadosUsuario();
    const indexEdit = recadosUsuario.findIndex((recado) => {
        return recado.id === idEdit
    })

    if (indexEdit >= 0) {
        const recadoEdit = {
            id: idEdit,
            titulo: tituloEdit.value,
            descricao: descricaoEdit.value
        }

        recadosUsuario.splice(indexEdit, 1, recadoEdit)
    }
    alert('Recado editado com sucesso!')
    salvarRecadosUsuario(recadosUsuario)
    window.location.href = 'home.html'
}

//APAGAR RECADO
function apagarRecado(recadoApagar) {
    document.getElementById('textoApagar').innerHTML = `Tem certeza que deseja apagar o recado ${recadoApagar.id}? O mesmo será excluído permanentemente!`
    document.getElementById('btnApagarRecado').addEventListener('click', () => {
        const recadosUsuario = pegarRecadosUsuario();
        const indexApagar = recadosUsuario.findIndex((recado) => {
            return recado.id === recadoApagar.id
        })
        if (indexApagar >= 0) {
            recadosUsuario.splice(indexApagar, 1)
            alert("Recado apagado com sucesso");
            salvarRecadosUsuario(recadosUsuario)
            document.getElementById(`recado${recadoApagar.id}`).remove();
        }
    })
}

//FUNCOES GLOBAIS
function buscarListaUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios" || []))
}

function salvarRecadosUsuario(listaRecados) {
    const listaUsuarios = buscarListaUsuarios();
    const indiceUser = indiceUsuarioLogado();
    listaUsuarios[indiceUser].recadosUsuario = listaRecados;
    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios))
}

function pegarRecadosUsuario() {
    const listaUsuarios = buscarListaUsuarios();
    const indiceUser = indiceUsuarioLogado();
    return listaUsuarios[indiceUser].recadosUsuario;
}

function indiceUsuarioLogado() {
    const listaUsuarios = buscarListaUsuarios();
    const indiceUser = listaUsuarios.findIndex((usuario) => {
        return usuario.emailUsuario === usuarioLogado.emailUsuario
    });

    return indiceUser
}

function limparExemplos() {
    document.getElementById('exRecado1').remove();
    document.getElementById('exRecado2').remove();
}

//LOGOUT
const btnLogOut = document.getElementById('btnLogOut');
btnLogOut.addEventListener('click', () => {
    sessionStorage.setItem("UsuarioLogado", "null");
    window.location.href = "index.html"
})