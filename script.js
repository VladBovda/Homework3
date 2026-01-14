console.log('----------------------task 1-------------------------');

class Transport {
    ride() {
    }
    stop() {
    }
}

class Car extends Transport {
    ride() {
        console.log("Car is driving");
    }

    stop() {
        console.log("Car has stopped");
    }
}

class Bike extends Transport {
    ride() {
        console.log("Bike is riding");
    }

    stop() {
        console.log("Bike has stopped");
    }
}

class Plane extends Transport {
    ride() {
        console.log("Plane is flying");
    }
    stop() {
        console.log("Plane has landed");
    }
}

class TransportFactory {
    static createTransport(type) {
        switch (type) {
            case 'car':
                return new Car();
            case 'bike':
                return new Bike();
            case 'plane':
                return new Plane();
            default:
                throw new Error('Unknown transport type');
        }
    }
}

const car = TransportFactory.createTransport("car");
car.ride();
car.stop();

const bike = TransportFactory.createTransport("bike");
bike.ride();
bike.stop();

const plane = TransportFactory.createTransport("plane");
plane.ride();
plane.stop();


console.log('----------------------task 2-------------------------');

const API = 'https://rickandmortyapi.com/api/character';
const prevButton = document.getElementById('prevBtn')
const nextButton = document.getElementById('nextBtn')
const page = document.getElementById('pageIndicator')
const grid = document.getElementById('grid')
const loading = document.getElementById('loading')

let info;

async function loadPage(url = API) {
    loading.style.display = 'block';
    grid.style.display = 'none';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        info = data.info || {};
        grid.innerHTML = (data.results || []).map(character => `
        <article class="card">
            <img src="${character.image}">
            <div class="card-body">
                <h3 class="name">${character.name}</h3>
                <div class="species">${character.species} — ${character.status}</div>
            </div>
        </article>`).join('');

        prevButton.disabled = !info.prev;
        nextButton.disabled = !info.next;

        if (!info.next) page.textContent = info.pages || '—';
        else {
            const nextPage = Number(new URL(info.next).searchParams.get('page') || 0);
            page.textContent = Math.max(1, nextPage - 1);
        }
    } catch (error) {
        grid.innerHTML = '<div class="error">Error loading data</div>';
        prevButton.disabled = nextButton.disabled = true;
        page.textContent = '—';
    } finally {
        loading.style.display = 'none';
        grid.style.display = 'flex';
    }
}

prevButton.addEventListener('click', () => info && info.prev && loadPage(info.prev));
nextButton.addEventListener('click', () => info && info.next && loadPage(info.next));

loadPage();
