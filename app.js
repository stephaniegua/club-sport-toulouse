const API_URL = 'https://data.toulouse-metropole.fr/api/explore/v2.1/catalog/datasets/annuaire-des-associations-et-clubs-sportifs/records';

let clubs = [];
let map = null;
let markers = [];

const elements = {
    commune: document.getElementById('commune'),
    discipline: document.getElementById('discipline'),
    adapte: document.getElementById('adapte'),
    count: document.getElementById('count'),
    clubList: document.getElementById('clubList'),
    map: document.getElementById('map')
};

const TOULOUSE_CENTER = [43.6047, 1.4442];

function initMap() {
    map = L.map('map').setView(TOULOUSE_CENTER, 11);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

function createMarkerIcon() {
    return L.divIcon({
        className: 'custom-marker',
        html: `<div style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="42" viewBox="0 0 24 24" fill="#3b82f6" stroke="white" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3" fill="white"/>
            </svg>
        </div>`,
        iconSize: [30, 42],
        iconAnchor: [15, 42],
        popupAnchor: [0, -42]
    });
}

async function fetchClubs() {
    try {
        const response = await fetch(`${API_URL}?limit=100`);
        const data = await response.json();
        clubs = data.results;
        populateFilters();
        applyFilters();
    } catch (error) {
        console.error('Erreur:', error);
        elements.clubList.innerHTML = '<div class="no-results">Erreur lors du chargement des données</div>';
    }
}

function populateFilters() {
    const communes = [...new Set(clubs.map(c => c.uf_commune).filter(Boolean))].sort();
    const disciplines = [...new Set(clubs.map(c => c.discipline).filter(Boolean))].sort();
    
    communes.forEach(c => {
        const option = document.createElement('option');
        option.value = c;
        option.textContent = c;
        elements.commune.appendChild(option);
    });
    
    disciplines.forEach(d => {
        const option = document.createElement('option');
        option.value = d;
        option.textContent = d;
        elements.discipline.appendChild(option);
    });
}

function applyFilters() {
    const filtered = clubs.filter(club => {
        const matchCommune = !elements.commune.value || 
            (club.uf_commune && club.uf_commune.toLowerCase().includes(elements.commune.value.toLowerCase()));
        const matchDiscipline = !elements.discipline.value || 
            (club.discipline && club.discipline.toLowerCase().includes(elements.discipline.value.toLowerCase()));
        const matchApade = !elements.adapte.checked || club.handicapes === 'Oui';
        return matchCommune && matchDiscipline && matchApade;
    });
    
    elements.count.textContent = filtered.length;
    renderClubs(filtered);
    renderMarkers(filtered);
}

function renderClubs(clubs) {
    if (clubs.length === 0) {
        elements.clubList.innerHTML = '<div class="no-results">Aucun club trouvé</div>';
        return;
    }
    
    elements.clubList.innerHTML = clubs.map((club, index) => `
        <div class="club-card" data-index="${index}">
            <h3>${club.asso_nom}</h3>
            <span class="sport-badge">${club.discipline}</span>
            ${club.handicapes === 'Oui' ? '<span class="handicap-badge">Accessibilité handicap</span>' : ''}
            <div class="club-info">
                ${club.uf_commune ? `<p>📍 ${club.uf_commune}</p>` : ''}
                ${club.rue_libelle ? `<p>🏠 ${club.numero || ''} ${club.rue_libelle}</p>` : ''}
                ${club.pers_internet ? `<a href="http://${club.pers_internet}" target="_blank">🌐 Site web</a>` : ''}
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.club-card').forEach(card => {
        card.addEventListener('click', () => {
            const index = parseInt(card.dataset.index);
            const club = clubs[index];
            
            document.querySelectorAll('.club-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            
            if (club.geolocalisation) {
                map.setView([club.geolocalisation.lat, club.geolocalisation.lon], 15);
            }
        });
    });
}

function renderMarkers(clubs) {
    markers.forEach(m => map.removeLayer(m));
    markers = [];
    
    clubs.forEach(club => {
        if (club.geolocalisation) {
            const marker = L.marker(
                [club.geolocalisation.lat, club.geolocalisation.lon],
                { icon: createMarkerIcon() }
            ).addTo(map);
            
            marker.bindPopup(`
                <div class="popup-content">
                    <strong>${club.asso_nom}</strong>
                    <p>${club.discipline}</p>
                    ${club.rue_libelle ? `<p>${club.numero || ''} ${club.rue_libelle}</p>` : ''}
                    ${club.uf_commune ? `<p>${club.uf_commune}</p>` : ''}
                </div>
            `);
            
            markers.push(marker);
        }
    });
}

elements.commune.addEventListener('change', applyFilters);
elements.discipline.addEventListener('change', applyFilters);
elements.adapte.addEventListener('change', applyFilters);

initMap();
fetchClubs();
