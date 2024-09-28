document.addEventListener('DOMContentLoaded', function() {
    const formContainer = document.querySelector('.form-container');
    const landingPageBtn = document.getElementById('landingPageBtn');
    const virtualStoreBtn = document.getElementById('virtualStoreBtn');
    const landingPageForm = document.getElementById('landingPageForm');
    const virtualStoreForm = document.getElementById('virtualStoreForm');
    const successMessage = document.getElementById('success-message');
    const virtualStoreSuccessMessage = document.getElementById('virtual-store-success-message');
    const logo = document.getElementById('logo');
    const welcomeText = document.getElementById('welcome');
    const buttonsContainer = document.getElementById('buttons');

    // Exibir logo e texto de "Bem-vindo"
    setTimeout(() => logo.classList.add('show'), 500);
    setTimeout(() => welcomeText.classList.add('show'), 1000);
    setTimeout(() => welcomeText.classList.remove('show'), 2100);
    setTimeout(() => buttonsContainer.classList.add('show'), 2600);

    // Função para mostrar o formulário baseado no tipo de botão clicado
    function showForm(formType) {
        landingPageBtn.style.display = 'none';
        virtualStoreBtn.style.display = 'none';
        formContainer.style.display = 'flex';

        if (formType === 'landing') {
            landingPageForm.style.display = 'block';
        } else if (formType === 'loja') {
            virtualStoreForm.style.display = 'block';
        }
    }

    // Botões para escolha do tipo de formulário
    landingPageBtn.addEventListener('click', () => showForm('landing'));
    virtualStoreBtn.addEventListener('click', () => showForm('loja'));

    // Função para navegação de formulário (Landing Page)
    function handleFormSteps(form, steps) {
        let currentStep = 0;
        const nextBtns = form.querySelectorAll('.next-btn');

        nextBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                const input = steps[currentStep].querySelector('input');
                if (input.value === '') {
                    alert('Preencha o campo antes de continuar.');
                } else {
                    steps[currentStep].classList.add('out');
                    setTimeout(() => {
                        steps[currentStep].classList.remove('active', 'out');
                        steps[currentStep].style.display = 'none';
                        currentStep++;
                        if (currentStep < steps.length) {
                            steps[currentStep].style.display = 'flex';
                            setTimeout(() => {
                                steps[currentStep].classList.add('active');
                            }, 50);
                        }
                    }, 500);
                }
            });
        });
    }

    const landingPageSteps = landingPageForm.querySelectorAll('.form-step');
    const virtualStoreSteps = virtualStoreForm.querySelectorAll('.form-step');

    handleFormSteps(landingPageForm, landingPageSteps);
    handleFormSteps(virtualStoreForm, virtualStoreSteps);

    // Função de envio do formulário usando Formspree (Landing Page)
    landingPageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = new FormData(landingPageForm);
        fetch(landingPageForm.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        }).then(() => {
            landingPageForm.reset();
            successMessage.style.display = 'block';
        }).catch(() => alert('Erro ao enviar. Tente novamente.'));
    });

    // Função de envio do formulário usando Formspree (Loja Virtual)
    virtualStoreForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = new FormData(virtualStoreForm);
        fetch(virtualStoreForm.action, {
            method: 'POST',
            body: data,
            headers: { 
                'Accept': 'application/json'
            }
        }).then(() => {
            virtualStoreForm.reset();
            virtualStoreSuccessMessage.style.display = 'block';
        }).catch(() => alert('Erro ao enviar. Tente novamente.'));
    });
});
