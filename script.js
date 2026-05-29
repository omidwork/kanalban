let webApp = window.Eitaa?.WebApp;
if (webApp) {
    webApp.ready();
    webApp.expand();
    let user = webApp.initDataUnsafe?.user;
    if (user) {
        document.getElementById('user-info').innerHTML = `خوش آمدی ${user.first_name} ❤️`;
    }
}

// نمایش پنل‌ها
document.getElementById('btn-channels').onclick = () => showPanel('channels-list');
document.getElementById('btn-new-post').onclick = () => showPanel('new-post-panel');
document.getElementById('btn-schedule').onclick = () => showPanel('schedule-panel');

function showPanel(id) {
    document.querySelectorAll('.panel').forEach(p => p.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    if (id === 'channels-list') loadChannels();
    else if (id === 'schedule-panel') loadSchedule();
}

async function loadChannels() {
    const res = await fetch('api.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({action: 'get_channels'})
    });
    const data = await res.json();
    const ul = document.getElementById('channels-ul');
    ul.innerHTML = '';
    if (data.channels && data.channels.length) {
        data.channels.forEach(ch => {
            let li = document.createElement('li');
            li.textContent = `${ch.title} (ID: ${ch.id})`;
            ul.appendChild(li);
        });
    } else {
        ul.innerHTML = '<li>هیچ کانالی یافت نشد. ربات را در کانال ادمین کنید.</li>';
    }
    // همچنین پُر کردن سلیکت ارسال پیام
    let select = document.getElementById('chat-select');
    select.innerHTML = '';
    if (data.channels) {
        data.channels.forEach(ch => {
            let opt = document.createElement('option');
            opt.value = ch.id;
            opt.textContent = ch.title;
            select.appendChild(opt);
        });
    }
}

document.getElementById('send-now').onclick = async () => {
    let chat_id = document.getElementById('chat-select').value;
    let text = document.getElementById('message-text').value;
    let pin = document.getElementById('pin-message').checked;
    if (!text) return alert('لطفاً متن پیام را وارد کنید');
    const res = await fetch('api.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({action: 'send_message', chat_id, text, pin})
    });
    const data = await res.json();
    if (data.success) alert('پیام ارسال شد ✅');
    else alert('خطا در ارسال');
};

document.getElementById('schedule-post').onclick = async () => {
    let chat_id = document.getElementById('chat-select').value;
    let text = document.getElementById('message-text').value;
    let timeStr = document.getElementById('schedule-time').value;
    if (!text || !timeStr) return alert('متن و زمان را وارد کنید');
    let send_time = Math.floor(new Date(timeStr).getTime() / 1000);
    const res = await fetch('api.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({action: 'schedule_post', chat_id, text, send_time})
    });
    const data = await res.json();
    if (data.success) alert('پست در زمان مقرر ارسال خواهد شد ✅');
    else alert('خطا');
};

async function loadSchedule() {
    // دریافت پست‌های زمان‌بندی شده (نیاز به اکشن جدید در api.php)
    // فعلاً پیغام ساده
    document.getElementById('schedule-list').innerHTML = '<li>در حال توسعه...</li>';
}