

// reusable input component with reference forwarding  

import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className = '',
    ...props
}, ref) {
     
    const id = useId()

  return (
    <div className='w-full'>
        {
            label && <label htmlFor={id} className='mb-2 block text-md font-medium '>{label}</label>
        }

        <input
            className={`block w-full px-3 py-2 rounded-md ${className}`}
            type={type}
            {...props}
            ref={ref}
            id={id}
        />

    </div>
  )
})

export default Input