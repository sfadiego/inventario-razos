import { FormikProps } from 'formik/dist/types'
import { MultiValue, SingleValue } from 'react-select'
import { IOptions } from './IOptions'

export interface ISelect<T> {
  label?: string
  name: Extract<keyof T, string>
  formik: FormikProps<T>
  disabled?: boolean
  options: Array<IOptions>
  setValue?: Array<IOptions> | IOptions
  isMulti?: boolean
  defaultValue?: Array<IOptions> | IOptions
  onChange?: (props: SingleValue<IOptions> | MultiValue<IOptions>) => void
  onInputChange?: (value: string) => void
  className?: string | undefined
}
