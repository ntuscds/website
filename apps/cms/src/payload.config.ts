import { buildConfig } from 'payload/config';
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { s3Adapter as createS3Adapter } from '@payloadcms/plugin-cloud-storage/s3';
import path from 'path';

import Categories from './collections/Categories';
import Posts from './collections/Posts';
import Tags from './collections/Tags';
import Users from './collections/Users';
import Media from "./collections/Media";

import AfterNavLinks from "./admin/components/AfterNavLinks";

import MerchSales from "./admin/views/MerchSales";
import MerchOverview from "./admin/views/MerchOverview";
import MerchProducts from "./admin/views/MerchProducts";
import { SCSEIcon, SCSELogo } from "./admin/graphics/Logos";
import BeforeNavLinks from "./admin/components/BeforeNavLinks";

const adapter = createS3Adapter({
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION,
  },
  bucket: process.env.S3_BUCKET,
});

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  admin: {
    components: {
      graphics: {
        Logo: SCSELogo,
        Icon: SCSEIcon,
      },
      routes: [
        {
          path: "/merch/overview",
          Component: MerchOverview,
        },
        {
          path: "/merch/sales",
          Component: MerchSales,
        },
        {
          path: "/merch/products",
          Component: MerchProducts,
        },
      ],
      beforeNavLinks: BeforeNavLinks,
      afterNavLinks: AfterNavLinks,
    },
    user: Users.slug,
    css: path.resolve(__dirname, "admin", "styles.scss"),
  },
  collections: [
    Categories,
    Posts,
    Tags,
    Users,
    Media,
  ],
  csrf: [
    // whitelist of domains to allow cookie auth from
    process.env.PAYLOAD_PUBLIC_SERVER_URL,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [
    cloudStorage({
      collections: {
        media: {
          adapter: adapter,
        }
      },
    }),
  ],
});
