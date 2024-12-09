const scriptOptions = 
{
    HighlightTextColor: 'red',
    HighlightBackgroundColor: 'yellow',
    HighlightElement: true    
}

//Get user input
let cssSelector = prompt('Please add your css selector here: '); 

const element = document.querySelector(cssSelector); 
//let elementCopy = element; //TODO: restore element after certain time

let messages = 
    [
        "ID: " + element.ID,
        "content: " + element.innerHTML
    ];

element.style.color = scriptOptions.HighlightTextColor;
element.style.backgroundColor = scriptOptions.HighlightBackgroundColor

messages.forEach((message) =>  {console.log(message);}  );
