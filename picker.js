(function() {
    if (document.getElementById('abs-ui')) return;

    const ui = document.createElement('div');
    ui.id = 'abs-ui';
    ui.style = "position:fixed; top:100px; left:20px; z-index:10000; background:#111; color:#00ff80; padding:20px; border:1px solid #00ff80; border-radius:10px; width:280px; box-shadow:0 10px 30px rgba(0,0,0,0.5); font-family: sans-serif;";
    ui.innerHTML = `
        <div style="font-weight:bold; margin-bottom:10px; display:flex; justify-content:space-between;">
            <span>Abstract Picker</span>
            <span id="close-abs" style="cursor:pointer; color:#555;">&times;</span>
        </div>
        
        <div style="margin-bottom:15px;">
            <label style="font-size:11px; color:#888; display:block; margin-bottom:5px;">SET KEYWORD:</label>
            <input type="text" id="keyword-abs" value="!win" style="width:100%; background:#222; border:1px solid #333; color:#00ff80; padding:8px; border-radius:5px; box-sizing:border-box; outline:none;">
        </div>

        <div id="count-abs" style="font-size:24px; font-weight:bold; text-align:center; margin:15px 0; background:#1a1a1a; padding:10px; border-radius:8px;">
            0 <span style="font-size:12px; color:#555; font-weight:normal;">USERS</span>
        </div>

        <button id="roll-abs" style="width:100%; background:#00ff80; border:none; padding:12px; border-radius:8px; font-weight:bold; cursor:pointer; color: black; transition: 0.2s;">PICK A WINNER</button>
        
        <div id="win-abs" style="display:none; margin-top:15px; padding:12px; background:rgba(0,255,128,0.1); border:1px dashed #00ff80; border-radius:8px; word-break:break-all; font-size:13px; text-align:center;"></div>
    `;
    document.body.appendChild(ui);

    let users = new Set();

    const scan = () => {
        const keyword = document.getElementById('keyword-abs').value.toLowerCase().trim();
        if (!keyword) return;

        // Сканируем все текстовые элементы на странице
        const allElements = document.querySelectorAll('span, p, div');
        allElements.forEach(el => {
            const content = el.innerText;
            // Проверяем, содержит ли строка ключевое слово (регистр не важен)
            if (content && content.toLowerCase().includes(keyword)) {
                // Ищем имя пользователя или уникальный идентификатор строки, 
                // так как кошелька теперь может не быть.
                // Чтобы не считать одного и того же человека дважды, 
                // мы будем сохранять именно текст всей строки (сообщения).
                if (!users.has(content)) {
                    users.add(content);
                    document.getElementById('count-abs').innerHTML = `${users.size} <span style="font-size:12px; color:#555; font-weight:normal;">USERS</span>`;
                }
            }
        });
    };

    const timer = setInterval(scan, 1500);

    document.getElementById('close-abs').onclick = () => {
        clearInterval(timer);
        ui.remove();
    };

    document.getElementById('roll-abs').onclick = () => {
        const arr = Array.from(users);
        if (arr.length === 0) return alert("No entries found for this keyword yet!");
        
        const winnerMessage = arr[Math.floor(Math.random() * arr.length)];
        const winDiv = document.getElementById('win-abs');
        winDiv.style.display = 'block';
        winDiv.innerHTML = `<div style="color:#00ff80; font-size:11px; margin-bottom:5px;">WINNING MESSAGE:</div><b>${winnerMessage}</b>`;
    };
})();
