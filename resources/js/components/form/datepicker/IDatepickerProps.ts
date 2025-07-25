import { FormikProps } from 'formik'

export interface IDatepickerProps<T> {
  name: Extract<keyof T, string>
  formik: FormikProps<any>
  label?: string
  disabled?: boolean
  mode?: 'single' | 'range'
  initialEndDate?: string
  initialDate?: string
  className?: string
  allowEmpty?: boolean
}
