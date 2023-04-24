-- CreateTable
CREATE TABLE "Visit" (
    "id" STRING NOT NULL,
    "urlId" STRING NOT NULL,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "UrlRedirects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
