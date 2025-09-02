export const getMagnitudeColor = (magnitude) => {
  if (magnitude >= 7) return 'hsl(var(--earthquake-major))';
  if (magnitude >= 6) return 'hsl(var(--earthquake-strong))';
  if (magnitude >= 5) return 'hsl(var(--earthquake-moderate))';
  if (magnitude >= 4) return 'hsl(var(--earthquake-light))';
  if (magnitude >= 3) return 'hsl(var(--earthquake-minor))';
  return 'hsl(var(--earthquake-micro))';
};

export const getMagnitudeSize = (magnitude) => {
  return Math.max(4, Math.min(30, magnitude * 5));
};

export const getMagnitudeLabel = (magnitude) => {
  if (magnitude >= 7) return 'Major';
  if (magnitude >= 6) return 'Strong';
  if (magnitude >= 5) return 'Moderate';
  if (magnitude >= 4) return 'Light';
  if (magnitude >= 3) return 'Minor';
  return 'Micro';
};

export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours === 0) {
    return `${minutes} min ago`;
  } else if (hours < 24) {
    return `${hours}h ${minutes}m ago`;
  } else {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }
};

export const convertCoordinates = (lng, lat) => {
  const x = ((lng + 180) / 360) * 900;
  const y = ((90 - lat) / 180) * 450;
  return { x, y };
};

export const getDepthColor = (depth) => {
  if (depth >= 300) return 'hsl(0 84% 30%)';
  if (depth >= 100) return 'hsl(22 90% 35%)';
  if (depth >= 70) return 'hsl(35 91% 40%)';
  if (depth >= 35) return 'hsl(52 98% 45%)';
  if (depth >= 10) return 'hsl(81 100% 50%)';
  return 'hsl(142 71% 55%)';
};

export const regions = [
  { value: 'all', label: 'All Regions' },
  { value: 'california', label: 'California' },
  { value: 'alaska', label: 'Alaska' },
  { value: 'nevada', label: 'Nevada' },
  { value: 'hawaii', label: 'Hawaii' },
  { value: 'oklahoma', label: 'Oklahoma' },
  { value: 'puerto rico', label: 'Puerto Rico' },
  { value: 'japan', label: 'Japan' },
  { value: 'chile', label: 'Chile' },
  { value: 'indonesia', label: 'Indonesia' }
];