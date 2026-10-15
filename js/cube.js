class Cube {

  constructor(posY, width, height) {
    //* all enemy properties will go here
    this.node = document.createElement("div")
    gameBoxNode.append(this.node) 

    this.node.className ="enemy"

    // position and dimensions
    this.x = 350;
    this.y = posY;
    this.width = width;
    this.height = height;

    // adding the initial styles
    this.node.style.width = `${this.width}px`
    this.node.style.height = `${this.height}px`
    this.node.style.backgroundColor = "red"
    this.node.style.borderRadius = "5px"
    this.node.style.border = "solid white 2px"

    this.node.style.position = "absolute"
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`

    this.speed = 3
  }

  //* all enemy methods will go here

  automaticMovement(){
    this.x -= this.speed
    this.node.style.left = `${this.x}px`

  }

}