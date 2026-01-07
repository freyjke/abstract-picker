(function() {
    if (document.getElementById('abs-ui')) return;

    const ui = document.createElement('div');
    ui.id = 'abs-ui';
    ui.style = "position:fixed; top:100px; left:20px; z-index:10000; background:#111; color:#00ff80; padding:20px; border:1px solid #00ff80; border-radius:12px; width:280px; box-shadow:0 15px 40px rgba(0,0,0,0.8); font-family: sans-serif; text-align:center;";
    ui.innerHTML = `
        <div style="font-weight:bold; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; color:#00ff80;">
            <span>Abstract Giveaway 🎁</span>
            <span id="close-abs" style="cursor:pointer; color:#555; font-size:22px;">&times;</span>
        </div>
        
        <input type="text" id="keyword-abs" placeholder="Keyword (e.g. !win)" style="width:100%; background:#222; border:1px solid #333; color:#00ff80; padding:10px; border-radius:6px; margin-bottom:12px; box-sizing:border-box; outline:none;">

        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <div id="count-abs" style="font-size:14px; color:#888;">0 PARTICIPANTS</div>
            <button id="view-list-btn" style="background:none; border:none; color:#00ff80; cursor:pointer; font-size:11px; text-decoration:underline;">VIEW LIST</button>
        </div>

        <div id="participants-list" style="display:none; max-height:100px; overflow-y:auto; background:#1a1a1a; padding:10px; margin-bottom:10px; text-align:left; font-size:12px; color:#ccc; border-radius:5px;"></div>

        <div id="penguin-box" style="display:none; font-size:40px; margin-bottom:10px;">🐧<br><span style="font-size:12px; color:#00ff80;">SPINNING...</span></div>

        <div id="machine-abs" style="display:none; height:50px; overflow:hidden; background:#000; border:2px solid #00ff80; border-radius:8px; position:relative; margin-bottom:15px;">
            <div id="strip-abs" style="position:absolute; width:100%; top:0; left:0; transition: transform 3s cubic-bezier(0.1, 0, 0.2, 1);"></div>
        </div>

        <button id="roll-abs" style="width:100%; background:#00ff80; border:none; padding:14px; border-radius:8px; font-weight:bold; cursor:pointer; color:#000; font-size:14px; text-transform:uppercase;">Start Draw!</button>
        
        <div id="result-abs" style="display:none; margin-top:15px; padding:15px; background:rgba(0,255,128,0.1); border:1px dashed #00ff80; border-radius:10px;">
            <div style="font-size:11px; color:#00ff80;">WINNER</div>
            <div id="win-user-abs" style="font-size:20px; font-weight:bold; color:#fff; margin-top:5px; word-break:break-all;"></div>
        </div>

        <button id="clear-abs" style="width:100%; background:transparent; border:none; color:#444; margin-top:12px; cursor:pointer; font-size:10px;">RESET EVERYTHING</button>
    `;
    document.body.appendChild(ui);

    let users = new Map();

    // Сканер
    setInterval(() => {
        const kw = document.getElementById('keyword-abs').value.toLowerCase().trim();
        if (!kw) return;
        document.querySelectorAll('div[class*="ChatMessage"], div[class*="message"]').forEach(m => {
            const t = m.innerText;
            if (t && t.toLowerCase().includes(kw)) {
                const lines = t.split('\n').map(l => l.trim()).filter(l => l.length > 2);
                let name = lines.find(l => !l.includes(':') && !l.includes('Сегодня') && !l.includes('Вчера')) || lines[0];
                if (name && !users.has(name)) {
                    users.set(name, t);
                    document.getElementById('count-abs').innerText = `${users.size} PARTICIPANTS`;
                }
            }
        });
    }, 1500);

    document.getElementById('view-list-btn').onclick = () => {
        const list = document.getElementById('participants-list');
        list.style.display = list.style.display === 'block' ? 'none' : 'block';
        list.innerHTML = Array.from(users.keys()).map(u => `<div>• ${u}</div>`).join('');
    };

    document.getElementById('roll-abs').onclick = function() {
        const keys = Array.from(users.keys());
        if (keys.length < 1) return alert("No participants found!");

        const strip = document.getElementById('strip-abs');
        const machine = document.getElementById('machine-abs');
        const penguin = document.getElementById('penguin-box');
        const result = document.getElementById('result-abs');
        
        // Очистка и создание ленты
        strip.innerHTML = '';
        strip.style.transition = 'none';
        strip.style.transform = 'translateY(0)';
        
        const rollList = [];
        for(let i=0; i<30; i++) rollList.push(keys[Math.floor(Math.random() * keys.length)]);
        const winner = keys[Math.floor(Math.random() * keys.length)];
        rollList.push(winner);

        rollList.forEach(name => {
            const el = document.createElement('div');
            el.style = "height:50px; line-height:50px; text-align:center; color:#fff; font-weight:bold; font-size:16px;";
            el.innerText = name;
            strip.appendChild(el);
        });

        // Визуальный запуск
        this.disabled = true;
        machine.style.display = 'block';
        penguin.style.display = 'block';
        result.style.display = 'none';

        setTimeout(() => {
            strip.style.transition = 'transform 3s cubic-bezier(0.1, 0, 0.2, 1)';
            strip.style.transform = `translateY(-${(rollList.length - 1) * 50}px)`;
        }, 100);

        setTimeout(() => {
            penguin.style.display = 'none';
            result.style.display = 'block';
            document.getElementById('win-user-abs').innerText = winner;
            this.disabled = false;
        }, 3300);
    };

    document.getElementById('clear-abs').onclick = () => {
        users.clear();
        document.getElementById('count-abs').innerText = "0 PARTICIPANTS";
        document.getElementById('machine-abs').style.display = 'none';
        document.getElementById('result-abs').style.display = 'none';
    };

    document.getElementById('close-abs').onclick = () => ui.remove();
})();
