import { prisma } from "@/utils/db";
import { get } from "@/utils/redis";

const Url = () => null;

export default Url;

export const getServerSideProps = async (context) => {
  const { redirect } = context.query;

  let savedRedirect = await get(redirect);

  if (!savedRedirect) {
    savedRedirect = await prisma.urlRedirects.findUnique({
      where: {
        redirect: redirect,
      },
    });

    if (!savedRedirect) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }

  await prisma.visit.create({
    data: {
      urlId: savedRedirect.id,
    },
  });

  return {
    redirect: {
      destination: savedRedirect.url,
      permanent: false,
    },
  };
};
