import "./App.css";
import { useState } from "react";
import colors from "./utils/colors";

function App() {
  const [rgb, setRgb] = useState("");
  const [tailwindClasses, setTailwindClasses] = useState([""]);

  function transformColors(colors: {
    [key: string]: { [key: string]: string };
  }) {
    const transformedColors: { [key: string]: string } = {};
    Object.keys(colors).forEach((colorName) => {
      const shades = colors[colorName];
      Object.keys(shades).forEach((shade) => {
        let colorCode = shades[shade];
        colorCode = colorCode.substring(1);
        transformedColors[`${colorName}-${shade}`] = colorCode;
      });
    });
    return transformedColors;
  }

  function transformRGBToTailwind(rgb: string): string[] {
    const rgbValues = rgb.match(/\b[0-9a-f]{6}\b/gi);
    console.log(rgbValues);

    const tailwindColors = rgbValues?.map((rgbValue) => {
      const hex = rgbValue.toLowerCase();
      let minDistance = Number.MAX_VALUE;
      let closestColor = "";
      for (const [colorName, colorHex] of Object.entries(
        transformColors(colors)
      )) {
        const distance = calculateRGBDistance(hex, colorHex);
        if (distance < minDistance) {
          minDistance = distance;
          closestColor = colorName;
        }
      }
      return `bg-${closestColor}`;
    });

    setTailwindClasses(tailwindColors);
    return tailwindColors;
  }
  function calculateRGBDistance(hex1: string, hex2: string): number {
    const [r1, g1, b1] = hexToRGB(hex1);
    const [r2, g2, b2] = hexToRGB(hex2);
    const distance = Math.sqrt(
      Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2)
    );
    return distance;
  }

  function hexToRGB(hex: string): [number, number, number] {
    const hexInt = parseInt(hex, 16);
    const r = (hexInt >> 16) & 255;
    const g = (hexInt >> 8) & 255;
    const b = hexInt & 255;
    return [r, g, b];
  }

  function handleInput(value: string) {
    setRgb(value);
  }

  return (
    <div className="absolute top-0 left-0 flex flex-col items-center justify-center h-screen w-screen bg-slate-100 px-96">
      <h1 className="text-2xl font-bold">
        <a
          href="https://coolors.co/palettes/trending"
          target="_blank"
          rel="noopener"
        >
          https://coolors.co/
        </a>{" "}
        to TailwindCSS (sort of)
      </h1>
      <p>
        Convert a https://coolors.co/ palette into the closest TailwindCss
        classes. <span className="font-bold">Just paste the URL</span>
      </p>
      <a
        className="text-blue-400 underline"
        href="https://github.com/camunoz2/coolors-to-tailwindcss"
      >
        Github Repo
      </a>
      <div className="flex flex-row gap-2 py-12">
        <input
          title="rgb values"
          className="border border-teal-600 py-2 px-4 rounded-md"
          onChange={(event) => handleInput(event.target.value)}
        />
        <button
          className="bg-teal-600 py-2 px-4 rounded-md"
          onClick={() => transformRGBToTailwind(rgb)}
        >
          Transform
        </button>
      </div>

      <div className="grid grid-flow-col gap-2">
        {tailwindClasses
          ? tailwindClasses.map((item, index) => {
              let tw = item;
              return (
                <div
                  key={index}
                  className={`${tw} w-24 h-24 text-center flex justify-center items-center rounded-md`}
                >
                  <p className="text-xs">{item}</p>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default App;
