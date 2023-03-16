import { Grid, GridItem } from "@chakra-ui/react";
import { BlogCard } from "ui";
import { removeTextImgTag } from "@/lib/helpers/removeTextImgTag";
import { getDisplayDate } from "@/lib/helpers/getDisplayDate";
import { GetAllBlogPostsResponse } from "@/lib/types/wordpress";

export interface BlogCardsDisplayProps {
  posts: GetAllBlogPostsResponse["posts"]["edges"];
}

export const BlogCardsDisplay = ({ posts }: BlogCardsDisplayProps) => {
  return (
    <Grid
      templateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)",
        xl: "repeat(3, 1fr)",
      }}
      gap={12}
      pb={32}
    >
      {posts?.map((post) => (
        <GridItem key={post.node.slug}>
          <BlogCard
            href={`blog/${post.node.slug}`}
            blogCardImageProps={{
              src: post.node.featuredImage?.node?.link ?? "",
              alt: post.node.title,
            }}
            blogCardContentProps={{
              title: post.node.title,
              body: removeTextImgTag(post.node.excerpt) + "...",
              date: getDisplayDate(new Date(post.node.date)),
            }}
          />
        </GridItem>
      ))}
    </Grid>
  );
};
