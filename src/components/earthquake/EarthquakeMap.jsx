import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MapPin, ZoomIn, ZoomOut, RotateCcw, Layers, Activity, Globe } from 'lucide-react';
import { convertCoordinates } from '../../utils/earthquakeUtils';

const EarthquakeMap = ({ 
  earthquakes, 
  selectedEarthquake, 
  setSelectedEarthquake, 
  getMagnitudeColor, 
  getMagnitudeSize 
}) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mapStyle, setMapStyle] = useState('topographic');
  const [showGrid, setShowGrid] = useState(true);
  const [showDepth, setShowDepth] = useState(false);
  const [animateEarthquakes, setAnimateEarthquakes] = useState(true);
  const svgRef = useRef(null);

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev * 1.5, 10));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev / 1.5, 0.3));
  }, []);

  const handleReset = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const focusOnEarthquake = useCallback((earthquake) => {
    const [lng, lat] = earthquake.geometry.coordinates;
    const { x, y } = convertCoordinates(lng, lat);
    
    // Center the earthquake on screen
    const containerWidth = 900;
    const containerHeight = 450;
    const targetX = containerWidth / 2 - x;
    const targetY = containerHeight / 2 - y;
    
    setPan({ x: targetX, y: targetY });
    setZoom(4);
    setSelectedEarthquake(earthquake);
  }, [setSelectedEarthquake]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - pan.x,
      y: e.clientY - pan.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.5, Math.min(8, prev * delta)));
  };

  useEffect(() => {
    const svg = svgRef.current;
    if (svg) {
      svg.addEventListener('wheel', handleWheel, { passive: false });
      return () => svg.removeEventListener('wheel', handleWheel);
    }
  }, []);

  const getMapBackground = () => {
    const styles = {
      topographic: 'bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-100 dark:from-emerald-950 dark:via-blue-950 dark:to-indigo-900',
      satellite: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700',
      terrain: 'bg-gradient-to-br from-amber-50 via-orange-50 to-red-100 dark:from-amber-950 dark:via-orange-950 dark:to-red-900'
    };
    return styles[mapStyle] || styles.topographic;
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card ">
      {/* Map Controls */}
      <div className="flex items-center justify-between p-3 bg-muted/50 border-b border-border">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary" />
          <span className="font-medium text-sm">Interactive Earthquake Map</span>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMapStyle(mapStyle === 'topographic' ? 'satellite' : mapStyle === 'satellite' ? 'terrain' : 'topographic')}
            className="p-1.5 hover:bg-accent rounded-md transition-colors"
            title="Switch Map Style"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`p-1.5 rounded-md transition-colors ${showGrid ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
            title="Toggle Grid"
          >
            <MapPin className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setAnimateEarthquakes(!animateEarthquakes)}
            className={`p-1.5 rounded-md transition-colors ${animateEarthquakes ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
            title="Toggle Animations"
          >
            <Activity className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="h-96 md:h-[500px] lg:h-[700px] xl:h-[800px] relative overflow-hidden">
        <div className={`w-full h-full relative ${getMapBackground()}`}>
          <svg 
            ref={svgRef}
            viewBox="0 0 900 450" 
            className="w-full h-full cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`
            }}
          >
            {/* World map with detailed coastlines */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path 
                  d="M 20 0 L 0 0 0 20" 
                  fill="none" 
                  stroke={document.documentElement.classList.contains('dark') ? '#374151' : '#E5E7EB'} 
                  strokeWidth="0.3" 
                  opacity="0.2"
                />
              </pattern>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {showGrid && <rect width="900" height="450" fill="url(#grid)" />}
            
            {/* More detailed world map */}
            <g fill="none" stroke={document.documentElement.classList.contains('dark') ? '#4B5563' : '#9CA3AF'} strokeWidth="1.5" opacity="0.6">
              {/* North America - More detailed */}
              <path d="M80 80 Q90 70 110 75 L130 80 Q150 75 170 85 L190 95 Q210 90 230 100 L250 110 Q270 105 290 115 L310 125 Q330 120 350 130 L370 140 Q360 150 350 160 L340 170 Q320 180 300 170 L280 160 Q260 170 240 160 L220 150 Q200 160 180 150 L160 140 Q140 150 120 140 L100 130 Q80 120 80 80 Z" />
              
              {/* South America - More detailed */}
              <path d="M200 240 Q210 230 225 235 L240 245 Q250 240 260 250 L270 260 Q275 270 270 280 L275 300 Q280 320 275 340 L270 360 Q260 380 250 375 L240 370 Q230 375 220 365 L210 355 Q205 340 210 325 L205 305 Q200 285 205 265 L200 245 Q195 235 200 240 Z" />
              
              {/* Europe - More detailed */}
              <path d="M390 100 Q400 95 415 100 L430 105 Q445 100 460 110 L475 115 Q485 110 490 120 L485 130 Q480 140 470 135 L460 140 Q450 145 440 140 L430 135 Q420 140 410 135 L400 130 Q390 125 390 100 Z" />
              
              {/* Africa - More detailed */}
              <path d="M410 160 Q420 155 435 160 L450 165 Q465 160 480 170 L490 180 Q495 190 490 200 L495 220 Q500 240 495 260 L490 280 Q485 300 480 315 L475 330 Q470 340 460 335 L450 340 Q440 345 430 340 L420 335 Q415 325 420 315 L415 295 Q410 275 415 255 L410 235 Q405 215 410 195 L405 175 Q400 155 410 160 Z" />
              
              {/* Asia - More detailed */}
              <path d="M500 80 Q520 75 540 85 L560 90 Q580 85 600 95 L620 100 Q640 95 660 105 L680 110 Q700 105 720 115 L740 120 Q760 115 780 125 L795 130 Q790 140 780 145 L770 150 Q750 155 730 150 L710 145 Q690 150 670 145 L650 140 Q630 145 610 140 L590 135 Q570 140 550 135 L530 130 Q510 135 500 80 Z" />
              
              {/* Australia - More detailed */}
              <path d="M640 300 Q650 295 665 300 L680 305 Q695 300 710 310 L725 315 Q740 310 750 320 L745 330 Q740 340 730 335 L720 340 Q710 345 700 340 L690 335 Q680 340 670 335 L660 330 Q650 335 645 325 L640 315 Q635 305 640 300 Z" />
              
              {/* Antarctica */}
              <path d="M100 400 Q200 395 300 400 L400 405 Q500 400 600 405 L700 410 Q800 405 850 410 L860 420 Q850 430 800 425 L700 430 Q600 425 500 430 L400 435 Q300 430 200 435 L100 430 Q50 425 100 400 Z" />
            </g>
            
            {/* Ocean depth lines */}
            <g fill="none" stroke={document.documentElement.classList.contains('dark') ? '#1F2937' : '#CBD5E1'} strokeWidth="0.5" opacity="0.3">
              <circle cx="200" cy="200" r="50" />
              <circle cx="600" cy="180" r="80" />
              <circle cx="700" cy="300" r="60" />
              <circle cx="150" cy="320" r="40" />
            </g>
            
            {/* Earthquake markers */}
            {earthquakes.map((earthquake, index) => {
              const [lng, lat] = earthquake.geometry.coordinates;
              const magnitude = earthquake.properties.mag || 0;
              const depth = earthquake.geometry.coordinates[2] || 0;
              
              const { x, y } = convertCoordinates(lng, lat);
              const isSelected = selectedEarthquake === earthquake;
              const markerSize = getMagnitudeSize(magnitude) / 2;
              
              return (
                <g key={earthquake.id || index}>
                  {/* Selection ring */}
                  {isSelected && (
                    <circle
                      cx={x}
                      cy={y}
                      r={markerSize * 2}
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                      className={animateEarthquakes ? "animate-pulse-ring" : ""}
                      filter="url(#glow)"
                    />
                  )}
                  
                  {/* Depth indicator (if enabled) */}
                  {showDepth && (
                    <circle
                      cx={x}
                      cy={y}
                      r={markerSize + 2}
                      fill="none"
                      stroke={`hsl(${Math.max(0, 120 - depth)}deg 70% 50%)`}
                      strokeWidth="1"
                      opacity="0.6"
                    />
                  )}
                  
                  {/* Main earthquake marker */}
                  <circle
                    cx={x}
                    cy={y}
                    r={markerSize}
                    fill={getMagnitudeColor(magnitude)}
                    opacity={isSelected ? 1 : 0.85}
                    stroke="hsl(var(--foreground))"
                    strokeWidth={isSelected ? 2 : 0.8}
                    className={`cursor-pointer earthquake-marker transition-all duration-300 ${
                      animateEarthquakes ? 'hover:scale-150' : 'hover:scale-125'
                    } ${magnitude >= 5 ? 'drop-shadow-lg' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      focusOnEarthquake(earthquake);
                    }}
                    filter={magnitude >= 6 ? "url(#glow)" : "none"}
                  />
                  
                  {/* Magnitude label for larger earthquakes */}
                  {magnitude >= 5 && zoom > 2 && (
                    <text
                      x={x}
                      y={y - markerSize - 8}
                      textAnchor="middle"
                      fontSize="10"
                      fill="hsl(var(--foreground))"
                      className="font-bold pointer-events-none"
                    >
                      {magnitude.toFixed(1)}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
          
          {/* Interactive Map Controls */}
          <div className="absolute top-4 left-4 bg-muted/90 backdrop-blur-sm border border-border p-3 rounded-lg text-sm">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-medium">Controls</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Drag to pan • Scroll to zoom</p>
            <div className="flex gap-1">
              <button
                onClick={handleZoomIn}
                className="p-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-3 h-3" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-3 h-3" />
              </button>
              <button
                onClick={handleReset}
                className="p-1.5 bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded transition-colors"
                title="Reset View"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Map Statistics */}
          <div className="absolute top-4 right-4 bg-muted/90 backdrop-blur-sm border border-border p-4 rounded-lg text-sm">
            <div className="text-center mb-2 mt-3 p-1">
              <div className="text-xs text-muted-foreground">Total Earthquakes<div className="font-bold text-lg text-primary">{earthquakes.length}</div>
            </div></div>

             
            <div className="text-xs text-muted-foreground space-y-1">
              
              <div>Zoom: {zoom.toFixed(1)}x</div>
              <div>Style: {mapStyle}</div>
            </div>
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-muted/90 backdrop-blur-sm border border-border p-3 rounded-lg text-xs">
            <div className="font-medium mb-2">Magnitude Scale</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-earthquake-major"></div>
                <span>7.0+ Major</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-earthquake-strong"></div>
                <span>6.0-6.9 Strong</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-earthquake-moderate"></div>
                <span>5.0-5.9 Moderate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-earthquake-light"></div>
                <span>4.0-4.9 Light</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarthquakeMap;