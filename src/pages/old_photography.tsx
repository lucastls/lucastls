import { graphql } from 'gatsby'
import { useState } from "react";
import { StaticImage } from "gatsby-plugin-image"
import * as React from 'react'
import Image from '../components/Image';
import Layout from "@lekoarts/gatsby-theme-jodie/src/components/layout"
import { RenderPhoto, PhotoAlbum } from "react-photo-album";
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

const renderPhoto: RenderPhoto = ({ photo, layout, layoutOptions, imageProps: { alt, style, ...restImageProps } }) => (
  // <div style={{ margin: "0.4rem", padding: "0.5rem", boxShadow: "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)", borderRadius: "0px" }}>
  <div style={{ margin: "0.4rem", marginTop: "0.8rem", padding: "0.5rem", paddingBottom: "0rem", boxShadow: "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)", borderRadius: "0px" }}>
    <img alt={alt} style={{...style}} {...restImageProps} />
    <div style={{height: "2.75rem", fontSize: "calc(0.6vh + 1vmin)"}}>
      <p style={{margin:0, paddingTop: "0.2rem", display: "inline-block", verticalAlign: "middle"}}>{photo.title}</p>
    </div>
  </div>
);

const Photography = ({ data }) => {

  const breakpoints = [2400, 1080, 640, 384, 256, 128, 96, 64, 48];

  const galleryPhotos = data.allCloudinaryMedia.edges.map(({ node }, index) => ({
    src: node.secure_url,
    width: node.width,
    height: node.height,
    alt: (node.context != null) ? (node.context.custom.alt): `Image ${index}`,
    title: (node.context != null) ? (node.context.custom.caption): null,
    images: breakpoints.map((breakpoint) => {
      const height = Math.round((node.height / node.width) * breakpoint);
      const img_transform = "q_auto,f_auto,h_".concat(height.toString());
      return {
          src: node.secure_url.replace("q_auto,f_auto", img_transform),
          width: breakpoint,
          height,
      };
  }),
  }))

  const slides = galleryPhotos.map(({ src, width, height, alt, title, images }) => ({
    src,
    width,
    height,
    alt,
    title,
    srcSet: images.map((image) => ({
        src: image.src,
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
                renderPhoto={renderPhoto}
                layout="masonry"
                onClick={(event, photo, index) => setIndex(index)}
                targetRowHeight={150}
                spacing={0}
                // padding={10}
      />
      <Lightbox
                slides={slides}
                open={index >= 0}
                index={index}
                // carousel={{padding: "2.5rem", preload: 5}}
                styles={{padding: "10px", root: { "--yarl__color_backdrop": "rgba(255, 255, 255, 0.95)", "--yarl__thumbnails_thumbnail_background": "rgba(147, 151, 153, 0.8)", "--yarl__thumbnails_container_background_color": "rgba(147, 151, 153, 0.8)", "--yarl__color_button": "rgba(105,105,105, 0.8)", "--yarl__slide_title_color": "rgb(0, 0, 0)"}, captionsTitleContainer: {backgroundColor: "transparent", paddingTop: "0rem"}}}
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
  query CloudinaryImages {
    allCloudinaryMedia(
      sort: {order: DESC, fields: [created_at, context___custom___order]}
      filter: {publicId: {regex: "/^photo/"}, format: {eq: "webp"}}
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
        }
      }
    }
  }
`

export default Photography