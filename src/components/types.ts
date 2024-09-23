import { StatusTypes } from './enums'

export type StatusMappingType = {
  [key in StatusTypes]: {
    color: string
    label: string
  }
}
