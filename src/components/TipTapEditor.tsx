'use client'
import React from 'react'
import { useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { EditorContent } from '@tiptap/react'

type Props = {}

const TipTapEditor = (props: Props) => {
    const [editorState, setEditorState] = React.useState('');
    const editor = useEditor({
        autofocus: true,
        extensions: [StarterKit],
        content: editorState,
        onUpdate: ({ editor }) => {
            setEditorState(editor.getHTML());
        },
    })
    return (
        <div>
            <div>
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default TipTapEditor