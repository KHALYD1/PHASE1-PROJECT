const menuContainer = document.getElementById("menu-container");

async function fetchFruits() {
    try {
        const response = await fetch("https://www.fruityvice.com/api/fruit/all");
        const fruits = await response.json();
        return fruits;
    } catch (error) {
        console.error(error);
    }
}

function createMenuItem(fruit) {
    const menuItem = document.createElement("div");
    menuItem.classList.add("menu-item");

    const image = document.createElement("img");
    image.src = fruit.image;
    image.alt = fruit.name;
    menuItem.appendChild(image);

    const text = document.createElement("div");

    const name = document.createElement("h2");
    name.textContent = fruit.name;
    text.appendChild(name);

    const description = document.createElement("p");
    description.textContent = fruit.nutrition;
    text.appendChild(description);

    menuItem.appendChild(text);

    menuContainer.appendChild(menuItem);
}

async function main() {
    const fruits = await fetchFruits();
    fruits.forEach(fruit => {
        createMenuItem(fruit);
    });
}

main();