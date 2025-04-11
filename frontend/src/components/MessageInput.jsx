import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Smile } from "lucide-react";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const emojiRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setShowEmojiPicker(false);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full bg-base-100 border-t border-base-300 relative">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-lg border-2 border-primary/50 shadow-sm transition-all duration-200 group-hover:border-primary/80"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-error text-error-content
              flex items-center justify-center shadow-md hover:scale-105 transition-transform"
              type="button"
              aria-label="Remove image"
            >
              <X className="size-4" />
            </button>
          </div>
          <span className="text-sm text-base-content/60">Image ready to send</span>
        </div>
      )}

      {showEmojiPicker && (
        <div
          ref={emojiRef}
          className="absolute bottom-20 left-4 z-50 shadow-xl rounded-xl overflow-hidden"
        >
          <EmojiPicker
            theme="light"
            emojiStyle="apple"
            onEmojiClick={handleEmojiClick}
            lazyLoadEmojis
            previewConfig={{ showPreview: false }}
          />
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="relative flex items-center gap-2 flex-1">
          {/* Emoji Button */}
          <button
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="text-base-content/50 hover:text-base-content hover:bg-base-300/50 p-1 rounded-full transition-all"
            aria-label="Toggle emoji picker"
          >
            <Smile size={22} />
          </button>

          {/* Text Input */}
          <input
            type="text"
            className="w-full input input-bordered rounded-full pl-4 pr-12 py-2 bg-base-200 focus:bg-base-100 focus:ring-2 focus:ring-primary/50 border-none transition-all duration-200"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Hidden Image Input */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          {/* Image Upload Button */}
          <button
            type="button"
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full transition-all duration-200
                      ${imagePreview ? "text-primary" : "text-base-content/50 hover:text-base-content"}
                      hover:bg-base-300/50`}
            onClick={() => fileInputRef.current?.click()}
            aria-label="Attach image"
          >
            <Image size={22} />
          </button>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          className={`btn btn-circle btn-primary ${(!text.trim() && !imagePreview) ? 'btn-disabled opacity-50' : ''} 
                    transition-transform hover:scale-105 active:scale-95`}
          disabled={!text.trim() && !imagePreview}
          aria-label="Send message"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
