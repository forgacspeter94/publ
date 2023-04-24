-- CreateTable
CREATE TABLE "UrlRedirects" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "url" STRING NOT NULL,
    "redirect" STRING NOT NULL,

    CONSTRAINT "UrlRedirects_pkey" PRIMARY KEY ("id")
);
