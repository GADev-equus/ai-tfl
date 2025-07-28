import { Loader2, Zap } from 'lucide-react';

export default function StreamingIndicator({ 
  isStreaming, 
  currentStep = null, 
  agent = null,
  onClose = null 
}) {
  if (!isStreaming) return null;

  const stepNames = {
    input_validation: 'Validating Query',
    route_query: 'Selecting TFL Expert',
    process_agent: 'Processing with Agent',
    check_confirmation: 'Checking Requirements',
    await_confirmation: 'Awaiting Confirmation',
    save_memory: 'Saving Conversation',
    finalize_response: 'Finalizing Response',
  };

  const stepName = stepNames[currentStep] || 'Processing Request';
  const agentName = agent ? `${agent.charAt(0).toUpperCase()}${agent.slice(1)} Line Agent` : '';

  return (
    <div className="bg-gray-800 border border-blue-500 rounded-lg p-4 mb-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <Zap className="w-5 h-5 text-blue-400 animate-pulse" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
            <span className="text-blue-400 font-medium text-sm">
              Streaming Workflow Progress
            </span>
          </div>
          
          <div className="text-gray-300 text-sm">
            <span className="text-white font-medium">{stepName}</span>
            {agentName && (
              <span className="text-gray-400 ml-2">• {agentName}</span>
            )}
          </div>
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 text-sm"
          >
            ×
          </button>
        )}
      </div>
      
      {/* Progress bar */}
      <div className="mt-3 w-full bg-gray-700 rounded-full h-1">
        <div 
          className="bg-blue-500 h-1 rounded-full transition-all duration-300" 
          style={{ width: '60%' }}
        />
      </div>
    </div>
  );
}