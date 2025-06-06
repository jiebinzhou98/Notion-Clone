'use client'
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Loader2, Plus } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type Props = {}

const CreateNoteDialog = (props: Props) => {
    const router = useRouter();
    const [input, setInput] = React.useState('')
    const uploadToFirebase = useMutation({
        mutationFn: async(noteId: string) =>{
            const response = await axios.post('/api/loadToFirebase',{
                noteId,
            });
            return response.data;
        },
    });
    const createNotebook = useMutation ({
        mutationFn: async () =>{
            const response = await axios.post('/api/createNoteBook', {
                name: input.trim()
            })
            return response.data
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(input === " ") {
            window.alert('Please enter a name for the notebook')
            return;
        }
        createNotebook.mutate(undefined,{
            onSuccess: ({ note_id }) => {
                console.log('created new notes: ', {note_id});
                if(!note_id){
                    console.error("note_id is undefined!");
                    return;
                }
                //hit another endpoint to upload the temp url to firebase
                uploadToFirebase.mutate(note_id)
                router.push(`/notebook/${note_id}`)
            },
            onError: (error) => {
                console.log(error)
                window.alert("Failed to create notebook")
            }
        })
    }

    const handleCancel = () => {
        setInput('')
    }

    return (
        <Dialog>
            <DialogTrigger>
                <div className='border-dashed border-2 flex border-green-600 h-full rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition hoaver:-translate-y-1 flex-row p-4'>
                    <Plus className="w-6 h-6 text-green-600" strokeWidth={3}></Plus>
                    <h2 className='font-semibold text-green-600 sm:mt-2'>New Note Book</h2>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        New Note Book
                    </DialogTitle>
                    <DialogDescription>
                        You can create a new note by clicking the button below.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <Input value={input} onChange={e=>setInput(e.target.value)} placeholder='Name...' />
                    <div className='h-4'></div>
                    <div className='flex items-center gap-2'>
                        <Button type='button' variant={'secondary'} onClick={handleCancel}>
                            Cancel
                            </Button>
                        <Button type='submit' className='bg-green-600' disabled={createNotebook.isPending}>
                            {createNotebook.isPending &&(
                                <Loader2 className='w-4 h-4 mr-2 animate-spin'/>
                            )}
                            Create
                            </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateNoteDialog