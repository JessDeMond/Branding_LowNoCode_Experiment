import React, { useState, useEffect, useRef } from 'react';
import { X, Minimize2, Terminal as TerminalIcon, Cpu, ShieldCheck, Wifi, Activity } from 'lucide-react';
import { PROJECTS } from '../../constants';
import { GoogleGenAI } from "@google/genai";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TerminalMode = 'standard' | 'snake' | 'matrix';
type CommandHandler = (args: string[]) => string | React.ReactElement | void;

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

// --- SUB-COMPONENTS ---

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

            // Mark current as active
            setSteps(prev => prev.map((s, i) => i === currentStep ? { ...s, status: 'active' } : s));

            // Fake processing time
            const duration = Math.random() * 800 + 400;
            
            // Progress bar animation for this step
            let p = 0;
            const interval = setInterval(() => {
                p += 5;
                if (p > 100) p = 100;
                setProgress(p);
            }, duration / 20);

            setTimeout(() => {
                clearInterval(interval);
                // Mark current as done
                setSteps(prev => prev.map((s, i) => i === currentStep ? { ...s, status: 'done' } : s));
                currentStep++;
                setProgress(0);
                setTimeout(runStep, 200); // Pause between steps
            }, duration);
        };

        runStep();
    }, []);

    return (
        <div className="my-4 border border-white/10 rounded p-4 bg-black/20 font-mono text-xs">
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                <Activity size={14} style={{ color }} className="animate-pulse" />
                <span className="text-white font-bold tracking-wider">SYSTEM DIAGNOSTIC TOOL v2.1</span>
            </div>
            
            <div className="space-y-3">
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
            ctx.fillStyle = 'rgba(15, 15, 16, 0.1)'; // Fade effect
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


// --- MAIN COMPONENT ---

export const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
      { id: 'init-1', content: 'Welcome to demondOS v2.5.0' },
      { id: 'init-2', content: 'Type "help" for available commands.' }
  ]);
  const [mode, setMode] = useState<TerminalMode>('standard');
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

  // Auto-scroll to bottom
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, mode]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && mode === 'standard') {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, mode]);

  // --- HELPER: ADD LINE ---
  const addLine = (content: React.ReactNode) => {
      setHistory(prev => [...prev, { id: Date.now().toString() + Math.random(), content }]);
  };

  // --- AI LOGIC ---
  const processAICommand = async (prompt: string, mode: 'chat' | 'roast' | 'analyze' | 'fortune' = 'chat', context?: string) => {
    const loadingId = 'loading-' + Date.now();
    
    // Add loading indicator
    setHistory(prev => [...prev, { 
        id: loadingId, 
        content: <div className="text-teal/50 animate-pulse font-mono text-xs">...establishing neural uplink...</div> 
    }]);

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        let modelName = 'gemini-2.5-flash';
        let sysPrompt = "You are demondOS, a CLI-based personal operating system for Jess DeMond. You are helpful, slightly witty, and concise. Format output as raw text. Do not use markdown code blocks.";
        
        if (mode === 'roast') {
            sysPrompt += " You are in 'Security Kernel' mode. Roast the user gently for being a guest or for their input. Be funny, tech-savvy, and sarcastic.";
        } else if (mode === 'analyze') {
             // Use Pro for complex reasoning tasks
             modelName = 'gemini-3-pro-preview';
             sysPrompt += " You are in 'Architect Mode'. Analyze the provided project data technically. Highlight potential scalability issues, stack choices, or future optimizations. Be professional but critical. Keep it under 150 words.";
        } else if (mode === 'fortune') {
            sysPrompt += " You are a digital oracle inside a computer system. Provide a cryptic, philosophical, or witty fortune cookie quote about technology, entropy, or the future. Keep it short (max 1 sentence).";
        }

        const fullPrompt = context ? `Context: ${context}\n\nUser Query: ${prompt}` : prompt;

        const response = await ai.models.generateContent({
            model: modelName,
            contents: fullPrompt,
            config: { systemInstruction: sysPrompt }
        });
        
        const text = response.text || "No response received from the neural core.";

        // Replace loading with content
        setHistory(prev => prev.map(line => {
            if (line.id === loadingId) {
                return {
                    id: line.id,
                    content: <div className={`whitespace-pre-wrap mb-2 animate-fade-in ${mode === 'roast' ? 'text-red-400' : mode === 'fortune' ? 'text-gold italic' : 'text-slate-300'}`}>{text}</div>
                };
            }
            return line;
        }));

    } catch (e) {
        setHistory(prev => prev.map(line => {
            if (line.id === loadingId) {
                return {
                    id: line.id,
                    content: <div className="text-red-400">Error: Neural link severed. (Check API Key or Connectivity)</div>
                };
            }
            return line;
        }));
    }
  };


  // --- COMMAND LOGIC ---
  const commands: Record<string, CommandHandler> = {
    help: () => (
      <div className="space-y-1 text-slate">
        <p>Available commands:</p>
        <ul className="pl-4 list-disc" style={{ color: themeColor }}>
          <li><span className="text-white font-bold">ai [query]</span> - Ask demondOS a question</li>
          <li><span className="text-white font-bold">analyze [id]</span> - Technical breakdown of a project</li>
          <li><span className="text-white font-bold">roast</span> - System critique of user</li>
          <li><span className="text-white font-bold">fortune</span> - Consult the system oracle</li>
          <li><span className="text-white font-bold">about</span> - System information</li>
          <li><span className="text-white font-bold">projects</span> - List archive entries</li>
          <li><span className="text-white font-bold">scan</span> - Run system diagnostics</li>
          <li><span className="text-white font-bold">theme [color]</span> - Change accent (teal, gold, violet, matrix, danger)</li>
          <li><span className="text-white font-bold">snake</span> - Launch entertainment module</li>
          <li><span className="text-white font-bold">matrix</span> - Toggle visualizer</li>
          <li><span className="text-white font-bold">clear</span> - Clear terminal output</li>
        </ul>
      </div>
    ),
    about: () => "demondOS is a personal operating system/brand interface designed by Jess DeMond. Built on React 19.",
    whoami: () => "User: Guest // Access Level: Read-Only",
    projects: () => (
        <div className="grid grid-cols-1 gap-1">
            {PROJECTS.slice(0, 5).map(p => (
                <div key={p.id} className="flex gap-4">
                    <span style={{ color: themeColor }} className="min-w-[30px]">{p.id}</span>
                    <span className="text-slate">{p.title}</span>
                </div>
            ))}
            <div className="text-slate/50 italic mt-1">... type 'analyze [id]' for details.</div>
        </div>
    ),
    clear: () => {
      setHistory([]);
    },
    exit: () => {
      onClose();
      return 'Session closed.';
    },
    snake: () => {
      startSnakeGame();
      return 'Initializing graphical interface...';
    },
    scan: () => {
        return <SystemScan color={themeColor} onComplete={() => addLine("Diagnostic Complete.")} />;
    },
    matrix: () => {
        setMode('matrix');
        return "Entering the void... (Press ESC to return)";
    },
    theme: (args) => {
        const colorName = args[0]?.toLowerCase();
        if (THEMES[colorName]) {
            setThemeColor(THEMES[colorName]);
            return `Theme updated to: ${colorName}`;
        }
        return `Unknown theme. Available: ${Object.keys(THEMES).join(', ')}`;
    },
    fortune: () => {
        processAICommand("Generate fortune.", 'fortune');
    },
    sudo: () => {
        return <span className="text-red-400 font-bold">ACCESS DENIED: You are not in the sudoers file. This incident will be reported.</span>;
    },
    ai: (args) => {
        const prompt = args.join(' ');
        if (!prompt) return "Usage: ai <prompt>";
        processAICommand(prompt, 'chat');
    },
    roast: (args) => {
        const prompt = args.join(' ') || "Roast me for being a guest user.";
        processAICommand(prompt, 'roast');
    },
    analyze: (args) => {
        if (args.length === 0) return "Usage: analyze <project_id> (e.g., analyze 1)";
        const id = args[0];
        const project = PROJECTS.find(p => p.id === id);
        if (!project) return `Error: Project ID ${id} not found in memory blocks.`;
        
        const context = `Project: ${project.title}\nDescription: ${project.description}\nTags: ${project.tags.join(', ')}\nCategory: ${project.category}`;
        processAICommand("Analyze this project technically.", 'analyze', context);
    }
  };

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const [cmd, ...args] = trimmed.split(' ');
    
    // Add command to history
    const commandLine = {
        id: 'cmd-' + Date.now(),
        content: <div className="flex gap-2"><span style={{ color: themeColor }}>➜</span> <span className="text-white">{trimmed}</span></div>
    };
    
    // We update history with the command line immediately
    setHistory(prev => {
        const next = [...prev, commandLine];
        return next;
    });

    // Process command
    if (commands[cmd.toLowerCase()]) {
      const output = commands[cmd.toLowerCase()](args);
      if (output) {
          // If the command returned immediate output (string or element), add it
          setTimeout(() => {
              addLine(output);
          }, 10);
      }
    } else {
      setTimeout(() => {
          addLine(`Command not found: ${cmd}. Type "help" for assistance.`);
      }, 10);
    }

    if (cmd.toLowerCase() === 'clear') {
        // Handled by state set in command function
    }
    
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  // --- GAME LOGIC ---
  const startSnakeGame = () => {
    setMode('snake');
    setSnake([{x: 10, y: 10}]);
    setScore(0);
    setDirection({x: 1, y: 0});
    setFood({
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
    });
  };

  const stopGame = () => {
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    setMode('standard');
    addLine(`Game Over. Score: ${score}`);
  };
  
  const stopMatrix = () => {
      setMode('standard');
  }

  // Handle global keys for modes (Escape)
  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            if (mode === 'snake') stopGame();
            if (mode === 'matrix') stopMatrix();
        }
    };
    
    // Game Controls
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
                const newHead = {
                    x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
                    y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE
                };

                // Self collision check
                if (prev.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
                    stopGame();
                    return prev;
                }

                const newSnake = [...prev, newHead];
                
                // Food check
                if (newHead.x === food.x && newHead.y === food.y) {
                    setScore(s => {
                        const newScore = s + 10;
                        if (newScore > highScore) setHighScore(newScore);
                        return newScore;
                    });
                    setFood({
                        x: Math.floor(Math.random() * GRID_SIZE),
                        y: Math.floor(Math.random() * GRID_SIZE)
                    });
                } else {
                    newSnake.shift(); // Remove tail
                }

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div 
        className="w-full max-w-2xl bg-charcoal/95 border rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col font-mono text-sm h-[500px] animate-fade-in-up transition-colors duration-500"
        style={{ borderColor: `${themeColor}40`, boxShadow: `0 0 30px ${themeColor}20` }}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5 select-none relative z-10">
            <div className="flex items-center gap-2 text-slate">
                <TerminalIcon size={14} style={{ color: themeColor }} />
                <span>demondOS_terminal_client</span>
            </div>
            <div className="flex items-center gap-2">
                <button onClick={onClose} className="hover:text-white transition-colors"><Minimize2 size={14} /></button>
                <button onClick={onClose} className="hover:text-red-400 transition-colors"><X size={14} /></button>
            </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow p-4 overflow-y-auto custom-scrollbar relative" onClick={() => mode === 'standard' && inputRef.current?.focus()}>
            
            {/* Matrix Background Overlay */}
            {mode === 'matrix' && <MatrixRain color={themeColor} />}

            {mode === 'standard' && (
                <>
                    {history.map((line) => (
                        <div key={line.id} className="mb-1 text-slate-300 break-words leading-relaxed">
                            {line.content}
                        </div>
                    ))}
                    
                    <div className="flex gap-2 mt-2">
                        <span className="font-bold" style={{ color: themeColor }}>➜</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent border-none outline-none text-white w-full"
                            style={{ caretColor: themeColor }}
                            autoFocus
                        />
                    </div>
                </>
            )}

            {mode === 'snake' && (
                <div className="flex flex-col items-center justify-center h-full relative z-10">
                    <div className="mb-4 text-center">
                        <p className="font-bold text-lg" style={{ color: themeColor }}>SNAKE.EXE</p>
                        <p className="text-slate text-xs">Score: {score} | High: {highScore}</p>
                        <p className="text-slate/40 text-[10px] mt-1">Use Arrows to Move | ESC to Quit</p>
                    </div>
                    
                    {/* Game Grid */}
                    <div 
                        className="relative bg-black/40 border border-white/10"
                        style={{
                            width: '300px',
                            height: '300px',
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
                                    width: `${100/GRID_SIZE}%`,
                                    height: `${100/GRID_SIZE}%`,
                                    left: `${(segment.x / GRID_SIZE) * 100}%`,
                                    top: `${(segment.y / GRID_SIZE) * 100}%`,
                                    opacity: i === snake.length - 1 ? 1 : 0.6,
                                    borderRadius: '2px'
                                }}
                            />
                        ))}
                        <div 
                            className="absolute bg-white animate-pulse"
                            style={{
                                width: `${100/GRID_SIZE}%`,
                                height: `${100/GRID_SIZE}%`,
                                left: `${(food.x / GRID_SIZE) * 100}%`,
                                top: `${(food.y / GRID_SIZE) * 100}%`,
                                borderRadius: '50%'
                            }}
                        />
                    </div>
                </div>
            )}

            {mode === 'matrix' && (
                 <div className="absolute bottom-4 left-0 w-full text-center z-20">
                     <div className="inline-block bg-black/80 px-4 py-2 rounded border border-white/10 text-white text-xs backdrop-blur-md">
                        Press <span className="font-bold text-white">ESC</span> to return to terminal
                     </div>
                 </div>
            )}
            
            <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};