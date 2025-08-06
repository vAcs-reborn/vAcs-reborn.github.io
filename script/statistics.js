const SCRIPT_INFO_URL = 'https://raw.githubusercontent.com/vAcs-reborn/info/refs/heads/main/info.json';

addEventListener('DOMContentLoaded', async () => {
    const response = await fetch(SCRIPT_INFO_URL);
    if (!response.status)
        alert('Error loading script info');
    const info = JSON.parse(await response.text());
    console.log(info)
    refresh(info.sync.host);
});

async function refresh(url, players) {
    const response = await fetch(`${url}/sync/list`);
    if (!response.status)
        alert('Error loading stats info');
    const list = JSON.parse(await response.text());
    
    const serversDiv = document.getElementById('servers');
    serversDiv.innerHTML = '';
    
    for (const [server, players] of Object.entries(list)) {
        const playersContent = [];
        for (const [_, player] of Object.entries(players)) {
            const slots = [];
            for (var slot = 1; slot <= 8; slot++) {
                slots.push(`
                    <div class="slot">
                        ${player.items[slot] ? `<img src="https://cdn.azresources.cloud/projects/arizona-rp/assets/images/donate/${player.items[slot].preview.img ?? ''}.png">` : ""}
                    </div>
                `);
            }
            playersContent.push(`
                <div class="player">
                    <b>${player.user}</b>
                    <div class="slots">
                        ${slots.join('\n')}
                    </div>
                </div>
            `);
        }
        serversDiv.innerHTML += `
            <div class="server">
                <h3>${server}</h3>
                ${playersContent.join('\n')}
            </div>
        `
    }
    console.log(list)
}