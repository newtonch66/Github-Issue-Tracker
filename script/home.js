
let allIssues = [];

async function loadData() {
    try {
        const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        const data = await res.json();

        allIssues = data.data;
        renderData(allIssues);

    } catch (error) {
        console.log("Data Load Error:", error);
    }
}

function renderData(issues) {

    const container = document.getElementById("load-data");
    container.innerHTML = "";

    issues.forEach(issue => {

        let priorityColor = "";

        if (issue.priority === "high") {
            priorityColor = "bg-[#FEECEC] text-[#EF4444]";
        }
        else if (issue.priority === "medium") {
            priorityColor = "bg-[#FEF9EC] text-[#F59E0B]";
        }
        else {
            priorityColor = "bg-[#ECFEF0] text-[#22C55E]";
        }

  
        const statusImage = issue.status === "open"
            ? "./assets/open-status.png"
            : "./assets/Closed-Status.png"

        const borderColor = issue.status === "open"
            ? "border-green-500"
            : "border-red-500";

      
        let labelsHTML = "";

        issue.labels.forEach(label => {
            labelsHTML += `
            <button class="bg-[#FEECEC] rounded-full px-3 py-1 font-semibold text-[#EF4444] text-sm">
                ${label}
            </button>
            `;
        });

   
        const date = new Date(issue.createdAt).toLocaleDateString();


  
        const card = `
        <div class="p-8 bg-white shadow rounded-lg border-t-4 ${borderColor}">
            
            <div class="flex justify-between mb-3">
                <img src="${statusImage}" alt="status icon">
                
                <button class="rounded-full px-3 py-1 font-semibold text-sm uppercase ${priorityColor}">
                    ${issue.priority}
                </button>
            </div>

            <div class="space-y-2 my-4">
                <h1 class="text-xl font-bold">${issue.title}</h1>
                <p class="text-gray-400 text-sm">${issue.description}</p>
            </div>

            <div class="flex gap-2 flex-wrap mb-4">
                ${labelsHTML}
            </div>

            <hr>

            <div class="text-gray-400 mt-4 text-sm">
                <p>#${issue.id} by ${issue.author}</p>
                <p>${date}</p>
            </div>

        </div>
        `;

        container.innerHTML += card;

    });
}


loadData();