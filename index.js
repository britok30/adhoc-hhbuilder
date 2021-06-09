// When DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    let addButton = document.getElementsByClassName('add')[0];
    addButton.addEventListener('click', addPerson);

    let submitButton = document.querySelector('button[type=submit]');
    submitButton.addEventListener('click', serializeHouseHold);
});

// Get the age value.
const getAgeValue = () => {
    // Get the input.
    let ageInput = document.getElementById('age');

    // Convert age to a number
    let age = parseInt(ageInput.value);
    return age;
};

// Get the relationship chosen from the select.
const getRelationshipValue = () => {
    let relationshipSelect = document.getElementById('rel');
    let relationship = relationshipSelect.value;

    return relationship;
};

// Get the smoker status.
const isSmoker = () => {
    let smokerInput = document.getElementById('smoker');
    return smokerInput.checked;
};

// Add a person as a list item to the household represented by an ordered list.
const addPerson = (event) => {
    event.preventDefault();

    // Get and validate the age entered into the age input.
    let age = getAgeValue();
    if (age <= 0 || isNaN(age || !age)) {
        alert('Please enter in a valid age!');
        return;
    }

    // Get and validate the relationship entered into the relationship select.
    let relationship = getRelationshipValue();
    if (relationship === '' || !relationship) {
        alert('Please select a valid relationship!');
        return;
    }

    // Get the smoker status.
    let smoker = isSmoker() ? 'smoker' : 'nonsmoker';

    // Get the ordered list.
    let household = document.getElementsByClassName('household')[0];

    // Create a list item.
    let person = document.createElement('li');
    person.textContent = relationship + ' ' + age + ' ' + smoker + ' ';

    // Create a remove button
    let button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Remove';

    // Remove on click
    button.addEventListener('click', function () {
        this.parentNode.remove();
    });

    // Add the button to the list item.
    person.appendChild(button);

    // Add the person to the household
    household.appendChild(person);
};

const serializeHouseHold = (event) => {
    event.preventDefault();

    // Get the household.
    let household = document.getElementsByClassName('household')[0];

    let members = { household: [] };
    for (let i = 0; i < household.children.length; ++i) {
        // Get the household member's information.
        person = household.children[i].textContent.split(' ');
        // Remove 'Remove' from person array
        let removeIndex = person.indexOf('Remove');
        person.splice(removeIndex, 1);

        member = {};
        member.relationship = person[0];
        member.age = parseInt(person[1]);
        member.smoker = person[2] === 'smoker';

        // Add the object to the list.
        members.household.push(member);
    }

    let debug = document.getElementsByClassName('debug')[0];
    debug.style.display = 'block';
    debug.textContent = JSON.stringify(members, null, 3);
};
