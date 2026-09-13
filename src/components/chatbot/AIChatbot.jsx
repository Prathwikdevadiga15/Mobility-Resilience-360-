import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, SendHorizonal, Sparkles, X, Mic, ArrowUpRight } from 'lucide-react';
import {
  chatbotKnowledge,
  defaultQuickActions,
  findChatbotIntent,
  normalizeChatInput,
} from '../../data/chatbotData';

const routeLookup = {
  traffic: '/traffic',
  bus: '/bus',
  parking: '/parking',
  map: '/map',
  report: '/report',
  emergency: '/emergency',
  analytics: '/analytics',
  home: '/',
  city: '/map',
  route: '/map',
};

function resolveQuickActionRoute(label = '') {
  const text = normalizeChatInput(label);
  if (!text) return '/map';

  const routeKey = Object.keys(routeLookup).find((key) => text.includes(key));
  return routeLookup[routeKey] || '/map';
}

function getFallbackGreeting() {
  return {
    id: 'greeting',
    response:
      "Hi! I'm Mobility AI 👋\nI can help you with traffic, buses, parking, routes, road issues and smart mobility.",
    quickActions: defaultQuickActions,
    route: '/map',
  };
}

export default function AIChatbot() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastIntentId, setLastIntentId] = useState('greeting');
  const [messages, setMessages] = useState(() => [
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hi! I'm Mobility AI 👋\nI can help you with traffic, buses, parking, routes, road issues and smart mobility.",
      quickActions: defaultQuickActions,
      route: '/map',
    },
  ]);

  const quickActions = useMemo(() => {
    const lastMessage = [...messages].reverse().find((message) => message.sender === 'assistant');
    return lastMessage?.quickActions || defaultQuickActions;
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  const sendMessage = (textOverride) => {
    const text = (textOverride ?? input).trim();
    if (!text) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const intent = findChatbotIntent(text, lastIntentId);
      const response = intent?.response || getFallbackGreeting().response;
      const normalizedActions = Array.isArray(intent?.quickActions) && intent.quickActions.length
        ? intent.quickActions
        : defaultQuickActions;

      setLastIntentId(intent?.id || 'fallback');
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          sender: 'assistant',
          text: response,
          quickActions: normalizedActions,
          route: intent?.route || '/map',
        },
      ]);
      setIsTyping(false);
    }, 500);
  };

  const handleQuickAction = (label) => {
    if (!label) return;
    sendMessage(label);
    navigate(resolveQuickActionRoute(label));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: "Hi! I'm Mobility AI 👋\nI can help you with traffic, buses, parking, routes, road issues and smart mobility.",
        quickActions: defaultQuickActions,
        route: '/map',
      },
    ]);
    setLastIntentId('greeting');
    setInput('');
  };

  return (
    <>
      <button
        type="button"
        className="ai-chatbot-toggle"
        aria-label="Ask Mobility AI"
        title="Ask Mobility AI"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="ai-chatbot-toggle-icon">
          <Bot size={20} />
        </span>
      </button>

      {isOpen && (
        <div className="ai-chatbot-panel" role="dialog" aria-modal="false" aria-label="Mobility AI chat panel">
          <div className="ai-chatbot-header">
            <div className="ai-chatbot-header-main">
              <div className="ai-chatbot-avatar">
                <Sparkles size={14} />
              </div>
              <div>
                <h3>Mobility AI</h3>
                <p>Smart Mobility Assistant</p>
              </div>
            </div>

            <div className="ai-chatbot-header-actions">
              <span className="ai-status-dot" aria-label="Online" />
              <button type="button" className="ai-icon-button" onClick={() => setIsOpen(false)} aria-label="Close chat">
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="ai-chatbot-body">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`ai-message-row ${message.sender === 'assistant' ? 'assistant' : 'user'}`}
              >
                {message.sender === 'assistant' && (
                  <div className="ai-bubble-avatar">
                    <Bot size={14} />
                  </div>
                )}

                <div className={`ai-message-bubble ${message.sender === 'assistant' ? 'assistant' : 'user'}`}>
                  {message.text.split('\n').map((line, index) => (
                    <React.Fragment key={`${message.id}-${index}`}>
                      {line}
                      {index < message.text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="ai-message-row assistant">
                <div className="ai-bubble-avatar">
                  <Bot size={14} />
                </div>
                <div className="ai-message-bubble assistant typing-bubble">
                  <span>Mobility AI is thinking</span>
                  <span className="typing-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="ai-chatbot-suggestions">
            {quickActions.map((action) => (
              <button key={action} type="button" className="ai-suggestion-chip" onClick={() => handleQuickAction(action)}>
                {action}
              </button>
            ))}
          </div>

          <div className="ai-chatbot-footer">
            <button type="button" className="ai-icon-button secondary" aria-label="Voice assistant placeholder">
              <Mic size={16} />
            </button>

            <form onSubmit={handleSubmit} className="ai-chat-form">
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about traffic, buses, parking..."
                aria-label="Ask Mobility AI"
              />
              <button type="submit" className="ai-send-button" aria-label="Send message">
                <SendHorizonal size={16} />
              </button>
            </form>

            <button type="button" className="ai-clear-button" onClick={clearChat} aria-label="Clear chat">
              Clear Chat
            </button>
          </div>
        </div>
      )}
    </>
  );
}
