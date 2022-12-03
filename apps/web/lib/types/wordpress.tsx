  export interface GetBlogPostsResponse {
  posts: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        date: string;
        uri: string;
        slug: string;
        author: {
          node: {
            id: string;
            name: string;
          }
        }
        featuredImage: {
          node: {
            link: string;
          }
        }
      }
    }>
  }
}

export interface GetBlogPostResponse {
  post: {
    id: string;
    title: string;
    status: string;
    uri: string;
    slug: string;
    date: string;
    author: {
      node: {
        id: string;
        name: string;
      }
    }
    featuredImage: {
      node: {
        link: string;
      }
    }
    content: string;
  }
}
