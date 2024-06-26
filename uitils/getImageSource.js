export default function getImageSource(name) {
  switch (name) {
    case "Action":
      return require("../assets/icons/Action.png");
    case "Adventure":
      return require("../assets/icons/Adventure.png");
    case "Role-Playing":
      return require("../assets/icons/RPG.png");
    case "Shooter":
      return require("../assets/icons/Shooter.png");
    case "Platform":
      return require("../assets/icons/Platform.png");
    case "Strategy":
      return require("../assets/icons/Strategy.png");
    case "Sports":
      return require("../assets/icons/Sports.png");
    case "Simulation":
      return require("../assets/icons/Simulation.png");
    case "Card & Board Game":
      return require("../assets/icons/Boardgame.png");
    case "Racing":
      return require("../assets/icons/Racing.png");
    case "Point-and-click":
      return require("../assets/icons/Pointer.png");
    case "Visual Novel":
      return require("../assets/icons/Novel.png");
    default:
      return null;
  }
}
