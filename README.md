![image](./public/site_logo.svg)

Terms of Reference for SIMAI - https://simai.ru/

## Terms of Reference
Create an html tag editor

Description
It is not necessary to type a cool component to generate elements on a remote site. In a fluid task, there is no need to download all possible html files. It will be enough to generate several types of buttons.
Depending on which of the listed parameters is a classic component, it can create a different kind of monotony and the desired effect that it creates.
At the entrance to the classical component there is data about the created element:
1) Template – template (html representation) containing links;
2) Display parameters – you can use them to change the appearance of a page element;
3) Modifiers – designed to "fine-tune" the display of a page element;
4) Text values that may contain page elements;
5) Events – a list of actions for each event.
The output should be a generated page element created by the component class depending on the input data.

Functional requirements
Using natural JavaScript

## Project Description
Repetition is recorded for simplified creation of HTML elements.

The project is presented as a testbed of the programmer's capabilities.

The main solution to the project was found and implemented in about 3 hours.

## Solution
Finally, in order to create an HTML file, it must be classified as a component that will be stored on the network all the time.

```JS
class Component {

    constructor({
        template = null,
        showParameters = null,
        modifications = null,
        text = null,
        events = null,
        closingTag = true ,
    }){
        this.template = template
        this.showParameters = showParameters
        this.modifications = modifications
        this.text = text
        this.closingTag = closingTag
        this.events = events
    }

    generateHtml() {

        let showParameters = ''
        let modifications = ''
        let events = ''
        let id = self.crypto.randomUUID()
        let onClick = null
        let onMouseOver = null

        if (this.showParameters !== null) showParameters = this.showParameters.getRawStyle()
        if (this.modifications !== null) modifications = this.modifications.getRawStyle()
        if (this.events !== null)  onClick = this.events.getOnClickEvent()
        if (this.events !== null) onMouseOver = this.events.getMouseOverEvent()

        let element

        if (this.closingTag === true) {
            element = this.#generateWthoutClosingTag({showParameters: showParameters, modifications: modifications, id: id})
        } else{
            element = this.#generateWithClosingTag({showParameters: showParameters, modifications: modifications, id:id})
        }

        let template = document.createElement('template')
        let html = element.trim()
        template.innerHTML = html
        let htmlObject = template.content.firstChild        
        document.body.appendChild(htmlObject)
        let createdElement = document.getElementById(id)
        createdElement.addEventListener('click', () => onClick()) 
        createdElement.addEventListener('mouseover', () => onMouseOver()) 

        return htmlObject
    }

    #generateWthoutClosingTag({showParameters, modifications, id}) {
        return `<${this.template} style="${showParameters}${modifications}" id="${id}" />`
    }

    #generateWithClosingTag({showParameters, modifications, id}) {
        return `<${this.template} style="${showParameters}${modifications}" id="${id}">${this.text}</${this.template}>`
    }
    
}
```

![image](./public/translated.jpg)

To show parameters, modifications and events, it was not necessary to create classes that accept data from users and process them.

```JS
class ShowParameters {

    constructor({
        height = null,
        width = null,
        color = null
    }) {
        this.height = height
        this.width = width
        this.color = color
    }

    getRawStyle() {
        return `height:${this.height}px;width:${this.width}px;background-color:${this.color}`
    }
}

class Modifications {

    constructor({
        disable = false,
        hidden = false
    }) {
        this.disable = disable
        this.hidden = hidden
    }

    getRawStyle() {
        return this.disable === true ? 'pointer-events:none;' : '', this.hidden === true ? 'visibility: hidden;' : ''
    }
}

class Events{ 
 
    constructor({ 
        onClick = null,
        onMouseOver = null
    }){ 
        this.onClick = onClick
        this.onMouseOver = onMouseOver  
    } 
 
    getOnClickEvent(){ 
        return this.onClick
    }
    getMouseOverEvent(){
        return this.onMouseOver
    } 
 
} 
```

All the properties and parameters that can be assigned to an element are also presented here. The code is adapted to add new element properties without much difficulty.

### Example of creating an HTML file:

Code:

```JS
    const button = new Component({
        template: 'button',
        showParameters: new ShowParameters({height: 50, width: 100, color: "yellow"}),
        events: new Events({onClick: hello}),
        text: 'Hello',
        closingTag: true
    })

    function hello(){
        alert('Hello')
    }
```

What will happen:

![image](./public/Screenshot_1.png)

## Technology stack
- Javascript
