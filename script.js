let currentLang = 'ru';

function setLang(lang, btn) {
    currentLang = lang;
    document.body.className = 'lang-' + lang;
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.documentElement.lang = lang === 'kz' ? 'kk' : lang;

    // Update placeholder
    const input = document.getElementById('searchCompare');
    if (lang === 'kz') {
        input.placeholder = "Өзгерістер бойынша іздеу... (мысалы: өмір, құқық, сот)";
    } else if (lang === 'en') {
        input.placeholder = "Search changes... (e.g., life, rights, court)";
    } else {
        input.placeholder = "Поиск по изменениям... (например: жизнь, права, суд)";
    }

    filterTable(); // Re-apply filter on language switch
}

function filterTable() {
    const input = document.getElementById('searchCompare');
    const filter = input.value.toLowerCase();
    const tableId = 'table-' + currentLang;
    const table = document.getElementById(tableId);
    const tr = table.getElementsByTagName('tr');
    const noResults = document.getElementById('no-results-' + currentLang);
    let visibleCount = 0;

    for (let i = 1; i < tr.length; i++) {
        let text = tr[i].textContent || tr[i].innerText;
        if (text.toLowerCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
            visibleCount++;
        } else {
            tr[i].style.display = "none";
        }
    }

    noResults.style.display = (visibleCount === 0 && filter !== "") ? "block" : "none";
}
