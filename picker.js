(function() {
    if (document.getElementById('abs-ui')) return;

    const ui = document.createElement('div');
    ui.id = 'abs-ui';
    ui.style = "position:fixed; top:100px; left:20px; z-index:10000; background:#111; color:#00ff80; padding:20px; border:1px solid #00ff80; border-radius:10px; width:280px; box-shadow:0 10px 30px rgba(0,0,0,0.5); font-family: sans-serif;";
    ui.innerHTML = `
        <div style="font-weight:bold; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
            <span>Abstract Roulette 🎡</span>
            <span id="close-abs" style="cursor:pointer; color:#555; font-size:20px;">&times;</span>
        </div>
        
        <div style="margin-bottom:15px;">
            <label style="font-size:11px; color:#888; display:block; margin-bottom:5px;">SET KEYWORD:</label>
            <input type="text" id="keyword-abs" placeholder="e.g. !win" style="width:100%; background:#222; border:1px solid #333; color:#00ff80; padding:8px; border-radius:5px; box-sizing:border-box; outline:none;">
        </div>

        <div id="count-abs" style="font-size:24px; font-weight:bold; text-align:center; margin:15px 0; background:#1a1a1a; padding:10px; border-radius:8px;">
            0 <span style="font-size:12px; color:#555; font-weight:normal;">ENTRIES</span>
        </div>

        <div id="penguin-gif-container" style="display:none; text-align:center; margin-bottom:15px;">
            <img src="https://media.tenor.com/7p6pGf2p09sAAAAC/abster-abstract.gif" style="width:150px; height:auto; border-radius:10px; display:inline-block;">
        </div>

        <button id="roll-abs" style="width:100%; background:#00ff80; border:none; padding:12px; border-radius:8px; font-weight:bold; cursor:pointer; color: black; transition: 0.2s;">SPIN THE WHEEL</button>
        <button id="clear-abs" style="width:100%; background:transparent; border:1px solid #333; color:#555; padding:5px; border-radius:5px; margin-top:10px; cursor:pointer; font-size:10px;">CLEAR LIST</button>
        
        <div id="win-abs" style="display:none; margin-top:15px; padding:12px; background:rgba(0,255,128,0.1); border:1px dashed #00ff80; border-radius:8px; text-align:center;">
            <div id="roulette-status" style="color:#00ff80; font-size:11px; text-transform:uppercase; margin-bottom:5px;">Rolling...</div>
            <div id="win-user" style="font-weight:bold; font-size:18px; margin:5px 0; color:#fff; min-height:24px;"></div>
            <div id="win-msg" style="font-size:12px; color:#888; font-style:italic; word-break:break-all;"></div>
        </div>
    `;
    document.body.appendChild(ui);

    let participants = new Map();

    const scan = () => {
        const keyword = document.getElementById('keyword-abs').value.toLowerCase().trim();
        if (!keyword) return;

        const messages = document.querySelectorAll('div[class*="ChatMessage"], div[class*="message"]');
        messages.forEach(msg => {
            const text = msg.innerText;
            if (text && text.toLowerCase().includes(keyword)) {
                const parts = text.split('\n');
                let userName = parts[0] || "Unknown User";
                let messageContent = text.replace(userName, "").trim();

                if (!participants.has(userName)) {
                    participants.set(userName, messageContent);
                    document.getElementById('count-abs').innerHTML = `${participants.size} <span style="font-size:12px; color:#555; font-weight:normal;">ENTRIES</span>`;
                }
            }
        });
    };

    const timer = setInterval(scan, 1500);

    document.getElementById('roll-abs').onclick = function() {
        const keys = Array.from(participants.keys());
        if (keys.length === 0) return alert("No entries found!");

        const btn = this;
        const winDiv = document.getElementById('win-abs');
        const winUser = document.getElementById('win-user');
        const winMsg = document.getElementById('win-msg');
        const status = document.getElementById('roulette-status');
        const penguinContainer = document.getElementById('penguin-gif-container');

        btn.disabled = true;
        btn.style.opacity = "0.5";
        btn.innerText = "ROLLING...";
        
        // Показываем гифку и блок рулетки одновременно
        penguinContainer.style.display = 'block';
        winDiv.style.display = 'block';
        winMsg.innerText = "";
        status.innerText = "🎲 SPINNING...";

        let counter = 0;
        const maxTicks = 35; // Около 3.5 секунд
        const interval = setInterval(() => {
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            winUser.innerText = randomKey;
            winUser.style.color = "#fff";
            counter++;

            if (counter >= maxTicks) {
                clearInterval(interval);
                
                penguinContainer.style.display = 'none'; // Убираем гифку после завершения

                const finalWinner = keys[Math.floor(Math.random() * keys.length)];
                winUser.innerText = finalWinner;
                winUser.style.color = "#00ff80";
                winMsg.innerText = participants.get(finalWinner);
                status.innerText = "🏆 WINNER!";
                
                btn.disabled = false;
                btn.style.opacity = "1";
                btn.innerText = "SPIN AGAIN";
            }
        }, 100);
    };

    document.getElementById('clear-abs').onclick = () => {
        participants.clear();
        document.getElementById('count-abs').innerHTML = `0 <span style="font-size:12px; color:#555; font-weight:normal;">ENTRIES</span>`;
        document.getElementById('win-abs').style.display = 'none';
        document.getElementById('penguin-gif-container').style.display = 'none';
    };

    document.getElementById('close-abs').onclick = () => {
        clearInterval(timer);
        ui.remove();
    };
})();
