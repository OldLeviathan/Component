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

export {ShowParameters, Component,Events, Modifications}