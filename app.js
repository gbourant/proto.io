boxContainer = []

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0])
}

class App {

    constructor() {
        this.appContainer = document.getElementById("app")
        this.appContainer.style.width = "500px"
        this.appContainer.style.height = "500px"
    }

    render() {
        this.appContainer.innerHTML = `<button id="add">add</button>`
        boxContainer.forEach((box, index) => this.appContainer.innerHTML += box.createBox(index))
        this.addButton = document.getElementById("add")
        this.addButton.onclick = () => this.addBox()
        boxContainer.forEach((box) => box.bindEvents())
    }

    addBox() {
        boxContainer.push(new Box(`Board ${boxContainer.length + 1}`, boxContainer.length))
        this.render()
    }
}


class Box {

    constructor(name, position) {
        this.name = name
        this.position = position
    }

    deleteBox() {
        if (boxContainer.length == 1) {
            boxContainer = []
        } else if (boxContainer.length < this.position) {
            boxContainer.splice(boxContainer.length - 1, 1)
        } else {
            boxContainer.splice(this.position, 1)
        }
        app.render()
    }

    renameBox() {
        let newNameBox = prompt("Please new box name:", this.name)
        if (newNameBox != null) {
            this.name = newNameBox
            app.render()
        }
    }

    duplicateBox() {
        boxContainer.push(new Box(this.name, boxContainer.length))
        app.render()
    }

    createBox(pos) {
        this.position = pos
        return `
        <div id="box${this.position}" class="box">
            #${this.position + 1}
            <button id="deleteBox${this.position}">delete</button>
            <button id="renameBox${this.position}">rename</button>
            <button id="duplicateBox${this.position}">duplicate</button>
            <button id="upBox${this.position}">up</button>
            <button id="downBox${this.position}">down</button>
            <div>${this.name}</div>
        </div>`
    }

    bindEvents() {
        let deleteBoxBtn = document.getElementById(`deleteBox${this.position}`)
        deleteBoxBtn.onclick = () => this.deleteBox()

        let renameBoxBtn = document.getElementById(`renameBox${this.position}`)
        renameBoxBtn.onclick = () => this.renameBox()

        let duplicateBoxBtn = document.getElementById(`duplicateBox${this.position}`)
        duplicateBoxBtn.onclick = () => this.duplicateBox()


        let upBoxBtn = document.getElementById(`upBox${this.position}`)
        upBoxBtn.onclick = () => this.moveUp()


        let downBoxBtn = document.getElementById(`downBox${this.position}`)
        downBoxBtn.onclick = () => this.moveDown()
    }

    moveUp() {
        if (this.position > 0) {
            boxContainer.move(this.position, this.position - 1)
            app.render()
        }
    }

    moveDown() {

        if (this.position < boxContainer.length) {
            boxContainer.move(this.position, this.position + 1)
            app.render()
        }
    }
}
let app = new App()
app.render()