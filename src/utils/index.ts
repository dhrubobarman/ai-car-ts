import World from "@/World";
import { Crossing } from "@/markings/Crossing";
import { Light } from "@/markings/Light";
import { Marking } from "@/markings/Marking";
import { Parking } from "@/markings/Parking";
import { Start } from "@/markings/Start";
import { Stop } from "@/markings/Stop";
import { Target } from "@/markings/Target";
import { Yield } from "@/markings/Yield";
import Point from "@/primitives/point";
import { InfoMarking } from "@/types";
import { createElement } from "./createElement";

export * from "./helperElements";

export { createElement };

export function loadMarkings(data: InfoMarking[]) {
  const markings = [];
  for (const info of data) {
    const point = new Point(info.center.x, info.center.y);
    const dir = new Point(info.directionVector.x, info.directionVector.y);
    switch (info.type) {
      case "Crossing":
        markings.push(new Crossing(point, dir, info.width, info.height));
        break;
      case "Light":
        markings.push(new Light(point, dir, info.width, info.height));
        break;
      case "Parking":
        markings.push(new Parking(point, dir, info.width, info.height));
        break;
      case "Start":
        markings.push(new Start(point, dir, info.width, info.height));
        break;
      case "Stop":
        markings.push(new Stop(point, dir, info.width, info.height));
        break;
      case "Target":
        markings.push(new Target(point, dir, info.width, info.height));
        break;
      case "Yield":
        markings.push(new Yield(point, dir, info.width, info.height));
        break;
      default:
        markings.push(new Marking(point, dir, info.width, info.height));
        break;
    }
  }
  return markings;
}

export function getFormattedDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const hours12Format = String(now.getHours() % 12 || 12).padStart(2, "0"); // Convert to 12-hour format
  const ampm = now.getHours() >= 12 ? "PM" : "AM";

  const timeString = `${hours}:${minutes}:${seconds}`;
  const timeString12HrsFormat = `${hours12Format}:${minutes}:${seconds}${ampm}`;
  const dateString = `${year}-${month}-${day}`;
  const dateTimeString = `${dateString} ${timeString}`;
  const dateTimeString12HrsFormat = `${dateString} ${timeString12HrsFormat}`;

  return {
    timeString,
    dateString,
    dateTimeString,
    year,
    month,
    day,
    hours,
    minutes,
    seconds,
    hours12Format,
    ampm,
    dateTimeString12HrsFormat,
  };
}

export function save(world: World, zoom: number, offset: Point) {
  world.zoom = zoom;
  world.offset = offset;
  const filename = `${getFormattedDate().dateTimeString12HrsFormat}.world`;
  const element = createElement(
    "a",
    {
      href: `data:text/plain;charset=utf-8,${encodeURIComponent(
        JSON.stringify(world)
      )}`,
      download: filename,
    },
    document.body
  );
  localStorage.setItem("world", JSON.stringify(world));
  element.click();
  document.body.removeChild(element);
}

export function load(e: Event) {
  const file = (e.target as HTMLInputElement).files![0];
  if (!file) {
    alert("No File Selected");
    return null;
  }
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = (e) => {
    const data = e.target!.result as string;
    localStorage.setItem("world", data);
    location.reload();
  };
}
