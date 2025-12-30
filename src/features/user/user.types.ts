export interface ActiveUser {
  _id: string
  name: string
  gender: string
  date_of_birth: string
  email: string
  photo: string
  phone: string
  address: string
}

export interface DetailUser {
  _id: string
  first_name: string
  last_name: string
  gender: string
  date_of_birth: string | Date
  email: string
  photo: string
  phone: string
  address: string
}

export interface ReqRegisterDTO {
  first_name: string
  last_name: string
  gender: string
  date_of_birth: string
  email: string
  phone: string
  address: string
  photo: string | null
  password: string
}

export interface ResRegisterDTO {
  name: string
  email: string
}

export interface ReqUpdateUserDTO {
  first_name: string
  last_name: string
  gender: string
  date_of_birth: string | Date
  email: string
  phone: string
  address: string
}
