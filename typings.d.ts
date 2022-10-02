interface Image {
    asset:{
        url:String
    }
}


export interface Creator {
    _id: string
    name: string
    address: string
    slug: {
        current: string
    }
    image: Image
    bio: string
}


export interface Collection {
    _id: string
    title: string
    description: string
    nftCollectionName: string
    address: string
    slug: {
        current: string
    }
    creator: Creator
    mainImage: Image
    previewImage: Image
}