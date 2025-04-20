const apiRezervime = "http://localhost:5134/api/Rezervimis";

// Shfaq formën për pacient
function showPacientForm() {
    $('#tabs').hide();
    $('#pacientForm').show();
}

// Shfaq modalin e login për staf
function showStafLogin() {
    $('#loginModal').show();
}

// Mbyll modalin
function closeLoginModal() {
    $('#loginModal').hide();
}

// Login bazik për stafin 
function login() {
    let email = $('#email').val();
    let password = $('#password').val();

    if (email === 'staff@klinika.com' && password === '12345') {
        alert('Login i suksesshëm!');
        $('#loginModal').hide();
        showRezervimetStaf();
    } else {
        alert('Email ose fjalëkalimi gabim!');
    }
}

// POST: Rezervo një vizitë
function rezervo() {
    let rezervimi = {
        emri: $('#emer').val(),
        mbiemri: $('#mbiemer').val(),
        data: $('#data').val(),
        ora: $('#ora').val(),
        sherbimi: $('#lloji').val(),
        numri_telefonit: $('#telefon').val()
    };

    fetch(apiRezervime, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rezervimi)
    })
    .then(res => {
        if (!res.ok) throw new Error("Gabim gjatë regjistrimit");
        alert("Rezervimi u regjistrua me sukses!");
        $('#rezervoForm')[0].reset();
    })
    .catch(err => alert(err));
}

// GET: Merr dhe shfaq të gjitha rezervimet
function showRezervimetStaf() {
    fetch(apiRezervime)
        .then(res => res.json())
        .then(rezervimet => {
            let rezervimetHTML = '';

            rezervimet.forEach((r, index) => {
                rezervimetHTML += `
                    <div class="card">
                        <p><strong>Emri:</strong> ${r.emri} ${r.mbiemri}</p>
                        <p><strong>Data:</strong> ${r.data}</p>
                        <p><strong>Lloji:</strong> ${r.sherbimi}</p>
                        <p><strong>Numri i telefonit:</strong> ${r.numri_telefonit}</p>
                        <p><strong>Ora:</strong> ${r.ora}</p>
                        <button class="mark-completed-btn" onclick="markAsCompleted(${r.id})">Mark as Completed</button>
                        <button class="delete-btn" onclick="deleteRezervim(${r.id})">Delete</button>
                    </div>
                    <hr>
                `;
            });

            $('#rezervimetStaf').html(rezervimetHTML || "<p>Nuk ka asnjë rezervim.</p>");
            $('#tabs').hide();
            $('#stafForm').show();

            showStatistikat(rezervimet);
        });
}

// PUT: Mark as completed
function markAsCompleted(id) {
    fetch(`${apiRezervime}/${id}`)
        .then(res => res.json())
        .then(r => {
            r.completed = true;
            return fetch(`${apiRezervime}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(r)
            });
        })
        .then(() => {
            alert("Rezervimi u shënua si i përfunduar.");
            showRezervimetStaf();
        })
        .catch(err => alert("Gabim në përditësim."));
}

// DELETE: Fshi një rezervim
function deleteRezervim(id) {
    fetch(`${apiRezervime}/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        alert("Rezervimi u fshi.");
        showRezervimetStaf();
    })
    .catch(err => alert("Gabim në fshirje."));
}

// Filtrim rezervimesh
function filterRezervimet() {
    const data = $('#dataFiltrimi').val();
    const lloji = $('#llojiFiltrimi').val();

    fetch(apiRezervime)
        .then(res => res.json())
        .then(all => {
            let filtruar = all;

            if (data) filtruar = filtruar.filter(r => r.data === data);
            if (lloji) filtruar = filtruar.filter(r => r.sherbimi === lloji);

            let html = '';
            filtruar.forEach(r => {
                html += `
                    <div class="card">
                        <p>${r.emri} ${r.mbiemri}</p>
                        <p>${r.data} - ${r.ora}</p>
                        <p>${r.sherbimi}</p>
                        <button onclick="markAsCompleted(${r.id})">Mark as Completed</button>
                        <button onclick="deleteRezervim(${r.id})">Delete</button>
                    </div>
                    <hr>
                `;
            });

            $('#rezervimetStaf').html(html || "<p>Nuk u gjetën të dhëna për filtrin.</p>");
        });
}

// Statistika
function showStatistikat(rezervimet) {
    $('#statistikat').show();
    $('#totalRezervime').text('Total rezervime: ' + rezervimet.length);

    let statistika = {};
    rezervimet.forEach(r => {
        statistika[r.sherbimi] = (statistika[r.sherbimi] || 0) + 1;
    });

    let html = '';
    for (let lloji in statistika) {
        html += `<p>${lloji}: ${statistika[lloji]}</p>`;
    }

    $('#statistikaLloji').html(html);
}

// Fillimi
$(document).ready(function () {
    $('#pacientForm').hide();
    $('#stafForm').hide();
    $('#tabs').show();
    $('#statistikat').hide();
});