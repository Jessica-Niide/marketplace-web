import * as React from 'react'

const InputWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center border border-x-0 border-t-0 border-b-light">
      {children}
    </div>
  )
}

export { InputWrapper }
