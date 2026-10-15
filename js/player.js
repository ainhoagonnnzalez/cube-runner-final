class Player {

  constructor() {
    //* all player properties will go here
    this.node = document.createElement("div")
    gameBoxNode.append(this.node) // as soon as the obj from this class is created, the node will be inserted into the game box

    this.node.className = "player" // en consola podemos ver que se ha añadido un div con la clase "player"


    // position and dimensions
    this.x = 70;
    this.y = 150;
    this.width = 50;
    this.height = 50;

    // adding the initial styles
    this.node.style.width = `${this.width}px`
    this.node.style.height = `${this.height}px`
    this.node.style.backgroundColor = "white"
    this.node.style.borderRadius = "5px"
    this.node.style.border = "solid black 2px"

    this.node.style.position = "absolute"
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`

    this.speed = 20

  }

  //* all player methods will go here
  //creamos metodos
  moveUp(){
    if(this.y < 0){
      return // stop the function
    }
    this.y -= this.speed
    this.node.style.top = `${this.y}px`
  }

  moveDown(){
    if(this.y > 330){
      return
    }
    this.y += this.speed
    this.node.style.top = `${this.y}px`
  }


}