
document.getElementById("kontaktForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const koment = {
        emri: document.getElementById("emri").value,
        mbiemri: document.getElementById("mbiemri").value,
        komentiTekst: document.getElementById("komentiTekst").value,
        vleresimiNeYje: parseInt(document.getElementById("vleresimiNeYje").value),
    };

    fetch("http://localhost:5134/api/Komentis", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(koment)
    })
    .then(res => {
        if (res.ok) {
            // Shfaq modalin e suksesit
            document.getElementById("suksesModal").style.display = "block";
        } else {
            alert("Gabim gjatë dërgimit të komenti!");
        }
    })
    .catch(err => console.error("Gabim:", err));
});

// Mbyll modalin
document.getElementById("closeModal").addEventListener("click", function () {
    document.getElementById("suksesModal").style.display = "none";
});