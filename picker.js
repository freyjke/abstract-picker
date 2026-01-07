(function() {
    if (document.getElementById('abs-ui')) return;

    // Добавляем стили для анимации барабана
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes scrollWheel {
            0% { transform: translateY(0); }
            100% { transform: translateY(-80%); }
        }
        .slot-machine {
            height: 40px;
            overflow: hidden;
            background: #000;
            border: 2px solid #00ff80;
            border-radius: 5px;
            position: relative;
            margin: 10px 0;
        }
        .slot-container {
            display: flex;
            flex-direction: column;
            text-align: center;
            transition: transform 3s cubic-bezier(0.1, 0, 0.2, 1);
        }
        .slot-item {
            height: 40px;
            line-height: 40px;
            color: #fff;
            font-weight: bold;
            font-size: 16px;
            white-space: nowrap;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    const ui = document.createElement('div');
    ui.id = 'abs-ui';
    ui.style = "position:fixed; top:100px; left:20px; z-index:10000; background:#111; color:#00ff80; padding:20px; border:1px solid #00ff80; border-radius:10px; width:280px; box-shadow:0 10px 30px rgba(0,0,0,0.5); font-family: sans-serif;";
    ui.innerHTML = `
        <div style="font-weight:bold; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center;">
            <span>Abstract Slot Machine 🎰</span>
            <span id="close-abs" style="cursor:pointer; color:#555; font-size:20px;">&times;</span>
        </div>
        
        <input type="text" id="keyword-abs" placeholder="Keyword (e.g. !win)" style="width:100%; background:#222; border:1px solid #333; color:#00ff80; padding:8px; border-radius:5px; margin-bottom:10px; box-sizing:border-box;">

        <div id="count-abs" style="font-size:18px; text-align:center; margin-bottom:10px;">0 USERS</div>

        <div id="penguin-gif-container" style="text-align:center; display:none;">
            <img src="https://media.tenor.com/7p6pGf2p09sAAAAC/abster-abstract.gif" style="width:120px; margin-bottom:10px;">
        </div>

        <div class="slot-machine" id="machine-abs" style="display:none;">
            <div class="slot-container" id="container-abs"></div>
        </div>

        <button id="roll-abs" style="width:100%; background:#00ff80; border:none; padding:12px; border-radius:8px; font-weight:bold; cursor:pointer; color: black;">PULL THE LEVER!</button>
        
        <div id="final-win-abs" style="display:none; margin-top:15px; padding:12px; background:rgba(0,255,128,0.2); border:2px solid #00ff80; border-radius:8px; text-align:center;">
            <div style="font-size:11px;">WINNER</div>
            <div id="winner-name-abs" style="font-size:20px; font-weight:bold; color:#fff;"></div>
        </div>

        <button id="clear-abs" style="width:100%; background:transparent; border:none; color:#444; margin-top:10px; cursor:pointer; font-size:10px;">RESET LIST</button>
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
                const userName = text.split('\n')[0] || "User";
                if (!participants.has(userName)) {
                    participants.set(userName, text.replace(userName, "").trim());
                    document.getElementById('count-abs').innerText = `${participants.size} USERS`;
                }
            }
        });
    };
    setInterval(scan, 1500);

    document.getElementById('roll-abs').onclick = function() {
        const keys = Array.from(participants.keys());
        if (keys.length < 1) return alert("Need more participants!");

        const container = document.getElementById('container-abs');
        const machine = document.getElementById('machine-abs');
        const penguin = document.getElementById('penguin-gif-container');
        const finalWin = document.getElementById('final-win-abs');
        
        // Очищаем барабан и наполняем его именами (повторяем их для эффекта длины)
        container.innerHTML = '';
        container.style.transition = 'none';
        container.style.transform = 'translateY(0)';
        
        const rollArray = [];
        for(let i=0; i<30; i++) {
            rollArray.push(keys[Math.floor(Math.random() * keys.length)]);
        }
        const winner = keys[Math.floor(Math.random() * keys.length)];
        rollArray.push(winner); // Последний элемент — наш победитель

        rollArray.forEach(name => {
            const div = document.createElement('div');
            div.className = 'slot-item';
            div.innerText = name;
            container.appendChild(div);
        });

        // Запуск процесса
        this.disabled = true;
        machine.style.display = 'block';
        penguin.style.display = 'block';
        finalWin.style.display = 'none';

        // Небольшая задержка перед анимацией
        setTimeout(() => {
            container.style.transition = 'transform 3s cubic-bezier(0.1, 0, 0.2, 1)';
            const moveY = (rollArray.length - 1) * 40;
            container.style.transform = `translateY(-${moveY}px)`;
        }, 50);

        // Когда анимация закончилась
        setTimeout(() => {
            penguin.style.display = 'none';
            finalWin.style.display = 'block';
            document.getElementById('winner-name-abs').innerText = winner;
            this.disabled = false;
            this.innerText = "SPIN AGAIN";
        }, 3200);
    };

    document.getElementById('clear-abs').onclick = () => {
        participants.clear();
        document.getElementById('count-abs').innerText = "0 USERS";
        document.getElementById('machine-abs').style.display = 'none';
        document.getElementById('final-win-abs').style.display = 'none';
    };

    document.getElementById('close-abs').onclick = () => ui.remove();
})();
