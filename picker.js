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
        
        <input type="text" id="keyword-abs" placeholder="Keyword (e.g. gm)" style="width:100%; background:#222; border:1px solid #333; color:#00ff80; padding:10px; border-radius:6px; margin-bottom:12px; box-sizing:border-box; outline:none;">

        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <div id="count-abs" style="font-size:14px; color:#888;">0 PARTICIPANTS</div>
            <button id="view-list-btn" style="background:none; border:none; color:#00ff80; cursor:pointer; font-size:11px; text-decoration:underline;">VIEW LIST</button>
        </div>

        <div id="participants-list" style="display:none; max-height:100px; overflow-y:auto; background:#1a1a1a; padding:10px; margin-bottom:10px; text-align:left; font-size:12px; color:#ccc; border-radius:5px; border: 1px solid #333;"></div>

        <div id="penguin-box" style="display:none; font-size:40px; margin-bottom:10px; animation: bounce 0.5s infinite alternate;">🐧</div>

        <div id="machine-abs" style="display:none; height:60px; overflow:hidden; background:#000; border:2px solid #00ff80; border-radius:8px; position:relative; margin-bottom:15px; box-shadow: inset 0 0 10px #00ff80;">
            <div id="strip-abs" style="position:absolute; width:100%; top:0; left:0; transition: transform 3.5s cubic-bezier(0.1, 0, 0.1, 1);"></div>
            <div style="position:absolute; top:0; left:0; width:100%; height:15px; background:linear-gradient(to bottom, #000, transparent); pointer-events:none;"></div>
            <div style="position:absolute; bottom:0; left:0; width:100%; height:15px; background:linear-gradient(to top, #000, transparent); pointer-events:none;"></div>
        </div>

        <button id="roll-abs" style="width:100%; background
