document.getElementById("generatebtn").addEventListener("click", async function () {
    try {
        const response = await fetch("https://api.render.com/deploy/srv-cvfhppdumphs73da83b0?key=P7eRv3_cDMw", {
            method: "GET",
            mode: "no-cors",  // desactive le mode cors
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données");
        }

        const data = await response.json();
        console.log(data);  // Traiter les données ici

        // Génération d'une image aléatoire crédible
        const randomImageUrl = `https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}`;

        // Création du contenu HTML
        identityDiv.innerHTML = ` 
            <p><strong><u>Name:</u></strong> <span class="copy-text" data-value="${data.full_name}">${data.full_name}</span> <i class="ri-file-copy-line copy-icon"></i></p>
            <p><strong><u>Address:</u></strong> <span class="copy-text" data-value="${data.address}">${data.address}</span> <i class="ri-file-copy-line copy-icon"></i></p>
            <p><strong><u>Email:</u></strong> <span class="copy-text" data-value="${data.email}">${data.email}</span> <i class="ri-file-copy-line copy-icon"></i></p>
            <!-- Autres données... -->
            <div class="image-container">
                <img id="profileImage" src="${randomImageUrl}" alt="Generated Image" width="200">
                <div class="download-buttons">
                    <button id="downloadJpg" class="download-btn">Download JPG</button>
                    <button id="downloadPng" class="download-btn">Download PNG</button>
                </div>
            </div>
        `;

        // Télécharger l'image en format JPG ou PNG
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

    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
});
