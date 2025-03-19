document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio do formulário

    // Gabarito de respostas
    const respostasCertas = {
        pergunta1: "HTML",pergunta2: "HTTP",pergunta3: ".js",pergunta4: "java",pergunta5: "alt",
        pergunta6: "âncora",pergunta7: ["CSS", "SCSS"],pergunta8: "list-style-image",pergunta9: "text-align",
        pergunta10: "alert()",perguntaBonus: "[4, 6]"
    };

    let pontuacao = 0; // Armazena a pontuação
    const totalQuestoes = Object.keys(respostasCertas).length;

    const gabarito = document.querySelector('.gabarito');
    const quizSection = document.querySelector('.questoes');
    gabarito.style.display = 'none'; // Oculta o gabarito inicialmente

    const perguntasObrigatorias = [
        'pergunta1','pergunta2','pergunta3','pergunta4','pergunta5',
        'pergunta6','pergunta7','pergunta8','pergunta9','pergunta10'
    ];

    let perguntasEmBranco = []; // Array para armazenar as perguntas não respondidas

    // Verificar se há perguntas em branco
    perguntasObrigatorias.forEach(pergunta => {
        const elementos = document.getElementsByName(pergunta);

        if (elementos.length > 0) {
            if (['radio', 'checkbox'].includes(elementos[0].type)) {
                const algumMarcado = Array.from(elementos).some(el => el.checked);
                if (!algumMarcado) {
                    perguntasEmBranco.push(pergunta); // Adiciona a pergunta ao array
                }
            } else if (elementos[0].type === 'text' && elementos[0].value.trim() === '') {
                perguntasEmBranco.push(pergunta); // Adiciona a pergunta ao array
            }
        }
    });

    // Mostrar mensagem de erro se houver questões em branco
    if (perguntasEmBranco.length > 0) {
        const listaPerguntas = perguntasEmBranco.join(', '); // Junta as perguntas em uma lista
        const mensagem = `Você deixou ${perguntasEmBranco.length} questões em branco (Questões: ${listaPerguntas})`;

        exibirMensagemPopup(mensagem);
        return; // Interrompe a execução caso as respostas sejam inválidas
    }

    // Função para verificar respostas do usuário
    const verificarResposta = (pergunta, respostaCerta) => {
        const respostasUsuario = document.querySelectorAll(`[name="${pergunta}"]:checked`);
        const inputTexto = document.querySelector(`[name="${pergunta}"]`);

        if (Array.isArray(respostaCerta)) {
            // Perguntas de múltipla escolha
            const respostasMarcadas = Array.from(respostasUsuario).map(el => el.value);
            return (
                respostasMarcadas.length === respostaCerta.length &&
                respostasMarcadas.sort().join(',') === respostaCerta.sort().join(',')
            );
        } else if (respostasUsuario.length > 0) {
            // Perguntas com uma única escolha (radio button)
            return respostasUsuario[0].value === respostaCerta;
        } else if (inputTexto) {
            // Perguntas de texto
            return inputTexto.value.trim().toLowerCase() === respostaCerta.toLowerCase();
        }
        return false;
    };

    // Calcular a pontuação
    for (let pergunta in respostasCertas) {
        if (verificarResposta(pergunta, respostasCertas[pergunta])) {
            pontuacao++;
        }
    }

    // Exibir pontuação
    const mensagemPontuacao = `Você acertou ${pontuacao} de ${totalQuestoes} questões!`;
    exibirMensagemPopup(mensagemPontuacao);

    // Exibir gabarito e avaliação
    exibirGabaritoEavaliacao(pontuacao, totalQuestoes, gabarito, quizSection);
});

// Função para exibir mensagens no popup
function exibirMensagemPopup(mensagem) {
    const popup = document.querySelector('.popup');
    const messagepop = document.querySelector('.messagepop');

    popup.style.display = 'block';
    messagepop.textContent = mensagem;

    setTimeout(() => {
        popup.style.display = 'none';
    }, 3200);
}

// Função para exibir o gabarito e a avaliação com base na pontuação
function exibirGabaritoEavaliacao(pontuacao, totalQuestoes, gabarito, quizSection) {
    const tabela = document.querySelector('.tabelapontuacao');
    const mensagem = tabela.querySelector('tfoot tr td');

    tabela.style.display = 'block'; // Tornar a tabela visível
    gabarito.style.display = 'block'; // Tornar o gabarito visível
    quizSection.style.display = 'none'; // Ocultar as questões

    if (pontuacao <= 2) {
        mensagem.textContent = "Não desista! Cada tentativa é válida.";
    } else if (pontuacao <= 5) {
        mensagem.textContent = "Você precisa melhorar, estude mais!";
    } else if (pontuacao <= 8) {
        mensagem.textContent = "Você está acima da média!";
    } else {
        mensagem.textContent = "Parabéns, você não fez mais que sua obrigação!";
    }
}