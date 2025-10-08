import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import { Bold, Italic, LinkIcon, List } from "lucide-react"
import { useEffect } from "react"


export default function RichTextEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Placeholder.configure({
        placeholder: "Digite o corpo do e-mail aqui...",
      }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()) // sempre devolve HTML atualizado
    },
  })

  // garante que o editor atualiza quando o estado externo mudar
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "")
    }
  }, [content, editor])

  return (
    <div className="border border-gray-300 rounded-lg p-3 bg-white shadow-sm">
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none focus:outline-none [&_.ProseMirror]:min-h-[200px]"

      />
    </div>
  )
}


function MenuBar({ editor }) {
  if (!editor) return null

  return (
    <div className="flex gap-2 border-b border-gray-200 pb-2 mb-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded ${editor.isActive("bold") ? "bg-purple-500 text-white" : "bg-gray-100"}`}
      >
        <Bold size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded ${editor.isActive("italic") ? "bg-purple-500 text-white" : "bg-gray-100"}`}
      >
        <Italic size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded ${editor.isActive("bulletList") ? "bg-purple-500 text-white" : "bg-gray-100"}`}
      >
        <List size={16} />
      </button>
      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .setLink({ href: prompt("Digite a URL") || "" })
            .run()
        }
        className="p-2 rounded bg-gray-100"
      >
        <LinkIcon size={16} />
      </button>
    </div>
  )
}

















// const RichTextEditor = ({ content, onChange }) => {
//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: content,
//     onUpdate: ({ editor }) => {
//       onChange(editor.getHTML())
//     }
//   })

//   return (
//     <EditorContent
//       editor={editor}
//     />
//   )

// }

// export default RichTextEditor