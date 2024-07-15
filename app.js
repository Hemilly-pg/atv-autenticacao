// Substitua as configurações do seu projeto Firebase abaixo
const firebaseConfig = {
  apiKey: "AIzaSyBJnsywyNHyaFjLe9Z-GeAvcApgtcCoEpo",
  authDomain: "autenticacao-b1e35.firebaseapp.com",
  projectId: "autenticacao-b1e35",
  storageBucket: "autenticacao-b1e35.appspot.com",
  messagingSenderId: "537049681535",
  appId: "1:537049681535:web:3a21a27243381d0e2ef94a",
  measurementId: "G-B6VY5NXKJ2"
};

// Inicializa o Firebase com as configurações fornecidas
firebase.initializeApp(firebaseConfig);

// Inicializa as variáveis auth e database para facilitar o acesso aos serviços do Firebase
const auth = firebase.auth();
const database = firebase.database();

document.getElementById('loginButton').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('password').value;

  try {
    await auth.signInWithEmailAndPassword(email, senha);
    document.getElementById('feedback').textContent = 'Login realizado com sucesso!';
  } catch (erro) {
    document.getElementById('feedback').textContent = `Erro: ${erro.message}`;
  }
});

document.getElementById('registerButton').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('password').value;

  try {
    validarEmail(email);
    validarSenha(senha);
    await auth.createUserWithEmailAndPassword(email, senha);
    document.getElementById('feedback').textContent = 'Cadastro realizado com sucesso!';
  } catch (erro) {
    document.getElementById('feedback').textContent = `Erro: ${erro.message}`;
  }
});

function validarEmail(email) {
  const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!padraoEmail.test(email)) {
    throw new Error('O email deve ter um formato válido.');
  }
}

function validarSenha(senha) {
  if (senha.length < 6) {
    throw new Error('A senha deve ter no mínimo 6 caracteres.');
  }
  if (senha.length > 10) {
    throw new Error('A senha deve ter no máximo 10 caracteres.');
  }
  if (!/[a-zA-Z]/.test(senha)) {
    throw new Error('A senha deve conter pelo menos uma letra.');
  }
  if (!/\d/.test(senha)) {
    throw new Error('A senha deve conter pelo menos um número.');
  }
}