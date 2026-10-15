class Cube {

  constructor(posY, width, height) {

    // Create ghost element
    this.node = document.createElement("div");

    gameBoxNode.append(this.node);

    this.node.className = "enemy";


    // Ghost images
    const ghostImages = [
      "./images/fantasma_rojo.png",
      "./images/fantasma_rosa.png",
      "./images/fantasma_azul.png",
      "./images/fantasma_naranja.png"
    ];


    // Choose random ghost
    const randomIndex = Math.floor(
      Math.random() * ghostImages.length
    );

    const randomGhost = ghostImages[randomIndex];


    // Apply ghost image
    this.node.style.backgroundImage = `url("${randomGhost}")`;


    // Position
    this.x = gameBoxNode.clientWidth;
    this.y = posY;


    // Dimensions
    this.width = width;
    this.height = height;


    // Apply styles
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;

    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;


    // Speed
    this.speed = gameSpeed;

  }


  automaticMovement() {

    this.x -= this.speed;

    this.node.style.left = `${this.x}px`;

  }

}