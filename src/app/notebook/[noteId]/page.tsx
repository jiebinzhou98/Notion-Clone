import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { $notes } from '@/lib/db/schema'
import { and, eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Props = {
    params: {
        noteId: string
    }
}

const NotebookPage = async ({ params: { noteId } }: Props) => {
    const { userId } = await auth()
    if (!userId) {
        redirect("/dashboard")
    }
    const notes = await db
        .select()
        .from($notes)
        .where(
            and(eq($notes.id, parseInt(noteId)), eq($notes.userId, userId))
        )

    if (notes.length !== 1) {
        return redirect('/dashboard')
    }
    const note = notes[0]
    return (
        <div className='min-h-screen grainy p-8'>
            <div className='max-w-4xl mx-auto'>
                <div className='border shadow-xl border-stone-200 rounded-lg p-4 flex items-center'>
                <Link href='/dashboard'>
                    <Button className='bg-green-600'>Back</Button>
                </Link>
                </div>
            </div>
        </div>
    )
}
export default NotebookPage;