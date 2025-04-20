$(document).ready(function () {
    let sherbimet = [
        { 
            emri: "Vizita Mjekësore", 
            pershkrimi: "Kontrolle të përgjithshme dhe specialistike për diagnozën tuaj.", 
            shpjegim: "Vizitat mjekësore janë thelbësore për të monitoruar shëndetin dhe për të parandaluar sëmundjet.", 
            link: "rezervimi.html",
            ikone: "fa-user-md",
            video: "https://www.youtube.com/watch?v=ycPUPBNFTTs",
            cmimi: "1000 Lekë"
        },
        { 
            emri: "Grafi (Radiografi)", 
            pershkrimi: "Ekzaminime për kockat dhe organet e brendshme.", 
            shpjegim: "Radiografia është një teknikë diagnostike që ndihmon në identifikimin e frakturave dhe problemeve skeletore.", 
            link: "rezervimi.html",
            ikone: "fa-x-ray",
            video: "https://www.youtube.com/watch?v=hTz_rGP4v9Y",
            cmimi: "1500 Lekë"
        },
        { 
            emri: "Mamografi", 
            pershkrimi: "Kontrolle për diagnostikimin e hershëm të kancerit të gjirit.", 
            shpjegim: "Mamografia është një test jetik për gratë mbi 40 vjeç për të zbuluar ndryshime në inde gjiri.", 
            link: "rezervimi.html",
            ikone: "fa-ribbon",
            video: "https://www.youtube.com/watch?v=JYohlADZTQs",
            cmimi: "1200 Lekë"
        },
        { 
            emri: "Analiza Laboratorike", 
            pershkrimi: "Testime për të vlerësuar gjendjen shëndetësore.", 
            shpjegim: "Analizat e gjakut dhe të urinës ndihmojnë në identifikimin e anomalive dhe monitorimin e shëndetit.", 
            link: "rezervimi.html",
            ikone: "fa-vials",
            video: "https://www.youtube.com/watch?v=B0nDpbP9b40",
            cmimi: "800 Lekë"
        },
        { 
            emri: "Ekografi dhe Kontroll Kardiologjik", 
            pershkrimi: "Ekzaminime të avancuara për zemrën dhe organet e brendshme.", 
            shpjegim: "Ekografia përdoret për të diagnostikuar sëmundjet e organeve të brendshme dhe për të monitoruar funksionin e zemrës.", 
            link: "rezervimi.html",
            ikone: "fa-heartbeat",
            video: "https://www.youtube.com/watch?v=72jPsdVFxlg",
            cmimi: "2000 Lekë"
        }
    ];

    let servicesContainer = $("#services");

    $.each(sherbimet, function (index, sherbimi) {
        let serviceHTML = `
            <div class="col-md-6 col-lg-4">
                <div class="service-card" data-name="${sherbimi.emri}" 
                    data-shortdesc="${sherbimi.shpjegim}" 
                    data-info="${sherbimi.pershkrimi}" 
                    data-link="${sherbimi.link}" 
                    data-video="${sherbimi.video}" 
                    data-price="${sherbimi.cmimi}">
                    <i class="service-icon fas ${sherbimi.ikone}"></i>
                    <h4>${sherbimi.emri}</h4>
                    <p>${sherbimi.pershkrimi}</p>
                    <a href="#" class="btn-custom open-modal">Më shumë</a>
                </div>
            </div>
        `;
        servicesContainer.append(serviceHTML);
    });

    $(".open-modal").click(function () {
        let card = $(this).closest(".service-card");
        $("#serviceTitle").text(card.data("name"));
        $("#serviceShortDesc").text(card.data("shortdesc"));
        $("#serviceDescription").text(card.data("info"));
        $("#reserveBtn").attr("href", card.data("link"));
        $("#servicePrice").text("Çmimi: " + card.data("price"));

        let videoLink = card.data("video");
        let videoEmbed = `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoLink.split('v=')[1]}" frameborder="0" allowfullscreen></iframe>`;
        $("#serviceVideo").html(videoEmbed);

        $("#serviceModal").modal("show");
    });
});
