import { Check, X } from 'lucide-react';

export default function ConfirmationDialog({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  title = "Confirm Action", 
  message,
  confirmText = "Yes, proceed",
  cancelText = "Cancel" 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-lg max-w-md w-full p-6 shadow-2xl">
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        
        {message && (
          <div className="text-gray-300 mb-6 text-sm leading-relaxed">
            {typeof message === 'string' ? (
              <p>{message}</p>
            ) : (
              message
            )}
          </div>
        )}
        
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
            {cancelText}
          </button>
          
          <button
            onClick={onConfirm}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            <Check className="w-4 h-4" />
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}