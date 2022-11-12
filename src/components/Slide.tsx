import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import { Slide } from "yet-another-react-lightbox/*"
import React from "react"

interface CustomSlide extends Slide {
    gatsbyImage: IGatsbyImageData
  }

const ImageSlide = (slide) => {
    const gatsbyImage = slide.fullImage;
    return (
      <div >
        <GatsbyImage
                image={gatsbyImage}
                loading={`lazy`}
                alt={``}
                className={"customSlideImg yarl__slide_image"}
        />
      </div>

  )
}

export default ImageSlide