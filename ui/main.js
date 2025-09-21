let selectedResource = null;

window.addEventListener('message', (event) => {
    if (event.data.action === "openMenu") {
        const menu = document.getElementById("menu-wrapper");
        menu.style.display = "flex";
        setTimeout(() => menu.classList.add("show"), 10);
        populateResources(event.data.resources);
    }
});

document.getElementById("close-btn").addEventListener("click", () => {
    const menu = document.getElementById("menu-wrapper");
    menu.classList.remove("show");
    setTimeout(() => menu.style.display = "none", 300);
    selectedResource = null;
    fetch(`https://${GetParentResourceName()}/closeMenu`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
    }).catch(err => console.error(err));
});

function sendAction(action) {
    if (!selectedResource) return alert("Select a resource first!");
    fetch(`https://${GetParentResourceName()}/resourceAction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, resource: selectedResource })
    });
}

document.getElementById("start-btn").addEventListener("click", () => sendAction("start"));
document.getElementById("stop-btn").addEventListener("click", () => sendAction("stop"));
document.getElementById("restart-btn").addEventListener("click", () => {
    if (!selectedResource) return alert("Select a resource first!");

    
    const li = Array.from(document.querySelectorAll("#resource-list li"))
        .find(i => i.dataset.name === selectedResource);
    if (li) li.textContent = `${selectedResource} [restarting]`;

    
    fetch(`https://${GetParentResourceName()}/resourceAction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "restart", resource: selectedResource })
    });
});

const searchBar = document.getElementById("search-bar");

searchBar.addEventListener("input", () => {
    const filter = searchBar.value.toLowerCase();
    document.querySelectorAll("#resource-list li").forEach(li => {
        if (li.dataset.name.toLowerCase().includes(filter)) {
            li.style.display = "";
        } else {
            li.style.display = "none";
        }
    });
});

function populateResources(resources) {
    const list = document.getElementById("resource-list");
    list.innerHTML = "";

    resources.forEach(res => {
        const li = document.createElement("li");
        li.textContent = `${res.name} [${res.state}]`;
        li.dataset.name = res.name;
        li.dataset.state = res.state;
        li.className = "resource-item";

        li.onclick = () => {
            document.querySelectorAll("#resource-list li").forEach(i => i.style.background = "");
            li.style.background = "rgba(0,123,255,0.3)";
            selectedResource = res.name;
        };
        list.appendChild(li);
    });
}
