'use client'

import { useState } from 'react'
import Modal from '@/components/Modal'

export default function Page() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                onClick={() => setIsOpen(true)}
            >
                Open Modal
            </button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <h2 className="text-xl font-semibold mb-4">Hello from the Modal!</h2>
                <p className="mb-4 text-gray-600">You can place any content here.</p>
                <button
                    className="mt-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => setIsOpen(false)}
                >
                    Close
                </button>
            </Modal>
        </div>
    )
}
