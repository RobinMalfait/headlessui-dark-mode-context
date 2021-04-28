import { createContext, useContext, useState } from 'react'
import { Dialog } from '@headlessui/react'

export default function Home() {
  let [open, setOpen] = useState(null)

  return (
    <>
      <div className="bg-gray-100 h-screen w-full p-12 space-x-8">
        <button
          onClick={() => setOpen('dialog-1')}
          className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Open Dialog 1
        </button>

        <button
          onClick={() => setOpen('dialog-2')}
          className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Open Dialog 2
        </button>
      </div>

      <DarkMode enabled={true}>
        <MyDialog open={open === 'dialog-1'} onClose={() => setOpen(null)} />
      </DarkMode>

      <DarkMode enabled={false}>
        <MyDialog open={open === 'dialog-2'} onClose={() => setOpen(null)} />
      </DarkMode>
    </>
  )
}

let DarkModeContext = createContext(false)
function DarkMode({ enabled, children }) {
  // Read dark mode from context
  let useDarkMode = useContext(DarkModeContext)

  // When `enabled` prop is passed, prefer that one
  if (enabled === true || enabled === false) {
    useDarkMode = enabled
  }

  return (
    <DarkModeContext.Provider value={useDarkMode}>
      <div className={useDarkMode ? 'dark' : ''}>{children}</div>
    </DarkModeContext.Provider>
  )
}

function MyDialog({ open, onClose }) {
  return (
    <Dialog className="fixed z-10 inset-0 overflow-y-auto" open={open} onClose={onClose}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom align-middle max-w-sm w-full relative">
          <button
            onClick={onClose}
            className="absolute font-bold text-gray-900 -top-4 -right-4 bg-white rounded-full w-12 h-12 shadow"
            aria-label="close dialog"
          >
            X
          </button>

          {/* No `enabled` prop provided, therefore we will inherit via context */}
          <DarkMode>
            <div className="p-12 bg-white text-gray-900 dark:bg-gray-800 dark:text-white rounded-lg shadow">
              I am in a Dialog
            </div>
          </DarkMode>
        </div>
      </div>
    </Dialog>
  )
}
