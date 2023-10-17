export interface IScrollEmits {
  (e: 'scroll', pos: { x: number; y: number }): void
}
