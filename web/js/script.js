document.addEventListener("DOMContentLoaded", function () {
    const articles = document.querySelectorAll("article");
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.container');
    const menuBtn = document.querySelector('.open-menu-btn');
    const menuIcon = document.querySelector('.open-menu-btn i');

    let articleCount = articles.length;
    let totalHeight = 0;
    let totalHeadingLength = 0;

    articles.forEach(article => {
        const headings = article.querySelectorAll("h2");
        headings.forEach(heading => {
            totalHeadingLength += heading.textContent.trim().length;
        });

        totalHeight += article.getBoundingClientRect().height;
    });

    const averageHeight = totalHeight / articleCount;

    console.log(`Počet příspěvků: ${articleCount}`);
    console.log(`Průměrná výška příspěvků: ${averageHeight}px`);
    console.log(`Součet délek nadpisů příspěvků: ${totalHeadingLength}`);

    function handleArticleClick(event) {
        const clickedArticle = event.target.closest('article');
        if (!clickedArticle) return;

        const h2Texts = Array.from(clickedArticle.querySelectorAll("h2")).map(heading => heading.textContent.trim());
        const pTexts = Array.from(clickedArticle.querySelectorAll("p")).map(paragraph => paragraph.textContent.trim());

        const combinedLength = h2Texts.join(" ").length + pTexts.join(" ").length;

        const articleInfo = {
            h2Texts,
            pTexts,
            combinedLength
        };

        console.log(articleInfo);
    }

    articles.forEach(article => {
        article.addEventListener("click", handleArticleClick);
    });

    function toggleMenuIcon() {
        menuIcon.classList.toggle('fa-bars');
        menuIcon.classList.toggle('fa-times');
    }

    function closeMenu() {
        sidebar.classList.remove('open');
        content.classList.remove('menu-open');
        toggleMenuIcon();
    }

    menuBtn.addEventListener('click', function (event) {
        event.stopPropagation();
        sidebar.classList.toggle('open');
        content.classList.toggle('menu-open');
        toggleMenuIcon();
    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest('.sidebar') && sidebar.classList.contains('open')) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && sidebar.classList.contains('open')) {
            closeMenu();
        }
    });
});
