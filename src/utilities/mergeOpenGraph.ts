import type { Metadata } from 'next'
// import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: "Web developer specializing in frontend, crafting effective web experiences since 2010 for various industries, based in Mexico, working remote.",
  // images: [
  //   {
  //     url: `${getServerSideURL()}/website-template-OG.webp`,
  //   },
  // ],
  siteName: 'Enrique Mendoza | Web Developer',
  title: 'Enrique Mendoza | Web Developer',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images && defaultOpenGraph ? og.images : defaultOpenGraph?.images,
  }
}
