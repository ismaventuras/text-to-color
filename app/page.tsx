"use client"
import { Input } from '@/components/ui/input'
import { useState } from 'react';

function hexToRGB(hex:string) {
  // Convert HEX to RGB
  var r = parseInt(hex.slice(1, 3), 16);
  var g = parseInt(hex.slice(3, 5), 16);
  var b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function RGBToHex(rgb:number[]) {
  // Convert RGB back to HEX
  return "#" + rgb.map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
  }).join('');
}

function invertColor(hex:string) {
  // Invert the RGB values
  var rgb = hexToRGB(hex);
  var invertedRGB = rgb.map(x => 255 - x);
  return RGBToHex(invertedRGB);
}

function stringToColorCodeJS(str:string) {
  // A simple hash function
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert the hash to a 6 digit hexadecimal code
  var color = '#';
  for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}


export default function Home() {
  const [text,setText] = useState("")
  const colorCode = stringToColorCodeJS(text)
  const complement = invertColor(colorCode)

  return (
    <main className='container h-screen mx-auto flex items-center'>
      <div className='w-full max-w-lg mx-auto flex flex-col items-center  duration-300'>
          <p className='text-3xl font-semibold'>Type something and get a color</p>
          <Input type='text' placeholder='Your text' value={text} onChange={(e)=> setText(e.target.value)} className='text-xl py-8 my-4'/>
          <div className={`my-2 w-[128px] h-[128px] rounded-xl shadow-xl shadow-black  flex items-center justify-center`} style={{backgroundColor:colorCode}}>
            <p className='text-xl'  style={{color:complement}}>{colorCode}</p>
          </div>
      </div>
    </main>
  )
}
