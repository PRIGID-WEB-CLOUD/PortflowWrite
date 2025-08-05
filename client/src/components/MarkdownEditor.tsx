import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bold, Italic, Strikethrough, Heading, Quote, Code, List, ListOrdered, Link, Image, Eye } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function MarkdownEditor({ value, onChange, placeholder = "Write your content in Markdown..." }: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState("edit");

  const insertMarkdown = (before: string, after: string = "", placeholder: string = "") => {
    const textarea = document.querySelector('textarea[data-markdown-editor]') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const text = selectedText || placeholder;
    
    const beforeText = value.substring(0, start);
    const afterText = value.substring(end);
    
    const newValue = beforeText + before + text + after + afterText;
    onChange(newValue);

    // Set cursor position
    setTimeout(() => {
      const newCursorPos = start + before.length + text.length + after.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
      textarea.focus();
    }, 0);
  };

  const toolbarButtons = [
    { icon: Bold, action: () => insertMarkdown('**', '**', 'bold text'), title: "Bold" },
    { icon: Italic, action: () => insertMarkdown('*', '*', 'italic text'), title: "Italic" },
    { icon: Strikethrough, action: () => insertMarkdown('~~', '~~', 'strikethrough text'), title: "Strikethrough" },
    { icon: Heading, action: () => insertMarkdown('## ', '', 'Heading'), title: "Heading" },
    { icon: Quote, action: () => insertMarkdown('> ', '', 'Quote'), title: "Quote" },
    { icon: Code, action: () => insertMarkdown('`', '`', 'code'), title: "Code" },
    { icon: List, action: () => insertMarkdown('- ', '', 'List item'), title: "Bullet List" },
    { icon: ListOrdered, action: () => insertMarkdown('1. ', '', 'List item'), title: "Numbered List" },
    { icon: Link, action: () => insertMarkdown('[', '](url)', 'link text'), title: "Link" },
    { icon: Image, action: () => insertMarkdown('![', '](image-url)', 'alt text'), title: "Image" },
  ];

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-2 flex-wrap">
            {toolbarButtons.map((button, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={button.action}
                title={button.title}
                className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700"
                data-testid={`button-${button.title.toLowerCase().replace(' ', '-')}`}
              >
                <button.icon className="w-4 h-4" />
              </Button>
            ))}
          </div>
          <TabsList className="grid w-32 grid-cols-2">
            <TabsTrigger value="edit" data-testid="tab-edit">Edit</TabsTrigger>
            <TabsTrigger value="preview" data-testid="tab-preview">
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="edit" className="m-0">
          <textarea
            data-markdown-editor
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-96 p-6 resize-none border-none focus:ring-0 bg-white dark:bg-neutral-800 font-mono text-sm leading-relaxed"
            data-testid="textarea-markdown"
          />
        </TabsContent>

        <TabsContent value="preview" className="m-0">
          <div className="p-6 h-96 overflow-y-auto">
            <div className="markdown-content prose prose-gray dark:prose-invert max-w-none">
              <ReactMarkdown>{value || "Nothing to preview yet..."}</ReactMarkdown>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
