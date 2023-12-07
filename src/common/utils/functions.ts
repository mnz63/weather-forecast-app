import { getHours, isAfter, parse, startOfDay } from 'date-fns';


export const months = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

export function getBackground(code: number, isDay: boolean) {
  if(!code) {
    return
  }
  if (isDay) {
    if (code === 1000) {
      return require("../../../assets/img/clearBg.jpg");
    }
    if(code === 1003 || code === 1006 || code === 1009) {
      return require("../../../assets/img/cloudBg.jpg");
    }
    if(code === 1030 || code === 1135 || code === 1147) {
      return require("../../../assets/img/fog.jpg");
    }
    if(code === 1063 || code === 1180 || code === 1183 || code === 1186 || code === 1189 || code === 1192 || code === 1195) {
      return require("../../../assets/img/rain.jpg");
    }
  } else {
    if (code === 1000) {
      return require("../../../assets/img/homeBackground.png");
    }
    if(code === 1003 || code === 1006 || code === 1009) {
      return require("../../../assets/img/cloudBgDark.jpg");
    }
    if(code === 1030 || code === 1135 || code === 1147) {
      return require("../../../assets/img/cloud-atmosphere.jpg");
    }
    if(code === 1063 || code === 1180 || code === 1183 || code === 1186 || code === 1189 || code === 1192 || code === 1195) {
      return require("../../../assets/img/nightRain.jpg");
    }
  }
}

export function getWeatherIcon(code: number, isDay: boolean) {
  if(!code) {
    return
  }
  if(isDay) {
    if (code === 1000) {
      return require("../../../assets/icons/3dIcons/sun/26.png");
    }
    if(code === 1003 || code === 1006 || code === 1009 || code === 1030 || code === 1135 || code === 1147) {
      return require("../../../assets/icons/3dIcons/cloud/35.png");
    }
    if(code === 1063 || code === 1180 || code === 1183 || code === 1186 || code === 1189 || code === 1192 || code === 1195) {
      return require("../../../assets/icons/3dIcons/cloud/7.png");
    }
  } else {
    if (code === 1000) {
      return require("../../../assets/icons/3dIcons/moon/10.png");
    }
    if(code === 1003 || code === 1006 || code === 1009 || code === 1030 || code === 1135 || code === 1147) {
      return require("../../../assets/icons/3dIcons/moon/15.png");
    }
    if(code === 1063 || code === 1180 || code === 1183 || code === 1186 || code === 1189 || code === 1192 || code === 1195) {
      return require("../../../assets/icons/3dIcons/moon/1.png");
    }
  }
}

export function isNightTime(date) {
  const hour = getHours(date);

  const horaInicioNoite = 18; 
  const horaFimNoite = 5;   

  return hour >= horaInicioNoite || hour < horaFimNoite;
}

export function getWeatherListIcon(code: number, time: string) {
  if(!code) {
    return
  }
  const isDay = !isNightTime(new Date(time));

  if(isDay) {
    if (code === 1000) {
      return require("../../../assets/icons/3dIcons/sun/26.png");
    }
    if(code === 1003 || code === 1006 || code === 1009 || code === 1030 || code === 1135 || code === 1147) {
      return require("../../../assets/icons/3dIcons/cloud/35.png");
    }
    if(code === 1063 || code === 1180 || code === 1183 || code === 1186 || code === 1189 || code === 1192 || code === 1195) {
      return require("../../../assets/icons/3dIcons/cloud/7.png");
    }
  } else {
    if (code === 1000) {
      return require("../../../assets/icons/3dIcons/moon/10.png");
    }
    if(code === 1003 || code === 1006 || code === 1009 || code === 1030 || code === 1135 || code === 1147) {
      return require("../../../assets/icons/3dIcons/moon/15.png");
    }
    if(code === 1063 || code === 1180 || code === 1183 || code === 1186 || code === 1189 || code === 1192 || code === 1195) {
      return require("../../../assets/icons/3dIcons/moon/1.png");
    }
  }
}

export function getNextFourHours(array) {
  const now = new Date();
  const initialIndex = Math.floor(now.getHours() % 24);
  const nextFourHours = [];
  for (let i = 0; i < 6; i++) {
      const index = (initialIndex + i) % 24;
      if(array) {
        nextFourHours.push(array[index]);
      }
  }

  return nextFourHours;
}

export const UV_INDEX_TABLE = {
  1: "Baixo",
  2: "Baixo",
  3: "Baixo",
  4: "Moderado",
  5: "Moderado",
  6: "Moderado",
  7: "Alto",
  8: "Alto",
  9: "Alto",
  10: "Muito Alto",
};

export const AIR_QUALITY_TABLE = {
  1: "Boa qualidade",
  2: "Moderada",
  3: "Moderada",
  4: "Pouco saudável",
  5: "Prejudicial",
  6: "Perigoso",
};
