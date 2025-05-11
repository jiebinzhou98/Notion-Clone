import React from 'react'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'

type Props = {
    noteId: number
}

const DeleteButton = ({noteId}: Props) => {
  return (
    <Button variant={'destructive'} size='sm' onClick={()=> {
        const confirm = window.confirm("Are you sure you want to delete this note?")
        if (!confirm) return;
    }}>
        <Trash/>
    </Button>
  )
}

export default DeleteButton