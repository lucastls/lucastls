// export default function image_secure_url(data) {
//     var new_source = [];
//     var new_data = data;
//     var new_srcSet;
//     if (data.images.sources[0].srcSet !== undefined) {
//         new_srcSet = data.images.sources[0].srcSet.replace(/http:/g, "https:")
//         new_source.push(new_srcSet)
//         new_data.images.sources = new_source
//     }
//     if (data.images.fallback !== undefined) {
//         new_data.images.fallback.src = data?.images?.fallback?.src?.replace(/http:/g, "https:")
//         new_data.images.fallback.srcSet = data?.images?.fallback?.srcSet?.replace(/http:/g, "https:")
//     }
//     return new_data
// }

export default function image_secure_url(data) {
    if (data.images.sources[0].srcSet !== undefined) {
        data.images.sources[0].srcSet = data.images.sources[0].srcSet.replace(/http:/g, "https:")
    }
    if (data.images.fallback !== undefined) {
        data.images.fallback.src = data?.images?.fallback?.src?.replace(/http:/g, "https:")
        data.images.fallback.srcSet = data?.images?.fallback?.srcSet?.replace(/http:/g, "https:")
    }
    return new_data
}