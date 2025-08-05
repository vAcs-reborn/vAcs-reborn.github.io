var itemsList = [];
var displayedItems = [];
var activePage = 0;
var pages = [];

const ITEMS_ON_PAGE = 90;

addEventListener('DOMContentLoaded', async () => {
    const search = document.getElementById('search');
    search.addEventListener('input', () => refresh(search.value));
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
       displayedItems = displayedItems.filter((item) => {
            const res = item.name.search(search) != -1;
            if (res)
                console.log(res, item.name, '|', search)
            return res
        });
        activePage = 0;
    }
    
    for (var i = 0; i <= displayedItems.length; i++) {
        const pageIndex = Math.floor(i / ITEMS_ON_PAGE);
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
        const item = pages[activePage][i]
        if (!item) console.log(item, pages[activePage].length)
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
}

function setPage(page) {
    activePage = page;
    document.querySelectorAll('.page-btn').forEach((e) => {
        e.classList.toggle('page-btn-active', page.toString() == e.textContent);
    });
    refresh();
}