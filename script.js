const BASE_URL = "https://www.thecolorapi.com";
const form = document.querySelector('#controls');

function handleSubmit(e) {
    e.preventDefault();
    const hex = document.querySelector('#colour-picker').value.slice(1);
    const mode = document.querySelector('#mode-select').value;
    getColours(hex, mode);
}

async function getColours(hex, mode) {
    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const response = await fetch(`${BASE_URL}/scheme?hex=${hex}&mode=${mode}`, options);
        const colours = await response.json();
        displayColours(colours);
    } catch (err) {
        console.log('Error getting data', err)
    }
    
} // getColours()

function displayColours(schemeData) {
    const colourGrid = document.querySelector('#colour-grid');
    colourGrid.innerHTML = '';

    for (let colour of schemeData.colors) {
        const colourContainer = document.createElement('div');
        colourContainer.classList.add('colour-container');

        const backgroundCol = document.createElement('div');
        backgroundCol.classList.add('background-colour');
        backgroundCol.style.backgroundColor = colour.hex.value;
        backgroundCol.style.color = colour.contrast.value;
        backgroundCol.textContent = colour.name.value;

        const colourCode = document.createElement('div');
        colourCode.classList.add('colour-code');
        colourCode.textContent = colour.hex.value;
        colourCode.addEventListener('click', copyHexCode);

        colourContainer.append(backgroundCol,colourCode);
        colourGrid.append(colourContainer);

    }

} // displayColours()

form.addEventListener('submit', handleSubmit);

async function copyHexCode(e) {

    const hex = e.target.textContent;

        try {
            await navigator.clipboard.writeText(hex);
            console.log(`Copied ${hex} to clipboard`);
            e.target.style.backgroundColor = 'gainsboro';
            e.target.textContent = 'Copied!';
            setTimeout( () => {
                e.target.textContent = hex;
                e.target.style.backgroundColor = 'unset';
            },1000)
        } catch (err) {
            console.log('Copy failed', err)
        }
    
}