export interface ISlider {
  id: number
  pic: string
  link: string
}

export interface IAlbum {
  id: number
  pic: string
  title: string
  username: string
}

export interface IRecommend {
  albums: IAlbum[]
  sliders: ISlider[]
}
