(function() {
    if (document.getElementById('abs-ui')) return; // Prevent duplicate windows

    const ui = document.createElement('div');
    ui.id = 'abs-ui';
    ui.style = "position:fixed; top:100px; left:20px; z-index:10000; background:#111; color:#00ff80; padding:20px; border:1px solid #00ff80; border-radius:10px; width:260px; box-shadow:0 10px 30px rgba(0,0,0,0.5); font-family: sans-serif;";
    ui.innerHTML = `
        <div style="font-weight:bold; margin-bottom:10px;">Abstract Giveaway</div>
        <div style="font-size:12px; color:#ccc;">Listening for !win + 0x...</div>
        <div id="count-abs" style="font-size:20px; margin:10px 0;">Participants: 0</div>
        <button id="roll-abs" style="width:100%; background:#00ff80; border:none; padding:10px; border-radius:5px; font-weight:bold; cursor:pointer; color: black;">PICK A WINNER</button>
        <div id="win-abs" style="display:none; margin-top:15px; padding:10px; background:#222; border-left:4px solid #00ff80; word-break:break-all; font-size:13px;"></div>
    `;
    document.body.appendChild(ui);

    let users = new Set();

    // Chat scanning function
    const scan = () => {
        const texts = document.querySelectorAll('span, div');
        texts.forEach(t => {
            const content = t.innerText;
            if (content && content.includes('!win