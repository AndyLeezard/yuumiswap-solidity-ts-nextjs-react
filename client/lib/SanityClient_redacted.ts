import sanityClient from "@sanity/client"

export const client = sanityClient({
    projectId: 'REDACTED', //Sanity Client App Project ID
    dataset: 'production',
    apiVersion: 'v1',
    token: 'REDACTED', //Sanity Client API Token
    useCdn: false,
})