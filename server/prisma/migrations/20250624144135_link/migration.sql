-- CreateTable
CREATE TABLE "link" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clicks" BIGINT NOT NULL DEFAULT 0,
    "redirect" TEXT NOT NULL
);
