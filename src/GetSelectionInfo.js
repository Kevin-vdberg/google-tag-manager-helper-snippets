const scriptOptions = 
{
    LogAllInfo:false
};

//Find selected element


const element = getSelectedElement();

if(scriptOptions.LogAllInfo){
    let messages = []; 
    
    if(element)  //only do something when the element exists
    {
        messages.push('ID: '+ element.ID);
        messages.push('CSS selector: ' + getCssSelector(element));
        messages.push('Click text: '+ element.innerText);
        messages.push('value: '+ element.value);
        messages.push('click URL: '+ element.getAttribute('href'));
    }
    
    messages.forEach((msg) => {console.log(msg); }); 
    console.log('\n');
}

console.log('Suggested trigger for click');

if(element.getAttribute('href'))
{
    console.log('Click just links'); 
    console.log('Click URL contains ' + element.getAttribute('href'));
}
else if (element.ID)
{
    console.log('Click all elements'); 
    console.log('Click ID equals ' + element.ID);
}
else
{
    console.log('Click all elements');
    console.log('CSS selector:' + getCssSelector(element));
    if(element.innerText)
    {
        console.log('Click Text contains ' + element.innerText);
    };
}


//functions
function getSelectedElement() 
{
    const selection = window.getSelection();
    if (selection.rangeCount > 0) 
    {
        const range = selection.getRangeAt(0);
        return range.startContainer.parentElement;
    }
    return null; // Return null when nothing is selected. Could throw error also maybe?
}

function getCssSelector(element) {
    if (!(element instanceof Element)) return null;

    // Helper function to escape CSS identifiers
    function escapeCssIdentifier(identifier) {
        return CSS.escape(identifier);
    }

    const path = [];
    while (element.nodeType === Node.ELEMENT_NODE) {
        let selector = element.nodeName.toLowerCase();

        // Stop if the current element is <main>
        if (selector === 'main') {
            path.unshift(selector);
            break;
        }

        // If the element has an ID, use it
        if (element.id) {
            selector = `#${escapeCssIdentifier(element.id)}`;
            path.unshift(selector);
            break;
        }

        // Add the element's classes
        if (element.className) {
            const classes = element.className.split(/\s+/).map(escapeCssIdentifier);
            selector += `.${classes.join('.')}`;
        }

        // Skip :nth-of-type to simplify the selector
        path.unshift(selector);
        element = element.parentNode;
    }

    return path.join(" > ");

    
}
