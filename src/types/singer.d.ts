export interface ISongMessage {
  id: number
  mid: string
  name: string
  pic: string
}

export interface ISingerColumn {
  title: string
  list: ISongMessage[]
}

export interface ISingerList {
  singers: ISingerColumn[]
}
