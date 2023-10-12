function palavraAleatoria() {
    const palavras = ["TERMO", "NEGRO", "MEXER", "LIVRO", "MUITO", "PRAIA", "TROCA", "PLENA", "VIGOR", "PODER"];
    const indiceAleatorio = Math.floor(Math.random() * palavras.length);
    return palavras[indiceAleatorio];
}


// Palavra secreta
const secretWord = palavraAleatoria();

// Array para armazenar as letras já utilizadas
const usedKeys = [];

// Número de tentativas
let attempts = 6;

function reiniciar() {
    document.getElementById("letter1").value = ""
    document.getElementById("letter2").value = ""
    document.getElementById("letter3").value = ""
    document.getElementById("letter4").value = ""
    document.getElementById("letter5").value = ""
    document.getElementById("letter1").focus();
    document.querySelector(".card").style.display = "flex";
    document.getElementById("notification").style.display = "none";
}
const inputElement1 = document.getElementById("letter1");
const inputElement2 = document.getElementById("letter2");
const inputElement3 = document.getElementById("letter3");
const inputElement4 = document.getElementById("letter4");
const inputElement5 = document.getElementById("letter5");
inputElement1.addEventListener("input", function () {
    this.value = this.value.toUpperCase();
});
inputElement2.addEventListener("input", function () {
    this.value = this.value.toUpperCase();
});
inputElement3.addEventListener("input", function () {
    this.value = this.value.toUpperCase();
});
inputElement4.addEventListener("input", function () {
    this.value = this.value.toUpperCase();
});
inputElement5.addEventListener("input", function () {
    this.value = this.value.toUpperCase();
});



const input = document.getElementById("letter5");

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Impede o envio do formulário
        document.getElementById("checkButton").click(); // Aciona o botão "Check"
    }
});




// Adiciona um ouvinte de evento ao botão "Check" para chamar a função checkWord quando clicado
document.getElementById("checkButton").addEventListener("click", function () {

    
    // Função para atualizar a exibição das letras utilizadas
    function updateUsedKeysDisplay() {
        const usedKeysContainer = document.getElementById("used-keys");
        usedKeysContainer.textContent = "Letras utilizadas: " + usedKeys.join(", ");
    }

    // Obtém a tentativa do jogador a partir dos campos de entrada e converte para maiúsculas
    const guess = (
        document.getElementById("letter1").value +
        document.getElementById("letter2").value +
        document.getElementById("letter3").value +
        document.getElementById("letter4").value +
        document.getElementById("letter5").value
    ).toUpperCase();
    if (guess.length <= 4) {
        document.getElementById("notification").style.display = "block";
        // Esconde a seção de entrada de letras
        document.querySelector(".card").style.display = "none";
        setTimeout(reiniciar, 2000);

    } else {



        // Inicializa uma string vazia para armazenar o feedback da tentativa
        let feedback = "";
        // Inicializa uma variável para contar o número de letras corretas em suas posições corretas
        let correctLetters = 0;

        // Itera pelas letras da tentativa do jogador
        for (let i = 0; i < 5; i++) {
            usedKeys.push(guess[i]);
            updateUsedKeysDisplay();
            // Verifica se a letra na mesma posição da palavra secreta é igual à letra na tentativa
            if (guess[i] === secretWord[i]) {
                // Se for igual, a letra é exibida em verde e é uma letra correta em sua posição correta
                feedback += `<span class="palavra" id="certa">${guess[i]}</span>`;

                // Incrementa o contador de letras corretas
                correctLetters++;
            }
            // Se a letra não estiver na posição correta, mas estiver na palavra secreta
            else if (secretWord.includes(guess[i])) {
                // A letra é exibida em amarelo e é uma letra correta em uma posição incorreta
                feedback += `<span class="palavra" id="quaseCerta">${guess[i]}</span>`;

            }
            // Se a letra não estiver na palavra secreta
            else {
                // A letra é exibida em vermelho e é uma letra errada
                feedback += `<span class="palavra" id="errada">${guess[i]}</span>`;

            }
        }

        
        // Adiciona o feedback da tentativa ao elemento com o ID "feedback" no HTML
        document.getElementById("historico").innerHTML += `<div class="grupoLetras">${feedback}</div>`;

        // Verifica se o jogador adivinhou corretamente todas as letras
        if (correctLetters === 5) {
            // Se todas as letras estiverem corretas, exibe uma mensagem de vitória
            document.getElementById("feedback").innerHTML += "<p>Você venceu!</p> ";
            // Esconde a seção de entrada de letras
            document.querySelector(".card").style.display = "none";
            document.getElementById("reloadButton").style.display = "block";

            // Adiciona um ouvinte de evento de clique ao botão para recarregar a página
            document.getElementById("reloadButton").addEventListener("click", function () {
                window.location.href = window.location.href; // Recarrega a página quando o botão é clicado
            });
        }
        // Se o jogador usou todas as tentativas sem adivinhar corretamente
        else if (--attempts === 0) {
            // Exibe uma mensagem de derrota e revela a palavra secreta
            document.getElementById("feedback").innerHTML += "<p>You lost. The word was HELLO.</p>";
            // Esconde a seção de entrada de letras
            document.querySelector(".card").style.display = "none";
            document.getElementById("reloadButton").style.display = "block";

            // Adiciona um ouvinte de evento de clique ao botão para recarregar a página
            document.getElementById("reloadButton").addEventListener("click", function () {
                window.location.href = window.location.href; // Recarrega a página quando o botão é clicado
            });
        }
        document.getElementById("letter1").value = ""
        document.getElementById("letter2").value = ""
        document.getElementById("letter3").value = ""
        document.getElementById("letter4").value = ""
        document.getElementById("letter5").value = ""
        document.getElementById("letter1").focus();

    }
});

// Adicione um ouvinte de evento de teclado a cada campo de entrada
document.getElementById("letter1").addEventListener("input", function (e) {
    if (e.data === null || e.data.length === 0) {
        // Verifique se a entrada foi apagada (e.data === null) ou se a entrada é vazia
        // Se sim, mova o foco para o campo anterior (nenhum valor digitado)
        document.getElementById("letter1").blur();
        document.getElementById("letter1").value = "";
        document.getElementById("letter5").focus();
    } else if (this.value.length === 1) {
        // Quando uma letra for digitada (apenas 1 caractere), mova o foco para o próximo campo (letter2)
        document.getElementById("letter2").focus();
    }
});

document.getElementById("letter2").addEventListener("input", function (e) {
    if (e.data === null || e.data.length === 0) {
        document.getElementById("letter2").blur();
        document.getElementById("letter2").value = "";
        document.getElementById("letter1").focus();
    } else if (this.value.length === 1) {
        document.getElementById("letter3").focus();
    }
});

document.getElementById("letter3").addEventListener("input", function (e) {
    if (e.data === null || e.data.length === 0) {
        document.getElementById("letter3").blur();
        document.getElementById("letter3").value = "";
        document.getElementById("letter2").focus();
    } else if (this.value.length === 1) {
        document.getElementById("letter4").focus();
    }
});

document.getElementById("letter4").addEventListener("input", function (e) {
    if (e.data === null || e.data.length === 0) {
        document.getElementById("letter4").blur();
        document.getElementById("letter4").value = "";
        document.getElementById("letter3").focus();
    } else if (this.value.length === 1) {
        document.getElementById("letter5").focus();
    }
});

document.getElementById("letter5").addEventListener("input", function (e) {
    if (e.data === null || e.data.length === 0) {
        document.getElementById("letter5").blur();
        document.getElementById("letter5").value = "";
        document.getElementById("letter4").focus();
    } else if (this.value.length === 1) {
        // Quando uma letra for digitada no último campo, não mova o foco para o próximo
    }
});


