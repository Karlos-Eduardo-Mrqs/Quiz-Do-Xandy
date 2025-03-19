document.addEventListener('DOMContentLoaded', () => {
    const btnComecar = document.getElementById("comecarQuiz");
    const faqSection = document.querySelector(".faq");
    const quizSection = document.querySelector(".questoes");

    btnComecar.addEventListener("click", () => {
        // Oculta a seção de FAQ e exibe a seção de perguntas
        faqSection.style.display = "none";
        quizSection.style.display = "block";

        // Rola a página para o topo
        window.scrollTo({
            top: 0, // Vai para o topo da página
            behavior: 'smooth' // Adiciona uma animação suave (opcional)
        });
    });
});