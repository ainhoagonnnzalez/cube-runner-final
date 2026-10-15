class Cube {
  constructor(posY, width, height) {
    // Create enemy
    this.node = document.createElement("div");

    gameBoxNode.append(this.node);

    this.node.className = "enemy";

    // Ghost images
    const ghostImages = [
      "./images/fantasma_rojo.png",
      "./images/fantasma_rosa.png",
      "./images/fantasma_azul.png",
    ];

    // Select random ghost
    const randomIndex = Math.floor(Math.random() * ghostImages.length);

    this.node.style.backgroundImage = `url("${ghostImages[randomIndex]}")`;
    // Make orange ghost bigger

    if (randomIndex === 3) {
      this.node.style.backgroundSize = "140%";
    }

    // Enemy position
    this.x = gameBoxNode.clientWidth;
    this.y = posY;

    // Enemy size
    this.width = 45;
    this.height = 45;

    // Enemy speed
    this.speed = gameSpeed;

    // Apply styles
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;

    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
  }

  // Move enemy
  automaticMovement() {
    this.x -= this.speed;

    this.node.style.left = `${this.x}px`;
  }
}
