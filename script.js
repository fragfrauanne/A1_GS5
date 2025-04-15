const tasks = [
    { question: "Mein Bruder - im Supermarkt - arbeiten", answer: "Mein Bruder arbeitet im Supermarkt." },
    { question: "Am Abend - ich - fernsehen", answer: "Am Abend sehe ich fern." },
    { question: "Der Deutschkurs - um 9.30 Uhr - anfangen", answer: "Der Deutschkurs fängt um 9.30 Uhr an." },
    { question: "Er - kein Schweinefleisch - essen", answer: "Er isst kein Schweinefleisch." },
    { question: "Robert - 30 Jahre alt - sein", answer: "Robert ist 30 Jahre alt." },
    { question: "Er - ein bisschen Deutsch - sprechen", answer: "Er spricht ein bisschen Deutsch." },
    { question: "Um 7 Uhr - ich - aufstehen", answer: "Um 7 Uhr stehe ich auf." },
    { question: "Ich - nicht so gern - spazieren gehen", answer: "Ich gehe nicht so gern spazieren." },
    { question: "Ihr - gern Kuchen - essen", answer: "Ihr esst gern Kuchen." },
    { question: "Die Kinder - das Kinderzimmer - aufräumen", answer: "Die Kinder räumen das Kinderzimmer auf." },
    { question: "Du - immer spät - aufstehen", answer: "Du stehst immer spät auf." },
    { question: "Ich - die Wohnung - aufräumen", answer: "Ich räume die Wohnung auf." },
    { question: "Du - verheiratet - sein", answer: "Du bist verheiratet." },
    { question: "Ihr - müde - sein", answer: "Ihr seid müde." },
    { question: "Tim - gern - fernsehen", answer: "Tim sieht gern fern." },
    { question: "Du - gern Obst - essen", answer: "Du isst gern Obst." },
    { question: "Ich - meine Mutter - anrufen", answer: "Ich rufe meine Mutter an." },
    { question: "Um 13 Uhr - wir - essen", answer: "Um 13 Uhr essen wir." }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
        });

        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Verhindert, dass das Klicken auf den Button auch das Klicken auf die Karte auslöst
            card.remove();
            checkEnd();
        };

        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}

// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);