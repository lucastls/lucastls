import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import { RenderPhoto, Photo} from "react-photo-album"
import React from "react"


interface CustomPhoto extends Photo {
    thumbImage: IGatsbyImageData
    fullImage: IGatsbyImageData
  }

const Image: RenderPhoto<CustomPhoto> = ({ photo, layout, layoutOptions, imageProps: { alt, style, ...restImageProps } }) => {
    const thumbImage = photo.thumbImage;
    return (
    <div {...restImageProps} style={{ margin: "0.4rem", marginTop: "0.8rem", padding: "0.5rem", paddingBottom: "0rem", boxShadow: "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)", borderRadius: "0px" }}>
      <GatsbyImage
            image={thumbImage}
            loading={`lazy`}
            alt={alt}
            style={{...style}}
      />
      <div style={{height: "2.75rem", fontSize: "calc(0.6vh + 1vmin)"}}>
        <p style={{margin:0, paddingTop: "0.2rem", display: "inline-block", verticalAlign: "middle"}}>{photo.title}</p>
      </div>
    </div>
  )
}

export default Image