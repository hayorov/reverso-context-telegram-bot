import { Document } from "mongoose"

export interface IUser extends Document {
  user_id: string
  input_language: string
  target_language: string
}

export type Lang =
  | "eng"
  | "rus"
  | "ger"
  | "dut"
  | "fra"
  | "ita"
  | "pol"
  | "por"
  | "spa"
  | "tur"
