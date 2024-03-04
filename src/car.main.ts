import { Car } from "./Car";
import { NeuralNetwork } from "./Network";
import { Visualiser } from "./Visualiser";
import Graph from "./math/graph";
import { angle, scale } from "./math/utils";
import "./style.scss";
import { networkHTMlElement } from "./utils";
import Viewport from "./world/js/Viewport";
import World from "./world/js/World";
import Point from "./world/js/primitives/point";

export function newtworkView() {
  const { carCanvas, networkCanvas, saveButton, deleteButton } =
    networkHTMlElement();
  saveButton.addEventListener("click", save);
  deleteButton.addEventListener("click", discard);

  const N = 1;
  const MUTATION = 0.1;

  carCanvas.width = window.innerWidth - 300;
  networkCanvas.width = 300;
  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;

  const carCtx = carCanvas.getContext("2d")!;
  const networkCtx = networkCanvas.getContext("2d")!;

  const worldString = localStorage.getItem("world");

  const worldInfo = worldString ? JSON.parse(worldString) : null;
  const world: World = worldInfo
    ? World.load(worldInfo)
    : new World(new Graph());
  const viewport = new Viewport(carCanvas, world.zoom, world.offset);

  const cars = generateCars(N);
  const traffic: any = [];
  const roadBorders: any = world.roadBorder.map((s) => [s.p1, s.p2]);
  let bestCar = cars[0];

  if (localStorage.getItem("bestBrain")) {
    console.log("loading best brain");
    for (const car of cars) {
      car.brain = JSON.parse(localStorage.getItem("bestBrain")!);
      NeuralNetwork.mutate(car.brain!, MUTATION);
    }

    bestCar.brain = JSON.parse(localStorage.getItem("bestBrain")!);
  }

  function save() {
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
  }
  function discard() {
    localStorage.removeItem("bestBrain");
  }

  function generateCars(n: number) {
    const startPoints = world.markings.filter((m) => m.type === "Start");
    const startPoint =
      startPoints.length > 0 ? startPoints[0].center : new Point(100, 100);
    const dir =
      startPoints.length > 0
        ? startPoints[0].directionVector
        : new Point(0, -1);
    const startAngle = -angle(dir) + Math.PI / 2;
    const cars = [];
    for (let i = 0; i < n; i++) {
      cars.push(new Car(startPoint.x, startPoint.y, 30, 50, "AI", startAngle));
    }
    return cars;
  }

  const animate = (time: number = 0) => {
    carCtx.clearRect(0, 0, carCanvas.width, carCanvas.height);

    viewport.offset.x = -bestCar.x;
    viewport.offset.y = -bestCar.y;

    viewport.reset();
    const viewpoint = scale(viewport.getOffset(), -1);
    world.draw(carCtx, viewpoint, false);

    for (const car of traffic) {
      car.update(roadBorders, []);
    }
    for (const car of cars) {
      car.update(roadBorders, traffic);
    }
    bestCar =
      cars.find((c) => c.fitness === Math.max(...cars.map((c) => c.fitness))) ||
      cars[0];
    world.cars = cars;
    world.bestCar = bestCar;

    for (const trafficCar of traffic) {
      trafficCar.draw(carCtx);
    }

    networkCtx.lineDashOffset = -time / 50;
    networkCtx.clearRect(0, 0, networkCanvas.width, networkCanvas.height);
    Visualiser.drawNetwork(networkCtx, bestCar.brain);
    requestAnimationFrame(animate);
  };
  animate();
}
