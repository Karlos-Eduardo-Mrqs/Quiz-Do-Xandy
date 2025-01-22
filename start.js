document.addEventListener('DOMContentLoaded',()=>{
    const btnComecar = document.getElementById("comecarQuiz");
    const faqSection = document.querySelector(".faq");
    const quizSection = document.querySelector(".questoes");

    btnComecar.addEventListener("click", () => {
        faqSection.style.display = "none";
        quizSection.style.display = "block";
    });
});