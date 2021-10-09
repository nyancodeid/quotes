declare module 'dom-to-image-improved' {
  export interface DomToImage {
    toSvg(node: Node, options?: Options): Promise<string>;
    toPng(node: Node, options?: Options): Promise<string>;
    toJpeg(node: Node, options?: Options): Promise<string>;
    toBlob(node: Node, options?: Options): Promise<Blob>;
    toPixelData(node: Node, options?: Options): Promise<string>;
  }
  
  export interface Options {
    filter?: ((node: Node) => boolean) | undefined;
    bgcolor?: string | undefined;
    scale?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
    style?: {} | undefined;
    quality?: number | undefined;
    imagePlaceholder?: string | undefined;
    cacheBust?: boolean | undefined;
  }
  
  export const DomToImage: DomToImage;
  
  type DomToImage_ = DomToImage;
  type Options_ = Options;
  
  export default DomToImage;
}