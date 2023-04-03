// CHAMA MODAL CADASTRO
const btnChamaCriarConta = document.getElementById('chamaCriarConta');
const modalCadastro = document.getElementById('modalCadastro');

btnChamaCriarConta.addEventListener('click', () => {
    modalCadastro.classList.add('scale-up-center');
})

// CADASTRA USUARIO
const btnCriarConta = document.getElementById('btnCriarConta');
btnCriarConta.addEventListener('click', confereCriarConta);

const nomeCadastro = document.getElementById('nomeCadastro');
const labelNomeCadastro = document.getElementById('labelNomeCadastro');
nomeCadastro.addEventListener('mouseenter', () => { labelNomeCadastro.removeAttribute('style') });

const emailCadastro = document.getElementById('emailCadastro');
const labelEmailCadastro = document.getElementById('labelEmailCadastro');
emailCadastro.addEventListener('mouseenter', () => { labelEmailCadastro.removeAttribute('style') });

const senhaCadastro = document.getElementById('senhaCadatro');
const labelSenhaCadastro = document.getElementById('labelSenhaCadastro');
senhaCadastro.addEventListener('mouseenter', () => {
    labelSenhaCadastro.removeAttribute('style'),
        labelSenhaCadastro.innerHTML = "Senha", senhaCadastro.removeAttribute('style')
});

const confirmaSenhaCadastro = document.getElementById('confirmaSenhaCadastro')
const labelConfirmaSenhaCadastro = document.getElementById('labelConfirmaSenhaCadastro')
confirmaSenhaCadastro.addEventListener('mouseenter', () => {
    labelConfirmaSenhaCadastro.removeAttribute('style'),
        labelConfirmaSenhaCadastro.innerHTML = "Confirme sua senha", confirmaSenhaCadastro.removeAttribute('style')
});

function confereCriarConta(e) {
    e.preventDefault()
    if (nomeCadastro.value === "") {
        nomeCadastro.focus();
        nomeCadastro.setAttribute('style', 'background-color: #ff9999');
        labelNomeCadastro.setAttribute('style', 'color: #ff9999');
        return
    }

    if (emailCadastro.value === "") {
        emailCadastro.focus();
        emailCadastro.setAttribute('style', 'background-color: #ff9999');
        labelEmailCadastro.setAttribute('style', 'color: #ff9999');
        return
    }

    if (senhaCadastro.value === "") {
        senhaCadastro.focus();
        senhaCadastro.setAttribute('style', 'background-color: #ff9999');
        labelSenhaCadastro.setAttribute('style', 'color: #ff9999');
        return
    }

    if (confirmaSenhaCadastro.value === "") {
        confirmaSenhaCadastro.focus();
        confirmaSenhaCadastro.setAttribute('style', 'background-color: #ff9999');
        labelConfirmaSenhaCadastro.setAttribute('style', 'color: #ff9999');
        return
    }

    if (senhaCadastro.value != confirmaSenhaCadastro.value) {
        labelSenhaCadastro.setAttribute('style', 'color: #ff9999');
        labelConfirmaSenhaCadastro.setAttribute('style', 'color: #ff9999');
        labelSenhaCadastro.innerHTML = "As senhas não coincidem!";
        labelConfirmaSenhaCadastro.innerHTML = "As senhas não coincidem!";
    }

    verificarConta();
};

function verificarConta() {
    let usuarios = buscarListaUsuarios();
    let existeConta = usuarios.some((metaEmail) => metaEmail.emailUsuario === emailCadastro.value);

    if (existeConta) {
        alert('Este e-mail já está cadastrado no sistema')
        let emailLogin = document.getElementById("emailLogin")
        emailLogin.value = emailCadastro.value
        return
    };

    alert("Parabéns! Sua conta foi criada com sucesso.");
    //modalCadastro.hide(); // PRECISO DESCOBRIR COMO ESCONDER O MODAL DEPOIS DE CRIAR A CONTA
    criarContaNoStorage();
};


function criarContaNoStorage() {
    const listaUsuarios = buscarListaUsuarios()

    const nomeUsuario = nomeCadastro.value;
    const emailUsuario = emailCadastro.value;
    const senhaUsuario = senhaCadastro.value;
    const recadosUsuario = [];
    const usuario = {
        nomeUsuario,
        emailUsuario,
        senhaUsuario,
        recadosUsuario,

    };

    listaUsuarios.push(usuario);
    atualizarUsuarios(listaUsuarios);
    sessionStorage.setItem("UsuarioLogado", JSON.stringify(usuario));
    window.location.href = "./home.html";
};

function atualizarUsuarios(listaUsuarios) {
    return window.localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
};


// Fazer login
const emailLogin = document.getElementById('emailLogin');
const senhaLogin = document.getElementById('senhaLogin');
const btnFormLogin = document.getElementById('btnFormLogin');
btnFormLogin.addEventListener('click', confereLogin);

function confereLogin() {
    const usuaruios = buscarListaUsuarios();
    const email = emailLogin.value;
    const senha = senhaLogin.value;

    const usuario = usuaruios.find((metaEmail) => metaEmail.emailUsuario === email);

    if (!usuario) {
        alert("Não foi possivel encontrar uma conta com o email fornecido!")
        return
    };

    if (usuario.senhaUsuario != senha) {
        alert("A senha está incorreta. Por favor, tente novamente.")
        return
    };

    sessionStorage.setItem("UsuarioLogado", JSON.stringify(usuario));
    window.location.href = "./home.html";
}



//FUNÇÕES GLOBAIS
function buscarListaUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) ?? []
};