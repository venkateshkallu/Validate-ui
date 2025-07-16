// src/components/ui/select.tsx
import * as React from "react"
import { Listbox } from "@headlessui/react"
import { Check, ChevronDown } from "lucide-react"

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
}) => {
  return (
    <div className="relative w-full">
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            <Listbox.Button className="flex items-center justify-between w-full px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm text-left text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              {value
                ? options.find((opt) => opt.value === value)?.label
                : placeholder}
              <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
            </Listbox.Button>
            <Listbox.Options className="absolute mt-1 w-full z-10 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  value={option.value}
                  className={({ active }) =>
                    `cursor-pointer select-none relative py-2 px-4 ${
                      active ? "bg-indigo-100" : ""
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 right-3 flex items-center text-indigo-600">
                          <Check className="w-4 h-4" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </>
        )}
      </Listbox>
    </div>
  )
}


