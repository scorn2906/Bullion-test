export interface ReqLoginDTO {
  email: string
  password: string
}

export interface ResLoginDTO {
  name: string
  token: string
  email: string
}
