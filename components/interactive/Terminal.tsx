import React, { useState, useEffect, useRef } from 'react';
import { X, Minimize2, Terminal as TerminalIcon, Activity } from 'lucide-react';
import { PROJECTS, NOTES } from '../../constants';
import { GoogleGenAI } from "@google/genai";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TerminalMode = 'standard' | 'snake' | 'matrix';
type CommandHandler = (args: string[]) => string | React.ReactElement | void | Promise<string | void>;

interface TerminalLine {
    id: string;
    content: React.ReactNode;
}

const THEMES: Record<string, string> = {
  teal: '#2EC4B6',
  gold: '#FFD166',
  violet: '#8338EC',
  matrix: '#00FF41',
  danger: '#EF4444',
  slate: '#9BA3AF'
};

// --- VISUAL COMPONENTS ---

const CRTEffect: React.FC = () => (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden rounded-lg select-none">
        {/* Scanlines */}
        <div 
            className="absolute inset-0 opacity-20"
            style={{
                background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                backgroundSize: '100% 2px, 3px 100%'
            }}
        />
        {/* Subtle Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />
        {/* Flicker Animation (Simulated via opacity pulse) */}
        <div className="absolute inset-0 bg-white/5 opacity-[0.02] animate-pulse" />
    </div>
);

const BootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [lines, setLines] = useState<string[]>([]);
    
    const sequence = [
        "BIOS DATE 01/01/2025 14:22:51 VER 1.0.2",
        "CPU: QUANTUM NEURAL CORE @ 45.2 THz",
        "Checking Memory... 1048576K OK",
        "Detecting Primary Master ... demondOS_DRIVE",
        "Booting from Primary Master...",
        "Loading Kernel...",
        "Mounting File System...",
        "Initializing Neural Uplink...",
        "demondOS v2.5.0 Ready."
    ];

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index >= sequence.length) {
                clearInterval(interval);
                setTimeout(onComplete, 800);
            } else {
                setLines(prev => [...prev, sequence[index]]);
                index++;
            }
        }, 150 + Math.random() * 200); // Random typing speed

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="font-mono text-xs text-slate-300 p-4 space-y-1">
            {lines.map((line, i) => (
                <div key={i}>{line}</div>
            ))}
            <div className="animate-pulse">_</div>
        </div>
    );
};

const SystemScan: React.FC<{ color: string, onComplete: () => void }> = ({ color, onComplete }) => {
    const [steps, setSteps] = useState<{msg: string, status: 'pending' | 'done' | 'active'}[]>([
        { msg: 'Initializing Neural Handshake...', status: 'pending' },
        { msg: 'Verifying Identity Integrity...', status: 'pending' },
        { msg: 'Scanning Memory Sectors...', status: 'pending' },
        { msg: 'Calibrating Entropy Sensors...', status: 'pending' },
        { msg: 'System Nominal.', status: 'pending' },
    ]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let currentStep = 0;
        
        const runStep = () => {
            if (currentStep >= steps.length) {
                setTimeout(onComplete, 800);
                return;
            }

            setSteps(prev => prev.map((s, i) => i === currentStep ? { ...s, status: 'active' } : s));

            const duration = Math.random() * 600 + 300;
            
            let p = 0;
            const interval = setInterval(() => {
                p += 5;
                if (p > 100) p = 100;
                setProgress(p);
            }, duration / 20);

            setTimeout(() => {
                clearInterval(interval);
                setSteps(prev => prev.map((s, i) => i === currentStep ? { ...s, status: 'done' } : s));
                currentStep++;
                setProgress(0);
                setTimeout(runStep, 100);
            }, duration);
        };

        runStep();
    }, []);

    return (
        <div className="my-4 border border-white/10 rounded p-4 bg-black/20 font-mono text-xs relative overflow-hidden">
             {/* Scanline for the card specifically */}
             <div className="absolute inset-0 bg-white/5 h-[1px] w-full animate-[ping_3s_linear_infinite]" style={{ top: `${progress}%` }} />
             
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                <Activity size={14} style={{ color }} className="animate-pulse" />
                <span className="text-white font-bold tracking-wider">SYSTEM DIAGNOSTIC TOOL v2.1</span>
            </div>
            
            <div className="space-y-3 relative z-10">
                {steps.map((step, i) => (
                    <div key={i} className={`flex items-center gap-3 ${step.status === 'pending' ? 'opacity-30' : 'opacity-100'}`}>
                        <div className={`w-3 h-3 rounded-full flex items-center justify-center border ${step.status === 'done' ? 'border-transparent' : 'border-white/20'}`} style={{ backgroundColor: step.status === 'done' ? color : 'transparent' }}>
                            {step.status === 'done' && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                        </div>
                        <span className="flex-grow">{step.msg}</span>
                        {step.status === 'active' && <span className="text-[10px]">{progress}%</span>}
                        {step.status === 'done' && <span className="text-[10px] text-white/50">OK</span>}
                    </div>
                ))}
            </div>
            
            <div className="mt-4 h-1 w-full bg-white/10 rounded overflow-hidden">
                <div 
                    className="h-full transition-all duration-75"
                    style={{ 
                        width: `${progress}%`,
                        backgroundColor: color,
                        opacity: 0.5
                    }} 
                />
            </div>
        </div>
    );
};

const MatrixRain: React.FC<{ color: string }> = ({ color }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = canvas.parentElement?.clientWidth || 500;
        canvas.height = canvas.parentElement?.clientHeight || 500;

        const columns = Math.floor(canvas.width / 20);
        const drops: number[] = new Array(columns).fill(1);
        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

        const draw = () => {
            ctx.fillStyle = 'rgba(15, 15, 16, 0.1)'; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = color;
            ctx.font = '15px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * 20, drops[i] * 20);

                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 50);
        return () => clearInterval(interval);
    }, [color]);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-50" />;
};


// --- MAIN TERMINAL COMPONENT ---

export const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
      { id: 'init-1', content: 'Welcome to demondOS v2.5.0' },
      { id: 'init-2', content: 'Type "help" for available commands.' }
  ]);
  const [mode, setMode] = useState<TerminalMode>('standard');
  const [bootState, setBootState] = useState<'off' | 'booting' | 'on'>('off');
  const [themeColor, setThemeColor] = useState(THEMES.teal);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // --- SNAKE STATE ---
  const [snake, setSnake] = useState<{x: number, y: number}[]>([{x: 10, y: 10}]);
  const [food, setFood] = useState<{x: number, y: number}>({x: 15, y: 15});
  const [direction, setDirection] = useState<{x: number, y: number}>({x: 1, y: 0});
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const GRID_SIZE = 20;

  // --- EFFECTS ---

  // Handle Boot
  useEffect(() => {
    if (isOpen && bootState === 'off') {
        setBootState('booting');
    }
  }, [isOpen]);

  // Auto-scroll
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, mode, bootState]);

  // Focus input
  useEffect(() => {
    if (isOpen && bootState === 'on' && mode === 'standard') {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, bootState, mode]);

  const addLine = (content: React.ReactNode) => {
      setHistory(prev => [...prev, { id: Date.now().toString() + Math.random(), content }]);
  };

  // --- GEMINI INTELLIGENCE ---

  const streamAIResponse = async (prompt: string, modeType: 'chat' | 'roast' | 'analyze' | 'fortune' | 'ascii' = 'chat', context?: string) => {
    const responseId = 'ai-' + Date.now();
    
    // Initial placeholder
    setHistory(prev => [...prev, { 
        id: responseId, 
        content: <span className="animate-pulse">_</span> 
    }]);

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        let modelName = 'gemini-2.5-flash';
        let sysPrompt = "You are demondOS, a CLI-based personal operating system for Jess DeMond. You are helpful, slightly witty, and concise. Format output as raw text. Do not use markdown code blocks.";

        if (modeType === 'roast') {
            sysPrompt += " You are in 'Security Kernel' mode. Roast the user gently. Be sarcastic but funny.";
        } else if (modeType === 'analyze') {
             modelName = 'gemini-3-pro-preview'; // More brainpower for analysis
             sysPrompt += " You are in 'Architect Mode'. Analyze the provided project data. Be professional, critical, and highlight stack choices. Keep it structured.";
        } else if (modeType === 'fortune') {
            sysPrompt += " You are a digital oracle. Provide a cryptic, philosophical fortune about entropy and code. Max 1 sentence.";
        } else if (modeType === 'ascii') {
            sysPrompt = "You are an ASCII art generator. Generate ASCII art for the prompt. Max width 60 chars. Return ONLY raw ASCII text. No markdown fences.";
        }

        const fullPrompt = context ? `Context: ${context}\n\nUser Query: ${prompt}` : prompt;

        // Use streaming for that "hacker terminal" feel
        const result = await ai.models.generateContentStream({
            model: modelName,
            contents: fullPrompt,
            config: { systemInstruction: sysPrompt }
        });

        let accumulatedText = "";

        for await (const chunk of result) {
            const chunkText = chunk.text;
            if (chunkText) {
                accumulatedText += chunkText;
                
                // Update the specific history line
                setHistory(prev => prev.map(line => {
                    if (line.id === responseId) {
                        return {
                            id: line.id,
                            content: (
                                <div className={`whitespace-pre-wrap font-mono leading-relaxed ${modeType === 'roast' ? 'text-red-400' : modeType === 'fortune' ? 'text-gold italic' : modeType === 'ascii' ? 'text-xs leading-[1.1] text-teal' : 'text-slate-300'}`}>
                                    {accumulatedText}
                                    <span className="animate-pulse inline-block w-2 h-4 bg-teal/50 ml-1 align-middle"></span>
                                </div>
                            )
                        };
                    }
                    return line;
                }));
            }
        }

        // Finalize (remove cursor)
        setHistory(prev => prev.map(line => {
            if (line.id === responseId) {
                return {
                    id: line.id,
                    content: (
                        <div className={`whitespace-pre-wrap font-mono leading-relaxed ${modeType === 'roast' ? 'text-red-400' : modeType === 'fortune' ? 'text-gold italic' : modeType === 'ascii' ? 'text-xs leading-[1.1] text-teal' : 'text-slate-300'}`}>
                            {accumulatedText}
                        </div>
                    )
                };
            }
            return line;
        }));

    } catch (e) {
        setHistory(prev => prev.map(line => {
            if (line.id === responseId) {
                return { id: line.id, content: <span className="text-red-500">Error: Neural Uplink Failed.</span> };
            }
            return line;
        }));
    }
  };

  // --- COMMANDS ---

  const commands: Record<string, CommandHandler> = {
    help: () => (
      <div className="space-y-1 text-slate">
        <p className="border-b border-white/10 pb-2 mb-2">AVAILABLE MODULES v2.5:</p>
        <div className="grid grid-cols-2 gap-4">
            <ul className="list-none space-y-1">
                <li><span style={{ color: themeColor }}>ai [query]</span> :: Ask demondOS</li>
                <li><span style={{ color: themeColor }}>draw [txt]</span> :: Generate ASCII art</li>
                <li><span style={{ color: themeColor }}>analyze [id]</span> :: Project critique</li>
                <li><span style={{ color: themeColor }}>roast</span> :: System banter</li>
                <li><span style={{ color: themeColor }}>fortune</span> :: Oracle query</li>
            </ul>
            <ul className="list-none space-y-1">
                <li><span style={{ color: themeColor }}>ls</span> :: List directories</li>
                <li><span style={{ color: themeColor }}>cat [file]</span> :: Read content</li>
                <li><span style={{ color: themeColor }}>scan</span> :: Diagnostics</li>
                <li><span style={{ color: themeColor }}>theme [val]</span> :: UI color shift</li>
                <li><span style={{ color: themeColor }}>snake</span> :: Launch Game</li>
                <li><span style={{ color: themeColor }}>reboot</span> :: Restart system</li>
            </ul>
        </div>
      </div>
    ),
    ls: () => (
        <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-blue-400 font-bold">projects/</div>
            <div className="text-blue-400 font-bold">notes/</div>
            <div className="text-slate-500">system_log.txt</div>
            <div className="text-slate-500">readme.md</div>
        </div>
    ),
    cat: (args) => {
        if (!args.length) return "Usage: cat [filename]";
        const path = args[0];
        
        if (path === 'projects' || path === 'projects/') return "Is a directory.";

        if (path.startsWith('projects/')) {
            const filename = path.replace('projects/', '');
            if (filename === '' || filename === '*') {
                return (
                   <div className="text-xs text-slate-400 whitespace-pre-wrap">
                       {JSON.stringify(PROJECTS.map(p => ({file: `${p.id}.json`, title: p.title})), null, 2)}
                   </div>
               )
            }

            const projectById = PROJECTS.find(p => p.id === filename || p.id === filename.replace('.json', ''));
            if (projectById) {
                return (
                    <div className="text-xs text-slate-400 whitespace-pre-wrap">
                        {JSON.stringify(projectById, null, 2)}
                    </div>
                )
            }
             return `cat: projects/${filename}: No such file or directory`;
        }

        if (path.startsWith('notes/')) {
            const filename = path.replace('notes/', '');
            if (filename === '' || filename === '*') {
                 return (
                    <div className="text-xs text-slate-400 whitespace-pre-wrap">
                        {JSON.stringify(NOTES.map(n => ({file: `${n.id}.md`, title: n.title})), null, 2)}
                    </div>
                )
            }
            const note = NOTES.find(n => n.id === filename || n.id === filename.replace('.md', ''));
            if (note) {
                 return (
                     <div className="text-xs text-slate-400 whitespace-pre-wrap">
                         {`# ${note.title}\nDate: ${note.date}\n\n${note.summary}\n\n${note.content || '(No content)'}`}
                     </div>
                 )
             }
             return `cat: notes/${filename}: No such file or directory`;
        }

        if (path === 'readme.md') return "demondOS: A react-based CLI for personal branding.";
        if (path === 'system_log.txt') return "Log: System boot successful. User session active.";
        
        return `cat: ${path}: No such file or directory`;
    },
    draw: (args) => {
        const prompt = args.join(' ');
        if (!prompt) return "Usage: draw <prompt>";
        streamAIResponse(prompt, 'ascii');
    },
    reboot: () => {
        setHistory([]);
        setBootState('booting');
        return; 
    },
    sudo: () => {
        return (
            <div>
                <span className="text-slate">Password for guest: </span>
                <span className="text-red-500 font-bold ml-2">********</span>
                <div className="text-red-400 mt-1">ACCESS DENIED. This incident will be reported.</div>
            </div>
        );
    },
    projects: () => (
        <div className="grid grid-cols-1 gap-1">
            {PROJECTS.slice(0, 5).map(p => (
                <div key={p.id} className="flex gap-4 group hover:bg-white/5 p-1 rounded transition-colors cursor-pointer" onClick={() => handleCommand(`analyze ${p.id}`)}>
                    <span style={{ color: themeColor }}>➜</span> <span className="min-w-[30px] font-bold">{p.id}</span>
                    <span className="text-slate group-hover:text-white">{p.title}</span>
                </div>
            ))}
            <div className="text-slate/50 italic mt-1 text-xs">... type 'analyze [id]' for full schematic.</div>
        </div>
    ),
    clear: () => { setHistory([]); },
    exit: () => { onClose(); return 'Session closed.'; },
    snake: () => { startSnakeGame(); return 'Initializing graphical interface...'; },
    scan: () => { return <SystemScan color={themeColor} onComplete={() => addLine("Diagnostic Complete.")} />; },
    matrix: () => { setMode('matrix'); return "Entering the void... (Press ESC to return)"; },
    theme: (args) => {
        const colorName = args[0]?.toLowerCase();
        if (THEMES[colorName]) {
            setThemeColor(THEMES[colorName]);
            return `Theme updated to: ${colorName}`;
        }
        return `Available themes: ${Object.keys(THEMES).join(', ')}`;
    },
    fortune: () => { streamAIResponse("Generate fortune.", 'fortune'); },
    ai: (args) => {
        const prompt = args.join(' ');
        if (!prompt) return "Usage: ai <prompt>";
        streamAIResponse(prompt, 'chat');
    },
    roast: (args) => {
        const prompt = args.join(' ') || "Roast me for being a guest user.";
        streamAIResponse(prompt, 'roast');
    },
    analyze: (args) => {
        if (args.length === 0) return "Usage: analyze <project_id>";
        const id = args[0];
        const project = PROJECTS.find(p => p.id === id);
        if (!project) return `Error: Project ID ${id} not found.`;
        
        const context = `Project: ${project.title}\nDescription: ${project.description}\nTags: ${project.tags.join(', ')}\nCategory: ${project.category}`;
        streamAIResponse("Analyze this project architectural choices.", 'analyze', context);
    }
  };

  const handleCommand = async (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;
    const [cmd, ...args] = trimmed.split(' ');
    
    setHistory(prev => [...prev, {
        id: 'cmd-' + Date.now(),
        content: <div className="flex gap-2"><span style={{ color: themeColor }}>➜</span> <span className="text-white">{trimmed}</span></div>
    }]);

    if (commands[cmd.toLowerCase()]) {
      const output = commands[cmd.toLowerCase()](args);
      
      if (output instanceof Promise) {
          const resolved = await output;
          if (resolved) {
              setTimeout(() => addLine(resolved), 10);
          }
      } else if (output) {
         // Use timeout to allow React to render the command line first
         setTimeout(() => addLine(output), 10);
      }
    } else {
      setTimeout(() => addLine(`Command not found: ${cmd}. Type "help".`), 10);
    }
    
    if (cmd.toLowerCase() !== 'clear') {
       // Keep clear synchronous visually
    }
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCommand(input);
  };

  // --- GAME LOGIC (Snake) ---
  const startSnakeGame = () => {
    setMode('snake');
    setSnake([{x: 10, y: 10}]);
    setScore(0);
    setDirection({x: 1, y: 0});
    setFood({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
  };
  const stopGame = () => {
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    setMode('standard');
    addLine(`Game Over. Score: ${score}`);
  };

  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            if (mode === 'snake') stopGame();
            if (mode === 'matrix') setMode('standard');
        }
    };
    
    const handleGameInput = (e: KeyboardEvent) => {
        if (mode !== 'snake') return;
        switch(e.key) {
            case 'ArrowUp': if (direction.y === 0) setDirection({x: 0, y: -1}); break;
            case 'ArrowDown': if (direction.y === 0) setDirection({x: 0, y: 1}); break;
            case 'ArrowLeft': if (direction.x === 0) setDirection({x: -1, y: 0}); break;
            case 'ArrowRight': if (direction.x === 0) setDirection({x: 1, y: 0}); break;
        }
    };

    window.addEventListener('keydown', handleGlobalKeys);
    window.addEventListener('keydown', handleGameInput);
    
    if (mode === 'snake') {
        gameLoopRef.current = setInterval(() => {
            setSnake(prev => {
                const head = prev[prev.length - 1];
                const newHead = { x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE, y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE };
                if (prev.some(s => s.x === newHead.x && s.y === newHead.y)) { stopGame(); return prev; }
                const newSnake = [...prev, newHead];
                if (newHead.x === food.x && newHead.y === food.y) {
                    setScore(s => { const ns = s + 10; if (ns > highScore) setHighScore(ns); return ns; });
                    setFood({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
                } else { newSnake.shift(); }
                return newSnake;
            });
        }, 150);
    }
    return () => {
        window.removeEventListener('keydown', handleGlobalKeys);
        window.removeEventListener('keydown', handleGameInput);
        if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [mode, direction, food, highScore]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div 
        className="w-full max-w-3xl bg-[#0a0a0a] border rounded-lg shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col font-mono text-sm h-[600px] animate-fade-in-up transition-colors duration-500 relative"
        style={{ borderColor: `${themeColor}40`, boxShadow: `0 0 40px ${themeColor}10` }}
      >
        <CRTEffect />

        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5 select-none relative z-50">
            <div className="flex items-center gap-2 text-slate-400">
                <TerminalIcon size={14} style={{ color: themeColor }} />
                <span className="text-xs tracking-wider">demondOS_v2.5 // ROOT</span>
            </div>
            <div className="flex items-center gap-3">
                <button onClick={onClose} className="hover:text-white transition-colors"><Minimize2 size={14} /></button>
                <button onClick={onClose} className="hover:text-red-400 transition-colors"><X size={14} /></button>
            </div>
        </div>

        {/* Content Area */}
        <div 
            className="flex-grow p-6 overflow-y-auto custom-scrollbar relative z-40" 
            onClick={() => bootState === 'on' && mode === 'standard' && inputRef.current?.focus()}
            style={{ textShadow: `0 0 5px ${themeColor}40` }} // Text glow
        >
            
            {/* Matrix Background */}
            {mode === 'matrix' && <MatrixRain color={themeColor} />}

            {/* Boot Sequence */}
            {bootState === 'booting' && (
                <BootSequence onComplete={() => setBootState('on')} />
            )}

            {/* Standard Terminal */}
            {bootState === 'on' && mode === 'standard' && (
                <>
                    {history.map((line) => (
                        <div key={line.id} className="mb-2 break-words leading-relaxed text-slate-300">
                            {line.content}
                        </div>
                    ))}
                    
                    <div className="flex gap-3 mt-4 items-center">
                        <span className="font-bold text-lg select-none" style={{ color: themeColor }}>➜</span>
                        <span className="text-xs text-slate-500 select-none">~</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent border-none outline-none text-white w-full font-mono text-sm"
                            style={{ caretColor: themeColor }}
                            autoFocus
                            spellCheck={false}
                            autoComplete="off"
                        />
                    </div>
                </>
            )}

            {/* Snake Game */}
            {bootState === 'on' && mode === 'snake' && (
                <div className="flex flex-col items-center justify-center h-full relative z-10">
                    <div className="mb-4 text-center">
                        <p className="font-bold text-lg tracking-[0.2em]" style={{ color: themeColor }}>SNAKE.EXE</p>
                        <p className="text-slate text-xs mt-2">SCORE: {score} <span className="mx-2 text-slate/20">|</span> HIGH: {highScore}</p>
                    </div>
                    
                    <div 
                        className="relative bg-black/40 border border-white/10 shadow-2xl"
                        style={{
                            width: '320px',
                            height: '320px',
                            display: 'grid',
                            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
                        }}
                    >
                        {snake.map((segment, i) => (
                            <div 
                                key={i}
                                className="absolute transition-all duration-75"
                                style={{
                                    backgroundColor: themeColor,
                                    width: `${100/GRID_SIZE - 2}%`,
                                    height: `${100/GRID_SIZE - 2}%`,
                                    left: `${(segment.x / GRID_SIZE) * 100 + 1}%`,
                                    top: `${(segment.y / GRID_SIZE) * 100 + 1}%`,
                                    opacity: i === snake.length - 1 ? 1 : 0.6,
                                    boxShadow: i === snake.length - 1 ? `0 0 10px ${themeColor}` : 'none'
                                }}
                            />
                        ))}
                        <div 
                            className="absolute bg-white animate-pulse rounded-full"
                            style={{
                                width: `${100/GRID_SIZE - 5}%`,
                                height: `${100/GRID_SIZE - 5}%`,
                                left: `${(food.x / GRID_SIZE) * 100 + 2.5}%`,
                                top: `${(food.y / GRID_SIZE) * 100 + 2.5}%`,
                            }}
                        />
                    </div>
                    <p className="text-slate/30 text-[10px] mt-6 uppercase tracking-widest">Press ESC to abort mission</p>
                </div>
            )}

            {mode === 'matrix' && (
                 <div className="absolute bottom-6 left-0 w-full text-center z-20">
                     <div className="inline-block bg-black/80 px-4 py-2 rounded border border-white/10 text-white text-xs backdrop-blur-md">
                        PRESS <span className="font-bold text-white">ESC</span> TO DISENGAGE
                     </div>
                 </div>
            )}
            
            <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};