-- CreateTable
CREATE TABLE "UrlRedirects" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "url" STRING NOT NULL,
    "redirect" STRING NOT NULL,

    CONSTRAINT "UrlRedirects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visit" (
    "id" STRING NOT NULL,
    "urlId" STRING NOT NULL,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "constraint_name" ON "UrlRedirects"("redirect");

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "UrlRedirects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
