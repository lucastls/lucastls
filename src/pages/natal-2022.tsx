import { graphql } from 'gatsby'
import { useState } from "react";
import { StaticImage, GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import * as React from 'react'
import Image from '../components/Image';
import renderSlide from '../components/Slide';
import Layout from "@lekoarts/gatsby-theme-jodie/src/components/layout"
import { RenderPhoto, PhotoAlbum, Photo } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "../components/utils/lightbox-styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
// import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
// import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import image_secure_url from "../components/utils/images_secure_urls"

const Photography = ({ data }) => {

  const breakpoints = [1920, 1840, 1809, 1742, 1671, 1625, 1471, 1446, 1356, 1286, 1236, 1154, 1052, 944, 837, 729, 564, 334, 200, 100, 50];

  const galleryPhotos = data.allCloudinaryMedia.edges.map(({ node }, index) => ({
    src: node.secure_url,
    width: node.width,
    thumbImage: node.thumbImage,
    fullImage: node.fullImage,
    height: node.height,
    alt: (node.context != null) ? (node.context.custom.alt): `Image ${index}`,
    title: (node.context != null) ? (node.context.custom.caption): null,
    images: breakpoints.map((breakpoint) => {
      const height = Math.round((node.height / node.width) * breakpoint);
      const img_transform = "q_auto,f_auto,h_".concat(height.toString());
      return {
          src: node.secure_url.replace("q_auto,f_auto", img_transform),
          thumbImage: node.thumbImage,
          fullImage: node.fullImage,
          width: breakpoint,
          height,
      };
  }),
  }))

  const slides = galleryPhotos.map(({ src, thumbImage, fullImage, width, height, alt, title, images }) => ({
    src,
    thumbImage,
    fullImage,
    width,
    height,
    alt,
    title,
    srcSet: images.map((image) => ({
        src: image.src,
        thumbImage: image.thumbImage,
        fullImage: image.fullImage,
        width: image.width,
        height: image.height,            
        alt: image.alt,
        title: image.title,
    })),
}));
  
  const [index, setIndex] = useState(-1);

  return (
    <Layout>
      <div style={{margin: "0 5vw"}}>
        <PhotoAlbum 
                  photos={galleryPhotos}
                  renderPhoto={Image}
                  layout="masonry"
                  onClick={(event, photo, index) => setIndex(index)}
                  targetRowHeight={240}
                  spacing={0}
                  // padding={10}
        />
        <Lightbox
                  slides={slides}
                  open={index >= 0}
                  index={index}
                  // render={{ slide: renderSlide }}
                  // carousel={{padding: "2.5rem", preload: 5}}
                  // styles={{padding: "10px", root: { "--yarl__color_backdrop": "rgba(255, 255, 255, 0.95)", "--yarl__thumbnails_thumbnail_background": "rgba(147, 151, 153, 0.8)", "--yarl__thumbnails_container_background_color": "rgba(147, 151, 153, 0.8)", "--yarl__color_button": "rgba(105,105,105, 0.8)", "--yarl__slide_title_color": "rgb(0, 0, 0)"}, captionsTitleContainer: {backgroundColor: "transparent", paddingTop: "0rem"}}}
                  styles={{root: { "--yarl__color_backdrop": "rgba(255, 255, 255, 0.95)", "--yarl__thumbnails_thumbnail_background": "rgba(147, 151, 153, 0.8)", "--yarl__thumbnails_container_background_color": "rgba(147, 151, 153, 0.8)", "--yarl__color_button": "rgba(105,105,105, 0.8)", "--yarl__slide_title_color": "rgb(0, 0, 0)"}, captionsTitleContainer: {backgroundColor: "transparent", paddingTop: "0rem"}}}
                  close={() => setIndex(-1)}
                  // enable optional lightbox plugins
                  // plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
                  plugins={[Fullscreen, Thumbnails, Captions]}
        />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PhotosNatal2022 {
    allCloudinaryMedia(
      sort: {order: ASC, fields: [public_id]}
      filter: {folder: {eq: "natal2022"}}
    ) {
      edges {
        node {
          id
          secure_url
          height
          width
          context {
            custom {
              alt
              caption
            }
          }
          thumbImage: gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            height: 240
          )
          fullImage: gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            width: 1920
          )
        }
      }
    }
  }
`

export default Photography