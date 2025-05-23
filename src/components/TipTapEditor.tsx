'use client'
import React from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import TipTapMenuBar from './TipTapMenuBar'
import { Button } from './ui/button'
import { useDebounce } from '@/lib/useDebounce'
import { useMutation } from '@tanstack/react-query'
import Text from '@tiptap/extension-text'
import axios from 'axios'
import { NoteType } from '@/lib/db/schema'
import { useCompletion } from 'ai/react'

type Props = {note: NoteType}

const TipTapEditor = ({note}: Props) => {
    const [editorState, setEditorState] = React.useState(note.editorState || `<h1>${note.name}</h1>`);
    const {complete, completion} = useCompletion({
        api: 'api/completion',
    })
    const saveNote = useMutation({
        mutationFn: async () =>{
            const response = await axios.post('/api/saveNote', {
                noteId: note.id,
                editorState
            });
            return response.data
         }
    })
    const customText = Text.extend({
        addKeyboardShortcuts(){
            return {
                "Shift-a": () => {
                    const prompt = this.editor.getText().split(' ').slice(-30).join(' ')
                    console.log(prompt)
                    complete(prompt)
                    return true
                },
            }
        },
    })
    React.useEffect(() => {
        if(!editor) return
        editor?.commands.insertContent(completion)
        console.log(completion)
    }, [completion])

    const editor = useEditor({
        autofocus: true,
        extensions: [StarterKit,customText],
        content: editorState,
        onUpdate: ({ editor }) => {
            setEditorState(editor.getHTML());
        },
    })
    const debouncedEditorState = useDebounce(editorState, 500);
    React.useEffect(() => {
        if(debouncedEditorState === '') return
        saveNote.mutate(undefined, {
            onSuccess: data => {
                console.log('success update!', data)
            },
            onError: err => {
                console.error(err)
            }
        })
    }, [debouncedEditorState]);
    return (
        <>
        <div className='flex'>
            {editor && <TipTapMenuBar editor={editor}/>}
             <Button disabled variant={"outline"}>
                {saveNote.isPending ? "Saving..." : "Saved"}
            </Button>
        </div>

            <div className='prose'>
                <EditorContent editor={editor} />
            </div>
        </>
    )
}

export default TipTapEditor