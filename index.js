const apiUrl = "http://localhost:5134/api/Komentis";
        
function shkarkoKomentet() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(komentet => {
            const container = document.getElementById("komenteContainer");
            container.innerHTML = ""; // Pastro para ngarkimit

            komentet.forEach(koment => {
                const card = document.createElement("div");
                card.className = "card m-2 p-3 shadow";
                card.style.backgroundColor = "#e3f2fd";

                card.innerHTML = `
                    <h5>${koment.emri} ${koment.mbiemri} 
                        <small class="text-muted">(${koment.vleresimiNeYje} ⭐)</small>
                    </h5>
                    <p>${koment.komentiTekst}</p>
                    <div class="mt-2">
                        <button class="btn btn-sm btn-warning me-2" onclick="editoKoment(${koment.id})">Edito</button>
                        <button class="btn btn-sm btn-danger" onclick="fshijKoment(${koment.id})">Fshij</button>
                    </div>
                `;
                container.appendChild(card);
            });
        });
}

function fshijKoment(id) {
    if (confirm("A jeni i sigurt që doni ta fshini këtë koment?")) {
        fetch(`${apiUrl}/${id}`, { method: "DELETE" })
            .then(res => {
                if (res.ok) shkarkoKomentet();
                else alert("Gabim gjatë fshirjes!");
            });
    }
}

function editoKoment(id) {
    const komentiTekst = prompt("Vendos komentin e ri:");
    const vleresimiNeYje = prompt("Vendos vlerësimin e ri (1-5):");

    if (komentiTekst && vleresimiNeYje) {
        fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                komentiTekst,
                vleresimiNeYje: parseInt(vleresimiNeYje)
            })
        })
        .then(res => {
            if (res.ok) shkarkoKomentet();
            else alert("Gabim gjatë përditësimit!");
        });
    }
}

window.onload = shkarkoKomentet;