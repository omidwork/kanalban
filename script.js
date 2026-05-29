let webApp = window.Eitaa?.WebApp;
let userName = "کاربر";

if (webApp) {
    webApp.ready();
    webApp.expand();
    let user = webApp.initDataUnsafe?.user;
    if (user && user.first_name) {
        userName = user.first_name + (user.last_name ? " " + user.last_name : "");
        document.querySelector('.user-name').innerText = userName;
    }
    document.getElementById('close-btn').onclick = () => webApp.close();
} else {
    // حالت تست در مرورگر
    document.querySelector('.user-name').innerText = "کاربر تست";
}

// ناوبری با دکمه‌های پایین
const panels = {
    channels: document.getElementById('channels-panel'),
    message: document.getElementById('message-panel'),
    schedule: document.getElementById('schedule-panel'),
    stats: document.getElementById('stats-panel')
};
const welcomeCard = document.querySelector('.welcome-card');

function showPanel(panelId) {
    // مخفی کردن همه پنل‌ها و ولکم کارت
    welcomeCard.classList.add('hidden');
    Object.values(panels).forEach(p => p.classList.add('hidden'));
    if (panels[panelId]) panels[panelId].classList.remove('hidden');
    
    // active کردن دکمه ناوبری
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.nav-btn[data-panel="${panelId}"]`).classList.add('active');
    
    // اگر پنل کانال‌هاست، لیست را بارگذاری کن
    if (panelId === 'channels') loadChannelsDemo();
    else if (panelId === 'schedule') loadScheduleDemo();
}

document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.onclick = () => showPanel(btn.getAttribute('data-panel'));
});

// دمو (چون هنوز بک‌اند نداریم، داده‌های نمونه)
async function loadChannelsDemo() {
    const list = document.getElementById('channels-list');
    list.innerHTML = '<li style="justify-content:center;">در حال اتصال به سرور...</li>';
    // بعداً جایگزین با fetch واقعی می‌شود
    setTimeout(() => {
        list.innerHTML = `
            <li>📢 کانال فناوری <span style="color:gray;">ID: -100123</span></li>
            <li>🎵 کانال موسیقی <span style="color:gray;">ID: -100456</span></li>
            <li>📚 کانال کتاب <span style="color:gray;">ID: -100789</span></li>
        `;
    }, 800);
}

function loadScheduleDemo() {
    const list = document.getElementById('schedule-list');
    list.innerHTML = '<li>⏰ هیچ پست زمان‌بندی شده‌ای نیست.</li>';
}

// دکمه‌های ارسال (فعلاً هشدار)
document.getElementById('send-now').onclick = () => {
    let chatId = document.getElementById('chat-select').value;
    let text = document.getElementById('message-text').value;
    if (!text) return showToast("لطفاً متن پیام را وارد کنید");
    showToast("در حال ارسال به سرور... (بک‌اند در حال آماده‌سازی)");
};
document.getElementById('schedule-post').onclick = () => {
    showToast("زمان‌بندی به زودی فعال می‌شود");
};
document.getElementById('refresh-channels').onclick = () => loadChannelsDemo();

function showToast(msg) {
    let toast = document.getElementById('toast-message');
    toast.innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2500);
}

// پر کردن سلیکت کانال به صورت دمو
function populateSelectDemo() {
    let select = document.getElementById('chat-select');
    select.innerHTML = '<option value="-100123">کانال فناوری</option><option value="-100456">کانال موسیقی</option>';
}
populateSelectDemo();

// نمایش welcome در ابتدا
welcomeCard.classList.remove('hidden');