import "./index.css";

import { useEffect, useState } from "react";
import colors from "./utils/colors";

function App() {
  const [rgb, setRgb] = useState(
    "https://coolors.co/palette/cdb4db-ffc8dd-ffafcc-bde0fe-a2d2ff"
  );
  const [tailwindClasses, setTailwindClasses] = useState([""]);

  useEffect(() => {
    transformRGBToTailwind(rgb);
  }, []);

  // This func transform the tw colors passed as a COLOR: {SHADE: "HEX"} to COLOR-SHADE = HEX
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
    console.log("ASDD");
    const rgbValues = rgb.match(/\b[0-9a-f]{6}\b/gi);
    console.log(rgbValues);

    const tailwindColors = rgbValues!.map((rgbValue) => {
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
    <div className="container mx-auto px-4 flex flex-col h-full pb-12">
      <nav className="border-b flex justify-between mb-6 pt-6">
        <h2 className="font-black text-2xl">COOLORS-TO-TW</h2>
        <a
          className="text-xl"
          href="https://github.com/camunoz2/coolors-to-tailwindcss"
        >
          Github
        </a>
      </nav>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="w-56">
            <img className="h-10" src="/logo.svg" alt="" />
          </div>
          <input
            title="ref"
            onChange={(event) => handleInput(event.target.value)}
            className="w-full rounded-sm text-slate-600 pl-4"
          />
          <button
            className="bg-green-600 text-black hover:cursor-pointer hover:bg-green-500 rounded-sm px-4"
            onClick={() => (rgb ? transformRGBToTailwind(rgb) : "")}
          >
            Transform
          </button>
        </div>
      </div>

      <div className="bg-white h-full my-10 rounded-sm">
        <div className="flex flex-col md:flex-row h-full gap-3 p-3 rounded-sm">
          {tailwindClasses
            ? tailwindClasses.map((item, index) => {
                let tw = item;
                return (
                  <div
                    onClick={() => navigator.clipboard.writeText(item)}
                    key={index}
                    className={`${tw} flex-1 text-center flex justify-center items-center rounded-sm cursor-pointer`}
                  >
                    <p className="text-xs mix-blend-difference">{item}</p>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
      <a className="underline" href="https://arjeldev.vercel.app">
        By ArjelDev
      </a>
    </div>
  );
}

export default App;
