const SCRIPT_INFO_URL = 'https://raw.githubusercontent.com/vAcs-reborn/info/refs/heads/main/info.json';
addEventListener('DOMContentLoaded', async () => {
    const response = await fetch(SCRIPT_INFO_URL);
    if (!response.status)
        return alert('Error loading script info!');
    
});