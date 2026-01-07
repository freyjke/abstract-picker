(function() {
    if (document.getElementById('abs-ui')) return;

    const style = document.createElement('style');
    style.innerHTML = `
        .abs-slot-box {
            height: 50px;
            overflow: hidden;
            background: #000;
            border: 2px solid #00ff80;
            border-radius: 8px;
            position: relative;
            margin: 15px 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .abs-slot-strip {
            display: flex;
            flex-direction: column;
            transition: transform 3s cubic-bezier(0.12, 0, 0.17, 1);
            width: 100%;
        }
        .abs-slot-name {
            height: 50px;
            line-height: 50px;
            text-align: center;
            color: #fff;
            font-weight: bold;
            font-size: 18px;
            flex-shrink: 0;
        }
    `;
    document.head.appendChild(style);

    const ui = document.createElement('div');
    ui.id = 'abs-ui';
    ui.style = "position:fixed; top:100px; left:20px; z-index:10000; background:#111; color:#00ff80; padding:20px; border:1px solid #00ff80; border-radius:12px; width:280px; box-shadow:0 15px 40px rgba(0,0,0,0.8); font-family: sans-serif;";
    ui.innerHTML = `
        <div style="font-weight:bold; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
            <span>Abstract Slot Machine 🎰</span>
            <span id="close-abs" style="cursor:pointer; color:#555; font-size:22px;">&times;</span>
        </div>
        
        <input type="text" id="keyword-abs" placeholder="Set Keyword (!win)" style="width:100%; background:#222; border:1px solid #333; color:#00ff80; padding:10px; border-radius:6px; margin-bottom:12px; box-sizing:border-box; outline:none;">

        <div id="count-abs" style="font-size:16px; text-align:center; color:#888; margin-bottom:10px;">0 PARTICIPANTS</div>

        <div id="penguin-box" style="display:none; text-align:center; margin-bottom:10px;">
            <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJidW5ndXp5bmZ1bmVpMHBqbm5ic2V4Z3V0eG5uNXp5N3RndXp5JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/M90fDbgk3fG4yW9I6c/giphy.gif" style="width:100px; height:auto; border-radius:8px;">
        </div>

        <div class="abs-slot-box" id="machine-abs" style="display:none;">
            <div class="abs-slot-strip" id="strip-abs"></div>
        </div>

        <button id="roll-abs" style="width:100%; background:#00ff80; border:none; padding:14px; border-radius:8px; font-weight:bold; cursor:pointer; color: #000; font-size:14px; text-transform:uppercase;">Pull the lever!</button>
        
        <div id="result-abs" style="display:none; margin-top:15px; padding:15px; background:rgba(0,255,128,0.1); border:1px dashed #00ff80; border-radius:10px; text-align:center;">
            <div style="font-size:11px; color:#00ff80; letter-spacing:1px;">WINNER FOUND</div>
            <div id="win-user-abs" style="font-size:22px; font-weight:bold; color:#fff; margin:5px 0;"></div>
        </div>

        <button id="clear-abs" style="width:100%; background:transparent; border:none; color:#444; margin-top:12px; cursor:pointer; font-size:10px;">CLEAR ALL ENTRIES</button>
    `;
    document.body.appendChild(ui);

    let users = new Map();

    setInterval(() => {
        const kw = document.getElementById('keyword-abs').value.toLowerCase().trim();
        if (!kw) return;
        document.querySelectorAll('div[class*="ChatMessage"], div[class*="message"]').forEach(m => {
            const t = m.innerText;
            if (t && t.toLowerCase().includes(kw)) {
                const name = t.split('\n')[0] || "User";
                if (!users.has(name)) {
                    users.set(name, t);
                    document.getElementById('count-abs').innerText = `${users.size} PARTICIPANTS`;
                }
            }
        });
    }, 1500);

    document.getElementById('roll-abs').onclick = function() {
        const keys = Array.from(users.keys());
        if (keys.length < 1) return alert("Waiting for participants...");

        const strip = document.getElementById('strip-abs');
        const machine = document.getElementById('machine-abs');
        const penguin = document.getElementById('penguin-box');
        const result = document.getElementById('result-abs');
        
        // Генерируем ленту имен для барабана
        strip.innerHTML = '';
        strip.style.transition = 'none';
        strip.style.transform = 'translateY(0)';
        
        const list = [];
        for(let i=0; i<40; i++) list.push(keys[Math.floor(Math.random() * keys.length)]);
        const winner = keys[Math.floor(Math.random() * keys.length)];
        list.push(winner);

        list.forEach(n => {
            const d = document.createElement('div');
            d.className = 'abs-slot-name';
            d.innerText = n;
            strip.appendChild(d);
        });

        // Запуск
        this.disabled = true;
        this.style.opacity = "0.5";
        machine.style.display = 'flex';
        penguin.style.display = 'block';
        result.style.display = 'none';

        setTimeout(() => {
            strip.style.transition = 'transform 3s cubic-bezier(0.1, 0, 0.2, 1)';
            strip.style.transform = `translateY(-${(list.length - 1) * 50}px)`;
        }, 50);

        setTimeout(() => {
            penguin.style.display = 'none';
            result.style.display = 'block';
            document.getElementById('win-user-abs').innerText = winner;
            this.disabled = false;
            this.style.opacity = "1";
            this.innerText = "SPIN AGAIN";
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
