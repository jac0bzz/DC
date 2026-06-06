document.addEventListener('DOMContentLoaded', () => {
    const langSelectors = document.querySelectorAll('.lang-switch span, .lang-switch a');

    const dictionary = {
        'index.html': 'templates/translate/enindex.html',
        'cookies.html': 'templates/translate/encookies.html',
        'links.html': 'templates/translate/enlinks.html',
        'politicas.html': 'templates/translate/enpoliticas.html',
        'tarjetas.html': 'templates/translate/entarjetas.html',
        'terminos.html': 'templates/translate/enterminos.html',

        'enindex.html': 'index.html',
        'encookies.html': 'templates/cookies.html',
        'enlinks.html': 'templates/links.html',
        'enpoliticas.html': 'templates/politicas.html',
        'entarjetas.html': 'templates/tarjetas.html',
        'enterminos.html': 'templates/terminos.html'
    };

    langSelectors.forEach(btn => {
        btn.addEventListener('click', (e) => {
            try {
                const targetLang = e.target.textContent.trim().toUpperCase();

                if (targetLang !== 'EN' && targetLang !== 'ES') {
                    return;
                }

                e.preventDefault();

                let currentFilename = window.location.pathname.split('/').pop().toLowerCase();

                if (!currentFilename || currentFilename === '') {
                    currentFilename = 'index.html';
                }

                const isEnglishPage = currentFilename.startsWith('en');

                if (targetLang === 'EN' && isEnglishPage) {
                    return;
                }

                if (targetLang === 'ES' && !isEnglishPage) {
                    return;
                }

                const destination = dictionary[currentFilename];

                if (destination) {
                    const repoName = window.location.pathname.split('/')[1];

                    if (
                        window.location.hostname.includes('github.io') &&
                        repoName
                    ) {
                        window.location.href =
                            `${window.location.origin}/${repoName}/${destination}`;
                    } else {
                        window.location.href = `/${destination}`;
                    }
                } else {
                    console.error(
                        'No se encontró una ruta para:',
                        currentFilename
                    );
                }
            } catch (error) {
                console.error('Error al cambiar idioma:', error);
            }
        });
    });
});