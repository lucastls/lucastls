import { StaticImage, GatsbyImage } from "gatsby-plugin-image"
import { PhotoProps } from "react-photo-album"
import React from "react"

type ImageProps = PhotoProps & { wrapperProps?: React.HTMLAttributes<HTMLDivElement> };

const Image = ({ photo, imageProps, wrapperProps }: ImageProps) => {
    const { width, height } = photo
    const { src, alt, title, style, sizes, className, onClick } = imageProps
    const { style: wrapperStyle, ...restWrapperProps } = wrapperProps ?? {}
    return (
            <StaticImage
                src={src}
                alt={"1"}
                title={photo.title}
                className={className}
            />
    )
}

export default Image