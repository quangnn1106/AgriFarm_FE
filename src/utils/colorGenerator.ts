import { useState } from 'react';

const colorList = ['#FF5733', '#33FF57', '#5733FF', '#33B5FF', '#FF33E9']; // Add your list of colors here

export default function useColorGenerator() {
  const [lastColor, setLastColor] = useState<string>('#FF5733');
  const get = (): string => {
    let index = 0;
      index = Math.floor(Math.random() * colorList.length);
      if(colorList[index] === lastColor) index = index+1>colorList.length-1?0:index+1

    setLastColor(colorList[index]);
    return colorList[index];
  };

  return { get };
}
