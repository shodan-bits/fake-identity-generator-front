document.addEventListener("DOMContentLoaded", function () {
    const generateBtn = document.getElementById("generate");
    const identityDiv = document.getElementById("identity");

    generateBtn.addEventListener("click", async function () {
        try {
            // Récupération des données d'identité
            const response = await fetch("https://api.render.com/deploy/srv-cvfe1snnoe9s73bgb6u0?key=Qyl4hY2racQ");
            const data = await response.json();
            if (!response.ok) throw new Error("Erreur lors de la récupération des données");

            // Génération d'une image aléatoire crédible
            const randomImageUrl = `https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}`;

            // Création du contenu HTML
            identityDiv.innerHTML = `
                <p><strong><u>Name:</u></strong> <span class="copy-text" data-value="${data.full_name}">${data.full_name}</span> <i class="ri-file-copy-line copy-icon"></i></p>
                <p><strong><u>Address:</u></strong> <span class="copy-text" data-value="${data.address}">${data.address}</span> <i class="ri-file-copy-line copy-icon"></i></p>
                <p><strong><u>Email:</u></strong> <span class="copy-text" data-value="${data.email}">${data.email}</span> <i class="ri-file-copy-line copy-icon"></i></p>
                <p><strong><u>Phone:</u></strong> <span class="copy-text" data-value="${data.phone}">${data.phone}</span> <i class="ri-file-copy-line copy-icon"></i></p>
                <p><strong><u>Birthdate:</u></strong> <span class="copy-text" data-value="${data.birthdate}">${data.birthdate}</span> <i class="ri-file-copy-line copy-icon"></i></p>
                <p><strong><u>Social Security:</u></strong> <span class="copy-text" data-value="${data.social_security_number}">${data.social_security_number}</span> <i class="ri-file-copy-line copy-icon"></i></p>
                <p><strong><u>Credit Card:</u></strong> <span class="copy-text" data-value="${data.credit_card_number}">${data.credit_card_number} (Exp: ${data.credit_card_expiry}, CVV: ${data.credit_card_cvv})</span> <i class="ri-file-copy-line copy-icon"></i></p>
                <p><strong><u>Company:</u></strong> <span class="copy-text" data-value="${data.company}">${data.company}</span> <i class="ri-file-copy-line copy-icon"></i></p>
                <p><strong><u>Job:</u></strong> <span class="copy-text" data-value="${data.job}">${data.job}</span> <i class="ri-file-copy-line copy-icon"></i></p>
                <p><strong><u>Education:</u></strong> <span class="copy-text" data-value="${data.education}">${data.education}</span> <i class="ri-file-copy-line copy-icon"></i></p>
                <p><strong><u>Password:</u></strong> <span class="copy-text" data-value="${data.password}">${data.password}</span> <i class="ri-file-copy-line copy-icon"></i></p>
                <p><strong><u>Bank Statement:</u></strong> <span class="copy-text" data-value="${data.bank_statement}">${data.bank_statement}</span> <i class="ri-file-copy-line copy-icon"></i></p>

                <p><strong>Profile Image:</strong></p>
                <div class="image-container">
                    <img id="profileImage" src="${randomImageUrl}" alt="Generated Image" width="200">
                    <div class="download-buttons">
                        <button id="downloadJpg" class="download-btn">Download JPG</button>
                        <button id="downloadPng" class="download-btn">Download PNG</button>
                    </div>
                </div>
            `;

            // Gestion du téléchargement d'image
            document.getElementById("downloadJpg").addEventListener("click", function () {
                downloadImage("jpg");
            });

            document.getElementById("downloadPng").addEventListener("click", function () {
                downloadImage("png");
            });

            function downloadImage(format) {
                const imgElement = document.getElementById("profileImage");
                const imgURL = imgElement.src;
                const fileName = `profile_image_${Date.now()}`;

                // Créer un canvas pour convertir l'image en un format téléchargeable
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = function () {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    const dataURL = canvas.toDataURL(`image/${format}`);
                    const link = document.createElement("a");
                    link.href = dataURL;
                    link.download = `${fileName}.${format}`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                };
                img.src = imgURL;
            }

            // Gestion des icônes de copie
            document.querySelectorAll(".copy-text").forEach(item => {
                const icon = item.nextElementSibling;

                function showIcon() {
                    icon.style.display = "inline-block";
                }

                function hideIcon() {
                    setTimeout(() => {
                        if (!icon.matches(":hover") && !item.matches(":hover")) {
                            icon.style.display = "none";
                        }
                    }, 200);
                }

                item.addEventListener("mouseover", showIcon);
                item.addEventListener("mouseout", hideIcon);
                icon.addEventListener("mouseover", showIcon);
                icon.addEventListener("mouseout", hideIcon);

                icon.addEventListener("click", function (event) {
                    event.stopPropagation();
                    copyToClipboard(this, item.dataset.value);
                });
            });

        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
        }
    });

    function copyToClipboard(icon, text) {
        navigator.clipboard.writeText(text).then(() => {
            icon.innerHTML = "Copied!";
            icon.classList.add("copied");
            setTimeout(() => {
                icon.innerHTML = `<i class="ri-file-copy-line"></i>`;
                icon.classList.remove("copied");
            }, 2000);
        }).catch(err => {
            console.error("Failed to copy:", err);
        });
    }
});
