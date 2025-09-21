/* ==================== A: Notification Bell ==================== */
const notifBell = document.getElementById("notif-bell");
const notifDropdown = document.getElementById("notif-dropdown");
const notifCount = document.getElementById("notif-count");
const notifList = document.getElementById("notif-list");
const markReadBtn = document.getElementById("mark-read");
const addNotifBtn = document.getElementById("add-notif");

let notifications = [];
let unreadCount = 0;

function updateBadge() {
    notifCount.textContent = unreadCount;
    notifCount.style.display = unreadCount > 0 ? "inline-block" : "none";
}

function addNotification(message) {
    const notificationId = Date.now(); // Unique ID for each notification
    notifications.unshift({ id: notificationId, message });
    unreadCount++;
    updateBadge();
    notifBell.classList.add("shake");
    setTimeout(() => notifBell.classList.remove("shake"), 600);

    const li = document.createElement("li");
    li.className = "notification-item";
    li.innerHTML = `
    <span class="notification-text">${message}</span>
    <button class="notification-close" onclick="removeNotification(${notificationId})">
      <span class="material-symbols-outlined">close</span>
    </button>
  `;
    notifList.prepend(li);
}

function removeNotification(id) {
    // Remove from array
    notifications = notifications.filter(notif => notif.id !== id);

    // Find and remove the DOM element
    const notifItems = document.querySelectorAll('.notification-item');
    notifItems.forEach(item => {
        const closeBtn = item.querySelector('.notification-close');
        if (closeBtn && closeBtn.onclick.toString().includes(id)) {
            item.remove();
            unreadCount--;
            updateBadge();
        }
    });
}

notifBell.addEventListener("click", () => {
    notifDropdown.classList.toggle("open");
});

markReadBtn.addEventListener("click", () => {
    unreadCount = 0;
    updateBadge();
    notifications = [];
    notifList.innerHTML = "";
});

addNotifBtn.addEventListener("click", () => {
    addNotification(`New message at ${new Date().toLocaleTimeString()}`);
});

/* ==================== B: Toast Notifications ==================== */
const toastContainer = document.getElementById("toast-container");
const showToastBtn = document.getElementById("show-toast");

function createToast(message, duration = 3000) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.textContent = message;

    let dismissTimeout = setTimeout(() => removeToast(toast), duration);

    toast.addEventListener("mouseenter", () => clearTimeout(dismissTimeout));
    toast.addEventListener("mouseleave", () => {
        dismissTimeout = setTimeout(() => removeToast(toast), duration);
    });

    toastContainer.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("show"));
}

function removeToast(toast) {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
}

showToastBtn.addEventListener("click", () => {
    createToast(`Toast at ${new Date().toLocaleTimeString()}`);
});
