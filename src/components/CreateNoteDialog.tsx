'use client'
import React from 'react'
import { Dialog, DialogTrigger } from './ui/dialog'
import { Plus } from 'lucide-react'

type Props = {}

const CreateNoteDialog = (props: Props) => {
  return (
    <Dialog>
        <DialogTrigger>
            <div className='border-dashed border-2 border-green-600 h-full rounded-lg items-center flex justify-center sm:flex-col hover:shadow-xl transition hoaver:-translate-y-1 flex-row p-4'>
                <Plus className="w-6 h-6 text-green-600" strokeWidth= {3}></Plus>
                <h2 className='font-semibold text-green-600 sm:mt-2'>New Note Book</h2>
            </div>
        </DialogTrigger>
    </Dialog>
  )
}

export default CreateNoteDialog