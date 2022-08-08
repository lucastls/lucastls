import {filterBySlug} from "@lekoarts/gatsby-theme-jodie/src/utils/resolver-templates"

// const modifyGrid = (data) => data
// const modifyGrid = (data) => filterBySlug(data, ["/about"])
const modifyGrid = (data) => filterBySlug(data, ["/photography"])

export default modifyGrid
