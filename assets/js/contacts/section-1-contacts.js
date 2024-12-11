document.addEventListener('DOMContentLoaded', () => {
    const legalH2 = document.getElementById('legal-office-title-h2')
    const legalH3 = document.getElementById('legal-office-title-h3')
    const legalList = document.getElementById('legal-list-of-cities-container');
    const legalAddresses = document.getElementById('legal-list-of-addresses')

    const operationH2 = document.getElementById('operation-office-title-h2')
    const operationH3 = document.getElementById('operation-office-title-h3')
    const operationalList = document.getElementById('operation-list-of-cities-container');
    const operationAddresses = document.getElementById('operation-list-of-addresses')

    const backBtn = document.getElementById('section-1-contacts__back-btn');

    const mapContainer = document.querySelector('.section-1-contacts__map-container');
    const mapPointer = document.getElementById('map-pointer');

    const textsContainers = document.querySelector('.section-1-contacts-offices-container');

    let selectedPinContent = null;

    const originalMapSize = { width: 415, height: 543 };
    const pointerAspectRatio = 0.62;

    const pinsData = [
        {
            id: 'map-pin-milan',
            city: 'Milano',
            originalX: 87,
            originalY: 95,
            pointerOffset: 30,
            pointerRotation: 180,
            sedeLegale: {
                cityLabel: "Milano",
                contacts: [
                    {
                        addressString: "Via Example 10, 20100 Milano",
                        email: "milano@edge.com",
                        phone: "+39 345678910"
                    }
                ]
            },
            sedeOperativa: {
                cityLabel: "Milano",
                contacts: [
                    {
                        addressString: "Via Operativa 20, 20100 Milano",
                        email: "operativa.milano@edge.com",
                        phone: "+39 3472994421"
                    }
                ]
            }
        },
        {
            id: 'map-pin-tourin',
            city: 'Torino',
            originalX: 47,
            originalY: 95,
            pointerOffset: 40,
            pointerRotation: 135,
            sedeOperativa: {
                cityLabel: "Torino",
                contacts: [
                    {
                        addressString: "Piazza Tancredi Galimberti 18 - 10134 Torino",
                        email: "",
                        phone: "+39 3472994421"
                    },
                    {
                        addressString: "Corso Vittorio Emanuele II 162 - 10138 Torino",
                        email: "",
                        phone: "+39 3477492818"
                    }
                ]
            }
        },
        {
            id: 'map-pin-casale',
            city: 'Casale Monferrato',
            originalX: 70,
            originalY: 118,
            pointerOffset: 50,
            pointerRotation: 45,
            sedeOperativa: {
                cityLabel: "Casale Monferrato",
                contacts: [
                    {
                        addressString: "Corso Vittorio Emanuele II 162 - 10138 Torino",
                        email: "",
                        phone: "+39 345678910"
                    }
                ]
            }
        },
        {
            id: 'map-pin-mantova',
            city: 'Mantova',
            originalX: 135,
            originalY: 120,
            pointerOffset: 40,
            pointerRotation: 225,
            sedeOperativa: {
                cityLabel: "Mantova",
                contacts: [
                    {
                        addressString: "",
                        email: "",
                        phone: "+39 345678910"
                    }
                ]
            }
        },
        {
            id: 'map-pin-verona',
            city: 'Verona',
            originalX: 135,
            originalY: 80,
            pointerOffset: 30,
            pointerRotation: 135,
            sedeOperativa: {
                cityLabel: "Verona",
                contacts: [
                    {
                        addressString: "Via del Perlar 37/b – 37135 Verona",
                        email: "",
                        phone: "+39 345678910"
                    }
                ]
            }
        },
        {
            id: 'map-pin-ferrara',
            city: 'Ferrara',
            originalX: 165,
            originalY: 140,
            pointerOffset: 60,
            pointerRotation: 90,
            sedeOperativa: {
                cityLabel: "Ferrara",
                contacts: [
                    {
                        addressString: "Via Annibale Zucchini, 57/F – 44122 Ferrara",
                        email: "",
                        phone: "+39 345678910"
                    }
                ]
            }
        },
        {
            id: 'map-pin-padova',
            city: 'Padova',
            originalX: 165,
            originalY: 100,
            pointerOffset: 50,
            pointerRotation: 0,
            sedeOperativa: {
                cityLabel: "Padova",
                contacts: [
                    {
                        addressString: "",
                        email: "",
                        phone: "+39 345678910"
                    }
                ]
            }
        },
        {
            id: 'map-pin-calabria',
            city: 'Reggio Calabria',
            originalX: 340,
            originalY: 440,
            pointerOffset: 40,
            pointerRotation: 270,
            sedeOperativa: {
                cityLabel: "Reggio Calabria",
                contacts: [
                    {
                        addressString: "Vico S'Anna di Sbarre Inferiori – 89132 Reggio Calabria",
                        email: "",
                        phone: "+39 345678910"
                    }
                ]
            }
        }
    ];

    let activePinId = null;

    function positionPins() {
        const containerWidth = mapContainer.clientWidth;
        const containerHeight = mapContainer.clientHeight;
        const containerRatio = containerWidth / containerHeight;
        const originalRatio = originalMapSize.width / originalMapSize.height;

        let displayedMapWidth, displayedMapHeight;

        if (containerRatio > originalRatio) {
            displayedMapHeight = containerHeight;
            displayedMapWidth = displayedMapHeight * originalRatio;
        } else {
            displayedMapWidth = containerWidth;
            displayedMapHeight = displayedMapWidth / originalRatio;
        }

        const offsetX = (containerWidth - displayedMapWidth) / 2;
        const offsetY = (containerHeight - displayedMapHeight) / 2;

        pinsData.forEach(pin => {
            const pinElement = document.getElementById(pin.id);
            const scaledX = offsetX + (pin.originalX / originalMapSize.width) * displayedMapWidth;
            const scaledY = offsetY + (pin.originalY / originalMapSize.height) * displayedMapHeight;

            pinElement.style.left = `${scaledX}px`;
            pinElement.style.top = `${scaledY}px`;
        });
    }

    function createSelectedPinContent(pin) {
        // Create a container
        const container = document.createElement('div');
        container.id = 'selected-pin-content';

        let html = '';

        // Sede Legale
        if (pin.sedeLegale) {
            html += `<div class="section-1-contacts-legal-office-container">
                        <h2>Sede legale</h2>
                        <h3>${pin.sedeLegale.cityLabel}</h3>`;
            pin.sedeLegale.contacts.forEach(contact => {
                if (contact.addressString) html += `<p>${contact.addressString}</p>`;
                if (contact.email) html += `<p>${contact.email}</p>`;
                if (contact.phone) html += `<p>${contact.phone}</p>`;
            });
            html += `</div>`;
        }

        // Sede Operativa
        if (pin.sedeOperativa) {
            html += `<div class="section-1-contacts-operation-office-container">
                        <h2>Sedi operative</h2>
                        <h3>${pin.sedeOperativa.cityLabel}</h3>`;
            pin.sedeOperativa.contacts.forEach(contact => {
                if (contact.addressString) html += `<p>${contact.addressString}</p>`;
                if (contact.email) html += `<p>${contact.email}</p>`;
                if (contact.phone) html += `<p>${contact.phone}</p>`;
            });
            html += `</div>`;
        }

        container.innerHTML = html;
        return container;
    }

    function showSelectedPinContent(pin) {
        console.log(pin);
        // Reset everything first
        textsContainers.style.gap = '50px';
        legalAddresses.style.left = '-800px';
        operationAddresses.style.left = '-800px';
        legalH2.style.top = '0px';
        legalH3.style.fontFamily = 'Mundial Regular';
        legalList.style.top = '50px';
        operationalList.style.top = '50px';
        operationalList.style.left = '-800px';
        backBtn.style.left = '0';

        // If the pin has Sede Legale data
        if (pin.sedeLegale && pin.sedeLegale.contacts && pin.sedeLegale.contacts.length > 0) {
            // Show the legal section properly
            legalH2.style.top = '0px';
            legalList.style.top = '50px';
            textsContainers.style.gap = '100px';
            legalH3.textContent = pin.sedeLegale.cityLabel || 'Sede Legale';
            // Populate legal-list-of-addresses
            const legalAddressesHTML = pin.sedeLegale.contacts.map(contact => {
                let lines = '';
                if (contact.addressString) lines += `<div class="address-text-line">${contact.addressString}</div>`;
                if (contact.email) lines += `<div class="address-text-line">${contact.email}</div>`;
                if (contact.phone) lines += `<div class="address-text-line">${contact.phone}</div>`;
                return `<div class="address-text-line-container">${lines}</div>`;
            }).join('');

            legalAddresses.innerHTML = legalAddressesHTML;
            legalAddresses.style.left = '0px';
        } else {
            // No sede legale data, move it out of sight
            textsContainers.style.gap = '0px';
            legalH2.style.top = '-800px';
            legalList.style.top = '-800px';
            legalAddresses.style.left = '-800px';
        }

        // If the pin has Sede Operativa data
        if (pin.sedeOperativa && pin.sedeOperativa.contacts && pin.sedeOperativa.contacts.length > 0) {
            operationH2.style.top = '0px';
            operationalList.style.top = '50px';
            operationH3.textContent = pin.sedeOperativa.cityLabel || 'Sede Operativa';

            // Populate operation-list-of-addresses
            let operationAddressesHTML = pin.sedeOperativa.contacts.map(contact => {
                let lines = '';
                if (contact.addressString) lines += `<div class="address-text-line">${contact.addressString}</div>`;
                if (contact.email) lines += `<div class="address-text-line">${contact.email}</div>`;
                if (contact.phone) lines += `<div class="address-text-line">${contact.phone}</div>`;
                return `<div class="address-text-line-container">${lines}</div>`;
            }).join('');

            // Add the city element directly into the HTML
            const cityElementHTML = `<h3 id="h3-text__map-pin-${pin.sedeOperativa.cityLabel.toLowerCase()}" class="office-title-h3 MundialRegular" onclick="window.movePointerToPinByCity('${pin.sedeOperativa.cityLabel}')">${pin.sedeOperativa.cityLabel}</h3>`;
            operationAddressesHTML = cityElementHTML + operationAddressesHTML;

            operationAddresses.innerHTML = operationAddressesHTML;
            operationAddresses.style.left = '0px';
            operationAddresses.style.top = '50px';
        } else {
            // No sede operativa data, move it out of sight
            operationH2.style.top = '-800px';
            operationalList.style.top = '-800px';
            operationAddresses.style.left = '-800px';
        }
    }

    // In the movePointerToPin function, after positioning the pointer, just call showSelectedPinContent(pin)
    function movePointerToPin(pin) {
        const pinElement = document.getElementById(pin.id);
        const pinRect = pinElement.getBoundingClientRect();
        const containerRect = mapContainer.getBoundingClientRect();

        const pinCenterX = pinRect.left - containerRect.left + pinRect.width / 2;
        const pinCenterY = pinRect.top - containerRect.top + pinRect.height / 2;

        const pointerWidth = 100;
        const pointerHeight = pointerWidth * pointerAspectRatio;

        const angleRad = (pin.pointerRotation * Math.PI) / 180;
        const offsetX = Math.cos(angleRad) * pin.pointerOffset;
        const offsetY = Math.sin(angleRad) * pin.pointerOffset;

        mapPointer.style.width = `${pointerWidth}px`;
        mapPointer.style.height = `${pointerHeight}px`;

        mapPointer.style.left = `${pinCenterX + offsetX}px`;
        mapPointer.style.top = `${pinCenterY + offsetY}px`;
        mapPointer.style.transform = `translate(-50%, -50%) rotate(${pin.pointerRotation + 180}deg) scale(.5)`;

        if (activePinId && activePinId !== pin.id) {
            const previousActivePin = document.getElementById(activePinId);
            previousActivePin.classList.remove('active');
        }
        pinElement.classList.add('active');
        activePinId = pin.id;

        // Show the back button
        backBtn.style.left = '0';

        showSelectedPinContent(pin);
    }

    // Also ensure that section1ContactsUnselect resets the HTML if needed.
    function section1ContactsUnselect() {
        textsContainers.style.gap = '50px'

        legalH3.style.fontFamily = 'Mundial Thin'
        legalAddresses.style.left = '-800px'

        // LEGAL
        legalH2.style.top = '0px'
        legalList.style.top = '50px'

        // OPERATIONS
        operationalList.style.top = '50px';
        operationalList.style.left = '0px';

        operationAddresses.style.left = '-800px'

        // BACK
        backBtn.style.left = '-1200px';

        // MAP
        mapPointer.style.left = '1200px';
        mapPointer.style.top = '0px';
        mapPointer.style.transform = 'translate(-50%, -50%) rotate(-90deg) scale(1)';

        if (activePinId) {
            const previousActivePin = document.getElementById(activePinId);
            if (previousActivePin) {
                previousActivePin.classList.remove('active');
            }
            activePinId = null;
        }

        // Remove selected pin content and show default view
        if (selectedPinContent) {
            selectedPinContent.remove();
            selectedPinContent = null;
        }

        legalAddresses.innerHTML = '';
        operationAddresses.innerHTML = '';
    }

    function movePointerToPin(pin) {
        const pinElement = document.getElementById(pin.id);
        const pinRect = pinElement.getBoundingClientRect();
        const containerRect = mapContainer.getBoundingClientRect();

        const pinCenterX = pinRect.left - containerRect.left + pinRect.width / 2;
        const pinCenterY = pinRect.top - containerRect.top + pinRect.height / 2;

        const pointerWidth = 100;
        const pointerHeight = pointerWidth * pointerAspectRatio;

        const angleRad = (pin.pointerRotation * Math.PI) / 180;
        const offsetX = Math.cos(angleRad) * pin.pointerOffset;
        const offsetY = Math.sin(angleRad) * pin.pointerOffset;

        mapPointer.style.width = `${pointerWidth}px`;
        mapPointer.style.height = `${pointerHeight}px`;

        mapPointer.style.left = `${pinCenterX + offsetX}px`;
        mapPointer.style.top = `${pinCenterY + offsetY}px`;
        mapPointer.style.transform = `translate(-50%, -50%) rotate(${pin.pointerRotation + 180}deg) scale(.5)`;

        if (activePinId && activePinId !== pin.id) {
            const previousActivePin = document.getElementById(activePinId);
            previousActivePin.classList.remove('active');
        }
        pinElement.classList.add('active');
        activePinId = pin.id;

        // Show the back button
        backBtn.style.left = '0';

        // Show selected pin content in left column
        showSelectedPinContent(pin);
    }

    // Make the function globally accessible
    window.movePointerToPin = movePointerToPin;

    // Helper to move pointer by city name
    window.movePointerToPinByCity = function (cityName) {
        const pin = pinsData.find(p => p.city.toLowerCase() === cityName.toLowerCase());
        if (pin) {
            movePointerToPin(pin);
        }
    }

    // Attach event listeners to pins
    pinsData.forEach(pin => {
        const pinElement = document.getElementById(pin.id);
        pinElement.addEventListener('click', () => movePointerToPin(pin));

        pinElement.setAttribute('tabindex', '0');
        pinElement.setAttribute('role', 'button');
        pinElement.setAttribute('aria-label', pin.city || 'Map Pin');

        pinElement.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                movePointerToPin(pin);
            }
        });
    });

    // Make the deselect function global as well
    window.section1ContactsUnselect = section1ContactsUnselect;

    // Initial positioning of pins
    positionPins();

    window.addEventListener('resize', () => {
        positionPins();
        if (activePinId) {
            const activePin = pinsData.find(pin => pin.id === activePinId);
            if (activePin) {
                movePointerToPin(activePin);
            }
        }
    });
});