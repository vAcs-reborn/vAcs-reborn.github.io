var itemsList = [];
var displayedItems = [];
var activePage = 0;
var pages = [];
var itemsOnPage = 90;

addEventListener('DOMContentLoaded', async () => {
    const search = document.getElementById('search');
    search.addEventListener('input', () => refresh(search.value));

    const itemsOnPageSelector = document.getElementById('items-on-page');
    itemsOnPageSelector.addEventListener('change', () => {
        itemsOnPage = +itemsOnPageSelector.value;
        refresh();
    });
    const response = await fetch('https://raw.githubusercontent.com/vAcs-reborn/info/refs/heads/main/items.json');
    if (response.status) {
        itemsList = JSON.parse(await response.text());
        setPage(0);
    }
});

function refresh(search) {
    displayedItems = itemsList;
    pages = [];

    if (search) {
        displayedItems = displayedItems.filter((item) => (`name=${item.name};uid=${item.UID};model=${item.model}`).toLowerCase().search(search.toLowerCase()) != -1);
        activePage = 0;
    }
    
    for (var i = 0; i <= displayedItems.length; i++) {
        const pageIndex = Math.floor(i / itemsOnPage);
        if (!pages[pageIndex])
            pages[pageIndex] = [];
        pages[pageIndex].push(displayedItems[i]);
    }
    console.log(pages)

    if (!pages[activePage])
        return alert('no')
    list.innerHTML = '';

    const pageContainer = document.getElementById('pagelist');
    pageContainer.innerHTML = '';
    for (var pageIndex = 0; pageIndex <= pages.length - 1; pageIndex++) {
        pageContainer.innerHTML += `<button class="${pageIndex == activePage ? 'page-btn-active' : ''}" onclick="setPage(${pageIndex})">${pageIndex}</button>`;
    }

    for (var i = 0; i <= pages[activePage].length - 1; i++) {
        const item = pages[activePage][i];
        if (!item) continue
        list.innerHTML += `
            <div class="item">
                <img src="https://cdn.azresources.cloud/projects/arizona-rp/assets/images/donate/${item?.preview?.img ?? 1}.png">
                <div class="item-info">
                    <b>${item?.name ?? 'NULL'}</b>
                    <p><b>UID:</b>${item?.UID ?? 'NULL'}</p>
                    <p><b>Model ID:</b>${item?.model ?? 'NULL'}</p>
                </div>
            </div>
        `
    }
    document.getElementById('total-items').textContent = displayedItems.length;
}

function setPage(page) {
    activePage = page;
    document.querySelectorAll('.page-btn').forEach((e) => {
        e.classList.toggle('page-btn-active', page.toString() == e.textContent);
    });
    refresh();
}