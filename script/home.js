let allIssues = [];

async function loadDataWithModal() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const response = await res.json();
    allIssues = response.data;
    renderData(allIssues);

    document.getElementById("btn-all").addEventListener("click", () => {
        renderData(allIssues);
    });


    document.getElementById("search-input").addEventListener("input", (e) => {
        const searchText = e.target.value.toLowerCase();

        const filtered = allIssues.filter(issue =>
            issue.title.toLowerCase().includes(searchText)
        );

        renderData(filtered);
    });

    document.getElementById("btn-open").addEventListener("click", () => {
        const openIssues = allIssues.filter(issue => issue.status === "open");
        renderData(openIssues);
    });

    document.getElementById("btn-closed").addEventListener("click", () => {
        const closedIssues = allIssues.filter(issue => issue.status === "closed");
        renderData(closedIssues);
    });

    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("btn-primary"));
            btn.classList.add("btn-primary");
        });
    });
}

function renderData(issues) {
    const container = document.getElementById("load-data");
    container.innerHTML = "";

    issues.forEach(issue => {
        const priorityColor = issue.priority === "high"
            ? "bg-[#FEECEC] text-[#EF4444]"
            : issue.priority === "medium"
                ? "bg-[#FEF9EC] text-[#F59E0B]"
                : "bg-[#ECFEF0] text-[#22C55E]";

        const labelsHTML = issue.labels.map(label => `
            <button class="bg-[#FEECEC] rounded-full px-3 py-1 font-semibold text-[#EF4444] text-sm">
                ${label}
            </button>
        `).join("");

        const date = new Date(issue.createdAt).toLocaleDateString();

        const card = `
        <div onclick="openModal(${issue.id})" class="cursor-pointer p-8 bg-white shadow rounded-lg border-t-4 ${issue.status === 'open' ? 'border-green-500' : 'border-red-500'}">
            <div class="flex justify-between mb-3">
                <img src="./assets/${issue.status === 'open' ? 'Open-Status' : 'Closed- Status '}.png" alt="">
                <button class="rounded-full px-3 py-1 font-semibold text-sm uppercase ${priorityColor}">
                    ${issue.priority}
                </button>
            </div>
            <div class="space-y-2 my-4">
                <h1 class="text-xl font-bold">${issue.title}</h1>
                <p class="text-gray-400 text-sm">${issue.description}</p>
            </div>
            <div class="flex gap-2 flex-wrap mb-4">${labelsHTML}</div>
            <hr>
            <div class="text-gray-400 mt-4 text-sm">
                <p>#${issue.id} by ${issue.author}</p>
                <p>${date}</p>
            </div>
        </div>`;

        container.innerHTML += card;
    });
}

function openModal(id) {
    const issue = allIssues.find(i => i.id === id);

    const priorityColor = issue.priority === "high"
        ? "bg-red-500 text-white"
        : issue.priority === "medium"
            ? "bg-yellow-400 text-white"
            : "bg-green-500 text-white";

    const statusColor = issue.status === "open" ? "bg-green-500" : "bg-red-500";

    const labelsHTML = issue.labels.map(label => `
        <span class="bg-[#FEECEC] rounded-full px-3 py-1 font-semibold text-[#EF4444] text-sm">${label}</span>
    `).join("");

    const date = new Date(issue.createdAt).toLocaleDateString();

    document.getElementById("modal-title").innerText = issue.title;
    document.getElementById("modal-status").innerText = issue.status === "open" ? "Opened" : "Closed";
    document.getElementById("modal-status").className = `text-white text-sm font-bold px-3 py-1 rounded-full ${statusColor}`;
    document.getElementById("modal-author").innerText = `Opened by ${issue.author} • ${date}`;
    document.getElementById("modal-labels").innerHTML = labelsHTML;
    document.getElementById("modal-description").innerText = issue.description;
    document.getElementById("modal-assignee").innerText = issue.assignee;
    document.getElementById("modal-priority").innerText = issue.priority.toUpperCase();
    document.getElementById("modal-priority").className = `text-white text-sm font-bold px-3 py-1 rounded-full ${priorityColor}`;

    document.getElementById("issue-modal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("issue-modal").classList.add("hidden");
}

loadDataWithModal();



