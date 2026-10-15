class Player {

  constructor() {

    // Create player
    this.node = document.createElement("div");

    gameBoxNode.append(this.node);

    this.node.className = "player";

    // Player position
    this.x = 70;
    this.y = 175;

    // Player size
    this.width = 45;
    this.height = 45;

    // Player speed
    this.speed = 20;

    // Apply styles
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;

    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;

  }

  // Move up
  moveUp() {

    if (this.y <= 0) {
      return;
    }

    this.y = Math.max(0, this.y - this.speed);

    this.node.style.top = `${this.y}px`;

  }

  // Move down
  moveDown() {

    const gameHeight = gameBoxNode.clientHeight;

    if (this.y + this.height >= gameHeight) {
      return;
    }

    this.y = Math.min(
      gameHeight - this.height,
      this.y + this.speed
    );

    this.node.style.top = `${this.y}px`;

  }

}