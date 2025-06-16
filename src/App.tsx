import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Copy, ExternalLink, Sparkles, Zap, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { aiService } from './services/aiService';
import { deploymentService } from './services/deploymentService';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  websiteLink?: string;
  deploymentStatus?: 'generating' | 'deploying' | 'success' | 'error';
  toolDetails?: {
    name: string;
    features: string[];
    techStack: string[];
  };
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);

    // Create initial bot message with generating status
    const botMessageId = (Date.now() + 1).toString();
    const initialBotMessage: Message = {
      id: botMessageId,
      type: 'bot',
      content: 'Analyzing your requirements and generating your productivity tool...',
      timestamp: new Date(),
      deploymentStatus: 'generating'
    };

    setMessages(prev => [...prev, initialBotMessage]);

    try {
      // Generate the tool
      const generatedTool = await aiService.generateProductivityTool(inputValue);
      
      // Update message with tool generation complete
      setMessages(prev => prev.map(msg => 
        msg.id === botMessageId 
          ? {
              ...msg,
              content: `Great! I've created "${generatedTool.name}" for you. Now deploying to Netlify...`,
              deploymentStatus: 'deploying',
              toolDetails: {
                name: generatedTool.name,
                features: generatedTool.features,
                techStack: generatedTool.techStack
              }
            }
          : msg
      ));

      // Deploy the tool
      const deploymentResult = await deploymentService.deployToNetlify(
        generatedTool.htmlCode,
        generatedTool.cssCode,
        generatedTool.jsCode,
        generatedTool.name
      );

      // Update message with final result
      if (deploymentResult.status === 'success') {
        setMessages(prev => prev.map(msg => 
          msg.id === botMessageId 
            ? {
                ...msg,
                content: `🎉 Perfect! I've successfully created and deployed "${generatedTool.name}" for you!\n\n${generatedTool.description}\n\n✨ Key Features:\n${generatedTool.features.map(f => `• ${f}`).join('\n')}\n\n🛠️ Built with: ${generatedTool.techStack.join(', ')}\n\nYour productivity tool is now live and ready to use!`,
                deploymentStatus: 'success',
                websiteLink: deploymentResult.url
              }
            : msg
        ));
      } else {
        setMessages(prev => prev.map(msg => 
          msg.id === botMessageId 
            ? {
                ...msg,
                content: `I've generated your productivity tool "${generatedTool.name}" but encountered an issue during deployment. The tool includes: ${generatedTool.features.join(', ')}. Please try again for deployment.`,
                deploymentStatus: 'error'
              }
            : msg
        ));
      }
    } catch (error) {
      setMessages(prev => prev.map(msg => 
        msg.id === botMessageId 
          ? {
              ...msg,
              content: 'I apologize, but I encountered an error while generating your productivity tool. Please try again with a different description.',
              deploymentStatus: 'error'
            }
          : msg
      ));
    }

    setIsProcessing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'generating':
        return <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'deploying':
        return <Loader2 className="w-4 h-4 text-orange-600 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'generating':
        return 'Generating your tool...';
      case 'deploying':
        return 'Deploying to Netlify...';
      case 'success':
        return 'Successfully deployed!';
      case 'error':
        return 'Deployment failed';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200/60 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">TooliPro</h1>
              <p className="text-sm text-slate-600">AI-Powered Tool Generator</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Welcome Message */}
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Transform Your Ideas Into Reality
            </h2>
            <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
              Describe your productivity tool idea and I'll create a fully functional website for you, 
              complete with modern design and deployed link.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/60">
                <h3 className="font-semibold text-slate-800 mb-2">Example Ideas:</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• "A habit tracker with streak counters"</li>
                  <li>• "Task manager with drag and drop"</li>
                  <li>• "Pomodoro timer with statistics"</li>
                  <li>• "Note-taking app with categories"</li>
                </ul>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/60">
                <h3 className="font-semibold text-slate-800 mb-2">What You Get:</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Fully functional web application</li>
                  <li>• Modern, responsive design</li>
                  <li>• Live deployment on Netlify</li>
                  <li>• Ready to use immediately</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="space-y-6 mb-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'bot' && (
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className={`max-w-2xl ${message.type === 'user' ? 'order-1' : ''}`}>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-800 shadow-sm'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  
                  {/* Status indicator */}
                  {message.deploymentStatus && message.deploymentStatus !== 'success' && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <div className="flex items-center gap-2 text-sm">
                        {getStatusIcon(message.deploymentStatus)}
                        <span className="text-slate-600">{getStatusText(message.deploymentStatus)}</span>
                      </div>
                    </div>
                  )}

                  {/* Tool details */}
                  {message.toolDetails && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <div className="bg-slate-50 rounded-xl p-3">
                        <h4 className="font-semibold text-slate-800 mb-2">{message.toolDetails.name}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="font-medium text-slate-700">Features:</span>
                            <ul className="text-slate-600 mt-1">
                              {message.toolDetails.features.map((feature, idx) => (
                                <li key={idx}>• {feature}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <span className="font-medium text-slate-700">Tech Stack:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {message.toolDetails.techStack.map((tech, idx) => (
                                <span key={idx} className="bg-slate-200 text-slate-700 px-2 py-1 rounded text-xs">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Website link */}
                  {message.websiteLink && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-200">
                        <div className="flex items-center gap-2 min-w-0">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm font-medium text-green-800 truncate">
                            {message.websiteLink}
                          </span>
                        </div>
                        <div className="flex gap-2 ml-2">
                          <button
                            onClick={() => copyToClipboard(message.websiteLink!)}
                            className="p-1.5 hover:bg-green-100 rounded-lg transition-colors"
                            title="Copy link"
                          >
                            <Copy className="w-4 h-4 text-green-600" />
                          </button>
                          <button
                            onClick={() => window.open(message.websiteLink, '_blank')}
                            className="p-1.5 hover:bg-green-100 rounded-lg transition-colors"
                            title="Open website"
                          >
                            <ExternalLink className="w-4 h-4 text-green-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-xs text-slate-500 mt-2 px-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              {message.type === 'user' && (
                <div className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div ref={messagesEndRef} />
      </main>

      {/* Input Form */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-end gap-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-3">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your productivity tool idea... (e.g., 'A habit tracker with streak counters and daily goals')"
                className="flex-1 resize-none bg-transparent border-none outline-none text-slate-800 placeholder-slate-500 min-h-[24px] max-h-[120px] py-2 px-2"
                rows={1}
                disabled={isProcessing}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isProcessing}
                className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-400 rounded-xl flex items-center justify-center transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed flex-shrink-0"
              >
                {isProcessing ? (
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                ) : (
                  <Send className="w-4 h-4 text-white" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Spacer */}
      <div className="h-24"></div>
    </div>
  );
}

export default App;